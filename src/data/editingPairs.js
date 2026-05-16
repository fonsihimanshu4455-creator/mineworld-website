// Before/after editing pairs shown in the "Editing Showcase" slider.
// This is the bundled default. It's editable from the admin in two
// places:
//   • Legacy → Editing Before/After  (CollectionEditor, URL/drag-drop)
//   • CMS · Content → Editing Showcase (Cloudinary upload, live sync)
// EditingShowcase.jsx resolves in priority: CMS slot → legacy
// collection override → this bundled default.

import reelsShowcase from "../assets/reels-showcase.jpg";
import reelsShowcase1 from "../assets/reels-showcase1.jpg";
import podcastShowcase from "../assets/podcast-showcase.jpg";
import podcastShowcase1 from "../assets/podcast-showcase1.jpg";
import adsShowcase from "../assets/ads-showcase.jpg";
import adsShowcase1 from "../assets/ads-showcase1.jpg";

export const beforeAfterPairs = [
  {
    id: "reel",
    eyebrow: "Brand Reel",
    title: "Raw clip vs retention-first edit",
    description:
      "Same raw footage — rebuilt around first-frame attention, motion pacing, and a loop-ready finish that pushes re-watches.",
    before: reelsShowcase,
    after: reelsShowcase1,
  },
  {
    id: "podcast",
    eyebrow: "Podcast Cutdown",
    title: "Long recording vs platform-ready clip",
    description:
      "From a 60-minute recording to a 40-second clip engineered for authority and shareability across Reels, Shorts, and LinkedIn.",
    before: podcastShowcase,
    after: podcastShowcase1,
  },
  {
    id: "ads",
    eyebrow: "Meta Ad",
    title: "Generic creative vs conversion creative",
    description:
      "Product-heavy visual reshaped into an offer-led ad — stronger hook, clearer claim, visible outcome, explicit CTA.",
    before: adsShowcase,
    after: adsShowcase1,
  },
];
