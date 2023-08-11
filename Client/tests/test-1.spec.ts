import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.locator('div').filter({ hasText: 'Device Vision' }).nth(2).click();
  await page.getByText('Upload / Drag and drop the Actual Dataset for Testing').click();
  await page.getByText('Upload / Drag and drop the Actual Dataset for Testing').click();
  await page.locator('div').filter({ hasText: /^New Project$/ }).first().click();
  await page.locator('button').click();
});