# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pocket Heist is a web app for anonymously assigning small pranks and challenges to colleagues using code names, with deadlines and status tracking. Users can create heists, assign them to colleagues, and track active, assigned, and expired heists from a dashboard.

## Commands

### Development

```bash
npm run dev        # start dev server at http://localhost:3000
npm run build      # production build
npm run start      # serve production build
```

### Testing

```bash
npm run test                                          # Vitest (watch mode)
npx vitest run                                        # single run, no watch
npx vitest run tests/components/Navbar.test.tsx       # run a single test file
```

### Linting

```bash
npm run lint       # ESLint
```

## Architecture

### Tech Stack

- **Next.js 16** (App Router) with **React 19**
- **TypeScript**
- **Tailwind CSS v4** via PostCSS
- **Lucide React** for icons
- **Vitest** + **React Testing Library** for tests

### Route Organisation

Two App Router route groups enforce layout separation:

- `app/(public)/` — unauthenticated pages (`/`, `/login`, `/signup`, `/preview`). Layout wraps children in `<main className="public">` with no Navbar.
- `app/(dashboard)/` — authenticated pages (`/heists`, `/heists/create`, `/heists/[id]`). Layout renders `<Navbar />` above `<main>`.

`app/(public)/page.tsx` is the splash page and is intended to redirect logged-in users to `/heists` and guests to `/login` (not yet implemented).

### Import Aliases

`@/` maps to the project root. Use it for all internal imports (e.g. `@/components/Navbar`).

### Styling Architecture

Multi-layered approach:

**a) Global theme** — `app/globals.css` owns all design tokens (colors, font) inside a Tailwind v4 `@theme {}` block, plus base typography rules and shared utility classes via `@apply`. This is the single source of truth for the design system.

**b) Component styles** — each component gets its own CSS Module (e.g. `Navbar.module.css`) for scoped styles, also using `@reference` to access the global theme and `@apply` to compose utility classes from the global theme.

Avoid applying more than one Tailwind utility class directly in JSX. If an element needs multiple classes, define a custom class in the relevant CSS file using `@apply`.

### Component Structure

Each component lives in its own folder under `components/` with three files:

```
components/Navbar/
  Navbar.tsx
  Navbar.module.css
  index.ts          # re-exports the default export for clean imports
```

### Testing Setup

Tests live in `tests/components/`. Vitest runs in a jsdom environment with `@testing-library/jest-dom` matchers available globally (configured in `vitest.setup.ts`). The `vite-tsconfig-paths` plugin makes the `@/` alias work in tests without extra configuration.

## Coding Preferences

- No semicolons in TypeScript or JavaScript files
- Do not apply more than one Tailwind class directly in JSX — use `@apply` in a CSS Module instead
- Keep dependencies minimal — avoid adding packages when the existing stack can handle it
- Use `git switch -c <branch>` to create and switch to new branches (not `git checkout -b`)
