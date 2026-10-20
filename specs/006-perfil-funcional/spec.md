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
- H8: Como usuario quiero que el registro, la verificación y los datos de mi cuenta funcionen sobre PostgreSQL.
- H9: Como usuario quiero encontrar rápidamente mis proyectos y notas usando búsquedas y filtros.
- H10: Como usuario quiero consultar mis recordatorios por período sin perderlos al cambiar de sección.

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
- RF-15: EL SISTEMA persistirá las tablas activas de autenticación, contacto y espacio personal en PostgreSQL usando `DATABASE_URL`; ningún endpoint en ejecución dependerá de MySQL.
- RF-16: CUANDO una persona complete el registro y la verificación de correo, EL SISTEMA guardará el usuario en PostgreSQL, asignará el rol Invitado si aún no existe e iniciará sesión con un token válido.
- RF-17: LA MIGRACIÓN desde MySQL conservará los registros activos de usuarios, roles, permisos, mensajes, verificaciones, recuperaciones, registros pendientes y espacio personal, incluidos sus identificadores y relaciones; las tablas del vertical retirado no se activarán.
- RF-18: EL ESPACIO PERSONAL compartirá la composición visual de Contáctanos: hero centrado con título y descripción, seguido de una sección centrada y un panel principal en dos columnas, con fondo, contraste, tarjetas e iconografía de HagamosTech.
- RF-19: CUANDO el usuario consulte sus proyectos, EL SISTEMA permitirá buscar por título, categoría o descripción y filtrar por etapa, sin modificar los registros persistidos.
- RF-20: CUANDO el usuario consulte sus notas, EL SISTEMA permitirá buscar por título o contenido y filtrar por proyecto asociado, sin modificar los registros persistidos.
- RF-21: CUANDO el usuario consulte sus recordatorios, EL SISTEMA permitirá ver la agenda de hoy, los próximos siete días o todos los eventos futuros, conservando la navegación mensual del calendario.
- RF-22: EL ESPACIO PERSONAL organizará proyectos, notas, calendario, formularios y acceso a datos en módulos separados; todas las operaciones de creación, edición y eliminación seguirán usando los endpoints autenticados existentes y persistirán en PostgreSQL.

## Requisitos no funcionales
- Mensajes en español; JSON consistente.
- Auditoría: los tests cubren los caminos felices y de error.

## Casos límite
- Contraseña nueva corta (<6) → 400 (RF-2).
- Confirmación distinta → 400 (RF-2).
- Token con id inexistente → 401 (RF-8).
- Un usuario intenta leer, modificar o eliminar un registro ajeno → 404, sin modificar datos (RF-9, RF-13).
- Evento sin fecha válida o título vacío → 400, sin persistir (RF-12).
- Registro duplicado → 400; registro nuevo crea un pendiente y la verificación correcta persiste la cuenta en PostgreSQL (RF-16).
- Inicio de sesión contra PostgreSQL rechaza contraseña incorrecta y emite token con credenciales válidas.
- jsPDF/html2canvas no disponibles → mensaje claro en cliente (RF-7).

## Fuera de alcance
- Registro persistente de múltiples sesiones (requiere modelo/tabla).
- Hashing de contraseñas (hoy en texto plano, igual que el login actual) → spec de seguridad aparte.
- Historial/factura de compras (vertical retirado).
- Panel interno para el personal, atención de solicitudes de otros usuarios o asignación de estados oficiales.
- Reserva de citas con disponibilidad de HagamosTech; el calendario es personal y sus recordatorios no crean una cita.

## Criterios de finalización
- Endpoints implementados y con tests en verde (RF-1..RF-22).
- `npm run lint`, `npm run test:run` (raíz y server) y `npm run build` en verde.

## Validación de RF-19..RF-22
- RF-19..RF-21: `src/pages/Perfil/espacio/espacioPersonalUtils.test.js` verifica búsqueda, filtros por etapa/proyecto, agenda temporal y calendario mensual.
- RF-22: `src/servicios/espacioPersonalApi.test.js` verifica el uso de endpoints para lectura, alta, actualización y eliminación; `server/test/espacioPersonal.test.js` verifica autenticación, propiedad y escritura mediante Prisma.
- PostgreSQL: comprobación transaccional de creación y relación de proyecto, nota y evento; la transacción de verificación se revierte.

## Dudas abiertas
- [NECESITA ACLARACIÓN] ¿Cuándo migramos las contraseñas a hash (bcrypt/argon2)? Es un riesgo de seguridad independiente de esta spec.
