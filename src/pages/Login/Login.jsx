import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Clock } from '../../components/Clock/Clock';
import { AuthEmailContext } from '../../contexts/AuthEmailProvider';
import { UserCircle, LockKeyOpen, XCircle } from 'phosphor-react';

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
      <section>
        <Clock />
        <div className="login-wrapper">
          <div className="input-wrapper">
            <UserCircle size={36} color="#154854" weight="duotone" />
            <input type="text" placeholder="Email" {...register("email")} />
          </div>
          <div className="input-wrapper">
            <LockKeyOpen size={36} color="#154854" weight="duotone" />
            <input type="password" placeholder="Senha" {...register("password")} />
          </div>
          <span id="forgot-password">Esqueci a senha</span>
          <Link to="/register" id="non-registered">Cadastrar-se agora</Link>
          <button onClick={() => loginUser()}>Acessar</button>
        </div>
      </section>
    </div>
  )
}