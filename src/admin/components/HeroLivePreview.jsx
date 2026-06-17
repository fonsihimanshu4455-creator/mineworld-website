// HeroLivePreview — admin-side preview pane that renders the hero
// section using the SAME CMS slot reads the public Hero.jsx uses.
// So any edit the admin makes in the editor (which writes to
// site_content) is reflected here within a tick of saving.
//
// Not a pixel-perfect re-render of the public site (Hero.jsx ships
// with GSAP animations, IntersectionObserver, etc.) — just a faithful
// content + layout preview at editor scale.

import { useSiteAsset, useSiteContent } from "../../hooks/useSiteContent";
import { useSiteToggle } from "../../hooks/useSiteToggle";
import RichText from "../../lib/richText.jsx";

const SERIF = '"Playfair Display", Georgia, "Times New Roman", serif';

export default function HeroLivePreview() {
  const heroEyebrow = useSiteContent(
    "hero.eyebrow",
    "Delhi · Websites · Apps · Video · Meta Ads · Growth"
  );
  const heroHeadlineRich = useSiteContent("hero.headline_rich", null);
  const heroHeadlineOverride = useSiteContent("hero.headline", null);
  const heroHeadlineColor = useSiteContent("hero.headline_color", null);
  const heroSubhead = useSiteContent(
    "hero.subhead",
    "Mineworld Production is Delhi's full-stack creative + growth studio."
  );
  const heroSubheadColor = useSiteContent("hero.subhead_color", null);
  const ctaPrimaryLabel = useSiteContent("hero.cta_primary_label", "Start a Project");
  const ctaSecondaryLabel = useSiteContent("hero.cta_secondary_label", "View Work");
  const videoCardEyebrow = useSiteContent(
    "hero.video_card_eyebrow",
    "Websites · Apps · Ads"
  );
  const videoCardEyebrowColor = useSiteContent("hero.video_card_eyebrow_color", null);
  const videoCardCaption = useSiteContent(
    "hero.video_card_caption",
    "Premium digital systems\nengineered to convert visitors into customers"
  );
  const videoCardCaptionColor = useSiteContent("hero.video_card_caption_color", null);
  const heroAsset = useSiteAsset("hero.video", null);
  const heroVideoUrl =
    typeof heroAsset === "object" && heroAsset?.url ? heroAsset.url : null;
  const visible = useSiteToggle("hero.show_section", true);

  return (
    <div
      style={{
        background: "var(--admin-surface, #FFFFFF)",
        border: "1px solid var(--admin-border, #E8DED1)",
        borderRadius: "var(--admin-radius-md, 16px)",
        overflow: "hidden",
        boxShadow: "var(--admin-shadow-sm, 0 2px 8px rgba(31,45,77,0.05))",
      }}
    >
      <div
        style={{
          padding: "10px 16px",
          background: "var(--admin-bg-soft, #F5EFE6)",
          borderBottom: "1px solid var(--admin-border, #E8DED1)",
          color: "var(--admin-accent-deep, #8B6E48)",
          fontSize: 10.5,
          letterSpacing: "1.6px",
          textTransform: "uppercase",
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>Live preview</span>
        <span
          style={{
            color: visible
              ? "var(--admin-success, #1F8A4C)"
              : "var(--admin-error, #C44545)",
          }}
        >
          {visible ? "Visible on site" : "Hidden on site"}
        </span>
      </div>
      <div
        style={{
          padding: 20,
          background:
            "linear-gradient(180deg, #FFFFFF 0%, var(--admin-bg, #FAF7F2) 100%)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: 16,
            alignItems: "center",
            minHeight: 280,
          }}
        >
          <div>
            <div
              style={{
                color: "var(--admin-accent, #B8956A)",
                fontSize: 9,
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontWeight: 800,
                marginBottom: 10,
              }}
            >
              {heroEyebrow}
            </div>
            <div
              style={{
                fontFamily: SERIF,
                fontSize: 22,
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.6px",
                color: heroHeadlineColor || "var(--admin-text, #1A1A1A)",
                marginBottom: 10,
              }}
            >
              {heroHeadlineRich ? (
                <RichText value={heroHeadlineRich} />
              ) : heroHeadlineOverride ? (
                heroHeadlineOverride
              ) : (
                <>
                  Websites. Apps.
                  <br />
                  Ads that{" "}
                  <span
                    style={{
                      color: "var(--admin-accent, #B8956A)",
                      fontStyle: "italic",
                    }}
                  >
                    earn revenue
                  </span>
                  .
                </>
              )}
            </div>
            <p
              style={{
                margin: "0 0 12px",
                fontSize: 11,
                lineHeight: 1.6,
                color: heroSubheadColor || "var(--admin-text-secondary, #4A4A4A)",
                maxWidth: 320,
              }}
            >
              {heroSubhead}
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <span
                style={{
                  padding: "6px 12px",
                  borderRadius: 999,
                  background:
                    "linear-gradient(135deg, var(--admin-accent, #B8956A), var(--admin-accent-soft, #C49A5A))",
                  color: "#FFFFFF",
                  fontSize: 10.5,
                  fontWeight: 800,
                }}
              >
                {ctaPrimaryLabel}
              </span>
              <span
                style={{
                  padding: "6px 12px",
                  borderRadius: 999,
                  border: "1px solid var(--admin-border-strong, rgba(31,45,77,0.16))",
                  color: "var(--admin-text, #1A1A1A)",
                  fontSize: 10.5,
                  fontWeight: 700,
                }}
              >
                {ctaSecondaryLabel}
              </span>
            </div>
          </div>
          <div
            style={{
              aspectRatio: "4 / 5",
              borderRadius: 14,
              overflow: "hidden",
              background: "#0F2A44",
              position: "relative",
              boxShadow: "0 18px 36px rgba(15,42,68,0.18)",
            }}
          >
            {heroVideoUrl ? (
              <video
                src={heroVideoUrl}
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
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(135deg, rgba(184,149,106,0.25), rgba(15,42,68,0.5))",
                  display: "grid",
                  placeItems: "center",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 11,
                }}
              >
                (no hero video uploaded)
              </div>
            )}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.7))",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 12,
                right: 12,
                bottom: 12,
                color: "#FFFFFF",
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  letterSpacing: "1.6px",
                  textTransform: "uppercase",
                  marginBottom: 4,
                  color: videoCardEyebrowColor || "#D4B896",
                }}
              >
                {videoCardEyebrow}
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  lineHeight: 1.2,
                  whiteSpace: "pre-line",
                  color: videoCardCaptionColor || "#FFFFFF",
                }}
              >
                {videoCardCaption}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
