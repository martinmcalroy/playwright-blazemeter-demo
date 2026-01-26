import { test, expect } from '@playwright/test';
import { UserBuilder } from '../helpers/testUser';

test.describe('Sign-up', () => {
    
    test('User sign up sends request and backend responds correctly', async ({ page }) => {
        await page.goto('https://www.demoblaze.com/');

        const user = new UserBuilder('testUser123', 'Passw0rd123').build();

        await page.getByRole('link', { name: 'Sign up', exact: true }).click();
        await expect(page.getByRole('dialog', { name: 'Sign up' })).toBeVisible();
        await page.getByRole('textbox', { name: 'Username:' }).fill(user.username);
        await page.getByRole('textbox', { name: 'Password:' }).fill(user.password);

        //capture dialog message and handle pop-up
        var dialogMessage;
        page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => {});
            dialogMessage = dialog.message();
        });

        //setup response handling with predicates to filter unexpected responses
        const signupResponsePromise = page.waitForResponse(response => {
            return (
                response.url().includes('/signup') &&
                response.request().method() === 'POST' &&
                response.status() === 200
            );
        });

        //trigger network request
        await page.getByRole('button', { name: 'Sign up' }).click();

        //parse response to assert on values
        const signupResponse = await signupResponsePromise;
        const responseBody = await signupResponse.json();
        const request = signupResponse.request();
        const postData = JSON.parse(request.postData() || '');

        expect(responseBody).toHaveProperty('errorMessage');
        expect([
            'Sign up successful.', 
            'This user already exist.'
        ]).toContain(responseBody.errorMessage);

        //ensure UI dialog message matches response message
        expect(dialogMessage).toBe(responseBody.errorMessage);

        //validate the request sent the appropriate credentials
        expect(postData.username).toEqual(user.username);
        expect(postData.password.length).toBeGreaterThan(0);
    });

});