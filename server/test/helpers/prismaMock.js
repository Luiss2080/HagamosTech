import { vi } from 'vitest';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

// Se carga la MISMA instancia de Prisma que usan las rutas (caché de `require`
// de Node). Así `vi.spyOn` intercepta las llamadas reales y no se toca MySQL
// (RF-5). Ver `docs/testing.md`.
export const prisma = require('../../models/prisma.js');

// Instala espías sobre los métodos indicados del modelo `mensaje` u otro.
export function espiarModelo(nombreModelo = 'mensaje', metodos = ['create']) {
  const modelo = prisma[nombreModelo];
  metodos.forEach((metodo) => {
    if (typeof modelo[metodo] === 'function') {
      vi.spyOn(modelo, metodo);
    }
  });
  return modelo;
}

export default prisma;
