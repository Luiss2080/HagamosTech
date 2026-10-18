import { test, expect } from '@playwright/test';

const RUTAS = [
  '/',
  '/que-hacemos/tecnologia',
  '/que-hacemos/academia',
  '/que-hacemos/negocios',
  '/que-hacemos/personalizado',
  '/inicio/hero',
  '/servicios/desarrollo-web',
  '/servicios/sistemas-apps',
  '/servicios/para-tu-negocio',
  '/servicios/apoyo-academico',
  '/servicios/empleo',
  '/servicios/diseno-grafico',
  '/condiciones',
  '/privacidad',
  '/terminos',
  '/cookies',
  '/sobre-nosotros',
  '/sobre-nosotros/historia',
  '/sobre-nosotros/mision-vision',
  '/sobre-nosotros/valores',
  '/sobre-nosotros/videos',
  '/promociones',
  '/como-trabajamos',
  '/contactanos',
  '/contacto/hero',
  '/contacto/formulario',
  '/contacto/recursos',
  '/contacto/ubicacion',
  '/recuperar-contrasena',
  '/perfil',
  '/configuracion',
  '/perfil/compras',
  '/errors/401',
  '/errors/403',
  '/errors/404',
  '/errors/419',
  '/errors/500',
  '/ruta-inexistente-ui8',
];

test('las rutas directas muestran el shell, título de HagamosTech y no generan errores JS', async ({ page }) => {
  test.setTimeout(180_000);
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));

  for (const ruta of RUTAS) {
    await page.goto(`/#${ruta}`);
    await expect(page.getByRole('main').first()).not.toBeEmpty({ timeout: 15_000 });
    await expect(page).toHaveTitle(/HagamosTech/i);
  }

  expect(pageErrors).toEqual([]);
});

test('rutas representativas conservan el ancho de pantalla en móvil, tablet y escritorio', async ({ page }) => {
  test.setTimeout(120_000);
  const casos = [
    { ruta: '/', anchos: [390, 768, 1280] },
    { ruta: '/servicios/desarrollo-web', anchos: [390, 768, 1280] },
    { ruta: '/contactanos', anchos: [390, 768, 1280] },
    { ruta: '/cookies', anchos: [390, 768, 1280] },
    { ruta: '/errors/500', anchos: [390, 768, 1280] },
  ];

  for (const { ruta, anchos } of casos) {
    for (const width of anchos) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(`/#${ruta}`);
      await expect(page.getByRole('main').first()).toBeVisible({ timeout: 15_000 });
      const dimensions = await page.evaluate(() => ({
        body: document.body.scrollWidth,
        document: document.documentElement.clientWidth,
      }));
      expect(dimensions.body, `${ruta} presenta overflow a ${width}px`).toBeLessThanOrEqual(dimensions.document);
    }
  }
});

test('el menú móvil se abre con teclado y se cierra con Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const abrirMenu = page.getByRole('button', { name: 'Abrir Menú' });
  await abrirMenu.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: 'Cerrar Menú' })).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Abrir Menú' })).toHaveAttribute('aria-expanded', 'false');
});
