import styles from './styles.module.scss';


export function Footer(){
  return(
    <div className={styles.container}>
      <div className={styles.content}>
      <ul>
        <li>
        <img src="/img/logo.png" alt="" />
        </li>
      </ul>
      <ul>
        <li>VAVEGACAO</li>
        <li>Home</li>
        <li>Pronto para usar</li>
        <li>Integre com nossos produtos</li>
        <li>Ofertas</li>
        <li>O Invest em mim</li>
        <li>Blog</li>
      </ul>
      <ul>
        <li>SUPORTE</li>
        <li>FAQ</li>
        <li>guias de integracao</li>
        <li>Documentacao</li>
        <li>Ofertas</li>
        <li>Boleto DDA</li>
      </ul>
      <ul>
        <li>INVEST EM MIM</li>
        <li>Area do cliente</li>
        <li>Veja nossas vagas</li>
        <li>Termos de uso</li>
        <li>Aviso de cokies</li>
        <li>Aviso de privacidade</li>
        <li>Politica de PLD-CFT</li>
      </ul>
      <ul>
        <li>CONTATO</li>
        <li>Ja sou cliente: 4004-1330</li>
        <li>Quero ser cliente: 3004-9709</li>
        <li>Av. Embaixador Abelardo Bueno 2510, RJ</li>
      </ul>

      </div>
    </div>
  )
}