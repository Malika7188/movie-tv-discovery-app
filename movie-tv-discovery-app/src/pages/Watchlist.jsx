// src/pages/Watchlist.jsx
import React, { useContext } from "react";
import { WatchlistContext } from "../context/WatchlistContext";
import { useNavigate } from "react-router-dom";
import "./Watchlist.css"; // ✅ Import the styles

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useContext(WatchlistContext);
  const navigate = useNavigate();

  return (
    <div className="watchlist-container">
      <h2>📌 Your Watchlist</h2>

      {watchlist.length === 0 ? (
        <p className="empty-text">Your watchlist is empty.</p>
      ) : (
        <div className="watchlist-grid">
          {watchlist.map((item) => (
            <div key={item.id} className="watchlist-item">
              <img
                src={
                  item.poster
                    ? `https://image.tmdb.org/t/p/w200${item.poster}`
                    : item.artworkUrl100
                }
                alt={item.title || item.name || item.trackName}
                onClick={() => {
                  if (item.type === "movie") {
                    navigate(`/movie/${item.id}`);
                  } else if (item.type === "tv") {
                    navigate(`/tv/${item.id}`);
                  } else if (item.type === "music") {
                    navigate(`/music/${item.id}`);
                  }
                }}
              />
              <p>{item.title || item.name || item.trackName}</p>
              <button
                onClick={() => removeFromWatchlist(item.id, item.type)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
