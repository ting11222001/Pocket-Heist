# Plan: Authentication Forms

## Context

The `/login` and `/signup` pages are currently empty stubs with only a heading. This plan wires up functional auth forms — email, password with a show/hide toggle, submit button, and a link between the two pages. No real auth is involved; form submission logs to the console only.

---

## Files to Modify

### 1. `app/globals.css`
Add shared form utility classes (alongside the existing `.btn` class):
- `.form-group` — vertical stack wrapper for label + input
- `.form-input` — styled text/email/password input field
- `.password-field` — relative wrapper that holds the password input and the toggle button side by side
- `.password-toggle` — the icon button that reveals/hides the password (positioned inside `.password-field`)
- `.form-switch` — the "switch to other form" link line at the bottom of each form

Use `@apply` with theme tokens (`bg-light`, `text-body`, `border`, `rounded-lg`, etc.) — no raw Tailwind in JSX.

---

### 2. `app/(public)/login/page.tsx`
Convert to a client component and implement the full login form.

- Add `'use client'` at the top
- Rename the component function from `SignupPage` to `LoginPage`
- `useState` for: `email`, `password`, `showPassword` (boolean)
- Form structure:
  - Email input (`type="email"`)
  - Password field wrapper: password input + `Eye`/`EyeOff` icon toggle button (from `lucide-react`)
  - Submit button with class `btn` and label "Log in"
  - Link to `/signup` using Next.js `Link`: "Don't have an account? Sign up"
- `onSubmit`: `e.preventDefault()`, `console.log({ email, password })`

---

### 3. `app/(public)/signup/page.tsx`
Same structure as login, separate implementation:

- Add `'use client'`
- Keep function name `SignupPage`
- Update the heading to `h1` (currently `h2`) for consistency with the login page
- Same state: `email`, `password`, `showPassword`
- Same form structure, with:
  - Submit button label: "Sign up"
  - Link to `/login`: "Already have an account? Log in"
- `onSubmit`: `e.preventDefault()`, `console.log({ email, password })`

---

## Icons

Use `Eye` and `EyeOff` from `lucide-react` (already a project dependency) for the password toggle. Render `Eye` when password is hidden, `EyeOff` when visible.

---

## Tests

### `tests/components/LoginPage.test.tsx`
- Renders email field, password field, and submit button
- Clicking the toggle changes password input `type` from `password` → `text`
- Submitting the form calls `console.log` with `{ email, password }`
- Contains a link to `/signup`

### `tests/components/SignupPage.test.tsx`
- Same cases as above, adapted for signup (button label "Sign up", link to `/login`)

Use `userEvent` from `@testing-library/user-event` for interactions (clicking toggle, typing). Spy on `console.log` with `vi.spyOn`.

---

## Verification

1. Run `npm run dev` and visit `http://localhost:3000/login` — form renders, password toggle works, submission logs to console
2. Visit `http://localhost:3000/signup` — same checks
3. Click the switch link on each page to confirm navigation between forms
4. Run `npx vitest run tests/components/LoginPage.test.tsx tests/components/SignupPage.test.tsx` — all tests pass
