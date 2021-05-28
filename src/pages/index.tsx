import { GetStaticProps } from "next";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Call } from "../components/Call";
import { CategoryIcons } from "../components/CategoryIcons";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Slider } from "../components/Slider";
import { Spotlight } from "../components/Spotlight";
import { api } from "../services/api";
import styles from "../styles/pages/index.module.scss";
import Link from 'next/link';
export default function Home({ spotlights }) {
  return (
    <>
      <Header />
      <Slider />
      <Call />

      <section className={styles.SpotlightSection}>
        <h1>Campanhas em destaque</h1>

        <div className={styles.cards}>
          {spotlights.map((item) => {
            return (
              <Link href={`/project/${item.id}`}>
                <a>
                <Spotlight
                key={item.id}
                title={item.title}
                description={item.description}
                category={item.category}
                image={item.image}
                goal={item.goal}
                balance={item.balance}
              />
                </a>
              </Link>
            );
          })}
        </div>

        <h2>
          Escolha uma das causas <br /> para investir.
        </h2>

        <div className={styles.icons}>
          <CategoryIcons icon="startup" />
          <CategoryIcons icon="comércio" />
          <CategoryIcons icon="social" />
          <CategoryIcons icon="ambiental" />
          <CategoryIcons icon="animal" />
        </div>
      </section>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("/projects");

  const projects = data.map((project) => {
    return {
      id: project.id,
      title: project.title,
      description: project.description.slice(0, 85),
      category: project.category,
      image: project.image,
      valuation: project.valuation,
      address: project.address,
      goal: project.goal,
      balance: project.balance,
      date_limit: format(new Date(project.date_limit), "dd MMM yyyy", {
        locale: ptBR,
      }),
      account: project.account,
      user_id: project.user_id,
    };
  });

  const spotlights = projects.slice(0, 6);
  console.log(spotlights);
  return {
    props: {
      spotlights,
    },
    revalidate: 60 * 60 * 24, //24 horas
  };
};
