import { useEffect, useState } from "react";
import { getMovies, getMovieVideos } from "../services/api";
import MovieTrailer from "../src/components/MovieTrailer";
import MovieList from "../src/components/MovieList";

// 1. searchQuery propunu qəbul edirik
const Home = ({ searchQuery }) => {
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

  // 2. JavaScript Filter Məntiqi:
  // Əgər axtarış sözü varsa, filmlərin adını (title) yoxlayır və uyğun olanları seçir.
  // Əgər axtarış sözü boşdursa, API-dən gələn bütün filmləri (movies) olduğu kimi saxlayır.
  const filteredMovies = movies.filter((movie) => {
    if (!searchQuery) return true; // Axtarış yoxdursa, hamısını göstər
    return movie.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      {/* Əgər nəsə axtarılıbsa, ekranda kiçik bir başlıq göstərək */}
      {searchQuery && (
        <h3 style={{ textAlign: "center", color: "#fff", marginTop: "20px" }}>
          "{searchQuery}" üçün axtarış nəticələri:
        </h3>
      )}

      <h1 style={{ textAlign: "center" }}>Movies</h1>

      {/* 3. Bütün movies-i yox, süzülmüş filteredMovies siyahısını ötürürük */}
      <MovieList
        movies={filteredMovies} 
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