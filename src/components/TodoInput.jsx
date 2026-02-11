export default function TodoInput({ value, onChange, addTodo, ref }) {
    // console.log("props", { value, onChange, addTodo });
    return (
        <>
            <input
                className=""
                type="text"
                placeholder="입력하세요"
                onChange={onChange}
                value={value}
                ref={ref}
                onKeyDown={(e) => e.key === "Enter" && addTodo()}
            />
        </>
    );
}
