import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { Profile } from "../Profile";
import { SignIn } from "../SignIn";
import { SignUp } from "../SignUp";
import styles from "./styles.module.scss";

export function Header() {
  const { user } = useContext(AuthContext);
  const [modalSignIn, setModalSignIn] = useState(false);
  const { setTsModalSingUpOpen, isModalSingUpOpen } =
    useContext(TransactionsContext);

  return (
    <div className={styles.container}>
      <nav>
        <div>
          <Link href="/">
            <a>
              <img
                src="/img/logo.png"
                alt="Logotipo Invest em mim, com mascote da carinha sorrindo"
              />
            </a>
          </Link>
        </div>

        {user ? (
          <Profile />
        ) : (
          <div className={styles.login}>
            <div>
              <button
                className={styles.headerButton}
                onClick={() => setModalSignIn(true)}
              >
                Login
              </button>
              <button
                className={styles.headerButton}
                onClick={() => setTsModalSingUpOpen(true)}
              >
                Cadastrar
              </button>
            </div>
            {modalSignIn && <SignIn />}
            {isModalSingUpOpen && <SignUp />}
          </div>
        )}
      </nav>
    </div>
  );
}
