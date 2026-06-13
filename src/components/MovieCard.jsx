import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div style={styles.card} onClick={goToDetail}>
      <img
        style={styles.image}
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
      />

      <h3>{movie.title}</h3>
      <p>⭐ {movie.vote_average}</p>
    </div>
  );
};

const styles = {
  card: {
    width: 200,
    margin: 10,
    background: "#222",
    color: "#fff",
    padding: 10,
    borderRadius: 10,
    cursor: "pointer",
  },
  image: {
    width: "100%",
    borderRadius: 10,
  },
};

export default MovieCard;