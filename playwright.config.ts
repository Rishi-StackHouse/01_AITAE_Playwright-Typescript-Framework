import 'dotenv/config';
import { defineConfig, devices } from "@playwright/test";

// Bypass SSL certificate validation (for corporate proxy/Zscaler)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',              /* Configure test folder */
  timeout: 60000,                 /* Default timeout for all the test */
  expect: { timeout: 2500 },
  fullyParallel: false,                /* Run tests in files in parallel */
  forbidOnly: !!process.env.CI,       /* Fail the build on CI if you accidentally left test.only in the source code. */
  retries: process.env.CI ? 2 : 0,    /* Retry on CI only */
  workers: process.env.CI ? 1 : 2,     /* Opt out of parallel tests on CI. */

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { open: 'never' }], /*Auto-open report only on failure*/
    ['list']
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    ignoreHTTPSErrors: true,
  },

  // Projects Block: Managing browsers for test
  projects: [
    {
      name: 'chromium',
      use: {
        headless: false,
        channel: 'chrome',
        viewport: null,  // viewport: { width: 1920, height:1080 }, (custom viewport size)
        launchOptions: {
          args: [
            '--start-maximized',
            '--ignore-certificate-errors',
            '--disable-web-security',
            '--allow-running-insecure-content',
          ],
        },
      },
    },

     {
       name: 'firefox',
       use: { ...devices['Desktop Firefox'] },
     },
 
     {
       name: 'webkit',
       use: { ...devices['Desktop Safari'] },
     }, 

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
