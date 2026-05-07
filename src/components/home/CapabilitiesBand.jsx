import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionTag from "../common/SectionTag";
import { theme } from "../../styles/theme";
import useIsMobile from "../../utils/useIsMobile";

const pillars = [
  {
    label: "Build",
    title: "Websites & Apps",
    description:
      "Bespoke websites, e-commerce storefronts, and iOS + Android apps — built on modern stacks, tuned for speed, and designed to convert.",
    bullets: [
      "Next.js · React · Shopify",
      "React Native · Flutter",
      "Sub-2s loads · Core Web Vitals",
    ],
    accent: "gold",
  },
  {
    label: "Create",
    title: "Video, Design & Shoots",
    description:
      "Retention-first reels, ad creative, podcast shoots, and platform-ready design — produced under one roof, finished to a broadcast standard.",
    bullets: [
      "Premiere Pro · After Effects · DaVinci",
      "Figma · Photoshop · Illustrator",
      "Director-led shoots in Delhi NCR",
    ],
    accent: "blue",
  },
  {
    label: "Grow",
    title: "Ads, Social & SEO",
    description:
      "Meta ad campaigns, social media systems, and SEO foundations engineered around real leads and measurable revenue — never vanity reach.",
    bullets: [
      "Meta Ads · Google Ads",
      "GA4 · Pixel · Attribution",
      "Instagram · LinkedIn · YouTube",
    ],
    accent: "gold",
  },
];

const stack = [
  "Next.js",
  "React",
  "React Native",
  "Flutter",
  "Shopify",
  "Node.js",
  "Firebase",
  "Figma",
  "Premiere Pro",
  "After Effects",
  "Meta Ads Manager",
  "GA4",
];

