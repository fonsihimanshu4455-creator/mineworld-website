function Portfolio() {
  return (
    <section
      style={{
        padding: "110px 20px",
        background: "#ffffff",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontSize: "44px",
          marginBottom: "18px",
          color: "#111111",
        }}
      >
        Featured Work
      </h2>

      <p
        style={{
          maxWidth: "820px",
          margin: "0 auto 60px",
          fontSize: "18px",
          lineHeight: "1.7",
          color: "#555555",
        }}
      >
        A glimpse of the kind of content systems, edits, and visuals we create
        for creators and brands.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))",
          gap: "24px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            height: "200px",
            borderRadius: "14px",
            background: "#071226",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Instagram Reels Editing
        </div>

        <div
          style={{
            height: "200px",
            borderRadius: "14px",
            background: "#0d1b34",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Podcast Editing
        </div>

        <div
          style={{
            height: "200px",
            borderRadius: "14px",
            background: "#13264a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Ad Creatives
        </div>

        <div
          style={{
            height: "200px",
            borderRadius: "14px",
            background: "#18305b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Brand Videos
        </div>
      </div>
    </section>
  );
}

export default Portfolio;