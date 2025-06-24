import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "./SearchResults.css"; 

const API_KEY = process.env.REACT_APP_TMDB_KEY;

const SearchMovies = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query.trim()) return;

      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
        );
        setResults(res.data.results);
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(() => {
      fetchMovies();
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="search-results-container">
      <h1>🎬 Search Movies</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Type a movie name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading && <p>Loading...</p>}

      <div className="results-grid">
        {results.map((movie) => (
          <div
            className="result-card"
            key={movie.id}
            onClick={() => navigate(`/movie/${movie.id}`)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                  : "https://via.placeholder.com/200x300"
              }
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchMovies;
