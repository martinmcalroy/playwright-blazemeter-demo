import { Page, expect } from '@playwright/test';


    export async function addToCart(page: Page): Promise<string> {
        const productName = await page.locator('[class="card-block"] h4').first().innerText();
        await page.getByRole('link', { name: productName }).click();
        await expect(page.locator('h2').filter({ hasText: productName })).toBeVisible();
        
        var dialogMessage;
        page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => {});
            dialogMessage = dialog.message();
        });

        await page.getByRole('link', { name: 'Add to cart' }).click();

        return productName;

    }
