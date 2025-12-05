---
description: 주제와 리서치 데이터를 입력받아 웹 기반 발표자료를 생성하는 Antigravity 전용 워크플로우
---

// turbo-all

# 발표자료 생성 워크플로우 (Antigravity)

## 핵심 원칙

1. **Antigravity 도구 활용**: `generate_image`, `search_web`, `read_url_content`, `browser_subagent`, `notify_user`
2. **미니멀 디자인**: 날카로운 모서리(0-4px), 깔끔한 단일 보더, WCAG AA 색상 대비
3. **이모지 금지**: 모든 아이콘은 Lucide 사용 (`<i data-lucide="icon-name"></i>`)
4. **유연한 레이아웃**: 발표자료별 고유한 디자인

---

## Step 0: 환경 확인

```powershell
New-Item -ItemType Directory -Force -Path "output"
New-Item -ItemType Directory -Force -Path "assets\images"
```

**필수 템플릿:**
- `templates/base.html`
- `templates/styles/design-tokens.css`, `main.css`
- `templates/scripts/main.js`, `scroll-animations.js`, `charts.js`
- `templates/reference/architecture_refer.html`

---

## Step 1: 주제 분석

### 1.1 주제 유형

| 유형 | 예시 | 테마 추천 |
|------|------|----------|
| A. 시스템/아키텍처 | K8s 클러스터 설계 | backstage |
| B. 개념/기술 설명 | Docker 기초 | atom |
| C. 트렌드/인사이트 | 2025 AI 트렌드 | claude |
| D. 튜토리얼 | CI/CD 구축 | backstage |
| E. 사례 연구 | 마이크로서비스 전환 | corporate |
| F. 의사결정/제안 | Redis vs Memcached | midnight |
| G. 리서치/분석 | 보안 취약점 리포트 | midnight |

### 1.2 분석 기록

```markdown
- **주제**: [입력된 주제]
- **유형**: [A~G]
- **테마**: [선택]
- **핵심 시각 요소**: [차트/다이어그램/코드/이미지]
```

---

## Step 2: 리서치 실행

```
/research-topic [주제명]
```

수집 항목: 정의, 트렌드, 데이터, 사례, 참고 URL

---

## Step 3: 아웃라인 생성

### 유형별 패턴

**A. 시스템/아키텍처:**
1. 현재 상황과 문제점
2. 요구사항 분석
3. 시스템 설계 (아키텍처 탭)
4. 핵심 컴포넌트 상세
5. 구현 결과/성과
6. 향후 계획

**F. 의사결정/제안:**
1. 결정이 필요한 배경
2. 검토한 옵션들
3. 비교 분석 (Radar 차트)
4. 추천안과 근거
5. 다음 단계

```javascript
notify_user({
  Message: "아웃라인 검토 부탁드립니다.",
  PathsToReview: ["아웃라인 경로"],
  BlockedOnUser: true
})
```

---

## Step 4: 에셋 생성

```
/generate-assets
```

생성 항목:
- Hero 이미지: `generate_image`
- 차트: Chart.js
- 아키텍처: `templates/reference/architecture_refer.html` 참조

---

## Step 5: HTML 생성

### 5.1 디자인 규칙

```css
/* 필수 사용 */
var(--color-primary)
var(--color-bg-card)
var(--color-text-primary)
var(--radius-sm)  /* 2px */
var(--radius-md)  /* 3px */
var(--radius-lg)  /* 4px 최대 */

/* 금지 */
border-radius: 100px;  /* pill */
border-radius: 8px;    /* 둥근 모서리 */
이모지 사용
```

### 5.2 섹션 구조

```html
<section class="presentation-section" data-section="섹션명" id="section-섹션명">
  <div class="section-content">
    <div class="section-header">
      <span class="section-number">01</span>
      <h2 class="section-title">제목</h2>
    </div>
    <div class="section-body">
      <div class="content-block">텍스트</div>
      <div class="visual-block">차트/이미지</div>
    </div>
  </div>
</section>
```

### 5.3 차트

```javascript
ChartUtils.createLineChart('chartId', {
  labels: ['2020', '2021', '2022'],
  values: [10, 20, 30],
  label: '데이터셋'
});

ChartUtils.createRadarChart('radarId', {
  labels: ['성능', '안정성', '확장성'],
  datasets: [
    { label: 'A', values: [80, 90, 70] },
    { label: 'B', values: [70, 75, 90] }
  ]
});
```

### 5.4 저장

```
output/[주제-kebab-case].html
```

---

## Step 6: E2E 검증

```
/verify-presentation [파일 경로]
```

---

## Step 7: 전달

```javascript
notify_user({
  Message: `발표자료 완료! output/[주제].html
  
브라우저 열기: start chrome "file:///[경로]"`,
  PathsToReview: ["output/[주제].html"],
  BlockedOnUser: false
})
```

---

## 롤백 조건

| 현재 | 조건 | 이동 |
|------|------|------|
| Step 5 | 콘텐츠 부족 | Step 2 |
| Step 6 | 팩트체크 실패 | Step 2 |
| Step 6 | 아키텍처 오류 | Step 4 |
