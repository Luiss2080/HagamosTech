# Spec 004 — Contenido tech en Promociones y Novedades

## Contexto y objetivo
Tras retirar el vertical restaurante (Spec 003), las páginas `Promociones` y `Novedades`
seguían mostrando salteñas, combos, cafetería y sucursales, y el componente
`CarruselProductos` enlazaba a `/catalogo` (ya retirado). Esta spec reescribe su contenido a
tecnología para que el sitio diga la verdad en todas sus secciones.

## Usuarios / actores
Visitantes que exploran promociones y novedades de HagamosTech.

## Historias de usuario
- H1: Como visitante quiero ver packs y planes de servicios tech en Promociones.
- H2: Como visitante quiero enterarme de lanzamientos y talleres en Novedades.

## Requisitos funcionales (criterios de aceptación en EARS)
- RF-1: EL SISTEMA mostrará en `Promociones` ofertas de servicios tecnológicos (packs y planes de soporte), sin productos de restaurante.
- RF-2: EL SISTEMA mostrará en `Novedades` noticias, anuncios y logros relacionados a tecnología.
- RF-3: EL SISTEMA eliminará de `Promociones` el carrusel de productos de restaurante y el componente que enlazaba a `/catalogo`.
- RF-4: SI el usuario abre `Promociones` o `Novedades`, ENTONCES EL SISTEMA no mostrará términos del vertical restaurante (`salteña`, `frapuccino`, `cafetería`, `delivery`) ni errores de consola.
- RF-5: EL SISTEMA mantendrá las rutas `/promociones` y `/novedades` y su navegación.
- RF-6: EL SISTEMA incluirá un test automático que verifique la ausencia de términos prohibidos en esas páginas.
- RF-7: LOS precios de los packs y planes se mostrarán como referencia en Bs y la acción principal será el contacto por WhatsApp.

## Requisitos no funcionales
- Idioma español; sin romper el diseño existente.
- Las imágenes deben existir (locales) o tener fallback; no referenciar rutas inexistentes.

## Casos límite
- Imagen externa caída → fallback local (`/img/03_Banners/Hero.png`).
- Nombres de variables internas (p. ej. `combos`) no deben disparar el test de términos; el test solo inspecciona texto visible del código, no identificadores.

## Fuera de alcance
- Rediseño de la paleta (naranja/marrón → verde lima) y de la identidad visual.
- Copy de otras páginas.
- API veraz (Spec 005).

## Criterios de finalización
- Test de contenido en verde (RF-6).
- E2E de `/promociones` y `/novedades` sin errores ni términos prohibidos (RF-4).
- `npm run lint`, `npm run test:run`, `npm run build` en verde.

## Dudas abiertas
- [NECESITA ACLARACIÓN] ¿Se unifica más adelante la paleta de estas dos páginas con el verde lima de la marca? (Se evalúa en Spec 008.)
