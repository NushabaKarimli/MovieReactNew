import { useEffect } from "react";
import Home from "../pages/Home";
import { getMovies } from "../services/api";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header";

function App() {
  useEffect(() => {
    const loadMovies = async () => {
      const movies = await getMovies();
      console.log(movies);
    };

    loadMovies();
  }, []);

  return (
    <div>
      <Header/>
      <AppRoutes/>
    </div>
  );
}

export default App;