// CurrentSiteContentPreview — displays the legacy "what's live now"
// data above a RepeatingListEditor. Read-only; admins see the
// production state and decide whether to override it via the editor.
//
// When the CMS slot has its own items, this panel hides automatically
// (the editor itself is the source of truth at that point).

import { useSlotDoc } from "../cmsStore";

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

export default function CurrentSiteContentPreview({
  slotKey,
  legacyItems,
  describeItem,
  thumbnailKeys = ["logo", "photo", "thumbnail", "src", "logo_image"],
  hideWhenSlotPopulated = true,
}) {
  const slotDoc = useSlotDoc(slotKey);

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
      <div style={headerStyle}>Current site content</div>
      <div style={titleStyle}>
        {legacyItems.length}{" "}
        {legacyItems.length === 1 ? "item is" : "items are"} currently live
        on the public site (using the bundled defaults). The CMS slot for
        this section is empty — the editor below is also empty by design.
        When you save your first item, this preview hides and the public
        site switches to your edits.
      </div>
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
