import { Filter } from "../components/Filter";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Project } from "../components/Project";
import styles from "../styles/pages/projects.module.scss";

export default function ProjectsPage() {
    return (
        <>
            <Header />

            <section className={styles.projectsContainer}>
                <Filter />

                <Project />
                {/* <Project />
                <Project />
                <Project />
                <Project />
                <Project />
                <Project />
                <Project /> */}
            </section>

            <Footer />
        </>
    )
}