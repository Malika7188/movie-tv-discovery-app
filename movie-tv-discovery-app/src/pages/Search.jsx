import React from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

const Search = () => {
  const navigate = useNavigate();

  return (
    <div className="search-container">
      <h1>🔍 What do you want to explore?</h1>
      <div className="search-options">
        <div className="search-card" onClick={() => navigate("/search/movies")}>
          🎬 Movies
        </div>
        <div className="search-card" onClick={() => navigate("/search/tv")}>
          📺 TV Shows
        </div>
        <div className="search-card" onClick={() => navigate("/search/music")}>
          🎵 Music
        </div>
      </div>
    </div>
  );
};

export default Search;
