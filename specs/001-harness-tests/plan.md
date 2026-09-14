# Plan técnico — Spec 001 (Harness de tests y CI)

## Estructura de módulos
- `vitest.config.js` (raíz) → entorno jsdom, setup, alias, cobertura. (RF-1..3)
- `src/test/setup.js` → carga `@testing-library/jest-dom` y limpieza entre tests. (RF-2)
- `src/test/utils/renderWithProviders.jsx` → render con Router/Zustand. (RF-2, RF-12)
- `server/vitest.config.js` + `server/test/setup.js` → entorno node, mock de Prisma. (RF-4..6)
- `server/test/helpers/prismaMock.js` → doble de Prisma reutilizable. (RF-5)
- `playwright.config.js` + `e2e/*.spec.js` → E2E con `webServer`. (RF-7, RF-8)
- `package.json` (raíz) y `server/package.json` → scripts. (RF-9)
- `.github/workflows/ci.yml` → lint + tests en PR/ push. (RF-10)
- `docs/testing.md` → cómo correr y escribir tests. (RF-12)

## Modelo de datos
No aplica. Los tests de backend usan un doble de Prisma; no se conecta a MySQL.

## Decisiones técnicas
- **Vitest en vez de Jest.** Justificación: integración nativa con Vite 8/ESM y React 19;
  Jest requiere transformaciones extra y tiene fricción con ESM. _Alternativa descartada: Jest
  + babel-jest._
- **Testing Library + jsdom** para componentes. _Alternativa descartada: Enzyme (sin soporte
  React 19)._
- **Playwright para E2E.** `webServer` levanta frontend y backend automáticamente.
  _Alternativa descartada: Cypress (más pesado y menos flexible con múltiples servidores)._
- **Supertest** para ejercitar Express sin abrir puertos reales. _Alternativa descartada: fetch
  contra un servidor levantado (más lento y frágil)._
- **Prisma mockeado con `vi.mock`.** Permite correr el backend en cualquier máquina sin MySQL.
  _Alternativa descartada: base de datos de test real (requiere servicio y migraciones)._
- **Puertos configurables por variable de entorno** (`PORT`, `VITE_API_BASE_URL`) para evitar
  el choque con ParqueoYa en `127.0.0.1:3000`. _Alternativa descartada: fijar 3000._
- **Un solo runner (Vitest) en front y back**, dos configs. Reduce herramientas y curva de
  aprendizaje. _Alternativa descartada: node:test nativo (menos ecosistema para componentes)._

## Contrato de comandos
- Raíz: `npm run test` (watch) · `npm run test:run` · `npm run test:coverage` · `npm run test:e2e` · `npm run lint`.
- `server/`: `npm run test` · `npm run test:run`.
- E2E: `npm run test:e2e` (usa `PORT` y `PLAYWRIGHT_BASE_URL`, con defaults 3001 y 4000).

## Estrategia de tests
- **Frontend:** test de humo de un componente presentacional + un helper que prueba el render
  con providers (RF-1, RF-2).
- **Backend:** test de un endpoint con Supertest usando `prismaMock` (RF-4, RF-5, RF-6).
- **E2E:** humo de carga de home y verificación de marca/consola (RF-7, RF-8).
- **Demostración de fallo:** un test temporal en rojo para comprobar salida ≠ 0 (RF-3, RF-5),
  que se elimina al cerrar la spec.
- **CI:** workflow con matriz Node 18/20, `npm ci`, lint y tests; job de E2E separado (RF-10).

## Cobertura de RF por parte
| Parte | RF |
|---|---|
| Config frontend + setup | RF-1, RF-2, RF-3 |
| Config backend + prismaMock | RF-4, RF-5, RF-6 |
| Playwright + E2E humo | RF-7, RF-8 |
| Scripts + docs | RF-9, RF-11, RF-12 |
| CI workflow | RF-10 |
