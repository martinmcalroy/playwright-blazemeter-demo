import { test, expect } from '@playwright/test';
import { UserBuilder } from '../helpers/testUser';
import { addToCart } from '../helpers/addToCart';

test.describe('Place an order', () => {
    
    test('User successfully places an order', async ({ page }) => {
        const user = new UserBuilder("hSimpson1", "Passw0rd123")
            .setName("Homer Simpson")
            .setCountry("USA")
            .setCity("Springfield")
            .setCreditCard("1234 5678 1234 5687")
            .setMonth("August")
            .setYear("2031")
            .build();
        
        await page.goto('https://www.demoblaze.com/');

        await addToCart(page);

        await page.getByRole('link', { name: 'Cart', exact: true }).click();

        await page.getByRole('button', { name: 'Place Order' }).click();

        await expect(page.getByRole('dialog', { name: 'Place order' })).toBeVisible();

        await page.getByRole('textbox', { name: 'Name:' }).fill(user.name);
        await page.getByRole('textbox', { name: 'Country:' }).fill(user.country);
        await page.getByRole('textbox', { name: 'City:' }).fill(user.city);
        await page.getByRole('textbox', { name: 'Credit card:' }).fill(user.creditCard);
        await page.getByRole('textbox', { name: 'Month:' }).fill(user.month);
        await page.getByRole('textbox', { name: 'Year:' }).fill(user.year);

        await page.getByRole('button', { name: 'Purchase' }).click();

        await expect(page.getByRole('heading', { name: 'Thank you for your purchase!' })).toBeVisible();

        const confirmation = page.locator('.sweet-alert');
        await expect(confirmation).toContainText('Id:');
        await expect(confirmation).toContainText('Amount:');
        await expect(confirmation).toContainText(`Name: ${user.name}`);
        await expect(confirmation).toContainText(`Card Number: ${user.creditCard}`);
        await expect(confirmation).toContainText('Date:');     
    });
});