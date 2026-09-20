/*

*/

import { Page, Locator, expect, Response, test } from '@playwright/test';   // Page,Locator - Interfaces, Response, test
import { APP_TIMEOUTS } from './constants/timeouts';

export abstract class BasePage {
  protected readonly page: Page;
  protected readonly defaultTimeout: number;   // Timeout for element visibility
  protected readonly navigationTimeout: number;  // Timeout for url navigation and page load checks
  constructor(page: Page, defaultTimeout: number = APP_TIMEOUTS.default.ELEMENT, navigationTimeout: number = APP_TIMEOUTS.default.NAVIGATION) {
    this.page = page;
    this.defaultTimeout = defaultTimeout;
    this.navigationTimeout = navigationTimeout;
  }

  // 1. centralized waits for page elements visibility and navigation, openURL used in page methods, and other page actions
  protected readonly waitForVisible = async (locator: Locator, timeout: number = this.defaultTimeout): Promise<void> => {
    await locator.waitFor({ state: 'visible', timeout });
  };
  protected async waitForHidden(locator: Locator, timeout: number = this.defaultTimeout): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout });
  }
  protected async waitForAttached(locator: Locator, timeout: number = this.defaultTimeout): Promise<void> {
    await locator.waitFor({ state: 'attached', timeout });
  }
  protected async waitForDetached(locator: Locator, timeout: number = this.defaultTimeout): Promise<void> {
    await locator.waitFor({ state: 'detached', timeout });
  }

  // assertions - element visibility, enabled or disabled and editable state (direct Playwright web-first assertions)
  protected async verifyVisible(locator: Locator, timeout: number = this.defaultTimeout): Promise<void> {
    await expect(locator, `Expected: Element ${locator} to be visible`).toBeVisible({ timeout });
  }
  protected async verifyHidden(locator: Locator, timeout: number = this.defaultTimeout): Promise<void> {
    await expect(locator, `Expected: Element ${locator} to be hidden`).toBeHidden({ timeout });
  }
  protected async verifyEnabled(locator: Locator, timeout: number = this.defaultTimeout): Promise<void> {
    await expect(locator, `Expected: Element ${locator} to be enabled`).toBeEnabled({ timeout });
  }
  protected async verifyDisabled(locator: Locator, timeout: number = this.defaultTimeout): Promise<void> {
    await expect(locator, `Expected: Element ${locator} to be disabled`).toBeDisabled({ timeout });
  }
  protected async verifyEditable(locator: Locator, timeout: number = this.defaultTimeout): Promise<void> {
    await expect(locator, `Expected: Element ${locator} to be editable`).toBeEditable({ timeout });
  }
  protected async verifyNotEditable(locator: Locator, timeout: number = this.defaultTimeout): Promise<void> {
    await expect(locator, `Expected: Element ${locator} to be not editable`).not.toBeEditable({ timeout });
  }

  // 2. waits - PageLoad, PageURL, PageTimeout, OpenURL
  protected async waitForPageLoad(timeout: number = this.navigationTimeout): Promise<void> {          // wait for each stages in web page loading
    await this.page.waitForLoadState('load', { timeout });
  }
  protected async waitForPageURL(url: string, timeout: number = this.navigationTimeout): Promise<void> {
    await this.page.waitForURL(url, { waitUntil: 'load', timeout });
  }
  protected async waitForPageTimeout(timeout: number = this.defaultTimeout): Promise<void> {
    await this.page.waitForTimeout(timeout);    // static wait - pauses the execution for the specified timeout
  }
  protected async openURL(url: string, timeout: number = this.navigationTimeout): Promise<Response|null> {
    const response = await this.page.goto(url, { waitUntil: 'load', timeout });
    return response
  }
  /*--------------------------------------------------------------------------------------------------------*/

  // 2. centralized WE, page info getter methods - url,title,text
  protected async getURL(url: string, timeout: number = this.navigationTimeout): Promise<string> {
    await this.waitForPageURL(url, timeout);
    return this.page.url();
  }
  protected async getTitle(): Promise<string> {
    return this.page.title();
  }
  protected async verifyPageURL(expectedUrl: string | RegExp, timeout: number = this.navigationTimeout): Promise<void> {
    await expect(this.page, `Expected page URL to be '${expectedUrl}', and received '${this.page.url()}'`).toHaveURL(expectedUrl, { timeout });
  }
  protected async verifyPageTitle(expectedTitle: string | RegExp, timeout: number = this.navigationTimeout): Promise<void> {
    await expect(this.page, `Expected page title to be '${expectedTitle}'`).toHaveTitle(expectedTitle, { timeout });
  }
  protected async getText(locator: Locator, timeout: number = this.defaultTimeout): Promise<string> {
    await locator.waitFor({ state: 'visible', timeout });
    return (await locator.innerText()).trim();
  }

  // 3. centralized WE, page actions in browser - goBack, goForward, reload
  protected async webPageAction(action: 'goBack'|'goForward'|'reload', url: string, timeout: number = this.navigationTimeout): Promise<void> {
    switch (action) {
      case 'goBack':
        await this.page.goBack({ waitUntil: 'load', timeout });
        await this.page.waitForURL(url, { waitUntil: 'load', timeout });
        break;
      case 'goForward':
        await this.page.goForward({ waitUntil: 'load', timeout });
        await this.page.waitForURL(url, { waitUntil: 'load', timeout });
        break;
      case 'reload':
        await this.page.reload({ waitUntil: 'load', timeout });
        await this.page.waitForURL(url, { waitUntil: 'load', timeout });
        break;
    }
  }
  
  // 4. centralized WE, screenshot methods - return the captured buffer so callers can assert against a baseline (toMatchSnapshot)
  protected async takeScreenshot(app: string, page: string, fileName: string): Promise<Buffer> {
    const path = `reports/${app}/${page}/${fileName}`;
    const shot = await this.page.screenshot({ path, fullPage: true });
    await test.info().attach(fileName, { body: shot, contentType: 'image/png' });
    return shot;
  }
  protected async takeElementScreenshot(locator: Locator, app: string, page: string, fileName: string, timeout: number = this.defaultTimeout): Promise<Buffer> {
    await locator.waitFor({ state: 'visible', timeout });
    const path = `reports/${app}/${page}/${fileName}`;
    const shot = await locator.screenshot({ path });
    await test.info().attach(fileName, { body: shot, contentType: 'image/png' });
    return shot;
  }

  // 5. centralized WE, get and validate attribute methods
  protected async getAttribute(locator: Locator, attributeName: string, timeout: number = this.defaultTimeout): Promise<string|null> {
    await locator.waitFor({ state: 'visible', timeout });
    return locator.getAttribute(attributeName);
  }
  protected async verifyAttribute(locator: Locator, attributeName: string, expectedValue: string, timeout: number = this.defaultTimeout): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    const actual = await locator.getAttribute(attributeName);
    expect(actual, `Expected attribute '${attributeName}' to be '${expectedValue}', and received '${actual}'`).toBe(expectedValue);
  }

  // 7. Other Important methods
  protected async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }
  protected async isEnabled(locator: Locator): Promise<boolean> {
    return locator.isEnabled();
  }

}