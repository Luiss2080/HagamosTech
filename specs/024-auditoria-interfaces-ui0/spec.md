# Spec 024 — Auditoría de interfaces UI-0

## Contexto y objetivo

Antes de actualizar las numerosas pantallas de HagamosTech, se necesita una línea base de rutas, contenido, comportamiento visible y adaptación móvil. Esta fase inspecciona las interfaces actuales sin modificar código de producto y deja hallazgos priorizados para especificar las fases de implementación siguientes.

## Historias de usuario

- H1: Como equipo quiero reconocer contradicciones de contenido y experiencia antes de rediseñar.
- H2: Como visitante quiero que la oferta, canales y políticas visibles sean correctos y coherentes.
- H3: Como mantenedor quiero una matriz de rutas para revisar cada grupo y no olvidar pantallas secundarias.

## Requisitos funcionales

- RF-1: EL EQUIPO inventariará las 37 rutas funcionales declaradas, la ruta comodín y los grupos de componentes globales.
- RF-2: EL EQUIPO inspeccionará páginas representativas en escritorio y móvil y medirá desbordamiento horizontal a 390 px.
- RF-3: EL EQUIPO registrará hallazgos por prioridad para inicio, servicios, contacto, empresa, cuenta, legal, errores y rutas internas.
- RF-4: EL EQUIPO distinguirá lo observado directamente de lo que no pudo validarse por falta de backend o confirmación de negocio/legal.
- RF-5: EL EQUIPO no cambiará UI, rutas ni lógica comercial durante la auditoría.
- RF-6: EL EQUIPO propondrá el orden de fases y las decisiones que deben resolverse antes de cada una.

## Fuera de alcance

- Modificar código o aplicar las correcciones identificadas.
- Enviar formularios, iniciar sesión, editar datos, efectuar compras o aceptar decisiones legales en nombre de la empresa.
- Confirmar hechos legales, comerciales, dirección/canales, videos, seguridad o comportamiento de servicios externos sin fuentes del equipo.

## Plan ejecutado

1. Levantar la aplicación de este repositorio en `http://localhost:4175` porque el puerto configurado 4000 estaba ocupado por otra aplicación.
2. Recorrer las 37 rutas funcionales y la ruta comodín con Playwright CLI.
3. Revisar títulos, encabezados, contenido visible, consola, capturas representativas y overflow a 390 px.
4. Cotejar hallazgos críticos con componentes fuente y el Catálogo Maestro.
5. Documentar la matriz y el orden de UI-1 a UI-8 en `docs/auditoria-interfaces-ui0.md`.

## Criterios de finalización

- Las 38 entradas (37 rutas funcionales + comodín) aparecen en una matriz.
- La revisión móvil registra el resultado y sus límites.
- Los riesgos de contenido/legal, cuenta/backend y páginas internas quedan asignados a fases futuras.
- El documento no trata respuestas 502 del entorno como éxito o datos reales.
- No hay cambios de producto en esta fase.

## Validación

| Requisito | Evidencia | Estado |
|---|---|---|
| RF-1 | Matriz de rutas en `docs/auditoria-interfaces-ui0.md` | ✅ |
| RF-2 | Playwright, viewport 390 × 844; 38 entradas sin overflow horizontal del documento | ✅ |
| RF-3 y RF-6 | Hallazgos priorizados y orden de UI-1–UI-8 | ✅ |
| RF-4 | Backend no disponible; 502 de perfil/compras registrados como limitación | ✅ |
| RF-5 | Sin modificación de UI, rutas o lógica comercial | ✅ |
| Capturas | Seis capturas representativas en `output/playwright/` | ✅ |
