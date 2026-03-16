function Services() {
  return (
    <section
      style={{
        padding: "100px 20px",
        textAlign: "center",
        background: "#f8f8f8",
      }}
    >
      <h2 style={{ fontSize: "42px", marginBottom: "20px", color: "#111111" }}>
        Our Core Services
      </h2>

      <p
        style={{
          maxWidth: "820px",
          margin: "0 auto 50px",
          fontSize: "18px",
          lineHeight: "1.7",
          color: "#444444",
        }}
      >
        We focus on premium editing, digital growth support, content creation,
        and studio-powered media execution for modern brands.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "30px",
            width: "280px",
            borderRadius: "12px",
            boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
          }}
        >
          <h3 style={{ marginBottom: "12px", fontSize: "26px" }}>Video Editing</h3>
          <p style={{ color: "#444444", lineHeight: "1.7" }}>
            Reels, YouTube videos, podcast editing, ad creatives, and premium post-production.
          </p>
        </div>

        <div
          style={{
            background: "white",
            padding: "30px",
            width: "280px",
            borderRadius: "12px",
            boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
          }}
        >
          <h3 style={{ marginBottom: "12px", fontSize: "26px" }}>Digital Marketing</h3>
          <p style={{ color: "#444444", lineHeight: "1.7" }}>
            Content strategy, ad communication, growth support, and digital brand positioning.
          </p>
        </div>

        <div
          style={{
            background: "white",
            padding: "30px",
            width: "280px",
            borderRadius: "12px",
            boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
          }}
        >
          <h3 style={{ marginBottom: "12px", fontSize: "26px" }}>Indoor Studio Support</h3>
          <p style={{ color: "#444444", lineHeight: "1.7" }}>
            Podcast shoots, talking-head videos, creator content, and studio-based recording support.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Services;