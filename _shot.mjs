import { chromium } from '@playwright/test';

const out = 'C:/Users/Victus/AppData/Local/Temp/opencode';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const rutas = [
  ['/#/promociones', 'promociones.png'],
  ['/#/novedades', 'novedades.png'],
  ['/#/terminos', 'terminos.png'],
];

for (const [ruta, archivo] of rutas) {
  await page.goto(`http://localhost:4000${ruta}`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('img[alt="Logo HagamosTech"]', { state: 'visible', timeout: 30000 });
  await page.waitForTimeout(5000);

  const alto = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < alto; y += 700) {
    await page.evaluate((pos) => window.scrollTo(0, pos), y);
    await page.waitForTimeout(250);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1200);

  await page.screenshot({ path: `${out}/${archivo}`, fullPage: true });
  console.log('captura:', archivo, 'alto:', alto);
}

await browser.close();
