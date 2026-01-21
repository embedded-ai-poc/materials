# Claude Code Statusline

Claude Code CLI를 위한 상태표시줄

```
 jambiti:main* │  Opus 4.5 │ ◐ Ctx 70K/200K ▓▓░░░ 35% │ Σ Session 115K │  Cost $0.05 │  Time 3m0s
```

## 설치 방법

```
git clone https://github.com/embedded-ai-poc/materials.git
cd materials
install.bat
```

설치 후 **Claude Code 재시작**

## 표시 정보

| 항목 | 설명 |
|------|------|
| Git | repo:branch (* = 변경사항 있음) |
| Model | 현재 AI 모델 |
| Ctx | 컨텍스트 사용량 (현재/최대) |
| Session | 세션 누적 토큰 |
| Cost | 세션 비용 |
| Time | 세션 시간 |
