import { motion } from "framer-motion";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";
import SectionTag from "../common/SectionTag";
import { theme } from "../../styles/theme";

const services = [
  {
    id: 1,
    title: "Video Editing.",
    subtitle: "The core of Mineworld",
    description:
      "Retention-first editing built for reels, podcasts, ads, branded content, and long-form visual systems.",
    items: [
      "Reels Editing",
      "Podcast Editing",
      "Ad Creative Editing",
      "YouTube / Long-form Edits",
      "Cinematic Brand Content",
    ],
  },
  {
    id: 2,
    title: "Digital Growth",
    subtitle: "Strategy + execution",
    description:
      "Content systems, platform thinking, and ad-aware visual direction that helps brands grow sharper and faster.",
    items: [
      "Social Media Direction",
      "Content Strategy",
      "Ad Creative Planning",
      "Brand Positioning Support",
    ],
  },
  {
    id: 3,
    title: "Studio Production",
    subtitle: "In-house content environment",
    description:
      "Premium indoor production for podcasts, interviews, creator shoots, and controlled talking-head formats.",
    items: [
      "Podcast Setup",
      "Talking-Head Shoots",
      "Creator Content",
      "Interview Production",
    ],
  },
  {
    id: 4,
    title: "Creative Support",
    subtitle: "Precision add-ons",
    description:
      "Design support that strengthens content performance and visual consistency across platforms.",
    items: [
      "Thumbnails",
      "Social Creatives",
      "Brand Assets",
      "Campaign Support",
    ],
  },
];

