# Plan técnico — Spec 010

## Cambios
- `server/auth/controllers/AuthController.js`:
  - Helpers `esHashPassword`, `hashearContrasena`, `verificarContrasena` (scrypt + compat. texto plano).
  - `login`: verificación con hash + migración oportunista.
  - `regenerarQR2FA`: comparación con hash.
  - `verificarCorreo`: hashear al crear usuario.
  - `restablecerContrasena`: hashear nueva contraseña.
  - `cambiarPassword`: verificar actual y hashear la nueva.
- `server/prisma/seed.js`: hash del admin.
- Test: `server/test/password.test.js`.

## Decisiones técnicas
- **`crypto.scrypt` nativo.** Sin dependencias (npm bloquea nuevas por política) y disponible en Node.
  _Alternativa descartada: `bcryptjs`/`bcrypt` (403 al instalar)._ _Alternativa descartada: `argon2` (misma razón)._
- **Formato `scrypt$<salt>$<hash>`.** Autodescriptivo y distinguible del texto plano.
- **Compatibilidad con texto plano + migración en login.** No rompe cuentas existentes.
  _Alternativa descartada: invalidar contraseñas antiguas (obliga a resetear a todos)._
- **Comparación con `crypto.timingSafeEqual`.** Evita filtrado por tiempo.

## Estrategia de tests
- `hashearContrasena` + `verificarContrasena`: hash válido, contraseña incorrecta.
- Compatibilidad: contraseña en texto plano válida → true y migración detectable.
- `cambiarPassword` rechaza actual incorrecta y acepta la correcta (usa spies de Prisma).

## Cobertura de RF
| Parte | RF |
|---|---|
| Registro | RF-1 |
| Reset/Cambio | RF-2 |
| Login | RF-3, RF-4 |
| 2FA | RF-5 |
| Seed | RF-6 |
| Tests | RF-7 |
