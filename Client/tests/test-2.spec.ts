import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.locator('div').filter({ hasText: 'Device Vision' }).nth(2).click();
  await page.getByRole('heading', { name: 'Device Vision' }).click();
  await page.getByText('Upload / Drag and drop the Actual Dataset for Testing').click();
  await page.getByText('Upload / Drag and drop the Actual Dataset for TestingNew Project').click();
});