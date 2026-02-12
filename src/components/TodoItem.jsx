import EmptyTodo from "./EmptyTodo";
import Clock from "./Clock";
import { TEXT_CLASS } from "../constants/config";
import { motion, AnimatePresence } from "framer-motion";
import {
    PencilIcon,
    XMarkIcon,
    CheckIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";

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
                <div>
                    <Clock time={time} />
                    <ul
                        layout
                        className="w-full h-full"
                        style={{ position: "relative" }}
                    >
                        <AnimatePresence mode="popLayout">
                            {todos.map((todo) => {
                                const IsEditing = todo.id === IsEdit; // 편집 중인지 확인
                                return (
                                    <motion.li
                                        layout
                                        initial={{ opacity: 0, y: -12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 12 }}
                                        transition={{ duration: 0.4 }}
                                        key={todo.id}
                                        className={`${TEXT_CLASS.text}  p-1.5 sm:p-2 flex items-center justify-center gap-1 sm:gap-3 h-11 border-border-stone-300 pl-10 pr-16 relative`}
                                        // className={`${TEXT_CLASS.text} w-full p-1.5 sm:p-2.5 flex items-center gap-1 sm:gap-2 h-9 sm:h-11 border-b border-stone-300`}
                                    >
                                        <div className="shrink-0">
                                            <input
                                                className="w-3 h-3 bg-transparent focus:ring-2 focus:ring-stone-300 border-stone-400 rounded sm:w-3 sm:h-3"
                                                type="checkbox"
                                                checked={todo.completed}
                                                onChange={() =>
                                                    toggleCheck(todo.id)
                                                } //  왜 toggleCheck가 아니라 화살표 함수로 감싸지? => 클릭할 때만 실행되게 해야하는데 그냥 쓰게 되면 렌더링 될때마다 실행되기 떄문.
                                            />
                                        </div>
                                        <div className="text-center flex-none w-[15%] sm: w-[25%] min-w-[100px] px-0.5 sm:px-1 truncate">
                                            {IsEditing ? ( // 편집 중이라면 ? input 보여주기 : span(텍스트) 보여주기
                                                <input
                                                    className={`${TEXT_CLASS.text}  w-full text-lg bg-transparent border-none focus:outline-none`}
                                                    type="text"
                                                    value={editText}
                                                    onChange={(e) =>
                                                        setEditText(
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            ) : (
                                                <span
                                                    claaName="text-center"
                                                    style={{
                                                        textDecoration: todo.completed
                                                            ? "line-through"
                                                            : "none",
                                                    }}
                                                >
                                                    {todo.text}
                                                </span>
                                            )}
                                        </div>

                                        <div className="shrink-0 flex gap-1 sm:gap-2">
                                            <button
                                                className={`${TEXT_CLASS.li} w-10 h-8`}
                                                onClick={
                                                    IsEditing
                                                        ? editCancelTodo
                                                        : () =>
                                                              editTodo(todo.id)
                                                }
                                            >
                                                {IsEditing ? "취소" : "수정"}
                                            </button>
                                            {IsEditing && ( // 편집 중일 때만 완료 버튼
                                                <button
                                                    className={`${TEXT_CLASS.li} `}
                                                    onClick={() =>
                                                        editSaveTodo(todo.id)
                                                    }
                                                >
                                                    완료
                                                </button>
                                            )}
                                        </div>

                                        <TrashIcon
                                            className={`${TEXT_CLASS.li} w-8 h-8 shrink-0 `}
                                            onClick={() => removeTodo(todo.id)}
                                        >
                                            삭제
                                        </TrashIcon>
                                    </motion.li>
                                );
                            })}
                        </AnimatePresence>
                    </ul>
                </div>
            ) : (
                <EmptyTodo />
            )}
        </>
    );
}
