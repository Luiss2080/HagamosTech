# Spec 005 — API veraz (sin mocks ni catch-all)

## Contexto y objetivo
`server.js` respondía `{success:true}` a cualquier endpoint no implementado mediante un
`mockRouter` y un catch-all global. Eso hacía que la UI "funcionara" en falso (p. ej. cambio de
contraseña o exportar datos decían éxito sin hacer nada). Esta spec elimina los mocks y hace que
la API diga la verdad: datos reales o error explícito.

## Usuarios / actores
- Desarrolladores y agentes que consumen la API.
- Usuarios, que dejan de recibir confirmaciones falsas.

## Historias de usuario
- H1: Como desarrollador quiero que un endpoint inexistente devuelva 404, no éxito falso.
- H2: Como usuario quiero que si una acción no está implementada, la app me lo diga.

## Requisitos funcionales (criterios de aceptación en EARS)
- RF-1: EL SISTEMA eliminará el `mockRouter` y todas las rutas mock de `server.js`.
- RF-2: EL SISTEMA eliminará el catch-all que devolvía `{success:true}`.
- RF-3: SI se consulta un endpoint `/api/*` inexistente, ENTONCES EL SISTEMA responderá `404` con `{error, mensaje}` y sin campo `success`.
- RF-4: SI se consulta un endpoint del vertical retirado, ENTONCES EL SISTEMA responderá `410`.
- RF-5: EL SISTEMA mantendrá operativos los endpoints reales: `/api/auth/*`, `/api/perfil`, `/api/perfil/2fa/*`, `/api/contacto`, `/api/cupones-sistema/*`, `/api/logout`.
- RF-6: EL SISTEMA exportará `app` desde `server.js` sin abrir puertos al importarlo, para permitir tests.
- RF-7: EL SISTEMA incluirá tests que verifiquen 404 (inexistente), 410 (retirado) y 401 (`/perfil` sin token).

## Requisitos no funcionales
- Mensajes de error en español y en JSON.
- Sin regresiones en los endpoints reales.

## Casos límite
- Endpoint real con método incorrecto (p. ej. `DELETE /api/contacto`) → 404 honesto.
- Frontend que asumía éxito: los hooks ya capturan errores y deben mostrarlo; implementar las features reales queda para spec posterior.

## Fuera de alcance
- Implementar los módulos aún ausentes: cambio de contraseña, sesiones, exportar datos, certificado, historial/factura de compras.
- Correo real de contacto (Spec 006).

## Criterios de finalización
- No existe ninguna ruta mock ni catch-all con éxito.
- `npm run test:run` (server) en verde con los tests de RF-3, RF-4, RF-7.
- `server/README.md` actualizado.

## Dudas abiertas
- [NECESITA ACLARACIÓN] Prioridad de implementación de los módulos ausentes (¿antes o después de contacto y navegación?).
