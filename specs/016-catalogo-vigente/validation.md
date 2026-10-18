# Validación — Spec 016 (Catálogo vigente y límites de oferta)

Fecha: 2026-10-17

| RF | Evidencia | Resultado |
|---|---|---|
| RF-1 | Catálogo Maestro y espejo en `src/data/serviciosData.js` | ✅ |
| RF-2 | Prueba de categorías y conteos exactos: 7 categorías, 33 servicios | ✅ |
| RF-3 | Tres servicios académicos añadidos y comparados en prueba de integridad | ✅ |
| RF-4 | Prueba de exclusión en `serviciosData.test.js` | ✅ |
| RF-5 | Texto de acompañamiento formativo en el catálogo | ✅ |
| RF-6 | IDs de categorías vigentes preservados; retirada la categoría IA y servicios excluidos | ✅ |
| RF-7 | Resumen de README alineado al catálogo | ✅ |
| RF-8 | Prueba de nombres, categorías, conteos y exclusiones | ✅ |

## Verificación

| Comando | Resultado |
|---|---|
| `npm run lint` | ✅ 0 errores, 5 warnings preexistentes |
| `npm run test:run -- --maxWorkers=2` | ✅ 5 archivos, 28/28 tests |
| `npm run build` | ✅ |

Nota: el primer `npm run test:run` sin límite de workers tardó excesivamente en este entorno y detectó que el test global prohibía “mentoría”. Se actualizó esa regla porque mentoría académica ahora sí forma parte del catálogo; la suite pasó completa al usar dos workers.
