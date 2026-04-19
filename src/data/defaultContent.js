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
    eyebrow: "Digital Marketing · Video Editing · Shoots",
    headlineLineOne: "We grow your business",
    headlineLineTwo: "with ads, videos & shoots.",
    description:
      "Mineworld runs ads that bring real customers, edits videos that people actually watch, and shoots content that makes your brand look premium — all from one team in Delhi.",
    badges: [
      { id: "b1", visible: true, label: "Meta Ads" },
      { id: "b2", visible: true, label: "Video Editing" },
      { id: "b3", visible: true, label: "Podcast Shoots" },
      { id: "b4", visible: true, label: "Reels & Shorts" },
      { id: "b5", visible: true, label: "Social Media" },
    ],
    captionLine: "Ads. Videos. Shoots. One team.",
    overlayEyebrow: "Ads · Videos · Shoots",
    overlayLineOne: "Content that sells.",
    overlayLineTwo: "Ads that bring leads.",
    videoUrl: "",
    posterUrl: "",
  },

  cta: {
    eyebrow: "Let’s get started",
    headlineLineOne: "Ready to grow your business?",
    headlineLineTwo: "Let’s talk.",
    description:
      "Tell us what you need — ads, videos, shoots, or all of it. We’ll get back within a day with a clear plan.",
    chips: [
      { id: "c1", visible: true, label: "Fast Reply" },
      { id: "c2", visible: true, label: "Clear Pricing" },
      { id: "c3", visible: true, label: "No Long Contracts" },
    ],
  },

  results: {
    eyebrow: "Our Work in Numbers",
    headlinePrefix: "Real results.",
    headlineHighlight: "Not just posts.",
    description:
      "We don’t chase vanity metrics. Every client project is built around one thing — actual business growth.",
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

  // Services — 3 core pillars + extras. Each service opens its own page.
  services: {
    sectionTag: "What We Do",
    sectionTitle: "Three things we do really well.",
    sectionSubtitle:
      "Run ads that bring customers. Edit videos people watch. Shoot content that looks premium. Pick one, or let us handle all three.",
    items: [
      {
        id: "digital-marketing",
        slug: "digital-marketing",
        visible: true,
        featured: true,
        title: "Digital Marketing & Ads",
        subtitle: "Our core — get real customers",
        shortDescription:
          "We run Meta, Google and Instagram ads that actually bring paying customers. No vanity numbers — only real leads and sales.",
        longDescription:
          "This is our main thing. We set up ad accounts, build the creatives, write the copy, target the right people, and optimise every week — so your budget brings in real business. Works for clinics, local shops, coaches, brands, and service businesses.",
        heroImage: "",
        featuredNote:
          "Our specialty. If you want your business to grow through ads — this is what we do best.",
        quickItems: [
          { id: "qi1", visible: true, label: "Meta Ads" },
          { id: "qi2", visible: true, label: "Google Ads" },
          { id: "qi3", visible: true, label: "Lead Generation" },
          { id: "qi4", visible: true, label: "Retargeting" },
          { id: "qi5", visible: true, label: "Landing Pages" },
        ],
        subServices: [
          {
            id: "dm1",
            visible: true,
            title: "Meta (Facebook + Instagram) Ads",
            description:
              "Full campaign setup — audience research, creatives, copy, testing, and weekly optimisation.",
          },
          {
            id: "dm2",
            visible: true,
            title: "Google Ads (Search + YouTube)",
            description:
              "High-intent Search ads and video ads on YouTube for brands ready to scale.",
          },
          {
            id: "dm3",
            visible: true,
            title: "Lead Generation Campaigns",
            description:
              "Instant forms, WhatsApp click-to-chat, and landing page funnels for clinics, coaches, local services.",
          },
          {
            id: "dm4",
            visible: true,
            title: "Retargeting & Conversion",
            description:
              "Turn page visitors and video viewers into actual buyers with warm-audience ads.",
          },
          {
            id: "dm5",
            visible: true,
            title: "Landing Page Design",
            description:
              "Fast, mobile-first pages built to convert — so your ad traffic doesn’t go to waste.",
          },
          {
            id: "dm6",
            visible: true,
            title: "Social Media Management",
            description:
              "Content calendar, posting, story flow, and page growth — all handled monthly.",
          },
        ],
      },
      {
        id: "video-editing",
        slug: "video-editing",
        visible: true,
        featured: false,
        title: "Video Editing",
        subtitle: "All types — reels to long-form",
        shortDescription:
          "Reels, YouTube videos, ads, podcasts, brand films — any type of edit, done with a premium finish.",
        longDescription:
          "We edit every type of video. Short reels for Instagram, long-form for YouTube, ads that convert, podcast episodes with clean audio, brand films that look cinematic. Fast turnaround, clean finish.",
        heroImage: "",
        featuredNote: "",
        quickItems: [
          { id: "vq1", visible: true, label: "Reels & Shorts" },
          { id: "vq2", visible: true, label: "YouTube Long-form" },
          { id: "vq3", visible: true, label: "Ad Creatives" },
          { id: "vq4", visible: true, label: "Podcast Edits" },
          { id: "vq5", visible: true, label: "Brand Films" },
        ],
        subServices: [
          {
            id: "ve1",
            visible: true,
            title: "Reels & Instagram Shorts",
            description:
              "Fast cuts, hooks, captions, motion graphics — built to stop the scroll.",
          },
          {
            id: "ve2",
            visible: true,
            title: "YouTube Long-form",
            description:
              "Full episode edits with B-roll, chapters, thumbnails — optimised for watch time.",
          },
          {
            id: "ve3",
            visible: true,
            title: "Ad Creative Editing",
            description:
              "Performance edits for Meta, Google, YouTube — first-frame hooks, clear CTAs.",
          },
          {
            id: "ve4",
            visible: true,
            title: "Podcast Post-production",
            description:
              "Multi-cam sync, noise cleanup, captions, short-clip cutdowns.",
          },
          {
            id: "ve5",
            visible: true,
            title: "Cinematic Brand Films",
            description:
              "Colour grading, sound design, and motion — for launches, campaigns, product reveals.",
          },
          {
            id: "ve6",
            visible: true,
            title: "Talking-head & Testimonials",
            description:
              "Clean multi-camera cuts for founder clips, client testimonials, explainers.",
          },
          {
            id: "ve7",
            visible: true,
            title: "Wedding & Event Edits",
            description:
              "Cinematic wedding highlights, event recaps, and social cutdowns.",
          },
          {
            id: "ve8",
            visible: true,
            title: "Motion Graphics & Animation",
            description:
              "Logo reveals, animated lower-thirds, kinetic typography, infographics.",
          },
        ],
      },
      {
        id: "shoots",
        slug: "shoots",
        visible: true,
        featured: false,
        title: "Podcast & Content Shoots",
        subtitle: "Studio + on-location",
        shortDescription:
          "Podcast shoots, creator shoots, product shoots, brand content days — all with pro gear and a full crew.",
        longDescription:
          "We shoot in our studio or come to your location. Pro cameras, lighting, lav mics, and a producer to keep things moving. Leave with a month of content in one day.",
        heroImage: "",
        featuredNote: "",
        quickItems: [
          { id: "pq1", visible: true, label: "Podcast Shoots" },
          { id: "pq2", visible: true, label: "Creator Shoots" },
          { id: "pq3", visible: true, label: "Product Shoots" },
          { id: "pq4", visible: true, label: "Brand Content Days" },
          { id: "pq5", visible: true, label: "Event Coverage" },
        ],
        subServices: [
          {
            id: "ps1",
            visible: true,
            title: "Podcast Shoots (Multi-cam)",
            description:
              "2–4 cameras, pro audio, lighting, and a producer. Ready-to-edit footage.",
          },
          {
            id: "ps2",
            visible: true,
            title: "Creator & Personal Brand Shoots",
            description:
              "Content days for creators — scripts, reels batches, b-roll.",
          },
          {
            id: "ps3",
            visible: true,
            title: "Clinic & Doctor Shoots",
            description:
              "Patient testimonials, treatment explainers, authority content.",
          },
          {
            id: "ps4",
            visible: true,
            title: "Product & E-commerce Shoots",
            description:
              "Clean product shots, lifestyle imagery, unboxing videos for ads and listings.",
          },
          {
            id: "ps5",
            visible: true,
            title: "Event & Launch Coverage",
            description:
              "Multi-angle coverage of launches, conferences, workshops, with quick edits.",
          },
          {
            id: "ps6",
            visible: true,
            title: "Studio Rental with Crew",
            description:
              "Book our studio with our team for your own sessions.",
          },
          {
            id: "ps7",
            visible: true,
            title: "Graphic Design Support",
            description:
              "Thumbnails, posters, menu cards, social assets — on-demand design.",
          },
        ],
      },
    ],
  },

  // Customer reviews — shown in the right-to-left marquee.
  reviews: {
    sectionTag: "Reviews",
    sectionTitle: "What our clients say.",
    sectionSubtitle:
      "Real feedback from brands and creators we've worked with.",
    googleUrl: "",
    items: [
      {
        id: "r1",
        visible: true,
        name: "Dr. Anjali Sharma",
        role: "Aesthetic Clinic, Delhi",
        rating: 5,
        text:
          "Got 32 leads in the first week of ads. Their team handles everything — ads, reels, posting. Finally someone who understood our clinic.",
        avatar: "",
      },
      {
        id: "r2",
        visible: true,
        name: "Rahul Mehta",
        role: "Fitness Creator",
        rating: 5,
        text:
          "My reels started hitting 2M+ views after Mineworld started editing. Fast turnaround, clean cuts. Worth every rupee.",
        avatar: "",
      },
      {
        id: "r3",
        visible: true,
        name: "Priya Kapoor",
        role: "Boutique Owner",
        rating: 5,
        text:
          "They ran ads for my Diwali campaign — did ₹1.8L in sales in 10 days. No big agency fluff, just results.",
        avatar: "",
      },
      {
        id: "r4",
        visible: true,
        name: "Vikram Singh",
        role: "Podcast Host",
        rating: 5,
        text:
          "Booked their studio for a 6-episode podcast shoot. Audio, lighting, flow — everything was handled. Highly recommend.",
        avatar: "",
      },
      {
        id: "r5",
        visible: true,
        name: "Sneha Verma",
        role: "Coach & Author",
        rating: 5,
        text:
          "I came in needing help with ads. Left with a full content system — ads, reels, shoots. These guys are the real deal.",
        avatar: "",
      },
      {
        id: "r6",
        visible: true,
        name: "Arjun Patel",
        role: "D2C Brand Founder",
        rating: 5,
        text:
          "Mineworld ads brought our ROAS from 1.4x to 3.2x in two months. Creative + media buying combo actually works.",
        avatar: "",
      },
    ],
  },

  // FAQ accordion
  faq: {
    sectionTag: "FAQ",
    sectionTitle: "Quick answers.",
    sectionSubtitle:
      "Everything people usually ask us before starting a project.",
    items: [
      {
        id: "f1",
        visible: true,
        question: "How much do your services cost?",
        answer:
          "It depends on what you need. Ads start from ₹15,000/month (plus your ad spend). Video editing from ₹2,000 per reel. Full packages from ₹35,000/month. Tell us your goal and we'll send a quick quote.",
      },
      {
        id: "f2",
        visible: true,
        question: "Do you only work with clients in Delhi?",
        answer:
          "We're based in Delhi but work with clients all across India and a few overseas. Ads, editing, and social media are 100% remote. For shoots, we travel or you come to our studio.",
      },
      {
        id: "f3",
        visible: true,
        question: "How fast is the turnaround?",
        answer:
          "Reels in 24–48 hours. Long-form videos in 3–5 days. Ad campaigns go live within a week of kickoff. Podcast shoots can be booked within 3–4 days.",
      },
      {
        id: "f4",
        visible: true,
        question: "Do you handle ad budget too?",
        answer:
          "Yes. You set the budget, we run the ads directly from your ad account. We never touch your money — ad spend goes straight to Meta or Google.",
      },
      {
        id: "f5",
        visible: true,
        question: "Can I see work before booking?",
        answer:
          "Of course. Scroll up to the portfolio section, or message us on WhatsApp — we'll send relevant samples in under an hour.",
      },
      {
        id: "f6",
        visible: true,
        question: "Is there a long-term contract?",
        answer:
          "No. We work month-to-month. Most clients stay 6+ months because the work speaks for itself, but there's no lock-in.",
      },
    ],
  },

  footer: {
    description:
      "A Delhi-based team that grows your business through ads, edits videos for every platform, and shoots content that looks premium. Brands, creators, clinics — all welcome.",
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
