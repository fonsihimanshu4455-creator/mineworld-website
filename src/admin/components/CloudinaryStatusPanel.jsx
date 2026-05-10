// CloudinaryStatusPanel — surfaces every static-manifest entry on the
// Dashboard so admin can see at a glance which assets are still bundled
// vs. uploaded to Cloudinary, and click through to the relevant editor
// to replace the bundled one with a Cloudinary upload.

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listStaticAssets } from "../../lib/staticAssetManifest";
import { useSlotDoc } from "../cmsStore";
import { cloudinaryEnabled } from "../../lib/cloudinary";

const TRANSPARENT_BG =
  "repeating-conic-gradient(rgba(255,255,255,0.10) 0% 25%, rgba(0,0,0,0.18) 0% 50%) 50% / 16px 16px";

function StatusRow({ entry }) {
  const slotDoc = useSlotDoc(entry.slot_key);
  const cmsUrl = slotDoc.data?.cloudinary_url || null;
  const onCloudinary = !!cmsUrl;
  const isVideo = entry.asset_type === "video";

  // Map slot-key to its editor route (best-effort; falls back to the
  // Asset Library if no specific editor matches).
  const section = (entry.slot_key.split(".")[0] || "").toLowerCase();
  const route =
    section === "navbar"
      ? "/admin/cms/navbar"
      : section === "footer"
      ? "/admin/cms/footer"
      : section === "founder"
      ? "/admin/cms/founder"
      : section === "hero"
      ? "/admin/cms/hero"
      : section === "editing"
      ? "/admin/cms/editing-showcase"
      : "/admin/cms/assets";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "56px 1fr auto auto",
        gap: 12,
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
        background: "var(--admin-surface, #FFFFFF)",
        border: "1px solid rgba(184, 149, 106, 0.14)",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 8,
          background:
            entry.category === "brand" ? TRANSPARENT_BG : "rgba(0,0,0,0.32)",
          overflow: "hidden",
        }}
      >
        {isVideo ? (
          <video
            src={onCloudinary ? cmsUrl : entry.cloudinary_url}
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
            src={onCloudinary ? cmsUrl : entry.cloudinary_url}
            alt=""
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: entry.category === "brand" ? "contain" : "cover",
              padding: entry.category === "brand" ? 6 : 0,
            }}
          />
        )}
      </div>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: 12.5,
            fontWeight: 700,
            color: "var(--admin-text, #1A1A1A)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {entry.slot_key}
        </div>
        <div
          style={{
            fontSize: 11,
            color: "var(--admin-text-muted, #6B5B47)",
            marginTop: 2,
          }}
        >
          {entry.label}
        </div>
      </div>
      <span
        style={{
          padding: "3px 10px",
          borderRadius: 999,
          fontSize: 10.5,
          fontWeight: 800,
          letterSpacing: 0.4,
          textTransform: "uppercase",
          background: onCloudinary
            ? "rgba(134, 230, 156, 0.18)"
            : "rgba(217, 185, 135, 0.18)",
          color: onCloudinary ? "#86E69C" : "#D9B987",
          border: onCloudinary
            ? "1px solid rgba(134, 230, 156, 0.32)"
            : "1px solid rgba(217, 185, 135, 0.32)",
          whiteSpace: "nowrap",
        }}
      >
        {onCloudinary ? "☁ Cloudinary" : "📦 Bundled"}
      </span>
      <Link
        to={route}
        style={{
          padding: "6px 12px",
          borderRadius: 999,
          border: "1px solid rgba(184, 149, 106, 0.5)",
          background: "transparent",
          color: "var(--admin-text, #1A1A1A)",
          fontSize: 11.5,
          fontWeight: 700,
          textDecoration: "none",
          whiteSpace: "nowrap",
        }}
      >
        {onCloudinary ? "Replace →" : "Upload →"}
      </Link>
    </div>
  );
}

export default function CloudinaryStatusPanel() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    setEntries(listStaticAssets());
  }, []);

  if (entries.length === 0) return null;

  return (
    <div
      style={{
        marginTop: 28,
        padding: "22px 24px",
        borderRadius: 18,
        border: "1px solid rgba(184, 149, 106, 0.32)",
        background:
          "linear-gradient(180deg, rgba(184, 149, 106, 0.06), rgba(255,255,255,0.02))",
      }}
    >
      <div
        style={{
          color: "#D9B987",
          fontSize: 11,
          letterSpacing: 1.8,
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: 6,
        }}
      >
        Asset CDN status
      </div>
      <h2
        style={{
          margin: "0 0 10px",
          fontSize: 22,
          color: "var(--admin-text, #1A1A1A)",
          letterSpacing: "-0.4px",
          fontFamily: '"Playfair Display", Georgia, serif',
          fontWeight: 700,
        }}
      >
        Move bundled assets onto Cloudinary for faster delivery.
      </h2>
      <p
        style={{
          margin: "0 0 16px",
          color: "var(--admin-text-secondary, #4A4A4A)",
          fontSize: 13.5,
          lineHeight: 1.7,
          maxWidth: 720,
        }}
      >
        Cloudinary serves images and videos with on-the-fly format
        conversion (AVIF / WebP) and adaptive quality, which is faster
        than bundled files for everyone outside your edge cache.{" "}
        {cloudinaryEnabled
          ? "Click any row's button to upload from the relevant editor page."
          : "⚠️ Cloudinary is not configured (set VITE_CLOUDINARY_* in .env)."}
      </p>
      <div style={{ display: "grid", gap: 8 }}>
        {entries.map((e) => (
          <StatusRow key={e.id} entry={e} />
        ))}
      </div>
    </div>
  );
}
