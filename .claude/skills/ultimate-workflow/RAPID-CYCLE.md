# Ultimate Workflow - Rapid Cycle Execution

> **핵심 원칙**: 빠르고 반복적인 사이클 + 병렬 전문가 실행
> 모든 독립 작업은 동시에, 모든 전문가는 병렬로.

---

## Rapid Cycle Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                     RAPID CYCLE ENGINE                              │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    PARALLEL EXPERT POOL                      │   │
│  │                                                              │   │
│  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐  │   │
│  │  │SEC  │ │PERF │ │ARCH │ │STYLE│ │TEST │ │DOC  │ │BEST │  │   │
│  │  │urityreviewer│ │ormreview│ │itecture│ │check│ │runner│ │ument│ │Practice│  │   │
│  │  └──┬──┘ └──┬──┘ └──┬──┘ └──┬──┘ └──┬──┘ └──┬──┘ └──┬──┘  │   │
│  │     │       │       │       │       │       │       │      │   │
│  │     └───────┴───────┴───────┼───────┴───────┴───────┘      │   │
│  │                             │                               │   │
│  │                    ┌────────┴────────┐                      │   │
│  │                    │   AGGREGATOR    │                      │   │
│  │                    │   (병렬 결과    │                      │   │
│  │                    │    통합)        │                      │   │
│  │                    └────────┬────────┘                      │   │
│  └─────────────────────────────┼───────────────────────────────┘   │
│                                │                                    │
│                                ▼                                    │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                     RAPID ITERATION                          │   │
│  │                                                              │   │
│  │    Cycle 1 → Cycle 2 → Cycle 3 → ... → Cycle N (100점)      │   │
│  │      ↑         ↑         ↑                  ↑               │   │
│  │      │         │         │                  │               │   │
│  │    Gap Fix   Gap Fix   Gap Fix           COMPLETE           │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Expert Pool (전문가 풀)

### 상시 가동 전문가 (7개 병렬)

| ID | 전문가 | 역할 | 도구 |
|----|--------|------|------|
| `security-expert` | 보안 전문가 | OWASP 기반 보안 검증 | Grep, Read |
| `performance-expert` | 성능 전문가 | 성능 병목점 분석 | Grep, Read, Bash |
| `architecture-expert` | 아키텍처 전문가 | 구조/패턴 검증 | Read, Grep, LSP |
| `style-expert` | 코드 스타일 전문가 | 린트/포맷팅 검증 | Bash, Read |
| `test-expert` | 테스트 전문가 | 테스트 실행/커버리지 | Bash, Read |
| `doc-expert` | 문서화 전문가 | 주석/문서 검증 | Read, Grep |
| `best-practice-expert` | 베스트 프랙티스 전문가 | 업계 표준 검증 | WebSearch, Read |

### 전문가 정의

```yaml
# 모든 전문가는 병렬로 동시 실행됨

security-expert:
  subagent_type: "general-purpose"
  prompt: |
    당신은 보안 전문가입니다.

    실시간으로 다음을 검증하세요:
    1. XSS 취약점
    2. SQL/Command Injection
    3. 인증/인가 결함
    4. 민감 데이터 노출
    5. OWASP Top 10

    발견 즉시 보고하세요.
    다른 전문가와 병렬로 실행됩니다.
  tools: ["Grep", "Read"]

performance-expert:
  subagent_type: "general-purpose"
  prompt: |
    당신은 성능 전문가입니다.

    실시간으로 다음을 검증하세요:
    1. 불필요한 리렌더링
    2. 메모리 누수 가능성
    3. 무한 루프 위험
    4. N+1 쿼리 패턴
    5. 번들 크기 영향

    발견 즉시 보고하세요.
  tools: ["Grep", "Read", "Bash"]

architecture-expert:
  subagent_type: "general-purpose"
  prompt: |
    당신은 아키텍처 전문가입니다.

    실시간으로 다음을 검증하세요:
    1. 컴포넌트 구조 일관성
    2. 관심사 분리
    3. 의존성 방향
    4. 레이어 규칙 준수
    5. API 패턴 일관성

    CLAUDE.md의 아키텍처 규칙 참조.
  tools: ["Read", "Grep", "LSP"]

style-expert:
  subagent_type: "general-purpose"
  prompt: |
    당신은 코드 스타일 전문가입니다.

    다음을 실행하세요:
    1. npm run lint
    2. 결과 분석
    3. 스타일 위반 목록 생성

    실제 명령을 실행하세요.
  tools: ["Bash", "Read"]

test-expert:
  subagent_type: "general-purpose"
  prompt: |
    당신은 테스트 전문가입니다.

    다음을 실행하세요:
    1. npm run test
    2. npm run test:coverage
    3. 결과 분석
    4. 실패 테스트 목록
    5. 커버리지 수치 보고

    실제 명령을 실행하세요.
  tools: ["Bash", "Read"]

doc-expert:
  subagent_type: "general-purpose"
  prompt: |
    당신은 문서화 전문가입니다.

    다음을 검증하세요:
    1. 새 코드에 JSDoc 존재 여부
    2. 복잡한 로직에 주석 존재
    3. README 업데이트 필요 여부
    4. API 문서 완성도
  tools: ["Read", "Grep"]

best-practice-expert:
  subagent_type: "general-purpose"
  prompt: |
    당신은 베스트 프랙티스 전문가입니다.

    WebSearch로 최신 권장 사항을 확인하세요:
    1. Vue 3 최신 패턴
    2. TypeScript 권장 설정
    3. 프론트엔드 보안 표준
    4. 성능 최적화 기법

    현재 구현과 비교하세요.
  tools: ["WebSearch", "WebFetch", "Read"]
```

