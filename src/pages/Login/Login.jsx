import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Clock } from '../../components/Clock/Clock';
import { AuthEmailContext } from '../../contexts/AuthEmailProvider';
import { UserCircle, LockKeyOpen, XCircle, EyeSlash, Eye } from 'phosphor-react';

import '../../css/App.css';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export const Login = () => {

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
    setLoginEmail,
    setLoginPassword,
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
    setLoginEmail(watch("email"));
    setLoginPassword(watch("password"));
  }, [watch()]);

  // Password Reset
  const auth = getAuth();
  function handleSendPasswordReset() {
    sendPasswordResetEmail(auth, getValues("emailReset"))
      .then(() => {
        console.log("password reset sent");
        setValue("emailReset", "");
        setIsForgotPassword(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error({ "errorCode": errorCode, "errorMessage": errorMessage })
      });
  }

  const [isForgotPassword, setIsForgotPassword] = useState(false);

  // Reset State
  function handleResetState() {
    setIsForgotPassword(current => !current);
    setValue("email", "");
    setValue("emailReset", "");
    setValue("password", "");
  }

  // Is button active
  const [isButtonActive, setIsButtonActive] = useState(false);
  
  useEffect(() => {
    if(isForgotPassword && watch("emailReset") === "" ||
      isForgotPassword && watch("emailReset") === undefined) {
      return setIsButtonActive(false);
    } else if (!isForgotPassword && watch("email") === "" ||
      !isForgotPassword && watch("email") === undefined) {
      return setIsButtonActive(false);
    } else if (!isForgotPassword && watch("password") === "" ||
      !isForgotPassword && watch("password") === undefined) {
      return setIsButtonActive(false);
    } else {
      return setIsButtonActive(true);
    }
  }, [watch()]);

   // Is password visible
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="login-container">
      <section>
        <Clock />
        {
          isForgotPassword ?
          <>
            <XCircle size={40} weight="duotone" id="close-button" onClick={() => handleResetState()} />
            <div className="login-wrapper">
              <span id="reset-title">Insira seu e-mail e clique em enviar</span>
              <div className="input-wrapper">
                <UserCircle size={36} color="#154854" weight="duotone" />
                <input type="text" placeholder="Email" {...register("emailReset")} />
                
              </div>
              <button 
                onClick={() => handleSendPasswordReset()}
                disabled={isButtonActive ? "" : "disabled"}
              >
                Enviar
              </button>
            </div>
          </> :
          <div className="login-wrapper">
            <div className="input-wrapper">
              <UserCircle id="input-icon" size={36} color="#154854" weight="duotone" />
              <input type="text" placeholder="Email" {...register("email")} />
            </div>
            <div className="input-wrapper">
              <LockKeyOpen id="input-icon" size={36} color="#154854" weight="duotone" />
              <input type={isPasswordVisible ? "text" : "password"} placeholder="Senha" {...register("password")} />
              {
                !isPasswordVisible ?
                <EyeSlash onClick={() => setIsPasswordVisible(true)} size={32} id="eye-icon" color="#154854" weight="duotone" /> :
                <Eye onClick={() => setIsPasswordVisible(false)} size={32} id="eye-icon" color="#154854" weight="duotone" />
              }
            </div>
            <span id="forgot-password" onClick={() => handleResetState()}>Esqueci a senha</span>
            <Link to="/register" id="non-registered">Cadastrar-se agora</Link>
            <button 
              onClick={() => loginUser()}
              disabled={isButtonActive ? "" : "disabled"}
            >
              Acessar
            </button>
          </div>
        }
      </section>
    </div>
  )
}