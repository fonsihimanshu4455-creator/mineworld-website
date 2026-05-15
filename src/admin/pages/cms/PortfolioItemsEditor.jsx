import { useMemo } from "react";
import { PageHeader } from "../Dashboard";
import TextEditor from "../../components/TextEditor";
import RepeatingListEditor from "../../components/RepeatingListEditor";
import CurrentSiteContentPreview from "../../components/CurrentSiteContentPreview";
import EditorSection from "../../components/EditorSection";
import { useSlotDoc } from "../../cmsStore";
import { portfolioItems } from "../../../data/portfolioItems";
import { serviceCategories } from "../../../data/serviceCategories";
import { caseStudies } from "../../../data/caseStudies";
import {
  CardPreview,
  HeroPreview,
  MetricsPreview,
  GalleryPreview,
  DeliverablesPreview,
  RolePreview,
  TechPreview,
  LinksPreview,
} from "./PortfolioPreviews";

// Map a legacy portfolio item into the admin item shape so the
// "Edit existing →" import seeds the editor with everything the
// detail page already renders today (cover, gallery, metrics,
// resultPoints, roles, tools, longDescription, slug, etc.).
function legacyPortfolioToAdminItem(item) {
  const mediaFromCover = (cover) => {
    if (!cover) return null;
    return {
      cloudinary_url: cover.src || "",
      cloudinary_id: null,
      asset_id: null,
      asset_type: cover.type === "video" ? "video" : "image",
      poster_url: cover.poster || "",
      alt: cover.alt || "",
    };
  };
  const galleryFromList = (list) =>
    Array.isArray(list)
      ? list.map((g) => ({
          cloudinary_url: g?.src || "",
          cloudinary_id: null,
          asset_id: null,
          asset_type: g?.type === "video" ? "video" : "image",
          poster_url: g?.poster || "",
          alt: g?.alt || "",
        }))
      : [];

  return {
    visible: true,
    // Card fields
    slug: item.slug || "",
    title: item.title || "",
    category: item.category || "",
    description: item.description || "",
    thumbnail: mediaFromCover(item.cover),
    link: item.slug ? `/portfolio/${item.slug}` : "",
    tags: "",
    // Hero block
    short: item.short || "",
    long_description: item.longDescription || "",
    hero_eyebrow: "",
    hero_media: mediaFromCover(item.cover),
    // Metrics
    metrics_eyebrow: "",
    metrics_heading: "",
    metrics: Array.isArray(item.metrics) ? item.metrics : [],
    // Gallery
    gallery_eyebrow: "",
    gallery_heading: "",
    gallery: galleryFromList(item.gallery),
    // Deliverables
    deliverables_eyebrow: "",
    deliverables_heading: "",
    deliverables: Array.isArray(item.resultPoints) ? item.resultPoints : [],
    // Role + Tech
    role_heading: "",
    role_tags: Array.isArray(item.roles) ? item.roles : [],
    tech_heading: "",
    tech_tags: Array.isArray(item.tools) ? item.tools : [],
    // Links
    service_slug: item.serviceSlug || "",
    case_study_slug: item.caseStudySlug || "",
  };
}

// Override the seed inside CurrentSiteContentPreview so the import
// uses the full-detail mapper instead of the generic legacyToAdminItem.
function PortfolioPreviewWithFullSeed({ slotKey, legacyItems }) {
  // Decorate each legacy item with a hidden marker so the preview's
  // generic mapper sees them as objects-with-known-shape; but we
  // actually want OUR mapper, so wrap as already-admin-shape.
  const seeded = useMemo(
    () =>
      legacyItems.map((item) => ({
        ...legacyPortfolioToAdminItem(item),
        // Surface fields the generic preview's `pickThumbnail` can read.
        title: item.title,
        category: item.category,
        cover: item.cover,
      })),
    [legacyItems]
  );
  return (
    <CurrentSiteContentPreview
      slotKey={slotKey}
      legacyItems={seeded}
      describeItem={(i) => `${i.title} — ${i.category || "Project"}`}
    />
  );
}

function useDropdownOptions(slotKey, defaults, labelOf, slugOf) {
  const slotDoc = useSlotDoc(slotKey);
  const cms = Array.isArray(slotDoc.data?.json_value?.items)
    ? slotDoc.data.json_value.items
    : null;
  const sources = cms && cms.length > 0 ? cms : defaults;
  return sources
    .map((it) => {
      const value = slugOf(it);
      const label = labelOf(it);
      return value ? { value, label: label || value } : null;
    })
    .filter(Boolean);
}

