import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Watchlist from './pages/Watchlist';
import { MovieProvider } from './contexts/MovieContent';
import './App.css';
import { searchMovies } from './services/movieService';

function App() {
  const [searchResults, setSearchResults] = useState(null);

  const Search = async (query) => {
    const results = await searchMovies(query);
    setSearchResults(results);
  };

  return (
    <MovieProvider>
      <Router>
        <div className="app">
          <Header onSearch={Search}/>
          <Routes>
            <Route path="/" element={<Home searchResults={searchResults}/>} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </div>
      </Router>
    </MovieProvider>
  );
};

export default App;