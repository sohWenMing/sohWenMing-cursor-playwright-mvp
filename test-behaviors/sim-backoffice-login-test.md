# SIM Backoffice Login Test - Expected Behavior

## Test File
`tests/sim-backoffice-login-test.spec.ts`

## Purpose
This test verifies the complete login and logout flow for the SIM Backoffice application, ensuring users can authenticate with Local login type and access the backoffice dashboard.

## Starting Point
- URL: https://dev-simattendance.simge.edu.sg/StudentAppBackOffice/Login
- Prerequisites: Valid test credentials stored in `.env` file (TEST_USER_EMAIL and TEST_USER_PASSWORD)

## Steps

1. Navigate to the login page
2. Wait until a dropdown that is located under the text "Login Type" is shown on the screen
3. Select the Local option in the dropdown
4. Wait until username and password inputs are shown on the screen
5. Enter username and password from .env file (TEST_USER_EMAIL and TEST_USER_PASSWORD)
6. At this point the login flow should begin, and you should be redirected to the backoffice
7. To verify that the test has passed and the user has logged in, wait for the page that you are redirected to upon login to load and then verify that the texts "StudentAppBackOffice" and "Student App IT Admin" are seen on the screen
8. Logout by clicking on the link tied to Student App IT Admin

## Expected Outcome

User should be logged in and redirected to the backoffice, where the texts "StudentAppBackOffice" and "Student App IT Admin" are visible on the screen. After logout, user should be redirected back to the login page.

## Test Created
2025-01-10

## Last Verified
2025-01-10 (Test passed successfully in headed mode; Self-healed after intentional break)

## Notes
- **Credentials**: All credentials are read from `.env` file (TEST_USER_EMAIL and TEST_USER_PASSWORD)
- **Security**: Never hardcode credentials in test files or documentation
- **Password format**: If password contains special characters (like #), it must be quoted in .env file: `TEST_USER_PASSWORD="your-password"`
- Login uses Local login type (not Staff or Azure AD)
- Test verifies successful login by checking for specific text elements on the dashboard
- Test includes logout verification to ensure complete flow
