# Validación — Spec 013 (Estilos claros y autenticación funcional)

Fecha: 2026-09-14
Método: reversión del pase global de color (`git checkout e8da9fc -- src`), reaplicación de lo
funcional, verificación visual con capturas y pruebas funcionales de login/registro (UI real).

| RF | Criterio | Evidencia | Resultado |
|---|---|---|---|
| RF-1 | Blancos restaurados | `src` revertido a `e8da9fc`; capturas de Contacto y modal de login muestran tarjetas blancas con texto oscuro | ✅ |
| RF-2 | Marca en Promociones/Novedades/hero | Paleta verde/oscura intacta (Spec 012) | ✅ |
| RF-3 | Proxy de Vite | `POST http://localhost:4000/api/auth/login` → **200** | ✅ |
| RF-4 | Login UI | E2E `auth.spec.js` "login de usuario demo" en verde | ✅ |
| RF-5 | Registro UI | Verificación: código de la BD → cuenta creada → sesión iniciada | ✅ |
| RF-6 | JSON inválido no tumba el server | Manejador de errores + `uncaughtException` | ✅ |
| RF-7 | Puerto 4321 | Backend en `http://localhost:4321` | ✅ |

## Verificación global
| Comando | Resultado |
|---|---|
| `npm run lint` | 0 errores, 5 warnings |
| `npm run test:run` (raíz) | **20/20** ✅ |
| `npm run test:run` (server) | **23/23** ✅ |
| `npm run build` | ✅ sin avisos |
| `npm run test:e2e` | **4/4** (humo, promociones, novedades y login) |

## Notas
- Usuario demo de desarrollo: `cliente@hagamostech.bo` / `Cliente123` (rol Cliente).
- `e2e/auth.spec.js` se salta si el usuario demo no existe, para no romper CI.
