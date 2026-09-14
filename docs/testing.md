# Testing en HagamosTech

Harness de tests habilitado en la **Spec 001** (`specs/001-harness-tests/`).

## Herramientas
| Área | Herramientas |
|---|---|
| Frontend (unit/integration) | Vitest + jsdom + Testing Library (`@testing-library/react`, `jest-dom`, `user-event`) |
| Backend (unit/integration) | Vitest + Supertest + Prisma mockeado (`server/test/helpers/prismaMock.js`) |
| E2E | Playwright (Chromium) |

## Comandos
### Raíz (frontend)
- `npm run test` — modo watch.
- `npm run test:run` — una pasada (CI).
- `npm run test:coverage` — reporte de cobertura (`coverage/`).
- `npm run test:e2e` — E2E con Playwright (levanta frontend y backend).

### Backend
- `cd server && npm run test` — modo watch.
- `cd server && npm run test:run` — una pasada (CI).

## Escribir tests
- Frontend: archivos `src/**/*.test.jsx` (o `.spec.jsx`). Usa
  `src/test/utils/renderWithProviders.jsx` para componentes que dependen de React Router.
- Backend: archivos `server/test/**/*.test.js`. Mockea Prisma con
  `vi.mock('../models/prisma.js', () => import('./helpers/prismaMock.js'))`.
- E2E: archivos `e2e/**/*.spec.js`.

## Puertos
- El backend intenta `PORT` (por defecto 3000) y si está ocupado prueba 3001, 3002.
- Los E2E usan por defecto el backend en **3001** y el frontend en **4000**
  (variables `E2E_BACKEND_PORT` y `E2E_FRONTEND_PORT`).

## CI
`.github/workflows/ci.yml` ejecuta lint + tests (frontend y backend) en cada PR/push a `main`,
y un job E2E separado con Playwright.
