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
  const [entranceType, setEntranceType] = useState("Entrada Manhã");

  const [tableData, setTableData] = useState([]);
  
  const { dateTime } = useContext(ClockContext);
  const { user } = useContext(AuthEmailContext);

  const IdsArray = firestoreLoading ? [] : users?.map((user) => user.id)

  const date = new Date();
  // const currentDay = new Date().getDate() < 10 ? "0" + String(new Date().getDate()) : String(new Date().getDate())
  // const currentMonth = new Date().getMonth() + 1 < 10 ? "0" + String(new Date().getMonth() + 1) : String(new Date().getMonth() + 1)
  // const currentFullDate = currentDay + currentMonth + date.getFullYear()


  // Create user entrance on db if does not already exist
  useEffect(() => {
    const getUserEntrance = () => {
      if(firestoreLoading) {
        return;
      } else if(IdsArray.includes(user.uid)) {
        return;
        // console.log("existe uid");
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

    const path = `users/${user.uid}`;
    const docRef = doc(db, `${path}/registers/${date.getTime()}`);
    // const docRef = doc(db, `${path}/${currentFullDate}/${date.getTime()}`);

    return await setDoc(docRef, {
      date: date.toLocaleDateString(),
      type: entranceType,
      hour: `${dateTime.hours}:${dateTime.minutes}:${dateTime.seconds}`,
    })
    .then(
      setRefresh((current) => !current),
      console.log("Registered"),
    )
  }

  // const currentId = IdsArray?.indexOf(user.uid)
  const currentCollection = collection(db, "users", `${user.uid}`, "registers")
  const [userCollections, setUserCollections] = useState([]);

  // Get Data from current user
  useEffect(() => {
    const getCurrentData = async () => {
      const data = await getDocs(currentCollection);
      setUserCollections(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getCurrentData();
  }, [firestoreLoading, refresh])

  // Get data from each entrance of current user
  useEffect(() => {
    setTableData([]);
    const createTable = async () => {
      userCollections.map((data) => {
        const tableRow = [
          data.date,
          data.type,
          data.hour
        ]
        setTableData(prevList => [...prevList, ...tableRow])
      }
      )
    }
    createTable();
  }, [userCollections, refresh])

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
      <select onChange={(e) => setEntranceType(e.target.value)}>
        <option value="Entrada Manhã">Entrada Manhã</option>
        <option value="Saída Manhã">Saída Manhã</option>
        <option value="Entrada Tarde">Entrada Tarde</option>
        <option value="Saída Tarde">Saída Tarde</option>
      </select>
    </div>
  )
}