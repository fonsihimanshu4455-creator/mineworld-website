import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Contact() {
  return (
    <>
      <Navbar />
      <section
        style={{
          minHeight: "80vh",
          padding: "120px 20px",
          textAlign: "center",
          background: "#ffffff",
          color: "#111111",
        }}
      >
        <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
          Contact Us
        </h1>

        <p style={{ marginBottom: "40px", fontSize: "20px" }}>
          Let’s build something powerful for your brand.
        </p>

        <form
          style={{
            maxWidth: "500px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <input
            placeholder="Your Name"
            style={{ padding: "14px", border: "1px solid #ccc", borderRadius: "8px" }}
          />
          <input
            placeholder="Your Email"
            style={{ padding: "14px", border: "1px solid #ccc", borderRadius: "8px" }}
          />
          <textarea
            placeholder="Tell us about your project"
            rows="5"
            style={{ padding: "14px", border: "1px solid #ccc", borderRadius: "8px" }}
          ></textarea>

          <button
            style={{
              padding: "12px",
              background: "#c9a25d",
              border: "none",
              cursor: "pointer",
              borderRadius: "8px",
            }}
          >
            Send Message
          </button>
        </form>
      </section>
      <Footer />
    </>
  );
}

export default Contact;