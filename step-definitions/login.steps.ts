import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import loginData from '../test-data/login.json';
import type { CustomWorld } from '../support/world';

Given('User navigates to OrangeHRM login page', async function (this: CustomWorld) {
  await this.loginPage.navigateTo(`${loginData.baseUrl}/auth/login`);
});

When('User login with a valid credentials', async function (this: CustomWorld) {
  await this.loginPage.submitCredentials(loginData.username, loginData.password);
});

When('User submit the login with username {string} and password {string}',
  async function (this: CustomWorld, username: string, password: string) {
    await this.loginPage.submitCredentials(username, password);
  },
);

Then('The dashboard is displayed', async function (this: CustomWorld) {
  await expect(this.loginPage.page).toHaveURL(`${loginData.baseUrl}/dashboard/index`);
  await expect(this.loginPage.dashboardLogo).toBeVisible();
});

Then('User should remain on the login page', async function (this: CustomWorld) {
  await expect(this.loginPage.page).toHaveURL(`${loginData.baseUrl}/auth/login`);
  await expect(this.loginPage.loginLogo).toBeVisible();
});

Then('User should see required-field message is displayed',
  async function (this: CustomWorld) {
    await expect(this.loginPage.requiredFieldMessages).toHaveText('Required', { timeout: 5000 });
  },
);

Then('Invalid credentials error message is displayed',async function (this: CustomWorld) {
    await expect(this.loginPage.errorMessage).toContainText('Invalid credentials', { timeout: 5000 });
  },
);