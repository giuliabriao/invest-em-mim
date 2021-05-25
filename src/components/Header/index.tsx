import { useState } from "react";
import { SignIn } from "../SignIn";
import styles from "./styles.module.scss";

export function Header() {

  const [modalSignIn, setModalSignIn] = useState(false);
  
  function handleClickSignIn(){
    setModalSignIn(true);
  }

  return (
    <div className={styles.container}>
      <nav>
      
        <div>
          <img
            src="./img/logo.png"
            alt="Logotipo Invest em mim, com mascote da carinha sorrindo"
          />
        </div>

        <div className={styles.login}>
          <div>
            <button 
              className={styles.headerButton}
              onClick={handleClickSignIn}
            >
              Login
            </button>
            <button className={styles.headerButton}>Cadastrar</button>
          </div>
          {modalSignIn ? <SignIn/>: ''}
        </div>
       
      </nav>
    </div>
  );
}
