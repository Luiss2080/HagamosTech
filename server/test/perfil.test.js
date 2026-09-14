import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createRequire } from 'node:module';
import request from 'supertest';
import { prisma, espiarModelo } from './helpers/prismaMock.js';

const require = createRequire(import.meta.url);
const app = require('../server.js');

const TOKEN = 'token-user-1-1700000000000';

const usuarioBase = {
  id: 1,
  correo: 'ana@example.com',
  nombre: 'Ana',
  contrasena: 'Actual123',
  twoFactorSecret: null,
  twoFactorEnabled: false,
  rolId: 2,
  activo: true,
  rol: { detalleRolPermisos: [] },
  suscripcion: null,
  cuponDescuento: null,
};

// Spec 006: funciones de perfil reales (sin éxito falso).
describe('Perfil — gestión de cuenta', () => {
  beforeEach(() => {
    espiarModelo('usuario', ['findUnique', 'update']);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('rechaza el cambio de contraseña si la actual no coincide', async () => {
    prisma.usuario.findUnique.mockResolvedValue(usuarioBase);

    const res = await request(app)
      .put('/api/perfil/password')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send({ current: 'incorrecta', nueva: 'Nueva123', confirm: 'Nueva123' });

    expect(res.status).toBe(400);
    expect(prisma.usuario.update).not.toHaveBeenCalled();
  });

  it('cambia la contraseña cuando los datos son válidos', async () => {
    prisma.usuario.findUnique.mockResolvedValue(usuarioBase);
    prisma.usuario.update.mockResolvedValue({ ...usuarioBase, contrasena: 'Nueva123' });

    const res = await request(app)
      .put('/api/perfil/password')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send({ current: 'Actual123', nueva: 'Nueva123', confirm: 'Nueva123' });

    expect(res.status).toBe(200);
    expect(prisma.usuario.update).toHaveBeenCalledTimes(1);
  });

  it('exporta los datos sin la contraseña ni el secreto 2FA', async () => {
    prisma.usuario.findUnique.mockResolvedValue(usuarioBase);

    const res = await request(app)
      .get('/api/perfil/exportar')
      .set('Authorization', `Bearer ${TOKEN}`);

    expect(res.status).toBe(200);
    expect(res.body.data.contrasena).toBeUndefined();
    expect(res.body.data.twoFactorSecret).toBeUndefined();
  });

  it('informa que no hay sesiones múltiples en lugar de inventarlas', async () => {
    prisma.usuario.findUnique.mockResolvedValue(usuarioBase);

    const res = await request(app)
      .get('/api/perfil/sessions')
      .set('Authorization', `Bearer ${TOKEN}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
    expect(res.body.alcance).toBe('sin_registro_multisesion');
  });

  it('responde 401 sin token', async () => {
    const res = await request(app).get('/api/perfil/sessions');
    expect(res.status).toBe(401);
  });
});
