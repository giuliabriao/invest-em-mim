import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import styles from "./styles.module.scss";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { AiFillDelete } from 'react-icons/ai';
import { IoMdOptions } from "react-icons/io";
import { useContext, useState } from "react";
import { ModalEdit } from "../ModalEdit";
import { TransactionsContext } from "../../contexts/TransactionsContext";

export function Recives(props) {
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const { deleteProject } = useContext(TransactionsContext);

  return (
    <div 
      className={styles.listProjects } 
      style={props.deleted && {filter: 'brightness(0.9)', background: 'rgba(215, 44, 44, 0.1)'}} key={props.id}>
      
      <p>{props.id}</p>
      <p>{props.title}</p>
      <p>{props.category}</p>

      <span className={styles.balance}>
        <p>{props.balance}</p>
        <FaArrowAltCircleUp />
      </span>

      <p>{props.deleted 
        ? ('DELETADO')
        :(props.create === props.limit ? 'ENCERRADO' : 'ABERTO')}
      </p>
      
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

      <button 
        onClick={() => setIsModalEditOpen(!isModalEditOpen)}
        disabled={props.deleted ? true : false }
      >
        <IoMdOptions />
      </button>

      <button 
        onClick={() => deleteProject(props.id)}
        disabled={props.deleted ? true : false }
      >
        <AiFillDelete style={{color: 'red'}}/>
      </button>
      
      {isModalEditOpen && (
        <ModalEdit
          title={props.title}
          description={props.description}
          id={props.id}
        />
      )}
    </div>
  );
}
