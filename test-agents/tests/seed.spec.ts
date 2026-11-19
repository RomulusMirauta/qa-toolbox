import { test, expect } from '@playwright/test';

// Seed test for the Test Agents: it puts the browser in a known state (the app loaded,
// analytics blocked so runs never count as visits). The planner explores from here; generated tests start from it.
test.beforeEach(async ({ page }) => {
  await page.route(/goatcounter\.com|gc\.zgo\.at|\/_vercel\/insights\//, (route) => route.abort());
});

test('seed', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Romulus/);
});
