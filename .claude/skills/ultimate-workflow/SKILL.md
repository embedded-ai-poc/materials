---
name: ultimate-workflow
description: |
  Complete implementation workflow with parallel expert validation: Planning → TDD → Testing → Code Review → Completeness Check.
  Iterates until 100-point completion score. Auto-discovers gaps and self-improves.
  Use when user says "ultimate workflow", "100 points", "perfect implementation", "complete this perfectly",
  or needs exhaustive multi-file implementation with full testing and validation.
allowed-tools: Task, Bash, Read, Write, Edit, Grep, Glob, WebSearch, WebFetch, TodoWrite
---

# Ultimate Workflow - Infinite Perfection Loop

> **Philosophy**: 무한한 컴퓨팅 파워를 활용하여 가장 철저하고 정확한 결과를 도출한다.
> 효율성보다 정확성. 수십 개의 서브에이전트가 수십 시간 동작해도 무방하다.

## Overview

이 스킬은 사용자의 요구사항을 받아 **완벽한 구현이 될 때까지 무한 루프**로 동작합니다.

```
┌─────────────────────────────────────────────────────────────────────┐
│                    ULTIMATE WORKFLOW LOOP                           │
│                                                                     │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐         │
│  │ PHASE 1  │──▶│ PHASE 2  │──▶│ PHASE 3  │──▶│ PHASE 4  │         │
│  │ Planning │   │   TDD    │   │ Testing  │   │ Review   │         │
│  └──────────┘   └──────────┘   └──────────┘   └──────────┘         │
│                                                      │              │
│                                                      ▼              │
│                                              ┌──────────────┐       │
│                                              │   PHASE 5    │       │
│                                              │ Completeness │       │
│                                              │    Check     │       │
│                                              └──────┬───────┘       │
│                                                     │               │
│                          ┌──────────────────────────┼───────────┐   │
│                          │                          │           │   │
│                          ▼                          ▼           │   │
│                    Score < 100?              Score = 100?       │   │
│                          │                          │           │   │
│                          ▼                          ▼           │   │
│                  ┌──────────────┐            ┌──────────┐       │   │
│                  │   PHASE 6    │            │ COMPLETE │       │   │
│                  │ Gap Analysis │            │  EXIT    │       │   │
│                  │ + Auto-Fix   │            └──────────┘       │   │
│                  └──────┬───────┘                               │   │
│                         │                                       │   │
│                         └───────────── LOOP BACK ───────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Activation Trigger

이 스킬은 다음 상황에서 자동 활성화됩니다:

- 사용자가 "ultimate workflow", "완벽하게 구현", "무한 루프", "100점까지" 언급 시
- 복잡한 기능 구현 요청 시 (3개 이상의 컴포넌트/파일 수정 필요)
- "자동으로", "알아서", "스스로 판단해서" 같은 자율성 키워드 사용 시
- `/ultimate-workflow` 명시적 호출 시

---

## Phase Details

### PHASE 1: Planning (기획)

**목표**: 요구사항의 완전한 이해와 구현 계획 수립

**서브에이전트 병렬 실행**:
1. `requirement-analyzer` - 요구사항 분석 및 분해
2. `codebase-explorer` - 기존 코드베이스 구조 파악
3. `document-analyzer` - 기존 기획문서/PRD 분석
4. `web-researcher` - 최신 베스트 프랙티스 조사
5. `architecture-designer` - 아키텍처 설계

**산출물**:
- 요구사항 체크리스트 (모든 기능 목록)
- 기술 설계 문서
- 작업 분해 목록 (Task Breakdown)
- 의존성 맵

상세: [PHASES.md#phase-1-planning](PHASES.md#phase-1-planning)

---

### PHASE 2: TDD Development (TDD 개발)

**목표**: 테스트 주도 개발로 안전하고 검증 가능한 코드 작성

**순서**:
1. **Red**: 실패하는 테스트 먼저 작성
2. **Green**: 테스트 통과하는 최소 구현
3. **Refactor**: 코드 품질 개선

**서브에이전트 병렬 실행**:
1. `test-writer` - 테스트 코드 작성
2. `implementer` - 기능 구현 (Mock-First 준수)
3. `refactorer` - 코드 리팩토링

**규칙**:
- 모든 새 기능은 테스트 먼저
- Mock 데이터는 `mock-server/db.json`에만
- 컴포넌트 내 하드코딩 mock 절대 금지

상세: [PHASES.md#phase-2-tdd-development](PHASES.md#phase-2-tdd-development)

---

### PHASE 3: Testing (테스트)

**목표**: 모든 레벨에서 완전한 테스트 커버리지 확보

**테스트 유형**:
1. **Unit Tests** - 개별 함수/컴포넌트
2. **Integration Tests** - API 연동
3. **E2E Tests** - 사용자 시나리오

**서브에이전트 병렬 실행**:
1. `unit-test-runner` - 단위 테스트 실행
2. `integration-test-runner` - 통합 테스트 실행
3. `e2e-test-runner` - E2E 테스트 실행
4. `coverage-analyzer` - 커버리지 분석

**성공 기준**:
- 모든 테스트 통과
- 커버리지 80% 이상
- 빌드 성공

상세: [PHASES.md#phase-3-testing](PHASES.md#phase-3-testing)

---

### PHASE 4: Code Review (코드 리뷰)

**목표**: 다각도 품질 검증

**서브에이전트 병렬 실행** (최소 5개):
1. `security-reviewer` - 보안 취약점 분석
2. `performance-reviewer` - 성능 분석
3. `architecture-reviewer` - 아키텍처 일관성
4. `style-reviewer` - 코드 스타일/규칙 준수
5. `best-practice-reviewer` - 베스트 프랙티스 준수

**검토 항목**:
- OWASP Top 10 취약점
- 성능 병목점
- 코드 중복
- 타입 안정성
- 에러 처리

상세: [PHASES.md#phase-4-code-review](PHASES.md#phase-4-code-review)

---

### PHASE 5: Completeness Check (완성도 체크)

**목표**: 100점 만점 기준으로 완성도 평가

**평가 방법**:
1. **웹서칭** - 최신 베스트 프랙티스와 비교
2. **기획문서 분석** - 원본 요구사항 대비 구현 완료율
3. **자동 점수 산정** - 100점 만점

**서브에이전트 병렬 실행**:
1. `web-validator` - 웹서칭으로 베스트 프랙티스 검증
2. `document-validator` - 기획문서 대비 검증
3. `feature-validator` - 기능 완성도 검증
4. `quality-validator` - 품질 기준 검증
5. `score-calculator` - 최종 점수 산정

**점수 체계**: [SCORING.md](SCORING.md) 참조

상세: [PHASES.md#phase-5-completeness-check](PHASES.md#phase-5-completeness-check)

---

### PHASE 6: Gap Analysis & Auto-Fix (갭 분석 및 자동 수정)

**목표**: 100점 미달 시 부족한 부분 자동 발견 및 수정

**동작**:
1. 점수 미달 항목 분석
2. 부족한 기능 자동 식별
3. 추가 구현 계획 수립
4. **PHASE 1로 자동 루프백**

**서브에이전트**:
1. `gap-analyzer` - 부족점 분석
2. `feature-discoverer` - 누락 기능 발견
3. `priority-ranker` - 우선순위 결정
4. `plan-updater` - 계획 업데이트

**루프백 조건**:
- Score < 100 → 무조건 루프백
- 최대 루프 횟수 제한 없음 (무한)

상세: [LOOP.md](LOOP.md)

---

## Orchestration Model

```
                    ┌─────────────────────┐
                    │   ORCHESTRATOR      │
                    │  (Main Controller)  │
                    └──────────┬──────────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         │                     │                     │
         ▼                     ▼                     ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ PARALLEL POOL 1 │  │ PARALLEL POOL 2 │  │ PARALLEL POOL 3 │
