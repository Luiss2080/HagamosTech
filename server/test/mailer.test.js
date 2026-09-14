import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const rutaMailer = require.resolve('../auth/utils/mailer.js');

// Spec 007: las plantillas de correo deben hablar de tecnología.
const TERMINOS_PROHIBIDOS = ['salteñ', 'sabor tradicional', 'sucursal', '/productos'];

describe('Plantillas de correo (mailer)', () => {
  it('no contiene términos del vertical restaurante', () => {
    const texto = readFileSync(rutaMailer, 'utf8').toLowerCase();
    for (const termino of TERMINOS_PROHIBIDOS) {
      expect(texto.includes(termino), `mailer contiene "${termino}"`).toBe(false);
    }
  });
});
