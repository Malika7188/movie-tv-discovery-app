import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SearchResults.css";

const Trending = () => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTVShows] = useState([]);
  const [music, setMusic] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        // 🔥 Trending Movies
        const movieRes = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_TMDB_KEY}`
        );
        setMovies(movieRes.data.results);

        // 📺 Trending TV
        const tvRes = await axios.get(
          `https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.REACT_APP_TMDB_KEY}`
        );
        setTVShows(tvRes.data.results);

        // 🎧 Trending Music (using iTunes API)
        const musicRes = await axios.get(
          `https://itunes.apple.com/us/rss/topsongs/limit=10/json`
        );
        setMusic(musicRes.data.feed.entry);
      } catch (error) {
        console.error("Failed to fetch trending content:", error);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className="search-results-container">
      <h1>🔥 Trending This Week</h1>

      <section>
        <h2>🎬 Movies</h2>
        <div className="results-grid">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="result-card"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>📺 TV Shows</h2>
        <div className="results-grid">
          {tvShows.map((tv) => (
            <div
              key={tv.id}
              className="result-card"
              onClick={() => navigate(`/tv/${tv.id}`)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${tv.poster_path}`}
                alt={tv.name}
              />
              <h3>{tv.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>🎧 Music</h2>
        <div className="results-grid">
          {music.map((track, index) => (
            <div
              key={index}
              className="result-card"
              onClick={() => navigate(`/music/${track.id?.attributes?.["im:id"]}`)}
            >
              <img
                src={track["im:image"]?.[2]?.label}
                alt={track["im:name"].label}
              />
              <h3>{track["im:name"].label}</h3>
              <p>{track["im:artist"].label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Trending;
