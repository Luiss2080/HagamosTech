import { defineConfig } from 'vitest/config';

// Harness de tests del backend (Spec 001).
// No requiere MySQL: Prisma se espía con `vi.spyOn` sobre la instancia
// compartida (ver `test/helpers/prismaMock.js`).
export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    setupFiles: ['./test/setup.js'],
    include: ['test/**/*.test.js'],
  },
});
