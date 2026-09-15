import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const rutaMailer = require.resolve('../auth/utils/mailer.js');

// Spec 007: las plantillas de correo deben hablar de tecnología.
const TERMINOS_PROHIBIDOS = ['salteñ', 'sabor tradicional', 'sucursal', '/productos', '#ff4d00', '#8b3a13', '#5d3a1f', '#fff5ec'];

// Spec 015: las plantillas deben usar la paleta de la web (oscuro + verde lima).
const COLORES_MARCA = ['#a3e635', '#0a0a0a', '#111827'];

describe('Plantillas de correo (mailer)', () => {
  const texto = readFileSync(rutaMailer, 'utf8').toLowerCase();

  it('no contiene términos del vertical restaurante', () => {
    for (const termino of TERMINOS_PROHIBIDOS) {
      expect(texto.includes(termino), `mailer contiene "${termino}"`).toBe(false);
    }
  });

  it('usa la paleta de marca (verde lima + oscuro)', () => {
    for (const color of COLORES_MARCA) {
      expect(texto.includes(color), `mailer no usa "${color}"`).toBe(true);
    }
  });
});
