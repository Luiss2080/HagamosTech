import { test, expect } from '@playwright/test';

// RF-7, RF-8: humo E2E. Carga la home y verifica la marca y la ausencia de
// errores de consola (nivel error) y de excepciones no capturadas.
test('la home carga y muestra la marca HagamosTech sin errores', async ({ page }) => {
  const errores = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errores.push(`console: ${msg.text()}`);
  });
  page.on('pageerror', (err) => errores.push(`pageerror: ${err.message}`));

  await page.goto('/');

  await expect(page).toHaveTitle(/HAGAMOSTECH/i);
  await expect(page.getByAltText('Logo HagamosTech').first()).toBeVisible({ timeout: 30_000 });

  expect(errores, `Errores detectados: ${errores.join(' | ')}`).toEqual([]);
});
