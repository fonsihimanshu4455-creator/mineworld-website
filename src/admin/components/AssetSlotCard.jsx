// AssetSlotCard — premium "currently live" preview wrapper used inside
// AssetUploader and the Asset Library detail modal.
//
// Redesign May 2026 v3:
//   - White card surface on warm cream backdrop
//   - 360px+ preview (was ~120px) — admin can SEE the asset clearly
//   - Right-column metadata table with bigger, readable text
//   - Inline video playback (no forced lightbox); image still gets one
//   - "CURRENTLY LIVE" eyebrow + "Built-in" / "Cloudinary CDN" status pill
//
// Pure presentational. Receives a loaded `asset` and emits
// `onReplaceClick` / `onRemoveClick` callbacks.

import { useEffect, useState } from "react";
import { findSlotsUsingAsset } from "../cmsStore";

function bytesToReadable(n) {
  if (!n && n !== 0) return null;
  if (n < 1024) return `${n} B`;
  if (n < 1_048_576) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1_073_741_824) return `${(n / 1_048_576).toFixed(2)} MB`;
  return `${(n / 1_073_741_824).toFixed(2)} GB`;
}

function aspectLabel(w, h) {
  if (!w || !h) return null;
  if (w === h) return "Square";
  if (w > h) return `Landscape (${w}:${h})`;
  return `Portrait (${w}:${h})`;
}

function timeAgo(date) {
  if (!date) return null;
  const t = date.toDate ? date.toDate() : new Date(date);
  if (Number.isNaN(t.getTime())) return null;
  const diff = (Date.now() - t.getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < 86400 * 30) return `${Math.floor(diff / 86400)} days ago`;
  return t.toLocaleDateString();
}

function cldThumb(url, type, opts = {}) {
  if (!url || !url.includes("/upload/")) return url || null;
  const { width = 720 } = opts;
  const transform =
    type === "video"
      ? `so_0,f_jpg,q_auto,w_${width}`
      : `f_auto,q_auto,w_${width}`;
  return url.replace("/upload/", `/upload/${transform}/`);
}

function ImageLightbox({ asset, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(15, 17, 22, 0.92)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "grid",
        placeItems: "center",
        padding: 32,
      }}
    >
      <button
        onClick={onClose}
        aria-label="Close preview"
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.18)",
          background: "rgba(255,255,255,0.08)",
          color: "#FFFFFF",
          fontSize: 22,
          cursor: "pointer",
        }}
      >
        ×
      </button>
      <img
        src={asset.cloudinary_url || asset.url}
        alt=""
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "min(94vw, 1400px)",
          maxHeight: "88vh",
          borderRadius: 12,
          objectFit: "contain",
          background: "#FFFFFF",
        }}
      />
    </div>
  );
}

