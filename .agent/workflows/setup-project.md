---
description: 프로젝트 초기 환경 설정 및 템플릿 검증 워크플로우
---

# 프로젝트 설정 워크플로우 (Antigravity)

`.agent` 디렉토리만으로 완전한 웹 프리젠테이션 프레임워크를 구축합니다.

---

## Step 1: 디렉토리 구조 생성
// turbo-all

```powershell
# 필수 디렉토리 생성
New-Item -ItemType Directory -Force -Path "output"
New-Item -ItemType Directory -Force -Path "assets\images"
New-Item -ItemType Directory -Force -Path "templates\styles"
New-Item -ItemType Directory -Force -Path "templates\scripts"
New-Item -ItemType Directory -Force -Path "templates\reference"
```

---

## Step 2: 템플릿 파일 검증

**필수 파일 체크리스트:**

| 파일 | 용도 | 필수 |
|------|------|------|
| `templates/base.html` | HTML 기본 구조 | ✓ |
| `templates/styles/design-tokens.css` | 테마 변수 (WCAG AA) | ✓ |
| `templates/styles/main.css` | 컴포넌트 스타일 | ✓ |
| `templates/scripts/main.js` | 네비게이션/프로그레스 | ✓ |
| `templates/scripts/scroll-animations.js` | GSAP 스크롤 효과 | ✓ |
| `templates/scripts/charts.js` | Chart.js 유틸리티 | ✓ |
| `templates/reference/architecture_refer.html` | 아키텍처 참조 | 권장 |

```powershell
# 파일 존재 확인
$files = @(
    "templates/base.html",
    "templates/styles/design-tokens.css",
    "templates/styles/main.css",
    "templates/scripts/main.js",
    "templates/scripts/scroll-animations.js",
    "templates/scripts/charts.js"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "[OK] $file"
    } else {
        Write-Host "[MISSING] $file" -ForegroundColor Red
    }
}
```

---

## Step 3: CDN 의존성 확인

**외부 의존성 목록:**

| 라이브러리 | 버전 | CDN URL |
|-----------|------|---------|
| Inter Font | - | fonts.googleapis.com |
| Lucide Icons | latest | unpkg.com/lucide@latest |
| Chart.js | 4.4.1 | cdn.jsdelivr.net/npm/chart.js@4.4.1 |
| GSAP | 3.12.5 | cdn.jsdelivr.net/npm/gsap@3.12.5 |
| ScrollTrigger | 3.12.5 | cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js |

---

## Step 4: 테마 목록 확인

`design-tokens.css`에 정의된 테마:

| 테마 | data-theme | 적합 주제 |
|------|------------|----------|
| Backstage | `backstage` | DevOps, 인프라, K8s |
| Claude | `claude` / `warm-dark` | AI/ML, LLM |
| Atom | `atom` | 코딩, IDE, 개발도구 |
| Midnight | `midnight` | 보안, 분석, 데이터 |
| Corporate | `corporate` | 기업 발표, 제안서 |
| Minimal | `minimal` | 미니멀, 비즈니스 |
| Terminal | `terminal` | CLI, DevOps |
| Warm | `warm` / `warm-dark` | 일반 주제 |

---

## Step 5: 설정 완료 확인

```javascript
notify_user({
  Message: `프로젝트 설정 완료!

필수 디렉토리: output/, assets/images/, templates/
템플릿 파일: 모두 확인됨

다음 단계:
/create-presentation [주제명]`,
  BlockedOnUser: false
})
```

---

## 트러블슈팅

| 문제 | 해결 |
|------|------|
| 템플릿 파일 누락 | `base.html` 및 CSS/JS 파일 수동 생성 필요 |
| CDN 접근 불가 | 로컬 파일로 대체 또는 네트워크 확인 |
| 권한 오류 | 관리자 권한으로 PowerShell 실행 |
