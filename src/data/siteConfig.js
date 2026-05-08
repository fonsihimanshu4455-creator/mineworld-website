export const siteConfig = {
  brand: {
    name: "Mineworld Production",
    shortName: "Mineworld",
    website: "https://mineworldproduction.com",
  },

  contact: {
    whatsappNumber: "919758850933",
    email: "mineworldproduction4455@gmail.com",
    address: "Mayur Vihar Phase 1, Delhi, 110091",
  },

  social: {
    instagram:
      "https://www.instagram.com/mineworld.production?igsh=MTIyYzZpOXdicXl6aw==",
  },

  seo: {
    defaultOgImage: "",
    defaultDescription:
      "Mineworld Production — Delhi-based content & digital growth studio. Premium video editing, websites, mobile apps, ad campaigns, and social media systems built for real businesses.",
  },

  chat: {
    enabled: true,
    aiMode: true,
    greeting: "Hey! 👋 How can we help?",
    quickReplies: [
      "I want a quote",
      "Tell me about packages",
      "Book a discovery call",
      "I have a different question",
    ],
  },

  newsletter: {
    enabled: true,
    title: "Get the studio newsletter",
    subtitle:
      "One email a month — what's working in content, ads, and growth. No spam.",
    ctaLabel: "Subscribe",
    successMessage: "Thanks! Check your inbox to confirm.",
  },

  integrations: {
    sheetWebhook:
      import.meta.env.VITE_SHEET_WEBHOOK_URL ||
      "https://script.google.com/macros/s/AKfycby-F_y5bbvEwCapMtOn74W7j9t65l9KnL1-bzY1gpeeS7Tbr0xc3YQrQYnW3pdi8E_bvg/exec",
  },

  sectionVisibility: {
    clientLogoWall: true,
    resultsSection: true,
    services: true,
    capabilitiesBand: true,
    trustStrip: true,
    process: false,
    portfolio: true,
    testimonials: true,
    founderSection: false,
    teamSection: false,
    editingShowcase: true,
    reelScoreTool: true,
    insightsPreview: false,
    faq: false,
  },

  sectionOrder: [
    "clientLogoWall",
    "resultsSection",
    "services",
    "capabilitiesBand",
    "trustStrip",
    "process",
    "portfolio",
    "testimonials",
    "founderSection",
    "teamSection",
    "editingShowcase",
    "reelScoreTool",
    "insightsPreview",
    "faq",
  ],

  navbar: {
    showAbout: true,
    showProcess: true,
    showInsights: true,
    showReviews: true,
    showFaq: true,
  },
};

export const sectionVisibilityMeta = [
  { key: "clientLogoWall", label: "Client Logo Wall" },
  { key: "resultsSection", label: "Results / Stats" },
  { key: "services", label: "Services" },
  { key: "capabilitiesBand", label: "Capabilities (Build / Create / Grow)" },
  { key: "trustStrip", label: "Trust Strip / Press" },
  { key: "process", label: "Process" },
  { key: "portfolio", label: "Portfolio" },
  { key: "testimonials", label: "Testimonials / Reviews" },
  { key: "founderSection", label: "About / Founder" },
  { key: "teamSection", label: "Team" },
  { key: "editingShowcase", label: "Editing Showcase" },
  { key: "reelScoreTool", label: "Reel Score Tool" },
  { key: "insightsPreview", label: "Insights Preview" },
  { key: "faq", label: "FAQ" },
];