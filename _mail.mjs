import { createRequire } from 'node:module';
import { chromium } from '@playwright/test';

const require = createRequire(import.meta.url);
const mailer = require('C:/laragon/www/HagamosTech/server/auth/utils/mailer.js');

const out = 'C:/Users/Victus/AppData/Local/Temp/opencode';
const html = mailer.plantillaVerificacion({ nombre: 'Luis', codigo: '482915', expiraMin: 15 });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 700, height: 1100 } });
await page.setContent(html, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1200);
await page.screenshot({ path: `${out}/mail-blanco.png`, fullPage: true });
console.log('captura: mail-blanco.png');
await browser.close();
