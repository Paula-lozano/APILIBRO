import { createContext, useContext, useState, type ReactNode } from 'react';
import type { GutendexBook } from '../types/types';

interface FavoritesContextType {
  favorites: GutendexBook[];
  addFavorite: (book: GutendexBook) => void;
  removeFavorite: (bookId: number) => void;
  isFavorite: (bookId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<GutendexBook[]>([]);

  const addFavorite = (book: GutendexBook) => {
    setFavorites((prev) => {
      if (prev.some((b) => b.id === book.id)) return prev;
      return [...prev, book];
    });
  };

  const removeFavorite = (bookId: number) => {
    setFavorites((prev) => prev.filter((book) => book.id !== bookId));
  };

  const isFavorite = (bookId: number) => favorites.some((book) => book.id === bookId);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};