import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import loginData from '../test-data/login.json';
import type { CustomWorld } from '../support/world';

Given('I am on the OrangeHRM login page', async function (this: CustomWorld) {
  await this.loginPage.open(loginData.baseUrl);
});

When('I sign in with the valid demo account', async function (this: CustomWorld) {
  await this.loginPage.submitCredentials(loginData.username, loginData.password);
});

When(
  'I submit the login form with username {string} and password {string}',
  async function (this: CustomWorld, username: string, password: string) {
    await this.loginPage.submitCredentials(username, password);
  },
);

Then('I should see the dashboard', async function (this: CustomWorld) {
  await expect(this.loginPage.dashboardHeading).toBeVisible();
});

Then('I should remain on the login page', async function (this: CustomWorld) {
  await expect(this.loginPage.page).toHaveURL(/\/web\/index\.php\/auth\/login$/);
  await expect(this.loginPage.loginHeading).toBeVisible();
});

Then(
  'I should see {int} required-field messages',
  async function (this: CustomWorld, requiredCount: number) {
    await expect(this.loginPage.requiredFieldMessages).toHaveCount(requiredCount);
  },
);