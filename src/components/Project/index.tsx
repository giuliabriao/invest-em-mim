import styles from './styles.module.scss'

export function Project() {
  const pro = 67;

  return (
    <section className={styles.projectContainer}>

      <img src="./img/causa.jpeg" alt="" />

      <header>
        <p>Projeto Social Brasil</p>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
        culpa qui officia deserunt mollit anim id est laborum..{" "}
        </p>
      </header>

      <div>

        <div className={styles.goal}>
          <p>Projeto Social</p>
          <span> R$ 300.000</span>
        </div>

        <div className={styles.progress}>
          <div style={{ width: `${pro}%` }} className={styles.mount}></div>
        </div>

      </div>
    </section>
  )
}