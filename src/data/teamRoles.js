import editor from "../assets/editor.JPG";
import marketing from "../assets/marketing.JPG";
import production from "../assets/production.JPG";
import designer from "../assets/designer.JPG";

export const teamRoles = [
  {
    slug: "lead-editor",
    name: "Lead Editor",
    role: "Motion + Retention Specialist",
    short: "The editing standard behind every Mineworld delivery.",
    photo: editor,
    photoAlt: "Lead Editor at Mineworld Production",
    tags: ["Reels", "Pacing", "Retention", "Motion Graphics", "Sound Design"],
    intro:
      "Builds sharp, fast-paced edits designed for retention, rhythm, premium finish, and stronger content perception across reels, ads, podcasts, and branded formats.",
    owns: [
      "Retention-first edit structure (first 1s, 7s, loop trigger)",
      "Sound design + pacing calibration",
      "Motion graphics + typography layer",
      "Colour + audio polish + final exports",
    ],
    worksOn: [
      "Brand reels",
      "Meta ad creatives",
      "Podcast cutdowns",
      "YouTube long-form",
    ],
    relatedServiceSlug: "video-editing",
    footer:
      "This role represents the editing standard Mineworld is built on: precision, speed, premium finish, and platform-aware visual control.",
  },
  {
    slug: "growth-strategist",
    name: "Growth Strategist",
    role: "Ads + Social Direction",
    short: "Connects content, campaigns, and platform behaviour.",
    photo: marketing,
    photoAlt: "Growth Strategist at Mineworld Production",
    tags: ["Strategy", "Ads", "Content", "Funnels", "Analytics"],
    intro:
      "Connects content, campaigns, page management, and platform behavior so visuals don't just look good — they support reach, inquiries, and brand growth.",
    owns: [
      "Monthly content + ad strategy",
      "Offer framing + funnel alignment",
      "Campaign performance reviews",
      "Cross-platform distribution planning",
    ],
    worksOn: [
      "Meta ad campaigns",
      "Content calendars",
      "Lead generation funnels",
      "Creative iteration cycles",
    ],
    relatedServiceSlug: "meta-ads-lead-generation",
  },
  {
    slug: "studio-producer",
    name: "Studio Producer",
    role: "Shoot + Setup Execution",
    short: "Owns shoot-day energy, setup quality, and production flow.",
    photo: production,
    photoAlt: "Studio Producer at Mineworld Production",
    tags: ["Studio", "Podcast", "Production", "Lighting", "Audio"],
    intro:
      "Handles indoor production standards, setup quality, podcast shoot flow, and content environments built for authority and polished delivery.",
    owns: [
      "Pre-shoot shot list + prep",
      "Lighting, framing, and audio setup",
      "On-set direction + talent calibration",
      "Raw footage organization + handoff",
    ],
    worksOn: [
      "Podcast shoots",
      "Creator + brand shoots",
      "Studio days",
      "Talking-head content",
    ],
    relatedServiceSlug: "podcast-production",
  },
  {
    slug: "creative-support",
    name: "Creative Support",
    role: "Design + Asset Support",
    short: "The visual consistency layer across every deliverable.",
    photo: designer,
    photoAlt: "Creative Support at Mineworld Production",
    tags: ["Design", "Assets", "Carousels", "Thumbnails", "Brand"],
    intro:
      "Supports every content system with thumbnails, social assets, campaign creatives, layout cleanup, and presentation consistency across platforms.",
    owns: [
      "Thumbnail + cover design",
      "Carousel + static ad design",
      "Story templates + presentation assets",
      "Brand consistency checks",
    ],
    worksOn: [
      "Carousels",
      "Static ads",
      "Thumbnails",
      "Pitch decks",
    ],
    relatedServiceSlug: "graphic-design",
  },
];

export function findTeamRole(slug) {
  return teamRoles.find((r) => r.slug === slug);
}
