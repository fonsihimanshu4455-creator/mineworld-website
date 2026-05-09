// Per-slot asset/text/color specs surfaced to the admin upload UI.
// Phase 1 only ships this config — the upload UI in Phase 2 will read
// it to render guidance like "Recommended: 1920x1080, max 50MB".

export const ASSET_SPECS = {
  "hero.video": {
    type: "video",
    recommended: {
      width: 1920,
      height: 1080,
      duration: "10-30s",
      maxSizeMB: 50,
    },
    aspectRatio: "16:9",
    formats: ["mp4", "webm"],
    note: "Background video for hero. Should loop seamlessly. 1920x1080 minimum.",
  },
  "hero.eyebrow": { type: "text", maxLength: 60 },
  "hero.headline": { type: "text", maxLength: 120 },
  "hero.subhead": { type: "text", maxLength: 240 },
  "hero.headline_color": { type: "color", default: "#1A1A1A" },
  "hero.subhead_color": { type: "color", default: "#4A4A4A" },
  "hero.cta_primary_label": { type: "text", maxLength: 30 },
  "hero.cta_secondary_label": { type: "text", maxLength: 30 },

  "portfolio.thumbnail": {
    type: "image",
    recommended: { width: 1600, height: 900, maxSizeMB: 5 },
    aspectRatio: "16:9",
    formats: ["jpg", "png", "webp"],
    note: "Project thumbnail. 16:9 aspect ratio. Will be auto-optimized.",
  },

  "logo_wall.client_logo": {
    type: "image",
    recommended: { width: 400, height: 200, maxSizeMB: 1 },
    aspectRatio: "2:1",
    formats: ["svg", "png"],
    note: "Client logo. Transparent background preferred. SVG ideal.",
    transparentBgRequired: true,
  },

  "team.avatar": {
    type: "image",
    recommended: { width: 800, height: 800, maxSizeMB: 2 },
    aspectRatio: "1:1",
    formats: ["jpg", "png"],
    note: "Square team member portrait.",
  },

  "founder.photo": {
    type: "image",
    recommended: { width: 1200, height: 1500, maxSizeMB: 5 },
    aspectRatio: "4:5",
    formats: ["jpg", "png"],
    note: "Founder portrait. 4:5 vertical for best fit.",
  },

  "reel.thumbnail": {
    type: "image",
    recommended: { width: 720, height: 1280, maxSizeMB: 3 },
    aspectRatio: "9:16",
    formats: ["jpg", "png"],
    note: "Reel thumbnail. Vertical 9:16 for Instagram Reels feel.",
  },

  "reel.video": {
    type: "video",
    recommended: { width: 1080, height: 1920, maxSizeMB: 100 },
    aspectRatio: "9:16",
    formats: ["mp4"],
    note: "Reel video. 9:16 vertical, max 60 seconds, max 100MB.",
  },
};

export function getAssetSpec(slotKey) {
  return ASSET_SPECS[slotKey] || null;
}
