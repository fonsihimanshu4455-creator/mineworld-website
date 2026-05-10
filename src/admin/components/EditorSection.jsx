// EditorSection — visual grouping for related editor controls.
// Redesign May 2026 v3: emoji icon + bigger serif title + cream rule line.
// Used inside section editor pages to break a long form into "Background",
// "Copy", "Colours" etc.

export default function EditorSection({ title, hint, icon, children }) {
  return (
    <section style={{ marginTop: "var(--admin-space-lg, 40px)" }}>
      <div className="admin-section-divider">
        {icon ? (
          <span className="icon" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <span className="label">{title}</span>
        {hint ? <span className="hint">{hint}</span> : null}
      </div>
      <div style={{ display: "grid", gap: "var(--admin-space-sm, 16px)" }}>
        {children}
      </div>
    </section>
  );
}
