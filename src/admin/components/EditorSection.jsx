// EditorSection — visual grouping for related editor controls.
// Used inside the per-section editor pages (HeroEditor, FounderEditor,
// etc.) to break a long form into "Background", "Copy", "Colors" etc.

export default function EditorSection({ title, hint, children }) {
  return (
    <section
      style={{
        marginTop: 28,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 12,
          paddingBottom: 8,
          borderBottom: "1px solid rgba(184, 149, 106, 0.18)",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 800,
            color: "#F5F1E8",
            letterSpacing: "-0.2px",
            fontFamily: '"Playfair Display", Georgia, serif',
          }}
        >
          {title}
        </h2>
        {hint ? (
          <span
            style={{
              fontSize: 12,
              color: "rgba(245,241,232,0.5)",
            }}
          >
            {hint}
          </span>
        ) : null}
      </div>
      <div style={{ display: "grid", gap: 14 }}>{children}</div>
    </section>
  );
}
