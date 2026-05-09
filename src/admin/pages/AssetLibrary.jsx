// AssetLibrary — grid of every doc in the `assets` collection with
// filters, search, modal detail view, and safe-delete.
//
// Live-listened to the assets collection so admins see uploads and
// deletions immediately.

import { useEffect, useMemo, useState } from "react";
import {
  collection as fsCollection,
  onSnapshot,
} from "firebase/firestore";
import { db, firebaseEnabled } from "../firebase";
import { ASSETS_COLLECTION } from "../../lib/cms-schema";
import { listStaticAssets } from "../../lib/staticAssetManifest";
import { findSlotsUsingAsset } from "../cmsStore";
import AssetSlotCard from "../components/AssetSlotCard";
import DeleteAssetDialog from "../components/DeleteAssetDialog";
import { PageHeader } from "./Dashboard";

const CATEGORIES = [
  "all",
  "hero",
  "portfolio",
  "logo-wall",
  "team",
  "reel-showcase",
  "founder",
  "footer",
  "press",
  "apps",
  "misc",
];

const TYPES = ["all", "image", "video"];

const SOURCES = ["all", "cloudinary", "static"];

const cardStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(184, 149, 106, 0.18)",
  borderRadius: 14,
  padding: 14,
  color: "#F5F1E8",
  cursor: "pointer",
  transition: "all 0.18s ease",
};

const inputStyle = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid rgba(184, 149, 106, 0.25)",
  background: "rgba(255,255,255,0.05)",
  color: "#F5F1E8",
  fontSize: 13,
  outline: "none",
};

function cldThumb(url, type, w = 480) {
  if (!url) return null;
  const transform =
    type === "video"
      ? `so_0,f_jpg,q_auto,w_${w}`
      : `f_auto,q_auto,w_${w}`;
  return url.replace("/upload/", `/upload/${transform}/`);
}

