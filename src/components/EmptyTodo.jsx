export default function EmptyTodo() {
    const img =
        "https://plus.unsplash.com/premium_photo-1683309559241-598a84c438c9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    return (
        <div className="flex flex-col items-center mb-4">
            <img src={img} className="w-32 h-32" />
            <p>할일을 추가하세요.</p>
        </div>
    );
}
