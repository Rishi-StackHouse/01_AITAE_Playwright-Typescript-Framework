import { Page, Locator, expect } from '@playwright/test';   // Page, Locator - Interfaces
import { BasePage } from '../BasePage';

export class UIActions extends BasePage {
  constructor(page: Page, defaultTimeout?: number, navigationTimeout?: number) {
    super(page, defaultTimeout, navigationTimeout);
  }

  // 1. centralized WE, click method
  protected async click(locator: Locator, timeout: number = this.defaultTimeout): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });      // dynamic or smart waits - waits upto the timeout but stops if the element is visible/hidden
    await locator.click();
  }
  /******************************************************************************/

  // 1. centralized WE, textfield actions
  // 1-base actions - fill, type, clear
  protected async fillText(locator: Locator, input: string, timeout: number = this.defaultTimeout): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.fill(input);
  }
  protected async typeText(locator: Locator, input: string, timeout: number = this.defaultTimeout): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.pressSequentially(input, { delay: 250 });
  }
  protected async clearText(locator: Locator, mode: 'clear'|'keys'|'backspace' = 'clear', count: number = 1, timeout: number = this.defaultTimeout): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    switch (mode) {
      case 'clear':
        await locator.clear();
        break;
      case 'keys':
        await locator.press('Control+A');
        await locator.press('Backspace');
        break;
      case 'backspace':
        for (let i = 0; i < count; i++) {
          await locator.press('Backspace');
        }
        break;
    }
  }

  // 2-scenario combination methods
  protected async clear_fillText(locator: Locator, input: string, mode: 'clear'|'keys'|'backspace' = 'clear', count: number = 1, timeout: number = this.defaultTimeout): Promise<void> {
    await this.clearText(locator, mode, count, timeout);
    await this.fillText(locator, input, timeout);
  }
  protected async fillText_clear(locator: Locator, input: string, mode: 'clear'|'keys'|'backspace' = 'clear', count: number = 1, timeout: number = this.defaultTimeout): Promise<void> {
    await this.fillText(locator, input, timeout);
    await this.clearText(locator, mode, count, timeout);
  }
  protected async clear_typeText(locator: Locator, input: string, mode: 'clear'|'keys'|'backspace' = 'clear', count: number = 1, timeout: number = this.defaultTimeout): Promise<void> {
    await this.clearText(locator, mode, count, timeout);
    await this.typeText(locator, input, timeout);
  }
  protected async typeText_clear(locator: Locator, input: string, mode: 'clear'|'keys'|'backspace' = 'clear', count: number = 1, timeout: number = this.defaultTimeout): Promise<void> {
    await this.typeText(locator, input, timeout);
    await this.clearText(locator, mode, count, timeout);
  }

  // 3. Verify the textfield's maximum and minimum allowed length
    protected async verifyMinLength(locator: Locator, input: string, minLength: number, timeout: number = this.defaultTimeout): Promise<void> {
    await this.fillText(locator, input, timeout);
    const value = await locator.inputValue();
    expect(value.length, `Expected value length >= ${minLength}, and received '${value.length}'`).toBeGreaterThanOrEqual(minLength);
  }
  protected async verifyMaxLength(locator: Locator, input: string, maxLength: number, timeout: number = this.defaultTimeout): Promise<void> {
    await this.fillText(locator, input, timeout);
    const value = await locator.inputValue();
    expect(value.length, `Expected value length <= ${maxLength}, and received '${value.length}'`).toBeLessThanOrEqual(maxLength);
  }

}
