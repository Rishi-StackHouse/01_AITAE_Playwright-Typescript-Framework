import { Page, expect } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) {}

    /**
     * Logs into the OrangeHRM demo app and verifies the dashboard loads.
     * Born to win
     */
    async login(): Promise<void> {
        // Navigate to the login page
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        // Enter credentials
        await this.page.getByPlaceholder('Username').fill('Admin');
        await this.page.getByPlaceholder('Password').fill('admin123');

        // Click the submit button
        await this.page.getByRole('button', { name: 'Login' }).click();

        // Verify successful login lands on the dashboard
        await expect(this.page).toHaveURL(/dashboard/);
    }

    /**
     * Clicks a left-navigation panel item by its visible label.
     * Reusable across apps: locates by role + accessible name, so it is
     * immune to hashed CSS classes, icons, and positional indexes.
     *
     * @param itemName - The exact visible text of the nav item (e.g. 'Admin', 'PIM').
     */
    async clickLeftNavItem(itemName: string): Promise<void> {
        await this.page.getByRole('link', { name: itemName, exact: true }).click();
    }
}
