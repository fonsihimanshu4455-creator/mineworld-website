import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "../components/common/Container";
import MagneticButton from "../components/common/MagneticButton";
import Reveal from "../components/common/Reveal";
import LazyVideo from "../components/common/LazyVideo";
import { theme } from "../styles/theme";
import {
  findPortfolioItem,
  portfolioItems,
} from "../data/portfolioItems";
import { findCaseStudy } from "../data/caseStudies";
import { findServiceCategory } from "../data/serviceCategories";
import { openContactModal, trackCtaClick } from "../utils/contactActions";
import { trackEvent } from "../utils/analytics";
import useIsMobile from "../utils/useIsMobile";

function PortfolioDetail() {
  const { slug } = useParams();
  const item = findPortfolioItem(slug);
  const isMobile = useIsMobile(768);

  useEffect(() => {
    if (!item) return;
    document.title = `${item.title} | Mineworld Portfolio`;
    trackEvent("portfolio_view", { slug: item.slug });
  }, [item]);

  if (!item) {
    return (
      <section
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "140px 24px",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "520px" }}>
          <h1
            style={{
              margin: "0 0 14px",
              color: theme.colors.text,
              fontSize: "clamp(28px, 4vw, 40px)",
            }}
          >
            Portfolio piece not found.
          </h1>
          <Link to="/#portfolio" style={{ textDecoration: "none" }}>
            <MagneticButton>Back to Portfolio</MagneticButton>
          </Link>
        </div>
      </section>
    );
  }

  const caseStudy = item.caseStudySlug ? findCaseStudy(item.caseStudySlug) : null;
  const service = item.serviceSlug ? findServiceCategory(item.serviceSlug) : null;
  const others = portfolioItems.filter((p) => p.slug !== item.slug);

  return (
    <article
      style={{
        background: `
          radial-gradient(circle at 14% 10%, rgba(214,176,96,0.10), transparent 22%),
          linear-gradient(180deg, #111827 0%, #141c2f 50%, #111827 100%)
        `,
      }}
    >
      <section
        style={{
          padding: isMobile ? "124px 0 40px" : "150px 0 60px",
          borderBottom: `1px solid ${theme.colors.line}`,
        }}
      >
        <Container>
          <Link
            to="/#portfolio"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: theme.colors.goldSoft,
              fontSize: "13px",
              letterSpacing: "1.4px",
              textTransform: "uppercase",
              textDecoration: "none",
              fontWeight: 700,
              marginBottom: "26px",
            }}
          >
            ← All Portfolio
          </Link>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1.05fr",
              gap: isMobile ? "28px" : "48px",
              alignItems: "center",
            }}
          >
            <div>
              <Reveal>
                <div
                  style={{
                    color: theme.colors.goldSoft,
                    fontSize: "12px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    marginBottom: "16px",
                  }}
                >
                  {item.category}
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <h1
                  style={{
                    margin: 0,
                    fontSize: isMobile ? "34px" : "clamp(38px, 5vw, 60px)",
                    lineHeight: 1.05,
                    letterSpacing: "-1.4px",
                    color: theme.colors.text,
                    fontWeight: 800,
                    fontFamily:
                      '"Playfair Display", Georgia, "Times New Roman", serif',
                  }}
                >
                  {item.title}
                </h1>
              </Reveal>
              <Reveal delay={0.14}>
                <p
                  style={{
                    marginTop: "18px",
                    color: theme.colors.text,
                    fontSize: isMobile ? "16px" : "18px",
                    lineHeight: 1.55,
                    fontWeight: 500,
                    maxWidth: "560px",
                  }}
                >
                  {item.short}
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p
                  style={{
                    marginTop: "12px",
                    color: theme.colors.textSoft,
                    fontSize: isMobile ? "15px" : "16px",
                    lineHeight: 1.9,
                    maxWidth: "560px",
                  }}
                >
                  {item.longDescription}
                </p>
              </Reveal>

              <Reveal delay={0.26}>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    marginTop: "26px",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    onClick={() => {
                      trackCtaClick(
                        "Start a Project",
                        `portfolio-${item.slug}-hero`
                      );
                      openContactModal(`portfolio-${item.slug}`);
                    }}
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                    }}
                  >
                    <MagneticButton>Start a Project</MagneticButton>
                  </button>
                  {caseStudy && (
                    <Link
                      to={`/case-studies/${caseStudy.slug}`}
                      style={{ textDecoration: "none" }}
                    >
                      <MagneticButton secondary>View Case Study</MagneticButton>
                    </Link>
                  )}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.18}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4 / 5",
                  borderRadius: isMobile ? "24px" : "32px",
                  overflow: "hidden",
                  border: `1px solid ${theme.colors.lineStrong}`,
                  boxShadow: theme.shadow.deep,
                  background: theme.colors.bgCard,
                }}
              >
                {item.cover.type === "video" ? (
                  <LazyVideo
                    src={item.cover.src}
                    poster={item.cover.poster}
                    ariaLabel={item.cover.alt}
                    rootMargin="0px"
                    style={{ position: "absolute", inset: 0 }}
                  />
                ) : (
                  <img
                    src={item.cover.src}
                    alt={item.cover.alt}
                    loading="eager"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.03), rgba(0,0,0,0.3))",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {item.metrics?.length > 0 && (
        <section
          style={{
            padding: isMobile ? "56px 0" : "80px 0",
            borderBottom: `1px solid ${theme.colors.line}`,
          }}
        >
          <Container>
            <Reveal>
              <div
                style={{
                  color: theme.colors.goldSoft,
                  fontSize: "12px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  marginBottom: "14px",
                }}
              >
                Impact
              </div>
              <h2
                style={{
                  margin: "0 0 28px",
                  fontSize: isMobile ? "26px" : "clamp(28px, 3.6vw, 38px)",
                  color: theme.colors.text,
                  letterSpacing: "-0.8px",
                  fontFamily:
                    '"Playfair Display", Georgia, "Times New Roman", serif',
                }}
              >
                What the work actually moved.
              </h2>
            </Reveal>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "14px",
              }}
            >
              {item.metrics.map((m, i) => (
                <Reveal key={m.label} delay={0.05 * i}>
                  <div
                    style={{
                      padding: "22px",
                      borderRadius: "20px",
                      border: `1px solid ${theme.colors.line}`,
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))",
                    }}
                  >
                    <div
                      style={{
                        color: theme.colors.goldSoft,
                        fontSize: "11px",
                        letterSpacing: "1.6px",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        marginBottom: "10px",
                      }}
                    >
                      {m.label}
                    </div>
                    <div
                      style={{
                        color: theme.colors.text,
                        fontSize: "22px",
                        fontWeight: 800,
                        letterSpacing: "-0.6px",
                        lineHeight: 1.2,
                      }}
                    >
                      {m.value}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {item.gallery?.length > 0 && (
        <section
          style={{
            padding: isMobile ? "56px 0" : "80px 0",
            borderBottom: `1px solid ${theme.colors.line}`,
          }}
        >
          <Container>
            <Reveal>
              <div
                style={{
                  color: theme.colors.goldSoft,
                  fontSize: "12px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  marginBottom: "14px",
                }}
              >
                Stills + Samples
              </div>
              <h2
                style={{
                  margin: "0 0 28px",
                  fontSize: isMobile ? "24px" : "clamp(26px, 3.4vw, 34px)",
                  color: theme.colors.text,
                  letterSpacing: "-0.6px",
                  fontFamily:
                    '"Playfair Display", Georgia, "Times New Roman", serif',
                }}
              >
                A look at the work.
              </h2>
            </Reveal>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "16px",
              }}
            >
              {item.gallery.map((g, i) => (
                <Reveal key={i} delay={0.05 * i}>
                  <div
                    style={{
                      position: "relative",
                      borderRadius: "20px",
                      overflow: "hidden",
                      border: `1px solid ${theme.colors.line}`,
                      background: theme.colors.bgCard,
                      height: isMobile ? "260px" : "320px",
                    }}
                  >
                    {g.type === "video" ? (
                      <LazyVideo
                        src={g.src}
                        poster={g.poster}
                        ariaLabel={g.alt}
                        style={{ position: "absolute", inset: 0 }}
                      />
                    ) : (
                      <img
                        src={g.src}
                        alt={g.alt}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section
        style={{
          padding: isMobile ? "56px 0" : "80px 0",
          borderBottom: `1px solid ${theme.colors.line}`,
        }}
      >
        <Container>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? "28px" : "40px",
            }}
          >
            {item.resultPoints?.length > 0 && (
              <Reveal>
                <div>
                  <div
                    style={{
                      color: theme.colors.goldSoft,
                      fontSize: "12px",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      marginBottom: "14px",
                    }}
                  >
                    What it delivers
                  </div>
                  <ul
                    style={{
                      listStyle: "none",
                      margin: 0,
                      padding: 0,
                      display: "grid",
                      gap: "12px",
                    }}
                  >
                    {item.resultPoints.map((p) => (
                      <li
                        key={p}
                        style={{
                          display: "flex",
                          gap: "12px",
                          color: theme.colors.text,
                          fontSize: "15px",
                          lineHeight: 1.8,
                        }}
                      >
                        <span
                          style={{ color: theme.colors.gold, fontWeight: 800 }}
                        >
                          ✓
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}

            <Reveal delay={0.1}>
              <div style={{ display: "grid", gap: "24px" }}>
                {item.roles?.length > 0 && (
                  <div>
                    <div
                      style={{
                        color: "rgba(243,239,231,0.55)",
                        fontSize: "11px",
                        letterSpacing: "1.6px",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        marginBottom: "12px",
                      }}
                    >
                      Our role
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                      }}
                    >
                      {item.roles.map((r) => (
                        <span
                          key={r}
                          style={{
                            padding: "8px 12px",
                            borderRadius: "999px",
                            border: `1px solid ${theme.colors.line}`,
                            background: "rgba(255,255,255,0.035)",
                            color: theme.colors.text,
                            fontSize: "13px",
                            fontWeight: 600,
                          }}
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {item.tools?.length > 0 && (
                  <div>
                    <div
                      style={{
                        color: "rgba(243,239,231,0.55)",
                        fontSize: "11px",
                        letterSpacing: "1.6px",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        marginBottom: "12px",
                      }}
                    >
                      Tools used
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                      }}
                    >
                      {item.tools.map((t) => (
                        <span
                          key={t}
                          style={{
                            padding: "8px 12px",
                            borderRadius: "999px",
                            border: `1px solid ${theme.colors.line}`,
                            background: "rgba(255,255,255,0.035)",
                            color: theme.colors.textSoft,
                            fontSize: "13px",
                            fontWeight: 500,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {service && (
                  <div
                    style={{
                      padding: "18px 20px",
                      borderRadius: "18px",
                      border: "1px solid rgba(214,176,96,0.32)",
                      background:
                        "linear-gradient(180deg, rgba(214,176,96,0.08), rgba(255,255,255,0.02))",
                    }}
                  >
                    <div
                      style={{
                        color: theme.colors.goldSoft,
                        fontSize: "11px",
                        letterSpacing: "1.6px",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        marginBottom: "6px",
                      }}
                    >
                      Service used
                    </div>
                    <Link
                      to={`/services/${service.slug}`}
                      style={{
                        color: theme.colors.text,
                        fontSize: "16px",
                        fontWeight: 700,
                        textDecoration: "none",
                      }}
                    >
                      {service.name} →
                    </Link>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {caseStudy && (
        <section
          style={{
            padding: isMobile ? "56px 0" : "80px 0",
            borderBottom: `1px solid ${theme.colors.line}`,
          }}
        >
          <Container>
            <Link
              to={`/case-studies/${caseStudy.slug}`}
              style={{ textDecoration: "none" }}
            >
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 180, damping: 18 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1.05fr",
                  gap: isMobile ? "22px" : "36px",
                  alignItems: "center",
                  padding: isMobile ? "26px" : "36px",
                  borderRadius: "28px",
                  border: `1px solid ${theme.colors.lineStrong}`,
                  background:
                    "linear-gradient(180deg, rgba(214,176,96,0.06), rgba(255,255,255,0.02))",
                }}
              >
                <div>
                  <div
                    style={{
                      color: theme.colors.goldSoft,
                      fontSize: "12px",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      marginBottom: "10px",
                    }}
                  >
                    Case Study
                  </div>
                  <h3
                    style={{
                      margin: "0 0 12px",
                      color: theme.colors.text,
                      fontSize: isMobile ? "22px" : "28px",
                      lineHeight: 1.18,
                      letterSpacing: "-0.5px",
                      fontWeight: 800,
                      fontFamily:
                        '"Playfair Display", Georgia, "Times New Roman", serif',
                    }}
                  >
                    {caseStudy.title}
                  </h3>
                  <p
                    style={{
                      margin: "0 0 14px",
                      color: theme.colors.textSoft,
                      fontSize: "15px",
                      lineHeight: 1.85,
                    }}
                  >
                    {caseStudy.summary}
                  </p>
                  <span
                    style={{
                      color: theme.colors.goldSoft,
                      fontSize: "13px",
                      fontWeight: 700,
                      letterSpacing: "1.4px",
                      textTransform: "uppercase",
                    }}
                  >
                    Read full case study →
                  </span>
                </div>

                <div
                  style={{
                    position: "relative",
                    borderRadius: "20px",
                    overflow: "hidden",
                    height: isMobile ? "200px" : "280px",
                    border: `1px solid ${theme.colors.line}`,
                  }}
                >
                  <img
                    src={caseStudy.heroMedia.src}
                    alt={caseStudy.heroMedia.alt}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.5))",
                    }}
                  />
                </div>
              </motion.div>
            </Link>
          </Container>
        </section>
      )}

      <section style={{ padding: isMobile ? "56px 0 90px" : "80px 0 120px" }}>
        <Container>
          <Reveal>
            <h2
              style={{
                margin: "0 0 24px",
                fontSize: isMobile ? "22px" : "28px",
                color: theme.colors.text,
                letterSpacing: "-0.5px",
                fontFamily:
                  '"Playfair Display", Georgia, "Times New Roman", serif',
              }}
            >
              More work
            </h2>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr 1fr"
                : "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "14px",
            }}
          >
            {others.map((p, i) => (
              <Reveal key={p.slug} delay={0.04 * i}>
                <Link
                  to={`/portfolio/${p.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 180, damping: 18 }}
                    style={{
                      position: "relative",
                      borderRadius: "20px",
                      overflow: "hidden",
                      border: `1px solid ${theme.colors.line}`,
                      background: theme.colors.bgCard,
                      height: isMobile ? "160px" : "200px",
                    }}
                  >
                    <img
                      src={
                        p.cover.type === "video" ? p.cover.poster : p.cover.src
                      }
                      alt={p.cover.alt}
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
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.82))",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        left: "16px",
                        right: "16px",
                        bottom: "14px",
                      }}
                    >
                      <div
                        style={{
                          color: theme.colors.goldSoft,
                          fontSize: "10px",
                          letterSpacing: "1.6px",
                          textTransform: "uppercase",
                          fontWeight: 700,
                          marginBottom: "4px",
                        }}
                      >
                        {p.category}
                      </div>
                      <div
                        style={{
                          color: theme.colors.text,
                          fontSize: isMobile ? "14px" : "16px",
                          fontWeight: 800,
                          lineHeight: 1.2,
                          fontFamily:
                            '"Playfair Display", Georgia, "Times New Roman", serif',
                        }}
                      >
                        {p.title}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </article>
  );
}

export default PortfolioDetail;
