import styles from './styles.module.scss'

export function Project() {
  const pro = 67;

  return (
    <>
      <section className={styles.projectContainer}>

        <img src="./img/causa.jpeg" alt="" />

        <article className={styles.infosContainer}>

          <header>
            <h3>Projeto Social Brasil</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat...{" "}
            </p>
          </header>

          <span className={styles.goal}> R$ 300.000</span>

          <p className={styles.category}>Projeto Social</p>

          <p className={styles.reached}>R$ 10.000</p>

          <div className={styles.progress}>
            <div style={{ width: `${pro}%` }} className={styles.mount}></div>
          </div>

        </article>
      </section>
    </>
  )
}