# Ultimate Workflow - Anti-Hallucination Protocol

> **핵심 원칙**: 모든 판단은 **증거 기반**으로만.
> 추측, 가정, "아마도"는 절대 금지.

---

## Hallucination Prevention Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                 ANTI-HALLUCINATION SYSTEM                           │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │                   VERIFICATION LAYERS                       │    │
│  │                                                             │    │
│  │  Layer 1: Evidence-Based Only                              │    │
│  │           → 모든 결론은 실제 도구 실행 결과로만            │    │
│  │                                                             │    │
│  │  Layer 2: Multi-Agent Consensus                            │    │
│  │           → 최소 3개 독립 에이전트가 동일 결론             │    │
│  │                                                             │    │
│  │  Layer 3: Explicit Verification                            │    │
│  │           → 체크리스트 기반 명시적 확인                    │    │
│  │                                                             │    │
│  │  Layer 4: No Premature Termination                         │    │
│  │           → 100점 외 종료 조건 없음                        │    │
│  └────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Layer 1: Evidence-Based Only

### 금지된 표현

```markdown
## ❌ 절대 금지되는 표현

1. 추측 표현:
   - "아마 완료된 것 같습니다"
   - "거의 다 된 것 같습니다"
   - "충분히 좋아 보입니다"
   - "대략 90점 정도 될 것 같습니다"

2. 가정 표현:
   - "테스트가 통과할 것입니다"
   - "빌드가 성공할 것입니다"
   - "문제가 없을 것입니다"

3. 조기 종료 표현:
   - "시간이 오래 걸렸으니 이만..."
   - "이 정도면 충분합니다"
   - "더 이상 개선할 것이 없습니다"

4. 주관적 판단:
   - "좋은 코드입니다"
   - "완성도가 높습니다"
   - "훌륭한 구현입니다"
```

### 필수 증거 형식

```markdown
## ✅ 필수 증거 형식

1. 테스트 결과:
   ```
   $ npm run test

   Tests: 47 passed, 0 failed
   Coverage: 85%
   ```
   → 실제 명령 실행 결과 포함

2. 빌드 결과:
   ```
   $ npm run build

   ✓ compiled successfully
   Build time: 12.3s
   Bundle size: 245kb
   ```
   → 실제 빌드 출력 포함

3. 점수 근거:
   ```
   요구사항 충족: 23/25 (92%)
   - REQ-001: ✅ 구현 완료 (테스트 통과)
   - REQ-002: ✅ 구현 완료 (테스트 통과)
   - REQ-003: ⬜ 미구현
   ```
   → 각 항목별 구체적 근거
```

---

## Layer 2: Multi-Agent Consensus

### 다수결 원칙

```
┌─────────────────────────────────────────────────────────────────┐
│                 MULTI-AGENT CONSENSUS                           │
│                                                                 │
│  중요 판단 시 최소 3개 독립 에이전트가 동일 결론 필요          │
│                                                                 │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐                   │
│  │ Validator │  │ Validator │  │ Validator │                   │
│  │     A     │  │     B     │  │     C     │                   │
│  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘                   │
│        │              │              │                          │
│        ▼              ▼              ▼                          │
│     Score: 87      Score: 85      Score: 88                    │
│                                                                 │
│                  ┌───────────┐                                  │
│                  │ CONSENSUS │                                  │
│                  │           │                                  │
│                  │ 85-88 범위│                                  │
│                  │ 중앙값: 87│                                  │
│                  │           │                                  │
│                  │ ✅ 합의됨 │                                  │
│                  └───────────┘                                  │
│                                                                 │
│  만약 Validator C가 95점을 산정했다면:                         │
│  → 85, 87, 95 = 편차 과다 (10점 이상)                          │
│  → ❌ 합의 실패 → 추가 검증 필요                               │
└─────────────────────────────────────────────────────────────────┘
```

### Consensus Algorithm

```typescript
interface ValidatorResult {
  agentId: string;
  score: number;
  evidence: string[];
  timestamp: Date;
}

function checkConsensus(results: ValidatorResult[]): {
  consensus: boolean;
  finalScore: number;
  reason: string;
} {
  if (results.length < 3) {
    return {
      consensus: false,
      finalScore: 0,
      reason: "최소 3개 validator 결과 필요"
    };
  }

  const scores = results.map(r => r.score);
  const median = calculateMedian(scores);
  const maxDeviation = Math.max(...scores.map(s => Math.abs(s - median)));

  // 편차가 5점 이내면 합의
  if (maxDeviation <= 5) {
    return {
      consensus: true,
      finalScore: median,
      reason: `${results.length}개 validator 합의 (편차 ${maxDeviation}점)`
    };
  }

  // 편차가 5점 초과면 추가 검증 필요
  return {
    consensus: false,
    finalScore: median,
    reason: `편차 과다 (${maxDeviation}점). 추가 검증 필요.`
  };
}
```

