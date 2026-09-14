import { chromium } from '@playwright/test';

const out = 'C:/Users/Victus/AppData/Local/Temp/opencode';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const errores = [];
page.on('console', (m) => { if (m.type() === 'error') errores.push(m.text()); });
page.on('pageerror', (e) => errores.push('pageerror: ' + e.message));

await page.goto('http://localhost:4000/', { waitUntil: 'domcontentloaded' });
await page.waitForSelector('img[alt="Logo HagamosTech"]', { state: 'visible', timeout: 30000 });
await page.waitForTimeout(4000);

// Abrir login
await page.getByRole('button', { name: /iniciar sesion/i }).first().click();
await page.waitForSelector('input[name="correo"]', { state: 'visible', timeout: 10000 });
await page.screenshot({ path: `${out}/login-modal.png` });

await page.fill('input[name="correo"]', 'cliente@hagamostech.bo');
await page.fill('input[name="contrasena"]', 'Cliente123');
await page.getByRole('button', { name: /entrar a iniciar/i }).click();

let ok = false;
try {
  await page.getByText('Cliente Demo').first().waitFor({ timeout: 15000 });
  ok = true;
} catch {}

await page.waitForTimeout(1500);
await page.screenshot({ path: `${out}/login-ok.png` });

console.log('LOGIN_UI_OK:', ok);
console.log('ERRORES:', errores.length ? errores.join(' | ') : 'ninguno');

await browser.close();
