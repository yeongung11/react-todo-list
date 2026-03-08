# React Todo List

React Todo List 입니다.

-   GitHub: https://github.com/yeongung11/react-todo-list
-   Demo: https://react-todo-list-one-lime.vercel.app

기술 스택

-   React
-   Typescript
-   Vite
-   Javascript
-   Tailwind
-   Framer Motion
-   Heroicons
-   Vercel

기능

-   Todo 수정/삭제: 입력 후 Enter 버튼으로 항목 추가 및 삭제
-   Todo 취소/완료: 수정 아이콘 클릭 후 할 일을 수정 한 뒤, 완료 버튼으로 확정 또는 취소 버튼으로 현상 유지
-   Todo 항목 취소선: 할 일 텍스트를 클릭해 취소선을 추가 삭제 가능
-   Todo 필터: 전체, 미완료, 완료 버튼으로 체크된 할 일 목록 필터
-   빈 화면: 항목이 없을 때 빈 페이지 항목 추가되면 빈 페이지 사라지고 Todo 노출
-   시계 및 인삿말: 현재 시간을 나타내는 텍스트와 시간대에 따른 인삿말 출력(Good Morning, Good Afternoon, Good Evening)
-   애니메이션: Framer Motion 라이브러리로 항목 추가 삭제시 애니메이션 추가

시작하기

```bash
git clone https://github.com/yeongung11/todolist.git
cd todolist
npm install
npm run dev
```

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

### 3.

에러

-   `input`에 입력이 안되는 현상

원인

-   `onChange={(e) => setEditText(todo.id, e.target.value)}` `setter` 함수에 인자를 2개를 사용해 오류 발생

해결

-   `setter` 함수는 인자를 1개만 받을 수 있으므로 `onChange={(e) => setEditText(e.target.value)}` `todo.id`를 제거

### 4.

에러

-   렌더링될 때마다 `toggleCheck`가 버튼을 누르지 않았는데 바로 실행

원인

-   `onChange={toggleCheck(todo.id)}` 화살표 함수를 사용하지 않아서 렌더링될 때마다 실행

해결

-   `onChange={() => toggleCheck(todo.id)}` 화살표 함수를 사용해 클릭시에만 실행되게 변경

### 5.

에러

-   렌더링시 `filterTodo` 함수가 재실행

원인

-   `state`는 무엇이든 바뀌면 컴포넌트 함수 전체가 재실행되는데 실제로 `filterTodo`는 바뀐게 없더라도 강제로 재실행 되는 상황

해결

-   `useMemo`를 사용해 `todo와 filter`가 바뀌었는지 확인하고 바뀌지 않았다면 이전 값 그대로 리턴 바뀌었다면 새로운 값을 저장하고 리턴