function Services() {
  const primary = services[0];
  const secondary = services[1];
  const supportA = services[2];
  const supportB = services[3];

  const isMobile =
    typeof window !== "undefined" ? window.innerWidth <= 768 : false;

  return (
    <section
      id="services"
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
          left: "-8%",
          bottom: "-10%",
          width: isMobile ? "220px" : "340px",
          height: isMobile ? "220px" : "340px",
          borderRadius: "50%",
          background: "rgba(214,176,96,0.08)",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />

      <Container>
        <Reveal>
          <SectionTag>Services</SectionTag>
        </Reveal>

        <Reveal delay={0.08}>
          <SectionHeading
            title="Built with hierarchy. Not a menu of random services."
            subtitle="Mineworld is positioned around editing-first execution. Everything else supports that core — from growth systems and ad thinking to studio-backed content production and visual support."
          />
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.25fr 0.75fr",
            gap: "26px",
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateRows: isMobile ? "auto" : "1fr auto",
              gap: "26px",
            }}
          >
            <Reveal delay={0.12}>
              <motion.div
                animate={{ y: isMobile ? 0 : [0, -6, 0] }}
                whileHover={{ y: -8 }}
                transition={{
                  duration: 6,
                  repeat: isMobile ? 0 : Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  position: "relative",
                  minHeight: isMobile ? "auto" : "420px",
                  borderRadius: isMobile ? "24px" : "30px",
                  padding: isMobile ? "24px" : "34px",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025))",
                  border: "1px solid rgba(214,176,96,0.34)",
                  boxShadow: theme.shadow.deep,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-40px",
                    right: "-40px",
                    width: isMobile ? "160px" : "220px",
                    height: isMobile ? "160px" : "220px",
                    borderRadius: "50%",
                    background: "rgba(214,176,96,0.18)",
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
                    marginBottom: "16px",
                  }}
                >
                  {primary.subtitle}
                </div>

                <h3
                  style={{
                    margin: "0 0 16px",
                    fontSize: isMobile ? "42px" : "clamp(34px, 4vw, 56px)",
                    lineHeight: 1,
                    fontWeight: 800,
                    color: theme.colors.text,
                  }}
                >
                  {primary.title}
                </h3>

                <p
                  style={{
                    margin: 0,
                    maxWidth: "760px",
                    color: theme.colors.textSoft,
                    fontSize: isMobile ? "16px" : "17px",
                    lineHeight: 1.85,
                  }}
                >
                  {primary.description}
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile
                      ? "1fr"
                      : "repeat(2, minmax(0, 1fr))",
                    gap: "14px",
                    marginTop: "30px",
                  }}
                >
                  {primary.items.map((item) => (
                    <div
                      key={item}
                      style={{
                        padding: "14px 16px",
                        borderRadius: "18px",
                        border: `1px solid ${theme.colors.line}`,
                        background: theme.colors.bgCard,
                        color: theme.colors.text,
                        fontSize: "14px",
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            </Reveal>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "26px",
              }}
            >
              {[supportA, supportB].map((service, index) => (
                <Reveal key={service.id} delay={0.16 + index * 0.08}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 180, damping: 18 }}
                    style={{
                      minHeight: isMobile ? "auto" : "270px",
                      borderRadius: isMobile ? "22px" : "26px",
                      padding: isMobile ? "22px" : "28px",
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025))",
                      border: `1px solid ${theme.colors.line}`,
                      boxShadow: theme.shadow.soft,
                    }}
                  >
                    <div
                      style={{
                        color: theme.colors.goldSoft,
                        fontSize: "11px",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        marginBottom: "14px",
                      }}
                    >
                      {service.subtitle}
                    </div>

                    <h3
                      style={{
                        margin: "0 0 12px",
                        fontSize: isMobile ? "28px" : "30px",
                        lineHeight: 1.05,
                        fontWeight: 800,
                        color: theme.colors.text,
                      }}
                    >
                      {service.title}
                    </h3>

                    <p
                      style={{
                        margin: 0,
                        color: theme.colors.textSoft,
                        fontSize: "15px",
                        lineHeight: 1.8,
                      }}
                    >
                      {service.description}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px",
                        marginTop: "22px",
                      }}
                    >
                      {service.items.map((item) => (
                        <div
                          key={item}
                          style={{
                            padding: "8px 12px",
                            borderRadius: "999px",
                            border: `1px solid ${theme.colors.line}`,
                            fontSize: "12px",
                            color: theme.colors.text,
                            background: theme.colors.bgCard,
                          }}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.14}>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              style={{
                minHeight: isMobile ? "auto" : "100%",
                borderRadius: isMobile ? "24px" : "30px",
                padding: isMobile ? "24px" : "32px",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025))",
                border: `1px solid ${theme.colors.line}`,
                boxShadow: theme.shadow.deep,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: "-40px",
                  left: "-20px",
                  width: isMobile ? "140px" : "200px",
                  height: isMobile ? "140px" : "200px",
                  borderRadius: "50%",
                  background: "rgba(214,176,96,0.08)",
                  filter: "blur(75px)",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  color: theme.colors.goldSoft,
                  fontSize: "12px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                {secondary.subtitle}
              </div>

              <h3
                style={{
                  margin: "0 0 16px",
                  fontSize: isMobile ? "36px" : "clamp(34px, 4vw, 50px)",
                  lineHeight: 1.02,
                  fontWeight: 800,
                  maxWidth: "420px",
                  color: theme.colors.text,
                }}
              >
                {secondary.title}
              </h3>

              <p
                style={{
                  margin: 0,
                  color: theme.colors.textSoft,
                  lineHeight: 1.85,
                  fontSize: "16px",
                  maxWidth: isMobile ? "100%" : "440px",
                }}
              >
                {secondary.description}
              </p>

              <div
                style={{
                  marginTop: "30px",
                  display: "grid",
                  gap: "14px",
                }}
              >
                {secondary.items.map((item) => (
                  <div
                    key={item}
                    style={{
                      padding: "16px 16px",
                      borderRadius: "18px",
                      border: `1px solid ${theme.colors.line}`,
                      background: theme.colors.bgCard,
                      color: theme.colors.text,
                      fontSize: "14px",
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: "34px",
                  paddingTop: "22px",
                  borderTop: `1px solid ${theme.colors.line}`,
                  color: theme.colors.textSoft,
                  lineHeight: 1.8,
                  fontSize: "14px",
                }}
              >
                Everything here supports a single goal: making the brand look
                sharper, move better, and convert stronger.
              </div>
            </motion.div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export default Services;