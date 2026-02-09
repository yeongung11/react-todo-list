import { useState } from "react";
import { v4 as uuid4 } from "uuid";
export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const [newTodos, setNewTodos] = useState("");
    const addTodo = () => {
        if (newTodos.trim().length == 0) return;
        setTodos((prev) => [...prev, { id: uuid4(), text: newTodos }]);
        setNewTodos("");
    };
    const removeTodo = (id) => {
        setTodos((prev) => prev.filter((t) => t.id !== id));
    };
    const handleChange = (e) => {
        setNewTodos(e.target.value);
    };
    return (
        <>
            <h1>Todo List</h1>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.text}
                        <button onClick={() => removeTodo(todo.id)}>
                            삭제
                        </button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                placeholder="입력하세요"
                onChange={handleChange}
                value={newTodos}
            />
            <div>
                <button onClick={addTodo}>추가</button>
            </div>
        </>
    );
}
