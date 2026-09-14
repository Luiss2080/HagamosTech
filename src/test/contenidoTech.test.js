import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

// Verdad de contenido: todo el frontend debe hablar solo de la oferta del
// Catálogo Maestro (docs/catalogo-servicios.md). Se excluyen los archivos de test.
const RAICES = ['src'];
const EXCLUIR = /(\.test\.|\.spec\.|[/\\]test[/\\])/;

const TERMINOS_PROHIBIDOS = [
  'salteñ',
  'saltena',
  'frapuccino',
  'cafetería',
  'cafeteria',
  'arduino',
  'lego',
  'robotics academy',
  'robot builder',
  'libros',
  'tomos',
  'modo invitado',
  'primer pedido',
  'mentoría',
  'headhunting',
  'ciberseguridad',
];

const listarArchivos = (dir) => {
  const archivos = [];
  for (const entrada of readdirSync(dir)) {
    const ruta = join(dir, entrada);
    if (EXCLUIR.test(ruta)) continue;
    if (statSync(ruta).isDirectory()) {
      archivos.push(...listarArchivos(ruta));
    } else if (entrada.endsWith('.jsx') || entrada.endsWith('.js') || entrada.endsWith('.tsx')) {
      archivos.push(ruta);
    }
  }
  return archivos;
};

describe('Contenido alineado al Catálogo Maestro', () => {
  it('el frontend no contiene términos fuera del catálogo', () => {
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
