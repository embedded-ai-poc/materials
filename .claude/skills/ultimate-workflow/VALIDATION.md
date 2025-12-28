# Ultimate Workflow - Validation with Web & Document Analysis

> **원칙**: 모든 검증은 **외부 소스**와 **내부 문서** 양방향으로 수행한다.
> WebSearch, WebFetch로 최신 베스트 프랙티스 확인, 기획문서와 비교 검증.

---

## Dual Validation Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                     DUAL VALIDATION SYSTEM                          │
│                                                                     │
│    ┌────────────────────┐           ┌────────────────────┐         │
│    │   EXTERNAL         │           │   INTERNAL          │         │
│    │   VALIDATION       │           │   VALIDATION        │         │
│    │                    │           │                     │         │
│    │  ┌──────────────┐  │           │  ┌──────────────┐   │         │
│    │  │  WebSearch   │  │           │  │ CLAUDE.md    │   │         │
│    │  │  WebFetch    │  │           │  │ PRD Docs     │   │         │
│    │  │  API Docs    │  │           │  │ Requirements │   │         │
│    │  └──────────────┘  │           │  └──────────────┘   │         │
│    └─────────┬──────────┘           └──────────┬──────────┘         │
│              │                                 │                    │
│              └─────────────┬───────────────────┘                    │
│                            │                                        │
│                            ▼                                        │
│               ┌────────────────────────┐                           │
│               │   CROSS VALIDATION     │                           │
│               │                        │                           │
│               │  External ∩ Internal   │                           │
│               │  = Validated Result    │                           │
│               └────────────────────────┘                           │
└─────────────────────────────────────────────────────────────────────┘
```

---

## External Validation (웹 기반 검증)

### 사용 도구

| 도구 | 용도 | 활용 시점 |
|------|------|---------|
| **WebSearch** | 최신 기술 트렌드, 베스트 프랙티스 검색 | Phase 1, 5 |
| **WebFetch** | 공식 문서, 튜토리얼 상세 분석 | Phase 1, 4, 5 |
| **Skill(sc:research)** | 깊은 웹 리서치 | Phase 1, 5 |

### 검증 영역

#### 1. 기술 스택 베스트 프랙티스
```yaml
Task: web-tech-validator
subagent_type: "general-purpose"
prompt: |
  WebSearch와 WebFetch를 사용하여 다음을 검증하세요:

  프로젝트 기술 스택:
  - Vue 3 with Composition API
  - TypeScript 5.x
  - Pinia 3
  - Ant Design Vue 4.x
  - Vite 7

  검증 항목:
  1. Vue 3 Composition API 최신 베스트 프랙티스 (2024-2025)
  2. TypeScript strict mode 권장 설정
  3. Pinia 상태 관리 패턴
  4. Ant Design Vue 컴포넌트 사용 가이드
  5. Vite 빌드 최적화 설정

  각 항목에 대해 공식 문서 URL과 핵심 권장사항을 제공하세요.
```

#### 2. 보안 베스트 프랙티스
```yaml
Task: web-security-validator
subagent_type: "general-purpose"
prompt: |
  WebSearch를 사용하여 최신 보안 베스트 프랙티스를 조사하세요:

  검색 키워드:
  - "Vue 3 security best practices 2025"
  - "TypeScript security vulnerabilities"
  - "frontend authentication best practices"
  - "OWASP top 10 2024 prevention"

  조사 항목:
  1. XSS 방지 기법
  2. CSRF 보호
  3. 인증/인가 패턴
  4. 민감 데이터 처리
  5. 의존성 보안

  현재 구현과 비교하여 부족한 점 식별.
```

#### 3. 성능 베스트 프랙티스
```yaml
Task: web-performance-validator
subagent_type: "general-purpose"
prompt: |
  WebSearch로 프론트엔드 성능 최적화 최신 기법을 조사하세요:

  조사 항목:
  1. Vue 3 렌더링 최적화
  2. 코드 스플리팅 전략
  3. 이미지/자산 최적화
  4. 번들 크기 최적화
  5. 캐싱 전략

  현재 구현에 적용 가능한 최적화 목록 제공.
