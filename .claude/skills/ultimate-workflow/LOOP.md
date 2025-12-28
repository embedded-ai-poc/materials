# Ultimate Workflow - Infinite Loop Mechanism

> **핵심 원칙**: 100점 달성 전까지 **절대 종료하지 않는다**.
> 무한한 컴퓨팅 파워를 전제로, 수십 번 반복해도 무방하다.

---

## Loop Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                      INFINITE PERFECTION LOOP                       │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    ITERATION COUNTER                         │  │
│  │                    Current: N (no limit)                     │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                │                                    │
│  ┌────────────────────────────┼────────────────────────────────┐  │
│  │                            ▼                                 │  │
│  │  PHASE 1 ──▶ PHASE 2 ──▶ PHASE 3 ──▶ PHASE 4 ──▶ PHASE 5  │  │
│  │  Planning    TDD Dev      Testing     Review     Scoring    │  │
│  │                                                              │  │
│  └──────────────────────────────────────────────┬───────────────┘  │
│                                                  │                  │
│                           ┌──────────────────────┴──────────┐      │
│                           │                                 │      │
│                           ▼                                 ▼      │
│                    ┌────────────┐                   ┌────────────┐ │
│                    │ SCORE=100? │                   │ SCORE<100? │ │
│                    └─────┬──────┘                   └─────┬──────┘ │
│                          │                                │        │
│                          ▼                                ▼        │
│                    ┌────────────┐                   ┌────────────┐ │
│                    │   EXIT     │                   │  PHASE 6   │ │
│                    │  SUCCESS   │                   │ Gap Analyze│ │
│                    └────────────┘                   └─────┬──────┘ │
│                                                           │        │
│                                                           │        │
│         ┌─────────────────────────────────────────────────┘        │
│         │                                                          │
│         ▼                                                          │
│    ┌─────────────────────────────────────────────────────────┐    │
│    │                    LOOP BACK                             │    │
│    │                                                          │    │
│    │  • iteration++                                          │    │
│    │  • 부족점 목록 업데이트                                  │    │
│    │  • 새로운 요구사항 추가                                  │    │
│    │  • PHASE 1 재시작                                       │    │
│    └──────────────────────────────────────────────────────────┘    │
│                           │                                        │
│                           │                                        │
│                           └────────────────▲───────────────────────┘
│                                            │
│                                            │
│                                    ┌───────────────┐
│                                    │  NO LIMIT     │
│                                    │  MAX_ITER=∞   │
│                                    └───────────────┘
└─────────────────────────────────────────────────────────────────────┘
```

---

## Loop State Machine

### States

```typescript
enum LoopState {
  INITIALIZING = "INITIALIZING",
  PLANNING = "PLANNING",           // Phase 1
  DEVELOPING = "DEVELOPING",       // Phase 2
  TESTING = "TESTING",             // Phase 3
  REVIEWING = "REVIEWING",         // Phase 4
  SCORING = "SCORING",             // Phase 5
  GAP_ANALYZING = "GAP_ANALYZING", // Phase 6
  LOOPING_BACK = "LOOPING_BACK",
  COMPLETED = "COMPLETED"
}

interface LoopContext {
  iteration: number;           // 현재 반복 횟수 (제한 없음)
  state: LoopState;
  score: number;               // 0-100
  scoreHistory: number[];      // 각 iteration의 점수 기록

  gaps: Gap[];                 // 발견된 부족점
  pendingRequirements: Requirement[];  // 미완료 요구사항
  completedRequirements: Requirement[];

  startTime: Date;
  lastPhaseCompleted: Date;

  // 진행 추적
  phasesCompleted: {
    planning: boolean;
    development: boolean;
    testing: boolean;
    review: boolean;
    scoring: boolean;
    gapAnalysis: boolean;
  };
}
```

### Transitions

```
INITIALIZING
    ↓ (context loaded)
PLANNING
    ↓ (all analyzers complete)
DEVELOPING
    ↓ (all features implemented)
TESTING
    ↓ (tests executed)
    ├─ if tests fail → DEVELOPING (mini loop)
    └─ if tests pass → REVIEWING
REVIEWING
    ↓ (all reviewers complete)
    ├─ if critical issues → DEVELOPING (mini loop)
    └─ if no critical → SCORING
SCORING
    ↓ (score calculated)
    ├─ if score = 100 → COMPLETED (EXIT)
    └─ if score < 100 → GAP_ANALYZING
GAP_ANALYZING
    ↓ (gaps identified)
LOOPING_BACK
    ↓ (context updated)
