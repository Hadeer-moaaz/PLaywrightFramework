import type { Page } from '@playwright/test';

export class LoginPage {
  constructor(readonly page: Page) {}

  get usernameInput() {
    return this.page.locator('input[name="username"]');
  }

  get passwordInput() {
    return this.page.locator('input[name="password"]');
  }

  get loginButton() {
    return this.page.getByRole('button', { name: 'Login' });
  }

  get loginHeading() {
    return this.page.getByRole('heading', { name: 'Login' });
  }

  get dashboardHeading() {
    return this.page.getByRole('heading', { name: 'Dashboard' });
  }

  get requiredFieldMessages() {
    return this.page.locator('.oxd-input-field-error-message');
  }

  async open(baseUrl: string) {
    await this.page.goto(baseUrl);
  }

  async submitCredentials(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}