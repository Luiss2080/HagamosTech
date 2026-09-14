# Plan técnico — Spec 005

## Cambios
- `server/server.js`:
  - Elimina `mockRouter` y mounts `/*-sistema`.
  - Reemplaza el catch-all por un handler `404` JSON.
  - Envuelve el arranque en `if (require.main === module)` y exporta `app`.
- `server/README.md`: nota de API veraz.

## Decisiones técnicas
- **404 explícito en lugar de silencio.** _Alternativa descartada: dejar el catch-all (oculta errores)._
- **`require.main === module` para testear sin abrir puerto.** _Alternativa descartada: arrancar el
  servidor en el test y hacer fetch (lento y frágil)._
- **No implementar features ausentes en esta spec.** Mezclar "quitar la mentira" con "construir la
  verdad" agranda el alcance y retrasa la honestidad. Se planifican en specs siguientes.

## Estrategia de tests
`server/test/api-veraz.test.js` (Supertest sobre `app`):
- 404 para endpoint inexistente y sin campo `success` (RF-3).
- 410 para endpoint retirado (RF-4).
- 401 para `/api/perfil` sin token (RF-5).

## Cobertura de RF
| Parte | RF |
|---|---|
| `server.js` sin mocks | RF-1, RF-2 |
| Handler 404 | RF-3, RF-4 |
| Endpoints reales intactos | RF-5 |
| Export de `app` | RF-6 |
| Tests | RF-7 |
