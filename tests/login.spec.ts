import { test, expect } from '@playwright/test';
import { UserBuilder } from '../helpers/testUser';
import * as dotenv from 'dotenv';

test.describe('Log in', () => {

    test('Existing user can log in', async ({ page }) => {
        test.slow();
        dotenv.config();

        await page.goto('https://www.demoblaze.com/');

        const username = process.env.LOG_IN_USERNAME;
        const password = process.env.LOG_IN_PASSWORD;

        if(!username || !password) {
            throw new Error("Unexpected error: missing environment value for username or password.");
        }

        const user = new UserBuilder('testSampleUser123', 'Passw0rd123').build();
            
        await page.getByRole('link', { name: 'Log in', exact: true }).isVisible();
        await page.getByRole('link', { name: 'Log in', exact: true }).click();
    
        await expect(page.locator('#logInModal > .modal-dialog > .modal-content > .modal-body')).toBeVisible();
    
         const loginResponsePromise = page.waitForResponse(response => {
            return (
                response.url().includes('/check') &&
                response.request().method() === 'POST' &&
                response.status() === 200
            );
        });

        await page.locator('#loginusername').fill(user.username);
        await page.locator('#loginpassword').fill(user.password);
        await page.getByRole('button', { name: 'Log in' }).click();

        const loginResponse = await loginResponsePromise;
        const responseJson = await loginResponse.json();
        await expect(responseJson.Item.username).toEqual(user.username);
    
        await expect(page.getByRole('link', { name: `Welcome ${user.username}` })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Log out', exact: true })).toBeVisible();
    });

});