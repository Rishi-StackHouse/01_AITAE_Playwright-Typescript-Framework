import { test, expect, Response } from '@playwright/test';
import { LoginPage } from '../../src/apps/orge/pages/LoginPage';

test.describe('Orge | Login Page', { tag: ['@orge', '@login', '@smoke'] }, () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('TC_1 - Verifying Login Page Status, Elements Visibility, and Visual Appearance', { tag: '@smoke' }, async () => {

    await test.step('Step 1 - Launch the Orge Web app and verify app opened successfully', async () => {
      const response: Response | null = await loginPage.launchOrge();
    });

    await test.step('Step 2 - Verify the visibility and state of all login page elements', async () => {
      await loginPage.verifyLoginPageElementsVisibility();
    });

    await test.step('Step 3 - Verify login page screenshot visually', async () => {
      await loginPage.captureLoginPage();

    });

  });
});
