import { TEXT_CLASS } from "../constants/config";

export default function TodofilterButton({ remainTodos }) {
    return (
        <>
            <p className={`${TEXT_CLASS.text} text-center`}>
                오늘의 남은 할일: {remainTodos}개
            </p>
        </>
    );
}
