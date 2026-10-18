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
| Datos personales | El código solicita datos básicos de cuenta, perfil y contacto; los mensajes se guardan en base de datos y se envían por el correo configurado. No hay checkout en la web. | Revisar proveedores del despliegue/correo y obligaciones de conservación. |
| Conservación | La base de datos incluye usuarios, perfiles, mensajes, verificaciones y recuperación; no se identificó un purgado automático general. | La política de conservación debe definirse con la persona responsable y revisarse según obligaciones aplicables. |
| Derechos y atención | La UI conserva WhatsApp y contacto general; no hay SLA o DPO acreditados. Desactivar cuenta es diferente de borrar datos. | Confirmar responsable interno y obligaciones aplicables antes de publicar tiempos o garantías. |
| Cookies y almacenamiento | El código usa cookie de autenticación, `sessionStorage` y `localStorage`; no se encontraron integraciones de analítica/publicidad. El HTML carga fuentes y recursos de CDN. | Confirmar proveedores del despliegue; no se ofrece panel de consentimiento porque no hay categorías opcionales detectadas en el código. |
| Fechas | Se usan fechas de revisión editorial, no como aprobación legal. | Actualizar al aprobar la siguiente revisión del negocio. |

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
| RF-2 | Código fuente revisado: cookie de autenticación, `sessionStorage`, `localStorage`, recursos externos de fuentes/CDN y sin integraciones de analítica/publicidad encontradas. Falta verificar configuración activa de despliegue y correo. | ✅ Parcial |
| RF-3 | El gestor ahora es informativo; ya no presenta interruptores ni éxito de guardado ficticio. | ✅ |
| RF-4 | Condiciones, términos, modal, privacidad y cookies describen acuerdos flexibles, datos observados y almacenamiento local; se conservaron rutas y secciones. | ✅ Parcial: revisión de proveedores/despliegue y legal pendiente. |
| RF-5 | Pruebas de contenido comercial y de privacidad/cookies añadidas. | ✅ Parcial; validación completa de esta iteración pendiente. |

## Decisiones recibidas

- Garantías, ajustes, medios y modalidades de pago, anticipos y cancelaciones se conversan
  de forma flexible según la situación de cada cliente. Las condiciones específicas deben
  acordarse en la propuesta del proyecto; no se publicarán como plazos o reglas universales.
- El precio, alcance, entregas y fecha de inicio se confirman por propuesta antes de comenzar.
- No se publicará un medio de pago específico ni una regla universal de reembolso sin
  confirmación. La pausa o cancelación se conversa según avance y compromisos acordados.
- Sigue pendiente confirmar proveedores de correo/alojamiento, responsable de atención y
  obligaciones aplicables a la conservación. La aplicación no define un purgado automático
  general. El código fuente no basta para confirmar la configuración activa de despliegue ni
  para aprobar legalmente los textos.

## Validación de implementación parcial

- Vitest: 90/90 pruebas en 26 archivos.
- Playwright E2E: 9/9 pruebas.
- `npm run lint`: correcto.
- `npm run build`: correcto.
- `git diff --check`: correcto al cerrar esta iteración.

## Estado

Condiciones comerciales, privacidad y cookies actualizadas con base en la decisión recibida
y el código del proyecto. Falta validar servicios externos de despliegue/correo y revisar los
textos legalmente antes de presentarlos como aprobados.
