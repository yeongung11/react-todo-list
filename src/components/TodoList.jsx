import { useState, useEffect } from "react";
import { v4 as uuid4 } from "uuid";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";

export default function TodoList() {
    const [todos, setTodos] = useState([]); // 할일 목록
    const [newTodos, setNewTodos] = useState(""); // 입력 받는 값
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        //초마다 전체를 리렌더링하지 않게 useEffect로 따로 분리 컴포넌트 마운트 후 딱 한 번 실행
        const id = setInterval(() => setTime(new Date()), 1000); // 1초마다 콜백을 실행해서  new Date() 호출
        return () => clearInterval(id); // setInterval 반복 작업 취소(시간 정지)
    }, []);

    const addTodo = () => {
        // 입력창의 텍스트를 새로운 todo 객체로 만들어서 기존 목록 맨 뒤에 붙이는 함수
        if (newTodos.trim().length == 0) return; // 공백 입력 방지 return으로 함수 종료
        setTodos((prev) => [
            // 기존 목록 복사 & 새 객체 추가
            ...prev,
            { id: uuid4(), text: newTodos, completed: false },
        ]);
        setNewTodos("");
    };

    const removeTodo = (id) => {
        setTodos((prev) => prev.filter((t) => t.id !== id)); // 특정 id를 가진 todo 하나만 빼고 나머지는 다 남기는 함수
    };

    const handleChange = (e) => {
        setNewTodos(e.target.value);
    }; // 입력 값

    const toggleCheckTodo = (id) => {
        setTodos((prev) =>
            prev.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t,
            ),
        ); // 필드를 그대로 두고 check만 바꿈
    };

    return (
        <>
            <h1>Todo List</h1>
            <TodoItem
                todos={todos}
                time={time}
                toggleCheck={toggleCheckTodo}
                removeTodo={removeTodo}
            />
            <TodoInput
                onChange={handleChange}
                value={newTodos}
                addTodo={addTodo}
            />
            <div>
                <button onClick={addTodo}>추가</button>
            </div>
        </>
    );
}
