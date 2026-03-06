import { TEXT_CLASS } from "../constants/config";

export default function EmptyTodo() {
    const img =
        "https://plus.unsplash.com/premium_photo-1683309559241-598a84c438c9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    return (
        <div className="flex-1 flex items-center justify-center mt-60">
            <div className="flex flex-col items-center mb-4">
                <img src={img} className="w-64 h-64" />
                <p className={`${TEXT_CLASS.text} mt-7 `}>할일을 추가하세요.</p>
            </div>
        </div>
    );
}
