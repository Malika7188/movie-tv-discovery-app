import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import { searchAll } from "../api/searchAll";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_KEY;

const Home = () => {
  const [popular, setPopular] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  // Fetch popular movies on mount
  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`
        );
        setPopular(res.data.results);
      } catch (error) {
        console.error("Failed to load popular movies:", error);
      }
    };

    fetchPopular();
  }, []);

  // Debounced Quick Search
  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.length > 2) {
        searchAll(query).then((res) => {
          const combined = [
            ...res.movies.map((item) => ({ ...item, type: "movie" })),
            ...res.tv.map((item) => ({ ...item, type: "tv" })),
            ...res.music.map((item) => ({ ...item, type: "music" })),
          ];
          setResults(combined);
        });
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="home-container">
      <h1>🎬 Explore</h1>

      {/* 🔍 Quick Search Input */}
      <div style={{ padding: "1rem" }}>
        <input
          type="text"
          placeholder="Quick search movie, tv show, or music..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "23%",
            padding: "0.25rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
        />
      </div>

      {/* 🔎 Display Quick Search Results */}
      {results.length > 0 && (
        <div
          style={{
            padding: "1rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          {results.map((item) => (
            <div
              key={item.id || item.trackId}
              onClick={() => {
                if (item.type === "movie") {
                  navigate(`/movie/${item.id}`);
                } else if (item.type === "tv") {
                  navigate(`/tv/${item.id}`);
                } else {
                  navigate(`/music/${item.trackId}`);
                }
              }}
              style={{
                cursor: "pointer",
                width: "150px",
                background: "#222",
                color: "white",
                padding: "10px",
                borderRadius: "6px",
                textAlign: "center",
              }}
            >
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                    : item.artworkUrl100
                }
                alt={item.title || item.trackName}
                style={{ width: "100%", borderRadius: "4px" }}
              />
              <p style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
                {item.title || item.name || item.trackName}
              </p>
              <small>{item.type}</small>
            </div>
          ))}
        </div>
      )}

      {/* 🔥 Popular Movies Section */}
      <h2>🔥 Popular Movies</h2>
      <div className="movie-grid">
        {popular.map((movie) => (
          <Link to={`/details/${movie.id}`} key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
