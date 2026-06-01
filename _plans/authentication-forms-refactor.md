## Goal
Extract reusable UI components with TypeScript interfaces from /signup and /login pages.

## Components to create

### Create `Input` component

- file: `components/Input/`. 
- props: `id`, `name`, `type`, `label`, `placeholder`, `required`, `value`, `onChange`. - - Supports email and text input types.

### Create `PasswordInput` component

– extends Input.
- adds show/hide toggle use.

### Create `Button` component

- props: `type`, `onClick`, `children`, `disabled`. 
- use `type="submit"` by default for form buttons.
- add disabled styling.

### Create `LoginForm` component

- file: `components/LoginForm/`. 

Create login form with:
- Email Input component
- PasswordInput component
- Submit Button component ("Log In")
- Form submission handler that prevents default and logs to console
- Link to signup page: "Don't have an account? Sign up"
- Basic email validation (HTML5 type="email" + light JS validation)

### Create `SignupForm` component

- file: `components/SignupForm/`. 

Same structure as LoginForm component.

## Files to update

### Update Login Page

- file: `app/(public)/login/page.tsx`. 
- Use the current layout and replace with the created components above. 

### Update Signup Page

- file: `app/(public)/signup/page.tsx`. 
- Use the current layout and replace with the created components above. 

## Technical Considerations

### TypeScript Interfaces
All components will have typed props:
```typescript
interface InputProps {
  id: string
  name: string
  type: "text" | "email"
  label: string
  placeholder?: string
  required?: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
```