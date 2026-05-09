// AssetSlotCard — rich preview wrapper used inside AssetUploader and
// the Asset Library detail modal. Renders the current asset with a
// thumbnail, metadata table, "used in N slots" badge, and an optional
// lightbox-on-click for full-size preview.
//
// Pure presentational — receives `asset` already loaded and emits
// `onReplace` / `onRemove` / `onDelete` callbacks the parent handles.

import { useEffect, useState } from "react";
import { findSlotsUsingAsset } from "../cmsStore";

const TRANSPARENCY_BG =
  "repeating-conic-gradient(rgba(255,255,255,0.10) 0% 25%, rgba(0,0,0,0.18) 0% 50%) 50% / 16px 16px";

const PILL = (variant = "neutral") => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "3px 10px",
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: 0.4,
  textTransform: "uppercase",
  border:
    variant === "ok"
      ? "1px solid rgba(134, 230, 156, 0.35)"
      : variant === "warn"
      ? "1px solid rgba(217, 185, 135, 0.45)"
      : "1px solid rgba(184, 149, 106, 0.25)",
  background:
    variant === "ok"
      ? "rgba(134, 230, 156, 0.12)"
      : variant === "warn"
      ? "rgba(217, 185, 135, 0.12)"
      : "rgba(255,255,255,0.05)",
  color:
    variant === "ok"
      ? "#86E69C"
      : variant === "warn"
      ? "#D9B987"
      : "#F5F1E8",
});

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
  if (w > h) return `${w}:${h} · Landscape`;
  return `${w}:${h} · Portrait`;
}

function timeAgo(date) {
  if (!date) return null;
  const t = date.toDate ? date.toDate() : new Date(date);
  if (Number.isNaN(t.getTime())) return null;
  const diff = (Date.now() - t.getTime()) / 1000;
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 86400 * 30)
    return `${Math.floor(diff / 86400)}d ago`;
  return t.toLocaleDateString();
}

// Cloudinary thumbnail builder — uses public URL transformation
function cldThumb(url, type, opts = {}) {
  if (!url) return null;
  const { width = 480, height } = opts;
  // Insert /<transform>/ after /upload/
  const transform =
    type === "video"
      ? `so_0,f_jpg,q_auto,w_${width}${height ? `,h_${height},c_fill` : ""}`
      : `f_auto,q_auto,w_${width}${height ? `,h_${height},c_fill` : ""}`;
  return url.replace("/upload/", `/upload/${transform}/`);
}

function Lightbox({ asset, onClose }) {
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
        zIndex: 110,
        background: "rgba(6,10,18,0.92)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
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
          top: 16,
          right: 16,
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.18)",
          background: "rgba(255,255,255,0.06)",
          color: "#F5F1E8",
          fontSize: 22,
          cursor: "pointer",
        }}
      >
        ×
      </button>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "min(94vw, 1280px)",
          maxHeight: "88vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        {asset.asset_type === "video" || asset.type === "video" ? (
          <video
            src={asset.cloudinary_url || asset.url}
            controls
            autoPlay
            playsInline
            style={{
              maxWidth: "100%",
              maxHeight: "88vh",
              borderRadius: 12,
              background: "#000",
            }}
          />
        ) : (
          <img
            src={asset.cloudinary_url || asset.url}
            alt=""
            style={{
              maxWidth: "100%",
              maxHeight: "88vh",
              borderRadius: 12,
              objectFit: "contain",
            }}
          />
        )}
      </div>
    </div>
  );
}

