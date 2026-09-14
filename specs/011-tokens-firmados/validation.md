# Validación — Spec 011 (Tokens de sesión firmados)

Fecha: 2026-09-14

| RF | Criterio | Evidencia | Resultado |
|---|---|---|---|
| RF-1 | Emisión de token firmado | `login`/`verificar2fa`/`verificarCorreo` usan `firmarToken`; test "firma un token válido" | ✅ |
| RF-2 | Validación de firma y expiración | `verificarToken` + `obtenerUsuarioPorToken` | ✅ |
| RF-3 | Firma inválida/expirada ⇒ no autentica | Tests de manipulación, firma alterada y expiración | ✅ |
| RF-4 | Compatibilidad con token legado | Test "acepta el token legado"; `perfil.test.js` sigue verde | ✅ |
| RF-5 | Comparación en tiempo constante | `crypto.timingSafeEqual` | ✅ |
| RF-6 | Tests | `server/test/token.test.js` (6 casos) | ✅ |

## Verificación
| Comando | Resultado |
|---|---|
| `npm run test:run` (server) | 6 archivos, **23/23** ✅ |
| `npm run test:e2e` | ✅ (el backend arranca y sirve la app) |

## Decisión
`jsonwebtoken` no pudo instalarse (npm 403), así que se implementó un JWT mínimo con
`crypto` (HMAC-SHA256, `base64url`, `timingSafeEqual`), sin dependencias.

## Deuda restante
- Unificación de paleta de diseño (Promociones/Novedades con el verde lima de la marca).
