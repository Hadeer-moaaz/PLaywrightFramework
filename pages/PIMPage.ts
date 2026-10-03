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
get orangehrmBackgroundContainer(){

    return this.page.locator('.orangehrm-background-container');
}
get resetButton() {
    return this.page.getByRole('button', { name: 'Reset' });
}

get recordsCount(){
    return this.page.locator('span.oxd-text--span', { hasText: 'Records Found' });
}

get deleteCheckbox() {
    return this.page.locator('.oxd-checkbox-input .oxd-icon').first();
}

get deleteSelectedButton() {
    return this.page.getByRole('button', { name: 'Delete Selected' });
}

get confirmDeleteButton() {
    return this.page.getByRole('button', { name: 'Yes, Delete' });
}   

// functions
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
    // wait for navigation to the employee's profile page to complete
    await this.page.waitForURL(/\/pim\/viewPersonalDetails\/empNumber\//, { timeout: 15000 });
}

async searchEmployeeIsExisting(employeeName: string) {
  await this.employeeNameInput.fill(employeeName);
  const searchingIndicator = this.page.getByText('Searching...');
  const suggestion = this.page.locator('.oxd-autocomplete-dropdown')
                            .getByText(employeeName, { exact: false })
                            .first();
  // Wait for the "Searching..." placeholder to go away (API call finished)
  await searchingIndicator.waitFor({ state: 'hidden', timeout: 20000 }).catch(() => {});
  await suggestion.waitFor({ state: 'visible', timeout: 10000 });
  await suggestion.click();
  await this.searchButton.click();
}

async searchEmployeeNonExisting(employeeName: string) {
  await this.employeeNameInput.fill(employeeName);
  await this.searchButton.click();
}

async verifyEmployeeInSearchResults(firstname: string) {
  await expect(this.page.getByText(firstname, { exact: false }).first()).toBeVisible({ timeout: 10000 });
}


async clickResetButton() {
    await this.resetButton.click();
    await expect(this.orangehrmBackgroundContainer).toBeVisible({ timeout: 10000 });

}}

