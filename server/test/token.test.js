import { describe, it, expect } from 'vitest';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const crypto = require('node:crypto');
const { firmarToken, verificarToken } = require('../auth/utils/token.js');

const SECRETO = process.env.JWT_SECRET || 'hagamostech_dev_secret_key_2026';

// Spec 011: tokens de sesión firmados con HMAC-SHA256.
describe('Tokens de sesión firmados', () => {
  it('firma un token válido y recupera el usuario', () => {
    const token = firmarToken(42);
    expect(token.split('.')).toHaveLength(3);
    expect(verificarToken(token)).toBe(42);
  });

  it('rechaza un token con el payload manipulado', () => {
    const token = firmarToken(1);
    const [header, , firma] = token.split('.');
    const payloadFalso = Buffer.from(
      JSON.stringify({ sub: 999, exp: Date.now() + 100000 })
    ).toString('base64url');
    expect(verificarToken(`${header}.${payloadFalso}.${firma}`)).toBeNull();
  });

  it('rechaza un token con firma alterada', () => {
    const [header, payload] = firmarToken(1).split('.');
    expect(verificarToken(`${header}.${payload}.firmafalsa`)).toBeNull();
  });

  it('rechaza un token expirado', () => {
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
    const payload = Buffer.from(
      JSON.stringify({ sub: 7, exp: Date.now() - 1000 })
    ).toString('base64url');
    const firma = crypto
      .createHmac('sha256', SECRETO)
      .update(`${header}.${payload}`)
      .digest('base64url');
    expect(verificarToken(`${header}.${payload}.${firma}`)).toBeNull();
  });

  it('acepta el token legado mientras expira', () => {
    expect(verificarToken('token-user-5-1700000000000')).toBe(5);
  });

  it('rechaza tokens ausentes o mal formados', () => {
    expect(verificarToken('')).toBeNull();
    expect(verificarToken(undefined)).toBeNull();
    expect(verificarToken('cualquier-cosa')).toBeNull();
  });
});