---

## Layer 3: Explicit Verification

### 완료 판단 체크리스트

```markdown
## 완료 판단 전 필수 체크리스트

### 1. 테스트 검증
□ `npm run test` 실제 실행했는가?
□ 모든 테스트가 통과했는가? (0 failed)
□ 테스트 출력을 확인했는가?

### 2. 빌드 검증
□ `npm run build` 실제 실행했는가?
□ 빌드가 성공했는가? (exit code 0)
□ TypeScript 에러가 0개인가?

### 3. 요구사항 검증
□ 모든 요구사항이 체크리스트에 ✅ 표시되었는가?
□ 각 요구사항에 대해 테스트가 존재하는가?
□ 각 요구사항의 AC가 충족되었는가?

### 4. 코드 리뷰 검증
□ Critical 이슈가 0개인가?
□ High 이슈가 0개인가?
□ 모든 리뷰 코멘트가 해결되었는가?

### 5. 점수 검증
□ 정확히 100점인가?
□ 3개 이상 validator가 동일 점수를 산정했는가?
□ 각 영역이 모두 만점인가? (25/25 × 4)

하나라도 NO → 루프 계속
```

### 자동 검증 게이트

```yaml
Task: verification-gate
subagent_type: "general-purpose"
prompt: |
  완료 판단 전 자동 검증을 수행하세요.

  필수 검증 항목:
  1. `npm run test` 실행 → 모든 테스트 통과?
  2. `npm run build` 실행 → 빌드 성공?
  3. 요구사항 체크리스트 → 모두 ✅?
  4. 코드 리뷰 이슈 → Critical/High 0개?
  5. 점수 → 정확히 100?

  각 항목을 실제로 실행하고 결과를 보고하세요.
  추측하지 마세요.

  출력 형식:
  ✅ 테스트: PASS (47/47)
  ✅ 빌드: SUCCESS
  ✅ 요구사항: 25/25 완료
  ✅ 리뷰: Critical 0, High 0
  ✅ 점수: 100/100

  → 모두 ✅ → 종료 가능
  → 하나라도 ❌ → 루프 계속
```

---

## Layer 4: No Premature Termination

### 종료 조건 강제

```typescript
function canTerminate(context: LoopContext): {
  canTerminate: boolean;
  reason: string;
  evidence: string[];
} {
  // 유일한 종료 조건: 100점
  if (context.score !== 100) {
    return {
      canTerminate: false,
      reason: `점수 ${context.score}/100. 100점 필요.`,
      evidence: []
    };
  }

  // 추가 검증: 모든 체크리스트 완료
  const incompleteItems = context.pendingRequirements.filter(
    r => r.status !== 'completed'
  );

  if (incompleteItems.length > 0) {
    return {
      canTerminate: false,
      reason: `${incompleteItems.length}개 요구사항 미완료`,
      evidence: incompleteItems.map(i => i.id)
    };
  }

  // 추가 검증: 다수결 합의
  if (!context.consensusAchieved) {
    return {
      canTerminate: false,
      reason: "Validator 합의 미달성",
      evidence: []
    };
  }

  return {
    canTerminate: true,
    reason: "모든 조건 충족",
    evidence: [
      `점수: ${context.score}/100`,
      `요구사항: ${context.completedRequirements.length}개 완료`,
      `Validator 합의: 달성`
    ]
  };
}
```

### 강제 루프백 트리거

```
조기 종료 시도 감지 시:

1. "이 정도면 충분합니다" 패턴 감지
   → 자동 질문: "점수가 100점인가요?"
   → 100점 아니면 → 루프백 강제

2. "시간이 오래 걸렸습니다" 패턴 감지
   → 자동 응답: "시간 제한 없음. 100점까지 계속."
   → 루프백 강제

3. "더 이상 개선할 것이 없습니다" 패턴 감지
   → 자동 질문: "점수가 100점인가요?"
   → 100점 아니면 → Gap Analysis 재실행
```

---

## Evidence Collection

### 필수 증거 수집 에이전트

