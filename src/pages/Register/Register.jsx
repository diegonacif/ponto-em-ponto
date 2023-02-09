import "../../css/App.css";

export const Register = () => {
  return (
    <div className="register-container">
      <h3>Registre-se para cadastrar sua empresa</h3>
      <div className="register-wrapper">
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Senha" />
        <input type="text" placeholder="Repita sua senha" />
        {/* <span id="forgot-password">Esqueci a senha</span>
        <span id="non-registered">Cadastrar minha empresa</span> */}
        <button>Registrar</button>
      </div>
    </div>
  )
}