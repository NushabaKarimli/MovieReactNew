import { useState } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../firebase";

const Header = () => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Axtarış:", search);

    // sonra navigate edəcəyik
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
        background: "#111",
      }}
    >
      <Link to="/">
        <h2>MovieApp</h2>
      </Link>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search movie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">
          Search
        </button>
      </form>

      <nav>
        <Link to="/">Home</Link>{" "}
        <Link to="/login">Login</Link>{" "}
        <Link to="/register">Register</Link>
      </nav>
      
    </header>
  );
};

export default Header;