import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import MovieDetail from "../../pages/MovieDetail";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";
import Favorites from "../../pages/Favorites";

const AppRoutes = ({ searchQuery }) => {
  return (
    <Routes>
      <Route path="/" element={<Home searchQuery={searchQuery} />} />

      <Route
        path="/movie/:id"
        element={<MovieDetail />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />
      <Route 
        path="/favorites" 
        element = {
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default AppRoutes;