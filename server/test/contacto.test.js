import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createRequire } from 'node:module';
import express from 'express';
import request from 'supertest';
import { prisma, espiarModelo } from './helpers/prismaMock.js';

const require = createRequire(import.meta.url);
const contactoRoutes = require('../store/routes/contactoRoutes.js');

const buildApp = () => {
  const app = express();
  app.use(express.json());
  app.use('/api/contacto', contactoRoutes);
  return app;
};

// RF-4, RF-5, RF-6: endpoint de contacto con Supertest y Prisma espiado.
// No requiere MySQL: las llamadas a Prisma se interceptan (RF-5).
describe('POST /api/contacto', () => {
  beforeEach(() => {
    espiarModelo('mensaje', ['create']);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('crea el mensaje y responde 201 con los datos persistidos', async () => {
    prisma.mensaje.create.mockResolvedValue({
      id: 1,
      nombre: 'Ana',
      correo: 'ana@example.com',
      mensaje: 'Hola',
    });

    const res = await request(buildApp())
      .post('/api/contacto')
      .send({ nombre: 'Ana', correo: 'ana@example.com', mensaje: 'Hola' });

    expect(res.status).toBe(201);
    expect(prisma.mensaje.create).toHaveBeenCalledTimes(1);
    expect(res.body.mensaje.id).toBe(1);
  });

  it('responde 400 y no persiste si faltan campos obligatorios', async () => {
    const res = await request(buildApp())
      .post('/api/contacto')
      .send({ nombre: 'Ana' });

    expect(res.status).toBe(400);
    expect(prisma.mensaje.create).not.toHaveBeenCalled();
  });
});
