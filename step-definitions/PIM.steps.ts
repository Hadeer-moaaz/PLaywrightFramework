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

Then('Click on Add Employee button and assert the Add Employee tab is selected', async function (this: CustomWorld) {
    await this.PIMPage.clickAddEmployeeButton();
    await expect(this.PIMPage.addEmployeeTab).toBeVisible();
});

When('Fill the employee details {string} and {string} and {string} and click on Save button'
    , async function (this: CustomWorld, firstName: string, lastName: string, employeeId: string) {
    await this.PIMPage.createEmployeeSteps(firstName, lastName, employeeId);
});

Then('Search with an existing employee name {string} in the Employee List', 
    async function (this: CustomWorld, employeeName: string) {
  await this.PIMPage.searchEmployeeIsExisting(employeeName);
});

Then('Check that the search results matchs the entered employee value {string}'
    , async function (this: CustomWorld, firstname: string) {
  await this.PIMPage.verifyEmployeeInSearchResults(firstname);
});


When('Click on Reset button', async function (this: CustomWorld) {
  await this.PIMPage.clickResetButton();
});


Then('Verify that the employee name search field is cleared', async function (this: CustomWorld) {
  await expect(this.PIMPage.employeeNameInput).toHaveValue('');
});


Then('Print all the Records count in the Employee List page after Reset button is clicked'
  , async function (this: CustomWorld) {

    const text = await this.PIMPage.recordsCount.innerText();
    console.log(`Records count after reset1: ${text.match(/\d+/)?.[0]}`);
});





Then('User deletes all records in the Employee List page', async function (this: CustomWorld) {
  
    // 1. click Delete check box for all records
  await this.PIMPage.deleteCheckbox.click();

     // 2. click Delete Selected
  await this.PIMPage.deleteSelectedButton.click();

  // 3. wait for the popup's "Yes, Delete" button to appear
  await this.PIMPage.confirmDeleteButton.waitFor({ state: 'visible' });

  // 4. click Yes, Delete
  await this.PIMPage.confirmDeleteButton.click();

  // 5. wait for the popup to close
  await this.PIMPage.confirmDeleteButton.waitFor({ state: 'hidden' });

 
});

Then('Assert that successfully deleted message is displayed in the Employee List page', async function (this: CustomWorld) {

   // 6.Assert that Successfully Deleted message is displayed
  const successMessage = this.PIMPage.page.locator('.oxd-toast-content .oxd-text--toast-message');
  await expect(successMessage).toBeVisible({ timeout: 5000 });

});
    




Then('Search with non-existing employee name {string} in the Employee List'
  , async function (this: CustomWorld, employeeName: string) {
  await this.PIMPage.searchEmployeeNonExisting(employeeName);
});

Then('No records found message is displayed in the search results', async function (this: CustomWorld) {
    await this.PIMPage.verifyNoRecordsFoundIsDisplayed();
});



