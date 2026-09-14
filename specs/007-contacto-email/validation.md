# Validación — Spec 007 (Contacto con envío real por correo)

Fecha: 2026-09-14

| RF | Criterio | Evidencia | Resultado |
|---|---|---|---|
| RF-1 | Persiste y notifica | Test "crea el mensaje, notifica por correo y responde 201" | ✅ |
| RF-2 | Validación | Test "responde 400 y no persiste ni notifica" | ✅ |
| RF-3 | Correo no bloquea | `Promise.resolve(...).catch(...)`; respuesta 201 primero | ✅ |
| RF-4 | `replyTo` del visitante | `enviarCorreoContacto` setea `replyTo: correo` | ✅ |
| RF-5 | Plantillas sin restaurante | Test `mailer.test.js` | ✅ |
| RF-6 | Tests de notificación/validación/contenido | `server`: 4 archivos, **11/11** | ✅ |

## Verificación
| Comando | Resultado |
|---|---|
| `npm run test:run` (server) | **11/11** ✅ |

## Veredicto
**Spec 007 cumplida.** El contacto persiste y notifica por correo; las plantillas dicen la verdad.
