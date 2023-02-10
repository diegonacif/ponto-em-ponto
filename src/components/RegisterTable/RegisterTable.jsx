import { useState } from 'react';
import '../../css/App.css';

export const RegisterTable = () => {
  const date = new Date();

  const [dateTime, setDateTime] = useState({
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  });

  return (
    <div className="register-table-container">
      <table>
        <thead>
          <th>Data</th>
          <th>Tipo</th>
          <th>Hora</th>
        </thead>
        <tr>
          <td>10/02/2023</td>
          <td>Entrada manhã</td>
          <td>{dateTime.hours}:{dateTime.minutes}:{dateTime.seconds}</td>
        </tr>
      </table>
    </div>
  )
}