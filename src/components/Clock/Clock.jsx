import { useEffect, useState } from "react";

export const Clock = () => {
  const date = new Date();

  const [dateTime, setDateTime] = useState({
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();      
      setDateTime({
        hours: date?.getHours(),
        minutes: date?.getMinutes(),
        seconds: date?.getSeconds()
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // const dateTimeFormated = dateTime;

  return (
    <div className="clock-container">
      {dateTime.hours}:{dateTime.minutes}:{dateTime.seconds}
      {/* <span>{dateTimeFormated}</span> */}
    </div>
  )
}