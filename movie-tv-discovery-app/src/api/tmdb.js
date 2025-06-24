import axios from "axios";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_KEY;

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export const searchMoviesAndTV = async (query) => {
  try {
    const res = await tmdb.get("search/multi", {
      params: {
        api_key: TMDB_API_KEY,
        query,
      },
    });
    return res.data.results;
  } catch (err) {
    console.error("TMDB Search Error:", err);
    return [];
  }
};
