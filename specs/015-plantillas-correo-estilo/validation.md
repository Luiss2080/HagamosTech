# Validación — Spec 015 (Plantillas de correo con la paleta de la web)

Fecha: 2026-09-14

| RF | Criterio | Evidencia | Resultado |
|---|---|---|---|
| RF-1 | Paleta de marca | `mailer.js` usa `#A3E635`, `#0A0A0A`, `#111827`; test "usa la paleta de marca" | ✅ |
| RF-2 | Sin colores viejos | Ter. prohibidos incluyen `#ff4d00`, `#8b3a13`, `#5d3a1f`, `#fff5ec`; test en verde | ✅ |
| RF-3 | Contraste en acciones | Botones/`Mi Cuenta` en lima con texto oscuro | ✅ |
| RF-4 | Contenido correcto | Copy en español; sin términos fuera de catálogo | ✅ |

## Verificación
| Comando | Resultado |
|---|---|
| `npm run test:run` (server) | 6 archivos, **24/24** ✅ |
| `npm run test:run` (raíz) | **28/28** ✅ |
| `npm run lint` | 0 errores, 5 warnings |
| `npm run build` | ✅ |
| `npm run test:e2e` | **5/5** ✅ |

## Evidencia visual
Render de `plantillaVerificacion` (código 482915): tarjeta oscura `#111827`, acentos y código en
lima, texto claro, barra superior y botón "Mi Cuenta" en lima con texto oscuro.
