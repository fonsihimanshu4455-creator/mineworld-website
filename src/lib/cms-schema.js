// Firestore collection contracts for the new CMS (PR-CMS-1).
//
// The existing `content` collection (settings, portfolio items, team
// roles, etc.) is UNTOUCHED — these two new collections live alongside
// it and are managed by the new admin asset/content tooling.

export const ASSETS_COLLECTION = "assets";
export const SITE_CONTENT_COLLECTION = "site_content";

// Shape of a doc in the `assets` collection.
// Doc id should be the Cloudinary public_id with slashes replaced by `__`
// (Firestore doc ids cannot contain `/`). The original public_id is kept
// in the `cloudinary_id` field.
export const assetDocShape = {
  cloudinary_id: "string",
  cloudinary_url: "string",
  asset_type: "image | video | logo",
  original_name: "string",
  width: "number",
  height: "number",
  size_bytes: "number",
  duration_seconds: "number | null",
  format: "string",
  category: "hero | portfolio | logo-wall | team | reel-showcase | misc",
  tags: "string[]",
  uploaded_by: "string (Firebase Auth UID)",
  created_at: "Timestamp",
  updated_at: "Timestamp",
};

// Shape of a doc in the `site_content` collection.
// Doc id is the slot_key (e.g. "hero.video", "hero.headline").
//
// `cloudinary_url` is denormalized onto the doc when slot_type === 'asset'
// to avoid a second Firestore read on every page load.
export const siteContentDocShape = {
  slot_key: "string",
  slot_type: "asset | text | color | json",
  asset_id: "string | null",
  cloudinary_url: "string | null (denormalized for asset slots)",
  text_value: "string | null",
  color_value: "string | null (#RRGGBB)",
  json_value: "object | null",
  updated_by: "string (Firebase Auth UID) | null",
  updated_at: "Timestamp",
};

// Slot keys the website currently uses. Phase 1 only wires Hero — but
// every key listed here will be seeded as an empty doc on first run so
// admin can edit any of them as future phases are wired up.
export const SLOT_DEFINITIONS = [
  // Hero
  { key: "hero.video", type: "asset", category: "hero" },
  {
    key: "hero.eyebrow",
    type: "text",
    default: "PRODUCTION HOUSE • DELHI",
  },
  { key: "hero.headline", type: "text", default: "" },
  { key: "hero.headline_color", type: "color", default: "#1A1A1A" },
  { key: "hero.subhead", type: "text", default: "" },
  { key: "hero.subhead_color", type: "color", default: "#4A4A4A" },
  { key: "hero.cta_primary_label", type: "text", default: "Start a Project" },
  {
    key: "hero.cta_secondary_label",
    type: "text",
    default: "View Our Work",
  },

  // Trust strip
  { key: "trust.featured_in_logos", type: "json", default: { items: [] } },

  // Services
  { key: "services.eyebrow", type: "text", default: "" },
  { key: "services.headline", type: "text", default: "" },
  { key: "services.cards", type: "json", default: { items: [] } },

  // Portfolio
  { key: "portfolio.items", type: "json", default: { items: [] } },

  // Team
  { key: "team.members", type: "json", default: { items: [] } },

  // Logo wall
  { key: "logo_wall.client_logos", type: "json", default: { items: [] } },

  // Founder
  { key: "founder.photo", type: "asset", category: "team" },
  { key: "founder.name", type: "text", default: "" },
  { key: "founder.title", type: "text", default: "" },
  { key: "founder.bio", type: "text", default: "" },

  // Reel showcase
  { key: "reel.videos", type: "json", default: { items: [] } },

  // Footer
  { key: "footer.tagline", type: "text", default: "" },
  { key: "footer.address", type: "text", default: "" },
  { key: "footer.email", type: "text", default: "" },
  { key: "footer.phone", type: "text", default: "" },
  { key: "footer.social_links", type: "json", default: { items: [] } },
];

// Firestore doc ids cannot contain `/`. Cloudinary public_ids commonly
// have folder slashes (e.g. "mineworld/hero/abc123"). Encode/decode here
// so we can round-trip safely.
export function encodeAssetDocId(publicId) {
  return publicId.replace(/\//g, "__");
}
export function decodeAssetDocId(docId) {
  return docId.replace(/__/g, "/");
}
