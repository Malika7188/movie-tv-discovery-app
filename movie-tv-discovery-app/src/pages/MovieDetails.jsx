import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MusicDetails.css"; // You can rename this later to `Details.css`
import { WatchlistContext } from "../context/WatchlistContext";

const API_KEY = process.env.REACT_APP_TMDB_KEY;

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  // ✅ Watchlist integration
  const { addToWatchlist, removeFromWatchlist, watchlist } = useContext(WatchlistContext);
  const isInWatchlist = watchlist.some(
    (item) => item.id === parseInt(id) && item.type === "movie"
  );

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
        );
        setMovie(res.data);

        // Look for official trailer on YouTube
        const trailer = res.data.videos.results.find(
          (vid) =>
            vid.type === "Trailer" &&
            vid.site === "YouTube" &&
            vid.official === true
        );
        setTrailerKey(trailer?.key || null);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie)
    return <p style={{ padding: "2rem", color: "white" }}>Loading movie...</p>;

  return (
    <div className="music-details-container">
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
      />
      <h2>{movie.title}</h2>
      <p><strong>Release:</strong> {movie.release_date}</p>
      <p><strong>Genres:</strong> {movie.genres?.map(g => g.name).join(", ")}</p>
      <p><strong>Overview:</strong> {movie.overview}</p>
      <p><strong>Rating:</strong> {movie.vote_average}</p>

      {/* ✅ Watchlist button */}
      <button
        onClick={() => {
          isInWatchlist
            ? removeFromWatchlist(movie.id, "movie")
            : addToWatchlist({
                id: movie.id,
                title: movie.title,
                poster: movie.poster_path,
                type: "movie",
              });
        }}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: isInWatchlist ? "#d32f2f" : "#2196f3",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
      </button>

      {/* ✅ Trailer */}
      {trailerKey && (
        <div style={{ marginTop: "2rem" }}>
          <h3>🎬 Watch Trailer</h3>
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Movie Trailer"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
