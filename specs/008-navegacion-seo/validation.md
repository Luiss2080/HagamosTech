# Validación — Spec 008 (Navegación, SEO y rendimiento)

Fecha: 2026-09-14

| RF | Criterio | Evidencia | Resultado |
|---|---|---|---|
| RF-1 | Code-splitting por ruta | `App.jsx` con `lazy`; build genera ~60 chunks por página | ✅ |
| RF-2 | Fallback de carga | `<Suspense fallback={...}>` alrededor de `<Routes>` | ✅ |
| RF-3 | Título/meta por ruta | `src/app/seo.js` + `SeoRuta`; test `seo.test.js` | ✅ |
| RF-4 | Fallback de marca | Test "una ruta desconocida cae al valor por defecto" | ✅ |
| RF-5 | Footer sin anclas rotas | Enlaces a `/que-hacemos/*`, `/como-trabajamos`, `/servicios/*` | ✅ |
| RF-6 | Sin aviso > 500 kB | Chunk mayor: `index` 248 kB; vendors separados (máx. 223 kB) | ✅ |
| RF-7 | 404 en rutas desconocidas | `<Route path="*" element={<Error404 />} />` | ✅ |

## Verificación global
| Comando | Resultado |
|---|---|
| `npm run lint` | 0 errores, 5 warnings |
| `npm run test:run` | 4 archivos, **19/19** ✅ |
| `npm run build` | ✅ sin aviso de tamaño; bundle inicial repartido |
| `npm run test:e2e` | **3/3** ✅ (incluye título SEO en Promociones/Novedades) |

## Resultado de rendimiento
Antes: un único `index` de **1.34 MB**. Ahora: chunks por ruta y vendors separados
(`vendor-react` 224 kB, `vendor` 155 kB, `vendor-motion` 33 kB, `index` 248 kB),
cargando solo lo necesario por ruta.

## Veredicto
**Spec 008 cumplida.** La app carga por ruta, tiene metadatos por página, navegación sin enlaces
rotos y no genera avisos de tamaño.
