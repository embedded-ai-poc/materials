---
name: presentation-generator
description: >
  주제만 입력하면 웹 기반 스크롤 발표자료를 자동 생성하는 End-to-End 워크플로우.
  리서치 → 아웃라인 → 에셋 → HTML 생성 → 검증까지 완전 자동화.
  발표자료, 프레젠테이션, 슬라이드 생성 요청시 사용.
  AI 주제는 8주 이내 정보만 유효. 6개 테마와 7개 주제 유형 지원.
allowed-tools: WebSearch, WebFetch, Read, Write, Edit, Glob, Grep, Bash
---

# Presentation Generator

주제만 입력받으면 리서치부터 최종 검증까지 End-to-End로 자동화하여 고품질 웹 기반 스크롤 발표자료를 생성합니다.

**모든 템플릿과 스타일은 이 스킬 폴더 내에 자체 포함되어 있습니다.**

---

## 스킬 내부 파일 구조

```
.claude/skills/presentation-generator/
├── SKILL.md                              # 메인 워크플로우
├── references/
│   ├── outline-patterns.md               # 유형별 아웃라인 패턴
│   ├── architecture-components.md        # HTML/CSS 아키텍처 컴포넌트
│   └── chart-templates.md                # Chart.js 템플릿
└── templates/
    ├── base.html                         # HTML 기본 템플릿
    ├── section.html                      # 섹션 HTML 템플릿
    ├── styles/
    │   ├── design-tokens.css             # 6개 테마 토큰
    │   └── main.css                      # 컴포넌트 스타일
    └── scripts/
        ├── main.js                       # 탭 네비게이션
        ├── scroll-animations.js          # GSAP 스크롤 애니메이션
        └── charts.js                     # Chart.js 유틸리티
```

---

## Quick Start

```powershell
# 1. 환경 준비
mkdir -Force output, assets\images

# 2. 발표자료 생성 후 미리보기
start chrome "file:///$PWD/output/[주제].html"
```

---

## 워크플로우 개요

```
Step 0: 환경 체크
    ↓
Step 1: 주제 분석 → 유형/테마/레이아웃 결정
    ↓
Step 2: 리서치 → 정의/트렌드/통계/사례 수집
    ↓
Step 3: 아웃라인 생성 → 사용자 확인
    ↓
Step 4: 에셋 생성 → 이미지/차트/다이어그램
    ↓
Step 5: HTML 생성 → 스킬 내부 templates/base.html 기반
    ↓
Step 6: 검증 → 팩트체크/내러티브 흐름
    ↓
Step 7: 완료 → 브라우저에서 열기
```

---

## Step 0: 환경 체크

### 디렉토리 생성

```powershell
mkdir -Force output, assets\images
```

### 템플릿 위치

**스킬 내부에 모든 템플릿이 포함되어 있습니다:**
- `templates/base.html` - 메인 HTML 템플릿
- `templates/styles/design-tokens.css` - 테마 CSS 변수
- `templates/styles/main.css` - 컴포넌트 스타일
- `templates/scripts/main.js` - 탭 네비게이션
- `templates/scripts/scroll-animations.js` - GSAP 애니메이션
- `templates/scripts/charts.js` - Chart.js 유틸리티

**HTML 생성 시**: CSS와 JS를 인라인으로 삽입하여 단일 HTML 파일로 생성합니다.

---

## Step 1: 주제 분석

### 1.1 주제 유형 분류

| 유형 | 특징 | 예시 | 테마 |
|------|------|------|------|
| **A** | 시스템/아키텍처 | K8s 클러스터, MSA | backstage |
| **B** | 개념/기술 설명 | GraphQL이란?, Docker 기초 | dark |
| **C** | 트렌드/인사이트 | 2025 AI 트렌드 | backstage |
| **D** | 튜토리얼/How-to | CI/CD 파이프라인 구축 | dark |
| **E** | 사례 연구 | 모놀리스 탈출기 | casual |
| **F** | 의사결정/제안 | Redis vs Memcached | corporate |
| **G** | 리서치/분석 | LLM 벤치마크 분석 | dark |

### 1.2 테마 자동 선택

