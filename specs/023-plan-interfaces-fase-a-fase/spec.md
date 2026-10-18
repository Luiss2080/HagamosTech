# Spec 023 — Plan de actualización de interfaces por fases

## Contexto y objetivo

HagamosTech contiene numerosas rutas públicas, de servicios, contacto, legales y de cuenta. Una actualización global simultánea sería difícil de revisar y podría mezclar contenido, autenticación y comportamiento. Esta spec establece inventario, orden de fases y puertas de calidad; no modifica interfaces ni comportamiento.

## Historias de usuario

- H1: Como equipo quiero actualizar un grupo coherente de pantallas por vez y poder revisar el resultado antes de avanzar.
- H2: Como visitante quiero encontrar una navegación clara y consistente en móvil y escritorio.
- H3: Como mantenedor quiero saber qué rutas y componentes globales están cubiertos en cada fase.

## Requisitos funcionales

- RF-1: EL PLAN agrupará las rutas existentes en entrada/navegación, servicios, empresa/proceso, contacto, cuenta/acceso, legal, errores y elementos globales.
- RF-2: EL PLAN ordenará el trabajo desde auditoría y sistema visual compartido, continuando por interfaces públicas, servicios, conversión, empresa, cuenta, legal/errores y QA transversal.
- RF-3: CADA FASE tendrá una spec concreta antes de modificar código, un alcance delimitado y criterios de aceptación.
- RF-4: CADA FASE verificará contenido autorizado, móvil/escritorio, accesibilidad y pruebas aplicables antes de iniciar la siguiente.
- RF-5: EL PLAN identificará rutas de secciones internas y promociones como decisiones por auditar, sin asumir su eliminación ni su contenido futuro.
- RF-6: EL PLAN mantendrá como reglas las exclusiones y la fuente única de oferta ya documentadas en el Catálogo Maestro.

## Fuera de alcance

- Rediseñar o modificar componentes en esta spec.
- Cambiar rutas, APIs, autenticación, esquema de base de datos o servicios publicados.
- Fijar un estilo nuevo o eliminar contenido antes de revisar su propósito y fuente.

## Plan técnico

1. Inventariar las rutas declaradas en `src/app/App.jsx`.
2. Agruparlas por tarea del visitante y dependencias compartidas.
3. Documentar fases, entregables, dependencias y criterios para avanzar en `docs/roadmap-actualizacion-oferta.md`.
4. En la UI-0 posterior, inspeccionar la representación visual y funcional de cada ruta y crear una matriz por pantalla.

## Criterios de finalización

- Todas las rutas funcionales declaradas y la ruta comodín se encuentran asignadas a un grupo.
- Las fases tienen un orden, resultado verificable y criterio de salida.
- Se identifica UI-0 como siguiente paso y se aclara que es auditoría, sin rediseño prematuro.
- La oferta y las exclusiones vigentes se preservan.

## Validación

| Requisito | Evidencia | Estado |
|---|---|---|
| RF-1, RF-2 y RF-3 | Inventario y fases en el roadmap | ✅ |
| RF-4 | Proceso de trabajo y puertas de salida definidos | ✅ |
| RF-5 | Rutas candidatas a decisión listadas para UI-0 | ✅ |
| RF-6 | Reglas enlazadas al Catálogo Maestro y a Specs 016/022 | ✅ |
| Validación de repositorio | No hay cambios de código en esta spec | ✅ No requiere lint/build |
