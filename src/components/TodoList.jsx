import { useState, useEffect, useRef, useMemo } from "react"; // usememo -> 필터링 결과 캐싱 useRef -> 특정 DOM 요소에 접근
import { v4 as uuid4 } from "uuid";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import { TEXT_CLASS } from "../constants/config";
import TodofilterButton from "./TodofilterButton";
import TodoCheckButton from "./TodoCheckButton";
import TodoCompleteButton from "./TodoCompleteButton";

export default function TodoList() {
    const [newTodos, setNewTodos] = useState(""); // 입력 받는 값 저장
    const [time, setTime] = useState(new Date()); // 현재 시간 업데이트
    const [IsEdit, setIsEdit] = useState(null); // 편집 중인 id 확인 편집 중이 아니라면 null
    const [editText, setEditText] = useState(""); // 편집 중인(수정한 값) 텍스트 저장
    const [filter, setFilter] = useState("all");
    // const [bgImage, setBgImage] = useState(0);

    const [todos, setTodos] = useState(() => {
        // 첫 마운트 시 로컬 스토리지에서 데이터 불러오기
        try {
            const data = localStorage.getItem("todos"); // 로컬 스토리지에서 "todos" 키로 저장된 데이터 가져오기
            return data ? JSON.parse(data) : []; // 데이터가 있으면 ? 파싱 : 빈배열
        } catch {
            return [];
        }
    });

    // const bgChange = useCallback(() => {
    //     setBgImage((prev) => (prev + 1) % BACKGROUND_IMAGE.length);
    // }, []);

    // useEffect(() => {
    //     const id = setInterval(bgChange, 30000);
    //     return () => clearInterval(id);
    // }, [bgChange]);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]); // todos 배열이 변경될 때마다 로컬 스토리지에 todos 배열을 문자열로 변환해서 저장

    useEffect(() => {
        //초마다 전체를 리렌더링하지 않게 useEffect로 따로 분리 컴포넌트 마운트 후 딱 한 번 실행
        const id = setInterval(() => setTime(new Date()), 1000); // 1초마다 콜백을 실행해서  new Date() 호출
        return () => clearInterval(id); // setInterval 반복 작업 취소(시간 정지)
    }, []);

    const removeTodo = (id) => {
        setTodos((prev) => prev.filter((t) => t.id !== id)); // 특정 id를 가진 todo 하나만 빼고 나머지는 다 남기는 함수
    };

    const handleChange = (e) => {
        setNewTodos(e.target.value);
    }; // 입력 값

    const toggleCheckTodo = (id) => {
        setTodos((prev) =>
            prev.map((
                t, // map으로 배열을 순회하면서 id가  같을시 completed 반전
            ) => (t.id === id ? { ...t, completed: !t.completed } : t)),
        ); // 필드를 그대로 두고 check만 바꿈
    };

    const toggleAllCheckTodo = () => {
        const allChecked = todos.every((t) => t.completed); // todos 배열의 모든 항목이 체크되어 있는지 확인 하나라도 안되어 있으면 false
        setTodos(todos.map((t) => ({ ...t, completed: !allChecked }))); // 모두 체크되어 있으면 모두 해제, 하나라도 안되어 있으면 모두 체크
    };

    const editTodo = (id) => {
        // 수정 버튼 클릭시 실행하는 편집 담당 함수
        const todo = todos.find((t) => t.id === id); // todos 배열에서 id가 같은 첫번째 항목을 찾아서 todo에 저장( 수정버튼 클릭한 항목 선택)
        setIsEdit(id); // 편집 중인 id 설정
        setEditText(todo.text); // input에 기존 텍스트 채우기
    };

    const editSaveTodo = (id) => {
        setTodos(
            todos.map((t) => (t.id === id ? { ...t, text: editText } : t)), // 배열을 돌면서 todo의 id와 같으면 새객체 or 그대로 유지
        ) // text만 새 값으로 덮어쓰기
            setIsEdit(null); // 수정 종료
        setEditText(""); //  input 초기화
    };

    const editCancelTodo = () => {
        setIsEdit(null);
        setEditText("");
    }; // 수정 종료

    const inputFocus = useRef(null); // 특정 DOM 요소에 접근할 수 있는 ref 생성

    const remainTodos = todos.filter((t) => !t.completed).length; // 체크박스가 안된 항목 개수

    const ButtonClick = () => {
        inputFocus.current.focus(); // 입력창 포커스
    };
    const MaxIdx = 5;
    const addTodo = () => {
        // 입력창의 텍스트를 새로운 todo 객체로 만들어서 기존 목록 맨 뒤에 붙이는 함수
        if (newTodos.trim().length == 0) return; // 공백 입력 방지 return으로 함수 종료
        if (todos.length >= MaxIdx) {
            alert(`최대 ${MaxIdx}개 까지 등록할 수 있습니다.`);
            return;
        }
        setTodos((prev) => [
            // 기존 목록 복사 & 새 객체 추가
            ...prev,
            { id: uuid4(), text: newTodos, completed: false },
        ]);
        setNewTodos("");
    };

    const filterTodos = useMemo(() => {
        // todos, filter 값이 변경될 때만 재계산
        return todos.filter((todo) => {
            // 필터링된 항목만 반환
            if (filter === "all") return true;
            if (filter === "completed") return todo.completed; // 미완료만
            if (filter === "uncompleted") return !todo.completed; // 완료만
            return true;
        });
    }, [filter, todos]); // 의존성 배열 확인

    //----------------------------------------------------- 렌더링 ----------------------------------------------------------------

    return (
        <div className="relative w-full h-dvh md:h-screen lg:h-screen bg-stone-200 min-h-screen px-2 sm:px-4 lg:px-8 py-2 sm:py-4 flex flex-col">
            {/* <div className="relative w-full h-dvh md:h-screen lg:h-screen  min-h-screen px-4 sm:px-6 lg:px-8 py-2 sm:py-8 overflow-hidden flex flex-col"></div> */}
            {/* <div
                className={`${BACKGROUND_IMAGE} fixed inset-0 -z-10 bg-cover `}
                style={{
                    backgroundImage: `url(${BACKGROUND_IMAGE[bgImage]})`,
                }}
            /> */}

            <span
                className={`${TEXT_CLASS.text} w-full justify-center flex items-center  gap-4 p-4`}
            >
                <TodoCompleteButton setFilter={setFilter} />
            </span>
            <div className="flex-1 overflow-y-auto sm:px-4">
                <TodoItem
                    className="w-full text-center"
                    todos={filterTodos} // 필터링 된 항목만 전달
                    // filterTodos={filterTodos}
                    time={time}
                    toggleCheck={toggleCheckTodo}
                    removeTodo={removeTodo}
                    IsEdit={IsEdit}
                    editText={editText}
                    setEditText={setEditText}
                    editTodo={editTodo}
                    editSaveTodo={editSaveTodo}
                    editCancelTodo={editCancelTodo}
                />
            </div>
            <TodoInput
                onChange={handleChange}
                value={newTodos}
                addTodo={addTodo}
            />

            <div className="shrink-0 p-2 sm:p-4 border-t flex flex-col gap-1">
                <TodofilterButton remainTodos={remainTodos} />
                <TodoCheckButton
                    toggleAllCheckTodo={toggleAllCheckTodo}
                    todos={todos}
                />
                {/* <button onClick={addTodo}>추가</button> */}
            </div>
        </div>
    );
}
