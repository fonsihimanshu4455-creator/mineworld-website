import { motion } from "framer-motion";
import Container from "../common/Container";
import MagneticButton from "../common/MagneticButton";
import Reveal from "../common/Reveal";
import { theme } from "../../styles/theme";
import heroPoster from "../../assets/hero.png";
import heroVideo from "../../assets/hero-video.mp4";

function Hero() {
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth <= 768 : false;

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: `
          radial-gradient(circle at 18% 24%, rgba(214,176,96,0.14), transparent 22%),
          radial-gradient(circle at 82% 20%, rgba(255,255,255,0.04), transparent 18%),
          linear-gradient(135deg, #111827 0%, #162033 45%, #1b2740 100%)
        `,
        borderBottom: `1px solid ${theme.colors.line}`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.015), transparent 28%, transparent 72%, rgba(214,176,96,0.04))",
          pointerEvents: "none",
        }}
      />

      {!isMobile && (
        <>
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "6%",
              width: "1px",
              background: "rgba(255,255,255,0.06)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: "6%",
              width: "1px",
              background: "rgba(255,255,255,0.06)",
              pointerEvents: "none",
            }}
          />
        </>
      )}

      <Container
        style={{
          position: "relative",
          zIndex: 2,
          paddingTop: isMobile ? "110px" : "120px",
          paddingBottom: isMobile ? "60px" : "80px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.05fr 0.95fr",
            alignItems: "center",
            gap: isMobile ? "36px" : "56px",
          }}
        >
          <div style={{ textAlign: isMobile ? "center" : "left" }}>
            <Reveal>
              <div
                style={{
                  fontSize: isMobile ? "11px" : "12px",
                  letterSpacing: isMobile ? "2px" : "3px",
                  textTransform: "uppercase",
                  color: theme.colors.goldSoft,
                  marginBottom: "24px",
                }}
              >
                Delhi’s Most Authentic New-Age Production Studio
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1
                style={{
                  margin: 0,
                  fontSize: isMobile ? "54px" : "clamp(54px, 7.5vw, 104px)",
                  lineHeight: isMobile ? 0.96 : 0.93,
                  fontWeight: 800,
                  letterSpacing: isMobile ? "-2px" : "-2.8px",
                  maxWidth: isMobile ? "100%" : "760px",
                  color: theme.colors.text,
                  textShadow: "0 6px 30px rgba(0,0,0,0.18)",
                }}
              >
                We Edit
                <br />
                Attention.
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p
                style={{
                  marginTop: "28px",
                  marginBottom: 0,
                  maxWidth: isMobile ? "100%" : "640px",
                  marginLeft: isMobile ? "auto" : 0,
                  marginRight: isMobile ? "auto" : 0,
                  color: theme.colors.textSoft,
                  fontSize: isMobile ? "17px" : "19px",
                  lineHeight: 1.85,
                }}
              >
                Mineworld builds cinematic digital presence for brands that
                refuse to look ordinary. We don’t just edit content — we
                engineer attention, retention, and perception across every
                frame.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  marginTop: "36px",
                  flexWrap: "wrap",
                  justifyContent: isMobile ? "center" : "flex-start",
                }}
              >
                <MagneticButton>Start a Project</MagneticButton>
                <MagneticButton secondary>View Work</MagneticButton>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  flexWrap: "wrap",
                  marginTop: "42px",
                  justifyContent: isMobile ? "center" : "flex-start",
                }}
              >
                {[
                  "Video Editing",
                  "Ad Creatives",
                  "Podcast Production",
                  "Brand Growth",
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      padding: "11px 16px",
                      border: `1px solid ${theme.colors.line}`,
                      borderRadius: "999px",
                      color: theme.colors.text,
                      fontSize: isMobile ? "13px" : "14px",
                      background: "rgba(58,78,115,0.75)",
                      boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.5}>
              <div
                style={{
                  marginTop: "30px",
                  fontSize: isMobile ? "12px" : "13px",
                  letterSpacing: isMobile ? "1.2px" : "1.8px",
                  color: theme.colors.textSoft,
                  opacity: 0.85,
                  textTransform: "uppercase",
                }}
              >
                Built for brands that want to dominate attention, not blend in.
              </div>
            </Reveal>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.25 }}
            style={{
              position: "relative",
              minHeight: isMobile ? "420px" : "660px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!isMobile && (
              <>
                <div
                  style={{
                    position: "absolute",
                    width: "55%",
                    height: "55%",
                    background: "rgba(214,176,96,0.22)",
                    filter: "blur(120px)",
                    borderRadius: "50%",
                    zIndex: -2,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    width: "87%",
                    height: "92%",
                    borderRadius: "34px",
                    background: "rgba(255,255,255,0.025)",
                    top: "36px",
                    left: "36px",
                    filter: "blur(18px)",
                    zIndex: -1,
                  }}
                />
              </>
            )}

            <motion.div
              animate={{ y: isMobile ? 0 : [0, -10, 0] }}
              transition={{
                duration: 5.5,
                repeat: isMobile ? 0 : Infinity,
                ease: "easeInOut",
              }}
              style={{
                width: "100%",
                maxWidth: isMobile ? "100%" : "540px",
                height: isMobile ? "420px" : "580px",
                borderRadius: isMobile ? "24px" : "34px",
                overflow: "hidden",
                position: "relative",
                background: theme.colors.bgCard,
                border: `1px solid ${theme.colors.lineStrong}`,
                boxShadow: `
                  0 30px 80px rgba(0,0,0,0.5),
                  inset 0 0 0.5px rgba(255,255,255,0.2)
                `,
              }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster={heroPoster}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.95,
                  transform: "scale(1.12)",
                  filter: "contrast(1.15) brightness(1.05) saturate(1.1)",
                }}
              >
                <source src={heroVideo} type="video/mp4" />
              </video>

              {!isMobile && (
                <motion.div
                  animate={{ x: ["-100%", "130%"] }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    width: "120px",
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
                  }}
                />
              )}

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.10), rgba(0,0,0,0.22) 35%, rgba(0,0,0,0.78))",
                }}
              />

              {!isMobile && (
                <>
                  <div
                    style={{
                      position: "absolute",
                      top: "20px",
                      left: "20px",
                      width: "68px",
                      height: "68px",
                      borderTop: `1.5px solid ${theme.colors.goldSoft}`,
                      borderLeft: `1.5px solid ${theme.colors.goldSoft}`,
                      opacity: 0.95,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "20px",
                      right: "20px",
                      width: "68px",
                      height: "68px",
                      borderBottom: `1.5px solid ${theme.colors.goldSoft}`,
                      borderRight: `1.5px solid ${theme.colors.goldSoft}`,
                      opacity: 0.95,
                    }}
                  />
                </>
              )}

              <div
                style={{
                  position: "absolute",
                  left: isMobile ? "18px" : "26px",
                  right: isMobile ? "18px" : "26px",
                  bottom: isMobile ? "18px" : "26px",
                }}
              >
                <div
                  style={{
                    fontSize: isMobile ? "11px" : "13px",
                    color: theme.colors.goldSoft,
                    letterSpacing: isMobile ? "1.4px" : "2px",
                    textTransform: "uppercase",
                    marginBottom: "12px",
                  }}
                >
                  Editing-First Identity
                </div>

                <div
                  style={{
                    fontSize: isMobile ? "22px" : "24px",
                    fontWeight: 800,
                    lineHeight: 1.18,
                    color: theme.colors.text,
                    textShadow: "0 4px 18px rgba(0,0,0,0.22)",
                    maxWidth: isMobile ? "88%" : "100%",
                  }}
                >
                  Premium content systems
                  <br />
                  built to command attention
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;