export default function AssetSlotCard({
  asset,
  category = "misc",
  onReplaceClick,
  onRemoveClick,
  showUsage = true,
  thumbnailSize = "md", // "sm" | "md" | "lg"
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
  const transparentBg = isLogo;
  const isStaticBuiltIn = !!asset.isStatic;

  const thumbW =
    thumbnailSize === "sm" ? 128 : thumbnailSize === "lg" ? 320 : 220;

  const dims =
    asset.width && asset.height
      ? `${asset.width} × ${asset.height} px`
      : null;

  const aspect = aspectLabel(asset.width, asset.height);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `${thumbW}px 1fr`,
          gap: 14,
          alignItems: "start",
          padding: 14,
          borderRadius: 12,
          background: "rgba(0,0,0,0.18)",
          border: "1px solid rgba(184, 149, 106, 0.18)",
        }}
      >
        <button
          type="button"
          onClick={() => setLightbox(true)}
          aria-label="Preview full size"
          style={{
            position: "relative",
            width: thumbW,
            height: isVideo ? Math.round(thumbW * 9 / 16) : thumbW,
            border: "none",
            background: transparentBg ? TRANSPARENCY_BG : "rgba(0,0,0,0.32)",
            borderRadius: 10,
            cursor: "zoom-in",
            overflow: "hidden",
            padding: 0,
          }}
        >
          <img
            src={cldThumb(asset.cloudinary_url, isVideo ? "video" : "image", {
              width: thumbW * 2,
            })}
            alt=""
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: isLogo ? "contain" : "cover",
              padding: isLogo ? 8 : 0,
            }}
          />
          {isVideo && (
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                display: "grid",
                placeItems: "center",
                pointerEvents: "none",
              }}
            >
              <span
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.55)",
                  border: "1px solid rgba(255,255,255,0.5)",
                  color: "#fff",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 16,
                }}
              >
                ▶
              </span>
            </span>
          )}
        </button>

        <div style={{ minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              marginBottom: 8,
            }}
          >
            <span style={PILL()}>
              {isVideo ? "🎬 Video" : isLogo ? "🏷 Logo" : "🖼 Image"}
            </span>
            {asset.format && (
              <span style={PILL()}>{asset.format.toUpperCase()}</span>
            )}
            <span style={PILL(isStaticBuiltIn ? "warn" : "ok")}>
              {isStaticBuiltIn ? "📦 Built-in" : "☁ Cloudinary"}
            </span>
            {showUsage && usage && !isStaticBuiltIn && (
              <span style={PILL(usage.length > 0 ? "ok" : "warn")}>
                {usage.length > 0
                  ? `Used in ${usage.length}`
                  : "Unused"}
              </span>
            )}
          </div>

          <div
            style={{
              fontSize: 13.5,
              fontWeight: 700,
              color: "#F5F1E8",
              wordBreak: "break-word",
              marginBottom: 8,
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
              gap: 4,
              fontSize: 12,
              color: "rgba(245,241,232,0.72)",
              lineHeight: 1.4,
            }}
          >
            {dims && (
              <li>
                📐 {dims}
                {aspect ? ` · ${aspect}` : ""}
              </li>
            )}
            {asset.size_bytes ? (
              <li>💾 {bytesToReadable(asset.size_bytes)}</li>
            ) : null}
            {asset.duration_seconds ? (
              <li>
                ⏱ {Math.round(asset.duration_seconds * 10) / 10}s
              </li>
            ) : null}
            {asset.created_at ? (
              <li>📅 Uploaded {timeAgo(asset.created_at)}</li>
            ) : null}
            {isStaticBuiltIn && asset.originalSource ? (
              <li
                style={{
                  fontFamily:
                    "ui-monospace, SFMono-Regular, Menlo, monospace",
                  fontSize: 11.5,
                }}
              >
                📦 {asset.originalSource}
              </li>
            ) : null}
            {showUsage && usage && usage.length > 0 && (
              <li
                style={{
                  marginTop: 4,
                  paddingTop: 6,
                  borderTop: "1px dashed rgba(184, 149, 106, 0.22)",
                }}
              >
                🎯 In: {usage.map((u) => u.id).slice(0, 3).join(", ")}
                {usage.length > 3 ? `, +${usage.length - 3} more` : ""}
              </li>
            )}
          </ul>

          {(onReplaceClick || onRemoveClick) && (
            <div
              style={{
                display: "flex",
                gap: 8,
                marginTop: 12,
                flexWrap: "wrap",
              }}
            >
              {onReplaceClick && (
                <button
                  type="button"
                  onClick={onReplaceClick}
                  style={{
                    padding: "7px 14px",
                    borderRadius: 999,
                    border: "1px solid rgba(184, 149, 106, 0.5)",
                    background: "transparent",
                    color: "#F5F1E8",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Replace
                </button>
              )}
              {onRemoveClick && !isStaticBuiltIn && (
                <button
                  type="button"
                  onClick={onRemoveClick}
                  style={{
                    padding: "7px 14px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,120,120,0.35)",
                    background: "rgba(255,120,120,0.08)",
                    color: "#ff9e9e",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              )}
              {isStaticBuiltIn && (
                <span
                  style={{
                    padding: "7px 12px",
                    borderRadius: 999,
                    border: "1px dashed rgba(217, 185, 135, 0.35)",
                    color: "rgba(245,241,232,0.55)",
                    fontSize: 11.5,
                    fontWeight: 600,
                  }}
                  title="Built-in assets are bundled with the site and can't be removed from the admin. Replace it with a Cloudinary upload to override."
                >
                  Built-in (cannot remove)
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {lightbox && <Lightbox asset={asset} onClose={() => setLightbox(false)} />}
    </>
  );
}
