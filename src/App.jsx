import { XCircle } from 'phosphor-react';
import { useContext } from 'react';
// import { Clock } from './components/Clock/Clock';
import { RegisterTable } from './components/RegisterTable/RegisterTable';
import { AuthEmailContext } from './contexts/AuthEmailProvider';
import { ClockContext, ClockProvider } from './contexts/ClockProvider';
// import { PauseCircle, PlayCircle, SignIn, SignOut } from 'phosphor-react';

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
        <XCircle 
          size={40} 
          weight="duotone" 
          id="logout-button" 
          onClick={() => logoutUser()}
        />
        <div id="table-clock">
          <span>{dateTimeFormated}</span>
        </div>
        <RegisterTable />
      </div>
    </ClockProvider>

  )
}

export default App