PLANNING (iteration++)
```

---

## Phase 6: Gap Analysis & Loop Back

### 목표

점수 미달 시 **자동으로** 부족한 부분을 발견하고 다음 iteration을 준비

### 서브에이전트 구성

```
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 6: GAP ANALYSIS                        │
│                                                                 │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐       │
│  │     gap       │  │   feature     │  │   priority    │       │
│  │   analyzer    │  │  discoverer   │  │    ranker     │       │
│  └───────┬───────┘  └───────┬───────┘  └───────┬───────┘       │
│          │                  │                  │                │
│  ┌───────┴──────────────────┴──────────────────┴───────┐       │
│  │                  PARALLEL EXECUTION                  │       │
│  └───────┬──────────────────┬──────────────────┬───────┘       │
│          │                  │                  │                │
│  ┌───────┴───────┐  ┌───────┴───────┐  ┌───────┴───────┐       │
│  │    plan       │  │   document    │  │    score      │       │
│  │   updater     │  │   validator   │  │  predictor    │       │
│  └───────────────┘  └───────────────┘  └───────────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

### 서브에이전트 상세

#### gap-analyzer (부족점 분석)
```yaml
Task invocation:
  subagent_type: "general-purpose"
  prompt: |
    현재 점수와 스코어링 결과를 분석하여 부족점을 식별하세요.

    현재 점수: [CURRENT_SCORE]/100

    각 영역별 분석:
    - 요구사항 충족: [REQ_SCORE]/25 → 미달 원인?
    - 테스트 커버리지: [TEST_SCORE]/25 → 미달 원인?
    - 코드 품질: [QUALITY_SCORE]/25 → 미달 원인?
    - 베스트 프랙티스: [PRACTICE_SCORE]/25 → 미달 원인?

    출력:
    1. 점수 미달 항목 목록
    2. 각 항목의 원인 분석
    3. 개선 방향 제안
```

#### feature-discoverer (누락 기능 발견)
```yaml
Task invocation:
  subagent_type: "general-purpose"
  prompt: |
    원본 요구사항과 현재 구현을 비교하여 누락된 기능을 발견하세요.

    원본 요구사항:
    [ORIGINAL_REQUIREMENTS]

    현재 구현된 기능:
    [IMPLEMENTED_FEATURES]

    발견 항목:
    1. 명시적 요구사항 중 미구현 항목
    2. 암묵적 요구사항 중 미구현 항목
    3. 부분적으로 구현된 항목
    4. 구현되었으나 불완전한 항목

    WebSearch를 사용하여 유사 시스템에서 필요한 추가 기능도 조사하세요.
```

#### priority-ranker (우선순위 결정)
```yaml
Task invocation:
  subagent_type: "general-purpose"
  prompt: |
    발견된 부족점들의 우선순위를 결정하세요.

    부족점 목록:
    [GAP_LIST]

    우선순위 기준:
    1. 점수 영향도 (높은 점수 개선 우선)
    2. 의존성 (선행 작업 우선)
    3. 복잡도 (빠른 개선 우선)
    4. 중요도 (Critical > High > Medium > Low)

    출력: 우선순위화된 작업 목록
```

#### plan-updater (계획 업데이트)
```yaml
Task invocation:
  subagent_type: "general-purpose"
  prompt: |
    다음 iteration을 위한 계획을 업데이트하세요.

    현재 iteration: [N]
    점수: [SCORE]/100
    부족점: [GAPS]

    업데이트 항목:
    1. 요구사항 체크리스트에 새 항목 추가
    2. Task Breakdown 업데이트
    3. 우선순위 재조정
    4. 예상 개선 점수 산정

    다음 iteration 목표: 최소 [SCORE + 10]점 달성
```

#### score-predictor (점수 예측)
```yaml
Task invocation:
  subagent_type: "general-purpose"
  prompt: |
    다음 iteration 후 예상 점수를 예측하세요.

    현재 점수: [SCORE]
    계획된 개선 사항: [IMPROVEMENTS]

    각 개선 사항의 점수 기여도 산정:
    - [개선1]: +X점 예상
    - [개선2]: +Y점 예상
    - ...

    예상 총점: ??/100

    100점 달성 가능 여부 판단.
    불가능시 추가 필요 사항 제안.
```

---

## Loop Back Protocol

### Step 1: Gap Analysis 완료 확인

```markdown
## Gap Analysis Results

### 점수 분석
| 영역 | 현재 점수 | 목표 | 갭 |
|------|----------|------|-----|
| 요구사항 | XX/25 | 25 | -X |
| 테스트 | XX/25 | 25 | -X |
| 품질 | XX/25 | 25 | -X |
| 프랙티스 | XX/25 | 25 | -X |
| **TOTAL** | **XX/100** | 100 | -X |

### 발견된 부족점
| ID | 부족점 | 영향 영역 | 점수 기여 | 우선순위 |
|----|--------|---------|---------|---------|
| GAP-001 | ... | 요구사항 | +5점 | P1 |
| GAP-002 | ... | 테스트 | +3점 | P2 |
| ... | ... | ... | ... | ... |

### 다음 Iteration 계획
- 예상 점수: XX → YY점 (+Z점)
- 주요 개선 항목: N개
- 예상 완료 조건 달성: Yes/No
```

