import { useRef, useState } from "react";
import { adminTheme } from "./adminTheme";

const MAX_IMAGE_BYTES = 900 * 1024; // ~900KB
const MAX_VIDEO_BYTES = 4 * 1024 * 1024; // 4MB — localStorage hard ceiling is ~5MB

export default function MediaUpload({
  label,
  value,
  onChange,
  kind = "image", // "image" | "video"
  hint,
}) {
  const fileRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isData = typeof value === "string" && value.startsWith("data:");
  const hasValue = Boolean(value);
  const sizeLimit = kind === "video" ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;
  const humanLimit = kind === "video" ? "4 MB" : "900 KB";

  const onPickFile = async (file) => {
    if (!file) return;
    setError("");

    if (file.size > sizeLimit) {
      setError(
        `File is ${(file.size / 1024 / 1024).toFixed(1)} MB. Max is ${humanLimit} for ${kind}s saved in the browser. Use the URL field for larger files.`
      );
      return;
    }

    setLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = () => {
        onChange(String(reader.result || ""));
        setLoading(false);
      };
      reader.onerror = () => {
        setError("Could not read file.");
        setLoading(false);
      };
      reader.readAsDataURL(file);
    } catch {
      setError("Could not upload file.");
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={adminTheme.label}>{label}</div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "120px 1fr",
          gap: "12px",
          alignItems: "start",
        }}
      >
        <div
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "14px",
            border: `1px dashed ${
              hasValue ? "rgba(214,176,96,0.5)" : "rgba(255,255,255,0.16)"
            }`,
            background: "rgba(0,0,0,0.3)",
            display: "grid",
            placeItems: "center",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {hasValue ? (
            kind === "video" ? (
              <video
                src={value}
                muted
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <img
                src={value}
                alt="preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            )
          ) : (
            <div
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "11px",
                textAlign: "center",
                padding: "6px 10px",
                letterSpacing: "0.6px",
              }}
            >
              No {kind}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <input
            type="text"
            value={isData ? "" : value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Paste ${kind} URL (https://...)`}
            style={adminTheme.input}
          />

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              style={adminTheme.btnSecondary}
              disabled={loading}
            >
              {loading ? "Uploading…" : `Upload ${kind}`}
            </button>
            {hasValue && (
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setError("");
                }}
                style={adminTheme.btnDanger}
              >
                Remove
              </button>
            )}
            <input
              ref={fileRef}
              type="file"
              accept={kind === "video" ? "video/*" : "image/*"}
              onChange={(e) => onPickFile(e.target.files?.[0])}
              style={{ display: "none" }}
            />
          </div>

          {hint && (
            <div
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "11.5px",
                lineHeight: 1.5,
              }}
            >
              {hint}
            </div>
          )}

          {isData && (
            <div
              style={{
                color: adminTheme.colors.goldSoft,
                fontSize: "11.5px",
                lineHeight: 1.5,
              }}
            >
              Stored in this browser only. Export JSON to share with your dev.
            </div>
          )}

          {error && (
            <div
              role="alert"
              style={{
                color: "#FFB4A2",
                fontSize: "12px",
                background: "rgba(255,99,71,0.08)",
                border: "1px solid rgba(255,99,71,0.28)",
                padding: "8px 10px",
                borderRadius: "10px",
              }}
            >
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
