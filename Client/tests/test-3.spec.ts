import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Add an expect assertion to check for visibility of a specific div element
  await expect(page.locator('h3:has-text("Device Vision")')).toBeVisible();
});
