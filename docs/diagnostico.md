# Diagnóstico — Fase 0 (Spec-Driven Development)

Fecha: 2026-09-14
Alcance: plataforma HagamosTech (React 19 + Vite 8 / Node + Express 5 + Prisma + MySQL).
Método: read-only. `npm run lint`, `npm run build`, arranque de `dev` frontend y backend,
navegación real con navegador (Playwright) por rutas clave y sondeos HTTP a la API.

## Resumen ejecutivo

La app **no está rota**: el build compila, ambos servidores arrancan y la web carga sin
errores de consola. El "atasco" es de dos naturalezas:

1. **Bloqueante de entorno (causa principal):** el puerto `3000` está ocupado por otro
   proyecto (`ParqueoYa`) escuchando en `127.0.0.1:3000`. El frontend llama a
   `http://localhost:3000/api`, que resuelve a ese servidor ajeno y devuelve 404 en
   **todos** los endpoints de HagamosTech. El backend real de HagamosTech arranca en
   `0.0.0.0:3000` y solo responde por IP de red, no por `localhost`.
2. **Deuda estructural y de contenido:** API "mentirosa" (catch-all que devuelve éxito),
   convivencia de dos negocios contradictorios (tecnología vs. salteñería), cero tests y
   errores de lint.

## Evidencia

### Comandos
| Comando | Resultado |
|---|---|
| `npm run build` | ✅ OK — 2212 módulos, `dist/assets/index-*.js` = **1.569 kB** (335 kB gzip) |
| `npm run dev` (frontend) | ✅ Vite 8.0.8 listo en ~1.1 s en `http://localhost:4000` |
| `cd server && npm run dev` | ✅ `[SERVIDOR MVC]` en `http://localhost:3000` + `[SMTP] OK` |
| `npm run lint` | ❌ **11 errores, 5 warnings** |

### Bloqueante de entorno — conflicto de puerto 3000
```
TCP  0.0.0.0:3000   LISTENING  36128   node server.js            (HagamosTech)
TCP  127.0.0.1:3000 LISTENING  32032   vite-node src/main.ts     (ParqueoYa)
```
- PID 32032 = `C:\laragon\www\ParqueoYa\services\api` (otro proyecto).
- `curl http://127.0.0.1:3000/api/contacto` → **404** con `Access-Control-Allow-Origin: http://127.0.0.1:5173` (header que no existe en `server.js`).
- `curl http://192.168.1.2:3000/api/perfil` (nuestro backend) → **401 `{"mensaje":"No autorizado"}`** (correcto).
- Conclusión: `localhost:3000` va a ParqueoYa; por eso login, contacto, catálogo y todo lo
  que consuma API falla en el navegador.

### API mentirosa
`server/server.js:52-88` define rutas mock y un catch-all:
```
curl http://192.168.1.2:3000/api/endpoint-inexistente-xyz
→ 200 {"success":true,"data":[],"items":[],"total":0,...}
```
Un endpoint que no existe responde **200 con éxito**. Viola la constitución ("API veraz").
Afecta a: `colegios-sistema`, `suscripciones-sistema`, `invitados-sistema`,
`libros-sistema`, `inventario-sistema`, `reportes-sistema`, `soporte`, y subrutas de
perfil/compras sin controlador.

### Contenido contradictorio (dos negocios)
- `README.md`, `src/pages/Servicios/README.md` y `server/README.md` describen una **salteñería**.
- `src/components/Layout/Header.jsx` y `src/data/serviciosData.js` venden **tecnología** (8 categorías).
- `src/store/catalogo` es una tienda real con 26 productos de salteñería (salteñas, café, combos).
- `src/app/App.jsx` expone ambos mundos a la vez: `/menu/*`, `/servicios/delivery|mayor|eventos|corporativo|congeladas`, `/catalogo`, `/catalogo/:id`, `/pago-movil` junto a `/servicios/desarrollo-web`, etc.

### Lint (11 errores / 5 warnings)
Errores:
- `motion` importado sin uso (6 archivos): `src/chat/AsistenteChat.jsx:2`, `src/chat/components/BotonAlternarChat.jsx:2`, `IndicadorEscribiendo.jsx:2`, `MensajesChat.jsx:2`, `MenuChat.jsx:2`, `src/components/Widgets/ChatWhatsApp.jsx:2`.
- `Math.random()` durante el render (regla `react-hooks/purity`) en `src/components/fondos/ParticulasCirculares.jsx` (líneas 13, 26, 27, 59, 60).

Warnings:
- `react-refresh/only-export-components` en `src/pages/Inicio/sections/InstitucionesCarrusel.jsx:5`.
- `react-hooks/exhaustive-deps` en `VentajasCarrusel.jsx:180`, `Academia.jsx:42`, `Personalizado.jsx:51`, `Tecnologia.jsx:70`.

### Otros
- **Sin tests** en frontend ni backend; `server/package.json` tiene `"test"` que falla a propósito.
- **Bundle grande**: chunk único de 1.57 MB (aviso de Vite > 500 kB).
- Texto con typo: `src/data/serviciosData.js:673` → `'Óóptimo'`.
- `serviciosData.js` **sí coincide** con el Catálogo Maestro (8 categorías, 6/6/6/5/5/3/3/1).

## Causa raíz del "atasco"
Conflicto de puerto 3000 con el proyecto ParqueoYa + APIs que apuntan a `localhost`. Aunque
nuestro backend está bien, el navegador nunca lo alcanza; y el catch-all oculta el fallo en
escenarios donde sí llega. A esto se suma la deuda de contenido y tests.

## Checklist de arranque (operativo)
1. Liberar `127.0.0.1:3000` (detener ParqueoYa) **o** cambiar el puerto del backend HagamosTech y `VITE_API_BASE_URL`. Ver "Dudas abiertas".
2. `cd server && npm install && npx prisma generate && npx prisma db push && npm run db:seed` (requiere MySQL y `server/.env`).
3. `npm install` en raíz.
4. `npm run dev:all` → frontend `http://localhost:4000`, backend `http://localhost:3000`.
5. Verificar `curl http://localhost:3000/api/perfil` → debe responder 401 (no 404).

## Acciones derivadas (por spec)
- Spec 001 — harness de tests y CI.
- Spec 004 — eliminar mock/catch-all; endpoints reales o `404/501` explícitos (API veraz).
- Spec 002/003 — unificar identidad tech y retirar vertical restaurante/e-commerce.
- Spec 007 — limpieza de lint y errores varios.
- Spec 008 — code-splitting para reducir el bundle.

## Dudas abiertas
- [NECESITA ACLARACIÓN] ¿Se detiene ParqueoYa o se cambia el puerto de HagamosTech a 3001
  (y `VITE_API_BASE_URL`)? Recomendación: cambiar HagamosTech a un puerto libre para no
  acoplarse a otros proyectos.
