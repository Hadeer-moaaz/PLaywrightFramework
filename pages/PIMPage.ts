import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class PIMPage {

constructor(readonly page: Page) {}

// locators
get EmployeeListTab(){

    return this.page.getByRole('link', { name: 'Employee List' });

}
get employeeNameInput(){

    return this.page.getByPlaceholder('Type for hints...').first();
}

get searchButton(){

    return this.page.getByRole('button', { name: 'Search' });
}

get noRecordsMessage() {
  return this.page.getByText('No Records Found').first();
}

get addEmployeeButton() {
    return this.page.getByRole('button', { name: 'Add' });
}


get addEmployeeTab() {
    return this.page.getByRole('link', { name: 'Add Employee' });
}

get firstNameInput() {
    return this.page.getByPlaceholder('First Name');
}

get lastNameInput() {
    return this.page.getByPlaceholder('Last Name');
}

get employeeIdInput() {
    return this.page.locator('.oxd-input').nth(4);
}

get saveButton() {
    return this.page.getByRole('button', { name: 'Save' });
}


// functions
async searchEmployee(employeeName: string) {
    await this.EmployeeListTab.click();
    await this.employeeNameInput.fill(employeeName);
     // Wait for the autocomplete dropdown to appear
    const suggestion = this.page.locator('.oxd-autocomplete-dropdown').getByText(employeeName, { exact: false });
    await suggestion.waitFor({ state: 'visible', timeout: 5000 });
    await suggestion.click();
    await this.searchButton.click();
}


async verifyEmployeeInSearchResults(employeeName: string) {
  const resultRow = this.page.locator('.oxd-table-card').filter({ hasText: employeeName });
  await resultRow.waitFor({ state: 'visible', timeout: 10000 });
  await expect(resultRow).toBeVisible();
}



async verifyNoRecordsFoundIsDisplayed() {
  await expect(this.noRecordsMessage).toBeVisible({ timeout: 5000 });
}

async clickAddEmployeeButton() {
    await this.addEmployeeButton.click();
    await this.addEmployeeTab.waitFor({ state: 'visible', timeout: 10000 });
}

async createEmployeeSteps(firstName: string, lastName: string, employeeId: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.employeeIdInput.clear(); 
    await this.employeeIdInput.fill(employeeId);    
    await this.saveButton.click();
}








}

