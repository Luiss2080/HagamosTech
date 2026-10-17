# Spec 028 — Contacto y proceso UI-4

## Contexto y objetivo

UI-4 unifica el contacto público con el proceso real de recepción de consultas. Hoy el formulario de la página principal de contacto abre WhatsApp, vacía los datos y no registra el mensaje. El modal usa la API real, pero interpreta como error la respuesta exitosa actual del backend porque espera una propiedad `status` inexistente. También hay textos de contacto heredados que promocionan servicios fuera del alcance vigente.

## Historias de usuario

- H1: Como visitante quiero enviar una consulta y saber si fue recibida por HagamosTech.
- H2: Como visitante quiero entender qué información recibo al explicar mi necesidad y qué pasos siguen.
- H3: Como visitante quiero elegir WhatsApp como canal y confirmar el texto antes de enviarlo allí.

## Requisitos funcionales

- RF-1: Los formularios de contacto de la página y del modal enviarán sus datos al endpoint real `POST /api/contacto`; no abrirán WhatsApp ni afirmarán éxito antes de una respuesta exitosa de la API.
- RF-2: Una respuesta exitosa confirmará recepción para revisión por el equipo y limpiará los datos solo después del éxito; un error conservará los datos y mostrará un mensaje accesible para reintentar.
- RF-3: El estado de envío deshabilitará el botón mientras la solicitud esté en curso, y el formulario impedirá envíos duplicados.
- RF-4: El canal WhatsApp explicará que el texto se abre en WhatsApp y que la persona debe revisarlo/enviarlo desde esa aplicación.
- RF-5: Contacto y proceso comunicarán un flujo prudente: consulta, revisión, propuesta si es viable, desarrollo con alcance acordado y entrega; no prometerán tiempos, respuesta inmediata, aceptación ni resultados garantizados.
- RF-6: Los textos dentro del alcance no promocionarán automatizaciones, n8n, IA aplicada, hosting u operación de servidores, ni datos de sede/horario pendientes de confirmación.
- RF-7: Pruebas cubrirán respuesta exitosa, error de API, datos conservados, integración con la API, WhatsApp y CTA a contacto; vistas utilizables a 390 px y escritorio sin nuevas dependencias.

## Fuera de alcance

- Cambios al backend, contratos API, esquema de datos, notificaciones por correo o autenticación.
- Cambios a promociones/precios, información corporativa o legal que requiera confirmación.
- Garantizar plazos de respuesta, cotización, aceptación de proyectos, disponibilidad o medios de pago.
- Servicios de automatización, n8n, operación de servidores e infraestructura compleja.

## Decisiones de interfaz

- La página y el modal comparten el mismo servicio de envío existente y tratan toda respuesta HTTP exitosa como confirmación de recepción; no dependen de `status`.
- El mensaje de éxito describe únicamente que la consulta fue recibida por el sistema para revisión. La respuesta al visitante se representa solo si el endpoint responde con error explícito.
- WhatsApp sigue siendo un canal alternativo separado del formulario, con confirmación clara de que la persona todavía debe enviar el mensaje desde WhatsApp.
- Se retiran la dirección, el mapa y el horario de atención que la auditoría previa marcó como pendientes de confirmación; se conservan los canales digitales ya publicados.
- La metodología no garantiza tiempo, presupuesto ni resultado hasta revisar la solicitud y acordar alcance.

## Plan técnico

1. Conectar `FormularioContacto` al `ContactService` existente y mostrar estados accesibles.
2. Corregir el modal para considerar exitosa cualquier respuesta normal de `sendEmbeddedContact`; actualizar sus textos heredados.
3. Verificar/corregir copy de Hero, WhatsApp y `ComoTrabajamos` dentro del alcance de UI-4.
4. Añadir pruebas de componentes y estados reales simulados; revisar los recorridos en móvil/escritorio.
5. Actualizar el roadmap y ejecutar lint, suite y build.

## Validación

| Requisito | Evidencia | Estado |
|---|---|---|
| RF-1 a RF-3 | Pruebas de página y modal para envío real, respuesta, error y conservación de datos. | Pendiente |
| RF-4 a RF-6 | Pruebas de WhatsApp, proceso y ausencia de claims excluidos. | Pendiente |
| RF-7 | Recorrido responsive, suite, lint y build. | Pendiente |

## Estado

En implementación.
