import { Filter } from "../components/Filter";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Project } from "../components/Project";
import { GetServerSideProps } from "next";
import { api } from '../services/api';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import styles from "../styles/pages/projects.module.scss";
import { useState } from "react";

export default function ProjectsPage({ treatedData, logic }) {

    const [paging, setPaging] = useState(treatedData);

    const paginando = async (logic) => {
        const paginacao = await api.get(`/projects?page=${logic}`)
        return setPaging(paginacao)
    }

    const buttons = () => {
        for (let n = 1; n < logic; n++) {
            return (
                <button onClick={() => paginando(n)}> {n} </button>
            )
        }
    };

    // const buttons = () => {
    //     logic.map( (n) => {
    //         return (
    //             <button onClick={async () => await paginando(n)}> {n} </button>
    //         )
    //     })
    // };

    return (
        <>
            <Header />

            <main className={styles.projectsPageContainer}>

                <section className={styles.filterContainer}>
                    <Filter />
                </section>

                <section className={styles.projectsContainer}>

                    {paging.map(project => {
                        return (
                            <Project
                                title={project.title}
                                description={project.description}
                                category={project.category}
                                image={project.image}
                                valuation={project.valuation}
                                address={project.address}
                                goal={project.goal}
                                balance={project.balance}
                            />
                        )
                    })}

                    <nav className={styles.navPages}>
                        {buttons}
                    </nav>
                </section>

            </main>

            <Footer />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {

    // const pagination = await api.get(`/projects?page=${logic}`)

    const response = await api.get('/projects')
    const { "x-total-count": count } = response.headers
    const logic = Math.round(count / 8);

    console.log(count);

    const projects = response.data;

    const treatedData = projects.map((obj) => {
        return {
            id: obj.id,
            title: obj.title,
            description: obj.description,
            category: obj.category,
            image: obj.image,
            valuation: obj.valuation,
            address: obj.address,
            goal: obj.goal,
            balance: obj.balance,
            date_limit: format(
                new Date(obj.date_limit),
                'dd/MM/yyyy',
                {
                    locale: ptBR,
                }
            ),
            account: obj.account,
            user_id: obj.user_id,
        }
    })
    console.log(treatedData.length);

    return {
        props: {
            treatedData,
            logic
        }
    };
};