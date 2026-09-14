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

## Requisitos funcionales (criterios de aceptación en EARS)
- RF-1: CUANDO el usuario envíe `PUT /api/perfil/password` con la contraseña actual correcta, una nueva de al menos 6 caracteres y su confirmación coincidente, EL SISTEMA actualizará la contraseña y responderá `200`.
- RF-2: SI la contraseña actual es incorrecta, la nueva es corta o la confirmación no coincide, ENTONCES EL SISTEMA responderá `400` con un mensaje y no modificará nada.
- RF-3: CUANDO el usuario envíe `GET /api/perfil/exportar`, EL SISTEMA devolverá sus datos **sin** la contraseña ni el secreto 2FA.
- RF-4: CUANDO el usuario envíe `DELETE /api/perfil/cuenta`, EL SISTEMA marcará la cuenta como inactiva (`activo=false`).
- RF-5: CUANDO el usuario envíe `GET /api/perfil/sessions`, EL SISTEMA devolverá una lista vacía y el campo `alcance: "sin_registro_multisesion"`, sin inventar sesiones.
- RF-6: SI el usuario intenta revocar una sesión, ENTONCES EL SISTEMA responderá `404` explicando que no existe.
- RF-7: EL SISTEMA generará el certificado PDF en el cliente (jsPDF + html2canvas), sin depender de un endpoint inexistente.
- RF-8: SI falta el token, ENTONCES los endpoints de perfil responderán `401`.

## Requisitos no funcionales
- Mensajes en español; JSON consistente.
- Auditoría: los tests cubren los caminos felices y de error.

## Casos límite
- Contraseña nueva corta (<6) → 400 (RF-2).
- Confirmación distinta → 400 (RF-2).
- Token con id inexistente → 401 (RF-8).
- jsPDF/html2canvas no disponibles → mensaje claro en cliente (RF-7).

## Fuera de alcance
- Registro persistente de múltiples sesiones (requiere modelo/tabla).
- Hashing de contraseñas (hoy en texto plano, igual que el login actual) → spec de seguridad aparte.
- Historial/factura de compras (vertical retirado).

## Criterios de finalización
- Endpoints implementados y con tests en verde (RF-1..RF-8).
- `npm run lint`, `npm run test:run` (raíz y server) y `npm run build` en verde.

## Dudas abiertas
- [NECESITA ACLARACIÓN] ¿Cuándo migramos las contraseñas a hash (bcrypt/argon2)? Es un riesgo de seguridad independiente de esta spec.
