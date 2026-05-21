# NOTES

## Getting Set Up

### Installing Claude Code

Open PowerShell and run:
```powershell
irm https://claude.ai/install.ps1 | iex
```

It will print:
```powershell
Setting up Claude Code...
```

Once done:
```powershell
✔ Claude Code successfully installed!
```

Verify the install
```powershell
claude --version
```

Somehow mine showed:
```powershell
claude : The term 'claude' is not recognized as the name of a cmdlet, function, script file, or operable program. 
```

The install worked, but PowerShell doesn't know where to find claude yet.

Run this to fix it:
```powershell
[Environment]::SetEnvironmentVariable("PATH", "$env:PATH;$env:USERPROFILE\.local\bin", [EnvironmentVariableTarget]::User)
```

Then, check again:
```powershell
claude --version
```

It should print:
```powershell
2.1.146 (Claude Code)
```

### Getting the Starter Project

Used: https://github.com/iamshaunjp/Claude-Code-Masterclass/tree/starter-project

Better to give Claude Code a foundation to build on.

`public` folder is for pages that don't require authentication.

`dashboard` folder is for authenticated users.

For the `Next.js` application, the route will be looking at the folder name e.g. `http://localhost:3000/login` for the components in the `login` folder.

There are `components` and `tests` folder that will guide Claude Code to put relevant files there.

It's better to flesh out the structure myself so that Claude Code can build on top of it.

Launch Claude Code at the project root:
```
claude
```

Type `/ide` to make it connet to and IDE. In this case, select VS Code.

### Asking Claude Code Questions

Type in CC:
```
analyse the codebase and provide a summary of this project,
  outlining any frameworks, archietecture or main features.
```

Result:
```markdown
Here's a summary of the Pocket Heist project:

  ---
  Project Summary

  Pocket Heist — "Tiny missions. Big office mischief." — is a web application
  for assigning and tracking small pranks/missions among office colleagues.

  ---
  Tech Stack & Frameworks

  ┌───────────┬────────────────────────────────┐
  │   Layer   │           Technology           │
  ├───────────┼────────────────────────────────┤
  │ Framework │ Next.js 16 (App Router)        │
  ├───────────┼────────────────────────────────┤
  │ Language  │ TypeScript                     │
  ├───────────┼────────────────────────────────┤
  │ Styling   │ Tailwind CSS v4 + CSS Modules  │
  ├───────────┼────────────────────────────────┤
  │ Icons     │ Lucide React                   │
  ├───────────┼────────────────────────────────┤
  │ Testing   │ Vitest + React Testing Library │
  └───────────┴────────────────────────────────┘

  ---
  Architecture

  Next.js App Router with route groups for access control:

  app/
  ├── (public)/          # Unauthenticated routes
  │   ├── page.tsx       # Splash/home page
  │   ├── login/
  │   ├── signup/
  │   └── preview/
  └── (dashboard)/       # Authenticated routes
      └── heists/
          ├── page.tsx        # Heist list
          ├── create/         # Create a heist
          └── [id]/           # View a heist (dynamic route)

  Route groups (public) and (dashboard) split layout concerns — the dashboard
  layout includes a Navbar, the public layout does not.

  ---
  Current State

  This is a starter/skeleton project — pages have placeholder structure but no
   real logic yet:

  - Heists list page has sections for Active, Assigned, and Expired heists (no
   data)
  - Create Heist page has a form title placeholder
  - Login/Signup pages are empty shells
  - Navbar is the only complete component, with routing to /heists and
  /heists/create
  - A dark theme is defined in globals.css with a purple/pink color palette

  The test suite has one test file covering the Navbar component
  (Navbar.test.tsx).

```

Then I add to prompt again:
```
what are the main features (UI only)? and includes what Scripts other than  
  npm run dev? and what frontend framework it's using and the version?  
```

To see these info:
```markdown
Main UI Features
  - Splash/home page with a styled logo (Clock8 icon embedded in "Pocket
  Heist" wordmark)
  - Login and Signup pages (shell layout only)
  - Preview page (public, no auth required)
  - Heist list dashboard — three sections: Active Heists, Assigned Heists,
  Expired Heists
  - Create Heist form page
  - Individual Heist detail page (dynamic route /heists/[id])
  - Persistent Navbar on dashboard pages with brand header and "Create Heist"
  nav link
  - Dark theme with purple/pink accent palette (Inter font)

  ---
  Available Scripts (package.json)

  ┌───────────────┬────────────────────────────────┐
  │    Script     │            Command             │
  ├───────────────┼────────────────────────────────┤
  │ npm run build │ next build                     │
  ├───────────────┼────────────────────────────────┤
  │ npm run start │ next start (production server) │
  ├───────────────┼────────────────────────────────┤
  │ npm run lint  │ eslint                         │
  ├───────────────┼────────────────────────────────┤
  │ npm run test  │ vitest                         │
  └───────────────┴────────────────────────────────┘

  ---
  Frontend Framework

  Next.js ^16.0.7 with React 19.2.0, using the App Router pattern introduced
  in Next.js 13+.
```


Then, I prompt:
```
 what about the styling?        
```

Result:
```markdown
● Tailwind CSS v4 (^4) — configured via @tailwindcss/postcss as a PostCSS
  plugin.

  Used in two ways:

  1. Utility classes directly in JSX (e.g. flex, text-4xl, font-bold)
  2. @apply directives in globals.css for reusable layout classes like
  .page-content, .center-content, .form-title

  Custom theme defined in globals.css using Tailwind v4's @theme block:
  - Colors: primary (#C27AFF purple), secondary (#FB64B6 pink), dark/light
  backgrounds, success/error states
  - Font: Inter (Google Fonts)

  CSS Modules for component-scoped styles — the Navbar uses Navbar.module.css
  for its layout styles.
```

### Making Code Changes

Till now, the project knowledge is stored in the current CC's session until the context window is filled up.

Type:
```
can you add some dummy intro text to this page?  
```

It asked which page, and then I allowed edits (e.g. adding some new texts) on the `app/(public)/page.tsx` which is the home page.


### Conversation Management

To quit the session:
```
/exit
```

It will turn back to the regular terminal.

Then, when I type `claude` again, it will open a whole new session with no previous context.

I can do this to resume the previous chat session:
```
claude -r
```

which will list the previous sessions for me to choose.

### Models and Usage