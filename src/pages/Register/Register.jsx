import { useContext } from "react";
import { AuthEmailContext } from "../../contexts/AuthEmailProvider";
import "../../css/App.css";

export const Register = () => {

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

  function handleRegisterInput(value) {
    return setRegisterEmail(value);
  }

  return (
    <div className="register-container">
      <h3>Registre-se para cadastrar sua empresa</h3>
      <div className="register-wrapper">
        <input type="text" placeholder="Email" onChange={(e) => handleRegisterInput(e.target.value)}/>
        <input type="text" placeholder="Senha" />
        <input type="text" placeholder="Repita sua senha" />
        <button>Registrar</button>
      </div>
    </div>
  )
}