---

## Rapid Cycle Process

### 단일 사이클 (5-10분)

```
┌─────────────────────────────────────────────────────────────────┐
│                    SINGLE RAPID CYCLE                           │
│                    Target: 5-10 minutes                         │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Phase A: Parallel Analysis (2-3 min)                    │   │
│  │                                                          │   │
│  │  ALL 7 experts run simultaneously:                      │   │
│  │  Security │ Performance │ Architecture │ Style │ Test │ ... │   │
│  │     ↓            ↓            ↓           ↓       ↓      │   │
│  │  [Results aggregated in parallel]                       │   │
│  └──────────────────────────┬──────────────────────────────┘   │
│                             │                                   │
│                             ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Phase B: Gap Identification (1 min)                     │   │
│  │                                                          │   │
│  │  • Issues prioritized                                   │   │
│  │  • Quick fixes identified                               │   │
│  │  • Score estimated                                      │   │
│  └──────────────────────────┬──────────────────────────────┘   │
│                             │                                   │
│                             ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Phase C: Rapid Fix (2-5 min)                            │   │
│  │                                                          │   │
│  │  Parallel fixers:                                       │   │
│  │  Security-fixer │ Style-fixer │ Test-fixer │ Doc-fixer  │   │
│  │        ↓               ↓             ↓            ↓      │   │
│  │  [All fixes applied in parallel]                        │   │
│  └──────────────────────────┬──────────────────────────────┘   │
│                             │                                   │
│                             ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Phase D: Verification (1 min)                           │   │
│  │                                                          │   │
│  │  • Score calculation                                    │   │
│  │  • 100? → EXIT                                          │   │
│  │  • <100? → NEXT CYCLE                                   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Total Cycle Time: ~5-10 minutes                               │
└─────────────────────────────────────────────────────────────────┘
```

---

## Parallel Execution Patterns

### Pattern 1: All-At-Once Expert Analysis

```typescript
// 모든 전문가를 단일 메시지에서 동시 호출
async function runAllExperts(context: CycleContext) {
  // 7개 Task 도구를 병렬로 호출
  const results = await Promise.all([
    invokeTask("security-expert", context),
    invokeTask("performance-expert", context),
    invokeTask("architecture-expert", context),
    invokeTask("style-expert", context),
    invokeTask("test-expert", context),
    invokeTask("doc-expert", context),
    invokeTask("best-practice-expert", context)
  ]);

  return aggregateResults(results);
}
```

**Claude Code에서:**
```yaml
# 단일 응답에서 7개 Task 동시 호출

Tool: Task
  subagent_type: "general-purpose"
  description: "Security analysis"
  prompt: "보안 검증..."

Tool: Task
  subagent_type: "general-purpose"
  description: "Performance analysis"
  prompt: "성능 검증..."

Tool: Task
  subagent_type: "general-purpose"
  description: "Architecture analysis"
  prompt: "아키텍처 검증..."

# ... 4개 더 동시에
```

### Pattern 2: Parallel Fix Application

