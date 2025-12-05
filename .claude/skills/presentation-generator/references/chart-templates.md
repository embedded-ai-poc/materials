# Chart.js 템플릿

`templates/scripts/charts.js`의 ChartUtils를 활용한 차트 생성 가이드.

---

## 차트 유형 선택 가이드

| 데이터 유형 | 추천 차트 | Chart.js 타입 | 사용 예시 |
|------------|----------|--------------|----------|
| 시계열 추이 | Line Chart | `line` | 연도별 성장률, 트렌드 변화 |
| 비교 데이터 | Bar Chart | `bar` | 기술 비교, 성능 벤치마크 |
| 비율/분포 | Doughnut | `doughnut` | 시장 점유율, 구성 비율 |
| 순위 | Horizontal Bar | `bar` (indexAxis: 'y') | Top 10 순위, 인기도 |
| 다차원 비교 | Radar Chart | `radar` | 기술 역량, 다각도 평가 |
| 누적 추이 | Stacked Area | `line` (stacked) | 카테고리별 누적 성장 |
| 상관관계 | Scatter | `scatter` | 변수 간 관계 분석 |

---

## Line Chart

### 기본 사용법

```html
<div class="chart-container">
  <canvas id="trendChart"></canvas>
</div>

<script>
ChartUtils.createLineChart('trendChart', {
  labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
  values: [10, 25, 45, 68, 82, 95],
  label: 'AI 도입률 (%)'
});
</script>
```

### 다중 데이터셋

```javascript
new Chart(document.getElementById('multiLineChart'), {
  type: 'line',
  data: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Product A',
        data: [30, 45, 60, 75],
        borderColor: 'var(--color-primary)',
        tension: 0.4
      },
      {
        label: 'Product B',
        data: [20, 35, 50, 65],
        borderColor: 'var(--color-secondary)',
        tension: 0.4
      }
    ]
  }
});
```

---

## Bar Chart

### 기본 사용법

```html
<div class="chart-container">
  <canvas id="comparisonChart"></canvas>
</div>

<script>
ChartUtils.createBarChart('comparisonChart', {
  labels: ['React', 'Vue', 'Angular', 'Svelte'],
  values: [40, 25, 20, 15],
  label: '시장 점유율 (%)'
});
</script>
```

### Horizontal Bar (순위)

```javascript
new Chart(document.getElementById('rankChart'), {
  type: 'bar',
  data: {
    labels: ['Python', 'JavaScript', 'TypeScript', 'Go', 'Rust'],
    datasets: [{
      label: '인기도',
      data: [95, 90, 75, 60, 55],
      backgroundColor: 'var(--color-primary)'
    }]
  },
  options: {
    indexAxis: 'y',
    plugins: {
      legend: { display: false }
    }
  }
});
```

---

## Doughnut Chart

### 기본 사용법

```html
<div class="chart-container">
  <canvas id="marketShareChart"></canvas>
</div>

<script>
ChartUtils.createDoughnutChart('marketShareChart', {
  labels: ['AWS', 'Azure', 'GCP', 'Others'],
  values: [32, 22, 10, 36]
});
</script>
```

### 커스텀 색상

```javascript
new Chart(document.getElementById('pieChart'), {
  type: 'doughnut',
  data: {
    labels: ['성공', '진행중', '실패'],
    datasets: [{
      data: [65, 25, 10],
      backgroundColor: [
        'var(--color-success)',
        'var(--color-warning)',
        'var(--color-error)'
      ]
    }]
  },
  options: {
    cutout: '60%'
  }
});
```

---

## Radar Chart

### 기본 사용법

```html
<div class="chart-container">
  <canvas id="skillRadar"></canvas>
</div>

<script>
ChartUtils.createRadarChart('skillRadar', {
  labels: ['성능', '안정성', '확장성', '보안', '비용'],
  datasets: [
    { label: 'Option A', values: [80, 90, 70, 85, 60] },
    { label: 'Option B', values: [70, 75, 90, 80, 80] }
  ]
});
</script>
```

### 단일 데이터셋

```javascript
new Chart(document.getElementById('singleRadar'), {
  type: 'radar',
  data: {
    labels: ['Frontend', 'Backend', 'DevOps', 'Data', 'Security'],
    datasets: [{
      label: '팀 역량',
      data: [85, 90, 70, 60, 75],
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
      borderColor: 'var(--color-primary)'
    }]
  }
});
```

---

## 테이블 (차트 대체)

차트보다 테이블이 적합한 경우:

| 상황 | 추천 형식 |
|------|----------|
| 정확한 수치 비교 필요 | 테이블 |
| 3개 이하 항목 비교 | 비교 카드 |
| 기능 유무 비교 | 체크마크 테이블 |
| 복잡한 다차원 데이터 | 테이블 + 하이라이트 |

### 비교 테이블

```html
<div class="comparison-table">
  <table>
    <thead>
      <tr>
        <th>기능</th>
        <th>Option A</th>
        <th>Option B</th>
        <th>Option C</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>실시간 동기화</td>
        <td><i data-lucide="check" class="text-success"></i></td>
        <td><i data-lucide="check" class="text-success"></i></td>
        <td><i data-lucide="x" class="text-error"></i></td>
      </tr>
      <tr>
        <td>오프라인 지원</td>
        <td><i data-lucide="check" class="text-success"></i></td>
        <td><i data-lucide="x" class="text-error"></i></td>
        <td><i data-lucide="check" class="text-success"></i></td>
      </tr>
      <tr>
        <td>가격 (월)</td>
        <td>$29</td>
        <td>$49</td>
        <td>$19</td>
      </tr>
    </tbody>
  </table>
</div>
```

### 하이라이트 카드

```html
<div class="highlight-cards">
  <div class="highlight-card">
    <div class="highlight-value">95%</div>
    <div class="highlight-label">고객 만족도</div>
  </div>
  <div class="highlight-card">
    <div class="highlight-value">2.5x</div>
    <div class="highlight-label">성능 향상</div>
  </div>
  <div class="highlight-card">
    <div class="highlight-value">40%</div>
    <div class="highlight-label">비용 절감</div>
  </div>
</div>
```

---

## 차트 컨테이너 스타일

```html
<!-- 기본 차트 컨테이너 -->
<div class="chart-container">
  <canvas id="myChart"></canvas>
</div>

<!-- 2열 그리드 -->
<div class="grid-2">
  <div class="chart-container">
    <canvas id="chart1"></canvas>
  </div>
  <div class="chart-container">
    <canvas id="chart2"></canvas>
  </div>
</div>

<!-- 전체 너비 -->
<div class="chart-container full-width">
  <canvas id="wideChart"></canvas>
</div>
```

---

## 테마 색상 변수

차트에서 사용 가능한 CSS 변수:

```css
--color-primary
--color-primary-light
--color-secondary
--color-accent
--color-success
--color-warning
--color-error
--color-info
```

JavaScript에서 사용:

```javascript
const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-primary').trim();
```
