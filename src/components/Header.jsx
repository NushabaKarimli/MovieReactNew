import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { useAuth } from "../hooks/useAuth";

const Header = ({ setSearchQuery }) => {
  const [search, setSearch] = useState("");
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  // 2. Auth sistemindən istifadəçi məlumatını və çıxış funksiyasını götürürük
  const { user, logout, isAuthenticated } = useAuth(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(search.trim()); 
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
        alignItems: "center",
        background: theme === "dark" ? "#111" : "#fff",
        borderBottom: theme === "dark" ? "none" : "1px solid #ccc",
        transition: "background 0.3s ease"
      }}
    >
      <Link to="/" style={{ textDecoration: "none", color: theme === "dark" ? "#fff" : "#111" }}>
        <h2>MovieApp</h2>
      </Link>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search movie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ 
            padding: "5px", 
            borderRadius: "4px", 
            border: theme === "dark" ? "none" : "1px solid #ccc",
            background: theme === "dark" ? "#fff" : "#f0f0f0",
            color: "#000"
          }}
        />
        <button type="submit" style={{ padding: "5px 10px", marginLeft: "5px", cursor: "pointer" }}>
          Search
        </button>
      </form>

      <nav style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <Link to="/" style={{ color: theme === "dark" ? "#fff" : "#111" }}>Home</Link>
        
        {/* 3. BURA BAX: Favorites linki əlavə etdik */}
        <Link to="/favorites" style={{ color: theme === "dark" ? "#fff" : "#111" }}>Favorites</Link>

        {/* 4. DİNAMİK AUTH SEÇİMİ: İstifadəçi giriş edibsə və ya etməyibsə */}
        {isAuthenticated ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Firebase-dən gələn istifadəçinin emaili və ya adı */}
            <span style={{ color: theme === "dark" ? "#fff" : "#111", fontSize: "14px" }}>
              {user?.email}
            </span>
            <button 
              onClick={logout} 
              style={{ padding: "3px 8px", cursor: "pointer", background: "#ff4d4d", color: "#fff", border: "none", borderRadius: "4px" }}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" style={{ color: theme === "dark" ? "#fff" : "#111" }}>Login</Link>
            <Link to="/register" style={{ color: theme === "dark" ? "#fff" : "#111" }}>Register</Link>
          </>
        )}

        <button 
          onClick={toggleTheme} 
          style={{ 
            cursor: "pointer",
            padding: "5px 10px",
            borderRadius: "4px",
            background: theme === "dark" ? "#fff" : "#111",
            color: theme === "dark" ? "#111" : "#fff",
            border: "none"
          }}
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
      </nav>
    </header>
  );
};

export default Header;