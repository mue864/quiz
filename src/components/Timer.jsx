import { useEffect, useState } from "react";

export const Timer = ({ onEndSession = () => {}, reset, onReset = () => {}}) => {
  const [time, setTime] = useState(15);


  useEffect(() => {
    let interval;

    if (reset) {
      onEndSession(false);
      onReset(false);
      setTime(15);
    }

    if (time > 0) {
       interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {

      if (typeof onEndSession === "function") {
        onEndSession(true);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    } 
  }, [time, onEndSession, reset, onReset]);

  return <div>{time}</div>;
};
