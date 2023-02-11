import { useContext, useEffect, useState } from 'react';
import { db } from '../../services/firebase';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { useCollection } from "react-firebase-hooks/firestore";

import { ClockContext } from '../../contexts/ClockProvider';
import { AuthEmailContext } from "../../contexts/AuthEmailProvider";

import '../../css/App.css';

export const RegisterTable = () => {

  const usersCollectionRef = collection(db, "users");
  const [users, setUsers] = useState({});
  const [firestoreLoading, setFirestoreLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  
  const [isExistent, setIsExistent] = useState(false);
  // console.log(isExistent)

  const { dateTime } = useContext(ClockContext);
  const { user } = useContext(AuthEmailContext);

  const IdsArray = firestoreLoading ? [] : users?.map((user) => user.id)
  // console.log(IdsArray)
  const date = new Date();
  const currentDay = new Date().getDate() < 10 ? "0" + String(new Date().getDate()) : String(new Date().getDate())
  const currentMonth = new Date().getMonth() + 1 < 10 ? "0" + String(new Date().getMonth() + 1) : String(new Date().getMonth() + 1)
  const currentFullDate = currentDay + currentMonth + date.getFullYear()

  // console.log(currentFullDate);


  // /users/5eVc9Y6Dq5gc1JepGxS7wWaSXei1

  // Create user entrance on db
  useEffect(() => {
    const getUserEntrance = () => {
      if(firestoreLoading) {
        return;
      } else if(IdsArray.includes(user.uid)) {
        console.log("existe uid");
      } else {
        const docRef = doc(db, "users", `${user.uid}`);
        console.log("não existe uid");
        return setDoc(docRef, {}).then(() => console.log("criado"))
        
      }
    };
    getUserEntrance();
  }, [firestoreLoading])

  // Register user point
  async function registerHour() {

    // const docRef = doc(db, "users", `${user.uid}`, "12022023", `${date.getTime()}`);
    const path = `users/${user.uid}`;
    const docRef = doc(db, `${path}/${currentFullDate}/${date.getTime()}`);

    return await setDoc(docRef, {
      date: date.toLocaleDateString(),
      type: "Entrada manhã",
      hour: `${dateTime.hours}:${dateTime.minutes}:${dateTime.seconds}`,
    })
    .then(
      setRefresh((current) => !current),
      console.log("Registered"),
    )
  }

  // Get Data from current user
  useEffect(() => {
    async function getCurrentData() {
      const currentId = await IdsArray?.indexOf(user.uid)
      const tableRow = [
        users[currentId]?.date,
        users[currentId]?.type,
        users[currentId]?.hour
      ]
      setTableData(tableRow)
    }
    getCurrentData();
  }, [firestoreLoading])

  // Users Data
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getUsers();
  }, [refresh])

   // Firestore loading
  const [value, loading, error] = useCollection(usersCollectionRef,
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );
  useEffect(() => {
    setFirestoreLoading(loading);
  }, [loading])


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
      <button onClick={() => registerHour()}>Add</button>
    </div>
  )
}