# Ultimate Workflow - Subagent Definitions

> **원칙**: 모든 독립 작업은 반드시 서브에이전트로 병렬 실행한다.
> 서브에이전트는 적극적으로, 아낌없이, 대량으로 사용한다.

---

## Orchestration Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                      ORCHESTRATOR (Main Agent)                      │
│                                                                     │
│  역할:                                                              │
│  • 전역 상태 관리                                                   │
│  • 서브에이전트 생성 및 조율                                        │
│  • Phase 전이 결정                                                  │
│  • 결과 통합                                                        │
│  • 루프백 결정                                                      │
│                                                                     │
│  도구: TodoWrite, AskUserQuestion (조율용만)                        │
│  직접 작업: 최소화 (위임 우선)                                      │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
          ▼                    ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   POOL TYPE 1   │  │   POOL TYPE 2   │  │   POOL TYPE 3   │
│   Analyzers     │  │  Implementers   │  │   Validators    │
│   (탐색/분석)   │  │   (구현/작성)   │  │   (검증/확인)   │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

---

## Agent Spawning Rules

### 규칙 1: 적극적 서브에이전트 생성

```
모든 독립 작업 → 서브에이전트 생성
하나의 작업 → 하나의 서브에이전트
N개의 독립 작업 → N개의 서브에이전트 병렬 실행
```

### 규칙 2: 병렬 실행 최대화

```javascript
// ❌ 금지: 순차 실행
for (task of tasks) {
  await runAgent(task);  // 하나씩 실행
}

// ✅ 권장: 병렬 실행
await Promise.all(tasks.map(task => runAgent(task)));  // 동시 실행
```

### 규칙 3: 단일 책임

```
각 서브에이전트 = 하나의 명확한 목표
입력 명확 + 출력 명확 + 단일 작업
```

---

## Subagent Catalog

### Category 1: Analyzers (분석 에이전트)

| Agent ID | 목적 | subagent_type | 도구 |
|----------|------|---------------|------|
| `requirement-analyzer` | 요구사항 분석/분해 | general-purpose | Read, Grep |
| `codebase-explorer` | 코드베이스 구조 파악 | Explore | Glob, Grep, Read |
| `document-analyzer` | 기획문서/PRD 분석 | general-purpose | Glob, Read |
| `web-researcher` | 최신 기술/패턴 조사 | general-purpose | WebSearch, WebFetch |
| `architecture-analyzer` | 아키텍처 분석 | Plan | Read, Grep, LSP |
| `implicit-discoverer` | 암묵적 요구사항 발굴 | general-purpose | Read, WebSearch |
| `gap-analyzer` | 부족점 분석 | general-purpose | Read, Grep |
| `dependency-analyzer` | 의존성 분석 | general-purpose | Read, Bash |

---

### Category 2: Implementers (구현 에이전트)

| Agent ID | 목적 | subagent_type | 도구 |
|----------|------|---------------|------|
| `test-writer` | 테스트 코드 작성 | general-purpose | Write, Edit, Bash |
| `implementer` | 기능 코드 구현 | general-purpose | Write, Edit, Bash |
| `mock-writer` | Mock 데이터 작성 | general-purpose | Edit, Bash |
| `refactorer` | 코드 리팩토링 | general-purpose | Edit, Read, Grep |
| `type-fixer` | 타입 에러 수정 | general-purpose | Edit, LSP, Bash |
| `bug-fixer` | 버그 수정 | general-purpose | Edit, Read, Bash |
| `style-fixer` | 스타일 이슈 수정 | general-purpose | Edit, Bash |
| `doc-writer` | 문서/주석 작성 | general-purpose | Edit, Write |

---

### Category 3: Validators (검증 에이전트)

| Agent ID | 목적 | subagent_type | 도구 |
|----------|------|---------------|------|
| `unit-test-runner` | 단위 테스트 실행 | general-purpose | Bash |
| `integration-test-runner` | 통합 테스트 실행 | general-purpose | Bash |
| `e2e-test-runner` | E2E 테스트 실행 | general-purpose | Bash |
| `build-verifier` | 빌드 검증 | general-purpose | Bash |
| `coverage-analyzer` | 커버리지 분석 | general-purpose | Bash, Read |
| `security-reviewer` | 보안 검토 | general-purpose | Grep, Read |
| `performance-reviewer` | 성능 검토 | general-purpose | Read, Grep |
| `architecture-reviewer` | 아키텍처 검토 | general-purpose | Read, Grep, LSP |
| `style-reviewer` | 스타일 검토 | general-purpose | Bash, Read |
| `practice-reviewer` | 베스트 프랙티스 검토 | general-purpose | Read, WebSearch |
| `requirement-validator` | 요구사항 충족 검증 | general-purpose | Read, Bash |
| `score-calculator` | 점수 산정 | general-purpose | Read |

---

## Agent Invocation Templates

### Template 1: Analyzer Agent

