import { useState } from "react";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionTag from "../common/SectionTag";
import BeforeAfterSlider from "../common/BeforeAfterSlider";
import useIsMobile from "../../utils/useIsMobile";

import reelsShowcase from "../../assets/reels-showcase.jpg";
import reelsShowcase1 from "../../assets/reels-showcase1.jpg";
import podcastShowcase from "../../assets/podcast-showcase.jpg";
import podcastShowcase1 from "../../assets/podcast-showcase1.jpg";
import adsShowcase from "../../assets/ads-showcase.jpg";
import adsShowcase1 from "../../assets/ads-showcase1.jpg";

const beforeAfterPairs = [
  {
    id: "reel",
    eyebrow: "Brand Reel",
    title: "Raw clip vs retention-first edit",
    description:
      "Same raw footage — rebuilt around first-frame attention, motion pacing, and a loop-ready finish that pushes re-watches.",
    before: reelsShowcase,
    after: reelsShowcase1,
  },
  {
    id: "podcast",
    eyebrow: "Podcast Cutdown",
    title: "Long recording vs platform-ready clip",
    description:
      "From a 60-minute recording to a 40-second clip engineered for authority and shareability across Reels, Shorts, and LinkedIn.",
    before: podcastShowcase,
    after: podcastShowcase1,
  },
  {
    id: "ads",
    eyebrow: "Meta Ad",
    title: "Generic creative vs conversion creative",
    description:
      "Product-heavy visual reshaped into an offer-led ad — stronger hook, clearer claim, visible outcome, explicit CTA.",
    before: adsShowcase,
    after: adsShowcase1,
  },
];

function EditingShowcase() {
  const isMobile = useIsMobile(768);
  const [activePair, setActivePair] = useState(beforeAfterPairs[0].id);
  const pair =
    beforeAfterPairs.find((p) => p.id === activePair) || beforeAfterPairs[0];

  return (
    <section
      id="work"
      style={{
        position: "relative",
        padding: isMobile ? "76px 0" : "108px 0",
        background: `
          radial-gradient(ellipse at top, rgba(184, 149, 106, 0.12), transparent 50%),
          radial-gradient(ellipse at bottom right, rgba(184, 149, 106, 0.06), transparent 60%),
          var(--accent-navy)
        `,
        borderTop: "1px solid rgba(184, 149, 106, 0.20)",
        borderBottom: "1px solid rgba(184, 149, 106, 0.20)",
        overflow: "hidden",
      }}
    >
      <Container style={{ position: "relative", zIndex: 1 }}>
        <Reveal>
          <SectionTag>Editing Showcase</SectionTag>
        </Reveal>

        <Reveal delay={0.06}>
          <div style={{ marginBottom: "32px", maxWidth: "780px" }}>
            <h2
              style={{
                margin: "0 0 12px",
                color: "var(--bg-cream-soft)",
                fontSize: isMobile ? "30px" : "clamp(32px, 4vw, 46px)",
                lineHeight: 1.1,
                letterSpacing: "-0.7px",
                fontWeight: 500,
                fontFamily:
                  '"Playfair Display", Georgia, "Times New Roman", serif',
              }}
            >
              Drag to see what retention-first editing{" "}
              <span
                style={{
                  color: "var(--accent-gold)",
                  fontStyle: "italic",
                }}
              >
                actually changes.
              </span>
            </h2>
            <span
              aria-hidden="true"
              style={{
                display: "block",
                width: "60px",
                height: "3px",
                background: "var(--accent-gold)",
                borderRadius: "999px",
                marginBottom: "18px",
              }}
            />
            <p
              style={{
                margin: 0,
                color: "var(--bg-cream-soft)",
                fontSize: isMobile ? "15px" : "16px",
                lineHeight: 1.85,
                opacity: 0.78,
              }}
            >
              Same raw footage, different structure — that&rsquo;s where most
              of the growth comes from.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1.15fr 0.85fr",
              gap: isMobile ? "22px" : "32px",
              alignItems: "center",
              padding: isMobile ? "22px" : "32px",
              borderRadius: isMobile ? "16px" : "20px",
              border: "1px solid rgba(184, 149, 106, 0.20)",
              background: "rgba(255,255,255,0.04)",
              boxShadow: "0 24px 48px rgba(0, 0, 0, 0.20)",
              transition:
                "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            <BeforeAfterSlider
              beforeSrc={pair.before}
              afterSrc={pair.after}
              beforeLabel="Before"
              afterLabel="After"
              aspectRatio={isMobile ? "4 / 5" : "16 / 10"}
            />

            <div>
              <div
                style={{
                  color: "var(--accent-gold)",
                  fontSize: "11px",
                  letterSpacing: "1.8px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  marginBottom: "10px",
                }}
              >
                {pair.eyebrow} · Drag to compare
              </div>
              <h3
                style={{
                  margin: "0 0 10px",
                  fontSize: isMobile ? "22px" : "28px",
                  lineHeight: 1.15,
                  fontWeight: 500,
                  color: "var(--bg-cream-soft)",
                  letterSpacing: "-0.6px",
                  fontFamily:
                    '"Playfair Display", Georgia, "Times New Roman", serif',
                }}
              >
                {pair.title}
              </h3>
              <p
                style={{
                  margin: "0 0 22px",
                  color: "var(--bg-cream-soft)",
                  fontSize: "14.5px",
                  lineHeight: 1.8,
                  maxWidth: "440px",
                  opacity: 0.78,
                }}
              >
                {pair.description}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >
                {beforeAfterPairs.map((p) => {
                  const active = p.id === activePair;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setActivePair(p.id)}
                      aria-pressed={active}
                      style={{
                        padding: "9px 13px",
                        borderRadius: "999px",
                        border: active
                          ? "1px solid var(--accent-gold)"
                          : "1px solid rgba(184, 149, 106, 0.30)",
                        background: active
                          ? "rgba(184, 149, 106, 0.18)"
                          : "rgba(255,255,255,0.04)",
                        color: active
                          ? "var(--accent-gold)"
                          : "var(--bg-cream-soft)",
                        fontSize: "12.5px",
                        fontWeight: 700,
                        cursor: "pointer",
                        transition:
                          "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                      }}
                    >
                      {p.eyebrow}
                    </button>
                  );
                })}
              </div>

              <div
                style={{
                  marginTop: "16px",
                  color: "rgba(245, 239, 230, 0.6)",
                  fontSize: "12px",
                  lineHeight: 1.6,
                }}
              >
                Drag the handle or use ← / → keys to reveal the difference.
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default EditingShowcase;
