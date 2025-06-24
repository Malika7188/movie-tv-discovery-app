import React from "react";
import { useLocation } from "react-router-dom";
import "./MusicDetails.css";

const MusicDetails = () => {
  const location = useLocation();
  const track = location.state?.track;

  if (!track) return <p style={{ padding: "2rem", color: "white" }}>No track found.</p>;

  return (
    <div className="music-details-container">
      <img src={track.artworkUrl100.replace("100x100", "300x300")} alt={track.trackName} />
      <h2>{track.trackName}</h2>
      <p><strong>Artist:</strong> {track.artistName}</p>
      <p><strong>Album:</strong> {track.collectionName}</p>
      <p><strong>Genre:</strong> {track.primaryGenreName}</p>
      <p><strong>Track Price:</strong> ${track.trackPrice || "N/A"}</p>
      <audio controls src={track.previewUrl} style={{ marginTop: "1rem" }} />
    </div>
  );
};

export default MusicDetails;
