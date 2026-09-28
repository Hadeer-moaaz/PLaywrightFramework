import {
  After,
  AfterAll,
  Before,
  BeforeAll,
  Status,
  setDefaultTimeout,
  type ITestCaseHookParameter,
} from '@cucumber/cucumber';
import { chromium, type Browser } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import type { CustomWorld } from './world';

let browser: Browser;

setDefaultTimeout(30_000);

BeforeAll(async function () {
  browser = await chromium.launch();
});

AfterAll(async function () {
  await browser?.close();
});

Before(async function (this: CustomWorld) {
  this.browser = browser;
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
  this.loginPage = new LoginPage(this.page);
});

After(async function (this: CustomWorld, { result }: ITestCaseHookParameter) {
  try {
    if (result?.status === Status.FAILED && this.page) {
      await this.attach(await this.page.screenshot({ fullPage: true }), 'image/png');
    }
  } finally {
    await this.context?.close();
  }
});