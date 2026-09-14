import { describe, it, expect } from 'vitest';
import { createRequire } from 'node:module';
import request from 'supertest';

// Spec 005: la API no debe fingir éxito. Se importa `app` sin iniciar puerto.
const require = createRequire(import.meta.url);
const app = require('../server.js');

describe('API veraz', () => {
  it('un endpoint inexistente responde 404 y no finge éxito', async () => {
    const res = await request(app).get('/api/endpoint-inexistente-xyz');
    expect(res.status).toBe(404);
    expect(res.body.success).toBeUndefined();
    expect(res.body.error).toBe('Endpoint no encontrado');
  });

  it('un endpoint del vertical retirado responde 410', async () => {
    const res = await request(app).get('/api/catalogo');
    expect(res.status).toBe(410);
  });

  it('/api/perfil sin token responde 401', async () => {
    const res = await request(app).get('/api/perfil');
    expect(res.status).toBe(401);
  });
});
