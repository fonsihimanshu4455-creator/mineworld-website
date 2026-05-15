const commonFields = {
  slug: { key: "slug", label: "Slug (URL)", type: "slug", required: true },
  title: { key: "title", label: "Title", type: "text", required: true },
  short: { key: "short", label: "Short description", type: "textarea" },
  category: { key: "category", label: "Category", type: "text" },
  description: { key: "description", label: "Description", type: "textarea" },
};

const mediaFieldFor = (label, opts = {}) => ({
  key: opts.key || "src",
  label,
  type: "media-src",
  hint: opts.hint,
  recommendedSize: opts.recommendedSize,
  accept: opts.accept,
});

export const schemas = {
  portfolioItems: {
    label: "Portfolio",
    singular: "Portfolio Item",
    idKey: "slug",
    titleKey: "title",
    fields: [
      commonFields.slug,
      commonFields.title,
      commonFields.category,
      commonFields.short,
      { key: "description", label: "Description", type: "textarea" },
      { key: "longDescription", label: "Long description", type: "textarea" },
      {
        key: "cover",
        label: "Cover media",
        type: "media",
        subFields: [
          { key: "type", label: "Type", type: "select", options: ["image", "video"] },
          mediaFieldFor("File / URL", {
            recommendedSize: "1600×1200 (4:3) or 1920×1080 (16:9)",
            hint: "Upload, paste a URL, or drag & drop. JPG/WebP/MP4 work best.",
          }),
          mediaFieldFor("Poster (for video)", {
            key: "poster",
            recommendedSize: "1920×1080 (16:9)",
            hint: "First-frame fallback shown before the video plays.",
            accept: "image/*",
          }),
          { key: "alt", label: "Alt text", type: "text" },
        ],
      },
      { key: "resultPoints", label: "Result points (one per line)", type: "string-list" },
      { key: "roles", label: "Roles (one per line)", type: "string-list" },
      { key: "tools", label: "Tools (one per line)", type: "string-list" },
      {
        key: "metrics",
        label: "Metrics",
        type: "objects-list",
        subFields: [
          { key: "label", label: "Label", type: "text" },
          { key: "value", label: "Value", type: "text" },
        ],
      },
      {
        key: "gallery",
        label: "Gallery (images)",
        type: "objects-list",
        subFields: [
          { key: "type", label: "Type", type: "select", options: ["image", "video"] },
          mediaFieldFor("File / URL", {
            recommendedSize: "1600×1200",
            hint: "Drag & drop or paste a URL. Keep each under 700KB.",
          }),
          { key: "alt", label: "Alt text", type: "text" },
        ],
      },
      { key: "caseStudySlug", label: "Case study slug", type: "text" },
      { key: "serviceSlug", label: "Service slug", type: "text" },
    ],
  },

  serviceCategories: {
    label: "Services",
    singular: "Service",
    idKey: "slug",
    titleKey: "name",
    fields: [
      commonFields.slug,
      { key: "name", label: "Name", type: "text", required: true },
      { key: "short", label: "Short tagline", type: "text" },
      { key: "tagline", label: "Hero tagline", type: "textarea" },
      { key: "longIntro", label: "Long intro", type: "textarea" },
      { key: "color", label: "Accent (gold/blue)", type: "select", options: ["gold", "blue"] },
      { key: "flagship", label: "Flagship service (top of grid)", type: "boolean" },
      {
        key: "cover",
        label: "Cover media",
        type: "media",
        subFields: [
          { key: "type", label: "Type", type: "select", options: ["image", "video"] },
          mediaFieldFor("File / URL", {
            recommendedSize: "1600×1200 (4:3)",
            hint: "Upload, paste a URL, or drag & drop. Keep under 700KB or paste a CDN URL.",
          }),
          mediaFieldFor("Poster (for video)", {
            key: "poster",
            recommendedSize: "1920×1080 (16:9)",
            accept: "image/*",
          }),
          { key: "alt", label: "Alt text", type: "text" },
        ],
      },
      { key: "included", label: "What's included (one per line)", type: "string-list" },
      {
        key: "approach",
        label: "Approach principles",
        type: "objects-list",
        subFields: [
          { key: "title", label: "Title", type: "text" },
          { key: "text", label: "Text", type: "textarea" },
        ],
      },
      { key: "deliverables", label: "Deliverables (one per line)", type: "string-list" },
      { key: "caseStudySlug", label: "Case study slug", type: "text" },
      { key: "recommendedPlan", label: "Recommended plan id", type: "text" },
    ],
  },

  teamRoles: {
    label: "Team",
    singular: "Team Role",
    idKey: "slug",
    titleKey: "name",
    fields: [
      commonFields.slug,
      { key: "name", label: "Name", type: "text", required: true },
      { key: "role", label: "Role", type: "text" },
      { key: "short", label: "Short tagline", type: "text" },
      mediaFieldFor("Photo", {
        key: "photo",
        recommendedSize: "1200×1500 (4:5 portrait)",
        hint: "Drag & drop or paste a URL. JPG/WebP works best.",
        accept: "image/*",
      }),
      { key: "photoAlt", label: "Photo alt", type: "text" },
      { key: "intro", label: "Intro", type: "textarea" },
      { key: "tags", label: "Tags (one per line)", type: "string-list" },
      { key: "owns", label: "What they own (one per line)", type: "string-list" },
      { key: "worksOn", label: "Works on (one per line)", type: "string-list" },
      { key: "relatedServiceSlug", label: "Related service slug", type: "text" },
      { key: "footer", label: "Footer note", type: "textarea" },
    ],
  },

  testimonials: {
    label: "Testimonials",
    singular: "Testimonial",
    idKey: "id",
    titleKey: "author",
    fields: [
      { key: "id", label: "ID (unique)", type: "slug", required: true },
      { key: "type", label: "Type", type: "select", options: ["text", "video"] },
      { key: "quote", label: "Review / Quote", type: "textarea" },
      { key: "rating", label: "Star rating (1-5)", type: "number" },
      { key: "author", label: "Author", type: "text", required: true },
      { key: "role", label: "Role", type: "text" },
      { key: "location", label: "Location", type: "text" },
      { key: "industry", label: "Industry", type: "text" },
      { key: "result", label: "Result badge", type: "text" },
      { key: "accent", label: "Accent (gold/blue)", type: "select", options: ["gold", "blue"] },
      { key: "caseStudy", label: "Case study slug", type: "text" },
      mediaFieldFor("Video src (for video)", {
        key: "videoSrc",
        recommendedSize: "1080×1920 (9:16) for reels, 1920×1080 (16:9) for landscape",
        hint: "Upload an MP4 (under 700KB) or paste a CDN URL.",
        accept: "video/*",
      }),
      mediaFieldFor("Poster (for video)", {
        key: "poster",
        recommendedSize: "1080×1920 (9:16)",
        accept: "image/*",
      }),
    ],
  },

  caseStudies: {
    label: "Case Studies",
    singular: "Case Study",
    idKey: "slug",
    titleKey: "title",
    fields: [
      commonFields.slug,
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      commonFields.title,
      { key: "summary", label: "Summary", type: "textarea" },
      { key: "industry", label: "Industry", type: "text" },
      { key: "location", label: "Location", type: "text" },
      { key: "timeline", label: "Timeline", type: "text" },
      { key: "services", label: "Services used (one per line)", type: "string-list" },
      {
        key: "heroMedia",
        label: "Hero media",
        type: "media",
        subFields: [
          { key: "type", label: "Type", type: "select", options: ["image", "video"] },
          mediaFieldFor("File / URL", {
            recommendedSize: "1920×1080 (16:9)",
            hint: "High-quality hero image or short video for the case study top.",
          }),
          { key: "alt", label: "Alt text", type: "text" },
        ],
      },
      {
        key: "metrics",
        label: "Before/After metrics",
        type: "objects-list",
        subFields: [
          { key: "label", label: "Label", type: "text" },
          { key: "before", label: "Before", type: "text" },
          { key: "after", label: "After", type: "text" },
        ],
      },
      { key: "challenge", label: "Challenge", type: "textarea" },
      { key: "approach", label: "Approach (one per line)", type: "string-list" },
      { key: "execution", label: "Execution (one per line)", type: "string-list" },
      {
        key: "testimonial",
        label: "Testimonial",
        type: "media",
        subFields: [
          { key: "quote", label: "Quote", type: "textarea" },
          { key: "author", label: "Author", type: "text" },
          { key: "role", label: "Role", type: "text" },
        ],
      },
      { key: "nextSteps", label: "Next steps", type: "textarea" },
      { key: "tags", label: "Tags (one per line)", type: "string-list" },
    ],
  },

  pricingPlans: {
    label: "Pricing",
    singular: "Pricing Plan",
    idKey: "id",
    titleKey: "name",
    fields: [
      { key: "id", label: "ID", type: "slug", required: true },
      { key: "name", label: "Name", type: "text", required: true },
      {
        key: "type",
        label: "Type",
        type: "select",
        options: ["monthly", "project"],
      },
      { key: "tagline", label: "Tagline", type: "text" },
      { key: "monthly", label: "Headline price", type: "text" },
      { key: "monthlyNote", label: "Price note (per month / one-time)", type: "text" },
      { key: "bestFor", label: "Best for", type: "textarea" },
      { key: "cta", label: "CTA label", type: "text" },
      { key: "highlights", label: "Highlights (one per line)", type: "string-list" },
      { key: "accent", label: "Accent (gold/blue)", type: "select", options: ["gold", "blue"] },
      { key: "featured", label: "Featured (most popular)", type: "boolean" },
    ],
  },

  faqItems: {
    label: "FAQs",
    singular: "FAQ",
    idKey: "q",
    titleKey: "q",
    fields: [
      { key: "q", label: "Question", type: "text", required: true },
      { key: "a", label: "Answer", type: "textarea", required: true },
    ],
  },

  insights: {
    label: "Insights",
    singular: "Article",
    idKey: "slug",
    titleKey: "title",
    fields: [
      commonFields.slug,
      commonFields.title,
      { key: "excerpt", label: "Excerpt", type: "textarea" },
      { key: "category", label: "Category", type: "text" },
      { key: "readTime", label: "Read time (e.g. 6 min read)", type: "text" },
      { key: "date", label: "Date (YYYY-MM-DD)", type: "text" },
      { key: "author", label: "Author", type: "text" },
      mediaFieldFor("Cover image", {
        key: "cover",
        recommendedSize: "1600×900 (16:9)",
        hint: "Drag & drop or paste a URL. Optional — falls back to category.",
        accept: "image/*",
      }),
      {
        key: "content",
        label: "Content blocks",
        type: "objects-list",
        subFields: [
          { key: "type", label: "Type (p/h2)", type: "select", options: ["p", "h2"] },
          { key: "text", label: "Text", type: "textarea" },
        ],
      },
    ],
  },

  clientBrands: {
    label: "Client Brands",
    singular: "Brand",
    idKey: "name",
    titleKey: "name",
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "industry", label: "Industry", type: "text" },
      mediaFieldFor("Logo (upload or URL)", {
        key: "logo",
        recommendedSize: "400×400 (square) or 600×200 (wordmark)",
        hint: "PNG/SVG with transparent background works best. Drag & drop or paste a URL.",
        accept: "image/*",
      }),
    ],
  },

  capabilityPillars: {
    label: "Capabilities (Build/Create/Grow)",
    singular: "Pillar",
    idKey: "label",
    titleKey: "title",
    fields: [
      { key: "label", label: "Label (Build / Create / Grow)", type: "text", required: true },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea" },
      { key: "bullets", label: "Bullets (one per line)", type: "string-list" },
      { key: "accent", label: "Accent (gold/blue)", type: "select", options: ["gold", "blue"] },
    ],
  },

  techStack: {
    label: "Tech Stack Logos",
    singular: "Tech Logo",
    idKey: "name",
    titleKey: "name",
    fields: [
      { key: "name", label: "Display name (e.g. Next.js)", type: "text", required: true },
      {
        key: "slug",
        label: "Simple Icons slug",
        type: "text",
        hint: "Browse simpleicons.org/ for the slug — e.g. nextdotjs, react, flutter, shopify.",
      },
      { key: "color", label: "Brand colour (hex without #)", type: "text" },
      mediaFieldFor("Custom logo (overrides slug)", {
        key: "customLogo",
        recommendedSize: "120×120 SVG / PNG",
        hint: "Optional. Upload your own logo to override the simple-icons fetch.",
        accept: "image/svg+xml,image/png,image/webp",
      }),
    ],
  },

  pressLogos: {
    label: 'Press / "Featured In"',
    singular: "Press Mention",
    idKey: "name",
    titleKey: "name",
    fields: [
      { key: "name", label: "Publication name", type: "text", required: true },
      {
        key: "style",
        label: "Wordmark style",
        type: "select",
        options: ["serif", "sans-bold"],
      },
      { key: "url", label: "Article URL (optional)", type: "text" },
      mediaFieldFor("Logo image (optional)", {
        key: "logo",
        recommendedSize: "320×80 wordmark or 200×200 monogram",
        hint: "Optional — if blank, the wordmark name will render in the chosen style.",
        accept: "image/*",
      }),
    ],
  },
};

export const collectionOrder = [
  "serviceCategories",
  "portfolioItems",
  "pricingPlans",
  "capabilityPillars",
  "techStack",
  "pressLogos",
  "teamRoles",
  "testimonials",
  "caseStudies",
  "insights",
  "faqItems",
  // clientBrands is intentionally hidden from the legacy sidebar —
  // it's superseded by the CMS Client Logos editor at
  // /admin/cms/client-logos which writes to Firestore + Cloudinary.
  // The schema definition + data file are kept because the CMS editor
  // imports them as the seed for "Edit existing →".
];