```yaml
Task: evidence-collector
subagent_type: "general-purpose"
prompt: |
  모든 판단에 필요한 증거를 수집하세요.

  수집 항목:
  1. 테스트 실행 결과 (npm run test 출력)
  2. 빌드 실행 결과 (npm run build 출력)
  3. 커버리지 리포트 (npm run test:coverage 출력)
  4. 린트 결과 (npm run lint 출력)
  5. 타입 체크 결과 (tsc --noEmit 출력)

  각 명령을 실제로 실행하고 전체 출력을 캡처하세요.
  출력을 요약하지 말고 전체를 포함하세요.
```

### 증거 저장 형식

```markdown
## Evidence Log

### Iteration: N
### Timestamp: YYYY-MM-DD HH:MM:SS

---

### Test Execution
```
$ npm run test

> mintportal@1.0.0 test
> vitest

 ✓ src/components/__tests__/BuildCard.test.ts (5 tests)
 ✓ src/api/__tests__/build.test.ts (8 tests)
 ...

 Test Files  12 passed (12)
      Tests  47 passed (47)
   Duration  3.45s
```

### Build Execution
```
$ npm run build

> mintportal@1.0.0 build
> vite build

vite v7.0.0 building for production...
✓ 127 modules transformed.
dist/index.html                   0.45 kB
dist/assets/index-xxx.js        245.32 kB

Build completed in 12.3s
```

### Coverage Report
```
$ npm run test:coverage

... [full coverage output]

Coverage: 85.3%
- Statements: 87%
- Branches: 82%
- Functions: 89%
- Lines: 85%
```

---

### Conclusion
Based on above evidence:
- Tests: ✅ 47/47 passed
- Build: ✅ Success
- Coverage: ⚠️ 85% (target: 80%)
- Score: 87/100

→ NOT 100 → Continue loop
```

---

## Hallucination Detection

### 패턴 감지

```typescript
const HALLUCINATION_PATTERNS = [
  // 추측 표현
  /아마.*것 같/,
  /거의.*완료/,
  /충분히.*좋/,
  /대략.*점/,

  // 가정 표현
  /.*할 것입니다/,
  /.*될 것입니다/,
  /문제.*없을/,

  // 조기 종료 표현
  /시간.*오래/,
  /이만.*마무리/,
  /더 이상.*없/,

  // 주관적 판단
  /좋은 코드/,
  /훌륭한 구현/,
  /완성도.*높/
];

function detectHallucination(text: string): {
  detected: boolean;
  patterns: string[];
} {
  const foundPatterns = HALLUCINATION_PATTERNS.filter(
    pattern => pattern.test(text)
  );

  return {
    detected: foundPatterns.length > 0,
    patterns: foundPatterns.map(p => p.toString())
  };
}
```

### 자동 수정

```
할루시네이션 패턴 감지 시:

1. 해당 판단 무효화
2. 증거 기반 재검증 요청
3. 다수결 validator 재실행
4. 수정된 결과로 대체
```

---

## Continuous Vigilance

### 매 Phase에서 검증

```
PHASE 1: Planning
├── 요구사항 추출 근거 확인
├── 모든 요구사항에 출처 명시
└── 가정/추측 표현 검출

PHASE 2: TDD Development
├── 각 테스트 실제 실행 확인
├── 테스트 결과 캡처
└── 구현 완료 기준 명시

PHASE 3: Testing
├── 모든 테스트 실행 로그 캡처
├── 커버리지 수치 실측
└── 실패 테스트 구체적 명시

PHASE 4: Code Review
├── 리뷰 결과 구체적 근거
├── 각 이슈에 파일:라인 명시
└── 수정 내역 추적

PHASE 5: Completeness Check
├── 각 점수 항목 근거 명시
├── 다수결 합의 확인
└── 100점 외 종료 불가
```

---

## Summary

```
┌─────────────────────────────────────────────────────────────────┐
│                 ANTI-HALLUCINATION SUMMARY                      │
│                                                                 │
│  원칙 1: 모든 판단은 실제 도구 실행 결과로만                   │
│  원칙 2: 최소 3개 독립 에이전트 다수결 필요                    │
│  원칙 3: 체크리스트 기반 명시적 확인 필수                      │
│  원칙 4: 100점 외 종료 조건 없음                               │
│                                                                 │
│  금지: 추측, 가정, 주관적 판단, 조기 종료                      │
│  필수: 증거, 로그, 다수결, 체크리스트                          │
└─────────────────────────────────────────────────────────────────┘
```