```

### 웹 검증 프로세스

```
┌─────────────────────────────────────────────────────────────────┐
│                 WEB VALIDATION PROCESS                          │
│                                                                 │
│  Step 1: 기술 스택 키워드 추출                                  │
│         Vue 3, TypeScript, Pinia, Ant Design Vue, Vite         │
│                        │                                        │
│                        ▼                                        │
│  Step 2: WebSearch 병렬 실행 (5+ searches)                     │
│         ┌───────┬───────┬───────┬───────┬───────┐              │
│         │Search1│Search2│Search3│Search4│Search5│              │
│         └───┬───┴───┬───┴───┬───┴───┬───┴───┬───┘              │
│             │       │       │       │       │                   │
│             └───────┴───────┼───────┴───────┘                   │
│                             │                                   │
│                             ▼                                   │
│  Step 3: 상위 결과 URL 수집                                    │
│                             │                                   │
│                             ▼                                   │
│  Step 4: WebFetch 병렬 실행 (상세 분석)                        │
│         ┌───────┬───────┬───────┐                              │
│         │Fetch1 │Fetch2 │Fetch3 │                              │
│         └───┬───┴───┬───┴───┬───┘                              │
│             │       │       │                                   │
│             └───────┼───────┘                                   │
│                     │                                           │
│                     ▼                                           │
│  Step 5: 베스트 프랙티스 목록 추출                             │
│                     │                                           │
│                     ▼                                           │
│  Step 6: 현재 구현과 비교                                      │
│                     │                                           │
│                     ▼                                           │
│  Step 7: 갭 목록 생성                                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## Internal Validation (문서 기반 검증)

### 분석 대상 문서

```
프로젝트 문서 구조:
├── CLAUDE.md              # 프로젝트 규칙 및 도메인 모델
├── README.md              # 프로젝트 개요
├── docs/
│   ├── REFACTORING_PRD.md # 리팩토링 PRD
│   └── *.md               # 기타 문서
├── 1217-rc/
│   ├── CLAUDE.md          # SWDP-RC 상세 문서
│   └── docs/              # RC 관련 문서
└── mock-server/
    └── db.json            # Mock 데이터 스키마
```

### 검증 에이전트

#### 1. document-validator (문서 검증)
```yaml
Task: document-validator
subagent_type: "general-purpose"
prompt: |
  프로젝트 문서를 분석하여 요구사항 충족 여부를 검증하세요.

  분석 대상:
  1. CLAUDE.md - 프로젝트 규칙
  2. docs/REFACTORING_PRD.md - PRD (있다면)
  3. README.md - 프로젝트 개요

  검증 항목:
  1. CLAUDE.md의 도메인 모델이 구현에 반영되었는가?
  2. Mock-First 개발 규칙을 준수했는가?
  3. 디렉토리 구조 규칙을 따랐는가?
  4. API 엔드포인트 규칙을 준수했는가?

  각 규칙에 대해 준수 여부 (✅/❌) 보고.
```

#### 2. requirement-validator (요구사항 검증)
```yaml
Task: requirement-validator
subagent_type: "general-purpose"
prompt: |
  원본 요구사항과 현재 구현을 비교하세요.

  원본 요구사항 소스:
  - 사용자가 제공한 초기 요구사항
  - PRD 문서의 기능 명세
  - CLAUDE.md의 View Features 섹션

  검증 항목:
  각 요구사항에 대해:
  □ 구현 완료 여부
  □ 테스트 존재 여부
  □ 문서화 여부

  출력: 요구사항 체크리스트 (✅/⬜)
```

#### 3. mock-data-validator (Mock 데이터 검증)
```yaml
Task: mock-data-validator
subagent_type: "general-purpose"
prompt: |
  mock-server/db.json의 데이터 완전성을 검증하세요.

  검증 항목:
  1. 모든 API 엔드포인트에 해당 데이터 존재?
  2. ID 컨벤션 준수? (Project: 1000-1999, Layer: 2000-2999 등)
  3. 관계 데이터 올바르게 연결?
  4. 필수 필드 누락 없음?

  실제로 db.json을 읽어서 검증하세요.
  curl로 각 엔드포인트 테스트.
```

