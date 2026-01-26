import { test, expect } from '@playwright/test';
import { UserBuilder } from '../helpers/testUser';

test.describe('Log in', () => {

    test('Existing user can log in', async ({ page }) => {
        await page.goto('https://www.demoblaze.com/');

        const user = new UserBuilder('testSampleUser123', 'Passw0rd123').build();
            
        await page.getByRole('link', { name: 'Log in', exact: true }).isVisible();
        await page.getByRole('link', { name: 'Log in', exact: true }).click();
    
        await expect(page.locator('#logInModal > .modal-dialog > .modal-content > .modal-body')).toBeVisible();
    
        await page.locator('#loginusername').fill(user.username);
        await page.locator('#loginpassword').fill(user.password);
        await page.getByRole('button', { name: 'Log in' }).click();
    
        await expect(page.getByRole('link', { name: `Welcome ${user.username}` })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Log out', exact: true })).toBeVisible();
    });
    
});