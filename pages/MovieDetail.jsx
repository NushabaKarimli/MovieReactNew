import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetail } from "../services/api";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true);

        const data = await getMovieDetail(id);
        console.log("DETAIL DATA:", data);

        setMovie(data);
      } catch (err) {
        console.error("Detail error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  if (loading) {
    return <h2 style={{ color: "#fff" }}>Loading...</h2>;
  }

  if (!movie) {
    return <h2 style={{ color: "#fff" }}>Movie not found</h2>;
  }

  return (
    <div style={styles.container}>
      <h1>{movie.title}</h1>

      <img
        style={styles.image}
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />

      <p style={styles.text}>{movie.overview}</p>

      <div style={styles.info}>
        <p>⭐ {movie.vote_average}</p>
        <p>📅 {movie.release_date}</p>
        <p>🔥 Popularity: {movie.popularity}</p>
        <p>🎬 Language: {movie.original_language}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: 20,
    color: "#fff",
    background: "#111",
    minHeight: "100vh",
  },
  image: {
    width: 300,
    borderRadius: 10,
  },
  text: {
    maxWidth: 600,
    marginTop: 20,
  },
  info: {
    marginTop: 20,
    lineHeight: "25px",
  },
};

export default MovieDetail;