import { describe, it, expect, vi, beforeEach } from 'vitest';
import express from 'express';
import request from 'supertest';

// Reemplaza el cliente real de Prisma por el doble antes de importar la ruta.
vi.mock('../models/prisma.js', () => import('./helpers/prismaMock.js'));

import contactoRoutes from '../store/routes/contactoRoutes.js';
import prismaMock from '../models/prisma.js';

const buildApp = () => {
  const app = express();
  app.use(express.json());
  app.use('/api/contacto', contactoRoutes);
  return app;
};

// RF-4, RF-5, RF-6: endpoint de contacto con Supertest y Prisma mockeado.
describe('POST /api/contacto', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('crea el mensaje y responde 201 con los datos persistidos', async () => {
    prismaMock.mensaje.create.mockResolvedValue({
      id: 1,
      nombre: 'Ana',
      correo: 'ana@example.com',
      mensaje: 'Hola',
    });

    const res = await request(buildApp())
      .post('/api/contacto')
      .send({ nombre: 'Ana', correo: 'ana@example.com', mensaje: 'Hola' });

    expect(res.status).toBe(201);
    expect(prismaMock.mensaje.create).toHaveBeenCalledTimes(1);
    expect(res.body.mensaje.id).toBe(1);
  });

  it('responde 400 y no persiste si faltan campos obligatorios', async () => {
    const res = await request(buildApp())
      .post('/api/contacto')
      .send({ nombre: 'Ana' });

    expect(res.status).toBe(400);
    expect(prismaMock.mensaje.create).not.toHaveBeenCalled();
  });
});
