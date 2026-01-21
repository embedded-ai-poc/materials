# Claude Code Statusline

Minimal, clean statusline for Claude Code CLI.

```
 jambiti:main │  Opus 4.5 │ ◐ 70K/200K ▓▓░░░ 35%  Σ115K │ $5.23 3m20s
```

## Features

- **Git info**: repo:branch with dirty indicator (*)
- **Model**: Current AI model
- **Context**: Current/Max tokens + progress bar + percentage
- **Session total**: Cumulative tokens (Σ)
- **Cost & Time**: Session cost and duration

## Installation

### Option 1: NPM (Recommended)

```bash
npx @embedded-ai-poc/claude-statusline install
```

### Option 2: Windows Batch

```cmd
git clone https://github.com/embedded-ai-poc/materials.git
cd materials/claude-statusline
install.bat
```

### Option 3: Manual

1. Copy `statusline.js` to `~/.claude/statusline/index.js`
2. Add to `~/.claude/settings.json`:

```json
{
  "statusLine": {
    "type": "command",
    "command": "node ~/.claude/statusline/index.js"
  }
}
```

3. Restart Claude Code

## Uninstall

```bash
npx @embedded-ai-poc/claude-statusline uninstall
```

## Display Guide

| Section | Icon | Description |
|---------|------|-------------|
| Git |  | repo:branch (* if uncommitted changes) |
| Model |  | Current AI model name |
| Context | ◐ | Current tokens / Max tokens |
| Progress | ▓░ | Visual context usage |
| Percentage | % | Context window usage (color-coded) |
| Session | Σ | Total tokens used in session |
| Cost | $ | Session cost in USD |
| Time |  | Session duration |

## Color Coding

- **Normal (dim)**: Context usage < 60%
- **Yellow**: Context usage 60-80% (warning)
- **Red**: Context usage > 80% (critical)

## Requirements

- Node.js 14+
- Claude Code CLI
- (Optional) Nerd Font for icons

## License

MIT
