import { Link } from "react-router-dom";

function CTA() {
  return (
    <section
      style={{
        padding: "100px 20px",
        background: "#071226",
        color: "white",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontSize: "42px", marginBottom: "20px" }}>
        Ready to Build a Stronger Brand Presence?
      </h2>

      <p
        style={{
          maxWidth: "820px",
          margin: "0 auto 30px",
          fontSize: "18px",
          lineHeight: "1.7",
          color: "#d6d6d6",
        }}
      >
        From editing and content systems to digital growth support, Mineworld Production
        helps brands look premium and move faster online.
      </p>

      <Link
        to="/contact"
        style={{
          background: "#c9a25d",
          color: "#071226",
          padding: "16px 32px",
          borderRadius: "8px",
          fontWeight: "bold",
          textDecoration: "none",
          display: "inline-block",
        }}
      >
        Book a Project Discussion
      </Link>
    </section>
  );
}

export default CTA;