import { test, expect } from '@playwright/test';

test ('Print the first 3 headings', async ({page}) => {

    await page.goto('https://duckduckgo.com/');
    const searchbox = page.getByPlaceholder('Search privately').nth(0);
    await searchbox.fill('Facebook');
    await searchbox.press('Enter');

const results = page.locator('article a[data-testid="result-title-a"]');

    for (let i = 0; i < 3; i++){

        console.log(await results.nth(i).textContent());
        console.log(await results.nth(i).getAttribute('href'));
    }

});