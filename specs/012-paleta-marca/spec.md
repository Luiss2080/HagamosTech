# Spec 012 — Unificación de paleta a verde lima

## Contexto y objetivo
`Promociones` y `Novedades` usaban una paleta naranja/marrón de restaurante, distinta del verde
lima `#A3E635` sobre negro de la marca. Esta spec unifica esas páginas (y el hero compartido
`MigasPan`) a la paleta de marca, sin tocar el contenido.

## Usuarios / actores
Visitantes.

## Requisitos funcionales (criterios de aceptación en EARS)
- RF-1: EL SISTEMA usará `#A3E635` (+ `#84CC16` en hover) como acento en `Promociones` y `Novedades`.
- RF-2: EL SISTEMA usará fondos oscuros (`#0A0A0A`/`#111827`) en lugar de cremas y marrones.
- RF-3: EL SISTEMA mostrará texto claro (blanco/slate) sobre fondo oscuro y texto oscuro sobre fondos lima (contraste legible).
- RF-4: EL SISTEMA unificará el hero compartido `MigasPan` (título, badge y descripción) a la paleta de marca.
- RF-5: EL SISTEMA mantendrá el contenido y las rutas sin cambios (sin regresiones visuales graves ni errores).

## Requisitos no funcionales
- Sin dependencias nuevas; solo cambios de clases.
- Contraste legible (texto claro sobre oscuro; oscuro sobre lima).

## Casos límite
- Tarjetas con fondo lima usan texto oscuro (no blanco).
- Flechas sobre píldora clara usan texto oscuro.
- Clases de sombra inválidas generadas por el reemplazo se corrigen.

## Fuera de alcance
- Unificar el interior de las páginas legales (Terminos/Privacidad/Cookies/Condiciones), que
  conservan algunos títulos oscuros preexistentes.
- Rediseño de layout.

## Criterios de finalización
- Capturas de `/#/promociones` y `/#/novedades` con paleta lima/oscura y buen contraste.
- `npm run lint`, `npm run test:run`, `npm run build` y `npm run test:e2e` en verde.

## Dudas abiertas
- [NECESITA ACLARACIÓN] ¿Se extiende la unificación al interior de las páginas legales?
