# Plan técnico — Spec 007

## Cambios
- `server/auth/utils/mailer.js`:
  - `escapeHtml` para sanear entradas.
  - `plantillaContacto` + `enviarCorreoContacto` (destino `CONTACT_EMAIL`, `replyTo` del visitante).
  - Plantillas base/verificación alineadas a tecnología (barra, nav, footer).
- `server/store/routes/contactoRoutes.js`: tras persistir, dispara la notificación sin bloquear.
- Tests: `contacto.test.js` (notificación + validación), `mailer.test.js` (contenido).

## Decisiones técnicas
- **Notificación no bloqueante.** La respuesta al visitante no depende del SMTP. _Alternativa
  descartada: `await` del envío (si SMTP falla, el usuario ve error aunque el mensaje se guardó)._
- **`replyTo` con el correo del visitante.** Permite responder sin copiar direcciones. _Alternativa
  descartada: poner el correo del visitante como `from` (rompe SPF/DKIM)._
- **Escapado HTML de los campos.** Evita inyección en el correo. _Alternativa descartada: confiar
  en nodemailer (no escapa HTML del template)._
- **Namespace en contactoRoutes (`mailer.enviarCorreoContacto`).** Permite espiarlo en tests.
  _Alternativa descartada: destructuring (impide el spy)._

## Estrategia de tests
- `contacto.test.js`: 201 + `create` llamado + `enviarCorreoContacto` llamado (RF-1); 400 sin
  persistir ni notificar (RF-2).
- `mailer.test.js`: plantillas sin términos prohibidos (RF-5).

## Cobertura de RF
| Parte | RF |
|---|---|
| `enviarCorreoContacto` | RF-1, RF-4 |
| `contactoRoutes` | RF-1, RF-2, RF-3 |
| Plantillas | RF-5 |
| Tests | RF-6 |