│   (Analyzers)   │  │ (Implementers)  │  │  (Validators)   │
├─────────────────┤  ├─────────────────┤  ├─────────────────┤
│ • requirement   │  │ • test-writer   │  │ • security      │
│ • codebase      │  │ • implementer   │  │ • performance   │
│ • document      │  │ • refactorer    │  │ • architecture  │
│ • web-research  │  │ • mock-writer   │  │ • style         │
│ • architecture  │  │                 │  │ • best-practice │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

**원칙**:
- 독립적인 작업은 **항상 병렬 실행**
- 의존성 있는 작업만 순차 실행
- 각 서브에이전트는 **단일 책임**
- 오케스트레이터가 **전역 상태 관리**

---

## State Management

```javascript
// 전역 상태 구조
UltimateWorkflowState = {
  iteration: 0,                    // 현재 루프 횟수
  phase: "PLANNING",               // 현재 단계
  score: 0,                        // 현재 점수 (0-100)

  requirements: {
    original: [],                  // 원본 요구사항
    discovered: [],                // 발견된 추가 요구사항
    completed: [],                 // 완료된 요구사항
    pending: []                    // 미완료 요구사항
  },

  implementation: {
    files_created: [],
    files_modified: [],
    tests_written: [],
    tests_passed: [],
    tests_failed: []
  },

  validation: {
    security_issues: [],
    performance_issues: [],
    style_issues: [],
    missing_features: []
  },

  scoring: {
    requirement_coverage: 0,       // 요구사항 충족률 (25점)
    test_coverage: 0,              // 테스트 커버리지 (25점)
    code_quality: 0,               // 코드 품질 (25점)
    best_practices: 0              // 베스트 프랙티스 (25점)
  }
}
```

