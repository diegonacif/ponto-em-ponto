import { useContext } from 'react';
import { Clock } from './components/Clock/Clock';
import { RegisterTable } from './components/RegisterTable/RegisterTable';
import { AuthEmailContext } from './contexts/AuthEmailProvider';
import { ClockProvider } from './contexts/ClockProvider';
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

  return (
    <ClockProvider>
      <div className="app-container">
        <h1>Ponto em ponto</h1>
        <Clock />
        <button onClick={() => logoutUser()}>Logout</button>
        <RegisterTable />
      </div>
    </ClockProvider>

  )
}

export default App
