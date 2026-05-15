// Per-slot asset/text/color specs surfaced to the admin upload UI.
// Every editor reads from this map to render a "Recommended: WxH, max
// N MB, formats: …" hint above the upload area so admins know what to
// drop in. Add an entry here for every new slot.

export const ASSET_SPECS = {
  // ─────────── HERO ───────────
  "hero.video": {
    type: "video",
    recommended: {
      width: 1920,
      height: 1080,
      duration: "10-30s",
      maxSizeMB: 50,
    },
    aspectRatio: "16:9 (horizontal)",
    formats: ["mp4", "webm"],
    note: "Background video for the hero. Should loop seamlessly (last frame should match first). Cloudinary auto-derives the poster from frame 1 — no separate poster upload needed.",
  },
  "hero.eyebrow": { type: "text", maxLength: 60 },
  "hero.headline": { type: "text", maxLength: 120 },
  "hero.subhead": { type: "text", maxLength: 240 },
  "hero.headline_color": { type: "color", default: "#1A1A1A" },
  "hero.subhead_color": { type: "color", default: "#4A4A4A" },
  "hero.cta_primary_label": { type: "text", maxLength: 30 },
  "hero.cta_secondary_label": { type: "text", maxLength: 30 },

  // ─────────── NAVBAR ───────────
  "navbar.logo": {
    type: "image",
    recommended: { width: 400, height: 120, maxSizeMB: 0.5 },
    aspectRatio: "≈ 10:3 (wide) — transparent PNG or SVG",
    formats: ["svg", "png", "webp"],
    note: "Navbar logo. Transparent background REQUIRED. SVG is ideal (scales perfectly). Keep it under 500 KB.",
    transparentBgRequired: true,
  },

  // ─────────── FOOTER ───────────
  "footer.logo": {
    type: "image",
    recommended: { width: 500, height: 150, maxSizeMB: 0.5 },
    aspectRatio: "≈ 10:3 (wide) — transparent PNG or SVG",
    formats: ["svg", "png", "webp"],
    note: "Footer logo. Transparent background REQUIRED. SVG is ideal. Looks best on dark navy bg.",
    transparentBgRequired: true,
  },

  // ─────────── FOUNDER ───────────
  "founder.photo": {
    type: "image",
    recommended: { width: 1200, height: 1500, maxSizeMB: 5 },
    aspectRatio: "4:5 (vertical portrait)",
    formats: ["jpg", "png"],
    note: "Founder portrait. 4:5 vertical fits the section card. Shoot at minimum 1200px wide for retina-sharp display.",
  },

  // ─────────── PORTFOLIO ───────────
  "portfolio.thumbnail": {
    type: "image",
    recommended: { width: 1600, height: 900, maxSizeMB: 5 },
    aspectRatio: "16:9 (horizontal)",
    formats: ["jpg", "png", "webp"],
    note: "Listing card thumbnail (shown on /portfolio grid). 16:9 horizontal. JPG fine; SVG/PNG if it has transparency.",
  },
  "portfolio.hero_media": {
    type: "image",
    recommended: { width: 1600, height: 2000, maxSizeMB: 8 },
    aspectRatio: "4:5 (vertical) for image · 16:9 OK for video",
    formats: ["jpg", "png", "webp", "mp4"],
    note: "Big hero on the detail page (/portfolio/:slug). Image OR video. Vertical 4:5 fits the layout best. For video: max 30s, max 50MB.",
  },
  "portfolio.gallery_item": {
    type: "image",
    recommended: { width: 1200, height: 800, maxSizeMB: 4 },
    aspectRatio: "3:2 (horizontal)",
    formats: ["jpg", "png", "webp", "mp4"],
    note: "Gallery item on the detail page. Horizontal 3:2 fits the grid. Always add alt text below the upload.",
  },

  // ─────────── SERVICES ───────────
  "services.cover_image": {
    type: "image",
    recommended: { width: 1600, height: 1200, maxSizeMB: 5 },
    aspectRatio: "4:3 (horizontal)",
    formats: ["jpg", "png", "webp", "mp4"],
    note: "Service card cover image. 4:3 horizontal for best fit. Can also be a short looping mp4.",
  },

  // ─────────── TEAM ───────────
  "team.avatar": {
    type: "image",
    recommended: { width: 800, height: 800, maxSizeMB: 2 },
    aspectRatio: "1:1 (square)",
    formats: ["jpg", "png"],
    note: "Square team-member portrait. Centred face, shoulders visible. Min 600px to look sharp on retina.",
  },

  // ─────────── LOGO WALL ───────────
  "logo_wall.client_logo": {
    type: "image",
    recommended: { width: 400, height: 200, maxSizeMB: 0.5 },
    aspectRatio: "2:1 (horizontal)",
    formats: ["svg", "png", "webp"],
    note: "Client logo for the wall. Transparent background REQUIRED. SVG ideal. Avoid logos with thick coloured backgrounds — they'll clash with the cream surface.",
    transparentBgRequired: true,
  },

  // ─────────── REELS ───────────
  "reel.thumbnail": {
    type: "image",
    recommended: { width: 720, height: 1280, maxSizeMB: 3 },
    aspectRatio: "9:16 (vertical)",
    formats: ["jpg", "png"],
    note: "Reel thumbnail. Vertical 9:16 (Instagram Reel / TikTok / YouTube Shorts proportions).",
  },
  "reel.video": {
    type: "video",
    recommended: { width: 1080, height: 1920, maxSizeMB: 100 },
    aspectRatio: "9:16 (vertical)",
    formats: ["mp4"],
    note: "Reel video. 9:16 vertical, max 60 seconds, max 100 MB.",
  },

  // ─────────── EDITING SHOWCASE ───────────
  "editing.before_image": {
    type: "image",
    recommended: { width: 1280, height: 720, maxSizeMB: 4 },
    aspectRatio: "16:9 (horizontal)",
    formats: ["jpg", "png", "webp"],
    note: "Before-edit still. 16:9 horizontal. Same dimensions as the After image so the comparison aligns.",
  },
  "editing.after_image": {
    type: "image",
    recommended: { width: 1280, height: 720, maxSizeMB: 4 },
    aspectRatio: "16:9 (horizontal)",
    formats: ["jpg", "png", "webp"],
    note: "After-edit still. Must match the Before image dimensions for a clean comparison slider.",
  },

  // ─────────── PRESS / FEATURED IN ───────────
  "press.logo": {
    type: "image",
    recommended: { width: 400, height: 200, maxSizeMB: 0.5 },
    aspectRatio: "2:1 (horizontal)",
    formats: ["svg", "png", "webp"],
    note: "Press / publication logo. Transparent background REQUIRED. SVG preferred.",
    transparentBgRequired: true,
  },
};

// Pattern resolver. Given a slot key, return the matching spec.
// Supports exact match (preferred) and a few semantic aliases used by
// list items where the slot key isn't unique per row.
export function getAssetSpec(slotKey) {
  if (!slotKey) return null;
  if (ASSET_SPECS[slotKey]) return ASSET_SPECS[slotKey];
  // Aliases — list items inside a RepeatingListEditor pass these
  // patterns via the field config so the same spec applies to every row.
  const aliases = {
    "portfolio.items.thumbnail": "portfolio.thumbnail",
    "portfolio.items.hero_media": "portfolio.hero_media",
    "portfolio.items.gallery": "portfolio.gallery_item",
    "services.items.cover_image": "services.cover_image",
    "team.members.avatar": "team.avatar",
    "logo_wall.client_logos.logo": "logo_wall.client_logo",
    "editing.pairs.before_image": "editing.before_image",
    "editing.pairs.after_image": "editing.after_image",
    "reel.videos.video": "reel.video",
    "reel.videos.thumbnail": "reel.thumbnail",
    "trust.featured_in_logos.logo": "press.logo",
  };
  return ASSET_SPECS[aliases[slotKey]] || null;
}
