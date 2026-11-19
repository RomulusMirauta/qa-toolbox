import { defineConfig, devices } from '@playwright/test';

// Target: the public production app (read-only). Override with BASE_URL for another deployment.
const BASE_URL = (process.env.BASE_URL ?? 'https://romulus-mirauta.vercel.app').replace(/\/+$/, '');

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  workers: 2, // polite: a public site
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
    // Do not count test runs as visits.
    serviceWorkers: 'block',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1920, height: 1080 } } }],
});
