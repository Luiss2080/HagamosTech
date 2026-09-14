# Plan técnico — Spec 004

## Archivos editados
- `src/pages/Promociones/PromocionesPagina.jsx` (quita carrusel de productos).
- `src/pages/Promociones/sections/HeroPromociones.jsx`, `VentajasCarrusel.jsx`,
  `PlanesSuscripcion.jsx`, `PromoDestacada.jsx`, `CtaContacto.jsx`.
- `src/pages/Novedades/sections/HeroNovedades.jsx`, `AnunciosTicker.jsx`,
  `LogrosNovedades.jsx`, `AgendaNovedades.jsx`.

## Archivos eliminados
- `src/pages/Promociones/sections/CarruselOfertas.jsx`
- `src/components/carouseles/CarruselProductos.jsx`

## Archivos creados
- `src/test/contenidoTech.test.js` (test de verdad de contenido)
- `e2e/paginas.spec.js` (E2E de las dos páginas)

## Decisiones técnicas
- **Reescribir datos, no rediseñar.** Se conservan layouts y clases; solo cambia el contenido
  y las imágenes. _Alternativa descartada: rehacer el diseño (fuera de alcance y riesgo alto)._
- **Imágenes por URL externa (Unsplash) con fallback local.** Las imágenes locales de
  restaurante no existen en `public/`. _Alternativa descartada: dejar rutas rotas._
- **Test de contenido por lectura de archivos con `node:fs`.** Simple y determinista; cubre RF-6.
  _Alternativa descartada: renderizar cada sección y buscar texto (más lento y frágil)._
- **Verificación E2E de ausencia de términos en el DOM.** Aporta evidencia real de RF-4.

## Estrategia de tests
- `contenidoTech.test.js`: prohíbe términos del vertical en `Promociones` y `Novedades`.
- `e2e/paginas.spec.js`: carga `/#/promociones` y `/#/novedades`, verifica marca, ausencia de
  términos y cero errores de consola.

## Cobertura de RF
| Parte | RF |
|---|---|
| Promociones | RF-1, RF-3, RF-7 |
| Novedades | RF-2 |
| Test de contenido | RF-6 |
| E2E | RF-4, RF-5 |
