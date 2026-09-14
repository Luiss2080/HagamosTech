# Plan técnico — Spec 006

## Cambios backend
- `server/auth/controllers/AuthController.js`: nuevos métodos `cambiarPassword`, `exportarDatos`,
  `desactivarCuenta`, `listarSesiones`, `revocarSesion`.
- `server/server.js`: rutas `PUT /api/perfil/password`, `GET /api/perfil/exportar`,
  `DELETE /api/perfil/cuenta`, `GET /api/perfil/sessions`, `DELETE /api/perfil/sessions/:id`.

## Cambios frontend
- `src/pages/Perfil/components/BarraLateralPerfil.jsx`: el certificado se genera con
  `html2canvas` + `jsPDF` (ya cargados en `index.html`); se elimina la llamada a
  `/perfil/certificado` y las importaciones de `apiClient`/`Cookies` que quedaban sin uso.

## Decisiones técnicas
- **Sesiones honestas en lugar de inventadas.** Sin tabla de sesiones, se devuelve `[]` con el
  campo `alcance`. _Alternativa descartada: simular sesiones (mentira)._
- **Exportar desde el mismo objeto de usuario.** Se excluyen `contrasena` y `twoFactorSecret`.
  _Alternativa descartada: consulta paralela (sin beneficio)._
- **Certificado en cliente.** Evita una dependencia de PDF en el backend y aprovecha librerías ya
  presentes. _Alternativa descartada: endpoint con `pdfkit` (nueva dependencia + replicar diseño)._
- **Sin hash de contraseñas en esta spec.** Coherente con el login actual; se marca como deuda de
  seguridad. _Alternativa descartada: introducir bcrypt ahora (cambia login/registro/recuperación,
  mayor alcance)._

## Estrategia de tests
`server/test/perfil.test.js` (Supertest + `vi.spyOn` de Prisma):
- Password incorrecta → 400 y sin update (RF-2).
- Password válida → 200 y update (RF-1).
- Exportar sin `contrasena` ni `twoFactorSecret` (RF-3).
- Sesiones → `[]` + `alcance` (RF-5).
- Sin token → 401 (RF-8).

## Cobertura de RF
| Parte | RF |
|---|---|
| `cambiarPassword` | RF-1, RF-2 |
| `exportarDatos` | RF-3 |
| `desactivarCuenta` | RF-4 |
| `listarSesiones` / `revocarSesion` | RF-5, RF-6 |
| Certificado cliente | RF-7 |
| Auth 401 | RF-8 |
