import EmptyTodo from "./EmptyTodo";

export default function TodoItem({ todos, time, toggleCheck, removeTodo }) {
    const hasTodos = todos.length > 0; // li가 없을 때(빈 화면)
    return (
        <>
            {hasTodos ? (
                <>
                    <h2>
                        {time.toLocaleTimeString("ko-KR", {
                            hour12: false,
                            minute: "2-digit",
                            hour: "2-digit",
                        })}
                    </h2>
                    <ul>
                        {todos.map((todo) => (
                            <li key={todo.id}>
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => toggleCheck(todo.id)}
                                />
                                <span
                                    style={{
                                        textDecoration: todo.completed
                                            ? "line-through"
                                            : "none",
                                    }}
                                >
                                    {todo.text}
                                </span>
                                <button onClick={() => removeTodo(todo.id)}>
                                    수정
                                </button>

                                <button onClick={() => removeTodo(todo.id)}>
                                    삭제
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <EmptyTodo />
            )}
        </>
    );
}
