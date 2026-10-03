import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import loginData from '../test-data/login.json';
import type { CustomWorld } from '../support/world';


When('User navigates to Leave Page',async function (this: CustomWorld) {
    await this.LeavePage.leaveTab.click();
    await this.LeavePage.configureTab.waitFor({ state: 'visible' });
});


Then('Click on Configure Tab',async function (this: CustomWorld) {
    await this.LeavePage.configureTab.click();  
});


Then('click on Leave types Tab',async function (this: CustomWorld) {

    await this.LeavePage.leaveTypesTab.click();
    await expect(this.LeavePage.page).toHaveURL(`${loginData.baseUrl}/leave/leaveTypeList`);
});


Then('Click on Add button and assert the Add Leave Type tab is displayed'
    ,async function (this: CustomWorld) {

    await this.LeavePage.addButton.click();
    await expect(this.LeavePage.page).toHaveURL(`${loginData.baseUrl}/leave/defineLeaveType`);

});



When('Fill the Leave Type details with {string} and save button'
    ,async function (this: CustomWorld, leaveName: string) { 

        await this.LeavePage.AddLeaveTypeSteps(leaveName);
    
});


Then('Assert successfully saved message is displayed',async function (this: CustomWorld) {
    await expect(this.LeavePage.successfullySavedMessage).toBeVisible();

});  


Then ('Assert that "Already exists" message is displayed',async function (this: CustomWorld) {
    
    await expect(this.LeavePage.alreadyExistsMessage).toBeVisible();
});



Then ('Click on Assign Leave Tab',async function (this: CustomWorld) {
    
    await this.LeavePage.assignLeaveTab.click();

});


Then ('Fill the Assign Leave details with {string} and {string} and {string} and {string} and click on Assign button'
    ,async function (this: CustomWorld, employeeName: string, comments: string, fromDate: string, toDate: string) {
    

        await this.LeavePage.AssignLeaveSteps(employeeName, fromDate, toDate, comments);
    

});




