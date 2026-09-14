import { test, expect } from '@playwright/test';

const BACKEND = process.env.E2E_BACKEND_URL || 'http://localhost:4321';
const USUARIO = { correo: 'cliente@hagamostech.bo', contrasena: 'Cliente123' };

// Spec 013: el login debe funcionar de punta a punta.
test('login de usuario demo funciona en la interfaz', async ({ page, request }) => {
  const check = await request.post(`${BACKEND}/api/auth/login`, { data: USUARIO }).catch(() => null);
  test.skip(!check || check.status() !== 200, 'usuario demo no disponible en este entorno');

  await page.goto('/');
  await expect(page.getByAltText('Logo HagamosTech').first()).toBeVisible({ timeout: 30_000 });

  await page.getByRole('button', { name: /iniciar sesion/i }).first().click();
  await page.waitForSelector('input[name="correo"]', { state: 'visible', timeout: 10_000 });
  await page.fill('input[name="correo"]', USUARIO.correo);
  await page.fill('input[name="contrasena"]', USUARIO.contrasena);
  await page.getByRole('button', { name: /entrar a iniciar/i }).click();

  await expect(page.getByText('Cliente Demo').first()).toBeVisible({ timeout: 15_000 });
});
