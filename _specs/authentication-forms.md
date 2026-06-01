# Spec for authentication-forms

branch: claude/feature/authentication-forms
figma_component (if used): N/A

## Summary

Add functional login and signup forms to the `/login` and `/signup` pages. Each form includes an email field, a password field with a show/hide toggle, and a submit button. On submission the form logs the field values to the console — no real auth is wired up yet. Users can navigate between the two forms via a clearly visible link or toggle.

## Functional Requirements

- The `/login` page contains a login form with:
  - An email input field
  - A password input field with a show/hide password icon button
  - A "Log in" submit button
  - A link to the `/signup` page ("Don't have an account? Sign up")
- The `/signup` page contains a signup form with:
  - An email input field
  - A password input field with a show/hide password icon button
  - A "Sign up" submit button
  - A link to the `/login` page ("Already have an account? Log in")
- Clicking the show/hide icon toggles the password field between `type="password"` and `type="text"`
- On form submission, the email and password values are logged to the browser console
- The form does not navigate away or reload the page on submit

## Figma Design Reference (only if referenced)

N/A

## Possible Edge Cases

- User submits with empty fields — form should still log (no validation required at this stage)
- Password toggle state resets if the component re-renders
- The switch-between-forms link should be visible without scrolling on typical screen sizes

## Acceptance Criteria

- `/login` renders a login form matching the requirements above
- `/signup` renders a signup form matching the requirements above
- Clicking the password toggle icon switches the input between masked and unmasked
- Submitting either form logs `{ email, password }` to the console
- Each form has a working link that navigates to the other form page

## Open Questions

- Should email and password fields share a reusable `AuthForm` component, or remain separate per-page implementations? Remain separate per-page implementations for now.
- Is there a preferred icon from Lucide React for the show/hide password toggle? No.

## Testing Guidelines

Create a test file(s) in the ./tests folder for the new feature, and create meaningful tests for the following cases, without going too heavy:

- Login form renders email field, password field, and submit button
- Signup form renders email field, password field, and submit button
- Clicking the show/hide icon toggles the password input type between `password` and `text`
- Submitting the login form calls `console.log` with the entered values
- Submitting the signup form calls `console.log` with the entered values
- Each form contains a link to the other form page
