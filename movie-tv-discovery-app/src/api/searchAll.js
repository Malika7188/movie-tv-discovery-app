import axios from "axios";

const TMDB_KEY = process.env.REACT_APP_TMDB_KEY;

export const searchAll = async (query) => {
  try {
    const [movieRes, tvRes, musicRes] = await Promise.all([
      axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: { api_key: TMDB_KEY, query },
      }),
      axios.get(`https://api.themoviedb.org/3/search/tv`, {
        params: { api_key: TMDB_KEY, query },
      }),
      axios.get(`https://itunes.apple.com/search`, {
        params: { term: query, media: "music", limit: 5 },
      }),
    ]);

    return {
      movies: movieRes.data.results || [],
      tv: tvRes.data.results || [],
      music: musicRes.data.results || [],
    };
  } catch (error) {
    console.error("Search error:", error);
    return { movies: [], tv: [], music: [] };
  }
};
