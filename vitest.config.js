import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Harness de tests del frontend (Spec 001).
// Ejecuta solo los tests de `src/`; el backend y los E2E tienen su propia config.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
    include: ['src/**/*.{test,spec}.{js,jsx}'],
    exclude: ['node_modules', 'dist', 'server', 'e2e'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{js,jsx}'],
      exclude: ['src/**/*.{test,spec}.{js,jsx}', 'src/test/**', 'src/app/main.jsx'],
    },
  },
});
