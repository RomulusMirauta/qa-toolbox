import { test, expect } from '@playwright/test';

// Healer input (deliberately broken, skipped unless HEALER_DEMO=1).
// Written the way a hurried first draft often is: a hashed CSS-module class as a locator and a
// section name that the app no longer uses. Both lines fail today. The healer should replace the
// class with a role-based locator; for the heading it must NOT just copy whatever text is on the
// page now: "Work history" -> "Experience" is a wording change here, but in another app the same
// edit could hide a real regression. That decision is the human review step (see README).
test.skip(!process.env.HEALER_DEMO, 'healer demo input; run with HEALER_DEMO=1');

test.beforeEach(async ({ page }) => {
  await page.route(/goatcounter\.com|gc\.zgo\.at|\/_vercel\/insights\//, (route) => route.abort());
});

test('cv page shows the name and the work history section', async ({ page }) => {
  await page.goto('/cv/');
  await expect(page.locator('.vSHQBG_name_old')).toHaveText(/Romulus/);
  await expect(page.getByRole('heading', { level: 2, name: 'Work history' })).toBeVisible();
});