---

## Execution Protocol

### Step 0: Session Check (세션 확인)

```markdown
워크플로우 시작 전 이전 세션 확인:

1. `.claude/workflow-state/checkpoint.yaml` 존재 확인
2. 존재 시:
   → 이전 상태 로드
   → "이전 작업(Iteration N, Score M점)을 계속하시겠습니까?" 질문
   → 사용자 확인 시 중단 지점부터 재개
3. 미존재 시:
   → 새 워크플로우 시작
   → `.claude/workflow-state/` 디렉토리 생성
```

### Step 1: Initialization

```markdown
1. 사용자 요구사항 수신
2. CLAUDE.md 및 프로젝트 컨텍스트 로드
3. 기존 기획문서 탐색 (docs/, *.md, PRD 등)
4. 초기 상태 설정 (iteration=0, score=0)
5. 상태 저장 디렉토리 초기화
6. PHASE 1 시작
```

### Step 2: Phase Execution

```markdown
각 Phase에서:
1. 해당 Phase의 모든 서브에이전트 병렬 실행
2. 결과 수집 및 통합
3. 상태 업데이트
4. 다음 Phase로 전이
```

### Step 3: Loop Decision

```markdown
PHASE 5 완료 후:
IF score == 100:
    → 완료 리포트 출력
    → EXIT
ELSE:
    → PHASE 6 (Gap Analysis) 실행
    → iteration++
    → PHASE 1로 루프백
```

---

## Integration Points

### MCP Tools 활용

| Tool | 용도 |
|------|------|
| `Task` | 서브에이전트 생성 및 병렬 실행 |
| `WebSearch` | 베스트 프랙티스 조사 |
| `WebFetch` | 외부 문서 분석 |
| `Grep/Glob` | 코드베이스 탐색 |
| `Read/Write/Edit` | 파일 조작 |
| `Bash` | 빌드/테스트 실행 |
| `LSP` | 코드 인텔리전스 |
| `TodoWrite` | 작업 추적 |

### Existing Skills 연동

이 워크플로우는 다른 스킬들을 내부적으로 호출할 수 있습니다:

- `sc:analyze` - 코드 분석
- `sc:implement` - 구현
- `sc:test` - 테스트 실행
- `sc:research` - 웹 조사
- `sc:document` - 문서화

---

## Success Criteria

**완료 조건** (모두 충족 시 100점):

1. **요구사항 충족** (25점)
   - 모든 명시적 요구사항 구현 완료
   - 발견된 암묵적 요구사항 구현 완료

2. **테스트 커버리지** (25점)
   - 단위 테스트 100% 통과
   - 통합 테스트 100% 통과
   - 빌드 성공

3. **코드 품질** (25점)
   - 보안 취약점 0개
   - 성능 이슈 0개
   - 타입 에러 0개

4. **베스트 프랙티스** (25점)
   - 프로젝트 규칙 100% 준수
   - 업계 표준 준수
   - 문서화 완료

---

## Reference Documents

- [PHASES.md](PHASES.md) - 각 단계 상세 가이드
- [SCORING.md](SCORING.md) - 100점 채점 시스템
- [AGENTS.md](AGENTS.md) - 서브에이전트 정의
- [LOOP.md](LOOP.md) - 무한 루프 메커니즘
- [VALIDATION.md](VALIDATION.md) - 웹서칭/문서 분석 통합
- [RAPID-CYCLE.md](RAPID-CYCLE.md) - 빠른 사이클 + 병렬 전문가 실행
- [ANTI-HALLUCINATION.md](ANTI-HALLUCINATION.md) - 할루시네이션 방지 프로토콜
- [STATE.md](STATE.md) - 상태 저장 및 세션 연속성

---

## Quick Start

사용자가 요구사항을 제공하면:

```
User: "사용자 인증 기능을 구현해줘"

Ultimate Workflow 활성화:
→ PHASE 1: 인증 관련 모든 요구사항 분석
→ PHASE 2: TDD로 인증 기능 구현
→ PHASE 3: 모든 테스트 실행
→ PHASE 4: 보안/성능/아키텍처 리뷰
→ PHASE 5: 완성도 체크 (예: 87점)
→ PHASE 6: 부족점 분석 (MFA 누락, 세션 관리 미흡)
→ LOOP BACK to PHASE 1
→ ... (100점 달성까지 반복)
→ 완료 리포트 출력
```

---

## Notes

- 이 워크플로우는 **무한한 컴퓨팅 파워**를 전제로 설계됨
- 효율성보다 **정확성과 완전성**을 우선시함
- 수십 개의 서브에이전트가 수십 시간 동작해도 무방함
- 100점 달성 전까지 **절대 종료하지 않음**
