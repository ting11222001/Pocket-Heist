# NOTES

## References

Inspired by the [Claude Code Masterclass](https://www.youtube.com/c/TheNetNinja) by Net Ninja.

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

PATH is a list of folders Windows searches when we type a command.

$env:PATH is my current PATH value, $env:USERPROFILE is my home folder.

`[EnvironmentVariableTarget]::User` means the change applies to your account only, no admin needed.

For this `"$env:PATH;$env:USERPROFILE\.local\bin"` part, it was like
`[the current PATH] ; [the new folder we want to add]`, so it's not replacing the PATH. It's saying "keep everything that is already there, and add this new folder at the end."

Also, `$env:USERPROFILE` is just a variable that holds my Windows home folder path. On my machine it resolves to `C:\Users\MY_USERNAME`.

I can verify it by running:

```powershell
$env:USERPROFILE
```

Then, check again if it's installed successfully:

```powershell
claude --version
```

It should print:

```powershell
2.1.146 (Claude Code)
```

#### How to double check

Run this in PowerShell to confirm the folder is in your PATH:

```powershell
$env:PATH -split ";"
```

That splits your PATH by semicolons and prints each folder on its own line. Look for the `.local\bin` entry.

To confirm `claude` is actually inside that folder:

```powershell
Get-ChildItem "$env:USERPROFILE\.local\bin"
```

You should see `claude.exe` (or similar) listed there.

And the final check, just run:

```powershell
claude --version
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
│ Layer │ Technology │
├───────────┼────────────────────────────────┤
│ Framework │ Next.js 16 (App Router) │
├───────────┼────────────────────────────────┤
│ Language │ TypeScript │
├───────────┼────────────────────────────────┤
│ Styling │ Tailwind CSS v4 + CSS Modules │
├───────────┼────────────────────────────────┤
│ Icons │ Lucide React │
├───────────┼────────────────────────────────┤
│ Testing │ Vitest + React Testing Library │
└───────────┴────────────────────────────────┘

---

Architecture

Next.js App Router with route groups for access control:

app/
├── (public)/ # Unauthenticated routes
│ ├── page.tsx # Splash/home page
│ ├── login/
│ ├── signup/
│ └── preview/
└── (dashboard)/ # Authenticated routes
└── heists/
├── page.tsx # Heist list
├── create/ # Create a heist
└── [id]/ # View a heist (dynamic route)

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
│ Script │ Command │
├───────────────┼────────────────────────────────┤
│ npm run build │ next build │
├───────────────┼────────────────────────────────┤
│ npm run start │ next start (production server) │
├───────────────┼────────────────────────────────┤
│ npm run lint │ eslint │
├───────────────┼────────────────────────────────┤
│ npm run test │ vitest │
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

Type this to change the model:

```
/model
```

Select one.

Each model has different rates of eating up my token quotas. Go to Settings > Usage to check.

## Commands, Context, Tools & Hooks

### Slash Commands

Some common ones by just typing `/`:

```
/doctor
/usage
/config
/theme
/model
/init
```

### The CLAUDE.md File

Type:

```
/init
```

Use it on an existing project, so Claude Code doesn't need to keep scanning.

I also did these to match what the tutorial's CLAUDE.md looks like:

```
In the CLAUDE.md, under Architecture, there should be: 1) TechStack 2) Route organisation from Next.js 3) Importt Aliases 4) Styling
  Architecutre using the multi-layered approach which includes a) global theme and b) component style 5) Component Structure 6) Testing setup 7) Additional Coding Preferences

Do NOT use semicolons for JavaScript or TypeScript code.
Do NOT apply tailwind classes directly in component templates unless essential or just 1 at most. If an element needs more than a single tailwind class, combine them into a custom class using the @apply directive.
Use minimal project dependencies where possible.
Use the git switch -c command to switch to new branches, not git checkout.
```

And then I added:

```
In the CLAUDE.md, under the commands section there should be 1) Development 2) Testing 3) Linting
```

And then I added:

```
In the CLAUDE.md, add a Project Overview section on top of the Commands section
```

Till now I will leave the CLAUDE.md as it is, but I can always come back to update it when the project is updated.

This CLAUDE.md is at the project scope level. This is project specific.

I can create a claude file that stores informations across all my projects in my user directory on my machine later on, which is called the user scope. Can look it up later.

### Adding Files as Context

If I want to add a footer component with the copyright content on the splash page, then I should make it very explicit, by adding the splash page's path to the context with `@` symbol.

Just type `@page` then claude code will have a select menu from the code base:

```
Make a new footer component with a copyright notice and add it only to
  the splash page and auth pages. @app/(public)/page.tsx
```

Or if I want to do this:

```
Can you create a btn class and styles using the theme colors in @app/globals.css. Then apply that class to the link in the navbar.
```

I can also use cursor and select the part of the code in the `Navbar.tsx` i.e. the `<Link href="/heists/create">Create Heist</Link>` to tell CC to look there.

In CC it will show one line is selected then it knows that's where it should add the new `btn` class style.

I can also use `@` in the CLAUDE.md to manually add files into context of the prompt.

### Adding Images as Context

It's useful when I want to add a design reference for a new component.

For example:
```
Can you make a new Skeleton UI component for later use? Base the design on the following image, but use colours to match this project. @public/skeleton.png
```

Then, add the skeleton component in the preview page:
```
can you add this skeleton component to the preview page in a grid layout,
  so we can preview it?
