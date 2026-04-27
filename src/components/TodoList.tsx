import { useState, useEffect, useMemo } from "react";
import { v4 as uuid4 } from "uuid";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import { TEXT_CLASS } from "../constants/config";
import TodofilterButton from "./TodofilterButton";
import TodoCheckButton from "./TodoCheckButton";
import TodoCompleteButton from "./TodoCompleteButton";
import type { Todo } from "../types/todo";

export default function TodoList() {
    const [newTodos, setNewTodos] = useState<string>("");
    const [time, setTime] = useState<Date>(new Date());
    const [isEdit, setIsEdit] = useState<string | null>(null);
    const [editText, setEditText] = useState<string>("");
    const [filter, setFilter] = useState<"all" | "completed" | "uncompleted">(
        "all",
    );

    const [todos, setTodos] = useState<Todo[]>(() => {
        try {
            const data = localStorage.getItem("todos");
            return data ? (JSON.parse(data) as Todo[]) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        const id = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    const removeTodo = (id: string): void => {
        setTodos((prev) => prev.filter((t) => t.id !== id));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodos(e.target.value);
    };

    const toggleCheckTodo = (id: string): void => {
        setTodos((prev) =>
            prev.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t,
            ),
        );
    };

    const toggleAllCheckTodo = () => {
        setTodos((prev) => {
            const allChecked = prev.every((t) => t.completed);
            return prev.map((t) => ({ ...t, completed: !allChecked }));
        });
    };

    const editTodo = (id: string): void => {
        const todo = todos.find((t) => t.id === id);
        if (!todo) return;
        setIsEdit(id);
        setEditText(todo.text);
    };

    const editSaveTodo = (id: string): void => {
        if (editText.trim().length === 0) return;
        setTodos(
            todos.map((t) => (t.id === id ? { ...t, text: editText } : t)),
        );
        setIsEdit(null);
        setEditText("");
    };

    const editCancelTodo = (): void => {
        setIsEdit(null);
        setEditText("");
    };

    const remainTodos: number = todos.filter((t) => !t.completed).length;

    const MaxIdx = 8;
    const addTodo = () => {
        if (newTodos.trim().length === 0) return;
        if (todos.length >= MaxIdx) {
            alert(`최대 ${MaxIdx}개 까지 등록할 수 있습니다.`);
            return;
        }
        setTodos((prev) => [
            ...prev,
            { id: uuid4(), text: newTodos, completed: false },
        ]);
        setNewTodos("");
    };

    const filterTodos = useMemo(() => {
        return todos.filter((todo) => {
            if (filter === "all") return true;
            if (filter === "completed") return todo.completed;
            if (filter === "uncompleted") return !todo.completed;
            return true;
        });
    }, [filter, todos]);

    //----------------------------------------------------- 렌더링 ----------------------------------------------------------------

    return (
        <div className="relative w-full h-dvh md:h-screen lg:h-screen bg-stone-200 min-h-screen px-2 sm:px-4 lg:px-8 py-2 sm:py-4 flex flex-col">
            <span
                className={`${TEXT_CLASS.text} w-full justify-center flex items-center  gap-4 p-4`}
            >
                <TodoCompleteButton setFilter={setFilter} />
            </span>
            <div className="flex-1 overflow-y-auto sm:px-4">
                <TodoItem
                    className="w-full text-center"
                    todos={filterTodos}
                    time={time}
                    toggleCheck={toggleCheckTodo}
                    removeTodo={removeTodo}
                    IsEdit={isEdit}
                    editText={editText}
                    setEditText={setEditText}
                    editTodo={editTodo}
                    editSaveTodo={editSaveTodo}
                    editCancelTodo={editCancelTodo}
                    onChange={handleChange}
                    value={newTodos}
                    addTodo={addTodo}
                />
            </div>
            <TodoInput
                onChange={handleChange}
                value={newTodos}
                addTodo={addTodo}
            />

            <div className="shrink-0 p-2 sm:p-4 flex flex-col gap-1">
                <TodofilterButton remainTodos={remainTodos} />
                <TodoCheckButton
                    toggleAllCheckTodo={toggleAllCheckTodo}
                    todos={todos}
                />
            </div>
        </div>
    );
}
