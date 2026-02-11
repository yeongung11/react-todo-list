export default function TodoInput({ value, onChange, addTodo, ref }) {
    return (
        <div className="w-full justify-center flex  mb-8 ">
            <input
                className="w-96 px-4 py-4 text-xl text-black font-medium
                                 bg-transparent/70
                                border-0 border-b border-black/30
                focus:border-black/70 focus:border-b-2
                focus:outline-none focus:shadow-none
                placeholder:text-black/40 placeholder:font-normal
                transition-all duration-300 ease-in-out "
                type="text"
                onChange={onChange}
                value={value}
                ref={ref}
                onKeyDown={(e) => e.key === "Enter" && addTodo()}
            />
        </div>
    );
}
