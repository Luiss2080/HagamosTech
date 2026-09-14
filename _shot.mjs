import { chromium } from '@playwright/test';

const out = 'C:/Users/Victus/AppData/Local/Temp/opencode';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const rutas = [
  ['/#/promociones', 'promociones.png'],
  ['/#/novedades', 'novedades.png'],
];

for (const [ruta, archivo] of rutas) {
  await page.goto(`http://localhost:4000${ruta}`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('img[alt="Logo HagamosTech"]', { state: 'visible', timeout: 30000 });
  await page.waitForTimeout(6000);
  await page.screenshot({ path: `${out}/${archivo}`, fullPage: true });
  console.log('captura:', archivo);
}

await browser.close();
