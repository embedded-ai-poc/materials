---
description: 주제에 대한 심층 리서치를 수행하여 발표자료 콘텐츠를 준비하는 워크플로우
---

// turbo-all

# 리서치 워크플로우 (Antigravity)

`search_web`, `read_url_content` 도구를 활용한 심층 리서치

---

## Step 1: 핵심 개념 검색

```javascript
search_web({ query: "[주제] 정의 개념 설명" })
search_web({ query: "[주제] architecture components" })
```

---

## Step 2: 최신 트렌드 조사

```javascript
search_web({ query: "[주제] 2025 트렌드" })
search_web({ query: "[주제] latest updates 2025" })
```

**AI 주제**: 8주 이내 정보만 유효

---

## Step 3: 데이터/통계 수집

```javascript
search_web({ query: "[주제] 통계 데이터 2024 2025" })
search_web({ query: "[주제] market share adoption" })
```

---

## Step 4: 실제 사례 조사

```javascript
search_web({ query: "[주제] case study 사례" })
search_web({ query: "[주제] 기업 도입 사례" })
```

---

## Step 5: 공식 문서 확인

```javascript
search_web({ query: "[주제] official documentation" })

// URL 발견시
read_url_content({ Url: "[공식 문서 URL]" })
```

---

## Step 6: 결과 정리

```markdown
## 리서치 결과: [주제명]

### 1. 핵심 개념
- [정의]

### 2. 주요 구성 요소
- [컴포넌트]

### 3. 최신 트렌드
- [트렌드] (출처, 날짜)

### 4. 데이터/통계
| 항목 | 수치 | 출처 |
|------|------|------|
| ... | ... | ... |

### 5. 실제 사례
- [기업]: [사례 내용]

### 6. 참고 자료
- [URL] - [설명]
```

---

## 팩트체크 규칙

1. **다중 출처**: 최소 2개 출처 확인
2. **날짜 확인**: AI 8주, 일반 1년 이내
3. **우선순위**: 공식 문서 > 기술 블로그 > 뉴스
4. **자동 검증**: 숫자/통계, "가장/최초/유일", 버전 정보

```markdown
## 팩트체크

| 정보 | 출처1 | 출처2 | 상태 |
|------|-------|-------|------|
| ... | [URL] | [URL] | Pass |
```
