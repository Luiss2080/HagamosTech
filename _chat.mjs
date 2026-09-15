import { chromium } from '@playwright/test';

const out = 'C:/Users/Victus/AppData/Local/Temp/opencode';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });

const errores = [];
page.on('console', (m) => { if (m.type() === 'error') errores.push(m.text()); });
page.on('pageerror', (e) => errores.push('pageerror: ' + e.message));

await page.goto('http://localhost:4000/', { waitUntil: 'domcontentloaded' });
await page.waitForSelector('img[alt="Logo HagamosTech"]', { state: 'visible', timeout: 30000 });
await page.waitForTimeout(4000);

// Abrir el asistente (botón flotante con el ícono de robot)
await page.locator('div.fixed.bottom-3 button').first().click();
await page.waitForSelector('input[placeholder="Escribe tu consulta..."]', { state: 'visible', timeout: 10000 });
await page.waitForTimeout(1200);
await page.screenshot({ path: `${out}/chat-abierto.png` });

// Enviar un mensaje
await page.fill('input[placeholder="Escribe tu consulta..."]', '¿Qué servicios ofrecen?');
await page.press('input[placeholder="Escribe tu consulta..."]', 'Enter');
await page.waitForTimeout(2500);
await page.screenshot({ path: `${out}/chat-mensaje.png` });

console.log('ERRORES:', errores.length ? errores.join(' | ') : 'ninguno');
await browser.close();
