import { test, expect } from '@playwright/test';

// RF-7, RF-8 (Spec 001) + verdad de contenido (Spec 002/004/008).
const TERMINOS_PROHIBIDOS = ['salteñ', 'frapuccino', 'cafetería', 'arduino', 'robotics academy', 'libros'];

test('la home carga, muestra la marca y no ofrece fuera de catálogo', async ({ page }) => {
  const errores = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errores.push(`console: ${msg.text()}`);
  });
  page.on('pageerror', (err) => errores.push(`pageerror: ${err.message}`));

  await page.goto('/');

  await expect(page).toHaveTitle(/HAGAMOSTECH/i);
  await expect(page.getByAltText('Logo HagamosTech').first()).toBeVisible({ timeout: 30_000 });

  const contenido = (await page.content()).toLowerCase();
  for (const termino of TERMINOS_PROHIBIDOS) {
    expect(contenido.includes(termino), `la home no debe contener "${termino}"`).toBe(false);
  }

  expect(errores, `Errores detectados: ${errores.join(' | ')}`).toEqual([]);
});