| 키워드 | 테마 |
|--------|------|
| AI, ML, LLM, GPT, Claude | `backstage` |
| 보안, Security, 분석 | `dark` |
| DevOps, K8s, 인프라 | `backstage` |
| 개발, 코드, IDE | `dark` |
| 의사결정, 경영진 | `corporate` |
| 스타트업, 크리에이티브 | `casual` |
| 모던 UI, 디자인 | `glass` |
| 집중 발표 | `minimal` |

### 1.3 분석 결과 기록

```markdown
## 발표 전략

- **주제**: [입력된 주제]
- **유형**: [A~G]
- **테마**: [선택된 테마]
- **레이아웃**: [섹션별 계획]
- **아키텍처 필요**: [Yes/No]
- **예상 섹션**: [N개]
```

---

## Step 2: 리서치

### 2.1 핵심 개념

```
WebSearch: "[주제] 정의 개념 설명"
WebSearch: "[주제] 핵심 구성 요소"
```

### 2.2 최신 트렌드

```
WebSearch: "[주제] 2025 트렌드 동향"
WebSearch: "[주제] latest updates 2025"
```

**AI 주제 규칙**: 8주 이내 정보만 유효

### 2.3 데이터/통계

```
WebSearch: "[주제] 통계 데이터 수치"
WebSearch: "[주제] 시장 점유율"
```

### 2.4 사례 조사

```
WebSearch: "[주제] case study 사례"
WebSearch: "[주제] 도입 사례 기업"
```

### 2.5 기술 문서 (SW 주제)

```
WebSearch: "[주제] official documentation"
WebFetch: [공식 문서 URL]
```

### 2.6 팩트체크 규칙

- 최소 2개 출처 확인
- AI 주제: 8주 이전 = 레거시
- 일반 기술: 1년 이전 재확인
- 공식 문서 > 블로그 > 뉴스

---

## Step 3: 아웃라인 생성

### 유형별 패턴 (REFERENCE.md 참조)

**사용자에게 아웃라인 확인 요청 필수**

```markdown
## 발표자료 아웃라인: [제목]

| # | 섹션명 | 핵심 내용 | 레이아웃 | 시각 요소 |
|---|--------|----------|---------|----------|
| 1 | [제목] | [설명] | [1컬럼/2컬럼] | [차트/이미지] |
```

---

## Step 4: 에셋 생성

### 4.1 이미지 소싱 우선순위

1. **웹 검색** (권장): `WebSearch: "[주제] diagram png"`
2. **HTML/CSS 시각화**: 아키텍처, 플로우차트
3. **Placeholder**: 프롬프트 주석 삽입

### 4.2 차트 (Chart.js)

| 데이터 | 타입 |
|--------|------|
| 시계열 | `line` |
| 비교 | `bar` |
| 비율 | `doughnut` |
| 순위 | `bar` (indexAxis: 'y') |
| 다차원 | `radar` |

### 4.3 아키텍처 (HTML/CSS)

`templates/styles/main.css`의 `.arch-*` 클래스 사용:
- `.entry-box.success` / `.entry-box.legacy`
- `.system-container`, `.main-box`, `.inner-box`
- `.arrow.success`, `.connection-bar`

---

## Step 5: HTML 생성

### 5.1 템플릿 사용 (Self-Contained)

1. 스킬 내부 `templates/base.html` 읽기
2. `templates/styles/design-tokens.css` + `templates/styles/main.css` 읽어서 `{{STYLES}}` 위치에 인라인 삽입
3. `templates/scripts/*.js` 읽어서 `{{SCRIPTS}}` 위치에 인라인 삽입
4. 플레이스홀더 교체 후 `output/[주제].html`로 저장

**결과**: 단일 HTML 파일로 모든 스타일/스크립트 포함

### 5.2 플레이스홀더 교체

