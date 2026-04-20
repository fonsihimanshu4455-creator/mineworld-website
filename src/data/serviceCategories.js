import reelsShowcase from "../assets/reels-showcase.jpg";
import reelsShowcase1 from "../assets/reels-showcase1.jpg";
import adsShowcase from "../assets/ads-showcase.jpg";
import adsShowcase1 from "../assets/ads-showcase1.jpg";
import podcastShowcase from "../assets/podcast-showcase.jpg";
import podcastShowcase1 from "../assets/podcast-showcase1.jpg";
import podcastShowcase2 from "../assets/podcast-showcase2.jpg";
import marketing from "../assets/marketing.JPG";
import designer from "../assets/designer.JPG";
import production from "../assets/production.JPG";
import portfolio1 from "../assets/portfolio-1.mp4";
import portfolio2 from "../assets/portfolio-2.mp4";
import portfolio3 from "../assets/portfolio-3.mp4";

export const serviceCategories = [
  {
    slug: "video-editing",
    name: "Video Editing",
    short: "Reels, ads, YouTube, podcasts",
    tagline: "Retention-first editing that holds attention frame by frame.",
    cover: {
      type: "video",
      src: portfolio1,
      poster: reelsShowcase,
      alt: "Sample reel edit by Mineworld Production",
    },
    color: "gold",
    longIntro:
      "High-retention edits for reels, ads, YouTube, podcasts, and branded content — engineered to turn attention into action and strengthen brand perception.",
    included: [
      "Reels editing (retention-first)",
      "Meta ad creative editing",
      "Podcast cutdowns + short-form clips",
      "YouTube long-form editing",
      "Hook strategy + sound design",
      "Motion graphics + captioning",
      "Colour grading + audio polish",
      "Thumbnail + cover design",
    ],
    approach: [
      {
        title: "First 1 second is non-negotiable",
        text: "Every edit opens with motion + claim engineered to stop the thumb before a viewer even decides to watch.",
      },
      {
        title: "Pattern interrupts at 5–7 seconds",
        text: "Where most reels lose attention, we re-engage with a beat drop, tone shift, or visual break.",
      },
      {
        title: "Loop-ready endings",
        text: "Instagram and YouTube reward re-watches. We engineer endings that loop — multiplying retention without a single extra post.",
      },
    ],
    deliverables: [
      "Platform-ready exports (9:16, 1:1, 16:9)",
      "Organized raw + final project folders",
      "2 structured revisions per piece",
      "Thumbnail + cover images",
    ],
    caseStudySlug: "personal-brand-reel-2-5m-views",
    recommendedPlan: "growth",
  },
  {
    slug: "meta-ads-lead-generation",
    name: "Meta Ads & Lead Generation",
    short: "Paid campaigns built for real leads",
    tagline: "Creative + strategy + campaign management — one team, one outcome.",
    cover: {
      type: "image",
      src: adsShowcase,
      alt: "Meta ad creative sample",
    },
    color: "blue",
    longIntro:
      "Meta ad campaigns designed to generate real leads, real inquiries, and measurable business growth for brands, clinics, creators, and businesses in Delhi — not empty reach or vanity numbers.",
    included: [
      "Meta Ads strategy + setup",
      "Lead generation campaigns",
      "Clinic & business ads",
      "Offer-led creative production",
      "Funnel + landing page alignment",
      "Campaign monitoring + weekly iteration",
      "Retargeting ads",
      "Performance reporting",
    ],
    approach: [
      {
        title: "One offer, one treatment, one angle",
        text: "Instead of running every service at once, we concentrate budget on a single high-intent offer for 21–30 days before rotating.",
      },
      {
        title: "Creative + funnel must align",
        text: "Ad creative, landing page, and form questions work as one system — so leads arrive pre-qualified, not curious browsers.",
      },
      {
        title: "Kill fast, scale faster",
        text: "We review every 48 hours. Underperformers die quickly; winners get scaled before fatigue kicks in.",
      },
    ],
    deliverables: [
      "Campaign setup + ad creative",
      "3 hero creatives + variants per sprint",
      "Weekly performance summary",
      "Monthly strategy iteration",
    ],
    caseStudySlug: "aesthetic-clinic-lead-generation",
    recommendedPlan: "scale",
  },
  {
    slug: "social-media-management",
    name: "Social Media Management",
    short: "Page growth + consistency + positioning",
    tagline: "Structured content systems — not random posts.",
    cover: {
      type: "image",
      src: marketing,
      alt: "Social media strategy at Mineworld Production",
    },
    color: "gold",
    longIntro:
      "We don't just post content. We build structured content systems that improve page perception, consistency, and audience trust over time for brands that want long-term digital growth.",
    included: [
      "Monthly content planning",
      "Posting strategy + schedule",
      "Brand positioning + voice",
      "Engagement direction",
      "Page management (Instagram, LinkedIn)",
      "Story + reel mix planning",
      "Monthly review + iteration",
      "Analytics + reporting",
    ],
    approach: [
      {
        title: "Three content buckets",
        text: "Every piece is classified as Authority, Acquisition, or Brand — never random. If a piece doesn't fit one, it doesn't ship.",
      },
      {
        title: "System over calendar",
        text: "Calendars tell you when. Systems tell you why. Each piece feeds the next — so month 6 compounds harder than month 2.",
      },
      {
        title: "Consistent cadence, not volume",
        text: "We prioritise a realistic posting rhythm you can sustain over a burst you can't — that's what actually builds audiences.",
      },
    ],
    deliverables: [
      "Monthly content calendar",
      "Captions + hashtag direction",
      "Posting + scheduling",
      "Weekly engagement check-in",
    ],
    recommendedPlan: "growth",
  },
  {
    slug: "podcast-production",
    name: "Podcast & Content Shoots",
    short: "Studio shoots + post-production",
    tagline: "Authority-building content, not random footage.",
    cover: {
      type: "video",
      src: portfolio2,
      poster: podcastShowcase,
      alt: "Podcast production at Mineworld",
    },
    color: "blue",
    longIntro:
      "Professional podcast shoots, creator shoots, and brand content sessions designed to create reusable authority assets — every shoot day should produce weeks of platform-ready content.",
    included: [
      "Podcast shoots (full setup)",
      "Creator shoots",
      "Talking-head content",
      "Brand content sessions",
      "Authority content production",
      "Multi-angle capture",
      "Audio + lighting setup",
      "Post-production cutdowns",
    ],
    approach: [
      {
        title: "Plan for repurposing",
        text: "Every shoot day is planned to produce 6–8 short clips, 1 long-form, stills, and quotes — so one day compounds into weeks of content.",
      },
      {
        title: "Premium frame, clean audio",
        text: "Framing, lighting, and lavalier audio calibrated to broadcast standard — so clips feel legit across every platform.",
      },
      {
        title: "Authority, not volume",
        text: "A few sharp pieces that make the brand look serious beats 20 forgettable clips.",
      },
    ],
    deliverables: [
      "Full shoot day + production crew",
      "Long-form master + short cuts",
      "Audio polish + colour grade",
      "Platform-ready exports",
    ],
    recommendedPlan: "scale",
  },
  {
    slug: "graphic-design",
    name: "Graphic Design",
    short: "Visual consistency across every asset",
    tagline: "Design support that locks in your brand's premium feel.",
    cover: {
      type: "image",
      src: designer,
      alt: "Graphic design work by Mineworld Production",
    },
    color: "gold",
    longIntro:
      "Design support for everything your content system needs — carousels, thumbnails, ad creatives, stories, presentation assets, and brand consistency layers.",
    included: [
      "Carousel design",
      "Ad static creatives",
      "Thumbnail design",
      "Story templates",
      "Pitch + presentation decks",
      "Brand asset cleanup",
      "Layout + typography system",
      "Campaign visual direction",
    ],
    approach: [
      {
        title: "Consistency is a compounding asset",
        text: "Every asset follows the same visual grammar — so audiences recognise your brand in a half-second scroll.",
      },
      {
        title: "Design serves intent",
        text: "We ask what the piece should make the viewer do, then design backwards from there. Decoration isn't the goal.",
      },
      {
        title: "Templates where it makes sense",
        text: "Custom where it matters, template where it doesn't — so you get speed without sacrificing the premium feel.",
      },
    ],
    deliverables: [
      "Source files (Figma / layered)",
      "Platform-ready exports",
      "Brand-consistent asset pack",
      "2 revision rounds per asset",
    ],
    recommendedPlan: "starter",
  },
  {
    slug: "content-shoots",
    name: "Content Shoots",
    short: "Brand + product + creator shoots",
    tagline: "Shoots planned around output — not just coverage.",
    cover: {
      type: "video",
      src: portfolio3,
      poster: production,
      alt: "Content shoot production by Mineworld",
    },
    color: "blue",
    longIntro:
      "Studio + on-location shoots for brands, creators, and businesses who want content that actually drives results — reels, ads, carousel stills, web assets, all captured in one planned day.",
    included: [
      "Pre-shoot planning + shot list",
      "Studio day rental + setup",
      "Lighting + sound crew",
      "Wardrobe + styling direction",
      "Multi-format capture (reels + stills + long-form)",
      "Director + DoP on set",
      "On-set post-approval",
      "Same-day raw delivery",
    ],
    approach: [
      {
        title: "Output-first shot planning",
        text: "We plan every shot against the content it will become — so no shoot day wastes hours on footage that never ships.",
      },
      {
        title: "One day, multiple formats",
        text: "Reels, stills, quote cards, long-form, ad creative — all captured in a single planned shoot window.",
      },
      {
        title: "Director-led, not freewheel",
        text: "Someone owns the day. Energy stays focused, talent stays calibrated, and every hour earns its cost.",
      },
    ],
    deliverables: [
      "Full production day",
      "Raw footage + stills",
      "Selected takes shortlist",
      "Optional edit package add-on",
    ],
    recommendedPlan: "scale",
  },
];

export function findServiceCategory(slug) {
  return serviceCategories.find((s) => s.slug === slug);
}

export const podcastGalleryExtras = [podcastShowcase1, podcastShowcase2];
export const editingExtras = [reelsShowcase1, adsShowcase1];
