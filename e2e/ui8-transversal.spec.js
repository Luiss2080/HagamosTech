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
    await expect.poll(() => page.locator('meta[name="description"]').getAttribute('content')).toBeTruthy();
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

test('los enlaces internos de páginas clave apuntan a rutas registradas', async ({ page }) => {
  const rutasValidas = new Set(RUTAS);
  const paginas = ['/', '/servicios/desarrollo-web', '/contactanos', '/privacidad', '/cookies'];

  for (const ruta of paginas) {
    await page.goto(`/#${ruta}`);
    await expect(page.getByRole('main').first()).not.toBeEmpty({ timeout: 15_000 });
    const destinos = await page.locator('a[href]').evaluateAll((anchors) => anchors
      .map((anchor) => anchor.getAttribute('href'))
      .filter((href) => href?.startsWith('/#/') || href?.startsWith('#/') || (href?.startsWith('/') && !href.startsWith('//')))
      .map((href) => {
        const url = new URL(href, window.location.href);
        return url.hash.startsWith('#/') ? url.hash.slice(1).split('#')[0] : url.pathname;
      }));

    const desconocidos = destinos.filter((destino) => !rutasValidas.has(destino));
    expect(desconocidos, `${ruta} contiene enlaces internos no registrados`).toEqual([]);
  }
});

test('el menú móvil se abre con teclado y se cierra con Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const abrirMenu = page.getByRole('button', { name: 'Abrir Menú' });
  await expect(page.locator('#navbar-collapse')).toHaveAttribute('aria-hidden', 'true');
  await expect(page.locator('#navbar-collapse')).toHaveAttribute('inert', '');
  await abrirMenu.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: 'Cerrar Menú' })).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#navbar-collapse')).toHaveAttribute('aria-hidden', 'false');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Abrir Menú' })).toHaveAttribute('aria-expanded', 'false');
});
