import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createRequire } from 'node:module';
import request from 'supertest';
import { prisma, espiarModelo } from './helpers/prismaMock.js';

const require = createRequire(import.meta.url);
const app = require('../server.js');
const { firmarToken } = require('../auth/utils/token.js');
const TOKEN = firmarToken(7);

describe('Preferencias de perfil', () => {
  beforeEach(() => {
    espiarModelo('usuario', ['findUnique']);
    espiarModelo('preferenciaPerfil', ['findUnique', 'upsert']);
    prisma.usuario.findUnique.mockResolvedValue({ id: 7, activo: true });
  });

  afterEach(() => vi.restoreAllMocks());

  it('requiere una cuenta autenticada', async () => {
    const response = await request(app).get('/api/perfil/preferences');
    expect(response.status).toBe(401);
    expect(prisma.preferenciaPerfil.findUnique).not.toHaveBeenCalled();
  });

  it('devuelve valores iniciales cuando todavía no hay preferencias guardadas', async () => {
    prisma.preferenciaPerfil.findUnique.mockResolvedValue(null);
    const response = await request(app).get('/api/perfil/preferences').set('Authorization', `Bearer ${TOKEN}`);
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual({
      colorAcento: '#A3E635', privacidadPerfil: 'members',
      email_promociones: true, email_pedidos: true, sms_alertas: false,
    });
    expect(prisma.preferenciaPerfil.findUnique).toHaveBeenCalledWith({ where: { usuarioId: 7 } });
  });

  it('guarda preferencias en el registro asociado al usuario del token', async () => {
    prisma.preferenciaPerfil.findUnique.mockResolvedValue(null);
    prisma.preferenciaPerfil.upsert.mockResolvedValue({
      colorAcento: '#10b981', privacidadPerfil: 'private',
      emailPromociones: false, emailPedidos: true, smsAlertas: true,
    });
    const response = await request(app).put('/api/perfil/preferences')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send({ usuarioId: 99, colorAcento: '#10b981', privacidadPerfil: 'private', email_promociones: false, sms_alertas: true });
    expect(response.status).toBe(200);
    expect(prisma.preferenciaPerfil.upsert).toHaveBeenCalledWith({
      where: { usuarioId: 7 },
      create: { usuarioId: 7, colorAcento: '#10b981', privacidadPerfil: 'private', emailPromociones: false, emailPedidos: true, smsAlertas: true },
      update: { colorAcento: '#10b981', privacidadPerfil: 'private', emailPromociones: false, emailPedidos: true, smsAlertas: true },
    });
  });

  it('rechaza valores fuera del catálogo sin persistirlos', async () => {
    const response = await request(app).put('/api/perfil/preferences')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send({ privacidadPerfil: 'cualquiera' });
    expect(response.status).toBe(400);
    expect(prisma.preferenciaPerfil.upsert).not.toHaveBeenCalled();
  });
});
