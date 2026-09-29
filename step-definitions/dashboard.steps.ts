import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import loginData from '../test-data/login.json';
import type { CustomWorld } from '../support/world';


When('User navigates to PIM Page', async function (this: CustomWorld) {
  await this.dashboardPage.PIMTab.click();
});


