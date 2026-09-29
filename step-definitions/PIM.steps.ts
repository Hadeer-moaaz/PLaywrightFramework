import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import loginData from '../test-data/login.json';
import type { CustomWorld } from '../support/world';
import { write } from 'fs';

Then('Check that the PIM url is displayed', async function (this: CustomWorld) {
  await expect(this.PIMPage.page).toHaveURL(`${loginData.baseUrl}/pim/viewEmployeeList`);
});

Then('Click on Employee List Tab', async function (this: CustomWorld) {
  await this.PIMPage.EmployeeListTab.click();
});

Then('Search with an existing employee name {string} in the Employee List', 
    async function (this: CustomWorld, employeeName: string) {
  await this.PIMPage.searchEmployee(employeeName);
});


Then('Check that the search results matchs the entered employee value {string}'
    , async function (this: CustomWorld, employeeName: string) {
  await this.PIMPage.verifyEmployeeInSearchResults(employeeName);
});

Then('Search with non-existing employee name {string} in the Employee List', async function (this: CustomWorld, employeeName: string) {
  await this.PIMPage.searchEmployee(employeeName);
});

Then('No records found message is displayed in the search results', async function (this: CustomWorld) {
    await this.PIMPage.verifyNoRecordsFoundIsDisplayed();
});

Then('Click on Add Employee button and assert the Add Employee tab is selected', async function (this: CustomWorld) {
    await this.PIMPage.clickAddEmployeeButton();
    await expect(this.PIMPage.addEmployeeTab).toBeVisible();
});

When('Fill the employee details {string} and {string} and {string} and click on Save button'
    , async function (this: CustomWorld, firstName: string, lastName: string, employeeId: string) {
    await this.PIMPage.createEmployeeSteps(firstName, lastName, employeeId);
});