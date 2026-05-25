import { useEffect, useState } from 'react';
import type { GutendexBook } from '../types/types';
import styles from './Informativa.module.css';

const API_URL = 'https://gutendex.com/books/?languages=es';

function Informativa() {
  const [books, setBooks] = useState<GutendexBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error al obtener libros');
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

  const selectedBook = selectedBookId !== null ? books.find(b => b.id === selectedBookId) : null;

  // Estadísticas generales (solo si hay libros)
  const totalBooks = books.length;
  const totalDownloads = books.reduce((sum, b) => sum + (b.download_count || 0), 0);
  const avgDownloads = totalBooks ? (totalDownloads / totalBooks).toFixed(0) : 0;

  if (loading) return <div className={styles.statusMessage}>Cargando información...</div>;
  if (error) return <div className={styles.statusMessage}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Información de libros</h1>

      {/* Estadísticas generales */}
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{totalBooks}</span>
          <span className={styles.statLabel}>Libros en español</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{totalDownloads.toLocaleString()}</span>
          <span className={styles.statLabel}>Descargas totales</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{avgDownloads}</span>
          <span className={styles.statLabel}>Promedio de descargas</span>
        </div>
      </div>

      {/* Selector de libro */}
      <div className={styles.selectorSection}>
        <label htmlFor="bookSelect" className={styles.selectLabel}>
          Selecciona un libro para ver sus detalles:
        </label>
        <select
          id="bookSelect"
          className={styles.select}
          value={selectedBookId ?? ''}
          onChange={(e) => setSelectedBookId(e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">-- Elige un libro --</option>
          {books.map(book => (
            <option key={book.id} value={book.id}>
              {book.title} - {formatAuthors(book.authors)}
            </option>
          ))}
        </select>
      </div>

      {/* Detalles del libro seleccionado */}
      {selectedBook && (
        <div className={styles.details}>
          <h2 className={styles.bookTitle}>{selectedBook.title}</h2>
          <p><strong>Autores:</strong> {formatAuthors(selectedBook.authors)}</p>
          <p><strong>Idioma:</strong> {selectedBook.languages.join(', ')}</p>
          <p><strong>Temas:</strong> {selectedBook.subjects.length ? selectedBook.subjects.join(', ') : 'No especificados'}</p>
          <p><strong>Descargas:</strong> {selectedBook.download_count.toLocaleString()}</p>
          <p><strong>Resumen:</strong> {selectedBook.summaries && selectedBook.summaries.length ? selectedBook.summaries[0] : 'No disponible'}</p>
          <p><strong>Formatos disponibles:</strong></p>
          <ul className={styles.formatList}>
            {Object.entries(selectedBook.formats).map(([mime, url]) => (
              <li key={mime}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {mime.split('/').pop() || mime}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Informativa;