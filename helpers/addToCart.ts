import { Page, expect } from '@playwright/test';

    export async function addToCart(page: Page): Promise<string> {
    // Wait for the first product card to render
    const firstCard = page.locator('.card-block').first();
    await expect(firstCard).toBeVisible();

    // Get product name
    const productName = await firstCard.locator('h4').innerText();

    // Click the product link inside the card
    await page.getByRole('link', { name: productName }).click();

    // Wait for product page header and Add to cart button
    const productHeader = page.locator('h2', { hasText: productName });
    await expect(productHeader).toHaveText(productName, { timeout: 7000 })

    const addToCartButton = page.getByRole('link', { name: 'Add to cart' });
    await expect(addToCartButton).toBeVisible();

    // Click Add to cart and handle dialog reliably
    page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => {});
    });

    await page.getByRole('link', { name: 'Add to cart', exact: true }).click({force: true});

    return productName;
}
