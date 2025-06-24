import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search for movies or TV shows..."
      value={query}
      onChange={handleChange}
      className="p-2 w-full border rounded"
    />
  );
};

export default SearchBar;
