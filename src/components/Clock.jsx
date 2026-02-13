import { TEXT_CLASS } from "../constants/config";

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
            <div className=" flex flex-col items-center justify-center mr-3">
                <h2 className={`${TEXT_CLASS.text} text-9xl mb-4`}>
                    {time.toLocaleTimeString("ko-KR", {
                        hour12: false,
                        minute: "2-digit",
                        hour: "2-digit",
                    })}
                </h2>
                <span className={`${TEXT_CLASS.text} text-5xl mb-8`}>
                    {greeting}
                </span>
            </div>
        </>
    );
}
