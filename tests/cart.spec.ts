import { test, expect } from '@playwright/test';
import { addToCart } from '../helpers/addToCart';

test.describe('Cart', () => {

    test('User can add product to cart', async ({ page, browserName }) => {
        await page.goto('https://www.demoblaze.com/');

        const productsContainer = page.locator('#tbodyid');
        await expect(productsContainer).toBeVisible();
        const productCount = await productsContainer.locator('.card-block').count();
        await expect(productCount).toBeGreaterThan(0);
    
        const productName = await addToCart(page);
        const productNameString = productName.toString();
    
        await page.getByRole('link', { name: 'Cart', exact: true }).click();
       
        const cartRow = page.locator('#tbodyid tr', { hasText: productNameString });
        const timeout = browserName === 'firefox' ? 17000 : 10000;
        await expect(cartRow).toContainText(productName, { timeout: timeout });
    });

});