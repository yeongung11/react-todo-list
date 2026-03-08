import { TEXT_CLASS } from "../constants/config";

import type { Todo } from "../types/todo";

interface TodoCheckButtonsProps {
    toggleAllCheckTodo: () => void;
    todos: Todo[];
}

export default function TodofilterButton({
    toggleAllCheckTodo,
    todos,
}: TodoCheckButtonsProps) {
    return (
        <div className={`${TEXT_CLASS.text} text-center`}>
            <button onClick={toggleAllCheckTodo}>
                {todos.every((t) => t.completed) ? "모두 해제" : "모두 체크"}
            </button>
        </div>
    );
}
