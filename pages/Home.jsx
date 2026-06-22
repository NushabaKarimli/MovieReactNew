import MovieList from "../src/components/MovieList";
import MovieTrailer from "../src/components/MovieTrailer";
import { useMovies } from "../src/hooks/useMovies";

// searchQuery propunu yenə qəbul edirik
const Home = ({ searchQuery }) => {
  
  // 2. BÜTÜN KÖHNƏ STATE VƏ EFFECT-LƏRİ SİLDİK! 
  // API sorğularını, yüklənməni və trailer state-lərini birbaşa hook-dan çəkirik:
  const { movies, trailerKey, isLoading, handleTrailer, closeTrailer } = useMovies();

  // 3. JavaScript Filter Məntiqi eynilə qalır, amma hook-dan gələn 'movies' üzərindən süzür:
  const filteredMovies = movies.filter((movie) => {
    if (!searchQuery) return true; // Axtarış yoxdursa, hamısını göstər
    return movie.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (isLoading) {
    return <div style={{ color: "#fff", textAlign: "center", marginTop: "50px" }}>Filmlər yüklənir...</div>;
  }

  return (
    <div>
      {searchQuery && (
        <h3 style={{ textAlign: "center", color: "#fff", marginTop: "20px" }}>
          "{searchQuery}" üçün axtarış nəticələri:
        </h3>
      )}

      <h1 style={{ textAlign: "center", color: "#fff" }}>Movies</h1>

      <MovieList
        movies={filteredMovies} 
        onTrailerClick={handleTrailer}
      />

      <MovieTrailer
        trailerKey={trailerKey}
        onClose={closeTrailer}
      />
    </div>
  );
};

export default Home;