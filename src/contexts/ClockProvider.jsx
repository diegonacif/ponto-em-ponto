import { createContext, useEffect, useState } from "react";

export const ClockContext = createContext({});

export const ClockProvider = ({ children }) => {
  const date = new Date();

  const [dateTime, setDateTime] = useState({
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  });

  const dateTimeFormated = `
    ${dateTime.hours < 10 ? '0'+dateTime.hours : dateTime.hours} :
    ${dateTime.minutes < 10 ? '0'+dateTime.minutes : dateTime.minutes} :
    ${dateTime.seconds < 10 ? '0'+dateTime.seconds : dateTime.seconds}
  `;

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

  return (
    <ClockContext.Provider value={{ 
      dateTime,
      dateTimeFormated
    }}>
      {children}
    </ClockContext.Provider>
  )
}