```yaml
# 분석 에이전트 호출 템플릿
Tool: Task
Parameters:
  subagent_type: "general-purpose"  # 또는 "Explore", "Plan"
  description: "[3-5 word description]"
  prompt: |
    당신은 [ROLE] 전문가입니다.

    ## 컨텍스트
    [CONTEXT]

    ## 작업
    [SPECIFIC_TASK]

    ## 규칙
    1. 실제 파일/데이터를 읽어서 분석하세요
    2. 추측하지 마세요
    3. 발견한 모든 것을 상세히 보고하세요

    ## 출력 형식
    [OUTPUT_FORMAT]

    ## 중요
    - 할루시네이션 금지
    - 모든 결론은 증거 기반
```

### Template 2: Implementer Agent

```yaml
# 구현 에이전트 호출 템플릿
Tool: Task
Parameters:
  subagent_type: "general-purpose"
  description: "[3-5 word description]"
  prompt: |
    당신은 [TECHNOLOGY] 개발자입니다.

    ## 구현할 기능
    [FEATURE_SPEC]

    ## 컨텍스트
    - 프로젝트: [PROJECT_INFO]
    - 기존 패턴: [EXISTING_PATTERNS]

    ## 규칙
    1. Mock-First: 새 데이터는 mock-server/db.json에 먼저
    2. 기존 아키텍처 패턴 준수
    3. 타입 안정성 확보
    4. 에러 처리 포함

    ## 작업 순서
    1. 테스트 먼저 작성 (Red)
    2. 최소 구현 (Green)
    3. 리팩토링 (Refactor)

    ## 완료 조건
    - 테스트 통과 확인 (npm run test 실행)
    - 빌드 성공 확인 (npm run build 실행)
```

### Template 3: Validator Agent

```yaml
# 검증 에이전트 호출 템플릿
Tool: Task
Parameters:
  subagent_type: "general-purpose"
  description: "[3-5 word description]"
  prompt: |
    당신은 [VALIDATION_TYPE] 검증자입니다.

    ## 검증 대상
    [TARGET_FILES_OR_CODE]

    ## 검증 항목
    [CHECKLIST]

    ## 검증 방법
    1. 실제 명령 실행 (추측 금지)
    2. 결과 캡처
    3. 이슈 분류

    ## 출력 형식
    ```markdown
    ## 검증 결과

    ### 실행 명령
    [COMMAND]

    ### 결과
    [OUTPUT]

    ### 이슈 목록
    | 심각도 | 위치 | 설명 | 수정 방법 |
    |--------|------|------|---------|

    ### 점수: XX/YY
    ```

    ## 중요
    - 모든 결과는 실제 실행 결과
    - "아마", "예상" 금지
```

---

## Parallel Execution Patterns

### Pattern 1: Phase-Level Parallelization

각 Phase에서 모든 해당 에이전트를 동시 실행:

```
PHASE 1: Planning
├── requirement-analyzer ─────┐
├── codebase-explorer ────────┤
├── document-analyzer ────────┼──▶ 동시 실행
├── web-researcher ───────────┤
├── architecture-analyzer ────┤
└── implicit-discoverer ──────┘
```

**구현**:
```yaml
# 6개 에이전트를 하나의 메시지에서 동시 호출
Tool: Task (×6 병렬)
```

### Pattern 2: Feature-Level Parallelization

각 기능마다 구현 에이전트 그룹을 병렬 실행:

```
Features to implement: [F1, F2, F3, F4, F5]

┌─────────────────────────────────────────────────────────────────┐
│                    PARALLEL FEATURE IMPLEMENTATION              │
│                                                                 │
│  Feature 1 ──▶ [test-writer, implementer, mock-writer]        │
│  Feature 2 ──▶ [test-writer, implementer, mock-writer]        │
│  Feature 3 ──▶ [test-writer, implementer, mock-writer]        │
│  Feature 4 ──▶ [test-writer, implementer, mock-writer]        │
│  Feature 5 ──▶ [test-writer, implementer, mock-writer]        │
│                                                                 │
│  Total: 15 concurrent agents                                    │
└─────────────────────────────────────────────────────────────────┘
```

### Pattern 3: Review-Level Parallelization

코드 리뷰 시 모든 관점을 동시 실행:

```
Code Review
├── security-reviewer ────────┐
├── performance-reviewer ─────┤
├── architecture-reviewer ────┼──▶ 동시 실행 (5+ agents)
├── style-reviewer ───────────┤
├── practice-reviewer ────────┤
├── DRY-checker ──────────────┤
└── SOLID-checker ────────────┘
```

### Pattern 4: Validation Parallelization

점수 산정 시 모든 validator 동시 실행:

```
Score Calculation
├── requirement-validator ────┐
├── test-validator ───────────┤
├── quality-validator ────────┼──▶ 동시 실행
├── practice-validator ───────┤
└── score-calculator (×3) ────┘  ← 3개 독립 산정 (할루시네이션 방지)
```

