# Tareas — Spec 001 (Harness de tests y CI)

- [x] T1. Instalar dependencias de test en frontend (`vitest`, `jsdom`,
      `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`,
      `@vitest/coverage-v8`, `@playwright/test`) y en backend (`vitest`, `supertest`; además
      `eslint-plugin-react` para corregir falsos positivos de lint). (RF: —) Hecho cuando:
      aparecen en los `package.json` y `npm install` termina sin errores.
- [x] T2. Crear `vitest.config.js` (jsdom, setup, cobertura) y `src/test/setup.js`.
      (RF-1, RF-2) Hecho cuando: `npm run test:run` arranca Vitest y reporta los tests.
- [x] T3. Crear `src/test/utils/renderWithProviders.jsx` con providers (Router/Zustand).
      (RF-2, RF-12) Hecho cuando: un test que lo usa renderiza un componente sin warnings.
- [x] T4. Escribir el test de humo de frontend (`src/test/smoke.test.jsx`).
      (RF-1, RF-2) Hecho cuando: `npm run test:run` pasa en verde con esos tests.
- [x] T5. Crear `server/vitest.config.mjs`, `server/test/setup.js` y
      `server/test/helpers/prismaMock.js`. (RF-4, RF-5) Hecho cuando: `npm run test:run` en
      `server/` arranca sin MySQL.
- [x] T6. Escribir el test de backend con Supertest sobre `/api/contacto` espiando Prisma.
      (RF-4, RF-5, RF-6) Hecho cuando: el test asevera status y body en verde.
- [x] T7. Configurar Playwright: `playwright.config.js` con `webServer` (front en 4000, back
      en 3001) y `e2e/humo.spec.js`. (RF-7, RF-8) Hecho cuando: `npm run test:e2e` pasa el
      humo de home.
- [x] T8. Añadir scripts `test`, `test:run`, `test:coverage`, `test:e2e` en la raíz y
      `test`, `test:run` en `server/`; documentar en `docs/testing.md` y `AGENTS.md`.
      (RF-9, RF-12) Hecho cuando: los comandos existen y son ejecutables.
- [x] T9. Crear `.github/workflows/ci.yml` con lint + tests (job E2E separado).
      (RF-10) Hecho cuando: el YAML es válido y corre en local.
- [x] T10. Demostrar RF-3 con un test temporal en rojo (salida ≠ 0), eliminarlo y dejar la
      suite verde. (RF-3, RF-11) Hecho cuando: se registra `EXIT_CODE=1` y luego todo pasa.
- [x] T11. Fallback de puerto en `server/server.js`: si el puerto está ocupado, probar el
      siguiente (3000 → 3001 → 3002) y registrar el puerto real en uso. (RF-13) Hecho cuando:
      arrancar con 3000 ocupado deja el backend en 3001 y lo informa por consola.
