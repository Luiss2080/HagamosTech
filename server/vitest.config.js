import { defineConfig } from 'vitest/config';

// Harness de tests del backend (Spec 001).
// No requiere MySQL: Prisma se reemplaza por un doble de prueba.
export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    setupFiles: ['./test/setup.js'],
    include: ['test/**/*.test.js'],
  },
});
