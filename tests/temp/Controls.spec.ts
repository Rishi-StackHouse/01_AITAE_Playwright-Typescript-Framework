import { test, expect } from '@playwright/test';
import { LoginPage } from './temp';

test.describe('OrangeHRM - Login', () => {
    test('Login and click submit button', async ({ page }) => {
        // Login using the LoginPage class
        const loginPage = new LoginPage(page);
        await loginPage.login();
    });

    test('Navigate to Admin page from dashboard', async ({ page }) => {
        // Login using the LoginPage class
        const loginPage = new LoginPage(page);
        await loginPage.login();

        // Click the Admin menu item in the sidebar
        await page.getByRole('link', { name: 'Admin' }).click();

        // Verify the Admin page loaded
        await expect(page).toHaveURL(/admin\/viewSystemUsers/);
        await expect(page.getByRole('heading', { name: 'System Users' })).toBeVisible();
    });

    test('Click all left navigation items one by one', async ({ page }) => {
        // Login using the LoginPage class
        const loginPage = new LoginPage(page);
        await loginPage.login();

        // Left navigation items to be verified
        const navItems = [
            'Admin',
            'PIM',
            'Leave',
            'Time',
            'Recruitment',
            'My Info',
            'Performance',
            'Dashboard',
            'Directory',
            'Maintenance',
            'Claim',
            'Buzz',
        ];

        // Click each nav item one by one and verify the page navigates
        for (const item of navItems) {
            await loginPage.clickLeftNavItem(item);
            await expect(page.getByRole('link', { name: item, exact: true })).toBeVisible();
        }
    });
});
