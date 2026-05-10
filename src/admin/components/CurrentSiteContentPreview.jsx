// CurrentSiteContentPreview — displays the legacy "what's live now"
// data above a RepeatingListEditor. Read-only; admins see the
// production state and decide whether to override it via the editor.
//
// When the CMS slot has its own items, this panel hides automatically
// (the editor itself is the source of truth at that point).

import { useState } from "react";
import { saveSlot, useSlotDoc } from "../cmsStore";

const wrapStyle = {
  marginBottom: 18,
  padding: 14,
  borderRadius: 14,
  background: "rgba(217, 185, 135, 0.06)",
  border: "1px dashed rgba(217, 185, 135, 0.35)",
};

const headerStyle = {
  fontSize: 11,
  fontWeight: 700,
  color: "var(--accent-gold)",
  letterSpacing: 1.6,
  textTransform: "uppercase",
  marginBottom: 4,
};

const titleStyle = {
  fontSize: 14,
  fontWeight: 700,
  color: "#F5F1E8",
  marginBottom: 8,
};

const itemStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "8px 10px",
  borderRadius: 10,
  background: "rgba(0,0,0,0.18)",
  border: "1px solid rgba(184, 149, 106, 0.12)",
  fontSize: 12.5,
  color: "rgba(245,241,232,0.85)",
};

function newId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `id-${Math.random().toString(36).slice(2, 10)}-${Date.now()}`;
}

// Map a legacy item into a generic admin-shape item that
// RepeatingListEditor understands: ids + visible + raw fields.
// Asset-shaped fields (objects with src/url, or string URLs to bundled
// files) get passed through as a Cloudinary-compatible object so the
// inline-uploader recognises them.
function legacyToAdminItem(item) {
  const next = { id: newId(), visible: true };
  Object.entries(item).forEach(([k, v]) => {
    if (typeof v === "string") {
      // probably already plain text (name, role, etc.)
      next[k] = v;
    } else if (Array.isArray(v)) {
      next[k] = v.join("\n"); // multiline-fields expect joined string
    } else if (v && typeof v === "object" && (v.src || v.url)) {
      // image / video reference → fake an "uploaded" shape so the
      // inline media field shows the existing asset until admin
      // replaces it.
      next[k] = {
        cloudinary_url: v.src || v.url,
        cloudinary_id: null,
        asset_type: v.type === "video" ? "video" : "image",
        asset_id: null,
      };
    } else if (v != null) {
      next[k] = v;
    }
  });
  return next;
}

export default function CurrentSiteContentPreview({
  slotKey,
  legacyItems,
  describeItem,
  thumbnailKeys = ["logo", "photo", "thumbnail", "src", "logo_image"],
  hideWhenSlotPopulated = true,
}) {
  const slotDoc = useSlotDoc(slotKey);
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState("");

  // Hide once the admin has actually saved items into this slot.
  const slotItems =
    Array.isArray(slotDoc.data?.json_value?.items)
      ? slotDoc.data.json_value.items
      : null;
  if (
    hideWhenSlotPopulated &&
    slotItems &&
    slotItems.length > 0
  ) {
    return null;
  }

  if (!Array.isArray(legacyItems) || legacyItems.length === 0) return null;

  const handleImport = async () => {
    if (
      !confirm(
        `Copy all ${legacyItems.length} existing items into the editor below so you can edit them inline?`
      )
    )
      return;
    setImporting(true);
    setImportError("");
    try {
      const adminItems = legacyItems.map(legacyToAdminItem);
      await saveSlot(slotKey, {
        slot_type: "json",
        json_value: { items: adminItems },
        asset_id: null,
        cloudinary_id: null,
        cloudinary_url: null,
        asset_type: null,
        text_value: null,
        color_value: null,
      });
    } catch (err) {
      setImportError(err?.message || "Import failed");
    } finally {
      setImporting(false);
    }
  };

  const pickThumbnail = (item) => {
    for (const key of thumbnailKeys) {
      const v = item?.[key];
      if (typeof v === "string" && v) return v;
      if (v && typeof v === "object" && v.url) return v.url;
      if (v && typeof v === "object" && v.src) return v.src;
    }
    if (item?.cover?.src) return item.cover.src;
    return null;
  };

  return (
    <div style={wrapStyle}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 8,
        }}
      >
        <div>
          <div style={headerStyle}>Current site content</div>
          <div style={titleStyle}>
            {legacyItems.length}{" "}
            {legacyItems.length === 1 ? "item is" : "items are"} currently
            live (using the bundled defaults). The editor below is empty
            by design — start fresh, or import the live content to edit
            it inline.
          </div>
        </div>
        <button
          type="button"
          onClick={handleImport}
          disabled={importing}
          style={{
            padding: "8px 14px",
            borderRadius: 999,
            border: "none",
            background: "linear-gradient(135deg, #BC9966, #D9B987)",
            color: "#1F2D4D",
            fontSize: 12,
            fontWeight: 800,
            cursor: importing ? "not-allowed" : "pointer",
            opacity: importing ? 0.6 : 1,
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
          title="Copy these items into the editor so you can edit them inline. The public site will keep rendering identically."
        >
          {importing
            ? "Importing…"
            : `Edit existing ${legacyItems.length} →`}
        </button>
      </div>
      {importError && (
        <div
          style={{
            marginBottom: 10,
            padding: "8px 10px",
            borderRadius: 8,
            background: "rgba(255,120,120,0.08)",
            border: "1px solid rgba(255,120,120,0.25)",
            color: "#ff9e9e",
            fontSize: 12,
          }}
        >
          {importError}
        </div>
      )}
      <div style={{ display: "grid", gap: 6, maxHeight: 220, overflowY: "auto" }}>
        {legacyItems.map((item, i) => {
          const thumb = pickThumbnail(item);
          const summary = describeItem
            ? describeItem(item)
            : item.name || item.title || `Item ${i + 1}`;
          return (
            <div key={i} style={itemStyle}>
              {thumb ? (
                <img
                  src={thumb}
                  alt=""
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    objectFit: "cover",
                    background: "rgba(0,0,0,0.32)",
                    flexShrink: 0,
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    background: "rgba(255,255,255,0.06)",
                    display: "grid",
                    placeItems: "center",
                    color: "rgba(245,241,232,0.4)",
                    fontSize: 14,
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  ▦
                </div>
              )}
              <div
                style={{
                  flex: 1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {summary}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
