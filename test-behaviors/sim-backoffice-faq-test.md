# SIM Backoffice FAQ Test - Expected Behavior

## Test File
`tests/sim-backoffice-faq-test.spec.ts`

## Purpose
This test verifies that users can navigate to the ISO FAQ page after logging into the SIM Backoffice application and that the "Add FAQ" button is visible.

## Starting Point
- URL: Constructed from APP_URL environment variable + `/StudentAppBackOffice/Login`
- Prerequisites: Valid test credentials stored in `.env` file (TEST_USER_EMAIL and TEST_USER_PASSWORD)

## Steps

1. Login to the application by following the same behaviors outlined in sim-backoffice-login-test.md
2. When the page loads, locate a clickable which has the text "F.A.Q" and click it
3. This should open a submenu - within that submenu click on "ISO F.A.Q"
4. This should bring you to a new page. Verify that there is a red button with the text "Add FAQ" inside it

## Expected Outcome

User should be navigated to the ISO FAQ page and see a red "Add FAQ" button.

## Test Created
2025-01-10

## Last Verified
2025-01-10 (Self-healed after intentional break)

## Notes
- **Credentials**: All credentials are read from `.env` file (TEST_USER_EMAIL and TEST_USER_PASSWORD)
- **Security**: Never hardcode credentials in test files or documentation
- **Password format**: If password contains special characters (like #), it must be quoted in .env file: `TEST_USER_PASSWORD="your-password"`
- Test reuses login flow from sim-backoffice-login-test
- Login uses Local login type (not Staff or Azure AD)
- Test verifies navigation to ISO FAQ page and presence of Add FAQ button
