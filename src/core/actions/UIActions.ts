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

  // centralized WE, textfield actions
  // 1. enter text - fill, type
  protected async fillText(locator: Locator, input: string, timeout: number = this.defaultTimeout): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.fill(input);
  }
  protected async typeText(locator: Locator, input: string, timeout: number = this.defaultTimeout): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.pressSequentially(input, { delay: 500 });
  }
  // 2. clear text - normal, using keys, clearing char by char
  protected async clearText(locator: Locator, timeout: number = this.defaultTimeout): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.clear();
  }
  protected async clearByKeys(locator: Locator, timeout: number = this.defaultTimeout): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.press('Control+A');
    await locator.press('Backspace');
  }
  protected async clearOneByOne(locator: Locator, characters: number, timeout: number = this.defaultTimeout): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.press('End');
    for (let i = 0; i < characters; i++) {
      await locator.press('Backspace');
    }
  }
  // 2. scenario combo - clear and fill, clear and type

  // set-1
  protected async clear_fillText(locator: Locator, input: string, timeout: number = this.defaultTimeout): Promise<void> {
    await this.clearText(locator, timeout);
    await locator.fill(input);
  }
  protected async clear_typeText(locator: Locator, input: string, timeout: number = this.defaultTimeout): Promise<void> {
    await this.clearText(locator, timeout);
    await locator.pressSequentially(input, { delay: 500 });
  }

  // set-2
  protected async fillText_clear(locator: Locator, input: string, timeout: number = this.defaultTimeout): Promise<void> {
    await this.fillText(locator, input, timeout);
    await locator.clear();
  }
  protected async typeText_clear(locator: Locator, input: string, timeout: number = this.defaultTimeout): Promise<void> {
    await this.typeText(locator, input, timeout);
    await locator.clear();
  }
  protected async typeText_clearOneByOne(locator: Locator, input: string, characters: number, timeout: number = this.defaultTimeout): Promise<void> {
    await this.typeText(locator, input, timeout);
    //await this.clearOneByOne(locator, character, timeout);
    await locator.press('End');
    for (let i = 0; i < characters; i++) {
      await locator.press('Backspace');
    }
  }
  
  // set-3
  protected async clear_typeText_clearOneByOne(locator: Locator, input: string, characters: number, timeout: number = this.defaultTimeout): Promise<void> {
    await this.clearText(locator, timeout);
    await locator.pressSequentially(input, { delay: 500 });
    await locator.press('End');
    for (let i = 0; i < characters; i++) {
      await locator.press('Backspace');
    }
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
    expect.soft(value.length, `Expected value length <= ${maxLength}, and received '${value.length}'`).toBeLessThanOrEqual(maxLength);
  }
  protected async verifyInputValue(locator: Locator, input: string, timeout: number = this.defaultTimeout): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    const value = await locator.inputValue();
    expect.soft(value, `Expected input value to be '${input}', and received '${value}'`).toBe(input);
  }

}
