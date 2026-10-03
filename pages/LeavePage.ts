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

get assignLeaveTab(){
    return this.page.getByText('Assign Leave', { exact: true });
}

get employeeNameInput(){
    return this.page.getByPlaceholder('Type for hints...').first();
}


get selectLeaveDropdown(){
    return this.page.locator('.oxd-select-wrapper').first();

}

get selectLeaveOption(){
    return this.page.getByRole('option', { name: 'CAN - Personal' });
}

get fromDateLocator(){
    return this.page.locator('.oxd-input-group').filter({ hasText: /^From Date/ }).locator('input');
}

get toDateLocator(){
    return this.page.locator('.oxd-input-group').filter({ hasText: /^To Date/ }).locator('input');
}

get commentsInput(){
    return this.page.locator('oxd-textarea oxd-textarea--active oxd-textarea--resize-vertical');
}

get assignButton(){
    return this.page.getByRole('button', { name: 'Assign' });
}


async AddLeaveTypeSteps(leaveName: string) {
    
    await this.nameInput.fill(leaveName);
    await this.SelectYesRadioButton.click();
    await this.saveButton.click();

}

async AssignLeaveSteps(employeeName: string, fromDate: string, toDate: string, comments: string) {
    await this.employeeNameInput.fill(employeeName);
    const searchingIndicator = this.page.getByText('Searching...');
    const firstSuggestion = this.page.locator('.oxd-autocomplete-dropdown')
        .getByText(employeeName, { exact: false })
        .first();
    await searchingIndicator.waitFor({ state: 'hidden', timeout: 20000 }).catch(() => {});
    await expect(firstSuggestion).toBeVisible({ timeout: 10000 });
    await firstSuggestion.click();

    await this.selectLeaveDropdown.click();
    await this.selectLeaveOption.waitFor({ state: 'visible' });
    await this.selectLeaveOption.click();

    

    await this.fromDateLocator.fill(fromDate);
    // await this.toDateLocator.fill(toDate);
    // await this.commentsInput.fill(comments);
    await this.assignButton.click();

}
   

}
