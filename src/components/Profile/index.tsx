import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './styles.module.scss';
import { IoMdArrowDropdown } from 'react-icons/io';
import Link from 'next/link';
import { signOut } from '../../contexts/AuthContext';


export function Profile() {
  const { user } = useContext(AuthContext);
  
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className={styles.container}>
      <button
        onClick={() =>setModalOpen(!modalOpen)}
      > <IoMdArrowDropdown/>
      </button>
      <p>{user.firstName}</p>
      <img className={styles.avatar} src={user.avatar} alt="" />
      {modalOpen && 
      <div className={styles.navigation}>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/dashboard">
              <a>Dashboard</a>
            </Link>
          </li>
          <li>
            <Link href="/projects">
              <a>Projetos</a>
            </Link>
          </li>
          <li onClick={() => signOut()}>
            <button> Sair</button>
          </li>
        </ul>
      </div>}
    </div>

  )
}