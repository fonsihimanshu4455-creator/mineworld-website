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

  // Logo display controls — admin can upload a new logo, change size,
  // change navbar alignment, or hide the Production subtitle.
  branding: {
    logoUrl: "", // empty = use bundled mineworld-logo.png
    logoSize: 40, // img width inside the navbar circle (px)
    logoCircleSize: 56, // circle diameter in navbar (px)
    logoScale: 1.7, // fine-tuned scale applied on top of size
    showName: true,
    showSubtitle: true,
    subtitle: "Production",
    navAlign: "space-between", // "space-between" | "center" | "flex-start"
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
      { id: "b1", visible: true, label: "Video Editing" },
      { id: "b2", visible: true, label: "Podcast Shoots" },
      { id: "b3", visible: true, label: "Graphic Design" },
      { id: "b4", visible: true, label: "Social Media" },
      { id: "b5", visible: true, label: "Meta Ads" },
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
      { id: "c1", visible: true, label: "Editing-First Execution" },
      { id: "c2", visible: true, label: "Premium Brand Presence" },
      { id: "c3", visible: true, label: "Studio + Digital Integration" },
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
        id: "p1",
        visible: true,
        number: "01",
        counter: "+32",
        statSuffix: " Leads in 7 Days",
        title: "Aesthetic Clinic Campaign",
        description:
          "Creative reels and Meta ads aligned for lead capture, not just reach.",
        tags: ["Reels + Ads", "Lead Generation", "Clinic Growth"],
      },
      {
        id: "p2",
        visible: true,
        number: "02",
        counter: "2.5M",
        statSuffix: " Views Reel",
        title: "Personal Brand Content",
        description:
          "Retention-first editing structure built to hold attention and drive profile interest.",
        tags: ["Retention Editing", "Reel Strategy", "Personal Brand"],
      },
      {
        id: "p3",
        visible: true,
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

  // Services section + detail pages. Every service has its own sub-services
  // list that is rendered on /services/:slug.
  services: {
    sectionTag: "Services",
    sectionTitle:
      "Video editing, ads, podcast production, and digital growth services in Delhi.",
    sectionSubtitle:
      "Mineworld Production helps brands, clinics, creators, and businesses in Delhi grow through video editing, Meta ads, podcast production, content systems, and social media management built for visibility, authority, and lead generation.",
    items: [
      {
        id: "meta-ads",
        slug: "meta-ads",
        visible: true,
        featured: true,
        title: "Meta Ads & Lead Generation in Delhi",
        subtitle: "Primary growth engine",
        shortDescription:
          "Meta ad campaigns designed to generate real leads, real inquiries, and measurable business growth for brands, clinics, creators, and businesses in Delhi — not empty reach or vanity numbers.",
        longDescription:
          "We build Meta ad campaigns that are designed to convert. From creative direction, to funnel alignment, to offer testing and audience research — every layer is optimised for actual business outcome. Whether you run a clinic, a personal brand, a local service, or an e-commerce store, our ads are engineered to bring the right people to your door.",
        heroImage: "",
        featuredNote:
          "This service exists to do one thing properly: bring serious business opportunity through sharper creative and smarter paid execution for businesses that want real lead generation in Delhi.",
        quickItems: [
          { id: "qi1", visible: true, label: "Meta Ads Strategy" },
          { id: "qi2", visible: true, label: "Lead Generation Campaigns" },
          { id: "qi3", visible: true, label: "Clinic & Business Ads" },
          { id: "qi4", visible: true, label: "Offer Testing" },
          { id: "qi5", visible: true, label: "Creative + Funnel Alignment" },
        ],
        subServices: [
          {
            id: "ss1",
            visible: true,
            title: "Lead Generation Ads",
            description:
              "High-intent lead gen campaigns with instant forms, landing pages, and WhatsApp flow integration for clinics, coaches, and services.",
          },
          {
            id: "ss2",
            visible: true,
            title: "Brand Awareness Campaigns",
            description:
              "Reach-first campaigns that put your brand in front of the exact audience you want to be perceived as premium by.",
          },
          {
            id: "ss3",
            visible: true,
            title: "Conversion & Retargeting",
            description:
              "Warm-audience retargeting with offer-led creatives to convert page visitors and video viewers into paying customers.",
          },
          {
            id: "ss4",
            visible: true,
            title: "Creative Testing System",
            description:
              "Structured A/B testing across hooks, visuals, copy, and CTAs so every rupee is spent on winning creatives only.",
          },
        ],
      },
      {
        id: "video-editing",
        slug: "video-editing",
        visible: true,
        featured: false,
        title: "Video Editing Services in Delhi",
        subtitle: "Content that converts",
        shortDescription:
          "High-retention edits for reels, ads, YouTube, podcasts, and branded content — built to turn attention into action and strengthen brand perception.",
        longDescription:
          "Our editing room treats every cut as a strategic decision. Retention, rhythm, sound design, colour, and brand tone — nothing is left to luck. We edit reels and shorts for creators, ad creatives for performance marketers, long-form for YouTube, and full podcast flows for brands that want to sound authoritative.",
        heroImage: "",
        featuredNote: "",
        quickItems: [
          { id: "vq1", visible: true, label: "Reels Editing" },
          { id: "vq2", visible: true, label: "Ad Creative Editing" },
          { id: "vq3", visible: true, label: "Podcast Editing" },
          { id: "vq4", visible: true, label: "YouTube / Long-form" },
          { id: "vq5", visible: true, label: "High-retention Hooks" },
        ],
        subServices: [
          {
            id: "ve1",
            visible: true,
            title: "Reels & Short-form Editing",
            description:
              "Fast-paced cuts with hooks, motion graphics, captions, and retention-driven pacing designed for Instagram and YouTube Shorts.",
          },
          {
            id: "ve2",
            visible: true,
            title: "YouTube Long-form Editing",
            description:
              "Full episode edits with B-roll pacing, chapters, thumbnails, and retention structuring for channels that want to grow watch-time.",
          },
          {
            id: "ve3",
            visible: true,
            title: "Podcast Post-production",
            description:
              "Multicam sync, noise cleanup, dynamic captions, highlight clip cutdowns, and multi-platform export for podcast shows.",
          },
          {
            id: "ve4",
            visible: true,
            title: "Ad Creative Editing",
            description:
              "Performance-first edits for Meta, Google, and YouTube ads with first-frame hooks, clarity, and proven ad structures.",
          },
          {
            id: "ve5",
            visible: true,
            title: "Cinematic Brand Films",
            description:
              "Colour-graded brand films, product reveals, and campaign films with cinematic motion, sound design, and premium finish.",
          },
          {
            id: "ve6",
            visible: true,
            title: "Talking-head & Testimonials",
            description:
              "Clean multi-camera cuts for CEO clips, talking-head scripts, client testimonials, and service explainers.",
          },
        ],
      },
      {
        id: "social-media",
        slug: "social-media",
        visible: true,
        featured: false,
        title: "Social Media Management in Delhi",
        subtitle: "Page growth + consistency",
        shortDescription:
          "We don’t just post content. We build structured content systems that improve page perception, consistency, and audience trust over time for brands that want long-term digital growth.",
        longDescription:
          "Social media works when it’s treated like a system, not a random posting schedule. We plan, shoot, edit, publish, and track — all under one roof, all aligned to the brand’s growth goal.",
        heroImage: "",
        featuredNote: "",
        quickItems: [
          { id: "sq1", visible: true, label: "Monthly Content Planning" },
          { id: "sq2", visible: true, label: "Posting Strategy" },
          { id: "sq3", visible: true, label: "Brand Positioning" },
          { id: "sq4", visible: true, label: "Engagement Direction" },
          { id: "sq5", visible: true, label: "Page Management" },
        ],
        subServices: [
          {
            id: "sm1",
            visible: true,
            title: "Monthly Content Calendars",
            description:
              "Strategic 30-day calendars with reel, carousel, story, and post concepts aligned to brand positioning.",
          },
          {
            id: "sm2",
            visible: true,
            title: "Instagram Page Management",
            description:
              "Full page handling — content, hashtags, scheduling, story flow, and engagement replies for consistent growth.",
          },
          {
            id: "sm3",
            visible: true,
            title: "Content Shoots + Posting",
            description:
              "Monthly content shoots paired with editing and posting so the brand shows up consistently on every platform.",
          },
          {
            id: "sm4",
            visible: true,
            title: "Analytics & Growth Reporting",
            description:
              "Monthly performance reports covering reach, saves, shares, profile visits, follower quality, and content wins.",
          },
          {
            id: "sm5",
            visible: true,
            title: "Brand Positioning Direction",
            description:
              "Tone, visual identity, content pillars, and audience framing — so the page feels like a brand, not a feed.",
          },
        ],
      },
      {
        id: "podcast-shoots",
        slug: "podcast-shoots",
        visible: true,
        featured: false,
        title: "Podcast & Content Shoots in Delhi",
        subtitle: "Authority-building content",
        shortDescription:
          "Professional podcast shoots, creator shoots, and brand content sessions designed to create reusable authority assets — not random footage.",
        longDescription:
          "Our studio and on-location setups are built for founders, coaches, clinics, and creators who want their content to feel premium. We handle lighting, audio, multicam, and a steady flow of shoot prompts so you leave with a month of usable content in one day.",
        heroImage: "",
        featuredNote: "",
        quickItems: [
          { id: "pq1", visible: true, label: "Podcast Shoots" },
          { id: "pq2", visible: true, label: "Creator Shoots" },
          { id: "pq3", visible: true, label: "Talking-head Content" },
          { id: "pq4", visible: true, label: "Brand Content Sessions" },
          { id: "pq5", visible: true, label: "Authority Content Production" },
        ],
        subServices: [
          {
            id: "ps1",
            visible: true,
            title: "Podcast Shoots (Multi-cam)",
            description:
              "2–4 camera setups with pro lighting, lav mics, and a producer to keep the flow tight and shoot-ready.",
          },
          {
            id: "ps2",
            visible: true,
            title: "Creator & Personal Brand Shoots",
            description:
              "Structured content days for creators and personal brands — talking-head scripts, reels batches, and b-roll.",
          },
          {
            id: "ps3",
            visible: true,
            title: "Clinic & Doctor Content Shoots",
            description:
              "Specialised shoots for clinics and medical brands — patient testimonials, treatment explainers, and authority content.",
          },
          {
            id: "ps4",
            visible: true,
            title: "Event & Launch Coverage",
            description:
              "Product launches, brand events, and workshops covered with multi-angle coverage, interviews, and quick-turnaround edits.",
          },
          {
            id: "ps5",
            visible: true,
            title: "Studio Rental + Crew",
            description:
              "Book our studio with crew — for in-house shoots, interviews, or your own production sessions.",
          },
        ],
      },
    ],
  },

  footer: {
    description:
      "Mineworld Production is a Delhi-based video editing and digital growth agency helping brands, creators, clinics, and businesses through content production, social media management, podcast shoots, and Meta ads services.",
    services: [
      { id: "fs1", visible: true, label: "Video Editing Services in Delhi" },
      { id: "fs2", visible: true, label: "Podcast Production in Delhi" },
      { id: "fs3", visible: true, label: "Graphic Design Support" },
      { id: "fs4", visible: true, label: "Social Media Management in Delhi" },
      { id: "fs5", visible: true, label: "Meta Ads & Digital Growth" },
    ],
    legal: "© 2026 Mineworld Production. All rights reserved.",
  },

  // Per-portfolio video URL overrides — leave empty string to use bundled video
  portfolioOverrides: {
    1: { title: "", description: "", videoUrl: "", posterUrl: "", visible: true },
    2: { title: "", description: "", videoUrl: "", posterUrl: "", visible: true },
    3: { title: "", description: "", videoUrl: "", posterUrl: "", visible: true },
    4: { title: "", description: "", videoUrl: "", posterUrl: "", visible: true },
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

// Generate a unique id for new array items in the admin panel.
export function generateId(prefix = "i") {
  return `${prefix}_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 6)}`;
}
