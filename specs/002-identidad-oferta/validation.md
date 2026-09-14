# Validación — Spec 002 (Identidad y oferta veraz)

Fecha: 2026-09-14
Método: recorrido RF por RF con test/evidencia y resultado.

| RF | Criterio | Evidencia | Resultado |
|---|---|---|---|
| RF-1 | `serviciosData.js` es la fuente única | `src/data/serviciosData.test.js`; las páginas tech no declaran oferta contradictoria (`grep` en `src/pages/Servicios` y `QueHacemos`) | ✅ |
| RF-2 | 8 categorías exactas | Test "declara exactamente las 8 categorías" | ✅ |
| RF-3 | Conteos 6/6/6/5/5/3/3/1 | Test parametrizado por categoría | ✅ |
| RF-4 | Campos obligatorios por servicio | Test "todos los servicios tienen los campos obligatorios" | ✅ |
| RF-5 | `id` únicos | Test "no repite ids dentro de una categoría" | ✅ |
| RF-6 | Sin términos del restaurante | Test "no contiene términos del vertical restaurante" | ✅ |
| RF-7 | Sin typos | `serviciosData.js`: `Óptimo` (antes `Óóptimo`) | ✅ |
| RF-8 | READMEs reales | `README.md` y `src/pages/Servicios/README.md` reescritos a tecnología | ✅ |
| RF-9 | Espejo documental | `docs/catalogo-servicios.md` con mapeo y conteos coincidentes | ✅ |

## Verificación global
| Comando | Resultado |
|---|---|
| `npm run test:run` | 2 archivos, **14/14** ✅ (2 humo + 12 integridad) |
| `npm run lint` | 0 errores, 5 warnings pre-existentes |

## Fuera de alcance confirmado
El contenido del restaurante está confinado a `src/pages/Servicios/restaurante/` (y
`src/pages/Menu/`, `src/store/catalogo/`, `src/store/carrito/`), que se retira en la Spec 003.

## Veredicto
**Spec 002 cumplida.** La oferta está anclada por tests al Catálogo Maestro y la documentación
dice la verdad.
