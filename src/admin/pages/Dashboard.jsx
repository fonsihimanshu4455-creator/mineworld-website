import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { contentStore } from "../contentStore";
import { schemas, collectionOrder } from "../schemas";
import CloudinaryStatusPanel from "../components/CloudinaryStatusPanel";

function PageHeader({ eyebrow, title, subtitle, action }) {
  return (
    <header
      style={{
        marginBottom: "var(--admin-space-lg, 40px)",
        paddingBottom: "var(--admin-space-md, 24px)",
        borderBottom: "1px solid var(--admin-border-gold, rgba(184,149,106,0.32))",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 16,
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            color: "var(--admin-accent-deep, #8B6E48)",
            fontSize: "var(--admin-text-xs, 13px)",
            letterSpacing: "2.4px",
            textTransform: "uppercase",
            fontWeight: 800,
            marginBottom: 12,
          }}
        >
          {eyebrow}
        </div>
        <h1
          style={{
            margin: "0 0 12px",
            fontSize: "var(--admin-text-2xl, 36px)",
            color: "var(--admin-text, #1A1A1A)",
            letterSpacing: "-0.8px",
            lineHeight: 1.05,
            fontFamily:
              'var(--admin-font-serif, "Playfair Display", Georgia, serif)',
            fontWeight: 800,
          }}
        >
          {title}
        </h1>
        {subtitle ? (
          <p
            style={{
              margin: 0,
              color: "var(--admin-text-secondary, #4A4A4A)",
              fontSize: "var(--admin-text-base, 17px)",
              lineHeight: 1.65,
              maxWidth: 760,
            }}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
      {action}
    </header>
  );
}

function Dashboard() {
  const [msg, setMsg] = useState("");
  const fileRef = useRef(null);

  const snapshot = contentStore.snapshot();
  const counts = collectionOrder.map((key) => ({
    key,
    label: schemas[key].label,
    count: Array.isArray(snapshot[key]) ? snapshot[key].length : null,
  }));

  const handleExport = () => {
    const json = contentStore.exportJSON();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const date = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `mineworld-content-${date}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setMsg("Exported.");
    setTimeout(() => setMsg(""), 2000);
  };

  const handleImport = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        await contentStore.importJSON(String(reader.result || ""));
        setMsg("Imported successfully.");
      } catch (e) {
        setMsg("Import failed: " + (e?.message || "invalid file"));
      }
      setTimeout(() => setMsg(""), 3000);
    };
    reader.readAsText(file);
  };

  const handleReset = async () => {
    if (
      !window.confirm(
        "Clear all saved admin edits? The site will revert to defaults."
      )
    )
      return;
    setMsg("Clearing…");
    await contentStore.clearAll();
    setMsg("All admin edits cleared. Site restored to defaults.");
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Mineworld Admin"
        title="Your content control room."
        subtitle="Edit services, portfolio, team, pricing, and site settings from the sidebar. Website Development, App Development, and Meta Ads are now your flagship services — keep them sharp here. All changes are saved in your browser and can be exported as a JSON backup."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "14px",
          marginBottom: "32px",
        }}
      >
        {counts.map((c) => (
          <Link
            key={c.key}
            to={`/admin/collections/${c.key}`}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                padding: "18px 20px",
                borderRadius: "18px",
                border: "1px solid rgba(255,255,255,0.08)",
                background:
                  "var(--admin-surface, #FFFFFF)",
                transition: "border-color 0.2s ease",
              }}
            >
              <div
                style={{
                  color: "#D9B987",
                  fontSize: "10.5px",
                  letterSpacing: "1.6px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  marginBottom: "6px",
                }}
              >
                {c.label}
              </div>
              <div
                style={{
                  color: "var(--admin-text, #1A1A1A)",
                  fontSize: "22px",
                  fontWeight: 800,
                  letterSpacing: "-0.4px",
                  lineHeight: 1.1,
                }}
              >
                {c.count === null ? "Default" : `${c.count} item${c.count === 1 ? "" : "s"}`}
              </div>
              <div
                style={{
                  color: "var(--admin-text-muted, #6B5B47)",
                  fontSize: "12px",
                  marginTop: "8px",
                }}
              >
                {c.count === null ? "Using built-in defaults" : "Edited via admin"}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div
        style={{
          padding: "22px 24px",
          borderRadius: "18px",
          border: "1px solid rgba(188,153,102,0.32)",
          background:
            "linear-gradient(180deg, rgba(188,153,102,0.08), rgba(255,255,255,0.02))",
        }}
      >
        <div
          style={{
            color: "#D9B987",
            fontSize: "11px",
            letterSpacing: "1.8px",
            textTransform: "uppercase",
            fontWeight: 700,
            marginBottom: "6px",
          }}
        >
          Backup & Restore
        </div>
        <h2
          style={{
            margin: "0 0 10px",
            fontSize: "22px",
            color: "var(--admin-text, #1A1A1A)",
            letterSpacing: "-0.4px",
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 700,
          }}
        >
          Export your content before making big changes.
        </h2>
        <p
          style={{
            margin: "0 0 18px",
            color: "var(--admin-text-secondary, #4A4A4A)",
            fontSize: "14px",
            lineHeight: 1.8,
            maxWidth: "640px",
          }}
        >
          Export creates a JSON file you can share, back up, or hand to a
          developer to persist into the codebase. Import restores a previously
          exported file.
        </p>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={handleExport}
            style={{
              padding: "12px 18px",
              borderRadius: "999px",
              border: "none",
              background: "linear-gradient(135deg, #BC9966, #D9B987)",
              color: "#18140F",
              fontWeight: 800,
              fontSize: "13.5px",
              cursor: "pointer",
            }}
          >
            Export JSON
          </button>
          <button
            onClick={() => fileRef.current?.click()}
            style={{
              padding: "12px 18px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "var(--admin-surface, #FFFFFF)",
              color: "var(--admin-text, #1A1A1A)",
              fontWeight: 700,
              fontSize: "13.5px",
              cursor: "pointer",
            }}
          >
            Import JSON
          </button>
          <button
            onClick={handleReset}
            style={{
              padding: "12px 18px",
              borderRadius: "999px",
              border: "1px solid rgba(255,120,120,0.28)",
              background: "rgba(255,120,120,0.06)",
              color: "#ff9e9e",
              fontWeight: 700,
              fontSize: "13.5px",
              cursor: "pointer",
            }}
          >
            Reset all edits
          </button>
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          onChange={(e) => handleImport(e.target.files?.[0])}
          style={{ display: "none" }}
        />

        {msg ? (
          <div
            style={{
              marginTop: "14px",
              padding: "10px 14px",
              borderRadius: "10px",
              background: "rgba(188,153,102,0.12)",
              color: "#D9B987",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            {msg}
          </div>
        ) : null}
      </div>

      <div
        style={{
          marginTop: "28px",
          padding: "18px 22px",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.08)",
          background: "var(--admin-surface, #FFFFFF)",
          color: "var(--admin-text-secondary, #4A4A4A)",
          fontSize: "13px",
          lineHeight: 1.75,
        }}
      >
        <strong style={{ color: "#D9B987" }}>Note:</strong> Edits are saved in
        this browser. For multi-device / public live updates, wire the admin to
        a backend (Firebase, Supabase, or a simple JSON endpoint) — the content
        store is already abstracted for that swap.
      </div>

      <CloudinaryStatusPanel />
    </div>
  );
}

export default Dashboard;
export { PageHeader };
