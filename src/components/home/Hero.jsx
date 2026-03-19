import { motion } from "framer-motion";
import Container from "../common/Container";
import MagneticButton from "../common/MagneticButton";
import Reveal from "../common/Reveal";
import { theme } from "../../styles/theme";
import { openContactModal, scrollToSection } from "../../utils/contactActions";

import heroVideo from "../../assets/hero-video.mp4";
import heroPoster from "../../assets/hero.png";

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

      <Container
        style={{
          position: "relative",
          zIndex: 2,
          paddingTop: isMobile ? "108px" : "118px",
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
                Editing + Content + Digital Growth
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1
                style={{
                  margin: 0,
                  fontSize: isMobile ? "44px" : "clamp(48px, 6vw, 82px)",
                  lineHeight: isMobile ? 0.98 : 0.94,
                  fontWeight: 800,
                  letterSpacing: isMobile ? "-1.5px" : "-2.2px",
                  maxWidth: isMobile ? "100%" : "760px",
                  color: theme.colors.text,
                  textShadow: "0 6px 30px rgba(0,0,0,0.18)",
                }}
              >
                Video Editing & Digital Growth
                <br />
                Agency in Delhi
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p
                style={{
                  marginTop: "26px",
                  marginBottom: 0,
                  maxWidth: isMobile ? "100%" : "720px",
                  marginLeft: isMobile ? "auto" : 0,
                  marginRight: isMobile ? "auto" : 0,
                  color: theme.colors.textSoft,
                  fontSize: isMobile ? "16px" : "18px",
                  lineHeight: 1.9,
                }}
              >
                Mineworld Production is a Delhi-based video editing and digital
                growth agency helping brands, creators, clinics, and businesses
                grow through premium video editing, podcast shoots, graphic
                design support, social media management, and Meta ads services.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  marginTop: "34px",
                  flexWrap: "wrap",
                  justifyContent: isMobile ? "center" : "flex-start",
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
                  <MagneticButton>Start a Project</MagneticButton>
                </button>

                <button
                  onClick={() => scrollToSection("portfolio")}
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  <MagneticButton secondary>View Work</MagneticButton>
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  flexWrap: "wrap",
                  marginTop: "38px",
                  justifyContent: isMobile ? "center" : "flex-start",
                }}
              >
                {[
                  "Video Editing",
                  "Podcast Shoots",
                  "Graphic Design",
                  "Social Media",
                  "Meta Ads",
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
                  marginTop: "28px",
                  fontSize: isMobile ? "12px" : "13px",
                  letterSpacing: isMobile ? "1.2px" : "1.8px",
                  color: theme.colors.textSoft,
                  opacity: 0.85,
                  textTransform: "uppercase",
                }}
              >
                Content. Design. Ads. Presence.
              </div>
            </Reveal>

            <Reveal delay={0.58}>
              <div
                style={{
                  marginTop: "34px",
                  display: "inline-flex",
                  flexDirection: "column",
                  alignItems: isMobile ? "center" : "flex-start",
                  gap: "6px",
                }}
              >
                <div
                  style={{
                    color: "rgba(214,176,96,0.96)",
                    fontSize: isMobile ? "34px" : "44px",
                    lineHeight: 1,
                    fontStyle: "italic",
                    fontWeight: 500,
                    fontFamily:
                      '"Brush Script MT", "Lucida Handwriting", "Segoe Script", cursive',
                    letterSpacing: "0.3px",
                    textShadow: "0 0 16px rgba(214,176,96,0.10)",
                  }}
                >
                  Mineworld Production
                </div>

                <div
                  style={{
                    width: isMobile ? "180px" : "240px",
                    height: "1px",
                    background:
                      "linear-gradient(90deg, rgba(214,176,96,0.72), rgba(214,176,96,0.16), transparent)",
                  }}
                />
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
              {isMobile ? (
                <img
                  src={heroPoster}
                  alt="Mineworld Production video editing and digital growth agency in Delhi"
                  loading="eager"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: 0.95,
                    transform: "scale(1.03)",
                  }}
                />
              ) : (
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
              )}

              {isMobile && (
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "46%",
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
                    "linear-gradient(180deg, rgba(0,0,0,0.10), rgba(0,0,0,0.22) 35%, rgba(0,0,0,0.78))",
                }}
              />

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
                  Video + Design + Digital
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
                  built to strengthen brand presence
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