import styles from "./styles.module.scss";
import { FormEvent, useContext, useState } from "react";
import { TransactionsContext } from "../../contexts/TransactionsContext";

export function SignUp() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [birth, setBirth] = useState("");
  const [password, setPassword] = useState("");


  const { newUser, setTsModalSingUpOpen } = useContext(TransactionsContext);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      email,
      firstName,
      lastName,
      username,
      birth,
      password,
    };
    
    await newUser(data);

    setEmail("");
    setFirstName("");
    setLastName("");
    setUsername("");
    setBirth("");
    setPassword("");
    setTsModalSingUpOpen(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <span>
          <img src="/icons/mascote.png" alt="" />
          <p>Cadastre-se</p>
        </span>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Sobrenome"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="date"
            placeholder="Aniversario"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
