# SDD 037 Actualización del contenido público

## Propósito

Actualizar por fases el texto de las interfaces públicas de HagamosTech para que una persona entienda qué ofrecemos, para quién, qué puede esperar y qué queda fuera del alcance. Esta spec registra el plan y su ejecución; no habilita ofertas fuera del Catálogo Maestro.

## Fuentes y prioridad

1. Las decisiones expresas del usuario en esta solicitud determinan el alcance del trabajo.
2. `docs/catalogo-servicios.md` es la fuente vigente de la oferta y `src/data/serviciosData.js` su espejo para la interfaz.
3. `HagamosTechcc(2).docx` es material de referencia para detectar ideas y ejemplos. No autoriza por sí mismo nuevas ofertas, precios, modalidades, garantías ni afirmaciones.

Si una idea del Word contradice los límites expresos o el Catálogo Maestro, se excluye o se deja pendiente de decisión antes de redactar copy público.

## Decisiones confirmadas para el plan

- La oferta comprende acompañamiento académico, diseño y desarrollo de páginas web, sistemas y software, recursos gráficos y profesionales, y soluciones digitales a medida.
- El acompañamiento académico puede abarcar estudiantes de colegio, secundaria, institutos y universidad; mentorías, tareas guiadas, proyectos socioformativos, informes, monografías, programación y preparación de exposiciones, sujeto a materia, nivel, disponibilidad y alcance.
- El apoyo académico orienta al estudiante para que comprenda y presente su propio trabajo. No ofrece suplantación ni promete calificaciones.
- El trabajo digital se describe como desarrollo de soluciones según requisitos, capacidades, viabilidad y alcance acordado. Los ejemplos ilustran posibilidades; no son paquetes ni funcionalidades garantizadas.
- No se ofrecen automatizaciones de procesos, n8n, operación o migración de servidores, DevOps ni infraestructura compleja.
- No se publican precios, suscripciones, tarifas por estudiante, licencias anuales, plazos rápidos, soporte continuo, garantías, confidencialidad absoluta ni resultados comprobados sin confirmación expresa.
- Las integraciones técnicas puntuales solo se mencionan como posibilidad a evaluar si son viables y no implican automatización de procesos ni infraestructura excluida.
- El vertical especializado de restaurantes y el comercio electrónico de ese vertical no se reintroducen. Las tiendas online generales siguen sujetas al catálogo y a la evaluación de alcance.

## Lectura del Word

| Tratamiento | Ideas del documento | Regla para el contenido web |
|---|---|---|
| Incorporar y contrastar con el catálogo | Sitios, tiendas online generales, catálogos, blogs, portafolios, reservas, aplicaciones web; sistemas; portales educativos; mantenimiento y mejoras; proyectos académicos | Agrupar por necesidad y explicar que las funciones se revisan según requisitos y viabilidad. Mantener solo los servicios que confirme el catálogo actualizado. |
| Reformular con límites | Integraciones por API, pasarelas, correo, facturación electrónica; funciones con IA; soporte a sistemas existentes | Presentarlas como evaluación técnica puntual. No prometer conexiones, compatibilidad, despliegue, mantenimiento permanente ni resultados. |
| Excluir como oferta | Automatizaciones, respuestas o flujos automáticos, n8n, migración y operación de servidores, DevOps, infraestructura compleja y soluciones “sin límites de complejidad” | Retirarlas de menús, tarjetas, promociones, chat y llamadas a la acción. Si una ruta antigua recibe visitas, su tratamiento se define en Fase 4 antes de cambiar navegación o rutas. |
| No publicar sin decisión y evidencia | Suscripción mensual, pago por estudiante, licencia anual, plazos rápidos, resultados comprobados, 100 % de confidencialidad, soporte continuo, hardware/robótica como servicio comercial | No convertir las propuestas del Word en promesas. Registrar cualquier decisión futura en el catálogo y en una spec antes de publicarla. |

## Mapa de contenido por familias

