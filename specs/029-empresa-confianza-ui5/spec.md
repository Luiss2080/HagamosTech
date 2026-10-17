# Spec 029 — Empresa y confianza UI-5

## Contexto y objetivo

UI-5 cubre `/sobre-nosotros` y sus rutas hijas de historia, misión/visión, valores y videos. La auditoría UI-0 detectó relatos de fundación, estructura de equipo, compromisos, afirmaciones amplias y embeds de TikTok cuya procedencia y autorización no están documentadas. El objetivo es ofrecer una presentación institucional más ordenada sin salir del sistema visual actual de HagamosTech, y limitar el contenido a la oferta vigente, el proceso ya publicado y aspiraciones expresadas como orientación, no como hechos ni garantías.

## Historias de usuario

- H1: Como visitante quiero comprender qué áreas cubre HagamosTech y a quién acompaña.
- H2: Como visitante quiero conocer los principios y el enfoque de trabajo sin encontrar promesas absolutas o datos de equipo no confirmados.
- H3: Como visitante quiero que las secciones institucionales se puedan recorrer desde sus rutas directas, con títulos y enlaces claros.

## Requisitos funcionales

- RF-1: La página `/sobre-nosotros` presentará el alcance respaldado por el Catálogo Maestro: desarrollo digital, diseño y acompañamiento académico sujeto a su alcance vigente.
- RF-2: La sección actualmente llamada “Misión y Visión” se expresará como propósito y rumbo de la oferta; no afirmará una misión/visión formal aprobada, tamaño, historia, cobertura, resultados ni capacidades no documentadas.
- RF-3: Los valores se presentarán en tarjetas estáticas con contenido prudente y acorde con el catálogo y el proceso vigente; no usarán carruseles automáticos, métricas, compromisos de resultado o controles sin nombre accesible.
- RF-4: `/sobre-nosotros/historia` conservará su ruta, pero no publicará fecha, personas o relato de origen sin fuente; la vista explicará el enfoque de revisión de solicitudes y alcance acordado.
- RF-5: `/sobre-nosotros/videos` conservará su ruta, retirará los embeds/IDs y métricas de TikTok sin fuente y autorización documentada, y presentará rutas a áreas de servicio vigentes como orientación, sin afirmar que son casos de éxito o trabajos realizados.
- RF-6: Las cuatro rutas hijas tendrán un `h1` propio, contenido en español y navegación de retorno/enlaces funcionales.
- RF-7: Se mantendrán la identidad visual establecida (negro, lima, blanco, tipografía y tratamiento de tarjetas del sitio); vistas y controles serán utilizables con teclado y a 390 px y escritorio, sin dependencias nuevas.
- RF-8: Pruebas verificarán copy autorizado, ausencia de embeds/afirmaciones retiradas, títulos de las cuatro rutas, destinos de enlaces y valores estáticos.

## Fuera de alcance

- Cambiar rutas, menú global, Catálogo Maestro, servicios, precios, políticas legales o configuración de la empresa.
- Publicar historia real, nombre de fundadores, cantidad de integrantes, ubicación, clientes, casos de éxito, certificaciones, métricas o videos hasta recibir fuente/autorización.
- Crear fotografías, logos, videos, perfiles de equipo o assets nuevos.
- Añadir dependencias, modificar API, base de datos o datos de autenticación.

## Decisiones de contenido e interfaz

- Se conserva cada ruta actual para no romper enlaces; las etiquetas de navegación identificarán las secciones según el contenido vigente.
- El relato de origen se sustituye por el enfoque de trabajo documentado en `/como-trabajamos`; la vista de videos se transforma en orientación a las áreas vigentes y no se etiqueta como portafolio.
- Misión/visión se rotula “Propósito y rumbo” para no presentar un texto editorial nuevo como declaración corporativa formal.
- El sistema visual parte de la interfaz actual: superficies oscuras, acentos lima, tarjetas, espaciado y tipografía del sitio. No se incorpora un lenguaje visual ajeno ni se cambia el sistema compartido.

## Plan técnico

1. Actualizar hero y composición de `Nosotros.jsx` dentro del tema visual vigente.
2. Reescribir las secciones de propósito/rumbo, valores y enfoque; remover la rotación automática.
3. Reemplazar el deck externo de TikTok por rutas a áreas vigentes basadas en enlaces existentes.
4. Añadir títulos/rutas accesibles a las cuatro vistas directas y ajustar navegación institucional/SEO correspondiente.
5. Añadir pruebas unitarias de las páginas y rutas; revisar responsive con Playwright; ejecutar lint, suite y build.

## Validación

| Requisito | Evidencia | Estado |
|---|---|---|
| RF-1 a RF-5 | Pruebas de alcance, valores estáticos, retiro de embeds y contenido no verificado. | Pendiente |
| RF-6 | Pruebas de render con título `h1` propio para las cuatro rutas directas. | Pendiente |
| RF-7 y RF-8 | Tests, recorrido responsive/teclado, lint, suite, build y `git diff --check`. | Pendiente |

## Estado

En implementación.
