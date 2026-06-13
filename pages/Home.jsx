import { useEffect, useState } from "react";
import { getMovies, getMovieVideos } from "../services/api";
import MovieTrailer from "../src/components/MovieTrailer";
import MovieList from "../src/components/MovieList";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [trailerKey, setTrailerKey] = useState("");

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    const data = await getMovies();
    setMovies(data);
  };

  const handleTrailer = async (movieId) => {
    const videos = await getMovieVideos(movieId);

    const trailer = videos.find((v) => v.type === "Trailer");

    if (trailer) {
      setTrailerKey(trailer.key);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Movies</h1>

      <MovieList
        movies={movies}
        onTrailerClick={handleTrailer}
      />

      <MovieTrailer
        trailerKey={trailerKey}
        onClose={() => setTrailerKey("")}
      />
    </div>
  );
};

export default Home;