import { motion } from "framer-motion";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";
import SectionTag from "../common/SectionTag";
import MagneticButton from "../common/MagneticButton";
import { theme } from "../../styles/theme";

import video1 from "../../assets/portfolio-1.mp4";
import video2 from "../../assets/portfolio-2.mp4";
import video3 from "../../assets/portfolio-3.mp4";
import video4 from "../../assets/portfolio-4.mp4";

import poster1 from "../../assets/production.JPG";
import poster2 from "../../assets/podcast-showcase.jpg";
import poster3 from "../../assets/ads-showcase.jpg";
import poster4 from "../../assets/designer.JPG";

const portfolioItems = [
  {
    id: 1,
    title: "Lead Generation Creative System",
    category: "Ads + Editing + Conversion",
    description:
      "Creative assets built to help brands attract attention, generate leads, and convert viewers into inquiries.",
    resultPoints: [
      "High-retention ad creatives",
      "Optimized for paid performance",
      "Built for lead generation",
    ],
    video: video1,
    poster: poster1,
  },
  {
    id: 2,
    title: "Podcast Authority Content",
    category: "Content + Brand Trust",
    description:
      "Podcast shoots and edits designed to build authority, strengthen brand trust, and create multi-platform content.",
    resultPoints: [
      "Authority-driven content",
      "Long-form + short clips",
      "Repurposed for growth",
    ],
    video: video2,
    poster: poster2,
  },
  {
    id: 3,
    title: "Ad Performance Visuals",
    category: "Meta Ads + Lead Flow",
    description:
      "Video assets shaped for first-frame attention, ad clarity, and better lead performance across campaigns.",
    resultPoints: [
      "Ad-ready creative direction",
      "Fast hook-focused edits",
      "Lead-focused visuals",
    ],
    video: video3,
    poster: poster3,
  },
  {
    id: 4,
    title: "Social Media Growth Content",
    category: "Page Management + Growth",
    description:
      "Content systems made to improve consistency, engagement, and page-level growth for serious brands.",
    resultPoints: [
      "Engagement-first content",
      "Better page perception",
      "Growth-oriented posting assets",
    ],
    video: video4,
    poster: poster4,
  },
];

