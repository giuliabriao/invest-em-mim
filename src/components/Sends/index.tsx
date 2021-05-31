import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import styles from "./styles.module.scss";
import { FaArrowAltCircleDown } from "react-icons/fa";

type Sends = {
  id: number;
  receptor: number;
  date: string;
  amount: number;
}
export function Sends(props: Sends) {
  return (
    <div className={styles.listProjects} key={props.id}>
      <p>{props.id}</p>
      <p>{props.receptor}</p>
      
      <p>{format(new Date(props.date), "dd MMM yyyy", {
          locale: ptBR,
        })}</p>

      <span className={styles.balance}>
        <p>{props.amount}</p>
        <FaArrowAltCircleDown />
      </span>
      <p>Efetuado</p>
    </div>
  );
}
