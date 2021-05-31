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
import Link from "next/link";

export default function ProjectsPage({ treatedProjects, pageCount }) {

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
        let url = `/projects`

        if(category && category !== ""){
             url += `?category=${category}`
        }
        const request = await api.get(url)

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
            value: "startup",
            icon: '../../icons/startup.png'
        },
        {
            description: "Comércios",
            value: "comercio",
            icon: "../../icons/comércio.png"

        },
        {
            description: "Sociais",
            value: "social",
            icon: "../../icons/social.png"
        },
        {
            description: "Ambientais",
            value: "ambiental",
            icon: "../../icons/ambiental.png"
        },
        {
            description: "Causas animais",
            value: "animal",
            icon: "../../icons/animal.png"
        }
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
                                    <img src={category.icon}></img>
                                    <a onClick={() => filterProjects(category.value)}>{category.description}</a>                                     
                                </li>
                            )
                        })}
                        <li><a className="allCategories" onClick={() => filterProjects("")}>Ver todas</a></li>
                    </ul>
                    

                </section>

                <section className={styles.projectsContainer}>

                    {projects.map(project => {
                        return (
                            <Link href={`/project/${project.id}`}>
                              <a>
                              <Project
                                title={project.title}
                                description={project.description.slice(0, 185)}
                                category={project.category}
                                image={project.image}
                                valuation={project.valuation}
                                address={project.address}
                                goal={project.goal}
                                balance={project.balance}
                                key={project.id}
                            />
                              </a>
                            </Link>
                        )
                    })}

                    <ReactPaginate
                        pageCount={pageCount}
                        pageRangeDisplayed={pageCount}
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
    let pageCount = Math.round(count / 8);
    let rest = count % 8

    if(rest > 0){
        pageCount += 1
    }

    const treatedProjects = response.data.map((obj) => {
        return {
            id: obj.id,
            title: obj.title,
            description: obj.description.slice(0, 185),
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