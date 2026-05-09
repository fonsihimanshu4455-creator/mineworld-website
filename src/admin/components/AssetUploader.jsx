// AssetUploader — drag-drop + click + URL paste, with spec validation,
// upload progress, preview, replace, and remove.
//
// Self-contained: handles Cloudinary upload + writes the `assets` doc
// + patches the linked `site_content` slot. Caller can listen via
// `onUploadComplete(assetDoc)` / `onRemove()` if it needs to react.

import { useEffect, useRef, useState } from "react";
import {
  cloudinaryEnabled,
  uploadFromUrl,
  uploadToCloudinary,
} from "../../lib/cloudinary";
import { getAssetSpec } from "../../lib/asset-specs";
import { saveAsset, saveSlot, useSlotDoc } from "../cmsStore";

const cardStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(184, 149, 106, 0.20)",
  borderRadius: "14px",
  padding: "18px",
  color: "#F5F1E8",
};

const dropStyle = (active) => ({
  marginTop: "10px",
  padding: "22px",
  borderRadius: "14px",
  border: active
    ? "2px dashed var(--accent-gold)"
    : "2px dashed rgba(184, 149, 106, 0.35)",
  background: active ? "rgba(184, 149, 106, 0.08)" : "rgba(0,0,0,0.16)",
  textAlign: "center",
  transition: "all 0.18s ease",
  cursor: "pointer",
});

const buttonStyle = (variant = "primary", disabled = false) => ({
  padding: "10px 16px",
  borderRadius: "999px",
  border: variant === "ghost" ? "1px solid rgba(184, 149, 106, 0.5)" : "none",
  background:
    variant === "ghost"
      ? "transparent"
      : variant === "danger"
      ? "rgba(255,120,120,0.12)"
      : "linear-gradient(135deg, #BC9966, #D9B987)",
  color:
    variant === "ghost"
      ? "#F5F1E8"
      : variant === "danger"
      ? "#ff9e9e"
      : "#1F2D4D",
  fontSize: "13px",
  fontWeight: 700,
  cursor: disabled ? "not-allowed" : "pointer",
  opacity: disabled ? 0.5 : 1,
  letterSpacing: "0.2px",
});

const muted = { color: "rgba(245,241,232,0.62)", fontSize: "12.5px" };

function bytesToMB(n) {
  if (!n) return null;
  return (n / 1_048_576).toFixed(2);
}

function pickResourceType(file, accept) {
  if (accept === "video") return "video";
  if (accept === "image") return "image";
  if (file?.type?.startsWith("video/")) return "video";
  return "image";
}

function validateFile(file, spec) {
  if (!spec) return { ok: true, warnings: [] };
  const warnings = [];
  if (
    Array.isArray(spec.formats) &&
    spec.formats.length > 0 &&
    file?.type
  ) {
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (ext && !spec.formats.includes(ext)) {
      warnings.push(
        `Format .${ext} is unusual for this slot (recommended: ${spec.formats.join(
          ", "
        )}).`
      );
    }
  }
  if (spec.recommended?.maxSizeMB) {
    const mb = file.size / 1_048_576;
    if (mb > spec.recommended.maxSizeMB) {
      warnings.push(
        `File is ${mb.toFixed(2)} MB — recommended max is ${spec.recommended.maxSizeMB} MB.`
      );
    }
  }
  return { ok: true, warnings };
}

