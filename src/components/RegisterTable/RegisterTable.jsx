import { useContext, useState } from 'react';
import { ClockContext } from '../../contexts/ClockProvider';
import '../../css/App.css';

export const RegisterTable = () => {

  const { 
    dateTime
  } = useContext(ClockContext);

  const date = new Date();

  const tableRow = [
    date.toLocaleDateString(),
    "tipo",
    `${dateTime.hours}:${dateTime.minutes}:${dateTime.seconds}`
  ]

  const [tableData, setTableData] = useState([]);

  function addRow() {
    setTableData([...tableData, ...tableRow])
  }

  return (
    <div className="register-table-container">
      <table>
        <tr>
          <th>Data</th>
          <th>Tipo</th>
          <th>Hora</th>
        </tr>
        <tr>
        {
          tableData.map((data, key) => 
            <td key={key}>{data}</td>
          )
        }
        </tr>
      </table>
      <button onClick={() => addRow()}>Add</button>
    </div>
  )
}