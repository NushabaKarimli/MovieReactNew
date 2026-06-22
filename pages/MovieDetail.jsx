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
        setMovie(data);
      } catch (err) {
        console.error("Detail error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  if (loading) return <h2 style={styles.message}>Loading...</h2>;
  if (!movie) return <h2 style={styles.message}>Movie not found</h2>;

  // İlk 10 aktyoru rahat idarə etmək üçün kəsib dəyişənə qoyuruq
  const topActors = movie.credits?.cast?.slice(0, 10) || [];

  return (
    <div style={styles.container}>
      {/* Üst hissə: Başlıq və Əsas Məlumatlar */}
      <h1>{movie.title}</h1>

      <div style={styles.mainContent}>
        <img
          style={styles.image}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        
        <div style={styles.detailsBlock}>
          <p style={styles.text}>{movie.overview}</p>
          <div style={styles.info}>
            <p>⭐ {movie.vote_average?.toFixed(1)}</p>
            <p>📅 {movie.release_date}</p>
            <p>🔥 Popularity: {movie.popularity}</p>
            <p>🎬 Language: {movie.original_language?.toUpperCase()}</p>
          </div>
        </div>
      </div>

      <hr style={styles.divider} />

      {/* Alt hissə: Aktyorlar Bölməsi */}
      <h2>Top Cast (Baş Rol Aktyorları)</h2>
      <div style={styles.actorsGrid}>
        {topActors.length === 0 ? (
          <p>No actor information available.</p>
        ) : (
          topActors.map((actor) => (
            <div key={actor.id} style={styles.actorCard}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={actor.name}
                style={styles.actorImage}
              />
              <h4 style={styles.actorName}>{actor.name}</h4>
              <p style={styles.characterName}>{actor.character}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// CSS-in-JS Stilləri (Dizaynı təmiz və səliqəli etmək üçün yeniləndi)
const styles = {
  container: {
    padding: "30px 20px",
    color: "#fff",
    background: "#111",
    minHeight: "100vh",
  },
  message: {
    color: "#fff",
    textAlign: "center",
    marginTop: "50px"
  },
  mainContent: {
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
    marginTop: "20px",
  },
  detailsBlock: {
    flex: 1,
    minWidth: "300px",
  },
  image: {
    width: 300,
    borderRadius: 10,
    boxShadow: "0px 4px 15px rgba(0,0,0,0.5)"
  },
  text: {
    lineHeight: "24px",
    fontSize: "16px",
  },
  info: {
    marginTop: 20,
    lineHeight: "30px",
    background: "#1c1c1c",
    padding: "15px",
    borderRadius: "8px",
    display: "inline-block",
    minWidth: "200px"
  },
  divider: {
    borderColor: "#333",
    margin: "40px 0 30px 0"
  },
  actorsGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "20px"
  },
  actorCard: {
    width: "140px",
    background: "#1c1c1c",
    padding: "10px",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
  },
  actorImage: {
    width: "100%",
    height: "170px",
    objectFit: "cover",
    borderRadius: "6px"
  },
  actorName: {
    fontSize: "14px",
    margin: "8px 0 4px 0",
    fontWeight: "bold"
  },
  characterName: {
    fontSize: "12px",
    color: "#aaa",
    margin: 0
  }
};

export default MovieDetail;