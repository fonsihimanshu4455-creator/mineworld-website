import video1 from "../assets/portfolio-1.mp4";
import video2 from "../assets/portfolio-2.mp4";
import video3 from "../assets/portfolio-3.mp4";
import video4 from "../assets/portfolio-4.mp4";

import production from "../assets/production.JPG";
import podcastShowcase from "../assets/podcast-showcase.jpg";
import podcastShowcase1 from "../assets/podcast-showcase1.jpg";
import podcastShowcase2 from "../assets/podcast-showcase2.jpg";
import adsShowcase from "../assets/ads-showcase.jpg";
import adsShowcase1 from "../assets/ads-showcase1.jpg";
import designer from "../assets/designer.JPG";
import reelsShowcase from "../assets/reels-showcase.jpg";
import reelsShowcase1 from "../assets/reels-showcase1.jpg";
import marketing from "../assets/marketing.JPG";

export const portfolioItems = [
  {
    slug: "lead-generation-creative-system",
    title: "Lead Generation Creative System",
    category: "Ads + Editing + Conversion",
    short:
      "A complete paid-creative system engineered to convert cold scrollers into real inquiries.",
    description:
      "Creative assets built to help brands attract attention, generate stronger inquiries, and convert viewers into real business opportunity.",
    longDescription:
      "A multi-week creative sprint combining offer strategy, hook testing, and retention-first editing. We built three hero creatives, ran a 3-day test budget to identify the winner, then scaled aggressively across warm and cold audiences. Every asset was shot with conversion psychology in mind — problem → offer → outcome in under 15 seconds.",
    cover: {
      type: "video",
      src: video1,
      poster: production,
      alt: "Lead generation ad creative sample",
    },
    gallery: [
      { type: "image", src: adsShowcase, alt: "Ad creative variant 1" },
      { type: "image", src: adsShowcase1, alt: "Ad creative variant 2" },
    ],
    resultPoints: [
      "High-retention ad creatives",
      "Built for lead generation",
      "Optimized for paid performance",
    ],
    metrics: [
      { label: "Qualified Leads", value: "+32 in 7 days" },
      { label: "Cost per Lead", value: "₹135" },
      { label: "Ad CTR", value: "3.2%" },
    ],
    roles: ["Creative direction", "Shoot", "Editing", "Ad copy", "Campaign setup"],
    tools: ["Premiere Pro", "After Effects", "Meta Ads Manager"],
    caseStudySlug: "aesthetic-clinic-lead-generation",
    serviceSlug: "meta-ads-lead-generation",
  },
  {
    slug: "podcast-authority-content",
    title: "Podcast Authority Content",
    category: "Content + Brand Trust",
    short:
      "One shoot day → weeks of authority-building content across every platform.",
    description:
      "Podcast shoots and edits designed to build authority, strengthen trust, and create reusable multi-platform content.",
    longDescription:
      "A single planned shoot day produced a long-form podcast master, 8 short-form cutdowns, quote cards, and still assets. Every cut was timed for the opening hook, with on-screen captions and sound design calibrated for silent scroll behaviour.",
    cover: {
      type: "video",
      src: video2,
      poster: podcastShowcase,
      alt: "Podcast production showcase",
    },
    gallery: [
      { type: "image", src: podcastShowcase1, alt: "Podcast still 1" },
      { type: "image", src: podcastShowcase2, alt: "Podcast still 2" },
    ],
    resultPoints: [
      "Authority-driven content",
      "Long-form + short clips",
      "Repurposed for growth",
    ],
    metrics: [
      { label: "Output per shoot day", value: "8 short cuts + 1 long-form" },
      { label: "Platforms", value: "Reels · Shorts · LinkedIn · YouTube" },
      { label: "Turnaround", value: "5 working days" },
    ],
    roles: ["Shoot direction", "Set + audio", "Editing", "Captioning"],
    tools: ["Premiere Pro", "DaVinci Resolve", "Descript"],
    serviceSlug: "podcast-production",
  },
  {
    slug: "ad-performance-visuals",
    title: "Ad Performance Visuals",
    category: "Meta Ads + Lead Flow",
    short:
      "Ad creatives engineered for first-frame attention and conversion lift.",
    description:
      "Video assets shaped for first-frame attention, stronger clarity, and better lead performance across campaigns.",
    longDescription:
      "A sprint of 6 ad variants built around a single offer. Each variant tested a different hook structure while keeping body + CTA consistent — isolating what actually moved CTR and cost-per-lead.",
    cover: {
      type: "video",
      src: video3,
      poster: adsShowcase,
      alt: "Ad performance creative sample",
    },
    gallery: [
      { type: "image", src: adsShowcase1, alt: "Ad variant" },
      { type: "image", src: reelsShowcase1, alt: "Ad creative still" },
    ],
    resultPoints: [
      "Ad-ready creative direction",
      "Fast hook-focused edits",
      "Lead-focused visuals",
    ],
    metrics: [
      { label: "ROAS improvement", value: "+2.4x vs prior" },
      { label: "Creative variants", value: "6 hooks tested" },
      { label: "Winning hook CTR", value: "3.2%" },
    ],
    roles: ["Hook strategy", "Editing", "Motion graphics", "Ad variant QA"],
    tools: ["Premiere Pro", "After Effects", "Meta Ads Manager"],
    caseStudySlug: "local-business-revenue-driven",
    serviceSlug: "meta-ads-lead-generation",
  },
  {
    slug: "social-media-growth-content",
    title: "Social Media Growth Content",
    category: "Page Management + Growth",
    short:
      "Content systems built for consistency, engagement, and page perception.",
    description:
      "Content systems designed to improve consistency, engagement, and overall page perception for serious brands.",
    longDescription:
      "A monthly content calendar combining retention-first reels, carousel teaching, and story-driven daily engagement. Every piece classified as Authority, Acquisition, or Brand — no random posts. The system runs on a 4-week cycle with monthly strategy iteration.",
    cover: {
      type: "video",
      src: video4,
      poster: designer,
      alt: "Social media content system",
    },
    gallery: [
      { type: "image", src: reelsShowcase, alt: "Reel still 1" },
      { type: "image", src: marketing, alt: "Content strategy still" },
    ],
    resultPoints: [
      "Engagement-first content",
      "Better page perception",
      "Growth-oriented posting assets",
    ],
    metrics: [
      { label: "Monthly output", value: "16 reels + 12 carousels" },
      { label: "Watch time improvement", value: "+3.4x" },
      { label: "Page profile visits", value: "+186K / month" },
    ],
    roles: ["Content planning", "Editing", "Design", "Engagement direction"],
    tools: ["Premiere Pro", "Figma", "Notion"],
    caseStudySlug: "personal-brand-reel-2-5m-views",
    serviceSlug: "social-media-management",
  },
];

export function findPortfolioItem(slug) {
  return portfolioItems.find((p) => p.slug === slug);
}
