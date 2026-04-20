import { useState } from "react";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";
import SectionTag from "../common/SectionTag";
import BeforeAfterSlider from "../common/BeforeAfterSlider";
import { theme } from "../../styles/theme";
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
        padding: isMobile ? "64px 0" : "90px 0",
        background: theme.colors.bg,
        borderBottom: `1px solid ${theme.colors.line}`,
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "18%",
          right: "-10%",
          width: isMobile ? "220px" : "360px",
          height: isMobile ? "220px" : "360px",
          borderRadius: "50%",
          background: "rgba(214,176,96,0.07)",
          filter: "blur(130px)",
          pointerEvents: "none",
        }}
      />

      <Container>
        <Reveal>
          <SectionTag>Editing Showcase</SectionTag>
        </Reveal>

        <Reveal delay={0.06}>
          <SectionHeading
            title="Drag to see what retention-first editing actually changes."
            subtitle="Same raw footage, different structure — that's where most of the growth comes from."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1.15fr 0.85fr",
              gap: isMobile ? "22px" : "32px",
              alignItems: "center",
              padding: isMobile ? "20px" : "28px",
              borderRadius: isMobile ? "22px" : "28px",
              border: `1px solid ${theme.colors.lineStrong}`,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
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
                  color: theme.colors.goldSoft,
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
                  fontWeight: 800,
                  color: theme.colors.text,
                  letterSpacing: "-0.6px",
                  fontFamily:
                    '"Playfair Display", Georgia, "Times New Roman", serif',
                }}
              >
                {pair.title}
              </h3>
              <p
                style={{
                  margin: "0 0 18px",
                  color: theme.colors.textSoft,
                  fontSize: "14.5px",
                  lineHeight: 1.8,
                  maxWidth: "440px",
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
                          ? "1px solid rgba(214,176,96,0.85)"
                          : `1px solid ${theme.colors.line}`,
                        background: active
                          ? "rgba(214,176,96,0.16)"
                          : "rgba(255,255,255,0.03)",
                        color: active
                          ? theme.colors.goldSoft
                          : theme.colors.text,
                        fontSize: "12.5px",
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "all 0.22s ease",
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
                  color: "rgba(243,239,231,0.55)",
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
