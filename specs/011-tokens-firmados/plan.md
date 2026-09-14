# Plan técnico — Spec 011

## Cambios
- `server/auth/utils/token.js` (nuevo): `firmarToken(usuarioId)` y `verificarToken(token)`.
- `server/auth/controllers/AuthController.js`: usa `firmarToken` al emitir y `verificarToken` en `obtenerUsuarioPorToken`.
- `server/test/token.test.js` (nuevo).

## Decisiones técnicas
- **JWT casero con HMAC-SHA256.** Sin dependencias (npm bloquea instalaciones por política) y
  suficiente para sesión. _Alternativa descartada: `jsonwebtoken` (403 al instalar)._
- **Base64url + `timingSafeEqual`.** Formato estándar y comparación segura.
- **Compatibilidad con token legado.** Evita cerrar sesiones activas. _Alternativa descartada:
  invalidar todos los tokens (obliga a re-login)._

## Formato
`base64url(header).base64url(payload).HMAC-SHA256(data)`
Payload: `{ sub: <id>, iat: <ms>, exp: <ms> }` (7 días).

## Tests
`token.test.js`: firma y verifica; manipulación del payload → null; firma alterada → null;
token legado → id; token ausente/mal formado → null; expiración → null (con payload vencido fabricado).

## Cobertura de RF
| Parte | RF |
|---|---|
| `firmarToken` | RF-1 |
| `verificarToken` | RF-2, RF-3, RF-5 |
| Legacy | RF-4 |
| Tests | RF-6 |
