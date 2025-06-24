import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo"> 🍿StreamLika </h1> 
      {/* FilmFlix */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/trending">Trending</Link></li>
        <li><Link to="/watchlist">Watchlist</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
