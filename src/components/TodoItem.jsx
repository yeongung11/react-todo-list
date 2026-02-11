import EmptyTodo from "./EmptyTodo";
import Clock from "./Clock";
export default function TodoItem({
    todos,
    time,
    toggleCheck,
    removeTodo,
    IsEdit,
    editCancelTodo,
    editText,
    editTodo,
    editSaveTodo,
    setEditText,
}) {
    const hasTodos = todos.length > 0; // li가 없을 때(빈 화면)

    return (
        <>
            {hasTodos ? (
                <>
                    <Clock time={time} />
                    <ul>
                        {todos.map((todo) => {
                            const IsEditing = todo.id === IsEdit; // 편집 중인지 확인
                            return (
                                <li key={todo.id}>
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => toggleCheck(todo.id)} //  왜 toggleCheck가 아니라 화살표 함수로 감싸지? => 클릭할 때만 실행되게 해야하는데 그냥 쓰게 되면 렌더링 될때마다 실행되기 떄문.
                                    />
                                    {IsEditing ? ( // 편집 중이라면 ? input 보여주기 : span(텍스트) 보여주기
                                        <input
                                            type="text"
                                            value={editText}
                                            onChange={(e) =>
                                                setEditText(e.target.value)
                                            }
                                        />
                                    ) : (
                                        <span
                                            style={{
                                                textDecoration: todo.completed
                                                    ? "line-through"
                                                    : "none",
                                            }}
                                        >
                                            {todo.text}
                                        </span>
                                    )}
                                    <button
                                        onClick={
                                            IsEditing
                                                ? editCancelTodo
                                                : () => editTodo(todo.id)
                                        }
                                    >
                                        {IsEditing ? "취소" : "수정"}
                                    </button>
                                    {IsEditing && ( // 편집 중일 때만 완료 버튼
                                        <button
                                            onClick={() =>
                                                editSaveTodo(todo.id)
                                            }
                                        >
                                            완료
                                        </button>
                                    )}

                                    <button onClick={() => removeTodo(todo.id)}>
                                        삭제
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </>
            ) : (
                <EmptyTodo />
            )}
        </>
    );
}
