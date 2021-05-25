import styles from './styles.module.scss';


export function CategoryIcons({icon}){
  return (
    <div className={styles.container}>
      <img src={`/icons/${icon}.png`} alt={icon} />
      <p>{icon}</p>
    </div>
  )
}