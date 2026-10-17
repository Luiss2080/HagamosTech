# Validación — Spec 021 (Propuestas y contenido veraz)

Fecha: 2026-10-17

| RF | Evidencia | Resultado |
|---|---|---|
| RF-1 | Copy de `PromocionesPagina.jsx` | ✅ |
| RF-2 | Página sin precios, descuentos ni planes; pagos no confirmados en Niko | ✅ |
| RF-3 | CTA `Solicitar propuesta` a `/contactanos` | ✅ |
| RF-4 | Respuestas de Niko actualizadas para catálogo vigente | ✅ |
| RF-5 | Respuesta explícita para servicios excluidos | ✅ |
| RF-6 | Ruta de Novedades retirada; NovedadesCarrusel presenta servicios vigentes | ✅ |

## Verificación

| Comando | Resultado |
|---|---|
| `npm run lint` | ✅ 0 errores; 2 warnings preexistentes en Inicio |
| `npm run test:run -- --maxWorkers=2` | ✅ 10 archivos, 39/39 tests al cierre de QA |
| `npm run build` | ✅ |
