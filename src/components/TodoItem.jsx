import EmptyTodo from "./EmptyTodo";
import Clock from "./Clock";
import { TEXT_CLASS } from "../constants/config";
//eslint-disable-next-line no-unused-vars
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
                        className="w-full h-full mt-7 flex flex-col items-center"
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
                                        className="flex items-center p-1.5 sm:p-2 h-12 border-border-stone-300 mx-4 my-1 rounded-lg"
                                    >
                                        <div
                                            className={`w-48 sm:w-56 md:w-64 cursor-pointer select-none transition-all hover:brightness-105 flex items-center
                                    ${
                                        todo.completed
                                            ? "line-through opacity-60 hover:opacity-80"
                                            : "hover:opacity-90"
                                    }`}
                                            onClick={() => toggleCheck(todo.id)}
                                        >
                                            {IsEditing ? ( // 편집 중이라면 ? input 보여주기 : span(텍스트) 보여주기
                                                <input
                                                    autoFocus
                                                    className="bg-transparent border-none w-full sm:w-20 h-4 sm:h-5 px-1 py-0.5 
              text-center leading-4 dark:text-gray-200
             shadow-none outline-none ring-0 focus:outline-none focus:ring-0 mx-auto block"
                                                    type="text"
                                                    value={editText}
                                                    onChange={(e) =>
                                                        setEditText(
                                                            e.target.value,
                                                        )
                                                    }
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                />
                                            ) : (
                                                <span
                                                    className="text-sm text-center truncate block font-normal text-gray-800 dark:text-gray-200"
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
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    IsEditing
                                                        ? editCancelTodo()
                                                        : editTodo(todo.id);
                                                }}
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
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeTodo(todo.id);
                                            }}
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
