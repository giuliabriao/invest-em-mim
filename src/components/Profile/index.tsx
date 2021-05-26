import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './styles.module.scss';
import { IoMdArrowDropdown } from 'react-icons/io';

export function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <button> <IoMdArrowDropdown/></button>
      <p>{user.firstName}</p>
      <img className={styles.avatar} src={user.avatar} alt="" />
    </div>
  )
}