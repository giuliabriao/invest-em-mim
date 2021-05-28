import { FormEvent, useState } from "react";
import styles from "./styles.module.scss";

export function ModalNewProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [date_limit, setDate_limit] = useState("");
  const [category, setCategory] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      title,
      description,
      goal,
      date_limit,
      category
    };
    console.log(data)
    //await editProject(data);
    //setReload(!reload);
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
          type="text" 
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
        
        <select>
          <option>startup</option>
          <option>social</option>
          <option>comercio</option>
          <option>ambiental</option>
          <option>animal</option>
        </select>

        <button className={styles.btnSub}>Criar novo projeto</button>
      </form>
    </div>
  );
}
