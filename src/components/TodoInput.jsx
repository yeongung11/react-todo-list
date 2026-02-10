export default function TodoInput({ value, onChange, addTodo }) {
    // console.log("props", { value, onChange, addTodo });
    return (
        <>
            <input
                className=""
                type="text"
                placeholder="입력하세요"
                onChange={onChange}
                value={value}
                onKeyDown={(e) => e.key === "Enter" && addTodo()}
            />
        </>
    );
}
