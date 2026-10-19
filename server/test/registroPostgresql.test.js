import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createRequire } from 'node:module';
import request from 'supertest';
import { prisma, espiarModelo } from './helpers/prismaMock.js';

const require = createRequire(import.meta.url);
const app = require('../server.js');
const AuthController = require('../auth/controllers/AuthController.js');
const { verificarToken } = require('../auth/utils/token.js');

describe('Registro y activación de cuenta', () => {
  beforeEach(() => {
    espiarModelo('usuario', ['findFirst', 'findUnique', 'create']);
    espiarModelo('registroPendiente', ['create', 'findUnique', 'deleteMany']);
    espiarModelo('rol', ['findFirst', 'create']);
    vi.spyOn(AuthController, 'generarYEnviarCodigo').mockImplementation(() => {});
  });

  afterEach(() => vi.restoreAllMocks());

  it('guarda un registro pendiente y solicita la verificación por correo', async () => {
    prisma.usuario.findFirst.mockResolvedValue(null);
    prisma.registroPendiente.create.mockResolvedValue({ id: 71, nombre: 'Ana', correo: 'ana.pg@example.com' });
    const res = await request(app).post('/api/auth/registro').send({
      nombre: 'Ana', correo: 'ana.pg@example.com', contrasena: 'ClaveSegura123',
    });
    expect(res.status).toBe(201);
    expect(res.body.requiereVerificacion).toBe(true);
    expect(prisma.registroPendiente.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ nombre: 'Ana', correo: 'ana.pg@example.com', expiraEn: expect.any(Date) }),
    });
    expect(AuthController.generarYEnviarCodigo).toHaveBeenCalledTimes(1);
  });

  it('rechaza el correo duplicado sin insertar otro registro', async () => {
    prisma.usuario.findFirst.mockResolvedValue({ id: 4, correo: 'ana.pg@example.com' });
    const res = await request(app).post('/api/auth/registro').send({
      nombre: 'Ana', correo: 'ana.pg@example.com', contrasena: 'ClaveSegura123',
    });
    expect(res.status).toBe(400);
    expect(prisma.registroPendiente.create).not.toHaveBeenCalled();
  });

  it('crea la cuenta e inicia sesión tras verificar el código', async () => {
    prisma.registroPendiente.findUnique.mockResolvedValue({
      id: 71, nombre: 'Ana', correo: 'ana.pg@example.com', contrasena: 'ClaveSegura123',
      codigo: '482913', usado: false, expiraEn: new Date(Date.now() + 60000),
    });
    prisma.registroPendiente.deleteMany.mockResolvedValue({ count: 1 });
    prisma.rol.findFirst.mockResolvedValue({ id: 4, nombre: 'Invitado' });
    prisma.usuario.create.mockResolvedValue({
      id: 38, nombre: 'Ana', correo: 'ana.pg@example.com', rolId: 4, emailVerificado: true,
      contrasena: 'hashed', rol: { nombre: 'Invitado', detalleRolPermisos: [] }, suscripcion: null,
    });
    prisma.usuario.findUnique.mockResolvedValue({ twoFactorSecret: null, twoFactorEnabled: false });

    const res = await request(app).post('/api/auth/verificar-correo').send({ usuarioId: 71, codigo: '482913' });
    expect(res.status).toBe(200);
    expect(prisma.usuario.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ nombre: 'Ana', correo: 'ana.pg@example.com', rolId: 4, emailVerificado: true }),
    }));
    expect(verificarToken(res.body.token_acceso)).toBe(38);
  });
});
