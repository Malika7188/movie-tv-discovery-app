import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MusicDetails.css";

const API_KEY = process.env.REACT_APP_TMDB_KEY;

const TVDetails = () => {
  const { id } = useParams();
  const [tv, setTv] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`)
      .then((res) => setTv(res.data))
      .catch((err) => console.error("TV fetch error:", err));
  }, [id]);

  if (!tv) return <p style={{ padding: "2rem", color: "white" }}>Loading TV show...</p>;

  return (
    <div className="music-details-container">
      <img src={`https://image.tmdb.org/t/p/w300${tv.poster_path}`} alt={tv.name} />
      <h2>{tv.name}</h2>
      <p><strong>First Air Date:</strong> {tv.first_air_date}</p>
      <p><strong>Genres:</strong> {tv.genres?.map(g => g.name).join(", ")}</p>
      <p><strong>Overview:</strong> {tv.overview}</p>
      <p><strong>Rating:</strong> {tv.vote_average}</p>
    </div>
  );
};

export default TVDetails;
