import { useState } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../firebase";

const Header = ({ setSearchQuery }) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mərkəzi state-i istifadəçinin yazdığı sözlə yeniləyirik
    setSearchQuery(search.trim()); 
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
        background: "#111",
        alignItems: "center"
      }}
    >
      <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
        <h2>MovieApp</h2>
      </Link>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search movie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "5px", borderRadius: "4px", border: "none" }}
        />

        <button type="submit" style={{ padding: "5px 10px", marginLeft: "5px", cursor: "pointer" }}>
          Search
        </button>
      </form>

      <nav>
        <Link to="/" style={{ color: "#fff", marginRight: "10px" }}>Home</Link>
        <Link to="/login" style={{ color: "#fff", marginRight: "10px" }}>Login</Link>
        <Link to="/register" style={{ color: "#fff" }}>Register</Link>
      </nav>
    </header>
  );
};

export default Header;