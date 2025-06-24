import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import { searchMoviesAndTV } from "../api/tmdb";
import { Link } from "react-router-dom";

const Home = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    const data = await searchMoviesAndTV(query);
    setResults(data);
    setLoading(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4 font-bold text-center">
        🎬 Discover Movies & TV Shows
      </h1>
      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <p className="mt-4 text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {results.map((item) => (
            <Link
              key={item.id}
              to={`/details/${item.id}`}
              className="border rounded p-2 hover:bg-gray-100 transition"
            >
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={item.title || item.name}
                className="w-full h-auto"
              />
              <h2 className="text-sm font-semibold mt-2 text-center">
                {item.title || item.name}
              </h2>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
