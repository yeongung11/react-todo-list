import { TEXT_CLASS } from "../constants/config";

export default function TodofilterButton({ toggleAllCheckTodo, todos }) {
    return (
        <div className={`${TEXT_CLASS.text} text-center`}>
            <button onClick={toggleAllCheckTodo}>
                {todos.every((t) => t.completed) ? "모두 해제" : "모두 체크"}
            </button>
        </div>
    );
}
