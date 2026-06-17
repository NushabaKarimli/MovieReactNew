import { useEffect, useState } from "react";
import Home from "../pages/Home";
import { getMovies } from "../services/api";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const loadMovies = async () => {
      const movies = await getMovies();
      console.log(movies);
    };

    loadMovies();
  }, []);

  return (
    <div>
      <Header setSearchQuery={setSearchQuery}/>
      <AppRoutes searchQuery={searchQuery}/>
    </div>
  );
}

export default App;