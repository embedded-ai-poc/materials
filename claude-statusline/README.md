# Claude Code Statusline

Minimal, informative statusline for Claude Code CLI.

```
 jambiti:main* │  Opus 4.5 │ ◐ Ctx 70K/200K ▓▓░░░ 35% │ Σ Session 115K │  Cost 5.2¢ │  Time 3m0s │ 󰍛 RAM 50%
```

## Installation

### Windows (PowerShell) - One Line

```powershell
iwr -useb https://raw.githubusercontent.com/embedded-ai-poc/materials/master/claude-statusline/install.ps1 | iex
```

### Manual Installation

1. Download `statusline.js` to `%USERPROFILE%\.claude\statusline\index.js`
2. Add to `%USERPROFILE%\.claude\settings.json`:
```json
{
  "statusLine": {
    "type": "command",
    "command": "node %USERPROFILE%\\.claude\\statusline\\index.js"
  }
}
```
3. Restart Claude Code

## Features

| Section | Icon | Description |
|---------|------|-------------|
| **Git** |  | `repo:branch` with dirty indicator (*) |
| **Model** |  | Current AI model |
| **Context** | ◐ | Current/Max tokens + progress bar + % |
| **Session** | Σ | Total tokens used in session |
| **Cost** |  | Session cost (USD) |
| **Time** |  | Session duration |
| **RAM** | 󰍛 | System memory usage |

## Color Coding

| Color | Context (Ctx) | Memory (RAM) |
|-------|---------------|--------------|
| 🟢 Green | < 60% | < 70% |
| 🟡 Yellow | 60-80% | 70-90% |
| 🔴 Red | > 80% | > 90% |

## Requirements

- Windows 10/11
- Node.js 14+
- Claude Code CLI
- (Recommended) [Nerd Font](https://www.nerdfonts.com/) for icons

## Uninstall

Delete the statusline config from `%USERPROFILE%\.claude\settings.json`:

```json
{
  "statusLine": null
}
```

## License

MIT
