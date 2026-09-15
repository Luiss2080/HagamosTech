# Spec 015 — Plantillas de correo con la paleta de la web

## Contexto y objetivo
Las plantillas de correo (`server/auth/utils/mailer.js`) seguían usando la paleta anterior
(naranja `#FF4D00`, marrón `#8B3A13`, crema `#FFF5EC`). Esta spec las actualiza a la paleta de la
web: **fondo oscuro + verde lima `#A3E635`**, texto claro y botones lima con texto oscuro, sin
cambiar el contenido.

## Requisitos funcionales (criterios de aceptación en EARS)
- RF-1: EL SISTEMA usará `#A3E635` (verde lima) y `#0A0A0A`/`#111827` (oscuro) como colores base de las plantillas.
- RF-2: EL SISTEMA eliminará de las plantillas el naranja (`#FF4D00`), el marrón (`#8B3A13`, `#5D3A1F`) y la crema (`#FFF5EC`).
- RF-3: LOS botones/enlaces de acción tendrán fondo lima y texto oscuro; el texto sobre fondos oscuros será claro.
- RF-4: EL SISTEMA mantendrá el contenido en español y sin términos fuera del catálogo.
- RF-5: EL SISTEMA usará **fondo exterior blanco**, conservando la tarjeta y el contenido con sus colores de marca.

## Criterios de finalización
- Tests de `server/test/mailer.test.js` que verifican la paleta de marca y la ausencia de colores viejos.
- Render de una plantilla verificado visualmente.
- `npm run test:run` (server) y el resto de la suite en verde.

## Fuera de alcance
- Compatibilidad específica de clientes de correo antiguos (Outlook) más allá de estilos inline básicos.
