import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  //Fail CI build on presence of test.only. Prevent focussed tests committed
  forbidOnly: !!process.env.CI,
  //Enable retries on CI for reduced flakiness
  retries: process.env.CI ? 2 : 0,
  //Prevent parallel test runs in CI to reduce resource contention
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
trace: 'on-first-retry',
    launchOptions: {
      slowMo:150,
    }
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

});
