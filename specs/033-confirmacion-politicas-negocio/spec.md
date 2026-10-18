# Spec 033 — Confirmación de políticas del negocio

## Objetivo

Preparar la revisión factual de Condiciones, Términos, Privacidad y Cookies antes de
editar sus afirmaciones. Se conservan rutas, secciones y estilo; no se publican plazos,
garantías, métodos de pago ni prácticas de datos no confirmados.

## Requisitos

- RF-1: Registrar las afirmaciones actuales y el dato que debe confirmar el negocio.
- RF-2: Contrastar las descripciones de cookies con almacenamiento y proveedores reales.
- RF-3: Evitar que una acción diga que guardó preferencias cuando no hay persistencia.
- RF-4: Actualizar las secciones existentes con los datos confirmados, sin borrar contenido
  ni rehacer la interfaz.
- RF-5: Añadir pruebas y registrar las decisiones y validación.

## Límites

- Esta spec no es una revisión legal profesional ni determina cumplimiento normativo.
- No se inventan políticas, plazos, garantías, pagos, facturación o acuerdos con terceros.
- No se cambian rutas, esquema de base de datos, proveedores, dependencias ni oferta.
- Las preferencias de cookies no se implementan hasta confirmar categorías y persistencia.

## Auditoría inicial y datos pendientes

| Área | Afirmación/interfaz actual | Confirmación necesaria |
|---|---|---|
| Garantía y ajustes | `/condiciones` promete cobertura de defectos técnicos y ajustes según política; `/terminos` repite esa cobertura. | Si se ofrece garantía; duración, cobertura, exclusiones y proceso. Si no existe una política fija, autorizar redacción según la propuesta de cada proyecto. |
| Pagos y cancelaciones | Términos menciona QR, transferencia y “otros medios”; `ComprasPagos.jsx` anuncia pago previo, comprobante y factura por servicio; el modal añade efectivo/tarjeta y cancelación antes de iniciar. | Medios aceptados hoy; cuándo se factura; si se emite factura; anticipos/saldos y reglas de cancelación/reembolso. |
| Datos personales | Privacidad declara categorías de datos, no compartirlos, no almacenar números de tarjeta y analítica agregada. | Datos pedidos en formularios, perfil y contacto; quién los recibe; proveedores externos; procesamiento de pagos y analítica activa. |
| Conservación | `RetencionDatos.jsx` afirma cuenta activa, historial fiscal 5 años, mensajes 2 años y cookies 30 días. | Plazos y sistemas donde se guardan cuentas, mensajes, comprobantes y respaldos. Indicar “por definir” si no hay política vigente. |
| Derechos y atención | La página fija plazos de 5, 10 y 15 días; contacto promete respuesta en 24 horas y presenta un canal seguro. | Canal atendido, responsable, horario/SLA y plazos que se pueden cumplir. |
| Cookies y almacenamiento | El gestor muestra categorías esenciales, funcionales, analíticas y publicitarias y confirma guardado; no persiste la selección. La aplicación usa `sessionStorage`, `localStorage` y cookie `hagamostech_token`. | Tecnologías externas, categorías, finalidad y vencimiento; confirmar si hay analítica/publicidad y si se desea persistir consentimiento. |
| Fechas | Hay fechas editoriales diferentes entre páginas. | Fecha efectiva al aprobar el contenido. |

## Plan

1. Revisar Constitución, Spec 031 y código de documentos legales.
2. Registrar prácticas comprobables y diferencias entre documentos.
3. Recibir confirmaciones de negocio.
4. Ajustar contenido y comportamiento del gestor en una tarea acotada.
5. Añadir pruebas para contenido confirmado y comportamiento real.
6. Ejecutar lint, tests, build y E2E conforme a `AGENTS.md`.

## Validación

| Requisito | Evidencia | Estado |
|---|---|---|
| RF-1 | Auditoría inicial y datos solicitados registrados aquí. | ✅ |
| RF-2 | Código confirma `sessionStorage`, `localStorage` y cookie `hagamostech_token`; falta revisar configuración de despliegue y terceros. | ⚠️ |
| RF-3 | El gestor solo actualiza React state; el mensaje de guardado es prematuro. | ⚠️ Pendiente confirmar categorías y persistencia. |
| RF-4 | Sin cambios a páginas o componentes en esta auditoría. | ⏳ |
| RF-5 | Decisiones aún no recibidas. | ⏳ |

## Estado

Auditoría inicial completada. La edición de contenido y el ajuste funcional del gestor
esperan datos reales del negocio.
