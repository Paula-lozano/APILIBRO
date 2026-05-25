// En home tengo que agregar un boton para agregar a favoritos y en la pestaña favoritos es lo que se debe mostrar cuando se agrega a favoritos
import { useFavorites } from '../context/FavoritesContext';
import styles from './Favoritos.module.css';

function Favoritos() {
  const { favorites, removeFavorite } = useFavorites();

  const formatAuthors = (authors: { name: string }[]) => {
    if (!authors || authors.length === 0) return 'Desconocido';
    return authors.map(a => a.name).join(', ');
  };

  if (favorites.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Mis Favoritos</h1>
        <div className={styles.emptyMessage}>No tienes libros favoritos aún.</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mis Favoritos</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {favorites.map(book => (
            <tr key={book.id}>
              <td className={styles.titleCell}>{book.title}</td>
              <td className={styles.authorCell}>{formatAuthors(book.authors)}</td>
              <td className={styles.actionCell}>
                <button
                  className={styles.removeButton}
                  onClick={() => removeFavorite(book.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Favoritos;