function AssetUploader({
  slotKey,
  specKey,
  accept = "image",
  category = "misc",
  tags = [],
  folder,
  onUploadComplete,
  onRemove,
  hideSpecCard = false,
}) {
  const spec = getAssetSpec(specKey || slotKey);
  const slotDoc = useSlotDoc(slotKey);

  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [warnings, setWarnings] = useState([]);
  const [urlInput, setUrlInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    setError("");
  }, [slotKey]);

  const currentUrl = slotDoc.data?.cloudinary_url || null;
  const currentType = slotDoc.data?.asset_type || null;

  const startUpload = async (workFn) => {
    setError("");
    setWarnings([]);
    setProgress(0);
    setUploading(true);
    try {
      const result = await workFn((p) => setProgress(p));
      const assetDoc = await saveAsset({
        cloudinary_id: result.public_id,
        cloudinary_url: result.secure_url,
        asset_type: pickResourceType({ type: result.resource_type === "video" ? "video/mp4" : "image/*" }, accept),
        original_name: result.original_filename || "",
        width: result.width || null,
        height: result.height || null,
        size_bytes: result.bytes || null,
        duration_seconds: result.duration || null,
        format: result.format || "",
        category,
        tags,
      });
      await saveSlot(slotKey, {
        slot_type: "asset",
        asset_id: assetDoc.id,
        cloudinary_id: result.public_id,
        cloudinary_url: result.secure_url,
        asset_type: assetDoc.asset_type,
      });
      setProgress(100);
      if (typeof onUploadComplete === "function") {
        onUploadComplete(assetDoc);
      }
    } catch (err) {
      setError(err?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleFile = (file) => {
    if (!file) return;
    if (!cloudinaryEnabled) {
      setError("Cloudinary is not configured. Add VITE_CLOUDINARY_* to .env.");
      return;
    }
    const v = validateFile(file, spec);
    if (v.warnings.length) setWarnings(v.warnings);
    const resourceType = pickResourceType(file, accept);
    startUpload(async (setP) => {
      // Cloudinary's unsigned upload doesn't support fine-grained
      // progress without XHR; we report 30% on POST start, 100% on
      // resolve. Good enough for a single file.
      setP(30);
      const result = await uploadToCloudinary(file, {
        folder,
        tags,
        resourceType,
      });
      setP(100);
      return result;
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleUrlUpload = async () => {
    if (!urlInput.trim()) return;
    if (!cloudinaryEnabled) {
      setError("Cloudinary is not configured.");
      return;
    }
    const resourceType = accept === "video" ? "video" : "image";
    startUpload(async (setP) => {
      setP(30);
      const result = await uploadFromUrl(urlInput.trim(), {
        folder,
        tags,
        resourceType,
      });
      setP(100);
      setUrlInput("");
      return result;
    });
  };

  const handleClear = async () => {
    setError("");
    try {
      await saveSlot(slotKey, {
        slot_type: "asset",
        asset_id: null,
        cloudinary_id: null,
        cloudinary_url: null,
        asset_type: null,
      });
      if (typeof onRemove === "function") onRemove();
    } catch (err) {
      setError(err?.message || "Could not clear slot");
    }
  };

  return (
    <div style={cardStyle}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <div>
          <div
            style={{
              color: "var(--accent-gold)",
              fontSize: "11px",
              letterSpacing: "1.6px",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: "4px",
            }}
          >
            Asset slot
          </div>
          <div style={{ fontSize: "14px", fontWeight: 700 }}>{slotKey}</div>
        </div>
        {currentUrl && (
          <button
            type="button"
            onClick={handleClear}
            style={buttonStyle("danger")}
          >
            Remove
          </button>
        )}
      </div>

      {!hideSpecCard && spec && (
        <div
          style={{
            marginTop: "12px",
            padding: "10px 12px",
            borderRadius: "10px",
            background: "rgba(0,0,0,0.18)",
            border: "1px solid rgba(184, 149, 106, 0.16)",
            ...muted,
          }}
        >
          <div style={{ fontWeight: 700, color: "#F5F1E8", marginBottom: 4 }}>
            Recommended
          </div>
          {spec.recommended?.width && (
            <div>
              {spec.recommended.width}×{spec.recommended.height}
              {spec.aspectRatio ? ` (${spec.aspectRatio})` : ""}
              {spec.recommended.maxSizeMB
                ? `, max ${spec.recommended.maxSizeMB} MB`
                : ""}
              {spec.recommended.duration
                ? `, ${spec.recommended.duration}`
                : ""}
            </div>
          )}
          {Array.isArray(spec.formats) && (
            <div>Formats: {spec.formats.join(", ")}</div>
          )}
          {spec.note && <div>{spec.note}</div>}
        </div>
      )}

      {currentUrl ? (
        <div style={{ marginTop: 12 }}>
          {currentType === "video" ? (
            <video
              src={currentUrl}
              controls
              muted
              playsInline
              style={{
                width: "100%",
                borderRadius: 10,
                background: "#000",
                maxHeight: 280,
              }}
            />
          ) : (
            <img
              src={currentUrl}
              alt=""
              style={{
                width: "100%",
                borderRadius: 10,
                maxHeight: 280,
                objectFit: "contain",
                background: "rgba(0,0,0,0.32)",
              }}
            />
          )}
          <div style={{ marginTop: 8, ...muted, wordBreak: "break-all" }}>
            {currentUrl}
          </div>
        </div>
      ) : null}

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        style={dropStyle(dragActive)}
      >
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
          Drop file here or click to browse
        </div>
        <div style={muted}>
          {accept === "video"
            ? "MP4 / WEBM"
            : accept === "image"
            ? "JPG / PNG / WEBP / SVG"
            : "Image or video"}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={
            accept === "video"
              ? "video/*"
              : accept === "image"
              ? "image/*"
              : "image/*,video/*"
          }
          style={{ display: "none" }}
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <input
          type="url"
          placeholder="Or paste a URL (jpg, png, mp4)…"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid rgba(184, 149, 106, 0.25)",
            background: "rgba(255,255,255,0.05)",
            color: "#F5F1E8",
            fontSize: 13,
            outline: "none",
          }}
        />
        <button
          type="button"
          onClick={handleUrlUpload}
          disabled={!urlInput.trim() || uploading}
          style={buttonStyle("ghost", !urlInput.trim() || uploading)}
        >
          Upload URL
        </button>
      </div>

      {uploading && (
        <div
          style={{
            marginTop: 14,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 8,
            overflow: "hidden",
            height: 8,
          }}
          aria-hidden="true"
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "linear-gradient(90deg, #BC9966, #D9B987)",
              transition: "width 0.25s ease",
            }}
          />
        </div>
      )}

      {warnings.length > 0 && (
        <ul
          style={{
            marginTop: 10,
            paddingLeft: 18,
            fontSize: 12.5,
            color: "#D9B987",
            lineHeight: 1.5,
          }}
        >
          {warnings.map((w, i) => (
            <li key={i}>{w}</li>
          ))}
        </ul>
      )}

      {error && (
        <div
          style={{
            marginTop: 10,
            color: "#ff9e9e",
            fontSize: 12.5,
            background: "rgba(255,120,120,0.06)",
            border: "1px solid rgba(255,120,120,0.25)",
            borderRadius: 8,
            padding: "8px 10px",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}

export default AssetUploader;
