---
description: 생성된 발표자료의 E2E 테스트 및 품질 검증을 수행하는 워크플로우
---

// turbo-all

# 발표자료 검증 워크플로우 (Antigravity)

`browser_subagent` 도구로 E2E 테스트를 수행합니다.

---

## Step 1: 페이지 로드 테스트

```javascript
browser_subagent({
  TaskName: "Page Load Test",
  Task: `Navigate to file:///[절대경로]. 
         Wait for page to fully load. 
         Check for console errors. 
         Verify all images load.
         Confirm Lucide icons render.
         Return when page is fully loaded.`,
  RecordingName: "load_test"
})
```

**체크리스트:**
- [ ] 페이지 로드 완료
- [ ] 콘솔 에러 없음
- [ ] 이미지 정상 표시
- [ ] Lucide 아이콘 렌더링

---

## Step 2: 스크롤 애니메이션 테스트

```javascript
browser_subagent({
  TaskName: "Scroll Animation Test",
  Task: `Slowly scroll from top to bottom of the page.
         Observe scroll-triggered animations.
         Verify elements fade in smoothly.
         Scroll back to top.
         Report any animation issues.`,
  RecordingName: "scroll_test"
})
```

---

## Step 3: 탭 네비게이션 테스트

```javascript
browser_subagent({
  TaskName: "Tab Navigation Test",
  Task: `Click each tab in the navigation bar from left to right.
         Verify each tab scrolls to the correct section.
         Check active tab highlight changes.
         Return after testing all tabs.`,
  RecordingName: "nav_test"
})
```

---

## Step 4: 차트 인터랙션 테스트

```javascript
browser_subagent({
  TaskName: "Chart Interaction Test",
  Task: `Locate all Chart.js charts on the page.
         Hover over each chart to verify tooltips appear.
         Check all charts render with proper labels and colors.
         Return after testing all charts.`,
  RecordingName: "chart_test"
})
```

---

## Step 5: 아키텍처 다이어그램 검증

```javascript
browser_subagent({
  TaskName: "Architecture Diagram Test",
  Task: `Find all architecture diagrams.
         Verify boxes are aligned properly.
         Check hover effects on grid items.
         Resize window to 1024px, 768px width.
         Verify responsive layout works.`,
  RecordingName: "arch_test"
})
```

**품질 점수 (70점 이상):**

| 항목 | 배점 |
|------|------|
| 구조적 완성도 | 30 |
| 시각적 일관성 | 25 |
| 기술적 정확성 | 25 |
| 반응형/인터랙션 | 20 |

---

## Step 6: 콘텐츠 검증

### 팩트체크

```javascript
search_web({ query: "[발표자료 내 주요 수치] 검증" })
```

### 확인 항목

- [ ] 출처 URL 접근 가능
- [ ] 내러티브 흐름 자연스러움
- [ ] WCAG 색상 대비 4.5:1 이상

---

## Step 7: 수정 사항 정리

```markdown
## 수정 필요

### Critical
- [ ] ...

### Major
- [ ] ...

### Minor
- [ ] ...
```

---

## Step 8: 검증 완료

모든 테스트 통과시:

```javascript
notify_user({
  Message: `검증 완료!

파일: [경로]
결과: 모든 항목 통과

브라우저 열기:
start chrome "file:///[절대경로]"`,
  PathsToReview: ["[발표자료 경로]"],
  BlockedOnUser: false
})
```
