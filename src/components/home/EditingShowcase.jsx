import { useState } from "react";
import { motion } from "framer-motion";
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
      "From a 60-minute raw recording to a 40-second clip engineered for authority and shareability across Reels, Shorts, and LinkedIn.",
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

const showcaseItems = [
  {
    id: 1,
    title: "Brand Reel Editing",
    category: "High-Retention Visuals",
    description:
      "Fast-paced premium edits designed to stop scroll, shape perception, and build a sharp brand image.",
    image: reelsShowcase,
    tags: ["Hooks", "Motion Cuts", "Retention"],
  },
  {
    id: 2,
    title: "Podcast Content System",
    category: "Studio + Post Production",
    description:
      "Full podcast cutdowns, clean pacing, premium framing, and platform-ready short-form outputs.",
    image: podcastShowcase,
    tags: ["Long-form", "Short Clips", "Authority"],
  },
  {
    id: 3,
    title: "Ad Creative Editing",
    category: "Performance Content",
    description:
      "Ad visuals built for clarity, conversion, and strong first-frame attention across paid campaigns.",
    image: adsShowcase,
    tags: ["Meta Ads", "Performance", "Conversion"],
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
        padding: isMobile ? "80px 0" : "120px 0",
        background: theme.colors.bg,
        borderBottom: `1px solid ${theme.colors.line}`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "15%",
          right: "-10%",
          width: isMobile ? "220px" : "420px",
          height: isMobile ? "220px" : "420px",
          borderRadius: "50%",
          background: "rgba(214,176,96,0.08)",
          filter: "blur(140px)",
          pointerEvents: "none",
        }}
      />

      <Container>
        <Reveal>
          <SectionTag>Editing Showcase</SectionTag>
        </Reveal>

        <Reveal delay={0.08}>
          <SectionHeading
            title="Editing is not a service here. It’s the engine."
            subtitle="Mineworld is built around visual control, retention logic, platform behavior, and premium execution. These showcases are not just outputs — they represent how we shape attention frame by frame."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 0.82fr",
              gap: isMobile ? "24px" : "36px",
              alignItems: "center",
              marginBottom: isMobile ? "60px" : "84px",
              padding: isMobile ? "22px" : "32px",
              borderRadius: isMobile ? "24px" : "30px",
              border: `1px solid ${theme.colors.lineStrong}`,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.015))",
            }}
          >
            <BeforeAfterSlider
              beforeSrc={pair.before}
              afterSrc={pair.after}
              beforeLabel="Before"
              afterLabel="After"
              aspectRatio={isMobile ? "4 / 5" : "16 / 11"}
            />

            <div>
              <div
                style={{
                  color: theme.colors.goldSoft,
                  fontSize: "12px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  marginBottom: "14px",
                }}
              >
                {pair.eyebrow} · Drag to compare
              </div>
              <h3
                style={{
                  margin: "0 0 14px",
                  fontSize: isMobile ? "26px" : "34px",
                  lineHeight: 1.08,
                  fontWeight: 800,
                  color: theme.colors.text,
                  letterSpacing: "-0.8px",
                  fontFamily:
                    '"Playfair Display", Georgia, "Times New Roman", serif',
                }}
              >
                {pair.title}
              </h3>
              <p
                style={{
                  margin: "0 0 24px",
                  color: theme.colors.textSoft,
                  fontSize: "15px",
                  lineHeight: 1.85,
                  maxWidth: "460px",
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
                      style={{
                        padding: "10px 14px",
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
                        fontSize: "13px",
                        fontWeight: 700,
                        letterSpacing: "0.2px",
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
                  marginTop: "22px",
                  paddingTop: "18px",
                  borderTop: `1px solid ${theme.colors.line}`,
                  color: "rgba(243,239,231,0.6)",
                  fontSize: "12.5px",
                  letterSpacing: "0.3px",
                  lineHeight: 1.75,
                }}
              >
                Tip: drag the handle (or use ← / → keys) to reveal the
                difference.
              </div>
            </div>
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.15fr 0.85fr",
            gap: "26px",
            alignItems: "stretch",
          }}
        >
          <Reveal delay={0.12}>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              style={{
                position: "relative",
                minHeight: isMobile ? "420px" : "640px",
                borderRadius: isMobile ? "24px" : "30px",
                overflow: "hidden",
                border: `1px solid ${theme.colors.lineStrong}`,
                background: theme.colors.bgSoft,
                boxShadow: theme.shadow.deep,
              }}
            >
              <img
                src={showcaseItems[0].image}
                alt={showcaseItems[0].title}
                loading="lazy"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.72,
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.2) 35%, rgba(0,0,0,0.82) 100%)",
                }}
              />

              {!isMobile && (
                <>
                  <div
                    style={{
                      position: "absolute",
                      top: "22px",
                      left: "22px",
                      width: "72px",
                      height: "72px",
                      borderTop: `1px solid ${theme.colors.goldSoft}`,
                      borderLeft: `1px solid ${theme.colors.goldSoft}`,
                      opacity: 0.9,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "22px",
                      right: "22px",
                      width: "72px",
                      height: "72px",
                      borderBottom: `1px solid ${theme.colors.goldSoft}`,
                      borderRight: `1px solid ${theme.colors.goldSoft}`,
                      opacity: 0.9,
                    }}
                  />
                </>
              )}

              <div
                style={{
                  position: "absolute",
                  left: "30px",
                  right: "30px",
                  bottom: "30px",
                }}
              >
                <div
                  style={{
                    color: theme.colors.goldSoft,
                    fontSize: "12px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    marginBottom: "14px",
                  }}
                >
                  {showcaseItems[0].category}
                </div>

                <h3
                  style={{
                    margin: "0 0 14px",
                    fontSize: isMobile ? "34px" : "clamp(30px, 4vw, 48px)",
                    lineHeight: 1.02,
                    fontWeight: 800,
                    color: theme.colors.text,
                  }}
                >
                  {showcaseItems[0].title}
                </h3>

                <p
                  style={{
                    margin: 0,
                    maxWidth: "640px",
                    color: theme.colors.textSoft,
                    lineHeight: 1.8,
                    fontSize: "16px",
                  }}
                >
                  {showcaseItems[0].description}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                    marginTop: "22px",
                  }}
                >
                  {showcaseItems[0].tags.map((tag) => (
                    <div
                      key={tag}
                      style={{
                        padding: "10px 14px",
                        borderRadius: "999px",
                        border: `1px solid ${theme.colors.line}`,
                        background: theme.colors.bgCard,
                        color: theme.colors.text,
                        fontSize: "13px",
                      }}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateRows: isMobile ? "auto" : "1fr 1fr",
              gap: "26px",
            }}
          >
            {showcaseItems.slice(1).map((item, index) => (
              <Reveal key={item.id} delay={0.16 + index * 0.08}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 180, damping: 18 }}
                  style={{
                    position: "relative",
                    minHeight: isMobile ? "260px" : "307px",
                    borderRadius: isMobile ? "22px" : "26px",
                    overflow: "hidden",
                    border: `1px solid ${theme.colors.line}`,
                    background: theme.colors.bgSoft,
                    boxShadow: theme.shadow.soft,
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: 0.7,
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.28) 38%, rgba(0,0,0,0.85) 100%)",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      left: "24px",
                      right: "24px",
                      bottom: "24px",
                    }}
                  >
                    <div
                      style={{
                        color: theme.colors.goldSoft,
                        fontSize: "11px",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        marginBottom: "12px",
                      }}
                    >
                      {item.category}
                    </div>

                    <h3
                      style={{
                        margin: "0 0 10px",
                        fontSize: isMobile ? "24px" : "28px",
                        lineHeight: 1.1,
                        fontWeight: 800,
                        color: theme.colors.text,
                      }}
                    >
                      {item.title}
                    </h3>

                    <p
                      style={{
                        margin: 0,
                        color: theme.colors.textSoft,
                        lineHeight: 1.7,
                        fontSize: "15px",
                        maxWidth: "90%",
                      }}
                    >
                      {item.description}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap",
                        marginTop: "18px",
                      }}
                    >
                      {item.tags.map((tag) => (
                        <div
                          key={tag}
                          style={{
                            padding: "8px 12px",
                            borderRadius: "999px",
                            border: `1px solid ${theme.colors.line}`,
                            background: theme.colors.bgCard,
                            color: theme.colors.text,
                            fontSize: "12px",
                          }}
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default EditingShowcase;