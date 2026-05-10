// PortfolioPreviews — render-time previews of each portfolio detail
// page section, using the SAME styling as the public detail page.
// These appear above the edit fields in PortfolioItemsEditor so admins
// see exactly what each field controls before they save.
//
// All previews read directly from the live admin item state (the
// in-memory shape RepeatingListEditor passes around), so typing in a
// field updates the preview instantly.

import { findCaseStudy } from "../../../data/caseStudies";
import { findServiceCategory } from "../../../data/serviceCategories";

const SERIF = '"Playfair Display", Georgia, "Times New Roman", serif';

// Pull the current image/video URL out of an admin media field —
// works whether it's a Cloudinary upload object, a legacy `cover`
// shape, or a plain string URL.
function mediaUrl(media) {
  if (!media) return "";
  if (typeof media === "string") return media;
  return media.cloudinary_url || media.src || media.url || "";
}

function mediaIsVideo(media) {
  if (!media || typeof media !== "object") return false;
  return media.asset_type === "video" || media.type === "video";
}

function fallback(value, def) {
  if (value == null) return def;
  if (typeof value === "string" && value.trim() === "") return def;
  return value;
}

// --------------------------------------------------------------------
// CARD — listing card on /portfolio
// --------------------------------------------------------------------

export function CardPreview(item) {
  const thumb = item.thumbnail || item.hero_media || item.cover;
  const url = mediaUrl(thumb);
  const isVideo = mediaIsVideo(thumb);
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 18,
        overflow: "hidden",
        background: "#1a1a1a",
        height: 240,
        maxWidth: 360,
      }}
    >
      {url ? (
        isVideo ? (
          <video
            src={url}
            muted
            autoPlay
            loop
            playsInline
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.9,
            }}
          />
        ) : (
          <img
            src={url}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.9,
            }}
          />
        )
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(184,149,106,0.18), rgba(15,42,68,0.4))",
            display: "grid",
            placeItems: "center",
            color: "rgba(245,241,232,0.4)",
            fontSize: 12,
          }}
        >
          (upload a thumbnail)
        </div>
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.78) 100%)",
        }}
      />
      <div style={{ position: "absolute", left: 16, right: 16, bottom: 14 }}>
        <div
          style={{
            color: "#D9B987",
            fontSize: 10,
            letterSpacing: "1.8px",
            textTransform: "uppercase",
            fontWeight: 700,
            marginBottom: 6,
          }}
        >
          {fallback(item.category, "Category")}
        </div>
        <div
          style={{
            color: "#fff",
            fontFamily: SERIF,
            fontSize: 18,
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: "-0.4px",
          }}
        >
          {fallback(item.title, "Untitled")}
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------
// HERO — top section of the detail page
// --------------------------------------------------------------------

export function HeroPreview(item) {
  const media = item.hero_media || item.cover;
  const url = mediaUrl(media);
  const isVideo = mediaIsVideo(media);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.2fr 1fr",
        gap: 18,
        alignItems: "center",
        padding: 18,
        borderRadius: 14,
        background: "linear-gradient(180deg, #FAF7F2, #EFE8DA)",
        color: "#1A1A1A",
      }}
    >
      <div>
        <div
          style={{
            color: "#8B6E48",
            fontSize: 10,
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontWeight: 700,
            marginBottom: 10,
          }}
        >
          {fallback(item.hero_eyebrow, item.category) || "Eyebrow"}
        </div>
        <div
          style={{
            fontFamily: SERIF,
            fontSize: 24,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.6px",
            marginBottom: 10,
          }}
        >
          {fallback(item.title, "Title goes here")}
        </div>
        <p
          style={{
            margin: "0 0 8px",
            fontSize: 13,
            lineHeight: 1.5,
            color: "#1A1A1A",
            fontWeight: 500,
          }}
        >
          {fallback(item.short, "Short lead paragraph appears here.")}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: 12,
            lineHeight: 1.7,
            color: "#4A4A4A",
          }}
        >
          {fallback(
            item.long_description,
            "Longer body paragraph. Multiple sentences explaining the project context, the brief, and the outcome."
          )}
        </p>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <span
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              background: "linear-gradient(135deg, #BC9966, #D9B987)",
              color: "#18140F",
              fontSize: 11,
              fontWeight: 800,
            }}
          >
            Start a Project
          </span>
          {item.case_study_slug && (
            <span
              style={{
                padding: "6px 12px",
                borderRadius: 999,
                border: "1px solid rgba(31,45,77,0.18)",
                color: "#1A1A1A",
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              View Case Study
            </span>
          )}
        </div>
      </div>
      <div
        style={{
          aspectRatio: "4 / 5",
          borderRadius: 14,
          overflow: "hidden",
          background: "#1a1a1a",
          position: "relative",
        }}
      >
        {url ? (
          isVideo ? (
            <video
              src={url}
              muted
              autoPlay
              loop
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <img
              src={url}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(184,149,106,0.2), rgba(15,42,68,0.35))",
              display: "grid",
              placeItems: "center",
              color: "rgba(245,241,232,0.5)",
              fontSize: 12,
            }}
          >
            (upload hero image / video)
          </div>
        )}
      </div>
    </div>
  );
}

