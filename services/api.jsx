const API_KEY = "aabfa86ccd75814c6818f9306f351d16";

// 🎬 Populyar filmlər
export const getMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.results;
};

// 🎥 Film trailer / videolar
export const getMovieVideos = async (movieId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.results;
};

// 🎬 Film detail + Aktyorlar (Birlikdə gətirir)
export const getMovieDetail = async (movieId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`
  );
  const data = await response.json();
  return data;
};