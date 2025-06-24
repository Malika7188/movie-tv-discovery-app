// // src/components/Card.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./Card.css";

// const Card = ({ item, type }) => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     if (type === "movie") navigate(`/movie/${item.id}`);
//     else if (type === "tv") navigate(`/tv/${item.id}`);
//     else if (type === "music") navigate(`/music/${item.id}`);
//   };

//   return (
//     <div className="card" onClick={handleClick}>
//       <img
//         src={
//           item.poster_path
//             ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
//             : item.artworkUrl100
//         }
//         alt={item.title || item.name || item.trackName}
//       />
//       <div className="card-title">{item.title || item.name || item.trackName}</div>
//       <span className="card-type">{type.toUpperCase()}</span>
//     </div>
//   );
// };

// export default Card;
