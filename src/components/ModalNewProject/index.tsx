import { parseCookies } from "nookies";
import { FormEvent, useContext, useState } from "react";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import styles from "./styles.module.scss";

export function ModalNewProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [date_limit, setDate_limit] = useState("");
  const [category, setCategory] = useState("");
  const { id } = parseCookies();

  const { newProject, setReload, reload } = useContext(TransactionsContext)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      title,
      description,
      goal,
      date_limit,
      category,
      user_id: id
    };
    console.log(data)
    await newProject(data);
    setReload(!reload);
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Titulo do projeto" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          />

        <textarea 
          placeholder="Descrição do projeto"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <input 
          type="number" 
          placeholder="Valor da meta do projeto" 
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />

        <label>imagem</label>
        <input type="file" />
        
        <p> Data de encerramento </p>
        <input 
          type="date" 
          value={date_limit}
          onChange={(e) => setDate_limit(e.target.value)}
        />
        
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="startup">startup</option>
          <option value="social">social</option>
          <option value="comercio">comercio</option>
          <option value="ambiental">ambiental</option>
          <option value="animal">animal</option>
        </select>

        <button className={styles.btnSub}>Criar novo projeto</button>
      </form>
    </div>
  );
}