---

## Cross Validation (교차 검증)

### 외부 + 내부 검증 결합

```
┌─────────────────────────────────────────────────────────────────┐
│                    CROSS VALIDATION                             │
│                                                                 │
│  External (Web)              Internal (Docs)                    │
│       │                           │                             │
│       │   Vue 3 권장 패턴        │   CLAUDE.md 규칙            │
│       │   Security 표준          │   PRD 요구사항              │
│       │   Performance 기법       │   Mock-First 규칙           │
│       │                          │                              │
│       └───────────┬──────────────┘                              │
│                   │                                              │
│                   ▼                                              │
│         ┌─────────────────────┐                                 │
│         │   INTERSECTION      │                                 │
│         │                     │                                 │
│         │  External 권장      │                                 │
│         │  ∩                  │                                 │
│         │  Internal 규칙      │                                 │
│         │  =                  │                                 │
│         │  Validated Standard │                                 │
│         └─────────────────────┘                                 │
│                   │                                              │
│                   ▼                                              │
│         ┌─────────────────────┐                                 │
│         │   GAP ANALYSIS      │                                 │
│         │                     │                                 │
│         │  현재 구현          │                                 │
│         │  vs                 │                                 │
│         │  Validated Standard │                                 │
│         │  =                  │                                 │
│         │  개선 필요 목록      │                                 │
│         └─────────────────────┘                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## MCP Tool Integration

### 사용 가능한 MCP 도구 활용

```yaml
# MCP 도구 활용 전략

## 1. GitHub MCP (가능 시)
- PR 리뷰 자동화
- 이슈 생성/관리
- 코드 히스토리 분석

## 2. Database MCP (가능 시)
- Mock 데이터 검증
- 스키마 분석
- 쿼리 테스트

## 3. Sentry MCP (가능 시)
- 에러 모니터링
- 성능 분석
- 사용 패턴 분석

## 4. Custom MCP (프로젝트별)
- 프로젝트 특화 도구
- CI/CD 연동
- 내부 API 연결
```

### MCP + 내장 도구 조합

```
┌─────────────────────────────────────────────────────────────────┐
│                 TOOL COMBINATION STRATEGY                        │
│                                                                 │
│  검증 유형         │  도구 조합                                 │
│  ─────────────────┼───────────────────────────────────────────  │
│  기술 검증         │  WebSearch + WebFetch + Read              │
│  코드 분석         │  Grep + Read + LSP                        │
│  테스트 실행       │  Bash + Read                              │
│  문서 검증         │  Glob + Read + Grep                       │
│  API 검증          │  Bash (curl) + Read                       │
│  MCP 연동          │  mcp__* + 내장 도구                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## Validation Execution

### 병렬 검증 실행

```
┌─────────────────────────────────────────────────────────────────┐
│              PARALLEL VALIDATION EXECUTION                       │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    ORCHESTRATOR                          │   │
│  │                                                          │   │
│  │  "모든 validator를 병렬로 실행하고 결과 통합"            │   │
│  └──────────────────────────┬───────────────────────────────┘   │
│                             │                                    │
│     ┌───────────────────────┼───────────────────────┐           │
│     │           │           │           │           │           │
│     ▼           ▼           ▼           ▼           ▼           │
│  ┌──────┐   ┌──────┐   ┌──────┐   ┌──────┐   ┌──────┐         │
│  │ Web  │   │ Doc  │   │ Req  │   │ Mock │   │ Tech │         │
│  │Valid │   │Valid │   │Valid │   │Valid │   │Valid │         │
│  └──┬───┘   └──┬───┘   └──┬───┘   └──┬───┘   └──┬───┘         │
│     │          │          │          │          │               │
│     └──────────┴──────────┼──────────┴──────────┘               │
│                           │                                      │
│                           ▼                                      │
│               ┌───────────────────────┐                         │
│               │   RESULT AGGREGATOR   │                         │
│               │                       │                         │
│               │   모든 결과 통합      │                         │
│               │   갭 목록 생성        │                         │
│               │   점수 산정           │                         │
│               └───────────────────────┘                         │
└─────────────────────────────────────────────────────────────────┘
```

