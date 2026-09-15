import { chromium } from '@playwright/test';

const out = 'C:/Users/Victus/AppData/Local/Temp/opencode';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });

const errores = [];
page.on('console', (m) => { if (m.type() === 'error') errores.push(m.text()); });
page.on('pageerror', (e) => errores.push('pageerror: ' + e.message));

await page.goto('http://localhost:4000/#/contactanos', { waitUntil: 'domcontentloaded' });
await page.waitForSelector('img[alt="Logo HagamosTech"]', { state: 'visible', timeout: 30000 });
await page.waitForTimeout(4000);

await page.getByText('Conéctate con', { exact: false }).first().scrollIntoViewIfNeeded().catch(() => {});
await page.waitForTimeout(800);
await page.screenshot({ path: `${out}/contacto-form.png`, fullPage: true });
console.log('captura: contacto-form.png');
console.log('ERRORES:', errores.length ? errores.join(' | ') : 'ninguno');

await browser.close();