### Step 2: Context Update

```typescript
function updateLoopContext(
  context: LoopContext,
  gapAnalysisResult: GapAnalysisResult
): LoopContext {
  return {
    ...context,
    iteration: context.iteration + 1,
    state: LoopState.LOOPING_BACK,
    scoreHistory: [...context.scoreHistory, context.score],

    // 새로운 요구사항 추가
    pendingRequirements: [
      ...context.pendingRequirements,
      ...gapAnalysisResult.newRequirements
    ],

    // 부족점 업데이트
    gaps: gapAnalysisResult.gaps,

    // Phase 상태 리셋
    phasesCompleted: {
      planning: false,
      development: false,
      testing: false,
      review: false,
      scoring: false,
      gapAnalysis: false
    }
  };
}
```

### Step 3: Phase 1 재시작

```
Loop Back 완료 → PHASE 1: Planning 재시작

Planning에서 참조할 정보:
- 이전 iteration 점수
- 발견된 부족점 목록
- 새로 추가된 요구사항
- 우선순위화된 작업 목록
```

---

## No Limit Policy

### 왜 무한 루프인가?

```
"무한한 컴퓨팅 파워를 전제로 한다"

따라서:
- MAX_ITERATIONS = ∞ (제한 없음)
- 수십 번 반복해도 허용
- 수십 시간 소요해도 허용
- 수십 개의 서브에이전트 동시 실행 허용

목표: 100점 달성

100점 달성 전까지 = 종료 불가
```

### 예외 없음

```
❌ "시간이 오래 걸렸으니 이만 마무리하자" → 금지
❌ "충분히 좋아졌으니 95점으로 끝내자" → 금지
❌ "10번 반복했으니 종료하자" → 금지
❌ "비용이 많이 들었으니 중단하자" → 금지

✅ 오직 100점일 때만 종료 가능
```

---

## Progress Tracking

### Iteration Dashboard

```markdown
## Ultimate Workflow Progress

### Current Status
- Iteration: N
- Current Phase: PHASE X
- Current Score: XX/100
- Target Score: 100

### Score History
| Iteration | Score | +/- | Major Changes |
|-----------|-------|-----|---------------|
| 1 | 45 | - | Initial implementation |
| 2 | 62 | +17 | Added missing features |
| 3 | 78 | +16 | Fixed security issues |
| 4 | 89 | +11 | Improved test coverage |
| 5 | 95 | +6 | Best practice fixes |
| 6 | 98 | +3 | Documentation complete |
| 7 | 100 | +2 | All issues resolved ✅ |

### Time Elapsed
- Start: YYYY-MM-DD HH:MM:SS
- Current: YYYY-MM-DD HH:MM:SS
- Elapsed: XX hours YY minutes

### Subagent Usage
- Total Spawned: XXX
- Currently Active: XX
- Completed: XXX
```

### Real-time Logging

```markdown
[Iteration 1] PHASE 1: Planning started
[Iteration 1] → Spawned 6 analyzer agents
[Iteration 1] → All analyzers complete
[Iteration 1] PHASE 2: TDD Development started
[Iteration 1] → Implementing 10 features in parallel
...
[Iteration 1] PHASE 5: Scoring complete
[Iteration 1] → Score: 45/100
[Iteration 1] → LOOPING BACK (score < 100)

[Iteration 2] PHASE 1: Planning started (with gap analysis results)
...
[Iteration 7] PHASE 5: Scoring complete
[Iteration 7] → Score: 100/100
[Iteration 7] → EXIT SUCCESS ✅
```

---

## Mini Loops (Inner Loops)

### Testing → Development Mini Loop

```
PHASE 3 (Testing)
    │
    ├─ Tests Pass → Continue to PHASE 4
    │
    └─ Tests Fail → Mini Loop
        │
        ├─ Analyze failures
        ├─ Fix implementation
        ├─ Re-run tests
        └─ Repeat until pass
```

### Review → Development Mini Loop

```
PHASE 4 (Review)
    │
    ├─ No Critical Issues → Continue to PHASE 5
    │
    └─ Critical Issues Found → Mini Loop
        │
        ├─ Prioritize issues
        ├─ Fix each issue
        ├─ Re-review
        └─ Repeat until clean
```

---

## Loop Termination Conditions

### 성공 종료 (유일한 정상 종료)

