import { useContext, useEffect, useState } from 'react';
import { db } from '../../services/firebase';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { useCollection } from "react-firebase-hooks/firestore";

import { ClockContext } from '../../contexts/ClockProvider';
import { AuthEmailContext } from "../../contexts/AuthEmailProvider";

import { PauseCircle, PlayCircle, SignIn, SignOut } from 'phosphor-react';
import '../../css/App.css';

export const RegisterTable = () => {

  const usersCollectionRef = collection(db, "users");
  const [users, setUsers] = useState({});
  const [firestoreLoading, setFirestoreLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [entranceType, setEntranceType] = useState("Entrada");

  const [tableData, setTableData] = useState([]);
  
  // const { dateTime, dateTimeFormated } = useContext(ClockContext);
  const { user } = useContext(AuthEmailContext);

  // Current Hour
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

  const IdsArray = firestoreLoading ? [] : users?.map((user) => user.id)

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
      hour: dateTimeFormated,
      // hour: `${dateTime.hours}:${dateTime.minutes}:${dateTime.seconds}`,
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
      <div className="select-wrapper">
        <button 
          className={entranceType === "Entrada" ? "active" : "inactive"}
          onClick={() => setEntranceType("Entrada")}>
          <SignIn size={40} weight="duotone" />
        </button>
        <button 
          className={entranceType === "Pausa" ? "active" : "inactive"}
          onClick={() => setEntranceType("Pausa")}>
          <PauseCircle size={40} weight="duotone" />
        </button>
        <button 
          className={entranceType === "Retorno" ? "active" : "inactive"}
          onClick={() => setEntranceType("Retorno")}>
          <PlayCircle size={40} weight="duotone" />
        </button>
        <button 
          className={entranceType === "Saída" ? "active" : "inactive"}
          onClick={() => setEntranceType("Saída")}>
          <SignOut size={40} weight="duotone" />
        </button>
      </div>
      <button 
        onClick={() => registerHour()}
        id="button-add"
      >
        Registrar
      </button>
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
      {/* <select onChange={(e) => setEntranceType(e.target.value)}>
        <option value="Entrada Manhã">Entrada Manhã</option>
        <option value="Saída Manhã">Saída Manhã</option>
        <option value="Entrada Tarde">Entrada Tarde</option>
        <option value="Saída Tarde">Saída Tarde</option>
      </select> */}
    </div>
  )
}