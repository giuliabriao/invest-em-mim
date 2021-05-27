import styles from './styles.module.scss'

export function Call(){
  return(
    <div className={styles.container}>
      <div>
        <h1>
        O elo entre sua liberdade  <br/> 
        financeira e o sonho<br/>
        de empreender.
        </h1>
        <button>Cadastrar-se</button>
      </div>
      <div>
        <img src="./img/call.png" alt="Menina sorrindo e mexendo no smartphone" />
      </div>
    </div>
  )
}