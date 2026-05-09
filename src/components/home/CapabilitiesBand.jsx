import { useState } from "react";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionTag from "../common/SectionTag";
import { theme } from "../../styles/theme";
import useIsMobile from "../../utils/useIsMobile";
import { useCollection } from "../../admin/hooks";
import { capabilityPillars as defaultPillars } from "../../data/capabilityPillars";
import { techStack as defaultStack } from "../../data/techStack";
import { useSiteContent } from "../../hooks/useSiteContent";
import { useSiteList } from "../../hooks/useSiteList";
import RichText from "../../lib/richText.jsx";

function buildLogoSources(tool) {
  if (tool.customLogo) return [tool.customLogo];
  if (!tool.slug) return [];
  const color = tool.color || "FFFFFF";
  return [
    `https://cdn.simpleicons.org/${tool.slug}/${color}`,
    `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${tool.slug}.svg`,
    `https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/${tool.slug}.svg`,
  ];
}

function TechLogo({ tool }) {
  const sources = buildLogoSources(tool);
  const [idx, setIdx] = useState(0);
  const failed = idx >= sources.length;

  if (failed || sources.length === 0) {
    const initial = (tool.name || "?").trim().charAt(0).toUpperCase();
    const tint = `#${tool.color || "D6B060"}`;
    return (
      <span
        aria-label={`${tool.name} logo`}
        style={{
          width: "20px",
          height: "20px",
          flexShrink: 0,
          display: "grid",
          placeItems: "center",
          borderRadius: "6px",
          background: `linear-gradient(135deg, ${tint}33, ${tint}11)`,
          border: `1px solid ${tint}55`,
          color: "var(--text-primary)",
          fontSize: "11px",
          fontWeight: 800,
          lineHeight: 1,
        }}
      >
        {initial}
      </span>
    );
  }

  return (
    <img
      src={sources[idx]}
      alt={`${tool.name} logo`}
      width="20"
      height="20"
      loading="lazy"
      decoding="async"
      onError={() => setIdx((i) => i + 1)}
      style={{
        width: "20px",
        height: "20px",
        flexShrink: 0,
        objectFit: "contain",
      }}
    />
  );
}

function CapabilitiesBand() {
  const isMobile = useIsMobile(768);
  const legacyPillars = useCollection("capabilityPillars", defaultPillars);
  const cmsPillars = useSiteList("capabilities.pillars", null);
  const pillars = cmsPillars
    ? cmsPillars.map((p) => ({
        label: p.label || "",
        title: p.title || "",
        description: p.description || "",
        bullets:
          typeof p.bullets === "string"
            ? p.bullets.split("\n").map((s) => s.trim()).filter(Boolean)
            : Array.isArray(p.bullets)
            ? p.bullets
            : [],
        accent: p.accent || "gold",
      }))
    : legacyPillars;
  const stack = useCollection("techStack", defaultStack);

  const eyebrow = useSiteContent("capabilities.eyebrow", "Build · Create · Grow");
  const headlineRich = useSiteContent("capabilities.headline_rich", null);
  const subhead = useSiteContent("capabilities.subhead", null);
  const toolsLabel = useSiteContent(
    "capabilities.tools_label",
    "Tools we ship with"
  );

  return (
    <section
      id="capabilities"
      style={{
        position: "relative",
        padding: isMobile ? "82px 0" : "122px 0",
        background: `
          radial-gradient(circle at 88% 12%, rgba(184,149,106,0.10), transparent 24%),
          radial-gradient(circle at 8% 80%, rgba(15,42,68,0.05), transparent 26%),
          var(--bg-cream-soft)
        `,
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
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
              {eyebrow}
            </SectionTag>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              style={{
                margin: "0 auto 16px",
                fontSize: isMobile ? "34px" : "clamp(36px, 5vw, 58px)",
                lineHeight: 1.05,
                letterSpacing: "-1.4px",
                color: "var(--text-primary)",
                fontWeight: 800,
                fontFamily:
                  '"Playfair Display", Georgia, "Times New Roman", serif',
                maxWidth: "920px",
              }}
            >
              {headlineRich ? (
                <RichText value={headlineRich} />
              ) : (
                <>
                  One studio.{" "}
                  <span style={{ color: "var(--accent-gold)", fontStyle: "italic" }}>
                    Every layer of your brand.
                  </span>
                </>
              )}
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p
              style={{
                margin: "0 auto",
                maxWidth: "720px",
                color: "var(--text-secondary)",
                fontSize: isMobile ? "15px" : "17px",
                lineHeight: 1.85,
              }}
            >
              {subhead ||
                "Most agencies do one thing. We engineer the full stack — what people see, what they click, and what makes them buy. Websites, apps, content, and growth, calibrated to one premium standard."}
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
              p.accent === "gold" ? "rgba(188,153,102,0.6)" : "rgba(88,110,180,0.55)";

            return (
              <Reveal key={p.title} delay={0.06 * i}>
                <div
                  className="capability-card"
                  style={{
                    position: "relative",
                    padding: isMobile ? "26px 24px" : "32px 30px",
                    borderRadius: "24px",
                    border: "1px solid var(--border-subtle)",
                    background: "var(--bg-secondary)",
                    boxShadow: "0 14px 32px rgba(15,42,68,0.06)",
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
                            ? "rgba(188,153,102,0.6)"
                            : "rgba(126,151,214,0.55)"
                        }`,
                      }}
                    />
                    <div
                      style={{
                        color: "var(--accent-gold)",
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
                      color: "var(--text-primary)",
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
                      color: "var(--text-secondary)",
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
                          color: "var(--text-primary)",
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
                                ? "var(--accent-gold)"
                                : "var(--accent-navy)",
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
              borderRadius: isMobile ? "22px" : "26px",
              border: "1px solid var(--border-cream)",
              background: "var(--bg-secondary)",
              boxShadow: "0 14px 32px rgba(15,42,68,0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                marginBottom: isMobile ? "16px" : "20px",
                justifyContent: isMobile ? "flex-start" : "center",
              }}
            >
              <div
                style={{
                  color: "var(--accent-gold)",
                  fontSize: "11px",
                  letterSpacing: "2.4px",
                  textTransform: "uppercase",
                  fontWeight: 800,
                  whiteSpace: "nowrap",
                }}
              >
                {toolsLabel}
              </div>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background:
                    "linear-gradient(90deg, rgba(188,153,102,0.32), transparent)",
                  maxWidth: "320px",
                }}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "repeat(2, minmax(0, 1fr))"
                  : "repeat(auto-fit, minmax(140px, 1fr))",
                gap: isMobile ? "10px" : "12px",
              }}
            >
              {stack.map((s) => (
                <div
                  key={s.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: isMobile ? "10px 12px" : "12px 14px",
                    borderRadius: "14px",
                    fontSize: isMobile ? "12.5px" : "13px",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    border: "1px solid var(--border-subtle)",
                    background: "var(--bg-cream-soft)",
                    transition:
                      "border-color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent-gold)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-subtle)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <TechLogo tool={s} />
                  <span style={{ whiteSpace: "nowrap" }}>{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default CapabilitiesBand;
