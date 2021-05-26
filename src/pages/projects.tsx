import { Filter } from "../components/Filter";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Project } from "../components/Project";
import styles from "../styles/pages/projects.module.scss";

export default function ProjectsPage() {
    return (
        <>
            <Header />

            <main className={styles.projectsPageContainer}>

                <section className={styles.filterContainer}>
                    <Filter />
                </section>

                <section className={styles.projectsContainer}>
                    <Project />
                    <Project />
                    <Project />
                    <Project />
                    <Project />
                    <Project />
                    <Project />
                    <Project />

                    <nav className={styles.navPages}>
                        <button> 1 </button>
                        <button> 2 </button>
                        <button> 3 </button>
                    </nav>
                </section>

            </main>

            <Footer />
        </>
    )
}