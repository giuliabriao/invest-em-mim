import styles from './styles.module.scss'

export function Project(props) {
  const projectProgress = (props.balance * 100)  / props.goal

  return (
    <>
      <section className={styles.projectContainer}>

        <img src={props.image} alt="" />

        <article className={styles.infosContainer}>

          <header>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
          </header>

          <span className={styles.goal}> R$ {props.goal}</span>

          <p className={styles.category}>{props.category}</p>

          <p className={styles.reached}> R$ {props.balance}</p>

          <div className={styles.progress}>
            <div style={{ width: `${projectProgress}%` }} className={styles.mount}></div>
          </div>

        </article>
      </section>
    </>
  )
}