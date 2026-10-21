import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createRequire } from 'node:module';
import request from 'supertest';
import { prisma, espiarModelo } from './helpers/prismaMock.js';

const require = createRequire(import.meta.url);
const app = require('../server.js');
const { firmarToken } = require('../auth/utils/token.js');
const TOKEN = firmarToken(7);

describe('Espacio personal', () => {
  beforeEach(() => {
    espiarModelo('usuario', ['findUnique']);
    espiarModelo('proyectoPersonal', ['findMany', 'findFirst', 'create', 'update', 'delete']);
    espiarModelo('notaPersonal', ['findMany', 'findFirst', 'create', 'update', 'delete']);
    espiarModelo('eventoPersonal', ['findMany', 'findFirst', 'create', 'update', 'delete']);
    espiarModelo('tareaPersonal', ['findMany', 'findFirst', 'create', 'update', 'delete']);
    espiarModelo('recursoPersonal', ['findMany', 'findFirst', 'create', 'update', 'delete']);
    espiarModelo('sesionEnfoque', ['findMany', 'findFirst', 'create', 'delete']);
    prisma.usuario.findUnique.mockResolvedValue({ id: 7, activo: true });
  });

  afterEach(() => vi.restoreAllMocks());

  it('exige una sesión autenticada antes de acceder a los datos', async () => {
    const res = await request(app).get('/api/perfil/espacio/proyectos');
    expect(res.status).toBe(401);
    expect(prisma.proyectoPersonal.findMany).not.toHaveBeenCalled();
  });

  it('limita la consulta de proyectos al propietario del token', async () => {
    prisma.proyectoPersonal.findMany.mockResolvedValue([]);
    const res = await request(app).get('/api/perfil/espacio/proyectos').set('Authorization', `Bearer ${TOKEN}`);
    expect(res.status).toBe(200);
    expect(prisma.proyectoPersonal.findMany).toHaveBeenCalledWith(expect.objectContaining({ where: { usuarioId: 7 } }));
  });

  it('crea un proyecto para el usuario autenticado sin aceptar un usuario enviado por el cliente', async () => {
    prisma.proyectoPersonal.create.mockResolvedValue({ id: 5, usuarioId: 7, titulo: 'Plan de estudio', etapa: 'idea' });
    const res = await request(app).post('/api/perfil/espacio/proyectos')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send({ usuarioId: 99, titulo: 'Plan de estudio' });
    expect(res.status).toBe(201);
    expect(prisma.proyectoPersonal.create).toHaveBeenCalledWith({ data: expect.objectContaining({ usuarioId: 7, titulo: 'Plan de estudio' }) });
    expect(prisma.proyectoPersonal.create.mock.calls[0][0].data.usuarioId).not.toBe(99);
  });

  it('no modifica un proyecto que no pertenece a la cuenta', async () => {
    prisma.proyectoPersonal.findFirst.mockResolvedValue(null);
    const res = await request(app).put('/api/perfil/espacio/proyectos/12')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send({ etapa: 'finalizado' });
    expect(res.status).toBe(404);
    expect(prisma.proyectoPersonal.findFirst).toHaveBeenCalledWith(expect.objectContaining({ where: { id: 12, usuarioId: 7 } }));
    expect(prisma.proyectoPersonal.update).not.toHaveBeenCalled();
  });

  it('rechaza notas asociadas a proyectos de otro usuario', async () => {
    prisma.proyectoPersonal.findFirst.mockResolvedValue(null);
    const res = await request(app).post('/api/perfil/espacio/notas')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send({ titulo: 'Nota privada', contenido: 'Texto', proyectoId: 44 });
    expect(res.status).toBe(404);
    expect(prisma.notaPersonal.create).not.toHaveBeenCalled();
  });

  it('rechaza fechas de calendario inválidas sin persistirlas', async () => {
    const res = await request(app).post('/api/perfil/espacio/eventos')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send({ titulo: 'Entrega', inicio: 'fecha inválida' });
    expect(res.status).toBe(400);
    expect(prisma.eventoPersonal.create).not.toHaveBeenCalled();
  });

  it('crea recordatorios bajo el usuario del token', async () => {
    prisma.eventoPersonal.create.mockResolvedValue({ id: 2, usuarioId: 7, titulo: 'Entrega', inicio: new Date('2026-11-01T15:00:00.000Z') });
    const res = await request(app).post('/api/perfil/espacio/eventos')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send({ usuarioId: 88, titulo: 'Entrega', inicio: '2026-11-01T15:00:00.000Z' });
    expect(res.status).toBe(201);
    expect(prisma.eventoPersonal.create.mock.calls[0][0].data.usuarioId).toBe(7);
  });

  it('crea tareas bajo el usuario autenticado y no acepta estado inválido', async () => {
    prisma.tareaPersonal.create.mockResolvedValue({ id: 3, usuarioId: 7, titulo: 'Estudiar' });
    const res = await request(app).post('/api/perfil/espacio/tareas').set('Authorization', `Bearer ${TOKEN}`).send({ usuarioId: 99, titulo: 'Estudiar', prioridad: 'alta' });
    expect(res.status).toBe(201);
    expect(prisma.tareaPersonal.create.mock.calls[0][0].data.usuarioId).toBe(7);
    const invalid = await request(app).post('/api/perfil/espacio/tareas').set('Authorization', `Bearer ${TOKEN}`).send({ titulo: 'Estudiar', estado: 'inventado' });
    expect(invalid.status).toBe(400);
    expect(prisma.tareaPersonal.create).toHaveBeenCalledTimes(1);
  });

  it('guarda enlaces propios y rechaza protocolos inseguros o ajenos', async () => {
    prisma.recursoPersonal.create.mockResolvedValue({ id: 10, usuarioId: 7, titulo: 'Docs' });
    const res = await request(app).post('/api/perfil/espacio/recursos').set('Authorization', `Bearer ${TOKEN}`).send({ usuarioId: 99, titulo: 'Docs', url: 'https://example.org' });
    expect(res.status).toBe(201);
    expect(prisma.recursoPersonal.create.mock.calls[0][0].data.usuarioId).toBe(7);
    const invalid = await request(app).post('/api/perfil/espacio/recursos').set('Authorization', `Bearer ${TOKEN}`).send({ titulo: 'Docs', url: 'javascript:alert(1)' });
    expect(invalid.status).toBe(400);
    expect(prisma.recursoPersonal.create).toHaveBeenCalledTimes(1);
  });

  it('guarda sesiones de enfoque bajo el usuario autenticado y valida duración y propiedad del proyecto', async () => {
    prisma.sesionEnfoque.create.mockResolvedValue({ id: 4, usuarioId: 7, titulo: 'Estudiar', duracionMinutos: 25 });
    const res = await request(app).post('/api/perfil/espacio/enfoque').set('Authorization', `Bearer ${TOKEN}`).send({
      usuarioId: 99, titulo: 'Estudiar', duracionMinutos: 25, iniciadoEn: '2026-10-21T10:00:00.000Z', completadoEn: '2026-10-21T10:25:00.000Z',
    });
    expect(res.status).toBe(201);
    expect(prisma.sesionEnfoque.create.mock.calls[0][0].data.usuarioId).toBe(7);

    const invalid = await request(app).post('/api/perfil/espacio/enfoque').set('Authorization', `Bearer ${TOKEN}`).send({
      titulo: 'Estudiar', duracionMinutos: 181, iniciadoEn: '2026-10-21T10:00:00.000Z', completadoEn: '2026-10-21T10:25:00.000Z',
    });
    expect(invalid.status).toBe(400);
    expect(prisma.sesionEnfoque.create).toHaveBeenCalledTimes(1);
  });

  it('no permite eliminar una sesión de enfoque ajena', async () => {
    prisma.sesionEnfoque.findFirst.mockResolvedValue(null);
    const res = await request(app).delete('/api/perfil/espacio/enfoque/30').set('Authorization', `Bearer ${TOKEN}`);
    expect(res.status).toBe(404);
    expect(prisma.sesionEnfoque.delete).not.toHaveBeenCalled();
  });
});
