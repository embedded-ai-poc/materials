# Ultimate Workflow - State Persistence

> **목적**: 컨텍스트 제한으로 인한 세션 중단 시 상태를 저장하고 복원하는 메커니즘

---

## Session Continuity Protocol

### 문제점

Claude Code는 다음 제약이 있습니다:
- 단일 세션 컨텍스트 제한 (자동 요약됨)
- 실제 "무한 루프" 불가능
- 장시간 작업 시 세션 재시작 필요

### 해결책: State Checkpoint System

```
┌─────────────────────────────────────────────────────────────────┐
│                    STATE CHECKPOINT SYSTEM                       │
│                                                                 │
│  매 Phase 완료 시:                                              │
│  1. 현재 상태를 파일로 저장                                      │
│  2. 다음 세션에서 상태 복원 가능                                 │
│  3. 중단된 지점부터 재개                                         │
│                                                                 │
│  저장 위치: .claude/workflow-state/                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## State File Structure

### 1. Checkpoint File

```yaml
# .claude/workflow-state/checkpoint.yaml

session_id: "2024-12-28-001"
iteration: 2
current_phase: "PHASE_4_CODE_REVIEW"
score: 72

last_updated: "2024-12-28T15:30:00Z"

requirements:
  total: 15
  completed: 11
  pending: 4

tests:
  passed: 47
  failed: 3
  coverage: 85

issues:
  critical: 0
  high: 2
  medium: 5

next_action: "Fix 2 high-priority issues before Phase 5"
```

### 2. Requirements Tracker

```yaml
# .claude/workflow-state/requirements.yaml

requirements:
  - id: REQ-001
    description: "사용자 인증 기능"
    status: completed
    tests: ["auth.test.ts"]

  - id: REQ-002
    description: "프로필 편집"
    status: in_progress
    tests: []
    blockers: ["API 미구현"]

  - id: REQ-003
    description: "알림 시스템"
    status: discovered  # 자동 발굴된 요구사항
    source: "implicit-discoverer agent"
```

### 3. Evidence Log

```yaml
# .claude/workflow-state/evidence.yaml

iterations:
  - iteration: 1
    timestamp: "2024-12-28T14:00:00Z"
    phase_results:
      planning:
        requirements_found: 12
        documents_analyzed: ["CLAUDE.md", "PRD.md"]
      tdd:
        tests_written: 35
        tests_passed: 30
      testing:
        coverage: 78
        build: success
      review:
        security_issues: 1
        performance_issues: 2
    score: 65
    gaps: ["MFA 미구현", "에러 처리 미흡"]

  - iteration: 2
    timestamp: "2024-12-28T15:30:00Z"
    # ... 현재 진행 중
```

---

## Resumption Protocol

### 세션 재시작 시

```markdown
## 상태 복원 순서

1. Checkpoint 파일 확인
   ```
   Read .claude/workflow-state/checkpoint.yaml
   ```

2. 현재 상태 로드
   - iteration 번호
   - 현재 phase
   - 점수
   - 미완료 항목

3. 중단 지점부터 재개
   - 해당 Phase의 서브에이전트 재실행
   - 이전 결과 참조하여 누적 진행

4. 사용자에게 상태 보고
   ```
   [WORKFLOW RESUMED]
   Iteration: 2
   Phase: CODE_REVIEW
   Score: 72/100
   Pending: 4 requirements, 2 high-priority issues

   Continuing from last checkpoint...
   ```
```

### 자동 복원 명령

사용자가 다음과 같이 말하면 자동 복원:

```
- "continue workflow"
- "resume"
- "계속"
- "이어서"
```

---

## Checkpoint Triggers

### 자동 저장 시점

| 이벤트 | 저장 내용 |
|--------|----------|
| Phase 완료 | 전체 상태 + Phase 결과 |
| 점수 산정 완료 | 점수 + 세부 항목 |
| 주요 기능 구현 완료 | 요구사항 상태 |
| 오류 발생 | 오류 상태 + 복구 정보 |
| 5분마다 (자동) | 현재 진행 상태 |

### 저장 명령

```yaml
# Phase 완료 시 자동 실행
Tool: Task
subagent_type: "general-purpose"
description: "Save workflow checkpoint"
prompt: |
  현재 워크플로우 상태를 저장하세요.

  저장 위치: .claude/workflow-state/

  저장 항목:
  1. checkpoint.yaml - 현재 상태 요약
  2. requirements.yaml - 요구사항 추적
  3. evidence.yaml - 증거 로그

  상태 정보:
  - Iteration: [N]
  - Phase: [PHASE_NAME]
  - Score: [SCORE]/100
  - Requirements: [COMPLETED]/[TOTAL]
  - Issues: [CRITICAL], [HIGH], [MEDIUM]
```

---

## Recovery Scenarios

### Scenario 1: 정상 중단 후 재개

```
1. 이전 세션에서 Phase 3 완료 후 중단
2. checkpoint.yaml에 상태 저장됨
3. 새 세션에서 "continue" 명령
4. Phase 4부터 자동 재개
```

### Scenario 2: 오류로 인한 중단

```
1. Phase 2 TDD 중 빌드 실패
2. 오류 상태 저장
3. 새 세션에서 복원
4. 빌드 오류 수정부터 재시작
```

### Scenario 3: 컨텍스트 한계 도달

```
1. 많은 iteration 후 컨텍스트 소진
2. 자동 상태 저장
3. 새 세션 시작
4. 저장된 상태에서 계속 진행
```

---

## Integration with SKILL.md

스킬 초기화 시 자동으로 상태 확인:

```markdown
## 스킬 시작 시

1. `.claude/workflow-state/` 디렉토리 확인
2. checkpoint.yaml 존재 여부 확인
3. 존재 시:
   - 상태 로드
   - "이전 작업을 계속할까요?" 질문
   - 사용자 확인 후 재개
4. 미존재 시:
   - 새 워크플로우 시작
   - 상태 디렉토리 생성
```

---

## State Management Commands

### 상태 초기화

```bash
# 새 워크플로우 시작 시
rm -rf .claude/workflow-state/
mkdir -p .claude/workflow-state/
```

### 상태 확인

```bash
# 현재 상태 조회
cat .claude/workflow-state/checkpoint.yaml
```

### 수동 백업

```bash
# 상태 백업
cp -r .claude/workflow-state/ .claude/workflow-state-backup-$(date +%Y%m%d)/
```

---

## Summary

```
┌─────────────────────────────────────────────────────────────────┐
│                 SESSION CONTINUITY SUMMARY                       │
│                                                                 │
│  문제: Claude Code는 실제 무한 루프 불가                        │
│                                                                 │
│  해결:                                                          │
│  1. 매 Phase마다 상태 저장                                      │
│  2. 세션 재시작 시 상태 복원                                    │
│  3. 중단 지점부터 재개                                          │
│  4. 누적 점수 및 진행 상황 유지                                 │
│                                                                 │
│  결과: "논리적 무한 루프" 구현                                  │
│        (물리적 제약 내에서 목표 달성까지 반복)                  │
└─────────────────────────────────────────────────────────────────┘
```
