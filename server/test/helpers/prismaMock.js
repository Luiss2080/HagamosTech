import { vi } from 'vitest';

// Doble de prueba de Prisma. Evita conectar a MySQL en los tests (RF-5).
// Se amplía por modelo a medida que cada spec lo necesite.
const prismaMock = {
  mensaje: {
    create: vi.fn(),
    findMany: vi.fn(),
    update: vi.fn(),
  },
  usuario: {
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
  $connect: vi.fn(),
  $disconnect: vi.fn(),
};

export default prismaMock;
