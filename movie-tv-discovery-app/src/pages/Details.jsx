import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { fetchOMDBDetails } from "../api/omdb";
import "./Details.css";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_KEY;

const Details = () => {
  const { id } = useParams();
  const [tmdbData, setTmdbData] = useState(null);
  const [omdbData, setOmdbData] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const tmdbRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=credits`
        );
        setTmdbData(tmdbRes.data);

        const imdbId = tmdbRes.data.imdb_id;
        if (imdbId) {
          const omdb = await fetchOMDBDetails(imdbId);
          setOmdbData(omdb);
        }

        setCast(tmdbRes.data.credits.cast.slice(0, 6)); // top 6 cast
        setLoading(false);
      } catch (error) {
        console.error("Error loading details:", error);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <p style={{ padding: "2rem", color: "white" }}>Loading details...</p>;
  if (!tmdbData) return <p style={{ padding: "2rem", color: "white" }}>Movie/TV not found.</p>;

  return (
    <div className="details-container">
      <div className="header-section">
        <img
          src={`https://image.tmdb.org/t/p/w300${tmdbData.poster_path}`}
          alt={tmdbData.title}
          className="poster"
        />
        <div className="meta-info">
          <h1>{tmdbData.title}</h1>
          <p><strong>Release Date:</strong> {tmdbData.release_date}</p>
          <p><strong>Genres:</strong> {tmdbData.genres.map(g => g.name).join(", ")}</p>
          <p><strong>Runtime:</strong> {tmdbData.runtime} minutes</p>
          <p><strong>Overview:</strong> {tmdbData.overview}</p>
        </div>
      </div>

      {omdbData && (
        <>
          <h2 className="section-title">📊 OMDB Ratings</h2>
          <p><strong>Plot:</strong> {omdbData.Plot}</p>
          <p><strong>IMDB:</strong> {omdbData.imdbRating}</p>
          <p><strong>Rotten Tomatoes:</strong> {omdbData.Ratings?.find(r => r.Source === "Rotten Tomatoes")?.Value || "N/A"}</p>
        </>
      )}

      <h2 className="section-title">🎭 Top Cast</h2>
      <div className="cast-grid">
        {cast.map(actor => (
          <div key={actor.id} className="cast-card">
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                  : "https://via.placeholder.com/150x225?text=No+Image"
              }
              alt={actor.name}
            />
            <p className="cast-name">{actor.name}</p>
            <p className="cast-character">as {actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
