import styles from './styles.module.scss'

export function Filter(props) {

  const categories = props.p.map( (project) => {
    return project.category
    })

  return (
    <>
      <section className={styles.filterContainer}>

        <h1>Filtrar campanhas</h1>
        <ul>
          {/* {categories.map((category) => {
            <li><a onClick={props.fn(category)}>Startup</a></li>
          })} */}
          <li><a href={props.startup}>Startup</a></li>
          <li><a href="/projects?category=comercio">Comercios</a></li>
          <li><a href="/projects?category=ambiental">Ambientais</a></li>
          <li><a href="/projects?category=social">Sociais</a></li>
          <li><a href="/projects?category=animal">Causas animais</a></li>
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