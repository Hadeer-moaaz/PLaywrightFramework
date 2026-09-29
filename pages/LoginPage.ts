import type { Page } from '@playwright/test';

export class LoginPage {
  constructor(readonly page: Page) {}

  // locators
  get usernameInput() {
    return this.page.getByPlaceholder('Username');
  }

  get passwordInput() {
    return this.page.getByPlaceholder('Password');
  }

  get loginButton() {
    return this.page.getByRole('button', { name: 'Login' });
  }

  get loginLogo() {
    return this.page.getByRole('heading', { name: 'Login' });
  }

  get requiredFieldMessages() {
    return this.page.locator('.oxd-input-field-error-message').first();
  }

  // get requiredFieldMessages() {
  //   return this.page.getByText('Required');
  // }

  get dashboardLogo() {
    return this.page.getByRole('heading', { name: 'Dashboard' });
  }

  get errorMessage(){
    return this.page.getByText('Invalid credentials');
  }
  
  // funtions
  async navigateTo(baseUrl: string) {
    await this.page.goto(baseUrl);
  }

  async submitCredentials(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}