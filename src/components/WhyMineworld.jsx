function WhyMineworld() {
  return (
    <section
      style={{
        padding: "100px 20px",
        background: "#f4f4f4",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontSize: "42px", marginBottom: "20px", color: "#111111" }}>
        Why Mineworld
      </h2>

      <p
        style={{
          maxWidth: "850px",
          margin: "0 auto 50px",
          fontSize: "18px",
          lineHeight: "1.8",
          color: "#444444",
        }}
      >
        We do not just edit videos. We build content systems that make brands
        look sharper, stronger, and more valuable online.
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
            width: "260px",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
          }}
        >
          <h3 style={{ marginBottom: "12px" }}>Fast Execution</h3>
          <p>Quick delivery for brands that need speed without cheap-looking output.</p>
        </div>

        <div
          style={{
            background: "white",
            width: "260px",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
          }}
        >
          <h3 style={{ marginBottom: "12px" }}>Premium Editing</h3>
          <p>Modern cuts, hooks, pacing, subtitles, and visuals that feel current.</p>
        </div>

        <div
          style={{
            background: "white",
            width: "260px",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
          }}
        >
          <h3 style={{ marginBottom: "12px" }}>Growth Thinking</h3>
          <p>Content is planned and edited to support brand growth, not just views.</p>
        </div>
      </div>
    </section>
  );
}

export default WhyMineworld;