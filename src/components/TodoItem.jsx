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
                    <motion.ul
                        layout
                        className="w-full h-full mt-7"
                        style={{ position: "relative" }}
                    >
                        <AnimatePresence mode="popLayout">
                            {todos.map((todo) => {
                                const IsEditing = todo.id === IsEdit; // 편집 중인지 확인
                                return (
                                    <motion.li
                                        initial={{ opacity: 0, y: -12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 12 }}
                                        transition={{ duration: 0.4 }}
                                        key={todo.id}
                                        className={`${TEXT_CLASS.text}  p-1.5 sm:p-2 flex items-center justify-between gap-1 sm:gap-3 h-11 border-border-stone-300 pr-16 relative`}
                                    >
                                        {/* <div className="shrink-0"> */}
                                        {/* <input
                                                className="w-4 h-4 bg-transparent appearance-none border-2 border-black/50 rounded checked:bg-white/90 checked:border-white/90 sm:w-3 sm:h-3"
                                                type="checkbox"
                                                checked={todo.completed}
                                                onChange={() =>
                                                    toggleCheck(todo.id)
                                                } //  왜 toggleCheck가 아니라 화살표 함수로 감싸지? => 클릭할 때만 실행되게 해야하는데 그냥 쓰게 되면 렌더링 될때마다 실행되기 떄문.
                                            /> */}
                                        {/* </div> */}
                                        <div
                                            className={`flex-1 min-w-0 px-2 cursor-pointer select-none transition-all duration-200 hover:brightness-105 flex items-center justify-center
                                    ${
                                        todo.completed
                                            ? "line-through opacity-60 hover:opacity-80"
                                            : "hover:opacity-90"
                                    }`}
                                            onClick={() => toggleCheck(todo.id)}
                                        >
                                            <div className="text-center flex-none w-[25%] sm:w-[35%] min-w-[100px] px-0.5 sm:px-1 truncate">
                                                {IsEditing ? ( // 편집 중이라면 ? input 보여주기 : span(텍스트) 보여주기
                                                    <input
                                                        className={`${TEXT_CLASS.text} bg-transparent border-none 
             w-full px-0.5 text-center leading-none`}
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
                                                        className="text-center "
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
                                                {IsEditing ? (
                                                    <XMarkIcon className="w-5 h-5" />
                                                ) : (
                                                    <PencilIcon className="w-5 h-5" />
                                                )}
                                            </button>
                                            {IsEditing && ( // 편집 중일 때만 완료 버튼
                                                <button
                                                    className={`${TEXT_CLASS.li} `}
                                                    onClick={() =>
                                                        editSaveTodo(todo.id)
                                                    }
                                                >
                                                    <CheckIcon className="w-5 h-5" />
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
                    </motion.ul>
                </div>
            ) : (
                <EmptyTodo />
            )}
        </>
    );
}
