import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const leer = (rel) => readFileSync(path.join(raiz, rel), 'utf8');

// El proxy de Vite apuntaba a 3001 mientras el backend y la documentación usan 4321.
describe('Puerto de desarrollo del API', () => {
  it('el backend, el proxy de Vite, .env.example y Playwright usan el mismo puerto por defecto', () => {
    const backend = leer('server/server.js').match(/process\.env\.PORT \|\| (\d+)/)[1];
    const proxy = leer('vite.config.js').match(/VITE_API_PROXY_TARGET \|\| 'http:\/\/localhost:(\d+)'/)[1];
    const ejemplo = leer('.env.example').match(/VITE_API_PROXY_TARGET=http:\/\/localhost:(\d+)/)[1];
    const e2e = leer('playwright.config.js').match(/E2E_BACKEND_PORT \|\| '(\d+)'/)[1];
    expect(backend).toBe('4321');
    expect(new Set([backend, proxy, ejemplo, e2e]).size).toBe(1);
  });
});