| 플레이스홀더 | 내용 |
|-------------|------|
| `{{TITLE}}` | 발표 제목 |
| `{{DESCRIPTION}}` | 메타 설명 |
| `{{LOGO_TEXT}}` | 로고 텍스트 |
| `{{TAG_ICON}}` | Lucide 아이콘명 |
| `{{TAG}}` | 태그 텍스트 |
| `{{TITLE_HIGHLIGHT}}` | 강조 제목 |
| `{{TITLE_REST}}` | 나머지 제목 |
| `{{SUBTITLE}}` | 부제목 |
| `{{DATE}}` | 날짜 |
| `{{AUTHOR}}` | 작성자 |
| `{{HERO_IMAGE}}` | 히어로 이미지 경로 |
| `{{SECTIONS}}` | 섹션 HTML |
| `{{CONCLUSION_TITLE}}` | 결론 제목 |
| `{{KEY_TAKEAWAYS}}` | 핵심 요점 |
| `{{REFERENCES}}` | 참고 자료 |

### 5.3 테마 적용

```html
<html lang="ko" data-theme="backstage">
```

### 5.4 섹션 구조

```html
<section class="presentation-section" data-section="섹션명" id="section-섹션명">
  <div class="section-content">
    <div class="section-header">
      <span class="section-number">01</span>
      <h2 class="section-title">섹션 제목</h2>
    </div>
    <div class="section-body">
      <div class="content-block">텍스트 콘텐츠</div>
      <div class="visual-block">이미지/차트</div>
    </div>
  </div>
</section>
```

### 5.5 애니메이션 클래스

- `.fade-in`: 페이드인 + 위로 슬라이드
- `.slide-in-left` / `.slide-in-right`
- `.scale-in`: 스케일 업
- `.stagger-container` + `.stagger-item`: 순차

---

## Step 6: 검증

### 6.1 수동 검증 체크리스트

브라우저에서 열어 확인:

```powershell
start chrome "file:///$PWD/output/[파일명].html"
```

**시각적 검증:**
- [ ] 모든 이미지 정상 표시
- [ ] 스타일/테마 정상 적용
- [ ] 폰트 렌더링 정상
- [ ] Lucide 아이콘 표시

**인터랙션 검증:**
- [ ] 스크롤 애니메이션 동작
- [ ] 탭 네비게이션 작동
- [ ] 차트 호버 툴팁
- [ ] 프로그레스 바 변화

**반응형:**
- [ ] 창 크기 조절시 레이아웃 유지
- [ ] 모바일 뷰 확인 (F12 → 기기 모드)

**콘솔:**
- [ ] F12 → Console 에러 없음

### 6.2 내러티브 흐름 검증

- [ ] 도입부: 관심 유발
- [ ] 맥락: 배경 충분
- [ ] 전개: 논리적 순서
- [ ] 결론: 명확한 메시지
- [ ] 전환: 섹션 간 연결

### 6.3 아키텍처 품질 (해당시)

| 항목 | 배점 |
|------|------|
| 구조적 완성도 | 30 |
| 시각적 일관성 | 25 |
| 기술적 정확성 | 25 |
| 반응형/인터랙션 | 20 |

**통과 기준**: 70점 이상

---

## Step 7: 완료

```powershell
start chrome "file:///$PWD/output/[주제].html"
```

### 전달 항목

- HTML 파일 경로
- 생성된 에셋 목록
- 검증 결과 요약

---

## 자동화 규칙

### Step 전환 조건

| Step | 완료 조건 | 실패시 |
|------|----------|--------|
| 0 | 파일 존재 | 생성 |
| 1 | 유형/테마 결정 | 질문 |
| 2 | 리서치 5개+ | 재시도 |
| 3 | 아웃라인 승인 | 재제출 |
| 4 | 에셋 완료 | 대체 방식 |
| 5 | HTML 생성 | 에러 수정 |
| 6 | 검증 통과 | 재검증 |

### 롤백 규칙

| 현재 | 조건 | 돌아갈 곳 |
|------|------|----------|
| 5 | 콘텐츠 부족 | 2 |
| 6 | 팩트체크 실패 | 2 |
| 6 | 아키텍처 오류 | 4 |
| 6 | 구조 문제 | 3 |

---

## 참조 파일

- `references/outline-patterns.md`: 유형별 아웃라인 패턴
- `references/architecture-components.md`: HTML/CSS 아키텍처 컴포넌트
- `references/chart-templates.md`: Chart.js 템플릿
- `templates/section.html`: 섹션 HTML 템플릿
