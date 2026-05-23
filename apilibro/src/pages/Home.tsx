import { useEffect, useState } from 'react';
import type { GutendexBook } from '../types/types';
import styles from './Home.module.css';

const API_URL = 'https://gutendex.com/books/?languages=es';

function Home() {
  const [books, setBooks] = useState<GutendexBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Error al obtener los libros');
        }
        const data = await response.json();
        setBooks(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const formatAuthors = (authors: GutendexBook['authors']) => {
    if (!authors || authors.length === 0) return 'Desconocido';
    return authors.map(a => a.name).join(', ');
  };

  if (loading) {
    return <div className={styles.statusMessage}>Cargando libros...</div>;
  }

  if (error) {
    return <div className={styles.statusMessage}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Libros en Espanol</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Autor</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 ? (
            <tr>
              <td colSpan={2} className={styles.emptyMessage}>
                No se encontraron libros.
              </td>
            </tr>
          ) : (
            books.map(book => (
              <tr key={book.id}>
                <td className={styles.titleCell}>{book.title}</td>
                <td className={styles.authorCell}>{formatAuthors(book.authors)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Home;