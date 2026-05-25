import { useEffect, useState } from 'react';
import type { GutendexBook } from '../types/types';
import styles from './Original.module.css';

const API_URL = 'https://gutendex.com/books/?languages=es';

function Original() {
  const [books, setBooks] = useState<GutendexBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [randomBook, setRandomBook] = useState<GutendexBook | null>(null);
  const [discoveries, setDiscoveries] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);

  // Cargar todos los libros al montar el componente
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error al cargar los libros');
        const data = await response.json();
        setBooks(data.results);
        // Seleccionar un libro aleatorio inicial
        if (data.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.results.length);
          setRandomBook(data.results[randomIndex]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Obtener un libro aleatorio
  const getRandomBook = () => {
    if (books.length === 0) return;
    setIsRevealing(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * books.length);
      setRandomBook(books[randomIndex]);
      setDiscoveries(prev => prev + 1);
      setIsRevealing(false);
    }, 300);
  };

  // Formatear autores
  const formatAuthors = (authors: GutendexBook['authors']) => {
    if (!authors || authors.length === 0) return 'Desconocido';
    return authors.map(a => a.name).join(', ');
  };

  // Obtener la URL de la portada (si existe formato image/jpeg)
  const getCoverUrl = (formats: GutendexBook['formats']) => {
    return formats['image/jpeg'] || null;
  };

  // Obtener un dato curioso del libro
  const getFunFact = (book: GutendexBook) => {
    const facts = [
      `📥 Descargado ${book.download_count.toLocaleString()} veces`,
      `📖 Tiene ${book.subjects.length} tema(s)`,
      `🌐 Disponible en ${book.languages.join(', ').toUpperCase()}`,
      `✍️ Escrito por ${formatAuthors(book.authors)}`,
      `📚 Forma parte de ${book.bookshelves.length} estanterías`,
    ];
    return facts[Math.floor(Math.random() * facts.length)];
  };

  if (loading) return <div className={styles.statusMessage}>Cargando libros mágicos...</div>;
  if (error) return <div className={styles.statusMessage}>Error: {error}</div>;
  if (!randomBook) return <div className={styles.statusMessage}>No hay libros disponibles</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📖 Máquina de Libros Aleatorios</h1>
      <p className={styles.subtitle}>Descubre un libro al azar</p>

      <div className={styles.randomizerCard}>
        <div className={`${styles.bookReveal} ${isRevealing ? styles.revealing : ''}`}>
          {getCoverUrl(randomBook.formats) && (
            <img
              src={getCoverUrl(randomBook.formats)!}
              alt={randomBook.title}
              className={styles.cover}
            />
          )}
          <div className={styles.bookInfo}>
            <h2 className={styles.bookTitle}>{randomBook.title}</h2>
            <p className={styles.author}>✍️ {formatAuthors(randomBook.authors)}</p>
            <p className={styles.fact}>{getFunFact(randomBook)}</p>
            {randomBook.summaries && randomBook.summaries.length > 0 && (
              <p className={styles.summary}>📌 "{randomBook.summaries[0].substring(0, 150)}..."</p>
            )}
          </div>
        </div>

        <button onClick={getRandomBook} className={styles.randomButton} disabled={isRevealing}>
          {isRevealing ? '✨ Girando...' : '🎲 Descubrir otro libro'}
        </button>

        <div className={styles.counter}>
          📚 Libros descubiertos: <strong>{discoveries}</strong>
        </div>
      </div>
    </div>
  );
}

export default Original;