### 검증 결과 형식

```markdown
## Validation Results

### External Validation (Web)
| 항목 | 권장 사항 | 현재 상태 | 갭 |
|------|---------|---------|-----|
| Vue 3 Composition API | `<script setup>` 사용 | ✅ 사용 중 | - |
| TypeScript strict | `strict: true` | ✅ 설정됨 | - |
| Security Headers | CSP, CORS 설정 | ⚠️ 부분 적용 | CSP 누락 |
| ... | ... | ... | ... |

### Internal Validation (Documents)
| 규칙 | 준수 여부 | 비고 |
|------|---------|------|
| Mock-First 개발 | ✅ | db.json 사용 확인 |
| 디렉토리 구조 | ✅ | 규칙 준수 |
| API 패턴 | ⚠️ | 일부 직접 호출 발견 |
| ... | ... | ... |

### Cross Validation
| 영역 | 외부 기준 | 내부 기준 | 충족 |
|------|---------|---------|------|
| 상태 관리 | Pinia 권장 패턴 | Pinia 3 사용 | ✅ |
| API 레이어 | 서비스 패턴 권장 | src/api/ 규칙 | ✅ |
| ... | ... | ... | ... |

### Gap Summary
총 발견된 갭: X개
- Critical: X개
- High: X개
- Medium: X개
- Low: X개
```

---

## Continuous Validation

### 각 Phase에서 검증

```
PHASE 1: Planning
├── WebSearch로 최신 기술 트렌드 확인
├── 기획문서와 요구사항 교차 검증
└── 도메인 모델 검증

PHASE 2: TDD Development
├── Mock 데이터 완전성 검증
├── 구현 패턴 vs 권장 패턴 비교
└── 코드 스타일 규칙 검증

PHASE 3: Testing
├── 테스트 커버리지 vs 업계 표준
├── 테스트 패턴 vs 권장 패턴
└── E2E 시나리오 완전성

PHASE 4: Code Review
├── 보안 체크리스트 vs OWASP
├── 성능 패턴 vs 권장 사항
├── 아키텍처 vs 베스트 프랙티스
└── 스타일 vs ESLint/Prettier

PHASE 5: Completeness Check
├── 전체 요구사항 충족 검증
├── 전체 베스트 프랙티스 검증
├── 전체 문서화 검증
└── 최종 점수 산정
```

---

## Skill Integration

### 기존 스킬 활용

```yaml
# Ultimate Workflow에서 다른 스킬 활용

## sc:research 활용
- Phase 1, 5에서 웹 리서치 깊이 증가
- 기술 트렌드 조사

## sc:analyze 활용
- Phase 4에서 코드 품질 분석
- 보안, 성능, 아키텍처 분석

## sc:spec-panel 활용
- Phase 5에서 전문가 패널 의견 수렴
- 스펙 검증 및 개선 제안

## sc:reflect 활용
- 각 Phase 완료 후 검증
- Serena MCP로 세션 상태 저장
```

---

## Validation Scoring

### 검증 결과 → 점수 반영

```
베스트 프랙티스 점수 (25점 만점):

프로젝트 규칙 준수 (10점):
├── Mock-First 개발: 3점
├── 디렉토리 구조: 2점
├── API 패턴: 2점
├── 타입 정의: 2점
└── 기타 규칙: 1점

업계 표준 준수 (10점):
├── Vue 3 베스트 프랙티스: 3점
├── TypeScript 베스트 프랙티스: 2점
├── 보안 표준: 3점
└── 성능 표준: 2점

문서화 완료 (5점):
├── 코드 주석: 2점
├── API 문서: 2점
└── README 업데이트: 1점
```