// --------------------------------------------------------------------
// METRICS — navy band with label/value cards
// --------------------------------------------------------------------

export function MetricsPreview(item) {
  const metrics =
    Array.isArray(item.metrics) && item.metrics.length > 0
      ? item.metrics
      : [
          { label: "Metric label", value: "Value" },
          { label: "Metric label", value: "Value" },
          { label: "Metric label", value: "Value" },
        ];
  return (
    <div
      style={{
        background: "#0F2A44",
        borderRadius: 14,
        padding: 18,
        color: "#FFFFFF",
      }}
    >
      <div
        style={{
          color: "#D9B987",
          fontSize: 10,
          letterSpacing: "2px",
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: 4,
        }}
      >
        {fallback(item.metrics_eyebrow, "Outcome")}
      </div>
      <div
        style={{
          fontFamily: SERIF,
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: "-0.4px",
          marginBottom: 14,
        }}
      >
        {fallback(item.metrics_heading, "What the work actually moved.")}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 10,
        }}
      >
        {metrics.map((m, i) => (
          <div
            key={i}
            style={{
              padding: 14,
              borderRadius: 12,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(184,149,106,0.30)",
            }}
          >
            <div
              style={{
                color: "#D9B987",
                fontSize: 10,
                letterSpacing: "1.4px",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: 6,
              }}
            >
              {fallback(m.label, "Label")}
            </div>
            <div
              style={{
                fontFamily: SERIF,
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: "-0.6px",
                lineHeight: 1.1,
              }}
            >
              {fallback(m.value, "—")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --------------------------------------------------------------------
// GALLERY — image grid
// --------------------------------------------------------------------

export function GalleryPreview(item) {
  const list =
    Array.isArray(item.gallery) && item.gallery.length > 0
      ? item.gallery
      : [];
  return (
    <div
      style={{
        background: "#FAF7F2",
        borderRadius: 14,
        padding: 18,
        color: "#1A1A1A",
      }}
    >
      <div
        style={{
          color: "#8B6E48",
          fontSize: 10,
          letterSpacing: "2px",
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: 4,
        }}
      >
        {fallback(item.gallery_eyebrow, "Stills + Samples")}
      </div>
      <div
        style={{
          fontFamily: SERIF,
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: "-0.4px",
          marginBottom: 14,
        }}
      >
        {fallback(item.gallery_heading, "A look at the work.")}
      </div>
      {list.length === 0 ? (
        <div
          style={{
            padding: 30,
            border: "1px dashed rgba(184,149,106,0.4)",
            borderRadius: 12,
            color: "rgba(31,45,77,0.55)",
            fontSize: 12,
            textAlign: "center",
          }}
        >
          No gallery items yet. Add images or videos below.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 10,
          }}
        >
          {list.map((g, i) => {
            const url = mediaUrl(g);
            const isVideo = mediaIsVideo(g);
            return (
              <div
                key={i}
                style={{
                  position: "relative",
                  height: 140,
                  borderRadius: 10,
                  overflow: "hidden",
                  background: "#1a1a1a",
                }}
              >
                {url ? (
                  isVideo ? (
                    <video
                      src={url}
                      muted
                      autoPlay
                      loop
                      playsInline
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <img
                      src={url}
                      alt={g.alt || ""}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "grid",
                      placeItems: "center",
                      color: "rgba(245,241,232,0.45)",
                      fontSize: 11,
                    }}
                  >
                    (no image)
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// --------------------------------------------------------------------
// DELIVERABLES — bullet list
// --------------------------------------------------------------------

export function DeliverablesPreview(item) {
  const list =
    Array.isArray(item.deliverables) && item.deliverables.length > 0
      ? item.deliverables
      : ["First deliverable shows here", "Second deliverable", "Third deliverable"];
  return (
    <div
      style={{
        background: "#FAF7F2",
        borderRadius: 14,
        padding: 18,
        color: "#1A1A1A",
      }}
    >
      <div
        style={{
          color: "#8B6E48",
          fontSize: 10,
          letterSpacing: "2px",
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: 14,
        }}
      >
        {fallback(item.deliverables_eyebrow, "What it delivers")}
      </div>
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "grid",
          gap: 10,
        }}
      >
        {list.map((p, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              gap: 10,
              fontSize: 13,
              lineHeight: 1.6,
              color: "#1A1A1A",
            }}
          >
            <span style={{ color: "#B8956A", fontWeight: 800 }}>✓</span>
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

// --------------------------------------------------------------------
// ROLE — chip list
// --------------------------------------------------------------------

export function RolePreview(item) {
  const tags =
    Array.isArray(item.role_tags) && item.role_tags.length > 0
      ? item.role_tags
      : ["Role 1", "Role 2", "Role 3"];
  return (
    <div
      style={{
        background: "#FAF7F2",
        borderRadius: 14,
        padding: 18,
        color: "#1A1A1A",
      }}
    >
      <div
        style={{
          color: "rgba(31,45,77,0.55)",
          fontSize: 10,
          letterSpacing: "1.6px",
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: 12,
        }}
      >
        {fallback(item.role_heading, "Our role")}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {tags.map((t, i) => (
          <span
            key={i}
            style={{
              padding: "7px 12px",
              borderRadius: 999,
              border: "1px solid rgba(31,45,77,0.18)",
              background: "rgba(184,149,106,0.08)",
              color: "#1A1A1A",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// --------------------------------------------------------------------
// TECH — chip list
// --------------------------------------------------------------------

export function TechPreview(item) {
  const tags =
    Array.isArray(item.tech_tags) && item.tech_tags.length > 0
      ? item.tech_tags
      : ["Tool 1", "Tool 2", "Tool 3"];
  return (
    <div
      style={{
        background: "#FAF7F2",
        borderRadius: 14,
        padding: 18,
        color: "#1A1A1A",
      }}
    >
      <div
        style={{
          color: "rgba(31,45,77,0.55)",
          fontSize: 10,
          letterSpacing: "1.6px",
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: 12,
        }}
      >
        {fallback(item.tech_heading, "Tools used")}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {tags.map((t, i) => (
          <span
            key={i}
            style={{
              padding: "7px 12px",
              borderRadius: 999,
              border: "1px solid rgba(31,45,77,0.18)",
              background: "rgba(184,149,106,0.08)",
              color: "#4A4A4A",
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// --------------------------------------------------------------------
// LINKS — service CTA + case study cross-link
// --------------------------------------------------------------------

export function LinksPreview(item) {
  const service = item.service_slug ? findServiceCategory(item.service_slug) : null;
  const caseStudy = item.case_study_slug ? findCaseStudy(item.case_study_slug) : null;
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div
        style={{
          padding: 14,
          borderRadius: 14,
          background:
            "linear-gradient(180deg, rgba(188,153,102,0.12), rgba(255,255,255,0.04))",
          border: "1px solid rgba(188,153,102,0.32)",
          color: "#FFFFFF",
        }}
      >
        <div
          style={{
            color: "#D9B987",
            fontSize: 10,
            letterSpacing: "1.6px",
            textTransform: "uppercase",
            fontWeight: 700,
            marginBottom: 6,
          }}
        >
          Service used
        </div>
        <div style={{ fontSize: 15, fontWeight: 700 }}>
          {service?.name || "(no service linked — pick from dropdown below)"} →
        </div>
      </div>
      <div
        style={{
          padding: 14,
          borderRadius: 14,
          border: "1px solid rgba(184,149,106,0.32)",
          background:
            "linear-gradient(180deg, rgba(188,153,102,0.06), rgba(255,255,255,0.02))",
          color: "#FFFFFF",
        }}
      >
        <div
          style={{
            color: "#D9B987",
            fontSize: 10,
            letterSpacing: "1.6px",
            textTransform: "uppercase",
            fontWeight: 700,
            marginBottom: 6,
          }}
        >
          Case Study
        </div>
        {caseStudy ? (
          <>
            <div
              style={{
                fontFamily: SERIF,
                fontSize: 16,
                fontWeight: 700,
                marginBottom: 4,
                lineHeight: 1.25,
              }}
            >
              {caseStudy.title}
            </div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>
              {caseStudy.summary}
            </div>
          </>
        ) : (
          <div style={{ fontSize: 12, opacity: 0.65 }}>
            (no case study linked — pick from dropdown below, or leave blank to
            hide this section on the public page)
          </div>
        )}
      </div>
    </div>
  );
}
