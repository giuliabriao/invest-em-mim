import styles from './styles.module.scss'

export function Call(){
  return(
    <div className={styles.container}>
      <div>
        <h1>
          Uma frase bem bacana <br/> 
          sobre a plataforma<br/>
          invest em mim bem aqui
        </h1>
        <button>Cadastrar-se</button>
      </div>
      <div>
        <img src="./img/call.png" alt="Menina sorrindo e mexendo no smartphone" />
      </div>
    </div>
  )
}