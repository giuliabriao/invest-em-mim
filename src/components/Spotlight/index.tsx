import styles from "./styles.module.scss";

type Spotlight = {
  image: string;
  title: string;
  description: string
  goal: number;
  balance: number;
  category: string;
}


export function Spotlight(props:Spotlight) {
  const progressGoal = (props.balance * 100) / props.goal;

  return (
    <div className={styles.container}>
      <img src={props.image} alt="" />
      <header>
        <p>{props.title}</p>
        <p>{props.description}</p>
      </header>
      <div>
        <div className={styles.goal}>
          <p>{props.category}</p>
          <span>R$ {props.goal}</span>
        </div>
        <div className={styles.progress}>
          <div
            style={{ width: `${progressGoal}%` }}
            className={styles.mount}
          ></div>
        </div>
      </div>
    </div>
  );
}
