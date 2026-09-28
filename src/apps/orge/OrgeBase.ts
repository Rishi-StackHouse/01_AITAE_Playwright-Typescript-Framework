import { Page, Locator } from '@playwright/test';
import { UIActions } from '../../core/actions/UIActions';
import { APP_TIMEOUTS } from '../../core/constants/Timeouts';

export abstract class OrgeBase extends UIActions {
  protected readonly timeouts = APP_TIMEOUTS.orge;

  constructor(page: Page) {
    // Inject Orge's engine timeouts into BasePage via UIActions' pass-through.
    super(page, APP_TIMEOUTS.orge.ELEMENT, APP_TIMEOUTS.orge.NAVIGATION);
  }
  
}
