# NOTES

## Installing Claude Code

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