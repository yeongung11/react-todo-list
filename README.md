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

### 2.

에러

-   `import { motion, AnimatePresence } from "framer-motion";`에서 'motion is defined but never used...`라는 메시지 출력

원인

-   `motion`을 실제로 쓰고는 있지만 `motion.ul`, `motion.li`와 같이 점 표기법을 사용시 ESLint에서 인식을 못함

해결

-   `import` 위에 `// eslint-disable-next-line no-unused-vars` 코드 자체는 이상이 없으므로 해당 코드를 주석으로 추가해 다음 줄 `ESLint` 검사를 비활성화 시킴