function CapabilitiesBand() {
  const isMobile = useIsMobile(768);

  return (
    <section
      id="capabilities"
      style={{
        position: "relative",
        padding: isMobile ? "82px 0" : "122px 0",
        background: `
          radial-gradient(circle at 88% 12%, rgba(214,176,96,0.10), transparent 24%),
          radial-gradient(circle at 8% 80%, rgba(88,110,180,0.10), transparent 26%),
          linear-gradient(180deg, #0c1322 0%, #111a2c 100%)
        `,
        borderTop: `1px solid ${theme.colors.line}`,
        borderBottom: `1px solid ${theme.colors.line}`,
        overflow: "hidden",
      }}
    >
      <Container>
        <div style={{ textAlign: isMobile ? "left" : "center" }}>
          <Reveal>
            <SectionTag
              style={{
                marginLeft: isMobile ? 0 : "auto",
                marginRight: isMobile ? 0 : "auto",
                display: "inline-block",
              }}
            >
              Build · Create · Grow
            </SectionTag>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              style={{
                margin: "0 auto 16px",
                fontSize: isMobile ? "34px" : "clamp(36px, 5vw, 58px)",
                lineHeight: 1.05,
                letterSpacing: "-1.4px",
                color: theme.colors.text,
                fontWeight: 800,
                fontFamily:
                  '"Playfair Display", Georgia, "Times New Roman", serif',
                maxWidth: "920px",
              }}
            >
              One studio.{" "}
              <span style={{ color: theme.colors.gold, fontStyle: "italic" }}>
                Every layer of your brand.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p
              style={{
                margin: "0 auto",
                maxWidth: "720px",
                color: theme.colors.textSoft,
                fontSize: isMobile ? "15px" : "17px",
                lineHeight: 1.85,
              }}
            >
              Most agencies do one thing. We engineer the full stack — what
              people see, what they click, and what makes them buy. Websites,
              apps, content, and growth, calibrated to one premium standard.
            </p>
          </Reveal>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fit, minmax(280px, 1fr))",
            gap: isMobile ? "16px" : "20px",
            marginTop: isMobile ? "40px" : "60px",
          }}
        >
          {pillars.map((p, i) => {
            const accentColor =
              p.accent === "gold" ? "rgba(214,176,96,0.6)" : "rgba(88,110,180,0.55)";

            return (
              <Reveal key={p.title} delay={0.06 * i}>
                <div
                  className="capability-card"
                  style={{
                    position: "relative",
                    padding: isMobile ? "26px 24px" : "32px 30px",
                    borderRadius: "24px",
                    border: `1px solid ${theme.colors.line}`,
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))",
                    height: "100%",
                    overflow: "hidden",
                  }}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: "-40px",
                      right: "-40px",
                      width: "160px",
                      height: "160px",
                      borderRadius: "50%",
                      background: accentColor,
                      filter: "blur(80px)",
                      opacity: 0.4,
                      pointerEvents: "none",
                    }}
                  />

                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "16px",
                    }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background:
                          p.accent === "gold"
                            ? theme.colors.gold
                            : "#7E97D6",
                        boxShadow: `0 0 12px ${
                          p.accent === "gold"
                            ? "rgba(214,176,96,0.6)"
                            : "rgba(126,151,214,0.55)"
                        }`,
                      }}
                    />
                    <div
                      style={{
                        color: theme.colors.goldSoft,
                        fontSize: "11px",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        fontWeight: 800,
                      }}
                    >
                      {p.label}
                    </div>
                  </div>

                  <h3
                    style={{
                      position: "relative",
                      margin: "0 0 12px",
                      fontSize: isMobile ? "24px" : "26px",
                      lineHeight: 1.18,
                      color: theme.colors.text,
                      fontWeight: 800,
                      letterSpacing: "-0.6px",
                      fontFamily:
                        '"Playfair Display", Georgia, "Times New Roman", serif',
                    }}
                  >
                    {p.title}
                  </h3>

                  <p
                    style={{
                      position: "relative",
                      margin: "0 0 18px",
                      color: theme.colors.textSoft,
                      fontSize: "14.5px",
                      lineHeight: 1.85,
                    }}
                  >
                    {p.description}
                  </p>

                  <ul
                    style={{
                      position: "relative",
                      listStyle: "none",
                      margin: 0,
                      padding: 0,
                      display: "grid",
                      gap: "8px",
                    }}
                  >
                    {p.bullets.map((b) => (
                      <li
                        key={b}
                        style={{
                          display: "flex",
                          gap: "10px",
                          color: theme.colors.text,
                          fontSize: "13.5px",
                          fontWeight: 600,
                          lineHeight: 1.55,
                        }}
                      >
                        <span
                          aria-hidden="true"
                          style={{
                            color:
                              p.accent === "gold"
                                ? theme.colors.gold
                                : "#9DB3E0",
                            fontWeight: 800,
                          }}
                        >
                          ✦
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <div
            style={{
              marginTop: isMobile ? "44px" : "64px",
              padding: isMobile ? "22px 18px" : "26px 28px",
              borderRadius: "999px",
              border: `1px solid ${theme.colors.line}`,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))",
              display: "flex",
              alignItems: "center",
              gap: isMobile ? "12px" : "20px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                color: theme.colors.goldSoft,
                fontSize: "11px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontWeight: 800,
                whiteSpace: "nowrap",
              }}
            >
              Stack
            </div>
            <div
              style={{
                width: "1px",
                height: "16px",
                background: theme.colors.line,
                display: isMobile ? "none" : "block",
              }}
            />
            <div
              style={{
                display: "flex",
                gap: isMobile ? "8px" : "10px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {stack.map((s) => (
                <span
                  key={s}
                  style={{
                    padding: "7px 12px",
                    borderRadius: "999px",
                    fontSize: isMobile ? "12px" : "12.5px",
                    fontWeight: 700,
                    color: theme.colors.text,
                    border: `1px solid ${theme.colors.line}`,
                    background: "rgba(255,255,255,0.03)",
                    letterSpacing: "0.2px",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default CapabilitiesBand;
