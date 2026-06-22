import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Yoxlanış bitənə qədər gözlədirik
  if (loading) return <div style={{ color: "#fff", textAlign: "center", marginTop: "50px" }}>Yüklənir...</div>;

  // Giriş edilməyibsə, birbaşa login səhifəsinə atır
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  
  return children;
};

export default ProtectedRoute;