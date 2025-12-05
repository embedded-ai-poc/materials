# HTML/CSS 아키텍처 컴포넌트

아키텍처 다이어그램은 이미지 대신 HTML/CSS로 직접 구현합니다.
`templates/styles/main.css`에 정의된 컴포넌트를 활용합니다.

---

## 기본 플로우 패턴

### Entry → System → External

```html
<!-- 1. 진입점 -->
<div class="entry-box-container">
  <div class="entry-box success">
    <div class="title">Vue 3.0</div>
    <div class="subtitle">통합 웹 인터페이스</div>
  </div>
</div>

<!-- 2. 화살표 -->
<div class="arrow success">▼</div>

<!-- 3. 시스템 컨테이너 -->
<div class="system-container success">
  <div class="system-label">SE System</div>

  <!-- Main Box -->
  <div class="main-box success">
    <div class="main-box-header">서비스명</div>
    <div class="main-box-content">
      <!-- Inner Boxes -->
      <div class="inner-box ai">
        <div class="inner-header">AI 기능</div>
        <div class="inner-body">
          <div class="service-tags">
            <span class="service-tag">기능1</span>
            <span class="service-tag">기능2</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- 4. 외부 서비스 -->
<div class="external-section">
  <div class="external-box success">
    <div class="external-header">외부 연동</div>
    <div class="external-grid">
      <div class="external-item success">
        <div class="name">Jenkins</div>
        <div class="desc">CI/CD</div>
      </div>
    </div>
  </div>
</div>
```

---

## AS-IS / TO-BE 비교

```html
<div class="arch-comparison">
  <div class="arch-comparison-side as-is">
    <div class="arch-comparison-title">AS-IS</div>
    <div class="entry-box legacy">
      <div class="title">Legacy System</div>
      <div class="subtitle">기존 모놀리식 구조</div>
    </div>
    <!-- 레거시 컴포넌트들 -->
  </div>

  <div class="arch-comparison-side to-be">
    <div class="arch-comparison-title">TO-BE</div>
    <div class="entry-box success">
      <div class="title">New System</div>
      <div class="subtitle">마이크로서비스 구조</div>
    </div>
    <!-- 신규 컴포넌트들 -->
  </div>
</div>
```

---

## 탭 기반 아키텍처 뷰

```html
<div class="arch-tabs">
  <input type="radio" name="arch-tabs" id="arch-tab1" checked>
  <input type="radio" name="arch-tabs" id="arch-tab2">

  <div class="arch-tab-nav">
    <label for="arch-tab1">현재 구조</label>
    <label for="arch-tab2">목표 구조</label>
  </div>

  <div class="arch-tab-content" id="arch-content1">
    <!-- AS-IS 아키텍처 -->
  </div>
  <div class="arch-tab-content" id="arch-content2">
    <!-- TO-BE 아키텍처 -->
  </div>
</div>
```

---

## 스타일 클래스 레퍼런스

### 상태별 클래스

| 컴포넌트 | TO-BE (신규) | AS-IS (레거시) |
|---------|-------------|---------------|
| Entry Box | `.entry-box.success` | `.entry-box.legacy` |
| System Container | `.system-container.success` | `.system-container.legacy` |
| Main Box | `.main-box.success` | `.main-box.legacy` |
| Inner Box | `.inner-box.ai`, `.inner-box.ops` | `.inner-box.ai.legacy` |
| Grid Item | `.grid-item.success` | `.grid-item.legacy` |
| Arrow | `.arrow.success` | `.arrow` (기본 회색) |

### Connection Bar

```html
<div class="connection-bar kafka">Apache Kafka 이벤트 버스</div>
<div class="connection-bar db">PostgreSQL (Supabase)</div>
<div class="connection-bar neutral">일반 연결</div>
```

### Monolith Box

```html
<div class="monolith-box">
  <div class="title">모놀리식 통합 구조</div>
  <div class="desc">마이크로서비스 미분리</div>
  <div class="monolith-content">
    <span class="mono-tag">Project</span>
    <span class="mono-tag">Build</span>
    <span class="mono-tag">Deploy</span>
  </div>
</div>
```

---

## 그리드 레이아웃

### 컬럼 옵션

```html
<div class="item-grid col-3">...</div>  <!-- 3컬럼 -->
<div class="item-grid col-5">...</div>  <!-- 5컬럼 -->
<div class="item-grid col-7">...</div>  <!-- 7컬럼 -->
```

### 그리드 아이템

```html
<div class="item-grid col-3">
  <div class="grid-item success">
    <i data-lucide="server"></i>
    <div class="item-name">API Server</div>
    <div class="item-desc">REST API</div>
  </div>
  <div class="grid-item success">
    <i data-lucide="database"></i>
    <div class="item-name">Database</div>
    <div class="item-desc">PostgreSQL</div>
  </div>
  <div class="grid-item success">
    <i data-lucide="cloud"></i>
    <div class="item-name">Storage</div>
    <div class="item-desc">S3</div>
  </div>
</div>
```

---

## Inner Box 유형

```html
<!-- AI 기능 -->
<div class="inner-box ai">
  <div class="inner-header">AI Engine</div>
  <div class="inner-body">
    <div class="service-tags">
      <span class="service-tag">LLM</span>
      <span class="service-tag">Embedding</span>
    </div>
  </div>
</div>

<!-- Ops 기능 -->
<div class="inner-box ops">
  <div class="inner-header">DevOps</div>
  <div class="inner-body">
    <div class="service-tags">
      <span class="service-tag">CI/CD</span>
      <span class="service-tag">Monitoring</span>
    </div>
  </div>
</div>

<!-- Core 기능 -->
<div class="inner-box core">
  <div class="inner-header">Core Services</div>
  <div class="inner-body">
    <div class="service-tags">
      <span class="service-tag">Auth</span>
      <span class="service-tag">API</span>
    </div>
  </div>
</div>
```

---

## 화살표 방향

```html
<div class="arrow success">▼</div>  <!-- 아래 -->
<div class="arrow success">▲</div>  <!-- 위 -->
<div class="arrow success">→</div>  <!-- 오른쪽 -->
<div class="arrow success">←</div>  <!-- 왼쪽 -->
```

---

## 전체 너비 레이아웃

아키텍처 섹션은 전체 너비로 표시:

```html
<div class="section-body" style="grid-template-columns: 1fr;">
  <!-- 아키텍처 다이어그램 전체 -->
</div>
```

---

## Placeholder (이미지 필요시)

이미지 생성이 필요한 경우 프롬프트 주석 삽입:

```html
<!-- [IMAGE_PROMPT: architecture_kubernetes]
Style: Dark tech, blue/purple gradient
Subject: Kubernetes cluster architecture
Composition: Layered diagram, control plane, worker nodes
Requirements: no text, 16:9, clean modern
[/IMAGE_PROMPT] -->
<div class="image-placeholder" style="background: linear-gradient(135deg, #1e3a5f, #2d1b4e); padding: 60px; text-align: center; border-radius: 12px;">
  <i data-lucide="image" style="width: 48px; height: 48px; color: #60a5fa;"></i>
  <p style="color: #94a3b8; margin-top: 12px;">Kubernetes Architecture</p>
</div>
```
