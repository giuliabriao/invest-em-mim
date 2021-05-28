import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import styles from "./styles.module.scss";
import { FaArrowAltCircleUp } from "react-icons/fa";

export function Recives(props) {
  return (
    <div className={styles.listProjects} key={props.id}>
      <p>{props.id}</p>
      <p>{props.title}</p>
      <p>{props.category}</p>

      <span className={styles.balance}>
        <p>{props.balance}</p>
        <FaArrowAltCircleUp />
      </span>

      <p>ABERTO</p>
      <p>
        {format(new Date(props.create), "dd MMM yyyy", {
          locale: ptBR,
        })}
      </p>
      <p>
        {format(new Date(props.limit), "dd MMM yyyy", {
          locale: ptBR,
        })}
      </p>
      <p>...</p>
    </div>
  );
}
