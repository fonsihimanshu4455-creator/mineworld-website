import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      style={{
        background: "#071226",
        color: "white",
        padding: "140px 20px 120px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "inline-block",
          marginBottom: "18px",
          padding: "8px 14px",
          borderRadius: "999px",
          background: "rgba(201,162,93,0.12)",
          color: "#c9a25d",
          fontSize: "14px",
          fontWeight: "bold",
          letterSpacing: "0.5px",
        }}
      >
        NEW-AGE VIDEO EDITING & DIGITAL GROWTH
      </div>

      <h1
        style={{
          fontSize: "64px",
          lineHeight: "1.08",
          maxWidth: "1050px",
          margin: "0 auto 24px",
          fontWeight: "bold",
        }}
      >
        We Turn Content Into
        <br />
        Brand Growth
      </h1>

      <p
        style={{
          maxWidth: "860px",
          margin: "0 auto 36px",
          fontSize: "22px",
          lineHeight: "1.75",
          color: "#d6d6d6",
        }}
      >
        Mineworld Production helps creators, brands, and businesses grow through
        premium video editing, strategic digital marketing, and studio-powered content support.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <Link
          to="/contact"
          style={{
            background: "#c9a25d",
            color: "#071226",
            padding: "16px 30px",
            borderRadius: "8px",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Start Your Project
        </Link>

        <Link
          to="/services"
          style={{
            border: "1px solid rgba(255,255,255,0.2)",
            color: "white",
            padding: "16px 30px",
            borderRadius: "8px",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Explore Services
        </Link>
      </div>
    </section>
  );
}

export default Hero;