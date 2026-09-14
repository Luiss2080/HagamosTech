# Spec 007 — Contacto con envío real por correo

## Contexto y objetivo
El formulario de contacto guardaba el mensaje en la base (`mensaje`) pero nunca avisaba a nadie,
y las plantillas de correo (`mailer.js`) seguían siendo de salteñería ("las mejores salteñas",
"sabor tradicional", links a `/productos` y `/sucursales`). Esta spec conecta el contacto con el
correo real y alinea las plantillas con la oferta de tecnología.

## Usuarios / actores
Visitantes que envían el formulario; equipo de HagamosTech que recibe la notificación.

## Historias de usuario
- H1: Como visitante quiero que mi consulta llegue al equipo de HagamosTech.
- H2: Como miembro del equipo quiero recibir el mensaje con los datos del contacto.

## Requisitos funcionales (criterios de aceptación en EARS)
- RF-1: CUANDO se envíe `POST /api/contacto` con `nombre`, `correo` y `mensaje`, EL SISTEMA persistirá el mensaje y disparará una notificación por correo al destinatario configurado (`CONTACT_EMAIL`, por defecto `contacto@hagamostech.bo`).
- RF-2: SI falta `nombre`, `correo` o `mensaje`, ENTONCES EL SISTEMA responderá `400` sin persistir ni notificar.
- RF-3: SI el envío de correo falla, ENTONCES EL SISTEMA igualmente responderá `201` (la notificación no bloquea al visitante).
- RF-4: EL SISTEMA configurará el `replyTo` del correo con el correo del visitante para permitir responder directamente.
- RF-5: EL SISTEMA eliminará de las plantillas de correo todo término del vertical restaurante (`salteña`, "sabor tradicional", `sucursal`, `/productos`).
- RF-6: EL SISTEMA incluirá tests que cubran la notificación, la validación y la ausencia de términos prohibidos en el mailer.

## Requisitos no funcionales
- El correo se escapa en HTML para evitar inyección.
- En desarrollo sin SMTP, se registra en consola (`[MAIL DEV]`) sin fallar.

## Casos límite
- SMTP no configurado → modo dev, sin excepción.
- Mensaje con caracteres `<`, `>`, `&` → escapados.
- Fallo de red SMTP → se registra y no afecta la respuesta 201.

## Fuera de alcance
- Bandeja de gestión de mensajes en el panel admin.
- Respuestas automáticas al visitante.
- Historias de "compras"/factura (vertical retirado).

## Criterios de finalización
- `POST /api/contacto` notifica por correo y persiste; tests en verde.
- Mailer sin contenido de restaurante; build y lint en verde.

## Dudas abiertas
- [NECESITA ACLARACIÓN] ¿Cuál es el correo definitivo de recepción (`CONTACT_EMAIL`) en producción?
