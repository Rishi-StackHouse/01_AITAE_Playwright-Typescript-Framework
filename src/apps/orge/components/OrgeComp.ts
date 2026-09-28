import { Page, Locator } from '@playwright/test';
import { OrgeBase } from '../OrgeBase';

export class OrgeComp extends OrgeBase {
  private readonly leftNav: Locator;
  private readonly navTimeout = this.timeouts.LEFT_NAV;

  constructor(page: Page) {
    super(page);
    this.leftNav = page.locator('');
  }
  
  public async selectLeftNavItem(name: string, timeout: number = this.navTimeout): Promise<void> {
    await this.click(this.leftNav.getByText(name, { exact: true }), timeout);
  }

  public async getLeftNavItemsText(timeout: number = this.navTimeout): Promise<string[]> {
    await this.waitForVisible(this.leftNav, timeout);
    return this.leftNav.getByRole('link').allInnerTexts();
  }
}
