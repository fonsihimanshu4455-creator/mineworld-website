// One-time CMS migration UI — admins-only.
//
// Protected by the surrounding /admin/* AdminApp gate (useAdminAuth).
// Lives at /admin/migrate. Two functions:
//   1. "Seed slot keys" — populates site_content with every SLOT_DEFINITIONS entry.
//   2. Per-asset "Upload to Cloudinary" — fetches a bundled file, sends it
//      to Cloudinary via the unsigned preset, writes the asset row, and
//      points the matching site_content slot at it.
//
// Idempotent — re-running won't duplicate (Cloudinary returns the same
// public_id when overwrite is enabled in the preset, and Firestore writes
// use merge: true).

import { useState } from "react";
import {
  cloudinaryEnabled,
  uploadToCloudinary,
} from "../../lib/cloudinary";
import { saveAsset, seedSlotKeys, setSiteContent } from "../cmsStore";
import { firebaseEnabled } from "../firebase";
import heroVideo from "../../assets/hero-video.mp4";

const STATIC_ASSETS = [
  {
    key: "hero-video",
    label: "Hero background video",
    src: heroVideo,
    filename: "hero-video.mp4",
    mime: "video/mp4",
    resourceType: "video",
    folder: "mineworld/hero",
    tags: ["hero", "background"],
    category: "hero",
    asset_type: "video",
    target_slot: "hero.video",
  },
];

const card = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(184, 149, 106, 0.20)",
  borderRadius: "14px",
  padding: "18px",
  marginBottom: "14px",
  color: "#F5F1E8",
};

const button = (variant = "primary", disabled = false) => ({
  padding: "10px 16px",
  borderRadius: "999px",
  border: variant === "ghost"
    ? "1px solid rgba(184, 149, 106, 0.5)"
    : "none",
  background:
    variant === "ghost"
      ? "transparent"
      : "linear-gradient(135deg, #BC9966, #D9B987)",
  color: variant === "ghost" ? "#F5F1E8" : "#1F2D4D",
  fontSize: "13px",
  fontWeight: 700,
  cursor: disabled ? "not-allowed" : "pointer",
  opacity: disabled ? 0.5 : 1,
  letterSpacing: "0.2px",
  transition: "all 0.2s ease",
});

const statusColor = (kind) => {
  switch (kind) {
    case "ok":
      return "#86E69C";
    case "err":
      return "#ff9e9e";
    case "running":
      return "#D9B987";
    default:
      return "rgba(245,241,232,0.65)";
  }
};

