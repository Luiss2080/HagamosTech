# Spec 036 — Carruseles y tarjetas visuales

## Objetivo

Unificar la presentación de tarjetas de servicios y etapas en las páginas públicas de HagamosTech, evitando filas con una última tarjeta aislada.

## Requisitos

- RF-1: Las colecciones de cuatro o más tarjetas de servicios o etapas muestran hasta tres tarjetas a la vez en escritorio y permiten recorrer las restantes con controles accesibles.
- RF-2: Los carruseles responden a pantalla: tres tarjetas en escritorio, dos en tablet y una en móvil.
- RF-3: Cada tarjeta de servicios y cada etapa de proceso incluida en este alcance muestra una imagen pertinente, con texto legible sobre la imagen.
- RF-4: Se conservan el contenido, el estilo negro/verde, los enlaces y las rutas existentes.
- RF-5: Las tarjetas informativas legales, de formularios y de datos de cuenta conservan sus diseños compactos; no se convierten en galerías.
- RF-6: Los carruseles de herramientas de las interfaces públicas reutilizan el mismo componente de tarjeta del carrusel de tecnologías del Inicio, muestran logotipos oficiales disponibles y conservan navegación accesible, adaptación móvil y contenido propio de cada interfaz.
- RF-7: Cada sección pública de contenido debe incluir un título y una descripción que expliquen su propósito. Las secciones de ejemplos o testimonios presentan el título y la descripción junto a sus tarjetas en todas las interfaces. Se excluyen elementos estructurales sin contenido propio, como fondos, separadores y zonas de navegación.
- RF-8: Las características presentadas como una colección se conectan mediante una línea discontinua con iconos asociados a cada elemento, conservando legibilidad y adaptación móvil.
- RF-9: La mayoría de las secciones públicas de contenido reutilizan el fondo tecnológico de la web con olas de FondoTech. Se permiten excepciones cuando el fondo perjudique legibilidad, contraste, mapas, formularios o una composición visual intencional.
- RF-10: Se conserva el contenido veraz específico de cada interfaz; no se inventan capacidades, datos de clientes, resultados ni servicios para completar tarjetas.
- RF-11: Las tarjetas de ejemplos o testimonios muestran un icono de usuario y datos contextuales con iconos para fecha, hora y lugar o modalidad. Los datos no confirmados se indican como pendientes de coordinación.
- RF-12: El CTA final compartido mantiene título y descripción, usa el tema oscuro tecnológico con olas de FondoTech y aplica el diseño actualizado en todas sus interfaces de uso.

## Alcance

- Etapas de proceso de las ocho interfaces de servicio y de la página de metodología.
- Tarjetas de soluciones de la página de negocios, áreas de tecnología y especialidades académicas.
- Tres tarjetas visibles en escritorio para el carrusel existente de novedades.
- Carruseles de herramientas y tecnologías en las interfaces públicas que los presentan.
- Secciones de características de las páginas de servicios y páginas públicas de soluciones.
- Tratamiento del fondo tecnológico en secciones públicas de Inicio, Contacto, servicios, metodología, novedades, promociones y Sobre Nosotros.

## Validación

- `npm run lint`: correcto, 0 errores y cinco advertencias preexistentes en componentes fuera de este cambio.
- `npm run test:run -- --maxWorkers=1`: correcto, 11 archivos y 44 pruebas aprobados.
- `npm run build`: correcto.
- Las cuatro imágenes externas usadas en las etapas del proceso respondieron HTTP 200.
- RF-6: `ToolsMarquee.test.jsx` valida la presentación del carrusel, su título y descripción y el uso de tarjetas con logo compartidas con el Inicio.
- RF-7: `CarruselTestimonios.test.jsx` valida que cada carrusel presente título y descripción junto a las tarjetas; las secciones públicas de contenido intervenidas conservan encabezados propios. Fondos, separadores y vistas estructurales de cuenta quedan excluidos.
- RF-8: `FeatureTimeline.test.jsx` valida encabezado, descripción, icono y línea discontinua de características.
- RF-9: `FondoTech` con olas se aplica a la mayoría de secciones públicas de Inicio, Contacto, servicios, soluciones, metodología, novedades, promociones y Sobre Nosotros.
- RF-10: se reutiliza contenido existente de cada interfaz y se conserva el lenguaje de evaluación según alcance; no se agregan testimonios ni resultados de clientes.
- RF-11: `CarruselTestimonios.test.jsx` valida los iconos/datos contextuales y el icono de usuario; los campos sin dato real muestran “A coordinar” o “A definir”.
- RF-12: `CenteredProjectCTA.test.jsx` valida el tema oscuro, el fondo SVG de FondoTech y el título/descripción del CTA final compartido.
