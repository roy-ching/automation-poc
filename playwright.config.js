const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  timeout: 60000,
  expect: {
    timeout: 30000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 30000,
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
    screnshot: 'on',
    trace: 'retain-on-failure',
    baseURL: process.env.BASE_URL || 'https://pmx-qa.vancopayments.com/',
  },
  globalSetup:"tests/utils/globalSetup.js",

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

};

module.exports = config;
