import { World, setWorldConstructor, type IWorldOptions } from '@cucumber/cucumber';
import type { Browser, BrowserContext, Page } from '@playwright/test';
import type { LoginPage } from '../pages/LoginPage';
import type { dashboardPage } from '../pages/dashboardPage';
import type { PIMPage } from '../pages/PIMPage';
import type { LeavePage } from '../pages/LeavePage';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  loginPage!: LoginPage;
  dashboardPage!: dashboardPage;
  PIMPage!: PIMPage;
  LeavePage!: LeavePage;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);