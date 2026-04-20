import { caseStudies } from "./caseStudies";

export const industryPages = [
  {
    slug: "clinic-marketing-delhi",
    industry: "Clinic Marketing",
    hero: {
      eyebrow: "For Delhi clinics · Aesthetic · Dental · Wellness",
      title: "Lead-generation content systems for Delhi clinics.",
      subtitle:
        "Real consultations booked through sharper Meta ads, doctor-led video content, and offer funnels built around one high-intent treatment at a time.",
    },
    painPoints: [
      {
        pain: "Meta ads running but low-intent form fills",
        fix: "Offer-led creative + pre-qualifying form copy",
      },
      {
        pain: "Generic clinic reels that don't build trust",
        fix: "Doctor-led authority content with retention structure",
      },
      {
        pain: "No visibility on which campaign actually drives bookings",
        fix: "Tracked attribution + weekly performance reviews",
      },
      {
        pain: "Inconsistent posting killing Instagram reach",
        fix: "Monthly content calendar + structured posting system",
      },
    ],
    services: [
      "Meta Ads for Clinics",
      "Doctor-led Reels",
      "Before/After Content",
      "Offer Campaigns",
      "Landing Page Alignment",
      "Consultation Booking Funnels",
    ],
    caseStudySlug: "aesthetic-clinic-lead-generation",
    stats: [
      { value: "+32", label: "Leads in 7 days" },
      { value: "₹135", label: "Cost per lead" },
      { value: "3.2%", label: "Ad CTR" },
    ],
    recommendedPlan: "scale",
  },
  {
    slug: "d2c-brand-ads-delhi",
    industry: "D2C Brand Ads",
    hero: {
      eyebrow: "For Delhi D2C + product brands",
      title: "Paid creative + content systems for D2C brands.",
      subtitle:
        "Not just product shots. Story-driven video ads, retention-first reels, and offer campaigns engineered for ROAS — not vanity reach.",
    },
    painPoints: [
      {
        pain: "High ad spend, low ROAS, plateaued revenue",
        fix: "Offer-led creative refresh + variant testing framework",
      },
      {
        pain: "Product-heavy ads that don't convert",
        fix: "Problem → offer → outcome storytelling in 15 seconds",
      },
      {
        pain: "No content system beyond ads — organic feels dead",
        fix: "Brand reels + social management integrated with ad creative",
      },
      {
        pain: "Creative fatigue hitting every 2-3 weeks",
        fix: "Fresh creative batches + proven hook templates",
      },
    ],
    services: [
      "Meta Ads Creative",
      "D2C Brand Reels",
      "Product-led Video Ads",
      "Offer Campaigns",
      "Retargeting Creative",
      "Landing Page Videos",
    ],
    caseStudySlug: "local-business-revenue-driven",
    stats: [
      { value: "4.6x", label: "ROAS achieved" },
      { value: "₹1.8L", label: "Revenue in 21 days" },
      { value: "94", label: "New customers" },
    ],
    recommendedPlan: "growth",
  },
  {
    slug: "creator-editing-delhi",
    industry: "Creator Editing",
    hero: {
      eyebrow: "For Delhi creators + personal brands",
      title: "Retention-first editing for creators who want to grow.",
      subtitle:
        "Your ideas deserve edits that actually hold attention. Reels engineered around first-frame hooks, pattern interrupts, and loop triggers that Instagram rewards.",
    },
    painPoints: [
      {
        pain: "Reels flatlining at 5-10K views",
        fix: "Hook restructure + retention audit on your last 20 reels",
      },
      {
        pain: "Great content idea, weak execution",
        fix: "Retention-first editing + sound design that earns re-watches",
      },
      {
        pain: "Inconsistent posting = inconsistent growth",
        fix: "8 reels / month retainer with monthly planning call",
      },
      {
        pain: "No clear brand positioning",
        fix: "Profile + content positioning as part of monthly strategy",
      },
    ],
    services: [
      "Retention-first Reel Editing",
      "Hook Strategy",
      "YouTube Long-form Editing",
      "Podcast Cutdowns",
      "Profile Positioning",
      "Monthly Content Planning",
    ],
    caseStudySlug: "personal-brand-reel-2-5m-views",
    stats: [
      { value: "2.5M", label: "Views on single reel" },
      { value: "+14.8K", label: "Followers added" },
      { value: "19.1s", label: "Avg watch time" },
    ],
    recommendedPlan: "starter",
  },
];

export function findIndustryPage(slug) {
  return industryPages.find((p) => p.slug === slug);
}

export function getRelatedCaseStudy(page) {
  if (!page?.caseStudySlug) return null;
  return caseStudies.find((c) => c.slug === page.caseStudySlug) || null;
}
