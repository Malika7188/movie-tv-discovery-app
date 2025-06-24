import axios from "axios";

const OMDB_API_KEY = process.env.REACT_APP_OMDB_KEY;

export const fetchOMDBDetails = async (imdbID) => {
  try {
    const res = await axios.get("https://www.omdbapi.com/", {
      params: {
        apikey: OMDB_API_KEY,
        i: imdbID,
      },
    });
    return res.data;
  } catch (err) {
    console.error("OMDB Fetch Error:", err);
    return null;
  }
};