export default function PortfolioItemsEditor() {
  const serviceOptions = useDropdownOptions(
    "services.categories",
    serviceCategories,
    (s) => s.name || s.title,
    (s) => s.slug
  );
  const caseStudyOptions = useDropdownOptions(
    "case_studies.items",
    caseStudies,
    (s) => s.title,
    (s) => s.slug
  );

  const itemFields = useMemo(
    () => [
      // ---------- Card (listing) ----------
      { name: "slug", type: "text", label: "URL slug", placeholder: "premium-website-build" },
      { name: "title", type: "text", label: "Title" },
      { name: "category", type: "text", label: "Category (eyebrow on listing card)" },
      { name: "description", type: "multiline", label: "Listing description (short blurb on the card)" },
      {
        name: "thumbnail",
        type: "image",
        label: "Listing thumbnail (16:9)",
        specKey: "portfolio.items.thumbnail",
      },
      { name: "link", type: "url", label: "Override link (leave blank to use /portfolio/<slug>)" },
      { name: "tags", type: "text", label: "Tags (comma-separated, optional)" },

      // ---------- Hero ----------
      { name: "hero_eyebrow", type: "text", label: "Hero eyebrow (defaults to category)" },
      { name: "short", type: "multiline", label: "Lead paragraph (short)" },
      { name: "long_description", type: "multiline", label: "Body paragraph (long description)", rows: 5 },
      {
        name: "hero_media",
        type: "image",
        label: "Hero media (image OR video — for video, upload an mp4)",
        specKey: "portfolio.items.hero_media",
      },

      // ---------- Metrics ----------
      { name: "metrics_eyebrow", type: "text", label: "Section eyebrow", placeholder: "Outcome" },
      { name: "metrics_heading", type: "text", label: "Section heading", placeholder: "What the work actually moved." },
      {
        name: "metrics",
        type: "pairs",
        label: "Metric cards",
        labelKey: "label",
        valueKey: "value",
        labelPlaceholder: "Lighthouse Performance",
        valuePlaceholder: "96 / 100",
      },

      // ---------- Gallery ----------
      { name: "gallery_eyebrow", type: "text", label: "Section eyebrow", placeholder: "Stills + Samples" },
      { name: "gallery_heading", type: "text", label: "Section heading", placeholder: "A look at the work." },
      {
        name: "gallery",
        type: "media-list",
        label: "Gallery items (images or videos)",
        mediaType: "image",
        itemLabel: "Gallery item",
        specKey: "portfolio.items.gallery",
      },

      // ---------- Deliverables ----------
      { name: "deliverables_eyebrow", type: "text", label: "Section eyebrow", placeholder: "What it delivers" },
      { name: "deliverables_heading", type: "text", label: "Section heading (currently visually hidden — kept for future)" },
      { name: "deliverables", type: "tags", label: "Bullet list (one per chip)", placeholder: "Add a deliverable, press Enter" },

      // ---------- Role ----------
      { name: "role_heading", type: "text", label: "Section heading", placeholder: "Our role" },
      { name: "role_tags", type: "tags", label: "Role tags", placeholder: "e.g. UI design" },

      // ---------- Tech ----------
      { name: "tech_heading", type: "text", label: "Section heading", placeholder: "Tools used" },
      { name: "tech_tags", type: "tags", label: "Tool / tech tags", placeholder: "e.g. Next.js" },

      // ---------- Links ----------
      {
        name: "service_slug",
        type: "select",
        label: "Service used (links to /services/:slug)",
        options: serviceOptions,
      },
      {
        name: "case_study_slug",
        type: "select",
        label: "Linked case study (optional)",
        options: caseStudyOptions,
      },
    ],
    [serviceOptions, caseStudyOptions]
  );

  const groups = useMemo(
    () => [
      {
        label: "Card",
        fields: ["slug", "title", "category", "description", "thumbnail", "link", "tags"],
        renderPreview: CardPreview,
      },
      {
        label: "Hero",
        fields: ["hero_eyebrow", "short", "long_description", "hero_media"],
        renderPreview: HeroPreview,
      },
      {
        label: "Metrics",
        fields: ["metrics_eyebrow", "metrics_heading", "metrics"],
        renderPreview: MetricsPreview,
      },
      {
        label: "Gallery",
        fields: ["gallery_eyebrow", "gallery_heading", "gallery"],
        renderPreview: GalleryPreview,
      },
      {
        label: "Deliverables",
        fields: ["deliverables_eyebrow", "deliverables_heading", "deliverables"],
        renderPreview: DeliverablesPreview,
      },
      {
        label: "Role",
        fields: ["role_heading", "role_tags"],
        renderPreview: RolePreview,
      },
      {
        label: "Tech",
        fields: ["tech_heading", "tech_tags"],
        renderPreview: TechPreview,
      },
      {
        label: "Links",
        fields: ["service_slug", "case_study_slug"],
        renderPreview: LinksPreview,
      },
    ],
    []
  );

  return (
    <div>
      <PageHeader
        eyebrow="CMS · Portfolio"
        title="Portfolio Items"
        subtitle="Open any item, then click a tab — each tab shows a LIVE PREVIEW of that section exactly as visitors see it on /portfolio/:slug, with the matching edit fields right below. Type in a field → preview updates instantly. The 8 tabs map 1-to-1 onto the public detail page: Card · Hero · Metrics · Gallery · Deliverables · Role · Tech · Links."
      />

      <EditorSection title="Section copy">
        <TextEditor
          slotKey="portfolio.eyebrow"
          label="Eyebrow"
          fallback="Portfolio"
        />
        <TextEditor
          slotKey="portfolio.headline"
          label="Headline"
          fallback="Selected work — tap a card to see the breakdown."
        />
        <TextEditor
          slotKey="portfolio.subhead"
          label="Sub-paragraph"
          multiline
          fallback="Every piece here was built for a real business outcome — not a showreel."
        />
      </EditorSection>

      <EditorSection title="Items" hint="Drag to reorder · Open an item to edit across 8 tabs">
        <PortfolioPreviewWithFullSeed
          slotKey="portfolio.items"
          legacyItems={portfolioItems}
        />
        <RepeatingListEditor
          slotKey="portfolio.items"
          label="Portfolio items"
          itemFields={itemFields}
          groups={groups}
          summarise={(i) =>
            i.title
              ? `${i.title}${i.category ? ` — ${i.category}` : ""}`
              : "(untitled)"
          }
          category="portfolio"
          folder="mineworld/portfolio"
        />
      </EditorSection>
    </div>
  );
}