```

The skeleton component should look exactly the same as the image referenced.

### The Context Window

Context Window:

- 200K tokens ~ 500 pages of text
- `/compact` runs when at 95% capacity

Run `/context` first and I see:

```
 /context
  ⎿  Context Usage
     ⛁ ⛁ ⛀ ⛀ ⛀   Sonnet 4.6
     ⛁ ⛁ ⛁ ⛁ ⛶   claude-sonnet-4-6
     ⛶ ⛶ ⛶ ⛶ ⛶   57.2k/200k tokens (29%)
     ⛶ ⛶ ⛶ ⛶ ⛶
     ⛶ ⛝ ⛝ ⛝ ⛝   Estimated usage by category
                 ⛁ System prompt: 6.6k tokens (3.3%)
                 ⛁ System tools: 13.4k tokens (6.7%)
                 ⛁ Memory files: 893 tokens (0.4%)
                 ⛁ Skills: 981 tokens (0.5%)
                 ⛁ Messages: 35.3k tokens (17.6%)
                 ⛶ Free space: 109.8k (54.9%)
                 ⛝ Autocompact buffer: 33k tokens (16.5%)
```

Run `/compact`, and then run `/context` to check if the free space has increased:

```
 /context
  ⎿  Context Usage
     ⛁ ⛁ ⛀ ⛀ ⛀   Sonnet 4.6
     ⛁ ⛶ ⛶ ⛶ ⛶   claude-sonnet-4-6
     ⛶ ⛶ ⛶ ⛶ ⛶   29.2k/200k tokens (15%)
     ⛶ ⛶ ⛶ ⛶ ⛶
     ⛶ ⛝ ⛝ ⛝ ⛝   Estimated usage by category
                 ⛁ System prompt: 6.6k tokens (3.3%)
                 ⛁ System tools: 13.4k tokens (6.7%)
                 ⛁ Memory files: 893 tokens (0.4%)
                 ⛁ Skills: 981 tokens (0.5%)
                 ⛁ Messages: 7.3k tokens (3.7%)
                 ⛶ Free space: 137.8k (68.9%)
                 ⛝ Autocompact buffer: 33k tokens (16.5%)
```

I can use `/clear` to remove everything in the history.

Rule of thumb, a new dedicated session just for one feature/an area in the application to keep the context window clean.

Then, during that session, occasionally use the `/compact` command to clear up the context window once I reach a milestone.

I can use `/rewind` to rewind a session back to an earlier state. I can then decide to restore the code and the convo or either one. Use this command when I notice the convo goes off track.

The latest command of doing this is also called `/undo`.

### Tools

Tools are functions that allow Claude Code to do things.

I just need to type my commands i.e. the prompts, and the prompts got sent to the model. The model looks at the prompts and it reasons what needs to happen for it to complete the task like it decides which tools it needs to call, e.g. a write tool, then the model will tell Claude Code which tools to run to complete the task.

### Permissions & Allowed Tools

For example, if I want to run:

```
Search the next.js docs to see how to implememnt dynamic routes
```

and I want to grant permissions to the `Web Search` tool in this project across all sessions.

(Note that when allowing Claude Code to edit when it asks then the permission only lasts in that session.)

Then, this file will be generated:

```
.claude > settings.local.json
```

To add allowed tools, run `/permissions`.

I can be specific:

```
 Add allow permission rule

  Permission rules are a tool name, optionally followed by a specifier in
  parentheses.
  e.g., WebFetch or Bash(ls *)
```

For example, `Bash(git init)` and save this rule to `.claude/settings.local.json` which won't be added to the version control:

```
Where should this rule be saved?
  ❯ 1. Project settings (local)  Saved in .claude\settings.local.json
    2. Project settings          Checked in at .claude\settings.json
    3. User settings             Saved in at ~/.claude/settings.json
```

Then, the `settings.local.json` will become:

```
{
  "permissions": {
    "allow": [
      "PowerShell(*)",
      "Bash(git init)"
    ]
  }
}
```

Then, test if this permission works by running this prompt:

```
initialise a new git repo for this project
```

It should not ask for permission - yes!

And it prints:

```
● The project already has a git repository initialized — the session started
  with branch main and several commits. No action needed.
```

And test if other Bash command is still asking for permissions:

```
can you switch to a new branch called feature-abc
```

Which it does ask for permissions for this Bash command, just as expected:

```
Bash command

   git switch -c feature-abc
   Create and switch to new branch feature-abc

 This command requires approval

 Do you want to proceed?
 ❯ 1. Yes
   2. Yes, and don’t ask again for: git switch *
   3. No
