import styles from "./styles.module.scss";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export function SignIn() {
  const [isTypePassword, setIsTypePassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleTypePassword() {
    setIsTypePassword(!isTypePassword);
  }

  const {signInPage} = useContext(AuthContext);

  async function handleSubmit(event: FormEvent){
    event.preventDefault();

    const data = {
      email,
      password
    }
    await signInPage(data)
  }

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <span>
          <img src="/icons/mascote.png" alt="" />
          <p>Faça o Login</p>
        </span>

        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="E-mail"  value={email} onChange={e => setEmail(e.target.value)}/>

          <input
            type={`${isTypePassword ? "text" : "password"}`}
            placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)}
          />

          <span>
            <button type="button" onClick={handleTypePassword}>
              {isTypePassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </span>
          <a>Esqueceu sua senha ?</a>

          <button type="submit">Entrar</button>

          <button type="submit">
            <FcGoogle />
            Entrar com Google
          </button>
        </form>
        <h3>
          Ainda não tem uma conta ? <a href="#">Cadastre-se</a>
        </h3>
      </div>
    </div>
  );
}