function Portfolio() {
  const featuredItem = portfolioItems[0];
  const sideItems = portfolioItems.slice(1);

  const isMobile =
    typeof window !== "undefined" ? window.innerWidth <= 768 : false;

  return (
    <section
      id="portfolio"
      style={{
        position: "relative",
        padding: isMobile ? "80px 0" : "120px 0",
        background: theme.colors.bgSoft,
        borderBottom: `1px solid ${theme.colors.line}`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: "-8%",
          bottom: "-10%",
          width: isMobile ? "220px" : "360px",
          height: isMobile ? "220px" : "360px",
          borderRadius: "50%",
          background: "rgba(214,176,96,0.08)",
          filter: "blur(140px)",
          pointerEvents: "none",
        }}
      />

      <Container>
        <Reveal>
          <SectionTag>Portfolio</SectionTag>
        </Reveal>

        <Reveal delay={0.08}>
          <SectionHeading
            title="Creative work is valuable only when it helps brands grow."
            subtitle="Mineworld doesn’t just make content look premium. We build editing, content, and ad systems that support visibility, leads, and brand growth."
          />
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.1fr 0.9fr",
            gap: "26px",
            alignItems: "stretch",
          }}
        >
          {/* FEATURED CARD */}
          <Reveal delay={0.12}>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              style={{
                position: "relative",
                minHeight: isMobile ? "520px" : "720px",
                borderRadius: isMobile ? "24px" : "32px",
                overflow: "hidden",
                border: "1px solid rgba(214,176,96,0.3)",
                boxShadow: theme.shadow.deep,
                background: theme.colors.bg,
              }}
            >
              {isMobile ? (
                <img
                  src={featuredItem.poster}
                  alt={featuredItem.title}
                  loading="eager"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: 0.78,
                  }}
                />
              ) : (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster={featuredItem.poster}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: 0.78,
                  }}
                >
                  <source src={featuredItem.video} type="video/mp4" />
                </video>
              )}

              {isMobile && (
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "34%",
                    transform: "translate(-50%, -50%)",
                    width: "86px",
                    height: "86px",
                    borderRadius: "50%",
                    background: "rgba(0,0,0,0.28)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: "15px solid transparent",
                      borderBottom: "15px solid transparent",
                      borderLeft: "24px solid #ffffff",
                      marginLeft: "6px",
                    }}
                  />
                </div>
              )}

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.2) 35%, rgba(0,0,0,0.92) 100%)",
                }}
              />

              {!isMobile && (
                <>
                  <div
                    style={{
                      position: "absolute",
                      top: "22px",
                      left: "22px",
                      width: "70px",
                      height: "70px",
                      borderTop: `1px solid ${theme.colors.goldSoft}`,
                      borderLeft: `1px solid ${theme.colors.goldSoft}`,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "22px",
                      right: "22px",
                      width: "70px",
                      height: "70px",
                      borderBottom: `1px solid ${theme.colors.goldSoft}`,
                      borderRight: `1px solid ${theme.colors.goldSoft}`,
                    }}
                  />
                </>
              )}

              <div
                style={{
                  position: "absolute",
                  left: isMobile ? "20px" : "30px",
                  right: isMobile ? "20px" : "30px",
                  bottom: isMobile ? "20px" : "30px",
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
                  {featuredItem.category}
                </div>

                <h3
                  style={{
                    margin: "0 0 14px",
                    fontSize: isMobile ? "34px" : "clamp(34px, 4vw, 54px)",
                    fontWeight: 800,
                    lineHeight: 1.02,
                    color: theme.colors.text,
                    maxWidth: "92%",
                  }}
                >
                  {featuredItem.title}
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: theme.colors.textSoft,
                    fontSize: isMobile ? "15px" : "16px",
                    lineHeight: 1.8,
                    maxWidth: isMobile ? "100%" : "82%",
                  }}
                >
                  {featuredItem.description}
                </p>

                <div
                  style={{
                    display: "grid",
                    gap: "8px",
                    marginTop: "20px",
                    maxWidth: isMobile ? "100%" : "75%",
                  }}
                >
                  {featuredItem.resultPoints.map((point) => (
                    <div
                      key={point}
                      style={{
                        color: theme.colors.text,
                        fontSize: "14px",
                        lineHeight: 1.7,
                      }}
                    >
                      • {point}
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    marginTop: "24px",
                    display: "flex",
                    gap: "14px",
                    flexWrap: "wrap",
                  }}
                >
                  <MagneticButton>Get Leads Now</MagneticButton>
                  <MagneticButton secondary>View Work</MagneticButton>
                </div>
              </div>
            </motion.div>
          </Reveal>

          {/* SIDE STACK */}
          <div
            style={{
              display: "grid",
              gridTemplateRows: isMobile ? "auto" : "repeat(3, 1fr)",
              gap: "26px",
            }}
          >
            {sideItems.map((item, index) => (
              <Reveal key={item.id} delay={0.16 + index * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 180, damping: 18 }}
                  style={{
                    position: "relative",
                    minHeight: isMobile ? "280px" : "235px",
                    borderRadius: isMobile ? "22px" : "26px",
                    overflow: "hidden",
                    border: `1px solid ${theme.colors.line}`,
                    background: theme.colors.bg,
                    boxShadow: theme.shadow.soft,
                  }}
                >
                  {isMobile ? (
                    <img
                      src={item.poster}
                      alt={item.title}
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
                  ) : (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      poster={item.poster}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: 0.72,
                      }}
                    >
                      <source src={item.video} type="video/mp4" />
                    </video>
                  )}

                  {isMobile && (
                    <div
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: "34%",
                        transform: "translate(-50%, -50%)",
                        width: "72px",
                        height: "72px",
                        borderRadius: "50%",
                        background: "rgba(0,0,0,0.28)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        zIndex: 2,
                      }}
                    >
                      <div
                        style={{
                          width: 0,
                          height: 0,
                          borderTop: "12px solid transparent",
                          borderBottom: "12px solid transparent",
                          borderLeft: "20px solid #ffffff",
                          marginLeft: "5px",
                        }}
                      />
                    </div>
                  )}

                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.88) 100%)",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      left: "24px",
                      right: "24px",
                      bottom: "22px",
                    }}
                  >
                    <div
                      style={{
                        color: theme.colors.goldSoft,
                        fontSize: "11px",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        marginBottom: "10px",
                      }}
                    >
                      {item.category}
                    </div>

                    <h3
                      style={{
                        margin: "0 0 8px",
                        fontSize: isMobile ? "24px" : "26px",
                        fontWeight: 800,
                        lineHeight: 1.08,
                        color: theme.colors.text,
                      }}
                    >
                      {item.title}
                    </h3>

                    <p
                      style={{
                        margin: 0,
                        color: theme.colors.textSoft,
                        fontSize: "14px",
                        lineHeight: 1.7,
                      }}
                    >
                      {item.description}
                    </p>

                    <div
                      style={{
                        display: "grid",
                        gap: "6px",
                        marginTop: "12px",
                      }}
                    >
                      {item.resultPoints.map((point) => (
                        <div
                          key={point}
                          style={{
                            color: theme.colors.text,
                            fontSize: "12px",
                            lineHeight: 1.6,
                          }}
                        >
                          • {point}
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

export default Portfolio;