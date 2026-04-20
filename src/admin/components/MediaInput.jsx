import { useRef, useState } from "react";

const MAX_BYTES = 4 * 1024 * 1024;

function MediaInput({ value, onChange, accept = "image/*,video/*" }) {
  const inputRef = useRef(null);
  const [error, setError] = useState("");

  const handleFile = (file) => {
    if (!file) return;
    if (file.size > MAX_BYTES) {
      setError(
        `File is ${(file.size / 1024 / 1024).toFixed(1)}MB. Use under 4MB, or paste a hosted URL instead.`
      );
      return;
    }
    setError("");
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result || "");
    reader.onerror = () => setError("Could not read file.");
    reader.readAsDataURL(file);
  };

  const isDataUrl = typeof value === "string" && value.startsWith("data:");
  const isImage = typeof value === "string" && (
    /\.(png|jpe?g|webp|gif|svg)(\?|$)/i.test(value) || value.startsWith("data:image")
  );
  const isVideo = typeof value === "string" && (
    /\.(mp4|webm|mov)(\?|$)/i.test(value) || value.startsWith("data:video")
  );

  return (
    <div>
      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
        <input
          type="text"
          placeholder="Paste a URL or upload a file"
          value={isDataUrl ? "" : value || ""}
          onChange={(e) => onChange(e.target.value)}
          style={inputStyle}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          style={uploadBtnStyle}
        >
          Upload
        </button>
        {value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            style={clearBtnStyle}
          >
            Clear
          </button>
        ) : null}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={(e) => handleFile(e.target.files?.[0])}
        style={{ display: "none" }}
      />

      {error ? (
        <div
          style={{
            color: "#ff9e9e",
            fontSize: "12.5px",
            marginTop: "6px",
            lineHeight: 1.55,
          }}
        >
          {error}
        </div>
      ) : null}

      {value ? (
        <div
          style={{
            marginTop: "10px",
            padding: "10px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(0,0,0,0.25)",
            maxWidth: "360px",
          }}
        >
          {isImage ? (
            <img
              src={value}
              alt="preview"
              style={{
                maxWidth: "100%",
                maxHeight: "180px",
                borderRadius: "8px",
                display: "block",
              }}
            />
          ) : isVideo ? (
            <video
              src={value}
              controls
              muted
              style={{
                maxWidth: "100%",
                maxHeight: "180px",
                borderRadius: "8px",
                display: "block",
              }}
            />
          ) : (
            <div style={{ color: "#bbb", fontSize: "12px", wordBreak: "break-all" }}>
              {value.slice(0, 120)}
              {value.length > 120 ? "…" : ""}
            </div>
          )}
          {isDataUrl ? (
            <div
              style={{
                marginTop: "8px",
                color: "#8a93a7",
                fontSize: "11.5px",
              }}
            >
              Stored inline (base64) — {(value.length / 1024).toFixed(0)} KB
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

const inputStyle = {
  flex: 1,
  padding: "10px 12px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  color: "#fff",
  fontSize: "13.5px",
  outline: "none",
};

const uploadBtnStyle = {
  padding: "10px 14px",
  borderRadius: "10px",
  border: "1px solid rgba(214,176,96,0.45)",
  background: "rgba(214,176,96,0.14)",
  color: "#E7C98A",
  fontSize: "13px",
  fontWeight: 700,
  cursor: "pointer",
};

const clearBtnStyle = {
  padding: "10px 12px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.03)",
  color: "#ccc",
  fontSize: "13px",
  cursor: "pointer",
};

export default MediaInput;
