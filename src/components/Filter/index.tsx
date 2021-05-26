import styles from './styles.module.scss'

export function Filter() {
  return (
    <>
      <section className={styles.filterContainer}>
        
        <h1>Filtrar campanhas</h1>
        <ul>
          <li><a href="/#">Startup</a></li>
          <li><a href="/#">Comercios</a></li>
          <li><a href="/#">Ambientais</a></li>
          <li><a href="/#">Sociais</a></li>
          <li><a href="/#">Causas animais</a></li>
        </ul>

        <ul className={styles.filterNumbers}>
          <li><a>1</a></li>
          <li><a>2</a></li>
          <li><a>3</a></li>
          <li><a>4</a></li>
          <li><a>5</a></li>
        </ul>

        <button>Filtrar campanhas</button>

      </section>
    </>
  )
}