# Validación — Spec 003 (Retiro del vertical restaurante y e-commerce)

Fecha: 2026-09-14

| RF | Criterio | Evidencia | Resultado |
|---|---|---|---|
| RF-1 | Sin rutas de menú/catálogo/restaurante | `App.jsx` sin esos imports ni `<Route>`; `grep` confirma | ✅ |
| RF-2 | Carpetas retiradas eliminadas | `Menu/`, `Servicios/restaurante/`, `store/catalogo/`, `store/carrito/`, `useCarritoStore.js` borrados | ✅ |
| RF-3 | Carrito fuera de la UI | `Header.jsx`, `App.jsx`, `main.jsx` sin carrito ni `useCarritoStore` | ✅ |
| RF-4 | `MigasPan` sin ramas retiradas | sin `/menu`, `/catalogo`, `/sucursales`, delivery/mayor/eventos/corporativo/congeladas | ✅ |
| RF-5 | Ruta retirada ⇒ 404 | El router usa fallback `Error404`; no hay rutas registradas | ✅ |
| RF-6 | Endpoints retirados no funcionales | `GET /api/catalogo` → **410 Gone** (honesto, no mock) | ✅ |
| RF-7 | Controladores/rutas de e-commerce eliminados | 4 rutas + 4 controladores borrados | ✅ |
| RF-8 | Contacto y auth operativos | `GET /api/contacto` → 200; `GET /api/perfil` → 401 | ✅ |
| RF-9 | Schema sin e-commerce | `npx prisma validate` → válido; `prisma generate` → OK | ✅ |
| RF-10 | BD intacta | No se ejecutó `prisma db push` | ✅ |
| RF-11 | READMEs actualizados | `server/README.md` y `src/pages/Inicio/README.md` reescritos | ✅ |
| RF-12 | Todo verde | lint 0 errores; tests 14/14 (front) y 2/2 (back); build OK; E2E 1/1 | ✅ |

## Verificación global
| Comando | Resultado |
|---|---|
| `npm run lint` | 0 errores, 5 warnings |
| `npm run test:run` (raíz) | 14/14 ✅ |
| `npm run test:run` (server) | 2/2 ✅ |
| `npm run build` | ✅ (bundle 1.35 MB, de 1.57 MB) |
| `npm run test:e2e` | 1/1 ✅ |
| `npx prisma generate` | ✅ |
| `npx prisma validate` | ✅ |

## Deuda documentada (Spec 004)
- `Promociones` (incl. `CarruselOfertas` → `CarruselProductos`) y `Novedades` siguen con copy e
  imágenes de restaurante. `CarruselProductos` conserva enlaces a `/catalogo` y `/menu/saltenas`
  que ahora resuelven a 404. Se reescriben a tecnología en la Spec 004.

## Veredicto
**Spec 003 cumplida.** El código ya no ofrece ni expone el vertical de restaurante/e-commerce y
la base de datos quedó intacta.