```

Then, I can add this into permissions by running `/permissions`, and type:

```
Bash(git switch:*)
```

Bascially adding a wildcard after the `switch`.

This time, when I do the same prompt and it's now able to run the Bash command (switch) without asking for permissions:

```

❯ can you switch to a new branch called feature-abc

● Bash(git switch -c feature-abc)
  ⎿  Switched to a new branch 'feature-abc'

● Now on branch feature-abc.
```

### Create my own Custom Commands

For example, `/component` which is used whenever I want to create a component etc.

Create a `commands` folder inside the `.claude` folder (this one should be at the project root) and the actual instruction for the command `/commit-message`:

```
.claude/commands/commit-message.md
```

I added those sections in the markdown and list out `allowed-tools` explicitly for that particular command.

Remember to exit the current CC session to allow it to pick up the new commands.

To test if this new command works, I had to add code changed files to "staged" first and then in CC run `/commit-message`:

```
 ---
  Summary of staged changes:

  - .claude/commands/commit-message.md — New custom slash command definition
  for /commit-message, including task instructions, allowed tools, commit
  type emojis, and output format.
  - NOTES.md — New section documenting how custom commands work in Claude
  Code, including folder structure, allowed-tools frontmatter, and the
  requirement to restart the session for new commands to be picked up.

  ---
  Proposed commit message:

  📝 docs: add custom /commit-message slash command and document how it works

  Adds a reusable /commit-message command so staged changes can be
  summarised and committed with a consistent format without repeating
  the instructions each time. Documents the custom commands pattern
  in NOTES for future reference.

  ---
  Shall I go ahead and commit with this message?
```

Then, I responded:

```
yes, proceed
```

It somehow still asked if it can commit despite that I've added the permission in the command file.

So I just double checked:

```
Why allowed-tools in the command file didn't prevent it

The frontmatter allowed-tools only grants permission for tools used within that command's flow. The final approval prompt is a project-level safety setting, not a command-level one. So the two need to be set separately.
```

And I chose `yes, and don't ask again for git commit *`, then here in the `.claude/settings.local.json` is updated:

```
{
  "allowedTools": [
    "Bash(git commit:*)"
  ]
}
```

So now it can:

```
● Bash(git commit -m "$(cat <<'EOF'
    📝 docs: add custom /commit-message slash command and document how it
    works…)
⎿  [feature-abc 0c281bf] 📝 docs: add custom /commit-message slash com
   mand and document how it works
    2 files changed, 57 insertions(+), 1 deletion(-)
    create mode 100644 .claude/commands/commit-message.md

● Committed. Branch feature-abc is now at 0c281bf.
```

Note that I didn't add `git add .` inside to automatically add staging files.

Reason:

```
Staging is a deliberate human decision. The whole point of reviewing a diff before committing is to control what goes in. Auto-staging defeats that.

Your current prompt already has a good safety note: "DO NOT auto-commit – wait for user approval." Staging deserves the same respect.
```

### Bash Mode

Type `!` in the Claude Code session for it to change to the shell mode directly without having to open another terminal.

For example,

```
! git status
```

It then prints:

```
! git status
  ⎿  On branch feature-abc
     Changes not staged for commit:
       (use "git add <file>..." to update what will be committed)
       (use "git restore <file>..." to discard changes in working directory)
        modified:   NOTES.md
```

The benefit of doing this is that the output of that command gets automatically added to the chat history.

It'd be great if we're running some tests, then Claude Code can easily see which tests are failing, so then I can ask CC to go back and fix it for me.

Currently, in the `commit-message.md` there is this section:

```
## Run these commands:

- git status
- git diff --staged
```

The prompt gets sent to the model first, before anything else. The model then interprets these instructions and tells Claude Code to use the bash tool to run the bash commands, which it does. Claude Code then sends the output of those commands back to the model so it can analyse them, generate a commit message, and send that back to us.

But we can shorten this process by having those bash commands run before the prompt ever gets sent to the model. We do that by entering bash mode within the prompt itself.

So I can replace that section with this:

```
## Context:

- Current git status: !`git status`
- Current git diff: !`git diff --staged`
```

### Command Arguments

Pass extra info to the command.

For example, the comadn can look like this: `/component <arguments>`.

Create `component.md` instruction in the `.claude/commands/component.md`.

Some notes in the `description`:

- `Glob` is a file pattern matching too for searching the codebase.
- `Bash(npx vitest:*)` is to let it run any tests it creates for the component.

And then I added each section in the `.claude/commands/component.md`.

Once done, type `exit` to exit the curent Claude Code session and re-enter to let it reload.

And then try:

```
/component an avatar component which displays the first letter of a name passed as a prop. If the name is PascalCase, use the first 2 uppercase letters for the avatar. No pics.
```

It prints:

