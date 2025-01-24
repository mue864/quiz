import { useEffect, useState } from "react"

export const Timer = () => {
    const [time, setTime] = useState(30);

    useEffect(() => {
        if (time > 0) {
            const interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [time])


    return <div>{time}</div>
}