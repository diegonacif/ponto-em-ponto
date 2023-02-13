import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Clock } from "../../components/Clock/Clock";
import { AuthEmailContext } from "../../contexts/AuthEmailProvider";
import { Eye, EyeSlash, LockKeyOpen, UserCircle, XCircle } from "phosphor-react";

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

  // Is button active
  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    if(watch("register-email") === "" || watch("register-email") === undefined) {
      return setIsButtonActive(false);
    } else if(watch("register-password") === "" || watch("register-password") === undefined) {
      return setIsButtonActive(false);
    } else if(watch("repeat-password") !== watch("register-password")) {
      return setIsButtonActive(false);
    } else {
      return setIsButtonActive(true);
    }
  }, [watch()]);

  // Is password visible
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="register-container">
      <section>
        <Clock />
        <Link to="/home">
          <XCircle size={40} weight="duotone" id="close-button" onClick={() => handleResetState()} />
        </Link>
        <div className="register-wrapper">
          <div className="input-wrapper">
            <UserCircle id="input-icon" size={36} color="#154854" weight="duotone" />
            <input type="text" placeholder="Email" {...register("register-email")} />
          </div>
          <div className="input-wrapper">
            <LockKeyOpen id="input-icon" size={36} color="#154854" weight="duotone" />
            <input type={isPasswordVisible ? "text" : "password"} placeholder="Senha" {...register("register-password")} />
            {
              !isPasswordVisible ?
              <EyeSlash onClick={() => setIsPasswordVisible(true)} size={32} id="eye-icon" color="#154854" weight="duotone" /> :
              <Eye onClick={() => setIsPasswordVisible(false)} size={32} id="eye-icon" color="#154854" weight="duotone" />
            }
          </div>
          <div className="input-wrapper">
            <LockKeyOpen id="input-icon" size={36} color="#154854" weight="duotone" />
            <input type={isPasswordVisible ? "text" : "password"} placeholder="Repita sua senha" {...register("repeat-password")} />
          </div>
          <button 
            onClick={() => registerUser()}
            disabled={isButtonActive ? "" : "disabled"}
          >
            Registrar
          </button>
        </div>
      </section>
    </div>
  )
}