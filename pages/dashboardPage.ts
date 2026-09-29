import type { Page } from '@playwright/test';

export class dashboardPage {

constructor(readonly page: Page) {}

  // locators
get PIMTab(){

    return this.page.getByRole('link', { name: 'PIM' });

}
}