```
● Starting with the test file for Avatar.

  Read 2 files (ctrl+o to expand)

● Write(tests\components\Avatar.test.tsx)
  ⎿  Wrote 20 lines to tests\components\Avatar.test.tsx
      1 import { render, screen } from "@testing-library/react"
      2 import { describe, it, expect } from "vitest"
      3 import Avatar from "@/components/Avatar"
      4
      5 describe("Avatar", () => {
      6   it("renders successfully", () => {
      7     render(<Avatar name="Alice" />)
      8     expect(screen.getByRole("img", { name: /alice/i })).toBeIn
        TheDocument()
      9   })
     … +12 lines (ctrl+o to expand)

● Bash(cd "C:\Users\MY_USERNAME\Documents\Projects\Pocket-Heist" && npx vitest
      run tests/components/Avatar.test.tsx 2>&1)
  ⎿  Error: Exit code 1

      RUN  v4.0.16 C:/Users/MY_USERNAME/Documents/Projects/Pocket-Heist


     ⎯⎯⎯⎯⎯⎯ Failed Suites 1 ⎯⎯⎯⎯⎯⎯⎯

      FAIL  tests/components/Avatar.test.tsx [
     tests/components/Avatar.test.tsx ]
     Error: Failed to resolve import "@/components/Avatar" from
     "tests/components/Avatar.test.tsx". Does the file exist?
       Plugin: vite:import-analysis
     … +22 lines (ctrl+o to expand)

● Tests fail as expected — component doesn't exist yet. Creating the
  component now.

● Bash(mkdir
      "C:\Users\MY_USERNAME\Documents\Projects\Pocket-Heist\components\Avatar")
  ⎿  Done

● Write(components\Avatar\Avatar.tsx)
  ⎿  Wrote 22 lines to components\Avatar\Avatar.tsx
       1 import styles from "./Avatar.module.css"
       2
       3 interface AvatarProps {
       4   name: string
       5 }
       6
       7 function getInitials(name: string): string {
       8   const uppercaseLetters = name.match(/[A-Z]/g) ?? []
       9   if (uppercaseLetters.length >= 2) {
      10     return uppercaseLetters[0] + uppercaseLetters[1]
     … +12 lines (ctrl+o to expand)

● Write(components\Avatar\Avatar.module.css)
  ⎿  Wrote 5 lines to components\Avatar\Avatar.module.css
      1 @reference "../../app/globals.css";
      2
      3 .avatar {
      4   @apply flex items-center justify-center rounded-full bg-prim
        ary text-dark font-semibold text-sm w-10 h-10 select-none;
      5 }

● Write(components\Avatar\index.ts)
  ⎿  Wrote 1 lines to components\Avatar\index.ts
      1 export { default } from "./Avatar"

● Bash(cd "C:\Users\MY_USERNAME\Documents\Projects\Pocket-Heist" && npx vitest
      run tests/components/Avatar.test.tsx 2>&1)
  ⎿   RUN  v4.0.16 C:/Users/MY_USERNAME/Documents/Projects/Pocket-Heist

      ✓ tests/components/Avatar.test.tsx (3 tests) 132ms
     … +6 lines (ctrl+o to expand)
  ⎿  (timeout 30s)

● All 3 tests pass. Adding to the preview page now.

● Update(app\(public)\preview\page.tsx)
  ⎿  Added 8 lines
      1  // preview page for newly created UI components
      2  import Skeleton from "@/components/Skeleton"
      3 +import Avatar from "@/components/Avatar"
      4
      5  export default function PreviewPage() {
      6    return (
     ...
      14          <Skeleton />
      15          <Skeleton />
      16        </div>
      17 +
      18 +      <h3>Avatar</h3>
      19 +      <div style={{ display: "flex", gap: "1rem", marginTop:
         + "1rem" }}>
      20 +        <Avatar name="Alice" />
      21 +        <Avatar name="PocketHeist" />
      22 +        <Avatar name="bob" />
      23 +      </div>
      24      </div>
      25    )
      26  }

● Avatar component is done. Here's a summary:

  - Initials logic: single uppercase or no PascalCase → first letter
  uppercased; two or more uppercase letters → first two (e.g. PocketHeist →
  PH)
  - Styled with a circular bg-primary (purple) badge using CSS Modules
  - Accessibility: role="img" + aria-label={name} on the wrapper
  - All 3 tests pass
  - Preview page updated with three examples: Alice → A, PocketHeist → PH,
  bob → B

✻ Worked for 1m 13s
```

And the component should be in this preview page:

```
http://localhost:3000/preview
```

### Making a Hook

Creating a hook to auto-format the code reated by CC using Prettier.

Type `/hooks` to start setting up a hook. Select the `PostToolUse` event:

```
  Hooks
  0 hooks configured

  ℹ This menu is read-only. To add or modify hooks, edit settings.json
  directly or ask Claude. Learn more

    1.  PreToolUse          Before tool execution
  ❯ 2.  PostToolUse         After tool execution
    3.  PostToolUseFailure  After tool execution fails
    4.  PostToolBatch       After a batch of tool calls resolves
  ↓ 5.  PermissionDenied    After auto mode classifier denies a tool call
```

It looks like the /hooks UI in the latest version no longer has an interactive "Add new hook" option. Instead, it tells you to edit settings.json directly.

About what matter patterns out there:
https://code.claude.com/docs/en/hooks#matcher-patterns

So now in `.claude/settings.local.json`, there's this hook object:

