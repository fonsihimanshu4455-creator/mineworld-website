import { motion } from "framer-motion";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";
import SectionTag from "../common/SectionTag";
import MagneticButton from "../common/MagneticButton";
import { theme } from "../../styles/theme";
import { openContactModal, scrollToSection } from "../../utils/contactActions";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useSiteContent } from "../../context/SiteContent";

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
      "Creative assets built to help brands attract attention, generate stronger inquiries, and convert viewers into real business opportunity.",
    resultPoints: [
      "High-retention ad creatives",
      "Built for lead generation",
      "Optimized for paid performance",
    ],
    video: video1,
    poster: poster1,
  },
  {
    id: 2,
    title: "Podcast Authority Content",
    category: "Content + Brand Trust",
    description:
      "Podcast shoots and edits designed to build authority, strengthen trust, and create reusable multi-platform content.",
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
      "Video assets shaped for first-frame attention, stronger clarity, and better lead performance across campaigns.",
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
      "Content systems designed to improve consistency, engagement, and overall page perception for serious brands.",
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
  const isMobile = useIsMobile();
  const { content } = useSiteContent();
  const overrides = content.portfolioOverrides || {};

  const items = portfolioItems.map((item) => {
    const o = overrides[item.id] || {};
    return {
      ...item,
      title: o.title || item.title,
      description: o.description || item.description,
      video: o.videoUrl || item.video,
    };
  });

  const featuredItem = items[0];
  const sideItems = items.slice(1);

  return (
    <section
      id="portfolio"
      style={{
        position: "relative",
        padding: isMobile ? "82px 0" : "122px 0",
        background: `
          radial-gradient(circle at 86% 18%, rgba(214,176,96,0.08), transparent 22%),
          linear-gradient(180deg, rgba(16,24,39,1) 0%, rgba(13,20,34,1) 100%)
        `,
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

      <div
        style={{
          position: "absolute",
          left: "-6%",
          top: "12%",
          width: isMobile ? "180px" : "260px",
          height: isMobile ? "180px" : "260px",
          borderRadius: "50%",
          background: "rgba(88,110,180,0.07)",
          filter: "blur(120px)",
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
            subtitle="Mineworld doesn’t just make content look premium. We build editing, content, and ad systems that support visibility, authority, leads, and stronger market perception."
          />
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.08fr 0.92fr",
            gap: isMobile ? "22px" : "26px",
            alignItems: "stretch",
          }}
        >
          <Reveal delay={0.12}>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              style={{
                position: "relative",
                minHeight: isMobile ? "540px" : "740px",
                borderRadius: isMobile ? "24px" : "32px",
                overflow: "hidden",
                border: "1px solid rgba(214,176,96,0.30)",
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
                    opacity: 0.8,
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
                    opacity: 0.8,
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
                    "linear-gradient(180deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.18) 34%, rgba(0,0,0,0.92) 100%)",
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
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    color: theme.colors.goldSoft,
                    fontSize: "12px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    marginBottom: "14px",
                    fontWeight: 700,
                  }}
                >
                  {featuredItem.category}
                </div>

                <h3
                  style={{
                    margin: "0 0 14px",
                    fontSize: isMobile
                      ? "clamp(24px, 7vw, 32px)"
                      : "clamp(34px, 4vw, 52px)",
                    fontWeight: 800,
                    lineHeight: isMobile ? 1.08 : 1.02,
                    color: theme.colors.text,
                    maxWidth: isMobile ? "100%" : "92%",
                    letterSpacing: isMobile ? "-0.4px" : "-1px",
                    wordBreak: "break-word",
                    fontFamily:
                      '"Playfair Display", Georgia, "Times New Roman", serif',
                  }}
                >
                  {featuredItem.title}
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: theme.colors.textSoft,
                    fontSize: isMobile ? "15px" : "16px",
                    lineHeight: 1.85,
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
                        fontWeight: 500,
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
                  <button
                    onClick={openContactModal}
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                    }}
                  >
                    <MagneticButton>Start Your Project</MagneticButton>
                  </button>

                  <button
                    onClick={() => scrollToSection("contact")}
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                    }}
                  >
                    <MagneticButton secondary>Talk to Mineworld</MagneticButton>
                  </button>
                </div>
              </div>
            </motion.div>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateRows: isMobile ? "auto" : "repeat(3, 1fr)",
              gap: isMobile ? "22px" : "26px",
            }}
          >
            {sideItems.map((item, index) => (
              <Reveal key={item.id} delay={0.16 + index * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 180, damping: 18 }}
                  style={{
                    position: "relative",
                    minHeight: isMobile ? "290px" : "238px",
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
                        opacity: 0.74,
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
                        opacity: 0.74,
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
                        "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.88) 100%)",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      left: "24px",
                      right: "24px",
                      bottom: "22px",
                      zIndex: 2,
                    }}
                  >
                    <div
                      style={{
                        color: theme.colors.goldSoft,
                        fontSize: "11px",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        marginBottom: "10px",
                        fontWeight: 700,
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
                        letterSpacing: "-0.5px",
                        fontFamily:
                          '"Playfair Display", Georgia, "Times New Roman", serif',
                      }}
                    >
                      {item.title}
                    </h3>

                    <p
                      style={{
                        margin: 0,
                        color: theme.colors.textSoft,
                        fontSize: "14px",
                        lineHeight: 1.72,
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
                            fontWeight: 500,
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