```typescript
function checkTermination(context: LoopContext): boolean {
  // 유일한 종료 조건: 100점 달성
  if (context.score === 100) {
    console.log("✅ 100점 달성! 워크플로우 완료.");
    return true;
  }

  // 그 외 모든 경우: 계속 진행
  console.log(`⚠️ 현재 ${context.score}점. 100점까지 계속 진행...`);
  return false;
}
```

### 강제 종료 (사용자 개입만 가능)

```
사용자가 명시적으로 "중단"을 요청할 때만 종료 가능.
AI가 자체적으로 종료 결정 불가.
```

---

## Preventing Premature Termination

### 할루시네이션 기반 종료 방지

```markdown
## 금지된 종료 패턴

1. "이 정도면 충분히 좋은 것 같습니다" → 금지
2. "거의 완성되었으므로 마무리하겠습니다" → 금지
3. "시간 관계상 여기서 종료합니다" → 금지
4. "더 이상 개선할 것이 없어 보입니다" → 금지

## 강제 검증

모든 "완료" 판단 전:
□ 점수가 정확히 100인가?
□ 모든 요구사항이 ✅ 완료 상태인가?
□ 모든 테스트가 통과했는가?
□ 모든 리뷰 이슈가 해결되었는가?
□ 3개 이상의 독립 validator가 동일 결론인가?

하나라도 NO → 루프 계속
```

### 자동 검증 게이트

```
PHASE 5 → 종료 판단 → 자동 검증 게이트
                          │
                          ├─ 점수 확인 (100?)
                          ├─ 요구사항 확인 (all ✅?)
                          ├─ 테스트 확인 (all pass?)
                          ├─ 리뷰 확인 (no critical?)
                          └─ Multi-validator consensus?
                                │
                    ┌───────────┴───────────┐
                    ▼                       ▼
              모두 YES                  하나라도 NO
                    │                       │
                    ▼                       ▼
                 EXIT                 LOOP BACK
```

---

## Loop Optimization

### 점수 수렴 감지

```typescript
function detectConvergence(scoreHistory: number[]): boolean {
  if (scoreHistory.length < 3) return false;

  const last3 = scoreHistory.slice(-3);
  const improvement = last3[2] - last3[0];

  // 3회 연속 1점 미만 개선 = 수렴
  if (improvement < 1) {
    console.log("⚠️ 점수 수렴 감지. 전략 변경 필요.");
    return true;
  }

  return false;
}
```

### 전략 변경 트리거

```
점수 수렴 감지 시:
1. 더 깊은 Gap Analysis 수행
2. 외부 웹 조사 강화 (WebSearch)
3. 다른 접근법 시도
4. 전문가 패널 (sc:spec-panel) 활용

절대 종료하지 않음. 전략만 변경.
```

---

## Example: Complete Loop Sequence

```markdown
## Ultimate Workflow Execution Log

### Initialization
- User Requirement: "사용자 인증 기능 구현"
- Start Time: 2025-01-15 10:00:00

### Iteration 1
- PHASE 1: Planning (10:00 - 10:15)
  - 5 analyzer agents spawned
  - Requirements identified: 15
  - Implicit requirements discovered: 8

- PHASE 2: TDD Development (10:15 - 11:30)
  - 23 features implemented
  - 47 tests written

- PHASE 3: Testing (11:30 - 11:45)
  - Tests run: 47
  - Passed: 42, Failed: 5
  - Mini loop: Fix 5 failures → Re-test → All pass

- PHASE 4: Code Review (11:45 - 12:00)
  - 5 reviewers spawned
  - Critical: 2, High: 5, Medium: 12
  - Mini loop: Fix critical → Re-review → Clean

- PHASE 5: Scoring (12:00 - 12:10)
  - Requirements: 18/25
  - Tests: 20/25
  - Quality: 15/25
  - Practices: 12/25
  - **TOTAL: 65/100**

- PHASE 6: Gap Analysis (12:10 - 12:20)
  - Gaps identified: 12
  - New requirements: 5
  - Priority ranked

- **LOOP BACK** (Score < 100)

### Iteration 2
- PHASE 1: Planning (12:20 - 12:30)
  - Updated with 12 gaps
  - Focus areas: Quality, Practices

... (iterations continue)

### Iteration 7
- PHASE 5: Scoring (16:45 - 16:55)
  - Requirements: 25/25
  - Tests: 25/25
  - Quality: 25/25
  - Practices: 25/25
  - **TOTAL: 100/100** ✅

### Completion
- End Time: 2025-01-15 16:55:00
- Total Duration: 6 hours 55 minutes
- Total Iterations: 7
- Total Subagents Spawned: 127

## WORKFLOW COMPLETE ✅
```
