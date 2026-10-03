import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class LeavePage {

constructor(readonly page: Page) {}

get leaveTab(){
    return this.page.getByRole('link', { name: 'Leave' });
}

get leaveListTab(){
    return this.page.getByRole('link', { name: 'Leave List' });

}

get configureTab(){
    return this.page.getByText('Configure', { exact: true });
}

get leaveTypesTab(){
    return this.page.getByText('Leave Types', { exact: true });

}

get addButton(){
    return this.page.getByRole('button', { name: 'Add' });

}

get nameInput(){
    return this.page.locator('input.oxd-input.oxd-input--active').last();
}

get SelectYesRadioButton(){
    return this.page.locator('.oxd-radio-input').first();

}

get saveButton(){
    return this.page.getByRole('button', { name: 'Save' });}

get successfullySavedMessage(){
    return this.page.getByText('Successfully Saved').first();
}

get alreadyExistsMessage (){

    return this.page.getByText('Already exists').first();
}

async AddLeaveTypeSteps(leaveName: string) {
    
    await this.nameInput.fill(leaveName);
    await this.SelectYesRadioButton.click();
    await this.saveButton.click();

}
}
