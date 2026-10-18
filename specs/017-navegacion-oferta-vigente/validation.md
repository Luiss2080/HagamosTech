# Validación — Spec 017 (Navegación de la oferta vigente)

Fecha: 2026-10-17

| RF | Evidencia | Resultado |
|---|---|---|
| RF-1 | `App.jsx`, `Header.jsx`; rutas fuera del enrutador y menú | ✅ |
| RF-2 | Rutas restantes de web, software, emprendimientos, academia, empleo y diseño | ✅ |
| RF-3 | `seo.js` y metadatos de navegación | ✅ |
| RF-4 | `NovedadesCarrusel.jsx`; enlaces y mensajes revisados | ✅ |
| RF-5 | Fallback `path="*"` renderiza `Error404` | ✅ |

La prueba `src/app/navegacionOferta.test.js` confirma que las rutas retiradas no están registradas y que el menú mantiene las rutas de las categorías vigentes.

## Verificación

| Comando | Resultado |
|---|---|
| `npm run lint` | ✅ 0 errores, 2 warnings preexistentes |
| `npm run test:run -- --maxWorkers=2` | ✅ 10 archivos, 39/39 tests al cierre de QA |
| `npm run build` | ✅ |
