import { Component } from "react";

const CACHE_KEY = "mineworld:cms:v1";

class SiteErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    if (typeof window !== "undefined" && window.console) {
      // eslint-disable-next-line no-console
      console.error("[Mineworld] Render crash:", error, errorInfo);
    }
  }

  clearCacheAndReload = () => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(CACHE_KEY);
      }
    } catch {
      // ignore quota / privacy mode
    }
    if (typeof window !== "undefined") window.location.reload();
  };

  reload = () => {
    if (typeof window !== "undefined") window.location.reload();
  };

  render() {
    if (!this.state.error) return this.props.children;

    const message = this.state.error?.message || String(this.state.error);
    const stack = this.state.error?.stack || "";
    const componentStack = this.state.errorInfo?.componentStack || "";

    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#FAF7F2",
          color: "#1A1A1A",
          padding: "48px 24px",
          fontFamily:
            'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div
            style={{
              color: "#8B6E48",
              fontSize: 12,
              letterSpacing: "2.4px",
              textTransform: "uppercase",
              fontWeight: 800,
              marginBottom: 12,
            }}
          >
            Mineworld · recovery
          </div>
          <h1
            style={{
              margin: "0 0 14px",
              fontSize: 30,
              lineHeight: 1.15,
              letterSpacing: "-0.6px",
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 800,
            }}
          >
            Something on the page failed to render.
          </h1>
          <p
            style={{
              margin: "0 0 20px",
              fontSize: 15,
              lineHeight: 1.7,
              color: "#4A4A4A",
            }}
          >
            The site caught the error before it crashed the whole tab. If you
            just edited content in the admin, the cached payload may be
            malformed — clearing the cache usually fixes it.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24 }}>
            <button
              type="button"
              onClick={this.clearCacheAndReload}
              style={{
                padding: "11px 20px",
                borderRadius: 999,
                border: "none",
                background: "linear-gradient(135deg, #BC9966, #D9B987)",
                color: "#18140F",
                fontWeight: 800,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Clear CMS cache & reload
            </button>
            <button
              type="button"
              onClick={this.reload}
              style={{
                padding: "11px 20px",
                borderRadius: 999,
                border: "1px solid rgba(31,45,77,0.16)",
                background: "transparent",
                color: "#1A1A1A",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Reload page
            </button>
          </div>
          <details
            style={{
              background: "rgba(184,149,106,0.08)",
              border: "1px solid rgba(184,149,106,0.24)",
              borderRadius: 12,
              padding: "12px 16px",
              fontSize: 13,
              lineHeight: 1.6,
            }}
          >
            <summary
              style={{ cursor: "pointer", fontWeight: 700, color: "#8B6E48" }}
            >
              Error details (share with the developer)
            </summary>
            <div style={{ marginTop: 10 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>Message</div>
              <pre
                style={{
                  margin: "0 0 12px",
                  padding: 10,
                  background: "rgba(0,0,0,0.04)",
                  borderRadius: 8,
                  fontSize: 12,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {message}
              </pre>
              {componentStack && (
                <>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>
                    Component stack
                  </div>
                  <pre
                    style={{
                      margin: "0 0 12px",
                      padding: 10,
                      background: "rgba(0,0,0,0.04)",
                      borderRadius: 8,
                      fontSize: 12,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      maxHeight: 220,
                      overflow: "auto",
                    }}
                  >
                    {componentStack.trim()}
                  </pre>
                </>
              )}
              {stack && (
                <>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>Stack</div>
                  <pre
                    style={{
                      margin: 0,
                      padding: 10,
                      background: "rgba(0,0,0,0.04)",
                      borderRadius: 8,
                      fontSize: 12,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      maxHeight: 260,
                      overflow: "auto",
                    }}
                  >
                    {stack}
                  </pre>
                </>
              )}
            </div>
          </details>
        </div>
      </div>
    );
  }
}

export default SiteErrorBoundary;
