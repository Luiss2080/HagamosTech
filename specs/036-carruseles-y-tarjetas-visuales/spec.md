# Spec 036 — Carruseles y tarjetas visuales

## Objetivo

Unificar la presentación de tarjetas de servicios y etapas en las páginas públicas de HagamosTech, evitando filas con una última tarjeta aislada.

## Requisitos

- RF-1: Las colecciones de cuatro o más tarjetas de servicios o etapas muestran hasta tres tarjetas a la vez en escritorio y permiten recorrer las restantes con controles accesibles.
- RF-2: Los carruseles responden a pantalla: tres tarjetas en escritorio, dos en tablet y una en móvil.
- RF-3: Cada tarjeta de servicios y cada etapa de proceso incluida en este alcance muestra una imagen pertinente, con texto legible sobre la imagen.
- RF-4: Se conservan el contenido, el estilo negro/verde, los enlaces y las rutas existentes.
- RF-5: Las tarjetas informativas legales, de formularios y de datos de cuenta conservan sus diseños compactos; no se convierten en galerías.

## Alcance

- Etapas de proceso de las ocho interfaces de servicio y de la página de metodología.
- Tarjetas de soluciones de la página de negocios, áreas de tecnología y especialidades académicas.
- Tres tarjetas visibles en escritorio para el carrusel existente de novedades.

## Validación

- `npm run lint`: correcto, 0 errores y cinco advertencias preexistentes en componentes fuera de este cambio.
- `npm run test:run -- --maxWorkers=1`: correcto, 7 archivos y 39 pruebas aprobados.
- `npm run build`: correcto.
- Las cuatro imágenes externas usadas en las etapas del proceso respondieron HTTP 200.
