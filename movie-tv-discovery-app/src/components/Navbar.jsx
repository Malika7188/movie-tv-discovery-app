// src/components/Navbar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">🎬 Discover</div>
      <ul className="nav-links">
        <li>
          <NavLink to="/" exact="true" activeclassname="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/search" activeclassname="active">
            Search
          </NavLink>
        </li>
        <li>
          <NavLink to="/trending" activeclassname="active">
            Trending
          </NavLink>
        </li>
        <li>
          <NavLink to="/watchlist" activeclassname="active">
            Watchlist
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
