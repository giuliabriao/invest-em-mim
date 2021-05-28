import { FormEvent, useContext, useState } from "react";

import { TransactionsContext } from "../../contexts/TransactionsContext";
import styles from "./styles.module.scss";

type ModalEditProps = {
  title: string;
  id: number;
  description: string;
}
export function ModalEdit(props: ModalEditProps) {
  const { id } = props;
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);

  const { editProject,  setReload, reload} = useContext(TransactionsContext);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      title,
      description,
      id,
    };
    await editProject(data);
    setReload(!reload);
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit">salvar</button>
      </form>
    </div>
  );
}
