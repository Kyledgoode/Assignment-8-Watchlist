import { useState, useEffect } from 'react';
import { useWatchlist } from '../contexts/MovieContent';

function MovieCard({ movie }) {
  const [isFavorite, setFavorite] = useState(false);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(movie.id);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    const favMovie = favorites.some(fav => fav.id === movie.id);
    setFavorite(favMovie);
  }, [movie.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    if (isFavorite) {
      const favoriteUpdate = favorites.filter(fav => fav.id !== movie.id);
      localStorage.setItem('favoriteMovies', JSON.stringify(favoriteUpdate));
      setFavorite(false);
    } else {
      favorites.push(movie);
      localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
      setFavorite(true)
    }
  };

  const handleWatchlistClick = () => {
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-details">
          <span className="movie-rating">⭐ {movie.vote_average}</span>
          <span className="movie-year">{movie.release_date.substring(0, 4)}</span>
        </div>
        <button className="favorite-button" onClick={toggleFavorite}>
          {isFavorite ? 'Remove from Favorites' : '♡ Add to Favorites'}
          </button>
          <button 
          className={`watchlist-button ${inWatchlist ? 'added' : ''}`}
          onClick={handleWatchlistClick}
        >
          {inWatchlist ? 'Remove from Watchlist' : '+ Add to Watchlist'}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;