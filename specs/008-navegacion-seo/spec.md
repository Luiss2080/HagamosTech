# Spec 008 — Navegación, SEO y rendimiento

## Contexto y objetivo
El bundle inicial pesa ~1.34 MB en un solo chunk (Vite avisa > 500 kB), todas las páginas se
cargan de entrada y el título del documento es siempre "HAGAMOSTECH". Además, algunos enlaces del
Footer apuntan a anclas de la home que no existen. Esta spec mejora carga, SEO básico y navegación.

## Usuarios / actores
Visitantes y motores de búsqueda.

## Historias de usuario
- H1: Como visitante quiero que la primera carga sea más liviana.
- H2: Como visitante quiero que cada página tenga un título claro en la pestaña.
- H3: Como usuario quiero que los enlaces del Footer lleven a páginas reales.

## Requisitos funcionales (criterios de aceptación en EARS)
- RF-1: EL SISTEMA cargará las páginas de ruta con `React.lazy` (code-splitting) en lugar de importarlas todas en el bundle inicial.
- RF-2: MIENTRAS se carga una ruta diferida, EL SISTEMA mostrará un fallback de carga.
- RF-3: CUANDO cambie la ruta, EL SISTEMA actualizará `document.title` y la meta descripción según un mapa de rutas.
- RF-4: SI la ruta no está en el mapa, ENTONCES EL SISTEMA usará un título/descripción por defecto (marca).
- RF-5: EL SISTEMA eliminará los enlaces del Footer que apuntan a anclas inexistentes y los reemplazará por rutas reales.
- RF-6: EL SISTEMA no emitirá el aviso de chunk > 500 kB en `npm run build`.
- RF-7: SI el usuario navega a una URL desconocida, ENTONCES verá la página 404.

## Requisitos no funcionales
- Sin cambios de diseño visual.
- El mapa SEO debe ser testeable de forma aislada.

## Casos límite
- Ruta de error (`/errors/500`) → título específico.
- Rutas hijas (`/sobre-nosotros/historia`) → título por prefijo.
- Rutas con parámetros retiradas (`/catalogo/:id`) → 404.

## Fuera de alcance
- Unificación de la paleta de Promociones/Novedades con el verde lima de la marca (spec de diseño aparte).
- SSR/prerender para SEO avanzado.
- Sitemap.xml/robots.txt.

## Criterios de finalización
- Build sin aviso de chunk > 500 kB y con varios chunks.
- `tituloParaRuta` cubierto por tests.
- Footer sin enlaces rotos; `npm run lint`, `npm run test:run` (raíz y server) y E2E en verde.

## Dudas abiertas
- [NECESITA ACLARACIÓN] ¿Cuándo se aborda la unificación de paleta (Spec de diseño)?
