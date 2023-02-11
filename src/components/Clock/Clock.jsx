import { useContext, useEffect, useState } from "react";
import { ClockContext } from "../../contexts/ClockProvider";

export const Clock = () => {

  const { 
    dateTime
  } = useContext(ClockContext);

  const dateTimeFormated = `${dateTime.hours}:${dateTime.minutes}:${dateTime.seconds}`;

  return (
    <div className="clock-container">
      <span>{dateTimeFormated}</span>
    </div>
  )
}