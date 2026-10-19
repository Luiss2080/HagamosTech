# Spec 006 — Funciones de perfil reales

## Contexto y objetivo
Tras eliminar el catch-all (Spec 005), las funciones de perfil que antes fingían éxito
(cambio de contraseña, exportar datos, certificado, sesiones, desactivar cuenta) quedaron sin
backend. Esta spec las implementa de verdad —o declara su alcance— para que el usuario reciba
respuestas reales.

## Usuarios / actores
Usuarios autenticados desde `/configuracion` y `/perfil`.

## Historias de usuario
- H1: Como usuario quiero cambiar mi contraseña de forma segura.
- H2: Como usuario quiero descargar una copia de mis datos.
- H3: Como usuario quiero descargar mi certificado.
- H4: Como usuario quiero desactivar mi cuenta.
- H5: Como usuario autenticado quiero organizar mis proyectos en un espacio privado.
- H6: Como usuario quiero crear notas personales y asociarlas opcionalmente a un proyecto.
- H7: Como usuario quiero registrar recordatorios en un calendario personal.

## Requisitos funcionales (criterios de aceptación en EARS)
- RF-1: CUANDO el usuario envíe `PUT /api/perfil/password` con la contraseña actual correcta, una nueva de al menos 6 caracteres y su confirmación coincidente, EL SISTEMA actualizará la contraseña y responderá `200`.
- RF-2: SI la contraseña actual es incorrecta, la nueva es corta o la confirmación no coincide, ENTONCES EL SISTEMA responderá `400` con un mensaje y no modificará nada.
- RF-3: CUANDO el usuario envíe `GET /api/perfil/exportar`, EL SISTEMA devolverá sus datos y su contenido personal **sin** la contraseña ni el secreto 2FA.
- RF-4: CUANDO el usuario envíe `DELETE /api/perfil/cuenta`, EL SISTEMA marcará la cuenta como inactiva (`activo=false`).
- RF-5: CUANDO el usuario envíe `GET /api/perfil/sessions`, EL SISTEMA devolverá una lista vacía y el campo `alcance: "sin_registro_multisesion"`, sin inventar sesiones.
- RF-6: SI el usuario intenta revocar una sesión, ENTONCES EL SISTEMA responderá `404` explicando que no existe.
- RF-7: EL SISTEMA generará el certificado PDF en el cliente (jsPDF + html2canvas), sin depender de un endpoint inexistente.
- RF-8: SI falta el token, ENTONCES los endpoints de perfil responderán `401`.
- RF-9: CUANDO un usuario autenticado consulte o gestione sus proyectos, notas o eventos, EL SISTEMA solo devolverá o modificará registros cuyo propietario sea el usuario del token.
- RF-10: CUANDO el usuario cree o actualice un proyecto personal, EL SISTEMA validará título, tipo y etapa, y persistirá los cambios en la base de datos.
- RF-11: CUANDO el usuario cree, actualice o elimine una nota, EL SISTEMA la asociará a su cuenta y, si corresponde, a un proyecto propio.
- RF-12: CUANDO el usuario cree, actualice o elimine un evento, EL SISTEMA validará título y fecha de inicio, y guardará el evento en su calendario personal.
- RF-13: SI un registro solicitado no pertenece al usuario autenticado, EL SISTEMA responderá `404` sin revelar su existencia.
- RF-14: EL SISTEMA presentará el espacio como seguimiento personal; no afirmará que sus etapas son estados oficiales de HagamosTech ni permitirá administrar solicitudes de otros usuarios.

## Requisitos no funcionales
- Mensajes en español; JSON consistente.
- Auditoría: los tests cubren los caminos felices y de error.

## Casos límite
- Contraseña nueva corta (<6) → 400 (RF-2).
- Confirmación distinta → 400 (RF-2).
- Token con id inexistente → 401 (RF-8).
- Un usuario intenta leer, modificar o eliminar un registro ajeno → 404, sin modificar datos (RF-9, RF-13).
- Evento sin fecha válida o título vacío → 400, sin persistir (RF-12).
- jsPDF/html2canvas no disponibles → mensaje claro en cliente (RF-7).

## Fuera de alcance
- Registro persistente de múltiples sesiones (requiere modelo/tabla).
- Hashing de contraseñas (hoy en texto plano, igual que el login actual) → spec de seguridad aparte.
- Historial/factura de compras (vertical retirado).
- Panel interno para el personal, atención de solicitudes de otros usuarios o asignación de estados oficiales.
- Reserva de citas con disponibilidad de HagamosTech; el calendario es personal y sus recordatorios no crean una cita.

## Criterios de finalización
- Endpoints implementados y con tests en verde (RF-1..RF-14).
- `npm run lint`, `npm run test:run` (raíz y server) y `npm run build` en verde.

## Dudas abiertas
- [NECESITA ACLARACIÓN] ¿Cuándo migramos las contraseñas a hash (bcrypt/argon2)? Es un riesgo de seguridad independiente de esta spec.
