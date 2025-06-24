import { createContext, useEffect, useState } from "react";

export const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (item) => {
    if (!watchlist.find((w) => w.id === item.id && w.type === item.type)) {
      setWatchlist([...watchlist, item]);
    }
  };

  const removeFromWatchlist = (id, type) => {
    setWatchlist(watchlist.filter((item) => item.id !== id || item.type !== type));
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};
