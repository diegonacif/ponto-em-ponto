import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthEmailContext } from '../../contexts/AuthEmailProvider';

import '../../css/App.css';

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

  return (
    <div className="login-container">
      <h3>Faça login para continuar</h3>
      <div className="login-wrapper">
        <input type="text" placeholder="Email" {...register("email")} />
        <input type="text" placeholder="Senha" {...register("password")} />
        <span id="forgot-password">Esqueci a senha</span>
        <Link to="/register" id="non-registered">Cadastrar minha empresa</Link>
        <button onClick={() => loginUser()}>Acessar</button>
      </div>
    </div>
  )
}