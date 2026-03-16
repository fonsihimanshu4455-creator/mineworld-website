import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ServicesPage() {
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
        <h1 style={{ fontSize: "48px", marginBottom: "40px" }}>
          Our Services
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              background: "#f5f5f5",
              padding: "30px",
              width: "280px",
              borderRadius: "12px",
            }}
          >
            <h3>Video Editing</h3>
            <p>Reels, YouTube videos, podcast editing and ads.</p>
          </div>

          <div
            style={{
              background: "#f5f5f5",
              padding: "30px",
              width: "280px",
              borderRadius: "12px",
            }}
          >
            <h3>Digital Marketing</h3>
            <p>Content strategy, ads and brand growth.</p>
          </div>

          <div
            style={{
              background: "#f5f5f5",
              padding: "30px",
              width: "280px",
              borderRadius: "12px",
            }}
          >
            <h3>Studio Production</h3>
            <p>Indoor podcast shoots and content creation.</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ServicesPage;