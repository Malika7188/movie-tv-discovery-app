import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SearchResults.css";
import { useNavigate } from "react-router-dom";

const SearchMusic = () => {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Debounce timer
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        searchMusic(query);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const searchMusic = async (term) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://itunes.apple.com/search`, {
        params: {
          term,
          media: "music",
          limit: 20,
        },
      });
      setTracks(response.data.results);
    } catch (error) {
      console.error("Error fetching music:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-results-container">
      <h1>🎵 Search for Music</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Start typing a song or artist..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading && <p>Loading tracks...</p>}

      <div className="results-grid">
        {tracks.map((track) => (
          <div
            className="result-card"
            key={track.trackId}
            onClick={() => navigate(`/music/${track.trackId}`, { state: { track } })}
            style={{ cursor: "pointer" }}
          >
            <img src={track.artworkUrl100} alt={track.trackName} />
            <h3>{track.trackName}</h3>
            <p>{track.artistName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchMusic;
