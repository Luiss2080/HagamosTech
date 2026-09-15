# Spec 014 — Estilo de botones y modales

## Contexto y objetivo
Tras restaurar las superficies blancas (Spec 013), los botones y modales conservaban acentos
**rojo/marrón/dorado** del vertical anterior (`#a41e22`, `#801518`, `#c5a059`, etc.), ajenos a la
marca. Esta spec unifica **solo los acentos** a verde lima/oscuro, **manteniendo las superficies
blancas** y los textos oscuros.

## Requisitos funcionales (criterios de aceptación en EARS)
- RF-1: EL SISTEMA reemplazará los acentos rojo/marrón/dorado por verde lima `#A3E635` (y `#84CC16` en hover) en modales, perfil y botones.
- RF-2: EL SISTEMA conservará en blanco las tarjetas, paneles y inputs que ya eran blancos.
- RF-3: SI un botón tiene fondo lima, ENTONCES su texto será oscuro (`#0A0A0A`) para asegurar contraste.
- RF-4: EL SISTEMA usará paneles oscuros (no lima) en los laterales tipo hero de los modales.
- RF-5: EL SISTEMA corregirá textos fuera de catálogo en modales y legales (p. ej. "perfil de compra", "historial de compras").

## Criterios de finalización
- Capturas de los modales de registro, términos y contacto con acentos de marca y superficies blancas.
- `npm run lint`, `npm run test:run` (raíz y server), `npm run build` y `npm run test:e2e` en verde.