La redacción se organizará para que una persona pueda llegar desde una necesidad concreta a una categoría clara:

1. **Acompañamiento académico:** mentorías, explicación, ejercicios y tareas guiadas, informes, monografías, proyectos socioformativos y preparación de presentaciones.
2. **Desarrollo web:** sitios corporativos e institucionales, landing pages, portafolios, tiendas y pedidos generales, catálogos, blogs, reservas, plataformas educativas y de cursos, portales inmobiliarios o de noticias, directorios, foros, comunidades y aplicaciones web, según viabilidad.
3. **Sistemas y software:** desarrollo de sistemas web y software; se pueden evaluar ejemplos de inventario, ventas/POS, facturación, contabilidad, CRM, recursos humanos, documentos, asistencia, citas, producción y gestión académica o administrativa. Son referencias de necesidad, no soluciones listas.
4. **Portales institucionales:** portales educativos y de organizaciones, con módulos como perfiles de estudiantes, docentes y administración, calificaciones, inscripciones, pagos, comunicados, bibliotecas o aulas virtuales, definidos con cada institución.
5. **Mejoras e integraciones puntuales:** revisión, correcciones, nuevas funciones, documentación e integración técnica por API cuando el alcance sea viable y no implique automatización de procesos ni infraestructura excluida.
6. **Diseño y desarrollo a medida:** solicitudes que no encajen en las familias anteriores, evaluadas antes de confirmar una propuesta.
7. **Otras categorías vigentes:** emprendedores, empleo y diseño gráfico, de acuerdo con el Catálogo Maestro.

Este mapa organiza el mensaje. No agrega categorías ni amplía la oferta canónica por sí solo. La Fase 1 resolverá si las familias tecnológicas se reflejan como subcategorías del catálogo o como bloques editoriales dentro de las categorías actuales.

## Fases de ejecución

### Fase 0 Inventario y diagnóstico de copy

**Objetivo:** ubicar todo el texto público y las duplicaciones antes de redactar.

**Superficies a revisar:** Inicio, las cuatro vistas de “Qué hacemos”, las páginas de Servicios, Cómo trabajamos, Sobre Nosotros y sus subsecciones, Contacto, Novedades, Promociones, footer, testimonios y ejemplos, navegación, modales, chat y vistas legales. Revisar además Perfil, Configuración, Historial y errores cuando presenten una oferta, condición o enlace comercial; no se reescriben etiquetas transaccionales sin relación con la oferta. Revisar rutas antiguas o internas que puedan seguir mostrando servicios retirados.

**Entregables:** matriz ruta/sección/componente, texto actual, fuente canónica, conflicto encontrado, decisión y fase responsable; lista de enlaces y accesos que presentan automatización u ofertas retiradas.

**Cierre:** todas las rutas declaradas en `src/app/App.jsx` están asignadas a una categoría de revisión; los componentes compartidos y textos reutilizados están identificados.

### Fase 1 Catálogo y arquitectura de la oferta

**Objetivo:** dejar una sola estructura comercial clara antes de actualizar las páginas.

**Trabajo:** comparar el catálogo, `serviciosData.js`, la navegación y el mapa de contenido de este SDD. Definir la jerarquía final de categorías y subcategorías, los ejemplos permitidos, las exclusiones y las palabras consistentes para “desarrollo”, “acompañamiento”, “integración” y “mantenimiento”.

**Entregables:** Catálogo Maestro revisado, mapeo del contenido web a categorías existentes, decisiones sobre servicios no cubiertos y pruebas actualizadas que validen el espejo de datos.

**Cierre:** cada servicio ofrecido tiene una descripción canónica; ningún texto de interfaz crea una categoría o capacidad por fuera de la fuente.

### Fase 2 Acompañamiento académico

**Objetivo:** explicar el alcance académico con ejemplos concretos y límites responsables.

**Superficies:** Academia, Apoyo Académico, Inicio, soluciones para estudiantes, testimonios orientativos, Contacto y cualquier menú o promoción que presente estos servicios.

