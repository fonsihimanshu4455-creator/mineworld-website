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
  cloudinary_id: "string | null (raw public_id, denormalized for asset slots)",
  cloudinary_url: "string | null (denormalized for asset slots)",
  asset_type: "image | video | logo | null (denormalized for asset slots)",
  text_value: "string | null",
  color_value: "string | null (#RRGGBB)",
  json_value: "object | null",
  updated_by: "string (Firebase Auth UID) | null",
  updated_at: "Timestamp",
};

// Slot keys the website currently uses. Every key listed here is seeded
// as an empty doc on first run so admin can edit any of them.
//
// Slot-key naming: section.field (or section.subsection.field for repeating
// item collections). Rich-text fields use plain text storage with the
// markdown-lite syntax described in src/lib/richText.jsx.
export const SLOT_DEFINITIONS = [
  // ──────────────── Hero ────────────────
  { key: "hero.video", type: "asset", category: "hero" },
  { key: "hero.poster", type: "asset", category: "hero" },
  { key: "hero.eyebrow", type: "text", default: "" },
  { key: "hero.headline", type: "text", default: "" },
  { key: "hero.headline_rich", type: "text", default: "" },
  { key: "hero.headline_color", type: "color", default: "#1A1A1A" },
  { key: "hero.subhead", type: "text", default: "" },
  { key: "hero.subhead_color", type: "color", default: "#4A4A4A" },
  { key: "hero.cta_primary_label", type: "text", default: "Start a Project" },
  { key: "hero.cta_primary_link", type: "text", default: "" },
  { key: "hero.cta_secondary_label", type: "text", default: "View Our Work" },
  { key: "hero.cta_secondary_link", type: "text", default: "" },

  // ──────────────── Manifesto ────────────────
  { key: "manifesto.eyebrow", type: "text", default: "" },
  { key: "manifesto.headline_rich", type: "text", default: "" },
  { key: "manifesto.subhead", type: "text", default: "" },
  { key: "manifesto.tags", type: "json", default: { items: [] } },

  // ──────────────── Capabilities (Build / Create / Grow) ────────────────
  { key: "capabilities.eyebrow", type: "text", default: "" },
  { key: "capabilities.headline_rich", type: "text", default: "" },
  { key: "capabilities.subhead", type: "text", default: "" },
  { key: "capabilities.pillars", type: "json", default: { items: [] } },
  { key: "capabilities.tools_label", type: "text", default: "Tools we ship with" },

  // ──────────────── Services ────────────────
  { key: "services.eyebrow", type: "text", default: "" },
  { key: "services.headline", type: "text", default: "" },
  { key: "services.subhead", type: "text", default: "" },
  { key: "services.items", type: "json", default: { items: [] } },

  // ──────────────── Process ────────────────
  { key: "process.eyebrow", type: "text", default: "" },
  { key: "process.headline", type: "text", default: "" },
  { key: "process.subhead", type: "text", default: "" },
  { key: "process.steps", type: "json", default: { items: [] } },

  // ──────────────── Editing Showcase ────────────────
  { key: "editing.eyebrow", type: "text", default: "" },
  { key: "editing.headline_rich", type: "text", default: "" },
  { key: "editing.subhead", type: "text", default: "" },
  { key: "editing.before_label", type: "text", default: "Before" },
  { key: "editing.after_label", type: "text", default: "After" },
  { key: "editing.pairs", type: "json", default: { items: [] } },
  { key: "reel.videos", type: "json", default: { items: [] } },

  // ──────────────── Testimonials / Reviews ────────────────
  { key: "testimonials.eyebrow", type: "text", default: "" },
  { key: "testimonials.headline", type: "text", default: "" },
  { key: "testimonials.subhead", type: "text", default: "" },
  { key: "testimonials.items", type: "json", default: { items: [] } },
  { key: "testimonials.allow_public_submissions", type: "text", default: "true" },

  // ──────────────── Portfolio (section copy + items) ────────────────
  { key: "portfolio.eyebrow", type: "text", default: "" },
  { key: "portfolio.headline", type: "text", default: "" },
  { key: "portfolio.subhead", type: "text", default: "" },
  { key: "portfolio.items", type: "json", default: { items: [] } },

  // ──────────────── Team (section copy + members) ────────────────
  { key: "team.eyebrow", type: "text", default: "" },
  { key: "team.headline", type: "text", default: "" },
  { key: "team.subhead", type: "text", default: "" },
  { key: "team.members", type: "json", default: { items: [] } },

  // ──────────────── Trust strip (Featured-in + Apps-we-ship) ────────────────
  { key: "trust.featured_eyebrow", type: "text", default: "As Featured In" },
  { key: "trust.featured_heading", type: "text", default: "" },
  { key: "trust.featured_in_logos", type: "json", default: { items: [] } },
  { key: "trust.apps_eyebrow", type: "text", default: "Apps We Ship" },
  { key: "trust.apps_heading", type: "text", default: "" },
  { key: "trust.apps_description", type: "text", default: "" },

  // ──────────────── Logo wall ────────────────
  { key: "logo_wall.client_logos", type: "json", default: { items: [] } },

  // ──────────────── Founder ────────────────
  { key: "founder.photo", type: "asset", category: "founder" },
  { key: "founder.eyebrow", type: "text", default: "Founder" },
  { key: "founder.section_heading", type: "text", default: "" },
  { key: "founder.column_heading_rich", type: "text", default: "" },
  { key: "founder.main_paragraph", type: "text", default: "" },
  { key: "founder.bullets", type: "json", default: { items: [] } },
  { key: "founder.note_eyebrow", type: "text", default: "Founder Note" },
  { key: "founder.note_text", type: "text", default: "" },
  { key: "founder.cta_primary_label", type: "text", default: "" },
  { key: "founder.cta_secondary_label", type: "text", default: "" },
  { key: "founder.name", type: "text", default: "" },
  { key: "founder.title", type: "text", default: "" },
  { key: "founder.bio", type: "text", default: "" },

  // ──────────────── CTA section ────────────────
  { key: "cta.eyebrow", type: "text", default: "Start with Mineworld" },
  { key: "cta.headline_rich", type: "text", default: "" },
  { key: "cta.subhead", type: "text", default: "" },
  { key: "cta.primary_label", type: "text", default: "Start a Project" },
  { key: "cta.primary_link", type: "text", default: "" },
  { key: "cta.secondary_label", type: "text", default: "Book a Call" },
  { key: "cta.secondary_link", type: "text", default: "" },
  { key: "cta.feature_pills", type: "json", default: { items: [] } },

  // ──────────────── Navbar ────────────────
  { key: "navbar.cta_label", type: "text", default: "Start a Project" },
  { key: "navbar.cta_link", type: "text", default: "" },
  { key: "navbar.nav_items", type: "json", default: { items: [] } },
  { key: "navbar.logo", type: "asset", category: "brand" },
  { key: "navbar.logo_size", type: "text", default: "40" },
  { key: "navbar.logo_position", type: "text", default: "left" },
  { key: "navbar.logo_alt", type: "text", default: "Mineworld Production logo" },

  // ──────────────── Footer ────────────────
  { key: "footer.tagline", type: "text", default: "" },
  { key: "footer.address", type: "text", default: "" },
  { key: "footer.email", type: "text", default: "" },
  { key: "footer.phone", type: "text", default: "" },
  { key: "footer.social_links", type: "json", default: { items: [] } },
  { key: "footer.cta_eyebrow", type: "text", default: "Start with Mineworld" },
  { key: "footer.cta_headline", type: "text", default: "" },
  { key: "footer.cta_feature_pills", type: "json", default: { items: [] } },
  { key: "footer.brand_description", type: "text", default: "" },
  { key: "footer.signature_text", type: "text", default: "Mineworld Production" },
  { key: "footer.nav_links", type: "json", default: { items: [] } },
  { key: "footer.services_links", type: "json", default: { items: [] } },
  { key: "footer.copyright", type: "text", default: "" },
  { key: "footer.logo", type: "asset", category: "brand" },
  { key: "footer.logo_size", type: "text", default: "44" },
  { key: "footer.logo_alt", type: "text", default: "Mineworld Production logo" },
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