```
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "echo \"Hello!\""
          }
        ]
      }
    ]
  }
```

Here is what it does:

```
Event: fires after Claude uses any tool.
Matcher: filters to only Edit or Write tool calls.
Command: runs echo "Hello!" after every file edit or write.
```

This `type` defines the hook type which can be a command in this case or a prompt.

To test this PostToolUse hook, I selected one line in the Home page and ask it to change the wording.

And then I use `ctrl + o` to show CC's internal thinking. For example, after the code changes output in the terminal showed it's done, then type `ctrl + o` CC will toggle more details like when this PostToolUse hook ran:

```
...
  ⎿  2 PostToolUse hooks ran
...
```

Somehow the terminal didn't echo Hello, I changed it to print to a new log text file in my Downloads folder:

```
"command": "echo \"Hello!\" >> C:/Users/MY_USERNAME/Downloads/hook-log.txt"
```

### Using jq

jq is a command line JSON processing tool.

When our hooks are fired, CC provideds JSON inputs to the commands we run.

And that JSON input contains information about the tool CC used aor about the lifecycle event in general.

In the case of the edit and write tools from previous practice, it contains things like the files that were edited, which would be really useful if we wanted to use prettier on those files.

And jq allows us to easily process that JSON input and extract values from it that we might need and then output them in our command.

I installed `jq` from here:
https://jqlang.org/download/

I ended up using `scoop`:

```
scoop install jq
```

For CLI tools like jq, Scoop is the best choice on Windows — it installs everything to C:\Users\MY_USERNAME\scoop\ in your own user folder, no system-wide changes, and you can uninstall the whole thing cleanly with scoop uninstall scoop if you ever want it gone.

Once installed, then create the new hooks.

type `/hooks`, select `PostToolUse`

```
  PostToolUse - Matchers
  Input to command is JSON with fields "inputs" (tool call arguments) and
  "response" (tool call response).
```

Here again I can see the input to command is in JSON format.

So now add a new hooks into the `Write|Edit` tool's `PostToolUse` event in the `settings.local.json`:

```
"command": "jq . > tool-use.json"
```

Then test if this hook works using:

```
❯ can you change the heading in the /login page to an h1 tag?
  @app/(public)/login/page.tsx
```

It should trigger the hook - when that happens, jq should process the JSON input that Claude Code pipes into the command about the tool use and then write it to a new JSON filein the root directory.

#### Troubleshooting on Windows

##### Claude Code: `jq` Not Found in Hooks on Windows

###### Question

I installed `jq` on my Windows machine using Scoop and confirmed it works in PowerShell:

```powershell
PS C:\Users\MY_USERNAME\Documents\Projects\Pocket-Heist> jq --version
jq-1.8.1
```

But when Claude Code runs a `PostToolUse` hook using `jq`, I get this error:

```
⎿  PostToolUse:Edit hook error
⎿  Failed with non-blocking status code:
   /usr/bin/bash: line 1: jq: command not found
```

My `settings.local.json` hook config:

```json
{
  "permissions": {
    "allow": [
      "PowerShell(*)",
      "Bash(git init)",
      "Bash(git switch:*)",
      "Bash(git commit *)"
    ]
  },
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "echo \"Hello!\" >> C:/Users/MY_USERNAME/Downloads/hook-log.txt"
          },
          {
            "type": "command",
            "command": "jq . > tool-use.json"
          }
        ]
      }
    ]
  }
}
```

Why can't Claude Code find `jq` even though it is installed?

###### Answer

This is a known Windows issue with Claude Code hooks. Claude Code hooks run inside a bash subprocess (`/usr/bin/bash`), and that subprocess has a minimal PATH. It does not include Scoop's shims folder, so `jq` is invisible to it even though PowerShell can find it.

Many other Windows users have reported the same problem.

**Fix: Use the full path to `jq`**

Step 1. Find the exact path in PowerShell:

```powershell
(Get-Command jq).Source
```

This returns something like:

```
C:\Users\MY_USERNAME\scoop\shims\jq.exe
```

Step 2. Update your hook to use that full path with forward slashes:

```json
{
  "type": "command",
  "command": "C:/Users/MY_USERNAME/scoop/shims/jq.exe . > tool-use.json"
}
```

**Why it works**

By using the full path, you skip the PATH lookup entirely. The bash subprocess does not need to know where Scoop's shims are.

**How to verify**

Add a test hook that writes the `jq` version to your log file:

```json
{
  "type": "command",
  "command": "C:/Users/MY_USERNAME/scoop/shims/jq.exe --version >> C:/Users/MY_USERNAME/Downloads/hook-log.txt"
}
```

Trigger an edit in Claude Code, then check `hook-log.txt`. If the version number appears, the path is correct.

---

