import { TEXT_CLASS } from "../constants/config";

interface TodofilterButtonProps {
    setFilter: (filter: "all" | "completed" | "uncompleted") => void;
}

export default function TodofilterButton({ setFilter }: TodofilterButtonProps) {
    return (
        <>
            <div className="flex gap-4 mb-8 justify-between items-center px-4">
                <h1 className="text-4xl font-bold drop-shadow-2xl">
                    Todo List
                </h1>
                <button
                    className={`${TEXT_CLASS.CompleteButtonText} rounded`}
                    onClick={() => setFilter("all")}
                >
                    전체
                </button>
                <button
                    className={`${TEXT_CLASS.CompleteButtonText} rounded`}
                    onClick={() => setFilter("uncompleted")}
                >
                    미완료
                </button>
                <button
                    className={`${TEXT_CLASS.CompleteButtonText} rounded`}
                    onClick={() => setFilter("completed")}
                >
                    완료
                </button>
            </div>
        </>
    );
}
