import { test, expect } from '@playwright/test';

// Spec 004: las páginas de contenido no deben mostrar el vertical restaurante
// ni arrojar errores de consola.
const RUTAS = ['/#/promociones', '/#/novedades'];
const TERMINOS_PROHIBIDOS = ['salteñ', 'frapuccino', 'cafetería', 'delivery'];

for (const ruta of RUTAS) {
  test(`${ruta} carga sin errores y sin contenido de restaurante`, async ({ page }) => {
    const errores = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errores.push(msg.text());
    });
    page.on('pageerror', (err) => errores.push(err.message));

    await page.goto(ruta);
    await expect(page.getByAltText('Logo HagamosTech').first()).toBeVisible({ timeout: 30_000 });

    const contenido = (await page.content()).toLowerCase();
    for (const termino of TERMINOS_PROHIBIDOS) {
      expect(contenido.includes(termino), `no debe contener "${termino}"`).toBe(false);
    }

    expect(errores, `Errores detectados: ${errores.join(' | ')}`).toEqual([]);
  });
}
