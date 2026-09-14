# Validación — Spec 004 (Contenido tech en Promociones y Novedades)

Fecha: 2026-09-14

| RF | Criterio | Evidencia | Resultado |
|---|---|---|---|
| RF-1 | Promociones ofrece servicios tech | Packs (Landing, Automatización, Identidad+Web) y planes de Soporte Esencial/Profesional/Empresa | ✅ |
| RF-2 | Novedades habla de tecnología | Noticias, anuncios, logros y agenda reescritos | ✅ |
| RF-3 | Sin carrusel de productos de restaurante | `CarruselOfertas.jsx` y `CarruselProductos.jsx` eliminados | ✅ |
| RF-4 | Sin términos de restaurante ni errores | E2E `paginas.spec.js` (2 rutas) en verde | ✅ |
| RF-5 | Rutas preservadas | `/#/promociones` y `/#/novedades` cargan | ✅ |
| RF-6 | Test de contenido | `src/test/contenidoTech.test.js` en verde | ✅ |
| RF-7 | Precios en Bs + CTA WhatsApp | Packs con precio/normal y botones a WhatsApp | ✅ |

## Verificación global
| Comando | Resultado |
|---|---|
| `npm run lint` | 0 errores, 5 warnings |
| `npm run test:run` | 3 archivos, **15/15** ✅ |
| `npm run build` | ✅ (1.34 MB) |
| `npm run test:e2e` | **3/3** ✅ |

## Veredicto
**Spec 004 cumplida.** Promociones y Novedades ya comunican solo tecnología, con evidencia
automatizada de contenido y de render.
