# Validación — Spec 001 (Harness de tests y CI)

Fecha: 2026-09-14
Método: recorrido RF por RF indicando el test/evidencia y el resultado.

| RF | Criterio | Evidencia | Resultado |
|---|---|---|---|
| RF-1 | `npm run test:run` corre Vitest (jsdom) y sale 0 si pasa | `src/test/smoke.test.jsx`; salida: `Test Files 1 passed`, `Tests 2 passed` | ✅ |
| RF-2 | Testing Library + jest-dom sobre el DOM | Aserción `toBeInTheDocument()` en `smoke.test.jsx`; setup `src/test/setup.js` | ✅ |
| RF-3 | Test en rojo ⇒ salida ≠ 0 | Test temporal `__fallo_temporal.test.jsx` → `EXIT_CODE=1`; luego eliminado | ✅ |
| RF-4 | `server/` corre Vitest + Supertest | `server/test/contacto.test.js`; salida: `Tests 2 passed` | ✅ |
| RF-5 | Tests backend sin MySQL | Instancia de Prisma espiada con `vi.spyOn` (`test/helpers/prismaMock.js`); no se escribió en BD | ✅ |
| RF-6 | Aseverar status y body | `expect(res.status).toBe(201/400)` y `res.body.mensaje.id` | ✅ |
| RF-7 | `npm run test:e2e` levanta front+back y corre Chromium | `playwright.config.js` (webServer front 4000 / back 3001); `1 passed (19.6s)` | ✅ |
| RF-8 | E2E humo: home, marca y sin errores de consola | `e2e/humo.spec.js`: título, logo visible, arreglo de errores vacío | ✅ |
| RF-9 | Scripts `test`, `test:run`, `test:coverage`, `test:e2e` | `package.json` (raíz y `server/`), `docs/testing.md` | ✅ |
| RF-10 | CI con lint + tests + E2E en PR/push a `main` | `.github/workflows/ci.yml` (jobs `calidad` y `e2e`) | ✅ |
| RF-11 | No declarar áreas sin test | Cobertura declarada por spec; no se afirma cobertura de features aún | ✅ |
| RF-12 | Base lista para specs 002+ | `docs/testing.md`, helper de render y de Prisma, configs separadas | ✅ |
| RF-13 | Fallback de puerto 3000→3001→3002 | Prueba manual: con 3000 ocupado (ParqueoYa), el server eligió 3001; con 3001 ocupado, eligió 3002 y avisó | ✅ |

## Verificación global
| Comando | Resultado |
|---|---|
| `npm run lint` | 0 errores, 5 warnings (pre-existentes, no bloquean) |
| `npm run test:run` (raíz) | 2/2 ✅ |
| `npm run test:run` (server) | 2/2 ✅ |
| `npm run test:e2e` | 1/1 ✅ |
| `npm run build` | ✅ (aviso de chunk > 500 kB, se trata en Spec 008) |

## Veredicto
**Spec 001 cumplida.** El harness queda operativo, con pruebas de los tres niveles y CI
configurado. Se corrigen además los errores de lint que impedían un CI verde (falsos positivos
de `motion` por falta de `react/jsx-uses-vars`, y `Math.random` en render).