**Source:** [Claude Code GitHub Issues #3417](https://github.com/anthropics/claude-code/issues/3417), [#16377](https://github.com/anthropics/claude-code/issues/16377)

### Using Prettier in a Hook

From the previous section, I was able to let the `jq` output the result into `tool-use.json`.

In this section, I will focus on the `tool_input` > `file_path` which is the location of the file which was edited. I will need to use this info to run Prettier on that file to auto-format it.

This will applied to any code changes made by Claude Code.

To test if I can grab the `.tool_input.file_path` correctly and output to `hook-log.txt` I did this first:

```
{
    "type": "command",
    "command": "C:/Users/MY_USERNAME/scoop/shims/jq.exe -r '.tool_input.file_path' >> C:/Users/MY_USERNAME/Downloads/hook-log.txt"
}
```

Test it by first removing all the indentation in the `app/(public)/page.tsx`, and then ask CC to `make the tagline into <div>Office pranks. Zero evidence. Perfectly Petty.</div>`:

```js
export default function Home() {
  return (
    <div className="center-content">
      <div className="page-content">
        <h1>
          P<Clock8 className="logo" strokeWidth={2.75} />
          cket Heist
        </h1>
        <div>Office pranks. Zero evidence.</div>
        <p className="mt-4 text-body">
          Turn your workplace into a playground. Pocket Heist lets you create
          and assign sneaky little missions to your colleagues. Swap
          someone&apos;s screensaver, hide the stapler, reorganise the snack
          drawer. Harmless chaos, maximum fun.
        </p>
        <p className="mt-2 text-body">
          Track your active heists, see what&apos;s been assigned to you, and
          relive your greatest (expired) schemes, all in one place.
        </p>
      </div>
    </div>
  );
}
```

I just realised that it would be easier if I just run everything in Git Bash terminal as it's the closest to the Bash terminal in Linux and macOS.

When it's done, it should apply the new tagline with indentations:

```js
export default function Home() {
  return (
    <div className="center-content">
      <div className="page-content">
        <h1>
          P<Clock8 className="logo" strokeWidth={2.75} />
          cket Heist
        </h1>
        <div>Office pranks. Zero evidence. Perfectly Petty.</div>
        <p className="mt-4 text-body">
          Turn your workplace into a playground. Pocket Heist lets you create
          and assign sneaky little missions to your colleagues. Swap
          someone&apos;s screensaver, hide the stapler, reorganise the snack
          drawer. Harmless chaos, maximum fun.
        </p>
        <p className="mt-2 text-body">
          Track your active heists, see what&apos;s been assigned to you, and
          relive your greatest (expired) schemes, all in one place.
        </p>
      </div>
    </div>
  );
}
```

#### The Prettier hook command

##### Original version (from tutorial)

```json
{
  "type": "command",
  "command": "jq -r '.tool_input.file_path' | { read fp; [[ \"$fp\" =~ \\.tsx?$ ]] && npx prettier --write \"$fp\"; }"
}
```

This had two problems.

**Problem 1: Broken pipe between hooks**

Each hook command runs as a separate process. So `jq` had nothing piped into it. There was no stdin to read from.

**Problem 2: Missing `|| true`**

If the file was not `.ts` or `.tsx`, the regex check failed and returned exit code `1`. Claude Code treated that as a hook failure and showed an error.

#### The fixed command

```json
{
  "type": "command",
  "command": "fp=$(jq -r '.tool_input.file_path' tool-use.json) && [[ \"$fp\" =~ \\.tsx?$ ]] && npx prettier --write \"$fp\" || true"
}
```

**Fix 1: Read from the saved file**

The first hook saves the JSON to `tool-use.json`. So instead of piping, the second hook reads from that file directly.

```bash
# Before: nothing to read from stdin
jq -r '.tool_input.file_path' | { read fp; ... }

# After: reads from the saved file
fp=$(jq -r '.tool_input.file_path' tool-use.json)
```

**Fix 2: `|| true` at the end**

When a bash command finishes, it gives back an exit code. `0` means success. Anything else means failure.

The command chain uses `&&`, which stops and returns a failure code if any step fails. If the file is not `.ts` or `.tsx`, the regex check fails and Claude Code sees an error.

`|| true` means "if the whole thing failed, run `true` instead". `true` is a built-in bash command that does nothing and always returns exit code `0`.

```bash
# Without || true
fp=$(...) && [[ "$fp" =~ \.tsx?$ ]] && npx prettier --write "$fp"
# exits with 1 if file is not .ts or .tsx → Claude Code shows error

# With || true
fp=$(...) && [[ "$fp" =~ \.tsx?$ ]] && npx prettier --write "$fp" || true
# always exits with 0 → Claude Code stays happy
```

Think of it like this:

```
did it work?
  yes → exit 0  ✓
  no  → run true → exit 0  ✓
```

Also, since I can confirm that jq is found in the git bash terminal, so jq is in my PATH and I can just use `jq` in my hooks commands now if I'm running CC in the git bash terminal:

```
$ which jq
/c/Users/Li-Ting/scoop/shims/jq
```

So I don't need to use the full paths anymore e.g. `C:/Users/MY_USERNAME/scoop/shims/jq.exe`.

#### `[[ ]]`, `=~`, and `--write`

**`[[ ]]`**

It is a bash test block. It checks if a condition is true or false and returns exit code `0` for true, `1` for false.

The double bracket version `[[ ]]` is the modern bash version. It is safer and supports regex with `=~`.

```bash
[[ "$fp" =~ \.tsx?$ ]]
# checks if $fp matches the pattern
```

**`=~`**

It means "matches this regex pattern". It only works inside `[[ ]]`.

```bash
[[ "$fp" =~ \.tsx?$ ]]
```

Breaking down the pattern `\.tsx?$`:

- `\.` means a literal dot
- `ts` matches the letters "ts"
- `x?` means "x is optional"
- `$` means end of the string

So it matches files ending in `.ts` or `.tsx`.

**`--write`**

It is a flag for the `npx prettier` command. It tells Prettier to save the formatted result back into the same file.

Without `--write`, Prettier just prints the formatted code to the terminal but does not change the file.

```bash
npx prettier --write "$fp"
# formats the file and saves it
```

#### Variable assignment with `$()` and `jq`

**`fp=$(...)`**

This assigns a value to a variable called `fp`.

The `$(...)` part runs a command and captures its output as a string.

So `fp=$(some command)` means "run this command and store the result in `fp`".

**`jq -r '.tool_input.file_path' tool-use.json`**

This reads the file `tool-use.json` and extracts a value from it.

- `jq` is a tool for reading JSON files
- `-r` means "raw output". Without it, jq wraps strings in quotes. With it, you get plain text.
- `'.tool_input.file_path'` is the path to the value inside the JSON. It means "go into `tool_input`, then get `file_path`"
- `tool-use.json` is the file to read from

So if `tool-use.json` looks like this:

```json
{
  "tool_input": {
    "file_path": "app/page.tsx"
  }
}
```

Then `jq -r '.tool_input.file_path' tool-use.json` returns:

```
app/page.tsx
```

And the whole line stores that into `fp`:

```bash
fp=app/page.tsx
```

#### So far I've tried all these hook commands

```json
{
  "permissions": {
    "allow": [
      "PowerShell(*)",
      "Bash(git init)",
      "Bash(git switch:*)",
      "Bash(git commit *)"
    ]
  },
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "echo \"Hello!\" >> C:/Users/YOUR_USERNAME/Downloads/hook-log.txt"
          },
          {
            "type": "command",
            "command": "jq --version >> C:/Users/YOUR_USERNAME/Downloads/hook-log.txt"
          },
          {
            "type": "command",
            "command": "jq . > tool-use.json"
          },
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' >> C:/Users/YOUR_USERNAME/Downloads/hook-log.txt"
          },
          {
            "type": "command",
            "command": "fp=$(jq -r '.tool_input.file_path' tool-use.json) && [[ \"$fp\" =~ \\.tsx?$ ]] && npx prettier --write \"$fp\" || true"
          }
        ]
      }
    ]
  }
}
```

## Plan Mode & Specs

### A Spec Driven Workflow

```
High-level Spec          Custom /spec command
      |
      ▼
Technical Plan           Planning mode
      |
      ▼
Implement Feature        Extended thinking + Opus
      |
      ▼
Code Review
```

Having this high level, non technical specification for any new feature at heart, then we create a detailed technical development plan based on that spec, and then finally we use that plan to implement the feature.

This workflow makes any guesswork or incorrect assumptions from the Claude Code to the minimum.

Inspired by SpecKit.

### Making a /spec Command

In `.claude/commands/spec.md`, specify how the high level spec should look like.

#### Create the spec template file

Create `_specs` folder to put the `template.md` for the spec templates.

### Creating a New Spec

Add a form in the signup page and a link to switch between login and signup.

Only the frontend look for now.

In Claude Code, run the following to start using this `/spec` command:

```
/spec Let's spec the authentication forms on the /login and /signup pages. They need email and password fields, a 'hide password' icon, and a submit button (signup/login). The forms should only log details to the console for now, when they are submitted. We should be able to easily switch between the two forms.
```

In `_specs/authentication-forms.md`, there will be content filled and this section my answers to CC's questions are as below:

```
## Open Questions

- Should email and password fields share a reusable `AuthForm` component, or remain separate per-page implementations? Remain separate per-page implementations for now.
- Is there a preferred icon from Lucide React for the show/hide password toggle? No.
```

Suggested that I should spend more time on this spec markdown file before moving on to the Plan Mode for Claude Code to start planning how to implement it technically.

### Plan mode

Plan mode is a read-only mode for creaitng implemnetation plans for new features.

When we use plan mode, Claude Code spins up a sub agent to conduct research and gather info about the codebase. Then, that sub agent will provide the info back to Claude Code main agent to generate a plan markdown file, which includes the instructions to implment that plan like code examples, file structures, etc.

`shift + tab` can turn on the CC's plan mode. It will show:

```
⏸ plan mode on
```

Then write:

```
plan the feature described in this spec
  @_specs/authentication-forms.md
```

Look over the plan myself first, instead of letting it edit right away.

So when it asked `Would you like to proceed?`, I will tell it:

```
No, just save the plan to the _plans folder for later
```

Then the plan will be saved in `_plans/authentication-forms.md`.

Suggested that I should spend time reviewing this planned markdown file too.

By this point, before letting CC go ahead to implement, commit now so that later if I don't like the implementation, then I can let it rewind.

### Extended Thinking

So far I've been using Sonnet model to make small code changes, create a spec and also plan the feature.

However, when implementing the plan, I can switch the model to Opus.

Opus model seems very good at following the plan.

Run:

```
/model
```

Hit Enter, and select the model I want.

And extended thinking is good for muli-step problems but it consumers more tokens. It also gives alternative solutions if it sees any holes in the plan.

I can also type `/config` to turn off the Thinking mode. But it could eat up tokens quickly with the Opus model.

Then type this Claude Code:

```
Can you implement this plan @_plans/authentication-forms.md
```

Once done, review the code and see if I need to /rewind i.e. rollback or go ahead with the current changes.

I did a refactor plan this time to see how it feels when creating a plan myself.

### Updating the CLAUDE.md File

Time to update the CLAUDE.md file after all these changes.

Switch back to Sonnet.

The tutorial suggested to rename the existing one to `CLAUDE.1.md` and run `/init` to get a new `CLAUDE.md`.

## MCP Servers

### What Are MCP Servers?

If I'm using an external service like Figma, Firebase to my Claude Code's development workflow, then I need to use MCP servers to add the context and connectivity.

MCP stands for Model Context Protocol. It's a protocol created by Anthropic to allow AI models to interact with external sources.

MCP servers are the program that follow that protocol and its job is to expose a set of tools and resources to an AI model for a specific external service.

If our app wantes to communicate Firebase that backend, and that Firebase MCP server exposes a bunch of tools that Claude Code can then use to work with Firebase.

For example, the MCP server exposes a tool called GetConfigInfo, which CC can trigger to then fetch the setup code for a specific Firebase app, which I can then add to the project code.

That MCP server can also expose resources like firebase docs which the model can then reference when needed.

When the model tells CC it wants to run one of these tools, Claude doesn't run these tools itself. It's actually run on the MCP server. And that server will communicate with the external service, Firebase in this case, and Firebase will then send a response back to the MCP server and MCP server will pass the result back to CC.

So CC never has direct access to the external services like Firebase, Figma, etc. CC can only trigger the tools exposed by the MCP server and then wait for the response.

Next I will be practicing using these in my project.

MCP Servers:

- Context7: Provides up-to-date documentation to libraries & frameworks
- Figma: Allows Claude Code access to design information & snapshots from a Figma file
- Firebase: Interact with a Firebase backend e.g. setup Firebase authentication and database

### Adding an MCP Server

https://context7.com/

Context7 gives Claude Code the latest documentation of a particular framework or library.

E.g. Tailwind, Next.js, React, etc.

The tutorial wants me to:
- Choose the Remote Server connection so the server is maintained and updated remotely.

Somehow the website doesn't have install page directed to GitHub, so I come to the repo:
https://github.com/upstash/context7

This installation part:
https://github.com/upstash/context7#installation

Then this page [here](https://context7.com/docs/resources/all-clients#claude-code):
```bash
claude mcp add --scope user --header "CONTEXT7_API_KEY: YOUR_API_KEY" --transport http context7 https://mcp.context7.com/mcp
```

To get my API key on Context7, sign up and go to my dashboard. Create API key. The key name will be `for-claude-code-practice-2026-06`.

From that mcp server install command for CC, there are different scope level:
https://code.claude.com/docs/en/mcp#local-scope <- default
https://code.claude.com/docs/en/mcp#project-scope
https://code.claude.com/docs/en/mcp#user-scope

So the configuration will be made available to all the projects to a user account.

The tutorial sticks with the local scope:
https://code.claude.com/docs/en/mcp#local-scope

So I changed the install command to this `$ claude mcp add...` and it should print the below. Note that since I didn't add the `scope` flag, so by default this newly added MCP will be at the `local` scope:
```bash
$ claude mcp add --header "CONTEXT7_API_KEY: YOUR_API_KEY" --transport http context7 https://mcp.context7.com/mcp

Added HTTP MCP server context7 with URL: https://mcp.context7.com/mcp to local config
Headers: {
  "CONTEXT7_API_KEY": "[REDACTED]"
}
File modified: C:\Users\Li-Ting\.claude.json [project: C:\Users\Li-Ting\Documents\Projects\Pocket-Heist]
```

To see what MCP servers this current project has access to, run `claude` and then `/mcp`:
```bash
Manage MCP servers
  8 servers

    Local MCPs (C:\Users\Li-Ting\.claude.json [project:
              C:\Users\Li-Ting\Documents\Projects\Pocket-Heist])
  ❯ context7 · ✔ connected · 2 tools
  ...
```

And I can keep hitting enter to see the details, e.g. this context7 MCP will call these tools:
```bash
 Tools for context7
  2 tools

  ❯ 1. resolve-library-id  read-only, open-world
    2. query-docs          read-only, open-world
```

Note that local scope is tied to one project path, context7 will not appear in my other projects.

### Using Context7
