import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthEmailContext } from "../../contexts/AuthEmailProvider";
import "../../css/App.css";

export const Register = () => {

  // Hook Form Controller
  const {
    watch,
    register,
    setValue,
    getValues
  } = useForm({
    mode: "all"
  });

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

  // Back to main page when logged in
  const navigate = useNavigate();

  useEffect(() => {
    isSignedIn ? navigate("/home") : null;
  }, [isSignedIn])

  // Inputs data going to auth context
  useEffect(() => {
    setRegisterEmail(watch("register-email"));
    setRegisterPassword(watch("register-password"));
  }, [watch()]);

  return (
    <div className="register-container">
      <h3>Registre-se para cadastrar sua empresa</h3>
      <div className="register-wrapper">
        <input type="text" placeholder="Email" {...register("register-email")} />
        <input type="text" placeholder="Senha" {...register("register-password")} />
        <input type="text" placeholder="Repita sua senha" {...register("repeat-password")} />
        <button onClick={() => registerUser()}>Registrar</button>
      </div>
    </div>
  )
}