import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import styles from './Navbar.module.css';

function Navbar() {
  const { user, logout } = useUser();

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/favoritos">Favoritos</Link></li>
        <li><Link to="/original">Original</Link></li>
        <li><Link to="/informativa">Informativa</Link></li>
        <li><Link to="/usuario">Usuario</Link></li>
      </ul>
      <div className={styles.userInfo}>
        {user ? (
          <>
            <span className={styles.userName}>Hola, {user.name}</span>
            <button onClick={logout} className={styles.logoutBtn}>Cerrar sesión</button>
          </>
        ) : (
          <Link to="/usuario" className={styles.loginLink}>Iniciar sesión</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;