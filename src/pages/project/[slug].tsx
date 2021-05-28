import { GetServerSideProps } from "next";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { api } from "../../services/api";
import styles from "../../styles/pages/project.module.scss";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FormEvent, useContext, useState } from "react";
import { parseCookies } from "nookies";
import { TransactionsContext } from "../../contexts/TransactionsContext";

type Project = {
  title: string;
  id: number;
  description: string;
  category: string;
  image: string;
  goal: number;
  balance: number;
  date_limit: string;
  created_at: string;
};

type ProjectProps = {
  project: Project;
};

export default function Project({ project }: ProjectProps) {
  const progressGoal = (project.balance * 100) / project.goal;

  const { newTransaction } = useContext(TransactionsContext);
  const [value, setValue] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const { id } = parseCookies();

    const data = {
      value,
      sender: id,
      receptor: project.id,
    };
    await newTransaction(data);
    setValue("");
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.banner}>
          <img src={project.image} />
        </div>

        <div className={styles.content}>
          <h1>{project.title}</h1>
          <h4>{project.category}</h4>

          <div className={styles.status}>
            <p>
              Valor atual: <strong>R$ {project.balance}</strong>
            </p>
            <p>
              Meta: <strong>R$ {project.goal}</strong>
            </p>
          </div>
          <div className={styles.progress}>
            <div
              style={{ width: `${progressGoal}%` }}
              className={styles.mount}
            ></div>
          </div>

          <span>
            <p>{project.description}</p>
          </span>

          <div className={styles.invest}>
            <span>
              <p>
                Disponível para invetimento até:
                <strong>
                  {format(new Date(project.date_limit), "dd MMM yyyy", {
                    locale: ptBR,
                  })}
                </strong>
              </p>
              <p>
                Categoria: <strong>{project.category}</strong>
              </p>
            </span>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Digite o valor"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <button type="submit">
                <img src="/img/logo-green.png" />
                investir
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params;

  const { data } = await api.get(`/projects?id=${slug}`);
  const project = data[0];

  return {
    props: {
      project,
    },
  };
};
