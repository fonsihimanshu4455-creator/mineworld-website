import { motion } from "framer-motion";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";
import SectionTag from "../common/SectionTag";
import { theme } from "../../styles/theme";

const services = [
  {
    id: 1,
    title: "Meta Ads & Lead Generation in Delhi",
    subtitle: "Primary growth engine",
    description:
      "Meta ad campaigns designed to generate real leads, real inquiries, and measurable business growth for brands, clinics, creators, and businesses in Delhi — not empty reach or vanity numbers.",
    items: [
      "Meta Ads Strategy",
      "Lead Generation Campaigns",
      "Clinic & Business Ads",
      "Offer Testing",
      "Creative + Funnel Alignment",
    ],
  },
  {
    id: 2,
    title: "Video Editing Services in Delhi",
    subtitle: "Content that converts",
    description:
      "High-retention edits for reels, ads, YouTube, podcasts, and branded content — built to turn attention into action and strengthen brand perception.",
    items: [
      "Reels Editing",
      "Ad Creative Editing",
      "Podcast Editing",
      "YouTube / Long-form",
      "High-retention Hooks",
    ],
  },
  {
    id: 3,
    title: "Social Media Management in Delhi",
    subtitle: "Page growth + consistency",
    description:
      "We don’t just post content. We build structured content systems that improve page perception, consistency, and audience trust over time for brands that want long-term digital growth.",
    items: [
      "Monthly Content Planning",
      "Posting Strategy",
      "Brand Positioning",
      "Engagement Direction",
      "Page Management",
    ],
  },
  {
    id: 4,
    title: "Podcast & Content Shoots in Delhi",
    subtitle: "Authority-building content",
    description:
      "Professional podcast shoots, creator shoots, and brand content sessions designed to create reusable authority assets — not random footage.",
    items: [
      "Podcast Shoots",
      "Creator Shoots",
      "Talking-head Content",
      "Brand Content Sessions",
      "Authority Content Production",
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
        padding: isMobile ? "82px 0" : "122px 0",
        background: `
          radial-gradient(circle at 12% 80%, rgba(214,176,96,0.08), transparent 26%),
          linear-gradient(180deg, rgba(19,29,48,0.98) 0%, rgba(16,24,39,1) 100%)
        `,
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

      <div
        style={{
          position: "absolute",
          right: "-6%",
          top: "10%",
          width: isMobile ? "180px" : "260px",
          height: isMobile ? "180px" : "260px",
          borderRadius: "50%",
          background: "rgba(88,110,180,0.08)",
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
            title="Video editing, ads, podcast production, and digital growth services in Delhi."
            subtitle="Mineworld Production helps brands, clinics, creators, and businesses in Delhi grow through video editing, Meta ads, podcast production, content systems, and social media management built for visibility, authority, and lead generation."
          />
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.18fr 0.82fr",
            gap: isMobile ? "22px" : "26px",
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateRows: isMobile ? "auto" : "1fr auto",
              gap: isMobile ? "22px" : "26px",
            }}
          >
            <Reveal delay={0.12}>
              <motion.div
                animate={{ y: isMobile ? 0 : [0, -5, 0] }}
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
                    "linear-gradient(180deg, rgba(255,255,255,0.065), rgba(255,255,255,0.025))",
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
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      color: theme.colors.goldSoft,
                      fontSize: "12px",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      marginBottom: "16px",
                      fontWeight: 700,
                    }}
                  >
                    {primary.subtitle}
                  </div>

                  <h3
                    style={{
                      margin: "0 0 16px",
                      fontSize: isMobile ? "38px" : "clamp(34px, 4vw, 54px)",
                      lineHeight: 0.98,
                      fontWeight: 800,
                      color: theme.colors.text,
                      letterSpacing: "-1.2px",
                      maxWidth: "720px",
                      fontFamily:
                        '"Playfair Display", Georgia, "Times New Roman", serif',
                    }}
                  >
                    {primary.title}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      maxWidth: "760px",
                      color: theme.colors.textSoft,
                      fontSize: isMobile ? "15px" : "17px",
                      lineHeight: 1.9,
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
                        className="mw-tag-hover"
                        style={{
                          padding: "14px 16px",
                          borderRadius: "18px",
                          border: `1px solid ${theme.colors.line}`,
                          background:
                            "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                          color: theme.colors.text,
                          fontSize: "14px",
                          fontWeight: 500,
                        }}
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      marginTop: "28px",
                      paddingTop: "22px",
                      borderTop: `1px solid ${theme.colors.line}`,
                      color: "rgba(243,239,231,0.78)",
                      lineHeight: 1.8,
                      fontSize: "14px",
                      maxWidth: "760px",
                    }}
                  >
                    This service exists to do one thing properly: bring serious
                    business opportunity through sharper creative and smarter
                    paid execution for businesses that want real lead generation
                    in Delhi.
                  </div>
                </div>
              </motion.div>
            </Reveal>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: isMobile ? "22px" : "26px",
              }}
            >
              {[supportA, supportB].map((service, index) => (
                <Reveal key={service.id} delay={0.16 + index * 0.08}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 180, damping: 18 }}
                    className="mw-shine"
                    style={{
                      minHeight: isMobile ? "auto" : "300px",
                      borderRadius: isMobile ? "22px" : "26px",
                      padding: isMobile ? "22px" : "28px",
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025))",
                      border: `1px solid ${theme.colors.line}`,
                      boxShadow: theme.shadow.soft,
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        color: theme.colors.goldSoft,
                        fontSize: "11px",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        marginBottom: "14px",
                        fontWeight: 700,
                      }}
                    >
                      {service.subtitle}
                    </div>

                    <h3
                      style={{
                        margin: "0 0 12px",
                        fontSize: isMobile ? "28px" : "31px",
                        lineHeight: 1.05,
                        fontWeight: 800,
                        color: theme.colors.text,
                        letterSpacing: "-0.8px",
                        fontFamily:
                          '"Playfair Display", Georgia, "Times New Roman", serif',
                      }}
                    >
                      {service.title}
                    </h3>

                    <p
                      style={{
                        margin: 0,
                        color: theme.colors.textSoft,
                        fontSize: "15px",
                        lineHeight: 1.85,
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
                          className="mw-tag-hover"
                          style={{
                            padding: "8px 12px",
                            borderRadius: "999px",
                            border: `1px solid ${theme.colors.line}`,
                            fontSize: "12px",
                            color: theme.colors.text,
                            background:
                              "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
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
                  "linear-gradient(180deg, rgba(255,255,255,0.065), rgba(255,255,255,0.025))",
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
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    color: theme.colors.goldSoft,
                    fontSize: "12px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    marginBottom: "16px",
                    fontWeight: 700,
                  }}
                >
                  {secondary.subtitle}
                </div>

                <h3
                  style={{
                    margin: "0 0 16px",
                    fontSize: isMobile ? "34px" : "clamp(34px, 4vw, 48px)",
                    lineHeight: 1.02,
                    fontWeight: 800,
                    maxWidth: "420px",
                    color: theme.colors.text,
                    letterSpacing: "-1px",
                    fontFamily:
                      '"Playfair Display", Georgia, "Times New Roman", serif',
                  }}
                >
                  {secondary.title}
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: theme.colors.textSoft,
                    lineHeight: 1.9,
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
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                        color: theme.colors.text,
                        fontSize: "14px",
                        fontWeight: 500,
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
                    lineHeight: 1.85,
                    fontSize: "14px",
                  }}
                >
                  Strong editing is not decoration here. It is the engine that
                  controls retention, brand perception, and how seriously your
                  business gets taken online.
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export default Services;