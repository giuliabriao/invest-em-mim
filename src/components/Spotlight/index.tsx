import styles from "./styles.module.scss";

export function Spotlight() {
  const pro = 67;
  return (
    <div className={styles.container}>
      <img src="./img/causa.jpeg" alt="" />
      <header>
        <p>Projeto Social Brasil</p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.{" "}
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
    </div>
  );
}
