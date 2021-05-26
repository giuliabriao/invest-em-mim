import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import React from "react";
import { Call } from "../components/Call";
import { CategoryIcons } from "../components/CategoryIcons";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Slider } from "../components/Slider";
import { Spotlight } from "../components/Spotlight";
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

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const cookies = parseCookies(ctx);

//   if(cookies['invest.token']) {
//     return {
//       redirect: {
//         destination: '/dashboard',
//         permanent: false,
//       }
//     }
//   }
// }