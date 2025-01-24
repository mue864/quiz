import { useEffect, useState } from "react";

export const Timer = ({ onEndSession = () => {} }) => {
  const [time, setTime] = useState(30);
  const [endSession, setEndSession] = useState(false);

  useEffect(() => {
    if (time > 0) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setEndSession(true);

      if (typeof onEndSession === "function") {
        onEndSession(true);
      }
    }
  }, [time, onEndSession]);

  return <div>{time}</div>;
};
