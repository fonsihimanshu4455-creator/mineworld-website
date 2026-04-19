import { useRef, useState } from "react";
import { useSiteContent } from "../../../context/useSiteContent";
import { adminTheme } from "../ui/adminTheme";
import { SectionCard } from "../ui/Fields";

export default function DataEditor() {
  const { overrides, replaceOverrides, resetContent } = useSiteContent();
  const fileRef = useRef(null);
  const [msg, setMsg] = useState("");
  const [kind, setKind] = useState("info");

  const notify = (text, k = "info") => {
    setMsg(text);
    setKind(k);
    if (k !== "error") setTimeout(() => setMsg(""), 3200);
  };

  const exportJson = () => {
    const data = JSON.stringify(overrides, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mineworld-content-${new Date()
      .toISOString()
      .slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    notify("Downloaded.", "ok");
  };

  const importJson = async (file) => {
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new Error("Invalid file");
      }
      replaceOverrides(parsed);
      notify("Imported successfully.", "ok");
    } catch {
      notify("Could not import. Is this a valid Mineworld JSON export?", "error");
    }
  };

  const reset = () => {
    if (
      window.confirm(
        "Reset ALL content to defaults? This wipes every change you've made."
      )
    ) {
      resetContent();
      notify("Reset complete. All content restored to defaults.", "ok");
    }
  };

  const copyJson = async () => {
    try {
      await navigator.clipboard.writeText(
        JSON.stringify(overrides, null, 2) || "{}"
      );
      notify("Copied to clipboard.", "ok");
    } catch {
      notify("Could not copy. Use the Export button instead.", "error");
    }
  };

  const storageSize = new Blob([JSON.stringify(overrides || {})]).size;
  const storageKB = (storageSize / 1024).toFixed(1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <SectionCard
        title="Import / Export"
        subtitle="Download your edits as JSON, share with your developer to publish, or import a previously saved file."
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <button type="button" onClick={exportJson} style={adminTheme.btnPrimary}>
            ⬇ Export JSON
          </button>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            style={adminTheme.btnSecondary}
          >
            ⬆ Import JSON
          </button>
          <button type="button" onClick={copyJson} style={adminTheme.btnSecondary}>
            ⎘ Copy JSON
          </button>
          <button type="button" onClick={reset} style={adminTheme.btnDanger}>
            ↻ Reset all
          </button>
          <input
            type="file"
            ref={fileRef}
            accept="application/json"
            style={{ display: "none" }}
            onChange={(e) => importJson(e.target.files?.[0])}
          />
        </div>

        {msg && (
          <div
            role="status"
            style={{
              marginTop: "12px",
              padding: "10px 12px",
              borderRadius: "12px",
              background:
                kind === "error"
                  ? "rgba(255,99,71,0.08)"
                  : kind === "ok"
                    ? "rgba(124,255,178,0.08)"
                    : "rgba(255,255,255,0.04)",
              border:
                kind === "error"
                  ? "1px solid rgba(255,99,71,0.28)"
                  : kind === "ok"
                    ? "1px solid rgba(124,255,178,0.28)"
                    : "1px solid rgba(255,255,255,0.10)",
              color:
                kind === "error"
                  ? "#FFB4A2"
                  : kind === "ok"
                    ? "#7CFFB2"
                    : adminTheme.colors.text,
              fontSize: "13px",
            }}
          >
            {msg}
          </div>
        )}

        <div
          style={{
            marginTop: "14px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "10px",
          }}
        >
          <StatBox label="Storage used" value={`${storageKB} KB`} />
          <StatBox
            label="Storage limit"
            value="~ 5 MB"
            hint="Browser localStorage cap"
          />
          <StatBox
            label="Keys overridden"
            value={String(countOverrides(overrides))}
          />
        </div>
      </SectionCard>

      <SectionCard
        title="Current JSON overrides"
        subtitle="This is exactly what's being saved in your browser. You can copy it from here or from the Copy button above."
      >
        <pre
          style={{
            margin: 0,
            padding: "14px",
            background: "rgba(0,0,0,0.42)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "14px",
            color: adminTheme.colors.text,
            fontSize: "12px",
            lineHeight: 1.55,
            overflow: "auto",
            maxHeight: "360px",
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          }}
        >
          {JSON.stringify(overrides, null, 2) || "{}"}
        </pre>
      </SectionCard>

      <SectionCard
        title="How to publish for all visitors"
        subtitle="Right now your changes only live on this device. Here's how to go live for everyone:"
      >
        <ol
          style={{
            color: adminTheme.colors.textSoft,
            fontSize: "13.5px",
            lineHeight: 1.8,
            paddingLeft: "20px",
            margin: 0,
          }}
        >
          <li>Click <strong>Export JSON</strong> above and save the file.</li>
          <li>Send it to your developer.</li>
          <li>
            They'll replace the content in{" "}
            <code
              style={{
                background: "rgba(0,0,0,0.3)",
                padding: "2px 6px",
                borderRadius: "6px",
                fontSize: "12px",
              }}
            >
              src/data/defaultContent.js
            </code>{" "}
            and redeploy.
          </li>
          <li>New content is live for every visitor.</li>
        </ol>
      </SectionCard>
    </div>
  );
}

function StatBox({ label, value, hint }) {
  return (
    <div
      style={{
        padding: "12px 14px",
        borderRadius: "14px",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.025)",
      }}
    >
      <div
        style={{
          color: "rgba(255,255,255,0.55)",
          fontSize: "11px",
          letterSpacing: "1.2px",
          textTransform: "uppercase",
          fontWeight: 700,
        }}
      >
        {label}
      </div>
      <div
        style={{
          marginTop: "4px",
          color: adminTheme.colors.text,
          fontWeight: 800,
          fontSize: "18px",
        }}
      >
        {value}
      </div>
      {hint && (
        <div
          style={{
            marginTop: "4px",
            color: "rgba(255,255,255,0.45)",
            fontSize: "11px",
          }}
        >
          {hint}
        </div>
      )}
    </div>
  );
}

function countOverrides(obj) {
  if (!obj || typeof obj !== "object") return 0;
  let count = 0;
  for (const key of Object.keys(obj)) {
    const v = obj[key];
    if (v && typeof v === "object" && !Array.isArray(v)) {
      count += countOverrides(v);
    } else {
      count += 1;
    }
  }
  return count;
}
