import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Clock } from "../../components/Clock/Clock";
import { AuthEmailContext } from "../../contexts/AuthEmailProvider";
import { LockKeyOpen, UserCircle, XCircle } from "phosphor-react";

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
      <section>
        <Clock />
        <Link to="/home">
          <XCircle size={40} weight="duotone" id="close-button" onClick={() => handleResetState()} />
        </Link>
        <div className="register-wrapper">
          <div className="input-wrapper">
            <UserCircle size={36} color="#154854" weight="duotone" />
            <input type="text" placeholder="Email" {...register("register-email")} />
          </div>
          <div className="input-wrapper">
            <LockKeyOpen size={36} color="#154854" weight="duotone" />
            <input type="text" placeholder="Senha" {...register("register-password")} />
          </div>
          <div className="input-wrapper">
            <LockKeyOpen size={36} color="#154854" weight="duotone" />
            <input type="text" placeholder="Repita sua senha" {...register("repeat-password")} />
          </div>
          <button onClick={() => registerUser()}>Registrar</button>
        </div>
      </section>
    </div>
  )
}