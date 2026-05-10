// SiteErrorBoundary — catches any render error in the public tree and
// shows a recovery UI instead of a white-blank page. Without this, a
// single null deref in a CMS-mapped component crashes the entire site.
//
// Production fail-safe added in response to the services.cover crash
// where admin-saved CMS items without a cover_image broke React's tree.

import React from "react";

export default class SiteErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    if (typeof console !== "undefined") {
      console.error("[SiteErrorBoundary]", error, info?.componentStack);
    }
  }

  handleReload = () => {
    if (typeof window !== "undefined") window.location.reload();
  };

  handleClearCache = () => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem("mineworld:cms:v1");
    } catch {
      // ignore
    }
    window.location.reload();
  };

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "32px",
          background: "#FAF7F2",
          fontFamily:
            '"Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
          color: "#1A1A1A",
        }}
      >
        <div
          style={{
            maxWidth: 560,
            width: "100%",
            padding: 28,
            borderRadius: 16,
            border: "1px solid rgba(184, 149, 106, 0.32)",
            background: "#FFFFFF",
            boxShadow: "0 24px 60px rgba(15, 42, 68, 0.08)",
          }}
        >
          <div
            style={{
              color: "#BC9966",
              fontSize: 11,
              letterSpacing: 1.8,
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            Something went wrong
          </div>
          <h1
            style={{
              margin: "0 0 12px",
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: "-0.4px",
              fontFamily:
                '"Playfair Display", Georgia, "Times New Roman", serif',
            }}
          >
            We hit a render error.
          </h1>
          <p
            style={{
              margin: "0 0 18px",
              color: "#4A4A4A",
              fontSize: 14.5,
              lineHeight: 1.7,
            }}
          >
            The site couldn&rsquo;t finish painting because of a malformed
            CMS payload (usually an admin-saved item missing a required
            field). Reloading is harmless. If it keeps happening, clear
            the cached CMS values below — the public site will fall back
            to its bundled defaults.
          </p>
          {this.state.error?.message && (
            <pre
              style={{
                margin: "0 0 18px",
                padding: "10px 12px",
                background: "rgba(255, 120, 120, 0.06)",
                border: "1px solid rgba(255, 120, 120, 0.25)",
                borderRadius: 10,
                fontSize: 12,
                color: "#7a1010",
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, monospace",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {String(this.state.error.message)}
            </pre>
          )}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={this.handleReload}
              style={{
                padding: "10px 18px",
                borderRadius: 999,
                border: "none",
                background: "linear-gradient(135deg, #BC9966, #D9B987)",
                color: "#18140F",
                fontWeight: 800,
                fontSize: 13.5,
                cursor: "pointer",
              }}
            >
              Reload page
            </button>
            <button
              type="button"
              onClick={this.handleClearCache}
              style={{
                padding: "10px 18px",
                borderRadius: 999,
                border: "1px solid rgba(184, 149, 106, 0.45)",
                background: "transparent",
                color: "#1A1A1A",
                fontWeight: 700,
                fontSize: 13.5,
                cursor: "pointer",
              }}
            >
              Clear CMS cache &amp; reload
            </button>
          </div>
        </div>
      </div>
    );
  }
}
