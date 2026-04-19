// Default editable content for the Mineworld site.
// All values can be overridden at runtime via the admin panel (localStorage).
// Anything NOT in here stays hardcoded in the components.

export const defaultContent = {
  brand: {
    name: "Mineworld Production",
    shortName: "Mineworld",
    website: "https://mineworldproduction.com",
    tagline: "Editing + Content + Digital Growth",
  },

  contact: {
    phonePrimary: "+91 9758850933",
    whatsappNumber: "919758850933",
    email: "mineworldproduction4455@gmail.com",
    address: "Mayur Vihar Phase 1, Delhi, 110091",
    addressMapUrl:
      "https://maps.google.com/?q=Mayur+Vihar+Phase+1+Delhi+110091",
  },

  social: {
    instagram:
      "https://www.instagram.com/mineworld.production?igsh=MTIyYzZpOXdicXl6aw==",
    websiteUrl: "https://www.mineworldproduction.com",
  },

  hero: {
    eyebrow: "Editing + Content + Digital Growth",
    headlineLineOne: "Video Editing & Digital Growth",
    headlineLineTwo: "Agency in Delhi",
    description:
      "Mineworld Production is a Delhi-based video editing and digital growth agency helping brands, creators, clinics, and businesses grow through premium video editing, podcast shoots, graphic design support, social media management, and Meta ads services.",
    badges: [
      "Video Editing",
      "Podcast Shoots",
      "Graphic Design",
      "Social Media",
      "Meta Ads",
    ],
    captionLine: "Content. Design. Ads. Presence.",
    overlayEyebrow: "Video + Design + Digital",
    overlayLineOne: "Premium content systems",
    overlayLineTwo: "built to strengthen brand presence",
    videoUrl: "",
    posterUrl: "",
  },

  cta: {
    eyebrow: "Start with Mineworld",
    headlineLineOne: "If your brand still looks ordinary,",
    headlineLineTwo: "that’s the problem.",
    description:
      "Mineworld is built for brands, creators, clinics, and businesses that want stronger content, sharper editing, better digital presence, and more premium brand perception across platforms.",
    chips: [
      "Editing-First Execution",
      "Premium Brand Presence",
      "Studio + Digital Integration",
    ],
  },

  results: {
    eyebrow: "Proof of Outcome",
    headlinePrefix: "Real results.",
    headlineHighlight: "Not just content.",
    description:
      "Mineworld is not being built to make content look busy. It is being built to make brands look sharper, convert stronger, and feel more difficult to ignore.",
    proofCards: [
      {
        number: "01",
        counter: "+32",
        statSuffix: " Leads in 7 Days",
        title: "Aesthetic Clinic Campaign",
        description:
          "Creative reels and Meta ads aligned for lead capture, not just reach.",
        tags: ["Reels + Ads", "Lead Generation", "Clinic Growth"],
      },
      {
        number: "02",
        counter: "2.5M",
        statSuffix: " Views Reel",
        title: "Personal Brand Content",
        description:
          "Retention-first editing structure built to hold attention and drive profile interest.",
        tags: ["Retention Editing", "Reel Strategy", "Personal Brand"],
      },
      {
        number: "03",
        counter: "₹1.8L",
        statSuffix: " Revenue Driven",
        title: "Local Business Promotion",
        description:
          "Offer-led creative direction and paid campaign execution focused on business outcome.",
        tags: ["Offer Creative", "Paid Growth", "Revenue Focus"],
      },
    ],
  },

  founder: {
    name: "Himanshu Bhardwaj",
    role: "Founder, Mineworld Production",
  },

  footer: {
    description:
      "Mineworld Production is a Delhi-based video editing and digital growth agency helping brands, creators, clinics, and businesses through content production, social media management, podcast shoots, and Meta ads services.",
    services: [
      "Video Editing Services in Delhi",
      "Podcast Production in Delhi",
      "Graphic Design Support",
      "Social Media Management in Delhi",
      "Meta Ads & Digital Growth",
    ],
    legal: "© 2026 Mineworld Production. All rights reserved.",
  },

  // Per-portfolio video URL overrides — leave empty string to use bundled video
  portfolioOverrides: {
    1: { title: "", description: "", videoUrl: "" },
    2: { title: "", description: "", videoUrl: "" },
    3: { title: "", description: "", videoUrl: "" },
    4: { title: "", description: "", videoUrl: "" },
  },
};

// Deep merge two plain objects (overrides take precedence; arrays replaced wholly).
export function mergeContent(base, override) {
  if (!override || typeof override !== "object") return base;
  const out = Array.isArray(base) ? [...base] : { ...base };
  for (const key of Object.keys(override)) {
    const a = base?.[key];
    const b = override[key];
    if (
      a &&
      typeof a === "object" &&
      !Array.isArray(a) &&
      b &&
      typeof b === "object" &&
      !Array.isArray(b)
    ) {
      out[key] = mergeContent(a, b);
    } else if (b !== undefined) {
      out[key] = b;
    }
  }
  return out;
}
