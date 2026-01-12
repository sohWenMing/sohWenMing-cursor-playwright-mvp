import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

test.describe('SIM Backoffice Login Test', () => {
  test('should login to backoffice, verify successful login, and logout', async ({ page }) => {
    // Step 1: Navigate to the login page
    await page.goto(process.env.APP_URL + '/StudentAppBackOffice/Login');
    
    // Step 2: Wait until a dropdown that is located under the text "Login Type" is shown on the screen
    await expect(page.getByText('Failllllll')).toBeVisible();
    const loginTypeDropdown = page.locator('#LoginType');
    await expect(loginTypeDropdown).toBeVisible();
    
    // Step 3: Select the Local option in the dropdown
    await loginTypeDropdown.selectOption('Local');
    
    // Step 4: Wait until username and password inputs are shown on the screen
    const usernameField = page.getByRole('textbox', { name: 'Username*' });
    const passwordField = page.getByRole('textbox', { name: 'Password*' });
    await expect(usernameField).toBeVisible();
    await expect(passwordField).toBeVisible();
    
    // Step 5: Enter username and password from .env file
    await usernameField.fill(process.env.TEST_USER_EMAIL!);
    await passwordField.fill(process.env.TEST_USER_PASSWORD!);
    
    // Step 6: At this point the login flow should begin, and you should be redirected to the backoffice
    // Submit the form by clicking the Login button
    const loginButton = page.getByRole('button', { name: 'Login' });
    await loginButton.click();
    
    // Wait for navigation - check URL or wait for elements to appear
    try {
      await page.waitForURL(/.*StudentAppBackOffice\/$/, { timeout: 10000 });
    } catch (e) {
      // If URL doesn't change, wait for the backoffice elements to appear instead
      await expect(page.getByText('Student App IT Admin')).toBeVisible({ timeout: 10000 });
    }
    
    // Step 7: To verify that the test has passed and the user has logged in, wait for the page 
    // that you are redirected to upon login to load and then verify that the texts 
    // "StudentAppBackOffice" and "Student App IT Admin" are seen on the screen
    // Wait for the backoffice page to fully load
    await page.waitForLoadState('networkidle');
    // Verify the expected texts are visible
    await expect(page.getByText('Student App IT Admin')).toBeVisible();
    // StudentAppBackOffice appears multiple times, so use first() to avoid strict mode violation
    await expect(page.getByText('StudentAppBackOffice').first()).toBeVisible();
    
    // Step 8: Logout by clicking on the link tied to Student App IT Admin
    await page.getByRole('link', { name: /Log out/i }).click();
    
    // Verify we're back at the login page
    await expect(page).toHaveURL(/.*StudentAppBackOffice\/Login$/);
  });
});