```
┌─────────────────────────────────────────────────────────────────┐
│              PARALLEL FIX APPLICATION                           │
│                                                                 │
│  발견된 이슈들:                                                 │
│  ├── Security Issue #1                                         │
│  ├── Style Issue #1, #2, #3                                   │
│  ├── Test Gap #1                                               │
│  └── Doc Missing #1, #2                                        │
│                                                                 │
│  병렬 수정 (의존성 없는 것들):                                  │
│                                                                 │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐   │
│  │ Security  │  │  Style    │  │   Test    │  │   Doc     │   │
│  │  Fixer    │  │  Fixer    │  │  Fixer    │  │  Fixer    │   │
│  │           │  │           │  │           │  │           │   │
│  │ Fix #1    │  │ Fix #1-3  │  │ Add test  │  │ Add docs  │   │
│  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘   │
│        │              │              │              │          │
│        └──────────────┴──────────────┴──────────────┘          │
│                              │                                  │
│                              ▼                                  │
│                    All fixes applied                            │
│                    simultaneously                               │
└─────────────────────────────────────────────────────────────────┘
```

### Pattern 3: Rapid Verification

```yaml
# 검증도 병렬로

verification-batch:
  parallel:
    - Bash: "npm run test"
    - Bash: "npm run build"
    - Bash: "npm run lint"

  then:
    aggregate_results()
    calculate_score()
```

---

## MCP + Tool Integration

### 도구 조합 전략

```
┌─────────────────────────────────────────────────────────────────┐
│                 TOOL ORCHESTRATION                              │
│                                                                 │
│  분석 도구 (병렬):                                              │
│  ├── Grep: 패턴 검색 (보안, 성능, 스타일)                      │
│  ├── Read: 파일 내용 분석                                      │
│  ├── LSP: 코드 인텔리전스 (타입, 정의)                         │
│  └── WebSearch: 베스트 프랙티스 조사                           │
│                                                                 │
│  실행 도구 (병렬):                                              │
│  ├── Bash: 테스트, 빌드, 린트                                  │
│  └── Edit: 코드 수정                                           │
│                                                                 │
│  MCP 도구 (가능 시):                                           │
│  ├── mcp__github__*: PR 분석, 이슈 생성                        │
│  ├── mcp__sentry__*: 에러 모니터링                             │
│  └── mcp__database__*: 데이터 검증                             │
│                                                                 │
│  스킬 연동:                                                     │
│  ├── sc:analyze: 깊은 코드 분석                                │
│  ├── sc:test: 테스트 실행                                      │
│  ├── sc:research: 웹 리서치                                    │
│  └── sc:spec-panel: 전문가 패널                                │
└─────────────────────────────────────────────────────────────────┘
```

### Skill 활용

```yaml
# 복잡한 분석이 필요할 때 기존 스킬 활용

# 코드 분석
Skill: sc:analyze
  → 보안, 성능, 아키텍처 분석 결과

# 웹 리서치
Skill: sc:research
  → 최신 베스트 프랙티스 조사 결과

# 전문가 패널
Skill: sc:spec-panel
  → 멀티 전문가 의견 수렴
```

---

## Cycle Optimization

### Cycle Time Targets

| Cycle Type | Target Time | Use Case |
|------------|-------------|----------|
| Quick Fix | 2-3 min | 단순 스타일/린트 수정 |
| Standard | 5-10 min | 일반적인 기능 구현 |
| Deep | 15-20 min | 복잡한 아키텍처 변경 |

### Parallelization Maximization

```
원칙: 의존성 없으면 무조건 병렬

┌─────────────────────────────────────────────────────────────────┐
│  의존성 분석:                                                   │
│                                                                 │
│  독립적 (병렬 가능):                                           │
│  ├── Security 분석 ↔ Style 분석                                │
│  ├── Performance 분석 ↔ Doc 검증                               │
│  ├── Test 실행 ↔ Lint 실행                                     │
│  └── WebSearch ↔ Grep 검색                                     │
│                                                                 │
│  의존적 (순차 필요):                                           │
│  ├── 코드 수정 → 테스트 실행 (수정 후 테스트)                  │
│  ├── 분석 → 수정 (분석 결과로 수정)                            │
│  └── 수정 → 빌드 (수정 후 빌드)                                │
└─────────────────────────────────────────────────────────────────┘

최적화 전략:
1. 분석 단계: 모든 분석 병렬 실행
2. 수정 단계: 의존성 없는 수정 병렬 실행
3. 검증 단계: 테스트/빌드 병렬 실행
```

