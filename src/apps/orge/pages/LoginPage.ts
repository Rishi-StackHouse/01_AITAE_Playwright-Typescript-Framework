import { Page, Locator, Response } from '@playwright/test';
import { OrgeBase } from '../OrgeBase';
import { orgeCreds } from '../../../config/Config';

export class LoginPage extends OrgeBase {
  private readonly OrgeHRMLogo: Locator;
  private readonly OrgeIcon: Locator;
  private readonly LoginHeading: Locator;
  private readonly UsernameLabel: Locator;
  private readonly UsernameIcon: Locator;
  private readonly UsernameTextField: Locator;
  private readonly PasswordLabel: Locator;
  private readonly PasswordIcon: Locator;
  private readonly PasswordTextField: Locator;
  private readonly LoginButton: Locator;
  private readonly ForgotYourPassLink: Locator;
  private readonly FooterCopyright: Locator;

  private readonly AlertPopOver: Locator;
  private readonly AlertBanner: Locator;

  constructor(page: Page) {
    super(page);

    this.OrgeHRMLogo = page.locator('img[alt="company-branding"]');
    this.OrgeIcon = page.locator("img[alt='orangehrm-logo']").nth(1);
    this.LoginHeading = page.getByRole('heading', { name: 'Login', exact: true });
    this.UsernameLabel = page.locator('input[name="username"]');
    this.UsernameIcon = page.locator('i[class="oxd-icon bi-person oxd-input-group__label-icon"]');
    this.UsernameTextField = page.getByRole('textbox', { name: 'username' });
    this.PasswordLabel = page.locator('input[name="password"]');
    this.PasswordIcon = page.locator('i.oxd-icon.bi-key.oxd-input-group__label-icon');
    this.PasswordTextField = page.getByRole('textbox', { name: 'password' });
    this.LoginButton = page.getByRole('button', { name: 'Login' });
    this.ForgotYourPassLink = page.getByText('Forgot your password');
    this.FooterCopyright = page.locator('div.orangehrm-login-footer');

    this.AlertPopOver = page.locator('div.alert-popover');
    this.AlertBanner = page.locator('div.alert-banner');
  }

  // 1. Navigation - returns the navigation response so the spec can assert the HTTP status (200 / no 403)
  public async launchOrge(): Promise<Response | null> {
    const response = await this.openURL(orgeCreds.web.url);
    return response;
  }

  // 2. Login workflows
  public async loginOrge(): Promise<void> {
    await this.fillText(this.UsernameTextField, orgeCreds.web.username as string);
    await this.fillText(this.PasswordTextField, orgeCreds.web.password as string);
    await this.click(this.LoginButton);
  }

  public async goToForgotPasswordPage(): Promise<void> {
    await this.click(this.ForgotYourPassLink);
  }

  // 3. Page state verifications
  public async verifyLoginPageElementsVisibility(): Promise<void> {
    await this.verifyVisible(this.OrgeHRMLogo);
    await this.verifyVisible(this.OrgeIcon);
    await this.verifyVisible(this.LoginHeading);
    await this.verifyVisible(this.UsernameLabel);
    await this.verifyVisible(this.UsernameIcon);
    await this.verifyVisible(this.UsernameTextField);
    await this.verifyVisible(this.PasswordLabel);
    await this.verifyVisible(this.PasswordIcon);
    await this.verifyVisible(this.PasswordTextField);
    await this.verifyEnabled(this.LoginButton);
    await this.verifyVisible(this.ForgotYourPassLink);
    await this.verifyVisible(this.FooterCopyright);
  }

  // 4. Visual evidence - full page screenshot, attached to the HTML report and returned for baseline comparison
  public async captureLoginPage(fileName: string = 'login-page.png'): Promise<Buffer> {
    return this.takeScreenshot('orge', 'login', fileName);
  }

}