function bytesToReadable(n) {
  if (!n && n !== 0) return null;
  if (n < 1024) return `${n} B`;
  if (n < 1_048_576) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1_048_576).toFixed(2)} MB`;
}

function AssetCard({ asset, selected, onSelect, onClick }) {
  const isVideo = asset.asset_type === "video";
  const isLogo =
    asset.category === "logo-wall" || asset.asset_type === "logo";
  const transparent = isLogo;
  const isStatic = !!asset.isStatic;

  return (
    <div
      style={{
        ...cardStyle,
        border: selected
          ? "1px solid var(--accent-gold)"
          : cardStyle.border,
        boxShadow: selected
          ? "0 0 0 3px rgba(184, 149, 106, 0.25)"
          : "none",
      }}
      onClick={onClick}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1 / 1",
          borderRadius: 10,
          overflow: "hidden",
          background: transparent
            ? "repeating-conic-gradient(rgba(255,255,255,0.10) 0% 25%, rgba(0,0,0,0.18) 0% 50%) 50% / 16px 16px"
            : "rgba(0,0,0,0.32)",
          marginBottom: 10,
        }}
      >
        <img
          src={cldThumb(
            asset.cloudinary_url,
            isVideo ? "video" : "image",
            480
          )}
          alt=""
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: isLogo ? "contain" : "cover",
            padding: isLogo ? 12 : 0,
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
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.55)",
                border: "1px solid rgba(255,255,255,0.5)",
                color: "#fff",
                display: "grid",
                placeItems: "center",
                fontSize: 13,
              }}
            >
              ▶
            </span>
          </span>
        )}
        {!isStatic && (
          <input
            type="checkbox"
            checked={selected}
            onClick={(e) => e.stopPropagation()}
            onChange={onSelect}
            style={{
              position: "absolute",
              top: 8,
              left: 8,
              width: 18,
              height: 18,
              cursor: "pointer",
            }}
          />
        )}
        <span
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            padding: "3px 8px",
            borderRadius: 999,
            background: isStatic
              ? "rgba(217, 185, 135, 0.9)"
              : "rgba(134, 230, 156, 0.85)",
            color: isStatic ? "#1F2D4D" : "#0a3a16",
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: 0.4,
            textTransform: "uppercase",
          }}
          title={isStatic ? "Bundled with the site (built-in)" : "Stored on Cloudinary"}
        >
          {isStatic ? "📦 Static" : "☁ Cloudinary"}
        </span>
        {asset.format && (
          <span
            style={{
              position: "absolute",
              bottom: 8,
              right: 8,
              padding: "3px 8px",
              borderRadius: 999,
              background: "rgba(0,0,0,0.7)",
              color: "#F5F1E8",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 0.4,
              textTransform: "uppercase",
            }}
          >
            {asset.format}
          </span>
        )}
      </div>

      <div
        style={{
          fontSize: 12.5,
          fontWeight: 700,
          color: "#F5F1E8",
          marginBottom: 4,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
        title={asset.original_name || asset.cloudinary_id}
      >
        {asset.original_name || asset.cloudinary_id}
      </div>
      <div
        style={{
          fontSize: 11,
          color: "rgba(245,241,232,0.55)",
          lineHeight: 1.4,
        }}
      >
        {asset.width && asset.height
          ? `${asset.width}×${asset.height}`
          : "—"}
        {" · "}
        {bytesToReadable(asset.size_bytes) || "—"}
      </div>
    </div>
  );
}

function AssetDetailModal({ asset, onClose, onDelete }) {
  const [usage, setUsage] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (!asset) return;
    findSlotsUsingAsset(asset.id || asset.docId)
      .then((s) => {
        if (!cancelled) setUsage(s);
      })
      .catch(() => {
        if (!cancelled) setUsage([]);
      });
    return () => {
      cancelled = true;
    };
  }, [asset]);

  const copy = () => {
    navigator.clipboard.writeText(asset.cloudinary_url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  if (!asset) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 120,
        background: "rgba(6,10,18,0.84)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "grid",
        placeItems: "center",
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(720px, 100%)",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: 24,
          borderRadius: 16,
          background: "linear-gradient(180deg, #1a2236, #0f172a)",
          border: "1px solid rgba(184, 149, 106, 0.25)",
          color: "#F5F1E8",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 16,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                color: "var(--accent-gold)",
                letterSpacing: 1.6,
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: 4,
              }}
            >
              Asset detail
            </div>
            <h2
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 800,
                fontFamily: '"Playfair Display", Georgia, serif',
                letterSpacing: "-0.3px",
                wordBreak: "break-word",
              }}
            >
              {asset.original_name || asset.cloudinary_id}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.04)",
              color: "#F5F1E8",
              fontSize: 18,
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>

        <AssetSlotCard
          asset={{ ...asset, docId: asset.id }}
          category={asset.category}
          showUsage={false}
          thumbnailSize="lg"
        />

        <div
          style={{
            marginTop: 16,
            padding: 14,
            borderRadius: 10,
            background: "rgba(0,0,0,0.18)",
            border: "1px solid rgba(184, 149, 106, 0.15)",
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "var(--accent-gold)",
              letterSpacing: 1.4,
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            Cloudinary URL
          </div>
          <div
            style={{
              wordBreak: "break-all",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 12,
              color: "rgba(245,241,232,0.85)",
              marginBottom: 8,
            }}
          >
            {asset.cloudinary_url}
          </div>
          <button
            type="button"
            onClick={copy}
            style={{
              padding: "7px 14px",
              borderRadius: 999,
              border: "1px solid rgba(184, 149, 106, 0.5)",
              background: "transparent",
              color: copied ? "#86E69C" : "#F5F1E8",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {copied ? "✓ Copied" : "Copy URL"}
          </button>
        </div>

        <div
          style={{
            marginTop: 16,
            padding: 14,
            borderRadius: 10,
            background: "rgba(0,0,0,0.18)",
            border: "1px solid rgba(184, 149, 106, 0.15)",
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: "var(--accent-gold)",
              letterSpacing: 1.4,
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            Used in
          </div>
          {usage === null ? (
            <div
              style={{ fontSize: 13, color: "rgba(245,241,232,0.55)" }}
            >
              Checking…
            </div>
          ) : usage.length === 0 ? (
            <div
              style={{ fontSize: 13, color: "rgba(245,241,232,0.65)" }}
            >
              Not referenced by any slot. Safe to delete.
            </div>
          ) : (
            <ul
              style={{
                margin: 0,
                paddingLeft: 20,
                fontSize: 13,
                color: "rgba(245,241,232,0.85)",
                lineHeight: 1.7,
              }}
            >
              {usage.map((slot) => (
                <li key={slot.id}>
                  <code
                    style={{
                      fontFamily:
                        "ui-monospace, SFMono-Regular, Menlo, monospace",
                      fontSize: 12.5,
                    }}
                  >
                    {slot.id}
                  </code>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
            marginTop: 18,
          }}
        >
          {asset.isStatic ? (
            <span
              style={{
                padding: "10px 16px",
                borderRadius: 999,
                border: "1px dashed rgba(217, 185, 135, 0.35)",
                color: "rgba(245,241,232,0.6)",
                fontSize: 12.5,
                fontWeight: 600,
              }}
            >
              Built-in asset — replace it from the editor page (e.g.{" "}
              {asset.slot_key
                ? `/admin/cms/${asset.slot_key.split(".")[0]}`
                : "the relevant editor"}
              ).
            </span>
          ) : (
            <button
              type="button"
              onClick={onDelete}
              style={{
                padding: "10px 20px",
                borderRadius: 999,
                border: "1px solid rgba(255,120,120,0.35)",
                background: "rgba(255,120,120,0.08)",
                color: "#ff9e9e",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Delete asset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function AssetLibrary() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [category, setCategory] = useState("all");
  const [type, setType] = useState("all");
  const [source, setSource] = useState("all");
  const [search, setSearch] = useState("");
  const [showOrphans, setShowOrphans] = useState(false);

  const [selected, setSelected] = useState(new Set());
  const [detailAsset, setDetailAsset] = useState(null);
  const [deletingAsset, setDeletingAsset] = useState(null);
  const [orphanIds, setOrphanIds] = useState(null); // Set of asset ids with 0 references

  useEffect(() => {
    if (!firebaseEnabled || !db) {
      setLoading(false);
      setError("Firestore is not configured.");
      return;
    }
    const ref = fsCollection(db, ASSETS_COLLECTION);
    const unsub = onSnapshot(
      ref,
      (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        list.sort((a, b) => {
          const aT = a.created_at?.toMillis?.() || 0;
          const bT = b.created_at?.toMillis?.() || 0;
          return bT - aT;
        });
        setAssets(list);
        setLoading(false);
      },
      (err) => {
        setError(err.message || "Could not load assets");
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  // Compute orphan ids when "show orphans" is toggled on or assets change.
  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!showOrphans) {
        setOrphanIds(null);
        return;
      }
      try {
        const checks = await Promise.all(
          assets.map(async (a) => {
            const slots = await findSlotsUsingAsset(a.id);
            return [a.id, slots.length === 0];
          })
        );
        if (cancelled) return;
        const orphans = new Set(
          checks.filter(([, isOrphan]) => isOrphan).map(([id]) => id)
        );
        setOrphanIds(orphans);
      } catch {
        if (!cancelled) setOrphanIds(new Set());
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [showOrphans, assets]);

  // Merge Cloudinary uploads with static (built-in) assets — static
  // ones surface so admin can see what's currently live even before
  // any upload happens.
  const staticAssets = useMemo(() => listStaticAssets(), []);

  const filtered = useMemo(() => {
    let list = [...assets];
    if (source === "all" || source === "static") {
      list = [...list, ...staticAssets];
    }
    if (source === "static") {
      list = list.filter((a) => a.isStatic);
    } else if (source === "cloudinary") {
      list = list.filter((a) => !a.isStatic);
    }
    if (category !== "all")
      list = list.filter((a) => a.category === category);
    if (type !== "all")
      list = list.filter((a) =>
        type === "video"
          ? a.asset_type === "video"
          : a.asset_type !== "video"
      );
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          (a.original_name || "").toLowerCase().includes(q) ||
          (a.cloudinary_id || "").toLowerCase().includes(q) ||
          (a.slot_key || "").toLowerCase().includes(q) ||
          (Array.isArray(a.tags)
            ? a.tags.join(",").toLowerCase().includes(q)
            : false)
      );
    }
    if (showOrphans && orphanIds) {
      // Static assets are never "orphan" candidates — they are bundled.
      list = list.filter((a) => !a.isStatic && orphanIds.has(a.id));
    }
    return list;
  }, [assets, staticAssets, source, category, type, search, showOrphans, orphanIds]);

  const toggleSelect = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div>
      <PageHeader
        eyebrow="CMS · Assets"
        title="Asset Library"
        subtitle="Every image and video uploaded across the site. Filter, preview, replace, or safely delete — usage references are checked before destructive actions."
      />

      {/* Filters */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 10,
          padding: 14,
          borderRadius: 14,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(184, 149, 106, 0.18)",
          marginBottom: 18,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or tags…"
            style={{ ...inputStyle, flex: "1 1 240px", minWidth: 200 }}
          />
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            style={inputStyle}
          >
            {SOURCES.map((s) => (
              <option key={s} value={s}>
                {s === "all"
                  ? "All sources"
                  : s === "cloudinary"
                  ? "Cloudinary uploads"
                  : "Static (built-in)"}
              </option>
            ))}
          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={inputStyle}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All categories" : c}
              </option>
            ))}
          </select>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={inputStyle}
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t === "all" ? "All types" : t}
              </option>
            ))}
          </select>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              color: "#F5F1E8",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={showOrphans}
              onChange={(e) => setShowOrphans(e.target.checked)}
            />
            Show orphans only
          </label>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 12.5,
            color: "rgba(245,241,232,0.65)",
          }}
        >
          <span>
            {filtered.length} of {assets.length} assets
            {selected.size > 0 ? ` · ${selected.size} selected` : ""}
          </span>
          {selected.size > 0 && (
            <button
              type="button"
              onClick={() => {
                const first = filtered.find((a) => selected.has(a.id));
                if (first) setDeletingAsset(first);
              }}
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
              Delete first selected
            </button>
          )}
        </div>
      </div>

      {error && (
        <div
          style={{
            padding: 14,
            borderRadius: 12,
            background: "rgba(255,120,120,0.08)",
            border: "1px solid rgba(255,120,120,0.25)",
            color: "#ff9e9e",
            fontSize: 13,
            marginBottom: 18,
          }}
        >
          {error}
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 14,
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              style={{
                ...cardStyle,
                cursor: "default",
                opacity: 0.5,
                animation: "mw-pulse 1.2s ease-in-out infinite",
              }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.06)",
                  marginBottom: 10,
                }}
              />
              <div
                style={{
                  width: "70%",
                  height: 12,
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: 4,
                  marginBottom: 6,
                }}
              />
              <div
                style={{
                  width: "40%",
                  height: 10,
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: 4,
                }}
              />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          style={{
            padding: 48,
            borderRadius: 16,
            background: "rgba(255,255,255,0.04)",
            border: "1px dashed rgba(184, 149, 106, 0.3)",
            textAlign: "center",
            color: "rgba(245,241,232,0.7)",
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>
            No assets match these filters
          </div>
          <div style={{ fontSize: 13 }}>
            Upload your first asset from any editor page (Hero, Founder,
            Portfolio, etc.).
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 14,
          }}
        >
          {filtered.map((asset) => (
            <AssetCard
              key={asset.id}
              asset={asset}
              selected={selected.has(asset.id)}
              onSelect={() => toggleSelect(asset.id)}
              onClick={() => setDetailAsset(asset)}
            />
          ))}
        </div>
      )}

      {detailAsset && (
        <AssetDetailModal
          asset={detailAsset}
          onClose={() => setDetailAsset(null)}
          onDelete={() => {
            setDeletingAsset(detailAsset);
            setDetailAsset(null);
          }}
        />
      )}

      {deletingAsset && (
        <DeleteAssetDialog
          asset={{ ...deletingAsset, docId: deletingAsset.id }}
          onClose={() => setDeletingAsset(null)}
          onDeleted={() => {
            setSelected((prev) => {
              const next = new Set(prev);
              next.delete(deletingAsset.id);
              return next;
            });
          }}
        />
      )}

      <style>{`
        @keyframes mw-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}

export default AssetLibrary;
