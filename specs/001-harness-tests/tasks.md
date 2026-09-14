# Tareas — Spec 001 (Harness de tests y CI)

- [ ] T1. Instalar dependencias de test en frontend (`vitest`, `jsdom`,
      `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`)
      y en backend (`vitest`, `supertest`). (RF: —) Hecho cuando: aparecen en los
      `package.json` y `npm install` termina sin errores.
- [ ] T2. Crear `vitest.config.js` (jsdom, setup, cobertura) y `src/test/setup.js`.
      (RF-1, RF-2) Hecho cuando: `npm run test:run` arranca Vitest y reporta 0 tests sin error.
- [ ] T3. Crear `src/test/utils/renderWithProviders.jsx` con providers (Router/Zustand).
      (RF-2, RF-12) Hecho cuando: un test que lo usa renderiza un componente sin warnings.
- [ ] T4. Escribir el test de humo de frontend (componente presentacional).
      (RF-1, RF-2) Hecho cuando: `npm run test:run` pasa en verde con ese test.
- [ ] T5. Crear `server/vitest.config.js`, `server/test/setup.js` y
      `server/test/helpers/prismaMock.js`. (RF-4, RF-5) Hecho cuando: `npm run test:run` en
      `server/` arranca sin MySQL.
- [ ] T6. Escribir el test de backend con Supertest sobre un endpoint usando `prismaMock`.
      (RF-4, RF-5, RF-6) Hecho cuando: el test asevera status y body en verde.
- [ ] T7. Configurar Playwright: `playwright.config.js` con `webServer` (front + back) y
      `e2e/humo.spec.js`. (RF-7, RF-8) Hecho cuando: `npm run test:e2e` pasa el humo de home.
- [ ] T8. Añadir scripts `test`, `test:run`, `test:coverage`, `test:e2e` en la raíz y
      `test`, `test:run` en `server/`; documentar en `docs/testing.md` y `AGENTS.md`.
      (RF-9, RF-12) Hecho cuando: los 4 comandos existen y son ejecutables.
- [ ] T9. Crear `.github/workflows/ci.yml` con lint + tests (job E2E separado).
      (RF-10) Hecho cuando: el YAML es válido y el workflow corre en local con `act` o queda
      listo para el primer PR.
- [ ] T10. Demostrar RF-3/RF-5 con un test temporal en rojo (salida ≠ 0), eliminarlo y
      registrar la evidencia en la validación. (RF-3, RF-5, RF-11) Hecho cuando: se documenta
      el código de salida rojo y luego la suite queda verde.
