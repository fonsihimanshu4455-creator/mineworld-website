import { motion } from "framer-motion";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";
import SectionTag from "../common/SectionTag";
import MagneticButton from "../common/MagneticButton";
import { theme } from "../../styles/theme";
import founderImage from "../../assets/himanshu.JPG";
import useIsMobile from "../../utils/useIsMobile";
import { useParallax } from "../../utils/gsapHooks";

function FounderSection() {
  const isMobile = useIsMobile(768);
  const parallaxRef = useParallax({ speed: 0.12 });

  return (
    <section
      id="about"
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
          right: "-6%",
          top: "12%",
          width: isMobile ? "220px" : "360px",
          height: isMobile ? "220px" : "360px",
          borderRadius: "50%",
          background: "rgba(214,176,96,0.10)",
          filter: "blur(140px)",
          pointerEvents: "none",
        }}
      />

      <Container>
        <Reveal>
          <SectionTag>Founder</SectionTag>
        </Reveal>

        <Reveal delay={0.08}>
          <SectionHeading
            title="A premium brand needs a visible standard behind it."
            subtitle="Mineworld is being built with a founder-led eye for sharp editing, strong perception, and a no-template approach to content, visuals, and digital authority."
          />
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "0.9fr 1.1fr",
            gap: "30px",
            alignItems: "stretch",
          }}
        >
          <Reveal delay={0.12}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              style={{
                position: "relative",
                minHeight: isMobile ? "420px" : "620px",
                borderRadius: isMobile ? "24px" : "30px",
                overflow: "hidden",
                border: "1px solid rgba(214,176,96,0.32)",
                boxShadow: theme.shadow.deep,
                background: theme.colors.bgCard,
              }}
            >
              <img
                ref={parallaxRef}
                src={founderImage}
                alt="Himanshu Bhardwaj"
                loading="lazy"
                style={{
                  width: "100%",
                  height: "112%",
                  transform: "translateZ(0)",
                  objectFit: "cover",
                  opacity: 0.88,
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.18) 35%, rgba(0,0,0,0.78) 100%)",
                }}
              />

              {!isMobile && (
                <>
                  <div
                    style={{
                      position: "absolute",
                      top: "20px",
                      left: "20px",
                      width: "70px",
                      height: "70px",
                      borderTop: `1px solid ${theme.colors.goldSoft}`,
                      borderLeft: `1px solid ${theme.colors.goldSoft}`,
                      opacity: 0.9,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "20px",
                      right: "20px",
                      width: "70px",
                      height: "70px",
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
                  left: "28px",
                  right: "28px",
                  bottom: "28px",
                }}
              >
                <div
                  style={{
                    color: theme.colors.goldSoft,
                    fontSize: "12px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    marginBottom: "12px",
                  }}
                >
                  Founder & Creative Director
                </div>

                <div
                  style={{
                    fontSize: isMobile ? "28px" : "34px",
                    fontWeight: 800,
                    lineHeight: 1.05,
                    marginBottom: "12px",
                    color: theme.colors.text,
                  }}
                >
                  Himanshu Bhardwaj
                </div>

                <div
                  style={{
                    color: theme.colors.textSoft,
                    lineHeight: 1.7,
                    fontSize: "15px",
                    maxWidth: "90%",
                  }}
                >
                  Building Mineworld with an editing-first mindset, premium
                  standards, and a sharp focus on how brands are perceived.
                </div>
              </div>
            </motion.div>
          </Reveal>

          <Reveal delay={0.16}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              style={{
                position: "relative",
                minHeight: isMobile ? "auto" : "620px",
                borderRadius: isMobile ? "24px" : "30px",
                padding: isMobile ? "24px" : "36px",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025))",
                border: `1px solid ${theme.colors.line}`,
                boxShadow: theme.shadow.deep,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-40px",
                  right: "-20px",
                  width: isMobile ? "160px" : "220px",
                  height: isMobile ? "160px" : "220px",
                  borderRadius: "50%",
                  background: "rgba(214,176,96,0.10)",
                  filter: "blur(90px)",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  color: theme.colors.goldSoft,
                  fontSize: "12px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: "14px",
                }}
              >
                The standard behind the brand
              </div>

              <h3
                style={{
                  margin: "0 0 16px",
                  fontSize: isMobile ? "40px" : "clamp(34px, 4vw, 52px)",
                  lineHeight: 1.03,
                  fontWeight: 800,
                  maxWidth: "640px",
                  color: theme.colors.text,
                }}
              >
                Mineworld is not being built to look “nice.”
                <br />
                It is being built to feel unforgettable.
              </h3>

              <p
                style={{
                  margin: 0,
                  color: theme.colors.textSoft,
                  lineHeight: 1.9,
                  fontSize: isMobile ? "16px" : "17px",
                  maxWidth: "720px",
                }}
              >
                The vision behind Mineworld is simple: create a production and
                digital brand that feels sharper, more cinematic, more premium,
                and more strategically aware than the usual market standard.
                Every section, every frame, and every output is meant to feel
                intentional — not generic.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: "16px",
                  marginTop: "30px",
                }}
              >
                {[
                  "Editing-first brand thinking",
                  "High visual standards",
                  "No-template creative direction",
                  "Premium digital positioning",
                  "Studio + growth integration",
                  "Authority-led execution",
                ].map((point) => (
                  <div
                    key={point}
                    style={{
                      padding: "16px 16px",
                      borderRadius: "18px",
                      border: `1px solid ${theme.colors.line}`,
                      background: theme.colors.bgCard,
                      fontSize: "14px",
                      color: theme.colors.text,
                    }}
                  >
                    {point}
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: "30px",
                  padding: "22px 22px",
                  borderRadius: "22px",
                  border: `1px solid ${theme.colors.line}`,
                  background: theme.colors.bgCard,
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
                  Founder Note
                </div>

                <p
                  style={{
                    margin: 0,
                    color: theme.colors.textSoft,
                    lineHeight: 1.85,
                    fontSize: "15px",
                  }}
                >
                  “Mineworld is being built for clients and brands who want to
                  look stronger, sharper, and harder to ignore. The goal is not
                  to produce more content. The goal is to shape perception.”
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  flexWrap: "wrap",
                  marginTop: "28px",
                }}
              >
                <MagneticButton>Explore Founder Profile</MagneticButton>
                <MagneticButton secondary>Build with Mineworld</MagneticButton>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export default FounderSection;