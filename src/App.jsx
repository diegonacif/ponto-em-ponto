import { useContext } from 'react';
import { Clock } from './components/Clock/Clock';
import { RegisterTable } from './components/RegisterTable/RegisterTable';
import { AuthEmailContext } from './contexts/AuthEmailProvider';
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
    <div className="app-container">
      <h1>Ponto em ponto</h1>
      <Clock />
      <button onClick={() => logoutUser()}>Logout</button>
      <RegisterTable />
    </div>
  )
}

export default App