export default function AssetSlotCard({
  asset,
  category = "misc",
  onReplaceClick,
  onRemoveClick,
  showUsage = true,
  thumbnailSize = "lg", // sm 120 / md 240 / lg 360 / xl 480
  inline = false, // when true, skip the heavy "CURRENTLY LIVE" header
}) {
  const [lightbox, setLightbox] = useState(false);
  const [usage, setUsage] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!showUsage || !asset) return;
      try {
        const docId = asset.docId || asset.id;
        if (!docId) return;
        const slots = await findSlotsUsingAsset(docId);
        if (!cancelled) setUsage(slots);
      } catch {
        // ignore — usage is informational
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [asset?.docId, asset?.id, showUsage]);

  if (!asset || !asset.cloudinary_url) return null;

  const isVideo = asset.asset_type === "video" || asset.type === "video";
  const isLogo = category === "logo-wall" || asset.asset_type === "logo";
  const isStatic = !!asset.isStatic;

  const sizePx = {
    sm: 200,
    md: 280,
    lg: 360,
    xl: 480,
  }[thumbnailSize] || 360;

  const dims =
    asset.width && asset.height
      ? `${asset.width} × ${asset.height} px`
      : null;
  const aspect = aspectLabel(asset.width, asset.height);
  const sourceUrl = asset.cloudinary_url || asset.url;
  const posterUrl = isVideo ? cldThumb(sourceUrl, "video", { width: sizePx * 2 }) : null;

  return (
    <>
      <div
        className="admin-card"
        style={{
          padding: 0,
          overflow: "hidden",
        }}
      >
        {!inline && (
          <div
            style={{
              padding: "14px 22px",
              borderBottom: "1px solid var(--admin-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              background: "var(--admin-surface-soft)",
            }}
          >
            <div
              style={{
                fontSize: "var(--admin-text-xs)",
                fontWeight: 800,
                letterSpacing: 1.6,
                textTransform: "uppercase",
                color: "var(--admin-accent-deep)",
              }}
            >
              ✓ Currently live on the website
            </div>
            <span
              className={`admin-pill ${
                isStatic ? "admin-pill-warning" : "admin-pill-success"
              }`}
            >
              {isStatic ? "📦 Built-in default" : "☁ Cloudinary CDN"}
            </span>
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `minmax(0, ${sizePx}px) 1fr`,
            gap: 28,
            padding: 24,
            alignItems: "start",
          }}
        >
          {/* ── PREVIEW ─────────────────────────────── */}
          <div
            style={{
              width: "100%",
              maxWidth: sizePx,
            }}
          >
            <div
              className={isLogo ? "admin-checker-bg" : ""}
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: isVideo ? "16 / 9" : isLogo ? "1 / 1" : "auto",
                borderRadius: "var(--admin-radius-md)",
                overflow: "hidden",
                background: isLogo
                  ? undefined
                  : isVideo
                  ? "#000"
                  : "var(--admin-surface-soft)",
                border: "1px solid var(--admin-border)",
                cursor: isVideo ? "default" : "zoom-in",
              }}
              onClick={() => {
                if (!isVideo) setLightbox(true);
              }}
            >
              {isVideo ? (
                <video
                  src={sourceUrl}
                  poster={posterUrl}
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    background: "#000",
                  }}
                />
              ) : (
                <img
                  src={cldThumb(sourceUrl, "image", { width: sizePx * 2 })}
                  alt={asset.original_name || "asset preview"}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: isLogo ? "100%" : "auto",
                    maxHeight: isLogo ? undefined : sizePx * 1.5,
                    objectFit: isLogo ? "contain" : "cover",
                    padding: isLogo ? 18 : 0,
                    display: "block",
                  }}
                />
              )}
              {!isVideo && (
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    background: "rgba(0,0,0,0.72)",
                    color: "#FFFFFF",
                    padding: "5px 10px",
                    borderRadius: 999,
                    fontSize: 11.5,
                    fontWeight: 700,
                    letterSpacing: 0.4,
                    pointerEvents: "none",
                  }}
                >
                  Click to enlarge
                </span>
              )}
            </div>
          </div>

          {/* ── METADATA ─────────────────────────────── */}
          <div style={{ minWidth: 0, color: "var(--admin-text)" }}>
            <div
              style={{
                fontSize: "var(--admin-text-lg)",
                fontWeight: 800,
                letterSpacing: "-0.3px",
                color: "var(--admin-text)",
                wordBreak: "break-word",
                marginBottom: 14,
                fontFamily: "var(--admin-font-serif)",
              }}
            >
              {asset.original_name || asset.cloudinary_id || "Untitled asset"}
            </div>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "grid",
                gap: 10,
                fontSize: "var(--admin-text-sm)",
                color: "var(--admin-text-secondary)",
                lineHeight: 1.5,
              }}
            >
              <li
                style={{ display: "flex", gap: 10, alignItems: "baseline" }}
              >
                <span style={{ fontSize: 16 }}>
                  {isVideo ? "🎬" : isLogo ? "🏷" : "🖼"}
                </span>
                <span>
                  <strong style={{ color: "var(--admin-text)" }}>
                    {isVideo ? "Video" : isLogo ? "Logo" : "Image"}
                  </strong>
                  {asset.format ? ` · ${asset.format.toUpperCase()}` : ""}
                </span>
              </li>
              {dims && (
                <li
                  style={{ display: "flex", gap: 10, alignItems: "baseline" }}
                >
                  <span style={{ fontSize: 16 }}>📐</span>
                  <span>
                    <strong style={{ color: "var(--admin-text)" }}>
                      {dims}
                    </strong>
                    {aspect ? ` · ${aspect}` : ""}
                  </span>
                </li>
              )}
              {asset.size_bytes ? (
                <li
                  style={{ display: "flex", gap: 10, alignItems: "baseline" }}
                >
                  <span style={{ fontSize: 16 }}>💾</span>
                  <span>{bytesToReadable(asset.size_bytes)}</span>
                </li>
              ) : null}
              {asset.duration_seconds ? (
                <li
                  style={{ display: "flex", gap: 10, alignItems: "baseline" }}
                >
                  <span style={{ fontSize: 16 }}>⏱</span>
                  <span>
                    {Math.round(asset.duration_seconds * 10) / 10} seconds
                  </span>
                </li>
              ) : null}
              {asset.created_at ? (
                <li
                  style={{ display: "flex", gap: 10, alignItems: "baseline" }}
                >
                  <span style={{ fontSize: 16 }}>📅</span>
                  <span>Uploaded {timeAgo(asset.created_at)}</span>
                </li>
              ) : null}
              {showUsage && usage && !isStatic && (
                <li
                  style={{ display: "flex", gap: 10, alignItems: "baseline" }}
                >
                  <span style={{ fontSize: 16 }}>🎯</span>
                  <span>
                    {usage.length > 0
                      ? `Used in ${usage.length} ${
                          usage.length === 1 ? "place" : "places"
                        }`
                      : "Not yet referenced anywhere"}
                  </span>
                </li>
              )}
              {isStatic && asset.originalSource ? (
                <li
                  style={{ display: "flex", gap: 10, alignItems: "baseline" }}
                >
                  <span style={{ fontSize: 16 }}>📦</span>
                  <code
                    style={{
                      fontFamily: "var(--admin-font-mono)",
                      fontSize: 13,
                      background: "var(--admin-surface-soft)",
                      padding: "2px 8px",
                      borderRadius: 6,
                    }}
                  >
                    {asset.originalSource}
                  </code>
                </li>
              ) : null}
            </ul>

            {(onReplaceClick || onRemoveClick) && (
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  marginTop: 22,
                  flexWrap: "wrap",
                }}
              >
                {onReplaceClick && (
                  <button
                    type="button"
                    onClick={onReplaceClick}
                    className="admin-btn admin-btn-ghost"
                  >
                    ↻ Replace
                  </button>
                )}
                {onRemoveClick && !isStatic && (
                  <button
                    type="button"
                    onClick={onRemoveClick}
                    className="admin-btn admin-btn-danger"
                  >
                    × Remove
                  </button>
                )}
                {isStatic && (
                  <span
                    className="admin-pill admin-pill-warning"
                    title="Built-in defaults are bundled with the site and can't be removed. Replace it with a Cloudinary upload to override."
                  >
                    Built-in · cannot remove
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {lightbox && !isVideo && (
        <ImageLightbox asset={asset} onClose={() => setLightbox(false)} />
      )}
    </>
  );
}
