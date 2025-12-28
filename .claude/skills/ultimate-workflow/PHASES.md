# Ultimate Workflow - Phase Details

> **핵심 원칙**:
> 1. 모든 판단은 **증거 기반**으로만 (할루시네이션 방지)
> 2. 모든 독립 작업은 **서브에이전트 병렬 실행** (컴퓨팅 파워 최대 활용)
> 3. 완료 판단은 **다수결 검증** (단일 판단 금지)

---

## Anti-Hallucination Protocol (할루시네이션 방지 프로토콜)

**절대 금지 사항:**
- ❌ "아마 완료된 것 같다"는 추정 금지
- ❌ "충분히 구현되었다"는 주관적 판단 금지
- ❌ "시간이 오래 걸렸으니 이쯤에서"라는 조기 종료 금지
- ❌ 단일 에이전트의 완료 판단 금지

**필수 검증:**
- ✅ 모든 완료 판단은 **최소 3개 서브에이전트의 독립 검증** 필요
- ✅ 점수는 **객관적 메트릭**으로만 산정
- ✅ 100점 미달 시 **무조건 루프백** (예외 없음)
- ✅ 모든 결과는 **실제 도구 실행 결과**로만 확인

```
┌─────────────────────────────────────────────────────────────────┐
│                 ANTI-HALLUCINATION CHECKPOINT                   │
│                                                                 │
│  완료 판단 시 다음 모든 조건 충족 필수:                          │
│                                                                 │
│  □ 3개 이상의 독립 서브에이전트가 동일 결론?                    │
│  □ 실제 도구 실행 결과 (bash, test 등)로 검증?                  │
│  □ 정량적 점수 100점 달성?                                      │
│  □ 모든 요구사항 체크리스트 완료 표시?                          │
│                                                                 │
│  하나라도 NO → 루프백                                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## PHASE 1: Planning (기획) {#phase-1-planning}

### 목표
요구사항의 **완전하고 누락 없는** 이해

### 서브에이전트 구성 (최소 5개 병렬 실행)

```
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 1: PLANNING                            │
│                                                                 │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │ requirement │ │  codebase   │ │  document   │               │
│  │  analyzer   │ │  explorer   │ │  analyzer   │               │
│  │             │ │             │ │             │               │
│  │ 요구사항     │ │ 기존 코드   │ │ 기획문서    │               │
│  │ 분해/분석   │ │ 구조 파악   │ │ PRD 분석    │               │
│  └──────┬──────┘ └──────┬──────┘ └──────┬──────┘               │
│         │               │               │                       │
│  ┌──────┴───────────────┴───────────────┴──────┐               │
│  │              PARALLEL EXECUTION              │               │
│  └──────┬───────────────┬───────────────┬──────┘               │
│         │               │               │                       │
│  ┌──────┴──────┐ ┌──────┴──────┐ ┌──────┴──────┐               │
│  │    web      │ │ architecture│ │  implicit   │               │
│  │ researcher  │ │  designer   │ │  feature    │               │
│  │             │ │             │ │  discoverer │               │
│  │ 최신 기술   │ │ 설계 수립   │ │ 암묵적 요구 │               │
│  │ 조사       │ │             │ │ 사항 발굴   │               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
└─────────────────────────────────────────────────────────────────┘
```

### 서브에이전트 상세

#### 1. requirement-analyzer (요구사항 분석)
```yaml
Task invocation:
  subagent_type: "general-purpose"
  prompt: |
    당신은 요구사항 분석 전문가입니다.

    다음 요구사항을 분석하세요:
    [USER_REQUIREMENT]

    수행할 작업:
    1. 명시적 요구사항 목록화 (각 항목에 ID 부여)
    2. 기능적 요구사항 vs 비기능적 요구사항 분류
    3. 각 요구사항의 수용 기준(Acceptance Criteria) 정의
    4. 우선순위 결정 (Must/Should/Could/Won't)
    5. 예상되는 엣지 케이스 나열

    출력 형식:
    - 요구사항 테이블 (ID, 설명, 유형, 우선순위, AC)
    - 의존성 그래프
    - 리스크 항목
```

#### 2. codebase-explorer (코드베이스 탐색)
```yaml
Task invocation:
  subagent_type: "Explore"
  prompt: |
    현재 프로젝트의 코드베이스를 철저히 분석하세요.

    분석 항목:
    1. 디렉토리 구조 및 아키텍처 패턴
    2. 기존 컴포넌트/모듈 목록
    3. 사용 중인 기술 스택 상세
    4. API 엔드포인트 목록
    5. 데이터 모델/타입 정의
    6. 테스트 구조
    7. 설정 파일 분석

    반드시 실제 파일을 읽어서 분석하세요.
    추측하지 마세요.
```

#### 3. document-analyzer (기획문서 분석)
```yaml
Task invocation:
  subagent_type: "general-purpose"
  prompt: |
    프로젝트의 기존 기획문서를 모두 찾아서 분석하세요.

    탐색 대상:
    - docs/ 폴더
    - *.md 파일들
    - PRD, 설계문서, 기술명세
    - CLAUDE.md
    - README.md

    분석 항목:
    1. 기존 요구사항 목록
    2. 도메인 모델
    3. 업무 규칙
    4. 제약 조건
    5. 비즈니스 로직

    실제 파일을 읽어서 분석하세요.
```

#### 4. web-researcher (웹 조사)
```yaml
Task invocation:
  subagent_type: "general-purpose"
  prompt: |
    [TECHNOLOGY_STACK]에 대한 최신 베스트 프랙티스를 조사하세요.

    WebSearch와 WebFetch를 사용하여:
    1. 최신 업계 표준
    2. 보안 모범 사례
    3. 성능 최적화 기법
    4. 일반적인 안티패턴
    5. 권장 라이브러리/도구

    반드시 실제 웹 검색을 수행하세요.
    2024-2025년 자료 우선 참조.
```

#### 5. architecture-designer (아키텍처 설계)
```yaml
Task invocation:
  subagent_type: "Plan"
  prompt: |
    요구사항과 기존 코드베이스를 기반으로 아키텍처를 설계하세요.

    설계 항목:
    1. 컴포넌트 구조
    2. 데이터 흐름
    3. API 설계
    4. 상태 관리 전략
    5. 에러 처리 전략
    6. 테스트 전략

    기존 아키텍처와의 일관성을 유지하세요.
```

#### 6. implicit-feature-discoverer (암묵적 기능 발굴)
```yaml
Task invocation:
  subagent_type: "general-purpose"
  prompt: |
    명시적 요구사항을 분석하여 암묵적으로 필요한 기능을 발굴하세요.

    고려 사항:
    1. 사용자가 당연히 기대할 기능
    2. 보안/인증 관련 필수 요소
    3. 에러 처리/복구
    4. 접근성
    5. 반응형 디자인
    6. 국제화/현지화
    7. 로깅/모니터링

    "사용자가 언급하지 않았지만 반드시 필요한 것"을 찾으세요.
```

### 산출물

```markdown
## Planning Phase Output

### 1. 요구사항 체크리스트
| ID | 요구사항 | 유형 | 우선순위 | AC | 상태 |
|----|---------|------|---------|----|----|
| REQ-001 | ... | 기능 | Must | ... | ⬜ |
| REQ-002 | ... | 비기능 | Should | ... | ⬜ |

### 2. 발견된 암묵적 요구사항
| ID | 발견된 요구사항 | 근거 |
|----|---------------|------|
| IMP-001 | ... | ... |

### 3. 아키텍처 설계
[다이어그램]

### 4. 작업 분해 (Task Breakdown)
| Task | 설명 | 예상 파일 | 의존성 |
|------|-----|---------|-------|
| T-001 | ... | ... | - |
| T-002 | ... | ... | T-001 |

### 5. 기술 조사 결과
[웹 검색 결과 요약]
```

---

## PHASE 2: TDD Development (TDD 개발) {#phase-2-tdd-development}

### 목표
테스트 주도 개발로 **검증 가능한** 코드 작성

### TDD 사이클

```
┌─────────────────────────────────────────────────────────────────┐
│                    TDD CYCLE (Red-Green-Refactor)               │
│                                                                 │
│        ┌─────────┐                                              │
│        │   RED   │ ← 실패하는 테스트 먼저 작성                  │
│        └────┬────┘                                              │
│             │                                                   │
│             ▼                                                   │
│        ┌─────────┐                                              │
│        │  GREEN  │ ← 테스트 통과하는 최소 구현                  │
│        └────┬────┘                                              │
│             │                                                   │
│             ▼                                                   │
│        ┌─────────┐                                              │
│        │REFACTOR │ ← 코드 품질 개선 (테스트 유지)               │
│        └────┬────┘                                              │
│             │                                                   │
│             └──────────────── 다음 기능 ──────────────▶         │
└─────────────────────────────────────────────────────────────────┘
```

### 서브에이전트 구성 (기능당 3개 병렬)

#### Per-Feature Agent Group
```
┌─────────────────────────────────────────────────────────────────┐
│              FEATURE IMPLEMENTATION GROUP                        │
│                                                                 │
│  For each feature in Task Breakdown:                            │
│                                                                 │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐           │
│  │ test-writer │   │ implementer │   │  refactorer │           │
│  │             │   │             │   │             │           │
│  │ 테스트 먼저 │──▶│ 기능 구현   │──▶│ 품질 개선   │           │
│  │ 작성       │   │             │   │             │           │
│  └─────────────┘   └─────────────┘   └─────────────┘           │
│                                                                 │
│  ┌─────────────┐   ┌─────────────┐                             │
│  │ mock-writer │   │ type-checker│                             │
│  │             │   │             │                             │
│  │ Mock 데이터 │   │ 타입 검증   │                             │
│  │ 생성       │   │             │                             │
│  └─────────────┘   └─────────────┘                             │
└─────────────────────────────────────────────────────────────────┘
```

### 서브에이전트 상세

#### 1. test-writer (테스트 작성자)
```yaml
Task invocation:
  subagent_type: "general-purpose"
  prompt: |
    [FEATURE_SPEC]에 대한 테스트를 먼저 작성하세요.

    테스트 유형:
    1. Unit Tests - 개별 함수/컴포넌트
    2. Integration Tests - API 연동
    3. Edge Case Tests - 엣지 케이스

    테스트 작성 규칙:
    - 각 Acceptance Criteria당 최소 1개 테스트
    - 성공/실패 케이스 모두 커버
    - 테스트는 실패해야 함 (RED 단계)

    테스트를 작성한 후 실행하여 실패 확인하세요.
```

#### 2. implementer (구현자)
```yaml
Task invocation:
  subagent_type: "general-purpose"
  prompt: |
    테스트를 통과하는 최소한의 구현을 작성하세요.

    구현 규칙:
    1. Mock-First 원칙 준수
       - 새 API 데이터는 mock-server/db.json에 먼저 추가
       - 컴포넌트 내 하드코딩 mock 금지
    2. 프로젝트 아키텍처 규칙 준수
    3. 기존 코드 스타일과 일관성 유지
    4. 타입 안정성 확보

    구현 후 테스트 실행하여 통과 확인하세요.
```

#### 3. mock-writer (Mock 데이터 작성자)
```yaml
Task invocation:
  subagent_type: "general-purpose"
  prompt: |
    [FEATURE]에 필요한 Mock 데이터를 mock-server/db.json에 추가하세요.

    규칙:
    1. ID 컨벤션 준수
       - Project: 1000-1999
       - Layer: 2000-2999
       - Build: 3000-3999
    2. 관계 데이터 올바르게 연결
    3. 현실적인 샘플 데이터

    추가 후 curl로 API 응답 확인하세요:
    curl http://localhost:3001/api/[endpoint]
```

#### 4. refactorer (리팩토러)
```yaml
Task invocation:
  subagent_type: "general-purpose"
  prompt: |
    테스트가 통과하는 상태에서 코드 품질을 개선하세요.

    리팩토링 항목:
    1. 코드 중복 제거
    2. 명확한 네이밍
    3. 함수 분리 (단일 책임)
    4. 매직 넘버 상수화
    5. 에러 처리 개선

    중요: 리팩토링 후에도 모든 테스트가 통과해야 함
```

#### 5. type-checker (타입 검증자)
```yaml
Task invocation:
  subagent_type: "general-purpose"
  prompt: |
    구현된 코드의 타입 안정성을 검증하세요.

    검증 항목:
    1. TypeScript 타입 에러 확인 (npm run build)
    2. any 타입 사용 최소화
    3. 타입 정의 완전성
    4. null/undefined 처리

    타입 에러가 있으면 수정하세요.
```

### Mock-First 개발 체크리스트

```markdown
## 각 기능 구현 시 필수 체크

□ mock-server/db.json에 필요한 데이터 추가했는가?
□ npm run mock 실행 후 API 응답 정상 확인?
□ API 서비스 코드에서 mock-server 호출하는가?
□ 컴포넌트에 하드코딩된 mock 데이터 없는가?
□ 테스트도 mock-server 데이터 기반인가?
```

---

## PHASE 3: Testing (테스트) {#phase-3-testing}

### 목표
**모든 레벨**에서 완전한 테스트 통과

### 서브에이전트 구성 (최소 4개 병렬)

```
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 3: TESTING                             │
│                                                                 │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌───────────┐ │
│  │    unit     │ │ integration │ │     e2e     │ │ coverage  │ │
│  │    test     │ │    test     │ │    test     │ │ analyzer  │ │
│  │   runner    │ │   runner    │ │   runner    │ │           │ │
│  └──────┬──────┘ └──────┬──────┘ └──────┬──────┘ └─────┬─────┘ │
│         │               │               │               │       │
│         └───────────────┴───────────────┴───────────────┘       │
│                                │                                 │
│                                ▼                                 │
│                    ┌─────────────────────┐                      │
│                    │   TEST AGGREGATOR   │                      │
│                    │                     │                      │
│                    │ 모든 결과 취합      │                      │
│                    │ 통과율 계산         │                      │
│                    │ 실패 분석           │                      │
│                    └─────────────────────┘                      │
└─────────────────────────────────────────────────────────────────┘
```

### 서브에이전트 상세

#### 1. unit-test-runner
```yaml
Task invocation:
  subagent_type: "general-purpose"
  prompt: |
    모든 단위 테스트를 실행하세요.

    실행 명령:
    npm run test:unit (또는 해당 명령)

    결과 보고:
    - 총 테스트 수
    - 통과 수
    - 실패 수
    - 실패한 테스트 상세 (파일, 라인, 에러 메시지)

    실제로 테스트를 실행하세요. 추측하지 마세요.
```

#### 2. integration-test-runner
```yaml
Task invocation:
  subagent_type: "general-purpose"
  prompt: |
    통합 테스트를 실행하세요.

    사전 조건:
    1. Mock 서버 실행 확인 (curl http://localhost:3001)
    2. 필요시 npm run mock 실행

    실행 명령:
    npm run test:integration (또는 해당 명령)

    API 엔드포인트 직접 테스트:
    curl http://localhost:3001/api/projects
    curl http://localhost:3001/api/builds
    etc.
```

#### 3. e2e-test-runner
```yaml
Task invocation:
  subagent_type: "general-purpose"
  prompt: |
    E2E 테스트를 실행하세요.

    실행:
    npm run test:e2e

    또는 수동 시나리오 테스트:
    1. 각 라우트 접근 테스트
    2. 주요 사용자 플로우 테스트
    3. 에러 상황 테스트

    실제 브라우저/테스트 실행 결과 보고.
```

#### 4. coverage-analyzer
```yaml
Task invocation:
  subagent_type: "general-purpose"
  prompt: |
    테스트 커버리지를 분석하세요.

    실행:
    npm run test:coverage (또는 해당 명령)

    분석 항목:
    - Line Coverage %
    - Branch Coverage %
    - Function Coverage %
    - Statement Coverage %

    커버리지가 낮은 파일/함수 목록 제공.
    80% 미만인 영역 식별.
```

#### 5. build-verifier
```yaml
Task invocation:
  subagent_type: "general-purpose"
  prompt: |
    프로덕션 빌드를 검증하세요.

    실행:
    npm run build

    검증 항목:
    - 빌드 성공 여부
    - TypeScript 에러 없음
    - 번들 크기
    - 빌드 경고

    빌드 실패 시 에러 상세 분석.
```

### 테스트 성공 기준

```markdown
## 필수 통과 조건

| 항목 | 기준 | 현재 |
|------|------|------|
| Unit Tests | 100% 통과 | ⬜ |
| Integration Tests | 100% 통과 | ⬜ |
| E2E Tests | 100% 통과 | ⬜ |
| Build | 성공 | ⬜ |
| TypeScript | 에러 0개 | ⬜ |
| Coverage | >= 80% | ⬜ |

하나라도 미달 시 → PHASE 6 (Gap Analysis)
```

---

## PHASE 4: Code Review (코드 리뷰) {#phase-4-code-review}

### 목표
**다각도** 품질 검증 (최소 5개 관점)

### 서브에이전트 구성 (최소 5개 병렬 실행)

```
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 4: CODE REVIEW                         │
│                                                                 │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐       │
│  │ security  │ │performance│ │architecture│ │  style   │       │
│  │ reviewer  │ │ reviewer  │ │  reviewer │ │ reviewer │       │
│  └─────┬─────┘ └─────┬─────┘ └─────┬─────┘ └─────┬─────┘       │
│        │             │             │             │              │
│  ┌─────┴─────┐ ┌─────┴─────┐ ┌─────┴─────┐ ┌─────┴─────┐       │
│  │ best      │ │   DRY     │ │  SOLID    │ │   a11y    │       │
│  │ practice  │ │ checker   │ │ checker   │ │ checker   │       │
│  │ reviewer  │ │           │ │           │ │           │       │
│  └─────┬─────┘ └─────┬─────┘ └─────┬─────┘ └─────┬─────┘       │
│        │             │             │             │              │
│        └─────────────┴─────────────┴─────────────┘              │
│                              │                                   │
│                              ▼                                   │
│                    ┌─────────────────────┐                      │
│                    │   REVIEW AGGREGATOR │                      │
│                    │                     │                      │
│                    │ 모든 이슈 취합      │                      │
│                    │ 심각도 분류         │                      │
│                    │ 수정 필요 목록      │                      │
│                    └─────────────────────┘                      │
└─────────────────────────────────────────────────────────────────┘
```

### 서브에이전트 상세

#### 1. security-reviewer (보안 리뷰어)
```yaml
Task invocation:
  subagent_type: "general-purpose"
  prompt: |
    구현된 코드의 보안 취약점을 분석하세요.

    검토 항목 (OWASP Top 10 기준):
    1. Injection (SQL, Command, XSS)
    2. Broken Authentication
    3. Sensitive Data Exposure
    4. XML External Entities (XXE)
    5. Broken Access Control
    6. Security Misconfiguration
    7. Cross-Site Scripting (XSS)
    8. Insecure Deserialization
    9. Using Components with Known Vulnerabilities
    10. Insufficient Logging & Monitoring

    발견된 취약점:
    - 파일 경로
    - 라인 번호
    - 취약점 유형
    - 심각도 (Critical/High/Medium/Low)
    - 수정 방법
```

#### 2. performance-reviewer (성능 리뷰어)
```yaml
Task invocation:
  subagent_type: "general-purpose"
  prompt: |
    코드의 성능 이슈를 분석하세요.

    검토 항목:
    1. 불필요한 리렌더링
    2. 메모리 누수 가능성
    3. N+1 쿼리 문제
    4. 무한 루프 위험
    5. 대용량 데이터 처리
    6. 비동기 처리 최적화
    7. 번들 크기 영향

    각 이슈에 대해:
    - 위치 (파일:라인)
    - 문제 설명
    - 예상 영향
    - 개선 방법
```

#### 3. architecture-reviewer (아키텍처 리뷰어)
```yaml
Task invocation:
  subagent_type: "general-purpose"
  prompt: |
    아키텍처 일관성과 설계 품질을 검토하세요.

    검토 항목:
    1. 기존 아키텍처 패턴 준수
    2. 컴포넌트 분리 적절성
    3. 의존성 방향 (순환 의존성 없음)
    4. 관심사 분리
    5. 레이어 구조 준수
    6. API 설계 일관성

    프로젝트 CLAUDE.md의 아키텍처 규칙 참조.
```

#### 4. style-reviewer (스타일 리뷰어)
```yaml
Task invocation:
  subagent_type: "general-purpose"
  prompt: |
    코드 스타일과 규칙 준수를 검토하세요.

    검토 항목:
    1. ESLint/Prettier 규칙 준수
    2. 네이밍 컨벤션
    3. 파일/폴더 구조
    4. 주석 품질 (과도/부족)
    5. 코드 포맷팅
    6. Import 순서

    실행:
    npm run lint
```

#### 5. best-practice-reviewer (베스트 프랙티스 리뷰어)
```yaml
Task invocation:
  subagent_type: "general-purpose"
  prompt: |
    업계 베스트 프랙티스 준수를 검토하세요.

    Vue 3 베스트 프랙티스:
    1. Composition API 올바른 사용
    2. Reactivity 올바른 사용
    3. Props/Emits 정의
    4. 컴포넌트 크기 적절성

    TypeScript 베스트 프랙티스:
    1. Strict mode 준수
    2. 타입 추론 활용
    3. any 사용 최소화

    WebSearch로 최신 베스트 프랙티스 확인.
```

#### 6. DRY-checker (중복 코드 검사)
```yaml
Task invocation:
  subagent_type: "general-purpose"
  prompt: |
    코드 중복을 분석하세요.

    검토 항목:
    1. 동일/유사 코드 블록
    2. 복붙된 로직
    3. 공통화 가능한 유틸리티
    4. 재사용 가능한 컴포넌트

    중복 발견 시:
    - 위치 (파일1:라인, 파일2:라인)
    - 유사도 %
    - 공통화 제안
```

### 리뷰 결과 형식

```markdown
## Code Review Summary

### Critical Issues (즉시 수정 필요)
| # | 유형 | 위치 | 설명 | 수정 방법 |
|---|------|------|------|---------|
| 1 | Security | ... | ... | ... |

### High Priority Issues
| # | 유형 | 위치 | 설명 | 수정 방법 |
|---|------|------|------|---------|

### Medium Priority Issues
...

### Low Priority Issues (권장)
...

### 총평
- Critical: N개
- High: N개
- Medium: N개
- Low: N개

Critical/High가 1개라도 있으면 → 수정 후 재검토
```

---

## PHASE 5: Completeness Check (완성도 체크) {#phase-5-completeness-check}

### 목표
**100점 만점** 기준으로 객관적 평가

### 서브에이전트 구성 (최소 5개 병렬)

```
┌─────────────────────────────────────────────────────────────────┐
│                 PHASE 5: COMPLETENESS CHECK                      │
│                                                                 │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐       │
│  │    web    │ │ document  │ │ feature   │ │  quality  │       │
│  │ validator │ │ validator │ │ validator │ │ validator │       │
│  └─────┬─────┘ └─────┬─────┘ └─────┬─────┘ └─────┬─────┘       │
│        │             │             │             │              │
│        └─────────────┴─────────────┴─────────────┘              │
│                              │                                   │
│                              ▼                                   │
│                    ┌─────────────────────┐                      │
│                    │  SCORE CALCULATOR   │                      │
│                    │                     │                      │
│                    │ 4개 영역 점수 합산  │                      │
│                    │ 100점 만점 계산     │                      │
│                    │ 미달 항목 식별      │                      │
│                    └─────────────────────┘                      │
└─────────────────────────────────────────────────────────────────┘
```

### 점수 체계 (100점 만점)

| 영역 | 배점 | 세부 항목 |
|------|------|---------|
| 요구사항 충족 | 25점 | 명시적 + 암묵적 요구사항 |
| 테스트 커버리지 | 25점 | Unit + Integration + E2E |
| 코드 품질 | 25점 | 보안 + 성능 + 아키텍처 |
| 베스트 프랙티스 | 25점 | 업계 표준 + 프로젝트 규칙 |

상세: [SCORING.md](SCORING.md)

### 할루시네이션 방지 체크

```markdown
## 완료 판단 전 필수 검증

⚠️ 다음 모든 조건이 실제 도구 실행 결과로 확인되어야 함:

□ 모든 테스트가 실제로 통과했는가? (npm run test 실행 결과)
□ 빌드가 실제로 성공했는가? (npm run build 실행 결과)
□ 요구사항 체크리스트가 모두 ✅ 표시인가?
□ Code Review에서 Critical/High 이슈가 0개인가?
□ 3개 이상의 validator 서브에이전트가 동일 점수를 산정했는가?

하나라도 "추정" 또는 "아마"가 포함되면 → 루프백
```

---

## Phase Transition Rules

### 정상 진행
```
PHASE 1 완료 → PHASE 2 시작
PHASE 2 완료 → PHASE 3 시작
PHASE 3 완료 → PHASE 4 시작
PHASE 4 완료 → PHASE 5 시작
PHASE 5 점수 = 100 → 완료
```

### 루프백 조건
```
PHASE 3 테스트 실패 → PHASE 2로 루프백
PHASE 4 Critical 이슈 → PHASE 2로 루프백
PHASE 5 점수 < 100 → PHASE 6 (Gap Analysis) → PHASE 1로 루프백
```

### 절대 금지
```
❌ 점수 < 100인데 완료 선언
❌ 테스트 실패인데 다음 단계 진행
❌ Critical 이슈 무시하고 진행
❌ "시간이 오래 걸렸으니" 조기 종료
```
