import { TEXT_CLASS } from "../constants/config";

interface TodofilterButtonProps {
    remainTodos: number;
}

export default function TodofilterButton({
    remainTodos,
}: TodofilterButtonProps) {
    return (
        <>
            <p className={`${TEXT_CLASS.text} text-center`}>
                오늘의 남은 할일: {remainTodos}개
            </p>
        </>
    );
}
