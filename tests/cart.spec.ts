import { test, expect } from '@playwright/test';
import { addToCart } from '../helpers/addToCart';

test.describe('Cart', () => {

    test('User can add product to cart', async ({ page }) => {
        await page.goto('https://www.demoblaze.com/');

        await expect(page.locator('#tbodyid')).toBeVisible();
    
        const productName = await addToCart(page);
        const productNameString = productName.toString();
    
        await page.getByRole('link', { name: 'Add to cart', exact: true }).click();
        await page.getByRole('link', { name: 'Cart', exact: true }).click();
       
        await expect(page.url()).toContain('/cart');
        await expect(page.locator('#tbodyid')).toContainText(productNameString);
    });

});