// EditorSection — visual grouping for related editor controls.
// Used inside the per-section editor pages (HeroEditor, FounderEditor,
// etc.) to break a long form into "Background", "Copy", "Colors" etc.

export default function EditorSection({ title, hint, children, action }) {
  return (
    <section
      style={{
        marginTop: "var(--admin-space-md, 24px)",
        padding: "var(--admin-space-md, 24px)",
        background: "var(--admin-surface, #FFFFFF)",
        border: "1px solid var(--admin-border, #E8DED1)",
        borderRadius: "var(--admin-radius-md, 16px)",
        boxShadow: "var(--admin-shadow-sm, 0 2px 8px rgba(31,45,77,0.05))",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 16,
          paddingBottom: 12,
          borderBottom: "1px solid var(--admin-border, #E8DED1)",
        }}
      >
        <div style={{ minWidth: 0 }}>
          <h2
            style={{
              margin: 0,
              fontSize: "var(--admin-text-md, 20px)",
              fontWeight: 800,
              color: "var(--admin-text, #151515)",
              letterSpacing: "-0.2px",
              fontFamily:
                'var(--admin-font-serif, "Playfair Display", Georgia, serif)',
            }}
          >
            {title}
          </h2>
          {hint ? (
            <p
              style={{
                margin: "4px 0 0",
                fontSize: "var(--admin-text-xs, 13px)",
                color: "var(--admin-text-muted, #6B5B47)",
                lineHeight: 1.6,
                maxWidth: 640,
              }}
            >
              {hint}
            </p>
          ) : null}
        </div>
        {action}
      </div>
      <div style={{ display: "grid", gap: 16 }}>{children}</div>
    </section>
  );
}
