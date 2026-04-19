import { motion } from "framer-motion";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";
import SectionTag from "../common/SectionTag";
import { theme } from "../../styles/theme";
import { useIsMobile } from "../../hooks/useIsMobile";

import reelsShowcase from "../../assets/reels-showcase.jpg";
import podcastShowcase from "../../assets/podcast-showcase.jpg";
import adsShowcase from "../../assets/ads-showcase.jpg";

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
  const isMobile = useIsMobile();

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