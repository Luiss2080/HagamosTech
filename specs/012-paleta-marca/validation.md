# Validación — Spec 012 (Unificación de paleta a verde lima)

Fecha: 2026-09-14
Método: sustitución controlada de clases + verificación visual con capturas (Playwright) +
suite automatizada.

| RF | Criterio | Evidencia | Resultado |
|---|---|---|---|
| RF-1 | Acento lima | `#FF4D00`→`#A3E635`, `#CC3D00`→`#84CC16` en ambas páginas | ✅ |
| RF-2 | Fondos oscuros | Cremas `#FFF*`→`#111111`/`#0F0F0F`; marrones→`#0A0A0A`/`#171717` | ✅ |
| RF-3 | Contraste | Tarjetas lima con texto `#0A0A0A`; flechas y chips corregidos | ✅ |
| RF-4 | Hero compartido | `MigasPan` actualizado (título blanco, acento lima, texto claro) | ✅ |
| RF-5 | Sin regresiones | Contenido intacto; `lint` 0 errores; tests 20/20; build OK; E2E 3/3 | ✅ |

## Verificación visual
Capturas de `/#/promociones`, `/#/novedades` y `/#/terminos`: tema oscuro con acentos lima,
títulos legibles y tarjetas con contraste correcto.

## Verificación global
| Comando | Resultado |
|---|---|
| `npm run lint` | 0 errores, 5 warnings |
| `npm run test:run` (raíz) | **20/20** ✅ |
| `npm run build` | ✅ sin avisos |
| `npm run test:e2e` | **3/3** ✅ |

## Deuda documentada
El interior de las páginas legales (secciones de Terminos/Privacidad/Cookies/Condiciones) conserva
títulos oscuros preexistentes; se unifican en una spec de diseño posterior si se desea.
