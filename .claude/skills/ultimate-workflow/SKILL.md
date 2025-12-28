---
name: ultimate-workflow
description: |
  실용적인 구현 워크플로우: Plan → Implement → Validate 사이클.
  최대 3회 반복으로 80점 이상 품질 달성.
  Use when: "ultimate workflow", "완벽하게 구현", "품질 높게", "제대로 구현"
allowed-tools: Task, Bash, Read, Write, Edit, Grep, Glob, WebSearch, WebFetch, TodoWrite
---

# Ultimate Workflow - Practical Implementation

> 실제 동작하는 품질 중심 개발 워크플로우

## Execution Flow

```
┌─────────────────────────────────────────────────────────┐
│                 PRACTICAL WORKFLOW                       │
│                                                         │
│   PHASE 1        PHASE 2         PHASE 3               │
│   ┌──────┐      ┌──────────┐    ┌──────────┐           │
│   │ PLAN │ ───▶ │IMPLEMENT │───▶│ VALIDATE │           │
│   └──────┘      └──────────┘    └────┬─────┘           │
│                                      │                  │
│                         ┌────────────┴────────────┐     │
│                         ▼                         ▼     │
│                   Score < 80?              Score >= 80? │
│                         │                         │     │
│                         ▼                         ▼     │
│                   ┌──────────┐              ┌────────┐  │
│                   │ ITERATE  │              │ DONE   │  │
│                   │ (max 3x) │              └────────┘  │
│                   └────┬─────┘                          │
│                        │                                │
│                        └────────▶ PHASE 1               │
└─────────────────────────────────────────────────────────┘
```

---

## PHASE 1: PLAN (기획)

### 실행 단계

**Step 1.1: 요구사항 분석**
```
사용자 요구사항을 분석하여 다음을 도출:
1. 명시적 요구사항 목록 (ID 부여)
2. 각 요구사항의 수용 기준 (AC)
3. 예상 수정 파일 목록
```

**Step 1.2: 코드베이스 탐색** (Task 사용)
```yaml
Task:
  subagent_type: "Explore"
  description: "Explore codebase for implementation"
  prompt: |
    요구사항 구현을 위해 코드베이스를 탐색하세요.

    탐색 대상:
    1. 관련 기존 컴포넌트/모듈
    2. 사용 가능한 유틸리티/헬퍼
    3. 기존 패턴 및 컨벤션
    4. 수정이 필요한 파일 목록

    CLAUDE.md의 프로젝트 규칙 참조 필수.
```

**Step 1.3: 작업 계획 수립**
```
TodoWrite로 작업 목록 생성:
- 각 기능별 구현 태스크
- 테스트 작성 태스크
- 검증 태스크
```

### Phase 1 산출물
```markdown
## 요구사항 체크리스트
| ID | 요구사항 | AC | 상태 |
|----|---------|----|----|
| REQ-001 | ... | ... | ⬜ |

## 작업 계획
| Task | 파일 | 우선순위 |
|------|------|---------|
| T-001 | ... | P1 |
```

---

## PHASE 2: IMPLEMENT (구현)

### 실행 단계

**Step 2.1: Mock 데이터 준비** (프로젝트 규칙)
```
새 API 데이터 필요 시:
1. mock-server/db.json에 데이터 추가
2. ID 컨벤션 준수 (Project: 1000-1999, Layer: 2000-2999 등)
3. curl로 API 응답 확인
```

**Step 2.2: 테스트 먼저 작성** (TDD)
```
각 요구사항에 대해:
1. 실패하는 테스트 작성
2. 테스트 실행하여 실패 확인
```

**Step 2.3: 기능 구현**
```
테스트를 통과하는 코드 작성:
1. 기존 패턴/컨벤션 준수
2. 타입 안정성 확보
3. 에러 처리 포함
```

**Step 2.4: 테스트 통과 확인**
```bash
npm run test
npm run build
```

### Phase 2 체크리스트
```markdown
□ Mock 데이터가 db.json에 추가됨
□ 테스트가 작성됨
□ 모든 테스트 통과
□ 빌드 성공
□ 타입 에러 없음
```

---

## PHASE 3: VALIDATE (검증)

### 실행 단계

**Step 3.1: 병렬 검증** (3개 에이전트 동시 실행)

