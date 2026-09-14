import { defineConfig, devices } from '@playwright/test';

// Config E2E (Spec 001). Usa el puerto 3001 para el backend por defecto para
// no chocar con otros proyectos que ocupan 127.0.0.1:3000.
const BACKEND_PORT = process.env.E2E_BACKEND_PORT || '3001';
const FRONTEND_PORT = process.env.E2E_FRONTEND_PORT || '4000';
const FRONTEND_URL = `http://localhost:${FRONTEND_PORT}`;

export default defineConfig({
  testDir: './e2e',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
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
      command: 'npm run dev',
      port: Number(FRONTEND_PORT),
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
      env: { VITE_API_BASE_URL: `http://localhost:${BACKEND_PORT}/api` },
    },
  ],
});
