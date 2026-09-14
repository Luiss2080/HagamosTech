# Plan técnico — Spec 010

## Cambios
- `server/auth/controllers/AuthController.js`:
  - Helpers `esHashBcrypt`, `hashearContrasena`, `verificarContrasena` (compat. texto plano).
  - `login`: verificación con hash + migración oportunista.
  - `regenerarQR2FA`: comparación con hash.
  - `verificarCorreo`: hashear al crear usuario.
  - `restablecerContrasena`: hashear nueva contraseña.
  - `cambiarPassword`: verificar actual y hashear la nueva.
- `server/prisma/seed.js`: hash del admin.
- `server/package.json`: dependencia `bcryptjs`.
- Test: `server/test/password.test.js`.

## Decisiones técnicas
- **`bcryptjs` en vez de `bcrypt`.** Evita compilación nativa y problemas en Windows/CI.
  _Alternativa descartada: `bcrypt` (binario nativo)._ _Alternativa descartada: `argon2` (misma razón)._
- **Compatibilidad con texto plano + migración en login.** No rompe cuentas existentes.
  _Alternativa descartada: invalidar contraseñas antiguas (obliga a resetear a todos)._
- **Coste 10.** Estándar razonable para este tipo de app.

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
