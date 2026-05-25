import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/favoritos">Favoritos</Link></li>
        <li><Link to="/original">Original</Link></li>
        <li><Link to="/informativa">Informativa</Link></li>
        <li><Link to="/usuario">Usuario</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;