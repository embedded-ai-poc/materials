# Embedded AI PoC Materials

팀 공유 자료 및 도구 모음

---

## 🚀 Claude Code Statusline

Claude Code CLI를 위한 깔끔한 상태표시줄

```
 jambiti:main* │  Opus 4.5 │ ◐ Ctx 70K/200K ▓▓░░░ 35% │ Σ Session 115K │  Cost $0.05 │  Time 3m0s │ 󰍛 RAM 50%
```

### ⚡ 설치 방법

#### 방법 1: 다운로드 후 더블클릭 (가장 쉬움)

[![Download](https://img.shields.io/badge/Download-install.bat-blue?style=for-the-badge&logo=windows)](https://github.com/embedded-ai-poc/materials/releases/latest/download/install.bat)

1. 위 버튼 클릭하여 `install.bat` 다운로드
2. 다운로드된 파일 더블클릭
3. 설치 완료 후 Claude Code 재시작

#### 방법 2: PowerShell 명령어

```powershell
iwr -useb https://raw.githubusercontent.com/embedded-ai-poc/materials/master/claude-statusline/install.ps1 | iex
```

### 📖 상세 정보

[claude-statusline/README.md](./claude-statusline/README.md) 참조

---

## 📁 Contents

| 폴더 | 설명 |
|------|------|
| [claude-statusline](./claude-statusline) | Claude Code 상태표시줄 |
| [.agent](./.agent) | Agent 설정 |
| [.claude](./.claude) | Claude 설정 |
