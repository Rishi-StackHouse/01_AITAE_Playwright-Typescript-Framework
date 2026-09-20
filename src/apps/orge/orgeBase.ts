import { Page, Locator } from '@playwright/test';
import { UIActions } from '../../core/actions/UIActions';
import { APP_TIMEOUTS } from '../../core/constants/timeouts';

export abstract class orgeBase extends UIActions {
  protected readonly timeouts = APP_TIMEOUTS.orge;

  constructor(page: Page) {
    // Inject Orge's engine timeouts into BasePage via UIActions' pass-through.
    super(page, APP_TIMEOUTS.orge.ELEMENT, APP_TIMEOUTS.orge.NAVIGATION);
  }

  protected async fillText(locator: Locator, input: string, timeout: number = this.defaultTimeout): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.fill(input);
  }
  protected waitForVisible = async (locator: Locator, timeout: number = 9999): Promise<void> => {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.waitFor({ state: 'hidden', timeout });
    await this.typeText(locator, '');   // Clear the text field after waiting for it to be visible and hidden
    await this.verifyDisabled(locator, timeout);   // Verify that the text field is disabled after clearing it
  };
}
