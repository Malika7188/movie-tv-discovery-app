import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Navbar from "./components/Navbar";

// Search and detail pages
import Search from "./pages/Search";
import SearchMovies from "./pages/SearchMovies";
import SearchTV from "./pages/SearchTV";
import SearchMusic from "./pages/SearchMusic";
import MovieDetails from "./pages/MovieDetails";
import TVDetails from "./pages/TVDetails";
import MusicDetails from "./pages/MusicDetails";
import Trending from "./pages/Trending";
import Watchlist from "./pages/Watchlist";

// (Optional) import when ready
// import Trending from "./pages/Trending";
// import Watchlist from "./pages/Watchlist";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<Home />} />

        {/* Combined media details */}
        <Route path="/details/:id" element={<Details />} />

        {/* Category search */}
        <Route path="/search" element={<Search />} />
        <Route path="/search/movies" element={<SearchMovies />} />
        <Route path="/search/tv" element={<SearchTV />} />
        <Route path="/search/music" element={<SearchMusic />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/watchlist" element={<Watchlist />} />

        {/* Individual details */}
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/tv/:id" element={<TVDetails />} />
        <Route path="/music/:id" element={<MusicDetails />} />

        {/* Future features (uncomment when pages are built) */}
        {/* <Route path="/trending" element={<Trending />} /> */}
        {/* <Route path="/watchlist" element={<Watchlist />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
