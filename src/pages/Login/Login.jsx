import '../../css/App.css';

export const Login = () => {
  return (
    <div className="login-container">
      <h3>Faça login para continuar</h3>
      <div className="login-wrapper">
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Senha" />
        <span id="forgot-password">Esqueci a senha</span>
        <span id="non-registered">Cadastrar minha empresa</span>
        <button>Acessar</button>
      </div>
    </div>
  )
}