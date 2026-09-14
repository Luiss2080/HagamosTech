import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

// Verdad de contenido: Promociones y Novedades deben hablar solo de tecnología
// (Spec 004). La oferta canónica vive en `src/data/serviciosData.js`.
const RAICES = ['src/pages/Promociones', 'src/pages/Novedades'];

const TERMINOS_PROHIBIDOS = [
  'salteñ',
  'saltena',
  'frapuccino',
  'cafetería',
  'cafeteria',
  'delivery',
  'sucursal',
  'postre',
  '1989',
];

const listarArchivos = (dir) => {
  const archivos = [];
  for (const entrada of readdirSync(dir)) {
    const ruta = join(dir, entrada);
    if (statSync(ruta).isDirectory()) {
      archivos.push(...listarArchivos(ruta));
    } else if (entrada.endsWith('.jsx') || entrada.endsWith('.js')) {
      archivos.push(ruta);
    }
  }
  return archivos;
};

describe('Contenido tech en Promociones y Novedades', () => {
  it('no contiene términos del vertical restaurante', () => {
    for (const raiz of RAICES) {
      for (const archivo of listarArchivos(raiz)) {
        const texto = readFileSync(archivo, 'utf8').toLowerCase();
        for (const termino of TERMINOS_PROHIBIDOS) {
          expect(texto.includes(termino), `${archivo} contiene "${termino}"`).toBe(false);
        }
      }
    }
  });
});
