import { Link } from "react-router-dom";
import logo from "../assets/mineworld-logo.png";

function Navbar() {
  return (
    <nav
      style={{
        background: "#071226",
        color: "white",
        padding: "18px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <img
          src={logo}
          alt="Mineworld Logo"
          style={{
            height: "54px",
            width: "auto",
            objectFit: "contain",
          }}
        />

        <div>
          <h2 style={{ margin: 0, fontSize: "28px" }}>Mineworld Production</h2>
          <p style={{ margin: 0, fontSize: "12px", color: "#cfcfcf" }}>
            Video Editing & Digital Growth Agency
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/about" style={{ color: "white", textDecoration: "none" }}>
          About
        </Link>
        <Link to="/services" style={{ color: "white", textDecoration: "none" }}>
          Services
        </Link>
        <Link to="/contact" style={{ color: "white", textDecoration: "none" }}>
          Contact
        </Link>

        <Link
          to="/contact"
          style={{
            background: "#c9a25d",
            color: "#071226",
            textDecoration: "none",
            padding: "12px 18px",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          Start Project
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;