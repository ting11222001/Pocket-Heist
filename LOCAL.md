# The final version of my local claude settings

In `.claude/settings.local.json`:
```
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
            "command": "echo \"Hello!\" >> C:/Users/Li-Ting/Downloads/hook-log.txt"
          }
        ]
      }
    ]
  }
}

```