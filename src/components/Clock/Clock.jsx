import { useContext, useEffect, useState } from "react";
import { ClockContext } from "../../contexts/ClockProvider";

export const Clock = () => {

  const { 
    dateTime,
    dateTimeFormated
  } = useContext(ClockContext);

  return (
    <div className="clock-container">
      <span className="neon-text">{dateTimeFormated}</span>
    </div>
  )
}