import { test, expect } from '@playwright/test';

// El asistente Niko debe responder consultas frecuentes con el contenido correcto.
test('el asistente responde la consulta de servicios', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByAltText('Logo HagamosTech').first()).toBeVisible({ timeout: 30_000 });

  await page.locator('button:has(i.fa-robot)').last().click();
  const input = page.locator('input[placeholder="Escribe tu consulta..."]');
  await input.waitFor({ state: 'visible', timeout: 10_000 });

  await input.fill('¿Qué servicios ofrecen?');
  await input.press('Enter');

  await expect(page.getByText(/áreas de solución/i)).toBeVisible({ timeout: 10_000 });
});
