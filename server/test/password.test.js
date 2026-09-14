import { describe, it, expect } from 'vitest';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const {
  esHashPassword,
  hashearContrasena,
  verificarContrasena,
} = require('../auth/utils/password.js');

// Spec 010: contraseñas hasheadas con scrypt.
describe('Hash de contraseñas (scrypt)', () => {
  it('hashea sin guardar el texto plano', async () => {
    const hash = await hashearContrasena('Secreta123');
    expect(esHashPassword(hash)).toBe(true);
    expect(hash.startsWith('scrypt$')).toBe(true);
    expect(hash.includes('Secreta123')).toBe(false);
  });

  it('verifica la contraseña correcta y rechaza la incorrecta', async () => {
    const hash = await hashearContrasena('Secreta123');
    expect(await verificarContrasena('Secreta123', hash)).toBe(true);
    expect(await verificarContrasena('Otra123', hash)).toBe(false);
  });

  it('usa salt aleatoria (dos hashes de la misma clave difieren)', async () => {
    const a = await hashearContrasena('Secreta123');
    const b = await hashearContrasena('Secreta123');
    expect(a).not.toBe(b);
  });

  it('acepta contraseñas en texto plano legadas', async () => {
    expect(await verificarContrasena('vieja123', 'vieja123')).toBe(true);
    expect(await verificarContrasena('otra', 'vieja123')).toBe(false);
  });

  it('rechaza contraseñas vacías o ausentes', async () => {
    expect(await verificarContrasena('x', null)).toBe(false);
    expect(await verificarContrasena('x', '')).toBe(false);
  });
});