**Trabajo:** ordenar el copy por nivel y tipo de necesidad: mentoría y comprensión, ejercicios/tareas guiadas, informes y monografías, proyectos socioformativos, programación, exposiciones y defensas. Aclarar disponibilidad por materia/nivel y que el estudiante conserva la autoría.

**Cierre:** el mismo servicio tiene el mismo nombre y alcance en todas las rutas; no aparece oferta de trabajos hechos por encargo, suplantación ni garantía de nota.

### Fase 3 Desarrollo digital y tecnológico

**Objetivo:** explicar con claridad el desarrollo web y de software sin dar a entender que todo viene incluido.

**Superficies:** Tecnología, Negocios, Soluciones personalizadas, Desarrollo Web, Sistemas y Apps, Inteligencia Artificial, páginas de servicio relacionadas, testimonios orientativos, recursos y carruseles de herramientas.

**Trabajo:** presentar páginas y aplicaciones web, sistemas, portales, mejoras de software e integraciones puntuales bajo la arquitectura aprobada en Fase 1. Agrupar ejemplos por necesidad y separar ejemplos ilustrativos de funciones confirmadas. Aclarar evaluación de requisitos, alcance, viabilidad, etapas y entregables antes de una propuesta.

**Cierre:** no se prometen sistemas listos, compatibilidad universal, tecnología concreta, plazos, pagos recurrentes ni módulos no acordados. Funciones con IA se mencionan solo cuando correspondan al catálogo y se sujetan a evaluación.

### Fase 4 Límites, mantenimiento y rutas heredadas

**Objetivo:** evitar que una visita a una ruta o mensaje antiguo prometa un servicio retirado.

**Superficies:** menú principal, submenús, `/servicios/automatizacion`, página y recorrido de Automatización, páginas de IA, promociones, chat, modales, Footer y enlaces internos.

**Trabajo:** retirar la automatización de la oferta y decidir, antes de implementar, si la ruta heredada se elimina, redirige o muestra un aviso neutral con enlaces a desarrollo de sistemas. Definir el texto de mantenimiento limitado a revisión y mejoras de software, sin operación de servidores, migraciones de infraestructura ni soporte continuo. Revisar las afirmaciones de precios, suscripciones y pagos en promociones.

**Cierre:** ninguna ruta, botón, CTA, mensaje automático ni enlace presenta los servicios excluidos como disponibles. No se cambia el diseño restaurado del footer; se revisa únicamente su texto según el copy aprobado.

### Fase 5 Copy final y aplicación consistente

**Objetivo:** reemplazar el texto de todas las interfaces públicas con la estructura aprobada.

**Trabajo:** redactar por ruta y sección con título, descripción breve, beneficios o ejemplos verificables, límites aplicables y CTA. Reutilizar datos compartidos desde las fuentes canónicas; evitar bloques de oferta duplicados y testimonios presentados como clientes reales cuando solo sean ejemplos.

**Cierre:** el copy aprobado está aplicado en todas las superficies de la Fase 0; cada sección informa lo suficiente para entender la oferta sin inventar condiciones comerciales.

### Fase 6 Validación y publicación

**Objetivo:** comprobar consistencia y calidad del contenido antes de dar por cerrada la actualización.

**Validaciones:** pruebas de integridad entre Catálogo Maestro y `serviciosData.js`; prueba de contenido que recorra el texto público y detecte ofertas excluidas o promesas no aprobadas; pruebas de páginas y enlaces; `npm run lint`, `npm run test:run` y `npm run build`; revisión visual de escritorio y móvil para descartar desbordes de texto.

**Cierre:** todas las verificaciones pasan, las discrepancias tienen una decisión documentada y la matriz de Fase 0 queda marcada como completada.

## Requisitos de aceptación

