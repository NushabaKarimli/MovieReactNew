import MovieCard from "./MovieCard";

const MovieList = ({ movies, onTrailerClick }) => {
  return (
    <div style={styles.container}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onTrailerClick={onTrailerClick}
        />
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
};

export default MovieList;