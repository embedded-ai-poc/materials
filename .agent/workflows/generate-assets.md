---
description: 발표자료에 필요한 이미지와 차트를 생성하는 워크플로우
---

// turbo-all

# 에셋 생성 워크플로우 (Antigravity)

`generate_image` 도구로 발표자료 에셋을 생성합니다.

---

## Step 1: 에셋 분류

| 유형 | 처리 방식 |
|------|----------|
| Hero Image | `generate_image` |
| Concept Diagram | `generate_image` |
| Architecture | HTML/CSS (레퍼런스 참조) |
| Icon | Lucide 아이콘 |
| Chart | Chart.js |

---

## Step 2: Hero 이미지 생성

```javascript
generate_image({
  Prompt: "[테마 스타일] illustration representing [주제],
           flat vector style, geometric shapes,
           solid color background, no text, no people,
           professional presentation, 16:9",
  ImageName: "hero_[주제]"
})
```

### 테마별 스타일

| 테마 | 스타일 키워드 |
|------|-------------|
| backstage | Dark tech, cyan mint, infrastructure |
| claude | Warm orange gradient, AI aesthetic |
| atom | Blue purple, code editor |
| midnight | Deep indigo, analytical |
| corporate | Clean blue, professional |
| minimal | Black white, Swiss design |

---

## Step 3: 섹션 이미지 생성

```javascript
generate_image({
  Prompt: "[테마 스타일] illustration of [개념],
           clean tech aesthetic, flat design, no text",
  ImageName: "section_[번호]_[키워드]"
})
```

---

## Step 4: 차트 코드

### Line Chart

```javascript
ChartUtils.createLineChart('chartId', {
  labels: ['2020', '2021', '2022', '2023', '2024'],
  values: [20, 35, 55, 75, 90],
  label: '도입률(%)'
});
```

### Bar Chart

```javascript
ChartUtils.createBarChart('barId', {
  labels: ['A', 'B', 'C'],
  values: [30, 50, 70],
  label: '비율'
});
```

### Horizontal Bar

```javascript
ChartUtils.createHorizontalBarChart('hbarId', {
  labels: ['AWS', 'Azure', 'GCP'],
  values: [45, 30, 25],
  label: '점유율(%)'
});
```

### Radar Chart

```javascript
new Chart(ctx, {
  type: 'radar',
  data: {
    labels: ['성능', '안정성', '확장성', '보안', '비용'],
    datasets: [
      { label: 'A', data: [80, 90, 70, 85, 60], borderColor: 'rgb(59, 130, 246)', backgroundColor: 'rgba(59, 130, 246, 0.2)' },
      { label: 'B', data: [70, 75, 90, 80, 80], borderColor: 'rgb(239, 68, 68)', backgroundColor: 'rgba(239, 68, 68, 0.2)' }
    ]
  }
});
```

### Doughnut Chart

```javascript
ChartUtils.createDoughnutChart('doughnutId', {
  labels: ['사용중', '미사용', '테스트'],
  values: [60, 25, 15]
});
```

---

## Step 5: 아키텍처 다이어그램

`templates/reference/architecture_refer.html` 패턴 사용:

### Entry Box

```html
<div class="entry-box-container">
  <div class="entry-box success">  <!-- 또는 legacy -->
    <div class="title">Vue 3.0</div>
    <div class="subtitle">통합 웹 인터페이스</div>
  </div>
</div>
<div class="arrow success">▼</div>
```

### System Container

```html
<div class="system-container success">
  <div class="system-label">SE System</div>
  <!-- 내부 컨텐츠 -->
</div>
```

### Main Box

```html
<div class="main-box success">
  <div class="main-box-header">서비스명 (Spring Boot 3.x)</div>
  <div class="main-box-content">
    <!-- Inner Box -->
  </div>
</div>
```

### Inner Box

```html
<div class="inner-box ai">  <!-- ai, ops -->
  <div class="inner-header">
    AI 기능 <span class="count">5개</span>
  </div>
  <div class="inner-body">
    <div class="service-tags">
      <span class="service-tag">기능1</span>
      <span class="service-tag">기능2</span>
    </div>
  </div>
</div>
```

### Grid Items

```html
<div class="item-grid col-5">  <!-- col-3, col-5, col-7 -->
  <div class="grid-item success">
    <div class="name">서비스명</div>
    <div class="desc">설명</div>
  </div>
</div>
```

### Connection Bar

```html
<div class="connection-bar kafka">Apache Kafka</div>
<div class="connection-bar db">PostgreSQL</div>
<div class="connection-bar neutral">Legacy DB</div>
```

---

## 이미지 프롬프트 가이드

**DO:** 추상적 표현, 테마 키워드, "no text", flat/geometric 스타일
**DON'T:** 구체적 텍스트, 복잡한 씬, 사실적 스타일
