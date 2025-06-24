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
  const [heroImageError, setHeroImageError] = useState(false);
  const navigate = useNavigate();

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

  // Get hero movie (first popular movie or fallback)
  const heroMovie = popular.length > 0 ? popular[0] : null;

  // Create background image URL with fallback
  const getHeroBackground = () => {
    if (heroImageError || !heroMovie?.backdrop_path) {
      return "linear-gradient(135deg, #667eea 0%, #764ba2 100%, #2c3e50 100%)";
    }
    return `url(https://image.tmdb.org/t/p/original${heroMovie.backdrop_path})`;
  };

  return (
    <div className="home-page">
      {/* 🔥 Hero Banner - Now Dynamic */}
      <div
        className="hero-banner"
        style={{
          backgroundImage: getHeroBackground(),
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
          color: "white",
          display: "flex",
          alignItems: "center",
          padding: "2rem",
          borderRadius: "12px",
          marginBottom: "2rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Overlay for better text readability */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3))",
            borderRadius: "12px",
          }}
        />
        
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
            {heroMovie?.title || "Welcome to MovieHub"}
          </h1>
          <p style={{ 
            maxWidth: "500px", 
            marginTop: "1rem", 
            fontSize: "1.1rem",
            lineHeight: "1.5"
          }}>
            {heroMovie?.overview || "Discover amazing movies, TV shows, and music all in one place"}
          </p>
          
          {/*  Hero Action Button */}
          {heroMovie && (
            <Link
              to={`/movie/${heroMovie.id}`}
              style={{
                display: "inline-block",
                marginTop: "1.5rem",
                padding: "12px 24px",
                backgroundColor: "#e50914",
                color: "white",
                textDecoration: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#b8070f"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#e50914"}
            >
              ▶ Watch Now
            </Link>
          )}
        </div>

        {/* Hidden image for error detection */}
        {heroMovie?.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
            alt=""
            style={{ display: "none" }}
            onError={() => setHeroImageError(true)}
            onLoad={() => setHeroImageError(false)}
          />
        )}
      </div>

      {/* 🔍 Quick Search */}
      <div className="quick-search" style={{ padding: "1rem" }}>
        <input
          type="text"
          placeholder="Quick search movie, tv show, or music..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "0.75rem",
            borderRadius: "8px",
            border: "1px solid #555",
            backgroundColor: "#222",
            color: "white",
            fontSize: "1rem",
            marginBottom: "1rem",
            outline: "none",
          }}
        />
        
        {results.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
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
                  width: "180px",
                  background: "#1a1a1a",
                  color: "white",
                  padding: "10px",
                  borderRadius: "8px",
                  textAlign: "center",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                      : item.artworkUrl100 || "/placeholder-image.jpg"
                  }
                  alt={item.title || item.trackName}
                  style={{ 
                    width: "100%", 
                    borderRadius: "6px",
                    height: "240px",
                    objectFit: "cover"
                  }}
                  onError={(e) => {
                    e.target.src = "/placeholder-image.jpg";
                  }}
                />
                <p style={{ 
                  marginTop: "0.5rem", 
                  fontSize: "0.95rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}>
                  {item.title || item.name || item.trackName}
                </p>
                <small style={{ 
                  color: "#aaa",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: "0.8rem"
                }}>
                  {item.type}
                </small>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🎬 Popular Movies */}
      <h2 style={{ 
        padding: "0 1rem", 
        color: "white",
        fontSize: "1.8rem",
        marginBottom: "1rem"
      }}>
        🔥 Popular Movies
      </h2>
      
      <div
        className="movie-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        {popular.length === 0 ? (
          // Loading skeleton
          Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              style={{
                background: "#1e1e1e",
                padding: "10px",
                borderRadius: "10px",
                textAlign: "center",
                animation: "pulse 1.5s ease-in-out infinite alternate",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "240px",
                  backgroundColor: "#333",
                  borderRadius: "6px",
                  marginBottom: "0.5rem",
                }}
              />
              <div
                style={{
                  height: "20px",
                  backgroundColor: "#333",
                  borderRadius: "4px",
                }}
              />
            </div>
          ))
        ) : (
          popular.map((movie) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="movie-card"
              style={{
                background: "#1e1e1e",
                padding: "10px",
                borderRadius: "10px",
                textAlign: "center",
                textDecoration: "none",
                color: "white",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-5px)";
                e.target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                style={{
                  width: "100%",
                  height: "240px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  marginBottom: "0.5rem",
                }}
                onError={(e) => {
                  e.target.src = "/placeholder-image.jpg";
                }}
              />
              <h4 style={{
                margin: "0.5rem 0",
                fontSize: "1rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}>
                {movie.title}
              </h4>
              <small style={{ color: "#aaa" }}>
                ⭐ {movie.vote_average?.toFixed(1)}
              </small>
            </Link>
          ))
        )}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 0.6; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Home;