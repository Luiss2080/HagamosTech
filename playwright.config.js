import { defineConfig, devices } from '@playwright/test';

// Puertos E2E separados del servidor de desarrollo para evitar reutilizar otra aplicación.
const BACKEND_PORT = process.env.E2E_BACKEND_PORT || '44321';
const FRONTEND_PORT = process.env.E2E_FRONTEND_PORT || '4401';
const FRONTEND_URL = `http://localhost:${FRONTEND_PORT}`;

export default defineConfig({
  testDir: './e2e',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: FRONTEND_URL,
    trace: 'on-first-retry',
    ...devices['Desktop Chrome'],
  },
  webServer: [
    {
      command: 'npm run dev:server',
      port: Number(BACKEND_PORT),
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
      env: { PORT: BACKEND_PORT },
    },
    {
      command: `npm run dev -- --host 127.0.0.1 --port ${FRONTEND_PORT}`,
      port: Number(FRONTEND_PORT),
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
      env: { VITE_API_PROXY_TARGET: `http://localhost:${BACKEND_PORT}` },
    },
  ],
});
