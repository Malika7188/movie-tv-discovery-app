import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SearchResults.css";

const API_KEY = process.env.REACT_APP_TMDB_KEY;

const SearchTV = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTV = async () => {
      if (!query.trim()) return;

      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${query}`
        );
        setResults(res.data.results);
      } catch (error) {
        console.error("Error fetching TV shows:", error);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(() => {
      fetchTV();
    }, 500);

    return () => clearTimeout(delay);
  }, [query]); // ✅ No warning now

  return (
    <div className="search-results-container">
      <h1>📺 Search TV Shows</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Start typing a TV show..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading && <p>Loading...</p>}

      <div className="results-grid">
        {results.map((tv) => (
          <div
            className="result-card"
            key={tv.id}
            onClick={() => navigate(`/tv/${tv.id}`)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={
                tv.poster_path
                  ? `https://image.tmdb.org/t/p/w200${tv.poster_path}`
                  : "https://via.placeholder.com/200x300"
              }
              alt={tv.name}
            />
            <h3>{tv.name}</h3>
            <p>{tv.first_air_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchTV;
