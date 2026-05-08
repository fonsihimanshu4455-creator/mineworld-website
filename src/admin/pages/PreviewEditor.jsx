import { useEffect, useRef, useState } from "react";
import { PageHeader } from "./Dashboard";

const previewRoutes = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Process", path: "/process" },
  { label: "Packages", path: "/packages" },
  { label: "Reviews", path: "/reviews" },
  { label: "Insights", path: "/insights" },
  { label: "FAQ", path: "/faq" },
];

const viewports = [
  { label: "Desktop", width: "100%", icon: "🖥" },
  { label: "Tablet", width: "820px", icon: "📱" },
  { label: "Mobile", width: "390px", icon: "📱" },
];

function PreviewEditor() {
  const [path, setPath] = useState("/");
  const [viewport, setViewport] = useState("Desktop");
  const [reloadKey, setReloadKey] = useState(0);
  const iframeRef = useRef(null);

  useEffect(() => {
    document.title = "Preview · Mineworld Admin";
  }, []);

  useEffect(() => {
    const onChange = () => setReloadKey((k) => k + 1);
    window.addEventListener("mw-content-change", onChange);
    return () => window.removeEventListener("mw-content-change", onChange);
  }, []);

  const currentVp = viewports.find((v) => v.label === viewport) || viewports[0];

  return (
    <div>
      <PageHeader
        eyebrow="Live Preview"
        title="See your changes instantly."
        subtitle="The iframe auto-refreshes when you save anything from the admin. Switch routes and viewport sizes to QA the whole site."
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: "14px",
        }}
      >
        {previewRoutes.map((r) => {
          const active = r.path === path;
          return (
            <button
              key={r.path}
              onClick={() => setPath(r.path)}
              style={{
                padding: "8px 14px",
                borderRadius: "999px",
                border: active
                  ? "1px solid rgba(214,176,96,0.7)"
                  : "1px solid rgba(255,255,255,0.10)",
                background: active
                  ? "rgba(214,176,96,0.14)"
                  : "rgba(255,255,255,0.04)",
                color: active ? "#F7D58A" : "#F5F1E8",
                fontSize: "12.5px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {r.label}
            </button>
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "8px",
          marginBottom: "14px",
        }}
      >
        {viewports.map((vp) => {
          const active = vp.label === viewport;
          return (
            <button
              key={vp.label}
              onClick={() => setViewport(vp.label)}
              style={{
                padding: "8px 12px",
                borderRadius: "10px",
                border: active
                  ? "1px solid rgba(214,176,96,0.6)"
                  : "1px solid rgba(255,255,255,0.10)",
                background: active
                  ? "rgba(214,176,96,0.10)"
                  : "rgba(255,255,255,0.04)",
                color: active ? "#F7D58A" : "#F5F1E8",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {vp.label}
            </button>
          );
        })}
        <button
          onClick={() => setReloadKey((k) => k + 1)}
          style={{
            marginLeft: "auto",
            padding: "8px 14px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.10)",
            background: "rgba(255,255,255,0.04)",
            color: "#F5F1E8",
            fontSize: "12px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          ↻ Refresh
        </button>
        <a
          href={path}
          target="_blank"
          rel="noreferrer"
          style={{
            padding: "8px 14px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.10)",
            background: "rgba(255,255,255,0.04)",
            color: "#F5F1E8",
            fontSize: "12px",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Open in new tab ↗
        </a>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "12px",
          borderRadius: "20px",
          background: "rgba(0,0,0,0.35)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            width: currentVp.width,
            maxWidth: "100%",
            height: "75vh",
            borderRadius: "12px",
            overflow: "hidden",
            background: "#0b0f1a",
            boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
          }}
        >
          <iframe
            key={`${path}-${reloadKey}`}
            ref={iframeRef}
            src={path}
            title="Live preview"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              background: "#0b0f1a",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default PreviewEditor;