---

## Agent Communication

### Input/Output Contract

각 에이전트는 명확한 입출력 계약을 가짐:

```typescript
interface AgentContract {
  // 입력
  input: {
    context: string;      // 컨텍스트 정보
    task: string;         // 수행할 작업
    constraints: string[]; // 제약 조건
  };

  // 출력
  output: {
    status: "SUCCESS" | "PARTIAL" | "FAILED";
    result: any;          // 작업 결과
    issues: Issue[];      // 발견된 이슈
    score?: number;       // 점수 (validator만)
  };
}
```

### Result Aggregation

오케스트레이터가 모든 서브에이전트 결과를 통합:

```
┌─────────────────────────────────────────────────────────────────┐
│                    RESULT AGGREGATION                           │
│                                                                 │
│  Agent 1 Result ────┐                                          │
│  Agent 2 Result ────┤                                          │
│  Agent 3 Result ────┼──▶ Orchestrator ──▶ Unified Result       │
│  Agent N Result ────┤                                          │
│  ...                │                                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## Agent Scaling Guidelines

### 최소 에이전트 수

| Phase | 최소 에이전트 수 | 권장 에이전트 수 |
|-------|----------------|----------------|
| Planning | 5 | 8-10 |
| TDD Development | 3 per feature | 5 per feature |
| Testing | 4 | 6 |
| Code Review | 5 | 8-10 |
| Completeness Check | 4 | 6-8 |
| Gap Analysis | 3 | 5 |

### 스케일링 규칙

```
요구사항 수 (N) → Planning 에이전트 = 5 + N/3
기능 수 (M) → Implementation 에이전트 = M × 3
파일 수 (F) → Review 에이전트 = 5 + F/10
```

### 예시: 중규모 프로젝트

```
요구사항: 15개
기능: 10개
파일: 30개

Planning: 5 + 15/3 = 10 agents
Implementation: 10 × 3 = 30 agents
Testing: 6 agents
Review: 5 + 30/10 = 8 agents
Completeness: 6 agents

Total: ~60 concurrent agents
```

---

## Error Handling

### Agent Failure

서브에이전트 실패 시 처리:

```
Agent Failed?
    │
    ├─ Retry (최대 3회)
    │
    ├─ Fallback Agent 시도
    │
    └─ 실패 보고 → Orchestrator 결정
```

### Timeout Handling

```yaml
# 에이전트 타임아웃 설정
default_timeout: 600000  # 10분
max_timeout: 3600000     # 1시간 (복잡한 작업)
```

### Conflict Resolution

여러 에이전트가 동일 파일 수정 시:

```
Conflict Detected
    │
    ├─ 순차 적용 (의존성 순서)
    │
    ├─ Merge 시도
    │
    └─ 충돌 보고 → 수동 해결 요청
```

---

## Example: Full Phase 1 Invocation

```yaml
# PHASE 1에서 6개 에이전트를 병렬로 호출하는 예시

# Agent 1: Requirement Analyzer
- Tool: Task
  subagent_type: "general-purpose"
  description: "Analyze user requirements"
  prompt: |
    요구사항 분석 전문가로서 다음을 분석하세요:
    [USER_REQUIREMENT]
    ...

# Agent 2: Codebase Explorer
- Tool: Task
  subagent_type: "Explore"
  description: "Explore codebase structure"
  prompt: |
    코드베이스를 철저히 분석하세요...
    ...

# Agent 3: Document Analyzer
- Tool: Task
  subagent_type: "general-purpose"
  description: "Analyze project documents"
  prompt: |
    프로젝트 문서를 분석하세요...
    ...

# Agent 4: Web Researcher
- Tool: Task
  subagent_type: "general-purpose"
  description: "Research best practices"
  prompt: |
    WebSearch를 사용하여 최신 베스트 프랙티스 조사...
    ...

# Agent 5: Architecture Designer
- Tool: Task
  subagent_type: "Plan"
  description: "Design system architecture"
  prompt: |
    아키텍처를 설계하세요...
    ...

# Agent 6: Implicit Feature Discoverer
- Tool: Task
  subagent_type: "general-purpose"
  description: "Discover implicit requirements"
  prompt: |
    암묵적 요구사항을 발굴하세요...
    ...

# 모든 6개 에이전트를 단일 메시지에서 병렬 호출
```

---

## Key Principles Summary

1. **적극적 서브에이전트 사용**: 모든 독립 작업은 서브에이전트로
2. **병렬 실행 최대화**: 의존성 없으면 무조건 동시 실행
3. **단일 책임**: 에이전트 하나 = 작업 하나
4. **명확한 계약**: 입력/출력 명확히 정의
5. **할루시네이션 방지**: 다수 에이전트 교차 검증
6. **무한 스케일링**: 필요한 만큼 에이전트 생성 (제한 없음)
