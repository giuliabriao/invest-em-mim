import console from "console";
import {  GetStaticProps } from "next";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React from "react";
import { Call } from "../components/Call";
import { CategoryIcons } from "../components/CategoryIcons";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Slider } from "../components/Slider";
import { Spotlight } from "../components/Spotlight";
import { api } from "../services/api";
import styles from "../styles/pages/index.module.scss";

export default function Home() {
  return (
    <>
      <Header />
      <Slider />
      <Call />

      <section className={styles.SpotlightSection}>
        <h1>Campanhas em destaque</h1>

        <div className={styles.cards}>
          <Spotlight />
          <Spotlight />
          <Spotlight />
          <Spotlight />
          <Spotlight />
          <Spotlight />
        </div>

        <h2>Escolha uma das causas <br/> para investir.</h2>

        <div className={styles.icons}>
          <CategoryIcons icon="startup" />
          <CategoryIcons icon="comércio" />
          <CategoryIcons icon="social" />
          <CategoryIcons icon="ambiental" />
          <CategoryIcons icon="animal" />
        </div>
      </section>
      <Footer/>
    </>
  );
}


export const getStaticProps: GetStaticProps = async () => {

  const response = await api.get('/projects')
  const projects = response.data;

  const teste = projects.map(project => {
    return {
    id: project.id,
    title: project.title,
    description: project.description,
    category: project.category,
    image: project.image,
    valuation: project.valuation,
    address: project.address,
    goal: project.goal,
    balance: project.balance,
    date_limit: format(
      new Date(project.date_limit),
      'dd MMM yyyy',
      {
        locale: ptBR,
      }
    ),
    account: project.account,
    user_id: project.user_id,
    // "created_at": "2021-05-17T20:46:57.968Z",
    // "updated_at": "2021-05-17T20:46:57.968Z",
    // "deleted_at": null
    }
  })
  console.log(teste)

  return {
    props: {
      projects
    },
    revalidate: 60 * 60 * 24, //24 horas
  };
}
