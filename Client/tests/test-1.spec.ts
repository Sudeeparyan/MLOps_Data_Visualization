import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.locator('button').click();
  await page.locator('button').setInputFiles('e9data.csv');
  await page.locator('button').filter({ hasText: 'New Project' }).click();
  await page.locator('button').filter({ hasText: 'New Project' }).setInputFiles('e9data.csv');
});