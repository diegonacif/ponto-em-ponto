import { useState } from 'react';
import '../../css/App.css';

export const RegisterTable = () => {
  const date = new Date();
  const dateHour = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

  const tableRow = [
    date.toLocaleDateString(),
    "tipo",
    `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
  ]

  const [tableData, setTableData] = useState([]);

  console.log(tableData);

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

        {/* <tr>
          <td>10/02/2023</td>
          <td>Entrada manhã</td>
          <td>{dateHour}</td>
        </tr> */}
      </table>
      <button onClick={() => addRow()}>Add</button>
    </div>
  )
}