```yaml
# 동시에 3개 Task 호출

Task 1 - Quality Check:
  subagent_type: "general-purpose"
  description: "Check code quality"
  prompt: |
    구현된 코드의 품질을 검증하세요.

    검증 항목:
    1. 보안: XSS, Injection 취약점
    2. 성능: 불필요한 리렌더링, 메모리 누수
    3. 타입: any 사용, 타입 에러

    각 이슈에 대해 파일:라인, 심각도, 수정방법 보고.

Task 2 - Test & Build:
  subagent_type: "general-purpose"
  description: "Run tests and build"
  prompt: |
    테스트와 빌드를 실행하세요.

    실행:
    1. npm run test
    2. npm run build
    3. npm run lint (있다면)

    결과를 정확히 보고하세요.

Task 3 - Requirement Check:
  subagent_type: "general-purpose"
  description: "Verify requirements"
  prompt: |
    요구사항 충족 여부를 검증하세요.

    각 요구사항에 대해:
    1. 구현 완료 여부
    2. AC 충족 여부
    3. 테스트 존재 여부

    체크리스트 형식으로 보고.
```

**Step 3.2: 점수 산정**

```
점수 계산 (100점 만점):

요구사항 (40점):
  = (완료된 요구사항 / 전체) × 40

테스트 (30점):
  통과율 100% = 20점
  빌드 성공 = 10점

품질 (30점):
  보안 이슈 없음 = 10점
  성능 이슈 없음 = 10점
  타입 에러 없음 = 10점
```

**Step 3.3: 판정**

```
IF score >= 80:
  → 완료 (사용자에게 결과 보고)

ELSE IF iteration < 3:
  → 부족한 항목 식별
  → iteration++
  → PHASE 1로 (해당 항목만 개선)

ELSE:
  → 현재 상태로 완료
  → 미해결 항목 보고
```

---

## Scoring Table

| 영역 | 항목 | 배점 |
|------|------|------|
| **요구사항** | 명시적 요구사항 완료 | 30점 |
| | 암묵적 요구사항 완료 | 10점 |
| **테스트** | 테스트 100% 통과 | 20점 |
| | 빌드 성공 | 10점 |
| **품질** | 보안 이슈 없음 | 10점 |
| | 성능 이슈 없음 | 10점 |
| | 타입 에러 없음 | 10점 |
| **TOTAL** | | **100점** |

**목표: 80점 이상**

---

## Iteration Rules

### 제한 사항
```
최대 반복: 3회
최대 병렬 에이전트: 3개
목표 점수: 80점 이상
```

### 반복 시 집중 영역
```
Iteration 1: 전체 구현 (기본)
Iteration 2: 테스트/품질 보완
Iteration 3: 미세 조정 (필요시)
```

### 조기 완료 조건
```
1. 모든 요구사항 완료 (40점)
2. 테스트 통과 + 빌드 성공 (30점)
3. Critical 이슈 없음

→ 70점 이상이면 사용자에게 완료 여부 확인
```

---

## Quick Reference

### Phase 1 (Plan)
```
1. 요구사항 분석 → 체크리스트 생성
2. Task(Explore)로 코드베이스 탐색
3. TodoWrite로 작업 계획 수립
```

### Phase 2 (Implement)
```
1. db.json에 Mock 데이터 추가 (필요시)
2. 테스트 먼저 작성
3. 구현
4. npm run test && npm run build
```

### Phase 3 (Validate)
```
1. 3개 Task 병렬 실행 (Quality, Test, Requirement)
2. 점수 산정
3. 80점 이상? → 완료 / 미만? → 반복
```

---

## Anti-Hallucination Rules

### 금지
```
❌ "아마 완료된 것 같다" - 추측 금지
❌ 테스트 실행 없이 "통과 예상" - 가정 금지
❌ "이 정도면 충분하다" - 점수 없이 완료 금지
```

### 필수
```
✅ 모든 판단은 실제 도구 실행 결과 기반
✅ 테스트 결과는 npm run test 실행 후 보고
✅ 빌드 성공은 npm run build 실행 후 확인
✅ 점수는 체크리스트 기반으로 명시적 계산
```

---

## Example Execution

```
User: "사용자 프로필 편집 기능 구현해줘"

[PHASE 1: PLAN]
→ 요구사항 분석: 프로필 조회, 수정, 저장
→ Task(Explore)로 기존 프로필 관련 코드 탐색
→ TodoWrite로 3개 태스크 생성

[PHASE 2: IMPLEMENT]
→ db.json에 프로필 데이터 추가
→ 프로필 편집 테스트 작성
→ ProfileEdit.vue 컴포넌트 구현
→ npm run test (통과), npm run build (성공)

[PHASE 3: VALIDATE]
→ 3개 에이전트 병렬 실행
→ 점수: 요구사항 35/40 + 테스트 30/30 + 품질 25/30 = 90점
→ 80점 이상 → 완료!

[결과 보고]
✅ 프로필 편집 기능 구현 완료
- 구현 파일: ProfileEdit.vue, profileApi.ts
- 테스트: 5개 통과
- 점수: 90/100
```