---

## Continuous Expert Feedback

### 실시간 피드백 루프

```
┌─────────────────────────────────────────────────────────────────┐
│              CONTINUOUS FEEDBACK LOOP                           │
│                                                                 │
│    ┌──────────────────────────────────────────────────────┐    │
│    │                  EXPERT POOL                          │    │
│    │                                                       │    │
│    │   항상 활성화: 7개 전문가가 지속적으로 모니터링       │    │
│    └──────────────────────────┬─────────────────────────────┘    │
│                               │                                  │
│         ┌─────────────────────┼─────────────────────┐           │
│         │                     │                     │           │
│         ▼                     ▼                     ▼           │
│    ┌─────────┐          ┌─────────┐          ┌─────────┐       │
│    │ Change  │          │ Change  │          │ Change  │       │
│    │ Detected│          │ Detected│          │ Detected│       │
│    └────┬────┘          └────┬────┘          └────┬────┘       │
│         │                    │                    │             │
│         ▼                    ▼                    ▼             │
│    Instant               Instant              Instant          │
│    Feedback              Feedback             Feedback         │
│         │                    │                    │             │
│         └────────────────────┼────────────────────┘             │
│                              │                                  │
│                              ▼                                  │
│                    ┌──────────────────┐                        │
│                    │   Issue Queue    │                        │
│                    │                  │                        │
│                    │  Priority sort   │                        │
│                    │  Batch process   │                        │
│                    └──────────────────┘                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Example: Rapid Cycle Execution

```markdown
## Rapid Cycle Log

### Cycle 1 (Start: 10:00:00)

**Phase A: Parallel Analysis (10:00:00 - 10:02:30)**
- Security Expert: 2 issues found
- Performance Expert: 1 issue found
- Architecture Expert: 0 issues
- Style Expert: 5 issues found
- Test Expert: 3 tests failing
- Doc Expert: 2 docs missing
- Best Practice Expert: 1 recommendation

**Phase B: Gap Identification (10:02:30 - 10:03:00)**
- Total issues: 14
- Priority: Security (P1), Test (P1), Style (P2), Doc (P3)
- Estimated fixes: 8 parallel, 6 sequential

**Phase C: Rapid Fix (10:03:00 - 10:07:00)**
- Security fixes: Applied (2/2)
- Style fixes: Applied (5/5)
- Test fixes: Applied (3/3)
- Doc updates: Applied (2/2)

**Phase D: Verification (10:07:00 - 10:08:00)**
- Tests: 47/47 passed
- Build: Success
- Score: 78/100

**Result: Score < 100 → NEXT CYCLE**

---

### Cycle 2 (Start: 10:08:00)
... (similar rapid execution)

### Cycle 5 (Start: 10:35:00)

**Phase D: Verification**
- Tests: 47/47 passed
- Build: Success
- Score: 100/100

**Result: Score = 100 → EXIT SUCCESS** ✅

---

## Summary
- Total Cycles: 5
- Total Time: 35 minutes
- Final Score: 100/100
```

---

## Quick Reference

### 병렬 실행 체크리스트

```markdown
□ 모든 분석 전문가가 동시에 실행되는가?
□ 의존성 없는 수정이 병렬로 적용되는가?
□ 테스트/빌드/린트가 동시에 실행되는가?
□ 결과가 효율적으로 집계되는가?
□ 다음 사이클로 빠르게 전환되는가?
```

### 사이클 최적화 체크리스트

```markdown
□ 각 사이클이 10분 이내인가?
□ 불필요한 순차 실행이 없는가?
□ 모든 도구가 최대한 활용되는가?
□ MCP/스킬이 적절히 연동되는가?
□ 점수 개선이 매 사이클마다 있는가?
```

---

## Key Metrics

| Metric | Target | Description |
|--------|--------|-------------|
| Cycle Time | < 10 min | 단일 사이클 완료 시간 |
| Expert Parallelism | 7 | 동시 실행 전문가 수 |
| Fix Parallelism | 4+ | 동시 수정 작업 수 |
| Score Improvement | +5~15 | 사이클당 점수 향상 |
| Total Cycles | ~5-10 | 100점까지 예상 사이클 |
| Total Time | ~1-2 hours | 완료까지 총 시간 |
