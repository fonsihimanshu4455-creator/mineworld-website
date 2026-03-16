import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
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
          About Mineworld Production
        </h1>

        <p
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            fontSize: "20px",
            lineHeight: "1.7",
          }}
        >
          Mineworld Production is a new-age video editing and digital growth
          agency helping brands grow through powerful content, studio
          production, and strategic digital marketing.
        </p>
      </section>
      <Footer />
    </>
  );
}

export default About;