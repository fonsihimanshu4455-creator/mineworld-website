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
import { getStaticAsset } from "../../lib/staticAssetManifest";
import { getAssetById, saveAsset, saveSlot, useSlotDoc } from "../cmsStore";
import AssetSlotCard from "./AssetSlotCard";

const cardStyle = {
  background: "transparent",
  borderRadius: 0,
  padding: 0,
  color: "var(--admin-text)",
};

const dropStyle = (active) => ({
  marginTop: "var(--admin-space-md)",
  padding: "44px 28px",
  borderRadius: "var(--admin-radius-md)",
  border: active
    ? "2px dashed var(--admin-accent)"
    : "2px dashed var(--admin-border-strong)",
  background: active
    ? "var(--admin-accent-bg)"
    : "var(--admin-surface-soft)",
  textAlign: "center",
  transition: "all 0.18s ease",
  cursor: "pointer",
  minHeight: 200,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
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
  const currentAssetId = slotDoc.data?.asset_id || null;
  const [currentAsset, setCurrentAsset] = useState(null);

  useEffect(() => {
    let cancelled = false;
    if (!currentAssetId) {
      setCurrentAsset(null);
      return;
    }
    getAssetById(currentAssetId)
      .then((doc) => {
        if (!cancelled) setCurrentAsset(doc);
      })
      .catch(() => {
        if (!cancelled) setCurrentAsset(null);
      });
    return () => {
      cancelled = true;
    };
  }, [currentAssetId]);

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
      {!hideSpecCard && spec && (
        <div
          style={{
            marginTop: "var(--admin-space-md)",
            padding: "14px 18px",
            borderRadius: "var(--admin-radius-sm)",
            background: "var(--admin-surface-soft)",
            border: "1px solid var(--admin-border-gold)",
            display: "flex",
            gap: 14,
            alignItems: "flex-start",
          }}
        >
          <span style={{ fontSize: 22 }} aria-hidden="true">📐</span>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div
              style={{
                fontWeight: 800,
                color: "var(--admin-text)",
                fontSize: "var(--admin-text-sm)",
                marginBottom: 4,
                letterSpacing: "0.2px",
              }}
            >
              Recommended for this slot
            </div>
            <div
              style={{
                fontSize: "var(--admin-text-sm)",
                color: "var(--admin-text-secondary)",
                lineHeight: 1.55,
              }}
            >
              {spec.recommended?.width && (
                <>
                  <strong>
                    {spec.recommended.width} × {spec.recommended.height}
                  </strong>
                  {spec.aspectRatio ? ` (${spec.aspectRatio})` : ""}
                  {spec.recommended.maxSizeMB
                    ? ` · max ${spec.recommended.maxSizeMB} MB`
                    : ""}
                  {spec.recommended.duration
                    ? ` · ${spec.recommended.duration}`
                    : ""}
                  {Array.isArray(spec.formats) ? " · " : ""}
                </>
              )}
              {Array.isArray(spec.formats) && (
                <>Formats: {spec.formats.join(", ")}</>
              )}
              {spec.note && (
                <div
                  style={{
                    marginTop: 6,
                    color: "var(--admin-text-muted)",
                    fontSize: "var(--admin-text-xs)",
                  }}
                >
                  {spec.note}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {currentUrl ? (
        <div style={{ marginTop: 12 }}>
          <AssetSlotCard
            asset={
              currentAsset || {
                cloudinary_url: currentUrl,
                cloudinary_id: slotDoc.data?.cloudinary_id,
                asset_type: currentType,
                docId: currentAssetId,
              }
            }
            category={category}
            onRemoveClick={handleClear}
            showUsage={true}
            thumbnailSize="md"
          />
        </div>
      ) : (
        (() => {
          const staticAsset = getStaticAsset(slotKey);
          if (!staticAsset) return null;
          return (
            <div style={{ marginTop: 12 }}>
              <AssetSlotCard
                asset={{
                  cloudinary_url: staticAsset.url,
                  cloudinary_id: null,
                  asset_type: staticAsset.type,
                  isStatic: true,
                  originalSource: staticAsset.originalSource,
                  original_name: staticAsset.originalSource
                    .split("/")
                    .pop(),
                  format: staticAsset.originalSource
                    .split(".")
                    .pop()
                    .toLowerCase(),
                }}
                category={category}
                showUsage={false}
                thumbnailSize="lg"
              />
            </div>
          );
        })()
      )}

      <div
        style={{
          marginTop: "var(--admin-space-md)",
          color: "var(--admin-accent-deep)",
          fontSize: "var(--admin-text-xs)",
          fontWeight: 800,
          letterSpacing: 1.6,
          textTransform: "uppercase",
        }}
      >
        — Replace this asset —
      </div>

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
        <div
          style={{ fontSize: 38, lineHeight: 1, marginBottom: 6 }}
          aria-hidden="true"
        >
          {accept === "video" ? "🎬" : accept === "image" ? "🖼" : "📁"}
        </div>
        <div
          style={{
            fontSize: "var(--admin-text-base)",
            fontWeight: 700,
            color: "var(--admin-text)",
          }}
        >
          {currentUrl
            ? "Drop a new file to replace, or click to browse"
            : getStaticAsset(slotKey)
            ? "Replace the built-in default — drop a file or click"
            : "Drop a file here or click to browse"}
        </div>
        <div
          style={{
            fontSize: "var(--admin-text-sm)",
            color: "var(--admin-text-muted)",
          }}
        >
          {accept === "video"
            ? "MP4 / WEBM up to 50 MB"
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

      <div
        style={{
          marginTop: "var(--admin-space-md)",
          display: "flex",
          gap: 10,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontSize: "var(--admin-text-sm)",
            color: "var(--admin-text-muted)",
            fontWeight: 600,
          }}
        >
          or paste URL:
        </span>
        <input
          className="admin-input"
          type="url"
          placeholder="https://example.com/image.jpg"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          style={{ flex: "1 1 240px", minWidth: 200 }}
        />
        <button
          type="button"
          onClick={handleUrlUpload}
          disabled={!urlInput.trim() || uploading}
          className="admin-btn admin-btn-primary"
          aria-disabled={!urlInput.trim() || uploading}
        >
          Upload from URL
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
