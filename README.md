React Todo List
할 일관리 웹앱입니다.

Features

-   Todo 수정/삭제
-   Todo 취소/완료
-   Todo Input 엔터키로 입력
-   Todo 항목 취소선
-   항목이 없을 때 빈 페이지 항목 추가되면 빈 페이지 사라지고 Todo 노출

Tech Stack

-   React
-   Vite
-   Javascript
-   Tailwind
-   Motion

Getting Started

-   npm
-   Node.js

Trouble Shooting

### 1.

에러

-   `input checkbox`로 취소선을 추가 했던 걸 텍스트에 직접 클릭해 토글 되도록 바꿨더니 텍스트 수정시에도 텍스트 토글 기능이 동시에 작동

원인

-   이벤트 버블링 때문에 `<button onClick={editTodo}>`을 클릭 했더니 부모로 이벤트가 전파되어 `<div onClick={toggleCheck}>`이 동시에 작동

해결

-   `toggleCheck div`를 밖으로 분리하고 `input`에 `e.stopPropagation`을 추가해 부모로 전파되는 이벤트를 차단

<!-- -   함수 arugument 문제 -->
