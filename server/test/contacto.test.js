import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createRequire } from 'node:module';
import express from 'express';
import request from 'supertest';
import { prisma, espiarModelo } from './helpers/prismaMock.js';

const require = createRequire(import.meta.url);
const contactoRoutes = require('../store/routes/contactoRoutes.js');
const mailer = require('../auth/utils/mailer.js');

const buildApp = () => {
  const app = express();
  app.use(express.json());
  app.use('/api/contacto', contactoRoutes);
  return app;
};

// RF-1..RF-3 (Spec 007): persiste el mensaje y notifica por correo.
describe('POST /api/contacto', () => {
  beforeEach(() => {
    espiarModelo('mensaje', ['create']);
    vi.spyOn(mailer, 'enviarCorreoContacto').mockResolvedValue({
      success: true,
      enviado: false,
      modoDev: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('crea el mensaje, notifica por correo y responde 201', async () => {
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
    expect(mailer.enviarCorreoContacto).toHaveBeenCalledTimes(1);
    expect(res.body.mensaje.id).toBe(1);
  });

  it('responde 400 y no persiste ni notifica si faltan campos obligatorios', async () => {
    const res = await request(buildApp())
      .post('/api/contacto')
      .send({ nombre: 'Ana' });

    expect(res.status).toBe(400);
    expect(prisma.mensaje.create).not.toHaveBeenCalled();
    expect(mailer.enviarCorreoContacto).not.toHaveBeenCalled();
  });
});

// Seguridad: listar y cambiar el estado de los mensajes es solo para administradores.
describe('GET/PUT /api/contacto (solo administradores)', () => {
  const { firmarToken } = require('../auth/utils/token.js');
  const bearer = (id) => ({ Authorization: `Bearer ${firmarToken(id)}` });
  const usuarioConRol = (rolId, permisos = []) => ({
    id: 5,
    rolId,
    activo: true,
    rol: { detalleRolPermisos: permisos.map((nombre) => ({ permiso: { nombre } })) },
  });

  beforeEach(() => {
    espiarModelo('mensaje', ['create', 'findMany', 'update']);
    espiarModelo('usuario', ['findUnique']);
    prisma.mensaje.findMany.mockResolvedValue([{ id: 1 }]);
    prisma.mensaje.update.mockResolvedValue({ id: 1, estado: 'leido' });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('sin sesión: 401 en GET y PUT, y no toca la base', async () => {
    const app = buildApp();
    expect((await request(app).get('/api/contacto')).status).toBe(401);
    expect((await request(app).put('/api/contacto/1/estado').send({ estado: 'leido' })).status).toBe(401);
    expect(prisma.mensaje.findMany).not.toHaveBeenCalled();
    expect(prisma.mensaje.update).not.toHaveBeenCalled();
  });

  it('token con firma inválida: 401', async () => {
    const app = buildApp();
    const roto = await request(app).get('/api/contacto').set('Authorization', 'Bearer a.b.c');
    expect(roto.status).toBe(401);
  });

  it('usuario sin rol de administrador: 403', async () => {
    prisma.usuario.findUnique.mockResolvedValue(usuarioConRol(2));
    const app = buildApp();
    const get = await request(app).get('/api/contacto').set(bearer(5));
    const put = await request(app).put('/api/contacto/1/estado').set(bearer(5)).send({ estado: 'leido' });
    expect(get.status).toBe(403);
    expect(put.status).toBe(403);
    expect(prisma.mensaje.findMany).not.toHaveBeenCalled();
    expect(prisma.mensaje.update).not.toHaveBeenCalled();
  });

  it('administrador (rol 1 o permiso admin_total): puede listar y actualizar', async () => {
    const app = buildApp();
    prisma.usuario.findUnique.mockResolvedValue(usuarioConRol(1));
    const get = await request(app).get('/api/contacto').set(bearer(5));
    expect(get.status).toBe(200);
    expect(get.body).toEqual([{ id: 1 }]);

    prisma.usuario.findUnique.mockResolvedValue(usuarioConRol(9, ['admin_total']));
    const put = await request(app).put('/api/contacto/1/estado').set(bearer(5)).send({ estado: 'leido' });
    expect(put.status).toBe(200);
    expect(prisma.mensaje.update).toHaveBeenCalledTimes(1);
  });

  it('administrador con estado inválido: 400 y no actualiza', async () => {
    prisma.usuario.findUnique.mockResolvedValue(usuarioConRol(1));
    const res = await request(buildApp()).put('/api/contacto/1/estado').set(bearer(5)).send({ estado: 'hackeado' });
    expect(res.status).toBe(400);
    expect(prisma.mensaje.update).not.toHaveBeenCalled();
  });

  it('el envío público del formulario sigue sin sesión', async () => {
    prisma.mensaje.create.mockResolvedValue({ id: 2 });
    vi.spyOn(mailer, 'enviarCorreoContacto').mockResolvedValue({ success: true });
    const res = await request(buildApp()).post('/api/contacto').send({ nombre: 'A', correo: 'a@b.co', mensaje: 'hola' });
    expect(res.status).toBe(201);
  });
});
