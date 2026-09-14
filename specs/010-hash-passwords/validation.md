# Validación — Spec 010 (Contraseñas hasheadas)

Fecha: 2026-09-14

| RF | Criterio | Evidencia | Resultado |
|---|---|---|---|
| RF-1 | Registro hashea | `verificarCorreo` usa `hashearContrasena`; test de hash | ✅ |
| RF-2 | Reset/cambio hashean | `restablecerContrasena` y `cambiarPassword` usan `hashearContrasena` | ✅ |
| RF-3 | Login verifica contra hash | `login` usa `verificarContrasena` (timing-safe) | ✅ |
| RF-4 | Compatibilidad texto plano + migración | `verificarContrasena` acepta plano; `login` migra a hash | ✅ |
| RF-5 | 2FA con comparación segura | `regenerarQR2FA` usa `verificarContrasena` | ✅ |
| RF-6 | Seed hasheado | `seed.js` usa `hashearContrasenaSync('Admin123')` | ✅ |
| RF-7 | Tests | `server/test/password.test.js` (5 casos) | ✅ |

## Verificación
| Comando | Resultado |
|---|---|
| `npm run test:run` (server) | 5 archivos, **17/17** ✅ |
| Arranque del backend (E2E) | ✅ |

## Decisiones
`bcryptjs` no pudo instalarse (npm 403 por política), por lo que se usó **`crypto.scrypt` nativo**,
sin nuevas dependencias, con salt aleatoria y `timingSafeEqual`. Formato: `scrypt$<salt>$<hash>`.

## Deuda restante
- Tokens JWT firmados reales (hoy `token-user-<id>-<ts>`).
- Unificación de paleta (Spec de diseño).
