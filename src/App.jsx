import { useContext } from 'react';
import { Clock } from './components/Clock/Clock';
import { RegisterTable } from './components/RegisterTable/RegisterTable';
import { AuthEmailContext } from './contexts/AuthEmailProvider';
import { ClockContext, ClockProvider } from './contexts/ClockProvider';
import { PauseCircle, PlayCircle, SignIn, SignOut } from 'phosphor-react';

import './css/App.css';

function App() {

  const { 
    registerUser,
    setLoginEmail,
    setLoginPassword,
    setRegisterEmail,
    setRegisterPassword,
    loginUser,
    logoutUser,
    isSignedIn,
    errorMsg
  } = useContext(AuthEmailContext);

  const { 
    dateTimeFormated
  } = useContext(ClockContext);

  return (
    <ClockProvider>
      <div className="app-container">
        {/* <h1>Ponto em ponto</h1> */}
        <div id="table-clock">
          <span>{dateTimeFormated}</span>
        </div>
        <button onClick={() => logoutUser()}>Logout</button>
        <RegisterTable />
      </div>
    </ClockProvider>

  )
}

export default App