function MigrateAssets() {
  const [seedStatus, setSeedStatus] = useState({ kind: "idle", text: "" });
  const [assetStatus, setAssetStatus] = useState({});

  const setStatus = (key, kind, text) =>
    setAssetStatus((prev) => ({ ...prev, [key]: { kind, text } }));

  const handleSeed = async () => {
    if (!firebaseEnabled) {
      setSeedStatus({ kind: "err", text: "Firebase is not configured." });
      return;
    }
    setSeedStatus({ kind: "running", text: "Seeding slot keys…" });
    try {
      const count = await seedSlotKeys();
      setSeedStatus({
        kind: "ok",
        text: `Seeded ${count} slot keys (idempotent — safe to re-run).`,
      });
    } catch (err) {
      setSeedStatus({
        kind: "err",
        text: err?.message || "Seed failed",
      });
    }
  };

  const migrateAsset = async (asset) => {
    if (!cloudinaryEnabled) {
      setStatus(asset.key, "err", "Cloudinary not configured.");
      return;
    }
    if (!firebaseEnabled) {
      setStatus(asset.key, "err", "Firebase not configured.");
      return;
    }

    setStatus(asset.key, "running", "Fetching local file…");
    try {
      const res = await fetch(asset.src);
      if (!res.ok) throw new Error(`Could not fetch ${asset.src}`);
      const blob = await res.blob();
      const file = new File([blob], asset.filename, {
        type: asset.mime || blob.type,
      });

      setStatus(asset.key, "running", "Uploading to Cloudinary…");
      const result = await uploadToCloudinary(file, {
        folder: asset.folder,
        tags: asset.tags,
        resourceType: asset.resourceType,
      });

      setStatus(asset.key, "running", "Writing Firestore docs…");
      const savedAsset = await saveAsset({
        cloudinary_id: result.public_id,
        cloudinary_url: result.secure_url,
        asset_type: asset.asset_type,
        original_name: asset.filename,
        width: result.width || null,
        height: result.height || null,
        size_bytes: result.bytes || null,
        duration_seconds: result.duration || null,
        format: result.format || "",
        category: asset.category,
        tags: asset.tags,
      });

      if (asset.target_slot) {
        await setSiteContent(asset.target_slot, {
          slot_type: "asset",
          asset_id: savedAsset.id,
          cloudinary_url: result.secure_url,
        });
      }

      setStatus(
        asset.key,
        "ok",
        `Uploaded → ${result.public_id} (slot ${asset.target_slot} updated)`
      );
    } catch (err) {
      setStatus(asset.key, "err", err?.message || "Migration failed");
    }
  };

  const runAll = async () => {
    for (const asset of STATIC_ASSETS) {
      await migrateAsset(asset);
    }
  };

  return (
    <div style={{ color: "#F5F1E8", maxWidth: "780px" }}>
      <div
        style={{
          color: "#D9B987",
          fontSize: "11px",
          letterSpacing: "2px",
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: "8px",
        }}
      >
        CMS · Phase 1
      </div>
      <h1
        style={{
          margin: "0 0 8px",
          fontSize: "28px",
          fontWeight: 800,
          fontFamily: '"Playfair Display", Georgia, serif',
        }}
      >
        Migrate static assets
      </h1>
      <p
        style={{
          margin: "0 0 26px",
          color: "rgba(245,241,232,0.70)",
          fontSize: "14px",
          lineHeight: 1.7,
        }}
      >
        One-time tool. Seeds the <code>site_content</code> collection and
        uploads bundled static assets to Cloudinary. Re-running is safe —
        every step is idempotent.
      </p>

      <section style={card}>
        <h2 style={{ margin: "0 0 6px", fontSize: "16px", fontWeight: 700 }}>
          Step 1 · Seed slot keys
        </h2>
        <p
          style={{
            margin: "0 0 14px",
            color: "rgba(245,241,232,0.65)",
            fontSize: "13px",
            lineHeight: 1.6,
          }}
        >
          Creates an empty document for every slot defined in
          <code> SLOT_DEFINITIONS</code>. Existing slots are preserved.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            type="button"
            onClick={handleSeed}
            disabled={seedStatus.kind === "running"}
            style={button("primary", seedStatus.kind === "running")}
          >
            {seedStatus.kind === "running" ? "Seeding…" : "Run seed"}
          </button>
          {seedStatus.text ? (
            <span
              style={{
                fontSize: "12.5px",
                color: statusColor(seedStatus.kind),
              }}
            >
              {seedStatus.text}
            </span>
          ) : null}
        </div>
      </section>

      <section style={card}>
        <h2 style={{ margin: "0 0 6px", fontSize: "16px", fontWeight: 700 }}>
          Step 2 · Migrate static assets
        </h2>
        <p
          style={{
            margin: "0 0 14px",
            color: "rgba(245,241,232,0.65)",
            fontSize: "13px",
            lineHeight: 1.6,
          }}
        >
          Uploads each bundled file to Cloudinary, writes an{" "}
          <code>assets</code> doc, and points the listed{" "}
          <code>site_content</code> slot at the new URL.
        </p>

        <div style={{ display: "grid", gap: "12px", marginBottom: "14px" }}>
          {STATIC_ASSETS.map((asset) => {
            const s = assetStatus[asset.key] || { kind: "idle", text: "" };
            return (
              <div
                key={asset.key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  background: "rgba(0,0,0,0.18)",
                  border: "1px solid rgba(184, 149, 106, 0.16)",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: "13px", fontWeight: 700 }}>
                    {asset.label}
                  </div>
                  <div
                    style={{
                      fontSize: "11.5px",
                      color: "rgba(245,241,232,0.55)",
                      marginTop: "2px",
                    }}
                  >
                    {asset.filename} → slot{" "}
                    <code>{asset.target_slot}</code>
                  </div>
                  {s.text ? (
                    <div
                      style={{
                        fontSize: "12px",
                        color: statusColor(s.kind),
                        marginTop: "6px",
                      }}
                    >
                      {s.text}
                    </div>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => migrateAsset(asset)}
                  disabled={s.kind === "running"}
                  style={button("ghost", s.kind === "running")}
                >
                  {s.kind === "running" ? "Running…" : "Upload"}
                </button>
              </div>
            );
          })}
        </div>

        <button type="button" onClick={runAll} style={button("primary")}>
          Run all
        </button>
      </section>

      {!cloudinaryEnabled || !firebaseEnabled ? (
        <div
          style={{
            ...card,
            borderColor: "rgba(255,158,158,0.4)",
            background: "rgba(255,158,158,0.06)",
          }}
        >
          <strong style={{ color: "#ff9e9e" }}>Configuration needed.</strong>{" "}
          {!cloudinaryEnabled ? (
            <span>
              Set <code>VITE_CLOUDINARY_CLOUD_NAME</code> and{" "}
              <code>VITE_CLOUDINARY_UPLOAD_PRESET</code> in <code>.env</code>.{" "}
            </span>
          ) : null}
          {!firebaseEnabled ? <span>Firebase env vars missing.</span> : null}
        </div>
      ) : null}
    </div>
  );
}

export default MigrateAssets;
