import { motion } from "framer-motion";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";
import SectionTag from "../common/SectionTag";
import MagneticButton from "../common/MagneticButton";
import { theme } from "../../styles/theme";

const portfolioItems = [
  {
    id: 1,
    title: "Brand Reel System",
    category: "Editing + Brand Perception",
    description:
      "High-retention edits designed to make the brand feel sharper, more premium, and harder to ignore.",
    video: "/src/assets/portfolio-1.mp4",
    poster: "/src/assets/production.JPG",
  },
  {
    id: 2,
    title: "Podcast Visual Identity",
    category: "Studio + Content System",
    description:
      "Structured podcast content built for authority, clips, and premium multi-format distribution.",
    video: "/src/assets/portfolio-2.mp4",
    poster: "/src/assets/podcast-showcase.jpg",
  },
  {
    id: 3,
    title: "Ad Creative Direction",
    category: "Performance Visuals",
    description:
      "Ad content shaped for clarity, first-frame attention, and platform-native conversion flow.",
    video: "/src/assets/portfolio-3.mp4",
    poster: "/src/assets/ads-showcase.jpg",
  },
  {
    id: 4,
    title: "Cinematic Creator Content",
    category: "Premium Social Content",
    description:
      "Stylized edits and visual systems that turn ordinary content into strong digital presence.",
    video: "/src/assets/portfolio-4.mp4",
    poster: "/src/assets/designer.JPG",
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
            title="The work should feel premium before anyone reads the explanation."
            subtitle="Mineworld’s portfolio is not meant to be a pile of uploads. It is meant to show visual taste, editing control, and strong digital presence."
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
          <Reveal delay={0.12}>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              style={{
                position: "relative",
                minHeight: isMobile ? "460px" : "700px",
                borderRadius: isMobile ? "24px" : "32px",
                overflow: "hidden",
                border: "1px solid rgba(214,176,96,0.3)",
                boxShadow: theme.shadow.deep,
                background: theme.colors.bg,
              }}
            >
              <video
                autoPlay={!isMobile}
                loop
                muted
                playsInline
                preload={isMobile ? "none" : "metadata"}
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

              {isMobile && (
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "40%",
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
                    "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.2) 35%, rgba(0,0,0,0.9) 100%)",
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
                    maxWidth: isMobile ? "100%" : "80%",
                  }}
                >
                  {featuredItem.description}
                </p>

                <div
                  style={{
                    marginTop: "24px",
                    display: "flex",
                    gap: "14px",
                    flexWrap: "wrap",
                  }}
                >
                  <MagneticButton>View Project</MagneticButton>
                  <MagneticButton secondary>Similar Build</MagneticButton>
                </div>
              </div>
            </motion.div>
          </Reveal>

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
                    minHeight: isMobile ? "250px" : "216px",
                    borderRadius: isMobile ? "22px" : "26px",
                    overflow: "hidden",
                    border: `1px solid ${theme.colors.line}`,
                    background: theme.colors.bg,
                    boxShadow: theme.shadow.soft,
                  }}
                >
                  <video
                    autoPlay={!isMobile}
                    loop
                    muted
                    playsInline
                    preload="none"
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

                  {isMobile && (
                    <div
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: "42%",
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
                        "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%)",
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
                        margin: "0 0 6px",
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