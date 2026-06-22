import { useState, useEffect } from "react";
import { getMovies, getMovieVideos } from "../../services/api";

export const useMovies = () => {
  // 1. Dövlətlər (State-lər)
  const [movies, setMovies] = useState([]); // API-dən gələn filmlərin siyahısı
  const [trailerKey, setTrailerKey] = useState(""); // Aktiv açılan trailerin YouTube ID-si
  const [isLoading, setIsLoading] = useState(true); // Yüklənmə statusu

  // 2. Səhifə ilk dəfə render olunanda filmləri avtomatik yükləyirik
  useEffect(() => {
    const loadMovies = async () => {
      try {
        setIsLoading(true); // Yüklənməni başladırıq
        const data = await getMovies(); // api.js-dəki funksiyanı çağırırıq
        setMovies(data); // Gələn filmləri state-ə yazırıq
      } catch (error) {
        console.error("Filmlər yüklənərkən xəta baş verdi:", error);
      } finally {
        setIsLoading(false); // Xəta olsa da, uğurlu olsa da loading-i söndürürük
      }
    };

    loadMovies();
  }, []); // Boş massiv: Sayt ilk dəfə açılanda cəmi 1 dəfə işləsin

  // 3. Trailer düyməsinə klikləyəndə işləyən funksiya
  const handleTrailer = async (movieId) => {
    try {
      const videos = await getMovieVideos(movieId); // Filmin videolarını API-dan çəkirik
      // Videoların içindən tipi "Trailer" olan rəsmi videonu tapırıq:
      const trailer = videos.find((v) => v.type === "Trailer");

      if (trailer) {
        setTrailerKey(trailer.key); // Tapılan trailerin YouTube açarını (key) state-ə qoyuruq
      } else {
        alert("Bu film üçün rəsmi trailer tapılmadı!");
      }
    } catch (error) {
      console.error("Trailer tapılarkən xəta:", error);
    }
  };

  // 4. Modalı (Trailer pəncərəsini) bağlamaq funksiyası
  const closeTrailer = () => {
    setTrailerKey(""); // Açarı boşaldırıq ki, video pəncərəsi qapansın
  };

  // 5. BÜTÜN NEMƏTLƏRİ GERİ QAYTARIRIQ (Return)
  // Komponentlərin (məsələn Home.jsx) bu məlumatları istifadə edə bilməsi üçün obyekt şəklində ötürürük:
  return {
    movies,
    trailerKey,
    isLoading,
    handleTrailer,
    closeTrailer
  };
};