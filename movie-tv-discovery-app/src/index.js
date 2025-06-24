// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { WatchlistProvider } from "./context/WatchlistContext"; // ✅ import the provider
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WatchlistProvider> {/* ✅ Wrap the entire app */}
      <App />
    </WatchlistProvider>
  </React.StrictMode>
);
