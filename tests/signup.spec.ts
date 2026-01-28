import { test, expect } from '@playwright/test';
import { UserBuilder } from '../helpers/testUser';
import * as dotenv from 'dotenv';

test.describe('Sign-up', () => {
    
    test('User sign up sends request and backend responds correctly', async ({ page, browserName }) => {
        dotenv.config();

        await page.goto('https://www.demoblaze.com/');
        
        const username = process.env.SIGN_UP_USERNAME;
        const password = process.env.SIGN_UP_PASSWORD;

        if(!username || !password) {
            throw new Error("Unexpected error: missing environment value for username or password.");
        }

        const user = new UserBuilder(username, password).build();
            
        await page.getByRole('link', { name: 'Sign up', exact: true }).click();
        await expect(page.getByRole('dialog', { name: 'Sign up' })).toBeVisible();
        await page.getByRole('textbox', { name: 'Username:' }).fill(user.username);
        await page.getByRole('textbox', { name: 'Password:' }).fill(user.password);

        const dialogTimeout = browserName === 'firefox' ? 30000 : 5000;
        const [dialog] = await Promise.all([
            page.waitForEvent('dialog', { timeout: dialogTimeout }),
            page.getByRole('button', { name: 'Sign up' }).click(),
        ]);
        const dialogMessage = dialog.message();
        await dialog.dismiss();

        const signupResponsePromise = page.waitForResponse(response => {
            return (
                response.url().includes('/signup') &&
                response.request().method() === 'POST' &&
                response.status() === 200
            );
        });

        await page.getByRole('button', { name: 'Sign up' }).click();

        const signupResponse = await signupResponsePromise;
        const responseBody = await signupResponse.json();
        const request = signupResponse.request();
        const postData = JSON.parse(request.postData() || '');

        expect(responseBody).toHaveProperty('errorMessage');
        expect([
            'Sign up successful.', 
            'This user already exist.'
        ]).toContain(responseBody.errorMessage);

        expect(dialogMessage).toBe(responseBody.errorMessage);

        expect(postData.username).toEqual(user.username);
        expect(postData.password.length).toBeGreaterThan(0);
    });

});