- **RF-1:** El texto publicado usa el Catálogo Maestro como fuente única y mantiene sincronizado `src/data/serviciosData.js`.
- **RF-2:** Todas las rutas y superficies públicas quedan cubiertas por el inventario y la aplicación del copy aprobado.
- **RF-3:** La oferta académica presenta orientación, niveles y ejemplos permitidos, y conserva la autoría del estudiante sin prometer resultados.
- **RF-4:** La oferta digital explica desarrollo web, software y soluciones a medida según la arquitectura aprobada y sujeta a alcance y viabilidad.
- **RF-5:** Automatizaciones, n8n, operación/migración de servidores, DevOps e infraestructura compleja no aparecen como servicios disponibles.
- **RF-6:** No aparecen precios, modalidades de cobro, plazos, garantías, soporte, resultados ni compromisos no confirmados.
- **RF-7:** Las rutas heredadas y los puntos de entrada compartidos no contradicen la oferta actual.
- **RF-8:** Las pruebas detectan discrepancias con el catálogo, servicios fuera de alcance y copy repetido que se aparte de la fuente canónica.
- **RF-9:** Se preservan rutas y diseño salvo que una decisión posterior autorice un cambio separado.

## Registro de ejecución

- **Fase 0 — Inventario:** revisados los puntos públicos de navegación, SEO, páginas de servicios, promociones, datos comerciales compartidos y respuestas del chat relacionados con el alcance. Se identificaron la ruta heredada de automatización, el enlace del menú que la presentaba como sistemas y la falsa periodicidad de los planes.
- **Fase 1 — Catálogo:** confirmado el Catálogo Maestro y `serviciosData.js` como fuente canónica y espejo. Conservadas las 7 categorías y 33 servicios existentes; el catálogo ya incluye la variedad académica y digital solicitada y excluye infraestructura compleja.
- **Fase 2 — Academia:** la fuente canónica, Academia, Apoyo Académico y chat mantienen mentorías, tareas guiadas, informes, monografías y proyectos socioformativos; se aclara que el estudiante desarrolla y presenta su trabajo. Quitada una mención ajena al catálogo sobre robótica educativa.
- **Fase 3 — Desarrollo digital:** ajustados metadatos y descripciones de navegación para comunicar desarrollo web, software, bases de datos y funciones con IA sujetas a evaluación. Se mantienen ejemplos de posibilidades bajo requisitos, alcance y viabilidad.
- **Fase 4 — Límites y rutas:** `/servicios/automatizacion` conserva compatibilidad y redirige a `/servicios/sistemas-apps`; el menú ya no ofrece automatización. El chat aclara que se pueden evaluar funciones con IA y que no se ofrecen automatizaciones de procesos ni n8n. No se modificó el diseño ni el contenido restaurado del footer.
- **Fase 5 — Copy:** actualizados el menú, metadatos, preguntas frecuentes, respuesta del chat y alternativas de trabajo en Promociones. La vista no presenta suscripciones, tarifas periódicas ni precios universales.
- **Fase 6 — Validación:** `npm run lint` sin errores (4 advertencias preexistentes de dependencias de efectos); `npm run test:run` con 18 archivos y 56 pruebas aprobadas; `npm run build` completado.

## Fuera de alcance de este SDD

- Añadir funcionalidades, integraciones, automatizaciones o infraestructura.
- Definir precios o un modelo de cobro sin datos y confirmación del negocio.
- Rediseñar componentes, navegación o el footer.
- Publicar testimonios, clientes, resultados o garantías no verificables.

## Validación de esta ejecución

- Revisión del Catálogo Maestro, la Constitución y las specs de contenido y vistas vigentes.
- Extracción textual del Word y clasificación de sus propuestas frente a las exclusiones confirmadas.
- Revisión de rutas, enlaces de navegación, metadatos, mensajes del chat, promoción de servicios y ejemplos del alcance académico y digital.
- `npm run lint`: pasa sin errores; deja 4 advertencias de dependencias de efectos en páginas existentes.
- `npm run test:run`: 18 archivos y 56 pruebas aprobadas.
- `npm run build`: compilación de producción aprobada.
