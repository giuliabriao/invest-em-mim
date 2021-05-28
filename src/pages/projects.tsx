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
import ReactPaginate from 'react-paginate';

export default function ProjectsPage({ treatedProjects, pageCount }) {

    // const [pageCount, setPageCount] = useState(1);
    // const [isLoaded, setIsLoaded] = useState(false);
    const [filteredProjects, setFilteredProjects] = useState("")
    // const [currentPage, setCurrentPage] = useState(1);
    const [projects, setProjects] = useState(treatedProjects);

    const handleAPICall = async (currentPage) => {
        console.log(currentPage);

        const projects = await api.get(`/projects?page=${currentPage}`)

        const projectsTreated = projects.data.map((obj) => {
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

        setProjects(projectsTreated)
    };

    const handlePageChange = (selectedObject) => {
        console.log(selectedObject);

        // setCurrentPage(selectedObject.selected + 1);
        handleAPICall(selectedObject.selected + 1);
    };

    const filterProjects = async (category) => {
        const request = await api.get(`/projects?category=${category}`)

        const treatedFilteredProjects = request.data.map((obj) => {
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

        setProjects(treatedFilteredProjects)
    }
    
    const categories = [
        {
            description: "Startups",
            value: "startup"
        },
        {
            description: "Comércios",
            value: "comercio"
        },
        {
            description: "Sociais",
            value: "social"
        },
        {
            description: "Ambientais",
            value: "ambiental"
        },
        {
            description: "Causas animais",
            value: "animal"
        },
    ]

    return (
        <>
            <Header />

            <main className={styles.projectsPageContainer}>

                <section className={styles.filterContainer}>
                    <h1>Filtrar campanhas</h1>

                    <ul>
                        {categories.map((category) => {
                            return (
                                <li key={category.value}>
                                    <a onClick={() => filterProjects(category.value)}>{category.description}</a>
                                </li>
                            )
                        })}
                    </ul>

                </section>

                <section className={styles.projectsContainer}>

                    {projects.map(project => {
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
                                key={project.id}
                            />
                        )
                    })}

                    <ReactPaginate
                        pageCount={pageCount}
                        pageRangeDisplayed={1}
                        marginPagesDisplayed={2}
                        onPageChange={handlePageChange}
                        containerClassName={styles.container}
                        previousLinkClassName={styles.page}
                        breakClassName={styles.page}
                        nextLinkClassName={styles.page}
                        pageClassName={styles.page}
                        disabledClassName={styles.disabled}
                        activeClassName={styles.active}
                    />

                </section>

            </main>

            <Footer />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {

    const response = await api.get('/projects')
    const { "x-total-count": count } = response.headers
    const pageCount = Math.round(count / 8);

    const treatedProjects = response.data.map((obj) => {
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

    return {
        props: {
            treatedProjects,
            pageCount
        }
    };
};