import { createContext, useState, useContext, useEffect } from 'react';

const MovieContext = createContext();

export function useWatchlist() {
    const context = useContext(MovieContext);
    if (!context) {
        throw new Error('useWatchlist must be used within MovieProvider');
    }
    return context;
};

export function MovieProvider({ children }) {
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = (movie) => {
    if (!watchlist.some(m => m.id === movie.id)) {
      setCookList(prev => [...prev, movie]);
    }
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist(prev => prev.filter(movie => movie.id !== movieId));
  };

  const isInWatchlist = (movieId) => {
    return watchlist.some(movie => movie.id === movieId);
  };

  const value = {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
}