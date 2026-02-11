export default function Clock({ time }) {
    const hour = time.getHours();
    const greeting =
        hour < 12
            ? "Good Morning"
            : hour < 18
            ? "Good Afternoon"
            : "Good Evening";
    return (
        <>
            <h2>
                {time.toLocaleTimeString("ko-KR", {
                    hour12: false,
                    minute: "2-digit",
                    hour: "2-digit",
                })}
            </h2>
            <span>{greeting}</span>
        </>
    );
}
