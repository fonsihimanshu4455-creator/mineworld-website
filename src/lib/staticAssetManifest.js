// staticAssetManifest — maps CMS slot keys to the bundled asset URLs
// the public site currently uses. Surfaces "what's live now" inside
// admin so editors see the current production state immediately on
// open, even if no Cloudinary upload has happened yet.
//
// Vite resolves the import URLs at build time (with content hashing),
// so paths in the manifest stay valid even after asset moves.
//
// To add a slot:
//   1. import the bundled asset at the top
//   2. add an entry below

import heroVideo from "../assets/hero-video.mp4";
import heroPoster from "../assets/hero.png";
import founderPhoto from "../assets/himanshu.JPG";
import mineworldLogo from "../assets/mineworld-logo.png";
import reelsShowcase from "../assets/reels-showcase.jpg";
import reelsShowcase1 from "../assets/reels-showcase1.jpg";
import podcastShowcase from "../assets/podcast-showcase.jpg";
import podcastShowcase1 from "../assets/podcast-showcase1.jpg";
import adsShowcase from "../assets/ads-showcase.jpg";
import adsShowcase1 from "../assets/ads-showcase1.jpg";

export const STATIC_ASSETS = {
  "hero.video": {
    type: "video",
    url: heroVideo,
    poster: heroPoster,
    originalSource: "src/assets/hero-video.mp4",
    category: "hero",
    isStatic: true,
    label: "Built-in hero video",
  },
  "hero.poster": {
    type: "image",
    url: heroPoster,
    originalSource: "src/assets/hero.png",
    category: "hero",
    isStatic: true,
    label: "Hero poster (first-frame fallback)",
  },
  "founder.photo": {
    type: "image",
    url: founderPhoto,
    originalSource: "src/assets/himanshu.JPG",
    category: "founder",
    isStatic: true,
    label: "Built-in founder portrait",
  },
  "nav.logo": {
    type: "image",
    url: mineworldLogo,
    originalSource: "src/assets/mineworld-logo.png",
    category: "brand",
    isStatic: true,
    label: "Brand logo (navbar + footer)",
  },
  "footer.logo": {
    type: "image",
    url: mineworldLogo,
    originalSource: "src/assets/mineworld-logo.png",
    category: "brand",
    isStatic: true,
    label: "Footer logo",
  },
  "editing.pair_reel.before": {
    type: "image",
    url: reelsShowcase,
    originalSource: "src/assets/reels-showcase.jpg",
    category: "editing-showcase",
    isStatic: true,
    label: "Reel — before (raw clip)",
  },
  "editing.pair_reel.after": {
    type: "image",
    url: reelsShowcase1,
    originalSource: "src/assets/reels-showcase1.jpg",
    category: "editing-showcase",
    isStatic: true,
    label: "Reel — after (retention edit)",
  },
  "editing.pair_podcast.before": {
    type: "image",
    url: podcastShowcase,
    originalSource: "src/assets/podcast-showcase.jpg",
    category: "editing-showcase",
    isStatic: true,
    label: "Podcast — before",
  },
  "editing.pair_podcast.after": {
    type: "image",
    url: podcastShowcase1,
    originalSource: "src/assets/podcast-showcase1.jpg",
    category: "editing-showcase",
    isStatic: true,
    label: "Podcast — after",
  },
  "editing.pair_ads.before": {
    type: "image",
    url: adsShowcase,
    originalSource: "src/assets/ads-showcase.jpg",
    category: "editing-showcase",
    isStatic: true,
    label: "Ads — before",
  },
  "editing.pair_ads.after": {
    type: "image",
    url: adsShowcase1,
    originalSource: "src/assets/ads-showcase1.jpg",
    category: "editing-showcase",
    isStatic: true,
    label: "Ads — after",
  },
};

export function getStaticAsset(slotKey) {
  return STATIC_ASSETS[slotKey] || null;
}

// Iterate every static asset entry — used by the Asset Library to
// render built-in assets alongside Cloudinary uploads.
export function listStaticAssets() {
  return Object.entries(STATIC_ASSETS).map(([slotKey, info]) => ({
    id: `static:${slotKey}`,
    slot_key: slotKey,
    cloudinary_url: info.url,
    cloudinary_id: null,
    asset_type: info.type,
    original_name: info.originalSource.split("/").pop(),
    category: info.category,
    isStatic: true,
    originalSource: info.originalSource,
    label: info.label,
    width: null,
    height: null,
    size_bytes: null,
    format: info.originalSource.split(".").pop().toLowerCase(),
  }));
}
