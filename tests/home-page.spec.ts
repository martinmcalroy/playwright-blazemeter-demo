import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
    
    test('Homepage renders and displays products information', async ({ page }) => {
        await page.goto('https://www.demoblaze.com/');

        await expect(page.locator('#tbodyid')).toBeVisible();

        const productNames = await page.locator('[class="card-block"] h4').allInnerTexts();
        const productPrices = await page.locator('[class="card-block"] h5').allInnerTexts();

        expect(productNames.length).toEqual(productPrices.length);
        for (let name of productNames) {
            expect(name).not.toEqual('');
        }
        for (let price of productPrices) {
            expect(price).not.toEqual('');
        }
    });

});
