# Validación — Spec 013 (Estilo global y autenticación funcional)

Fecha: 2026-09-14
Método: mapeo controlado de clases + verificación visual (capturas) + pruebas funcionales de
login/registro (UI real con Playwright) + suite automatizada.

| RF | Criterio | Evidencia | Resultado |
|---|---|---|---|
| RF-1 | Estilo de marca en todo `src/` | 86 archivos normalizados; capturas de Promociones, Novedades, Términos y login en verde/oscuro | ✅ |
| RF-2 | Contraste legible | Corrección de inputs y superficies (82 archivos revisados, 18 con texto corregido) | ✅ |
| RF-3 | Proxy de Vite | `POST http://localhost:4000/api/auth/login` → **200** | ✅ |
| RF-4 | Login UI | `LOGIN_UI_OK: true` (nombre "Cliente Demo" visible, 0 errores de consola) | ✅ |
| RF-5 | Registro UI | `REGISTRO_UI_OK: true` (código verificado, cuenta creada e inicio de sesión) | ✅ |
| RF-6 | JSON inválido no tumba el server | Manejador de errores; `process.on('uncaughtException')` | ✅ |
| RF-7 | Puerto 4321 | Backend en `http://localhost:4321` | ✅ |

## Verificación global
| Comando | Resultado |
|---|---|
| `npm run lint` | 0 errores, 5 warnings |
| `npm run test:run` (raíz) | **20/20** ✅ |
| `npm run test:run` (server) | **23/23** ✅ |
| `npm run build` | ✅ sin avisos |
| `npm run test:e2e` | **3/3** (humo, promociones, novedades) |
| Login UI (script) | ✅ |
| Registro UI (script) | ✅ |

## Notas
- Se agregó `e2e/auth.spec.js` (se salta si el usuario demo no existe, para no romper CI).
- Usuario demo de desarrollo: `cliente@hagamostech.bo` / `Cliente123` (rol Cliente).
- La entrega de correos a dominios inexistentes puede rechazarse por SMTP; con correos reales
  llega el código de verificación.
