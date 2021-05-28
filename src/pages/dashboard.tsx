import { useContext, useState } from "react";
import { Header } from "../components/Header";
import { withSSRauth } from "../utils/withSSRauth";
import styles from "../styles/pages/dashboard.module.scss";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";
import { AiFillDollarCircle } from "react-icons/ai";
import { IoMdAddCircle } from 'react-icons/io';
import { Footer } from "../components/Footer";
import { Recives } from "../components/Recive";
import { Sends } from "../components/Sends";
import { TransactionsContext } from "../contexts/TransactionsContext";
import Head from "next/head";
import { ModalNewProject } from "../components/ModalNewProject";

export default function Dashboard() {
  const [totals, setTotals] = useState(true);
  const { isModalNewProjectOpen, setIsModalNewProjectOpen, myProjects, myInvestments, totalReceipt, totalInvested } = useContext(TransactionsContext);

  return (
    <>
      <Head>
        <title>Dashboard | Invest em mim </title>
      </Head>
      <Header />
      <div className={styles.container}>
        <div className={styles.status}>
          <div className={styles.content}>
            <span>
              <p>R$ {totalReceipt} </p>
              <button type="button" onClick={() => setTotals(true)}>
                <FaArrowAltCircleUp />
              </button>
            </span>
            <p>Total arrecadado</p>
          </div>

          <div className={styles.content}>
            <span>
              <p> {totalInvested} </p>
              <button type="button" onClick={() => setTotals(false)}>
                <FaArrowAltCircleDown style={{ color: "red" }} />
              </button>
            </span>
            <p>Total investido</p>
          </div>

          <div className={styles.content}>
            <span>
              <p>R$ {totalReceipt - totalInvested}</p>
              <AiFillDollarCircle />
            </span>
            <p>Saldo</p>
          </div>

          <div className={styles.newProject}>
            <button
              onClick={() =>setIsModalNewProjectOpen(!isModalNewProjectOpen)}
            >
              <IoMdAddCircle/>
            </button>
            {isModalNewProjectOpen && <ModalNewProject/>}
          </div>
        </div>

        {totals ? (
          <span>
            <h3>Meus Projetos</h3>
            <div className={styles.titles}>
              <p>id</p>
              <p>Nome</p>
              <p>Categoria</p>
              <p>Recebidos</p>
              <p>Status</p>
              <p>Início</p>
              <p>Fim</p>
              <p>Ações</p>
              <p>Deletar</p>
            </div>
            {myProjects.map((project) => {
              return (
                <Recives
                  id={project.id}
                  title={project.title}
                  category={project.category}
                  balance={project.balance}
                  create={project.created_at}
                  limit={project.date_limit}
                  description={project.description}
                  deleted={project.deleted_at}
                />
              );
            })}
          </span>
        ) : (
          <span>
            <h3>Meus Investimentos</h3>
            <div className={styles.titles}>
              <p>id</p>
              <p>Investimento</p>
              <p>Data</p>
              <p>Valor investido</p>
              <p>Status</p>
            </div>
            {myInvestments.map((invest) => {
              return (
                <Sends
                  id={invest.id}
                  amount={invest.value}
                  date={invest.date}
                  receptor={invest.receptor}
                />
              );
            })}
          </span>
        )}
      </div>
      <Footer />
    </>
  );
}

export const getServerSideProps = withSSRauth(async (ctx) => {
  return {
    props: {},
  };
});
