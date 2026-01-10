import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

test.describe('SIM Backoffice FAQ Test', () => {
  test('should login, navigate to ISO FAQ page, and verify Add FAQ button', async ({ page }) => {
    // Step 1: Login to the application by following the same behaviors outlined in sim-backoffice-login-test.md
    // Navigate to the login page
    await page.goto(process.env.APP_URL + '/StudentAppBackOffice/Login');
    
    // Wait until a dropdown that is located under the text "Login Type" is shown on the screen
    await expect(page.getByText('Login Type')).toBeVisible();
    const loginTypeDropdown = page.locator('#LoginType');
    await expect(loginTypeDropdown).toBeVisible();
    
    // Select the Local option in the dropdown
    await loginTypeDropdown.selectOption('Local');
    
    // Wait until username and password inputs are shown on the screen
    const usernameField = page.getByRole('textbox', { name: 'Username*' });
    const passwordField = page.getByRole('textbox', { name: 'Password*' });
    await expect(usernameField).toBeVisible();
    await expect(passwordField).toBeVisible();
    
    // Enter credentials from .env file
    await usernameField.fill(process.env.TEST_USER_EMAIL!);
    await passwordField.fill(process.env.TEST_USER_PASSWORD!);
    
    // Submit the form by clicking the Login button
    const loginButton = page.getByRole('button', { name: 'Login' });
    await loginButton.click();
    
    // Wait for navigation to backoffice page
    try {
      await page.waitForURL(/.*StudentAppBackOffice\/$/, { timeout: 10000 });
    } catch (e) {
      // If URL doesn't change, wait for the backoffice elements to appear instead
      await expect(page.getByText('Student App IT Admin')).toBeVisible({ timeout: 10000 });
    }
    
    // Wait for the backoffice page to fully load
    await page.waitForLoadState('networkidle');
    
    // Step 2: When the page loads, locate a clickable which has the text "F.A.Q" and click it
    await page.getByRole('button', { name: 'F.A.Q.' }).click();
    
    // Step 3: This should open a submenu - within that submenu click on "ISO F.A.Q"
    await page.getByRole('link', { name: 'ISO F.A.Q.' }).click();
    
    // Wait for navigation to ISO FAQ page
    await page.waitForURL(/.*StudentAppBackOffice\/ISOFAQs$/);
    await page.waitForLoadState('networkidle');
    
    // Step 4: This should bring you to a new page. Verify that there is a red button with the text "Add FAQ" inside it
    const addFaqButton = page.getByRole('button', { name: /Add FAQ/i });
    await expect(addFaqButton).toBeVisible();
  });
});
