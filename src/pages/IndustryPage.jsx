import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "../components/common/Container";
import MagneticButton from "../components/common/MagneticButton";
import Reveal from "../components/common/Reveal";
import { theme } from "../styles/theme";
import { openContactModal, trackCtaClick } from "../utils/contactActions";
import { trackEvent } from "../utils/analytics";
import {
  findIndustryPage,
  getRelatedCaseStudy,
  industryPages,
} from "../data/industryPages";
import { pricingPlans } from "../data/pricingPlans";
import useIsMobile from "../utils/useIsMobile";

function IndustryPage() {
  const { slug } = useParams();
  const page = findIndustryPage(slug);
  const isMobile = useIsMobile(768);

  useEffect(() => {
    if (!page) return;
    document.title = `${page.industry} in Delhi | Mineworld Production`;
    trackEvent("industry_page_view", { slug: page.slug });
  }, [page]);

  if (!page) {
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
            Industry page not found.
          </h1>
          <Link to="/" style={{ textDecoration: "none" }}>
            <MagneticButton>Back to Home</MagneticButton>
          </Link>
        </div>
      </section>
    );
  }

  const caseStudy = getRelatedCaseStudy(page);
  const recommendedPlan =
    pricingPlans.find((p) => p.id === page.recommendedPlan) || null;
  const otherPages = industryPages.filter((p) => p.slug !== page.slug);

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
          padding: isMobile ? "132px 0 60px" : "160px 0 80px",
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
                marginBottom: "16px",
              }}
            >
              {page.hero.eyebrow}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1
              style={{
                margin: 0,
                fontSize: isMobile ? "40px" : "clamp(44px, 6vw, 72px)",
                lineHeight: 1.02,
                letterSpacing: "-1.8px",
                color: theme.colors.text,
                fontWeight: 800,
                fontFamily:
                  '"Playfair Display", Georgia, "Times New Roman", serif',
                maxWidth: "880px",
              }}
            >
              {page.hero.title}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p
              style={{
                marginTop: "22px",
                color: theme.colors.textSoft,
                fontSize: isMobile ? "16px" : "18px",
                lineHeight: 1.9,
                maxWidth: "760px",
              }}
            >
              {page.hero.subtitle}
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div
              style={{
                display: "flex",
                gap: "14px",
                marginTop: "30px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => {
                  trackCtaClick(
                    "Start a Project",
                    `industry-${page.slug}-hero`
                  );
                  openContactModal(`industry-${page.slug}`);
                }}
                style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}
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

          {page.stats?.length > 0 && (
            <Reveal delay={0.28}>
              <div
                style={{
                  marginTop: "48px",
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "repeat(3, 1fr)"
                    : "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "14px",
                  maxWidth: "780px",
                }}
              >
                {page.stats.map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      padding: isMobile ? "16px 12px" : "22px",
                      borderRadius: "20px",
                      border: `1px solid ${theme.colors.line}`,
                      background: "rgba(255,255,255,0.03)",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        color: theme.colors.gold,
                        fontSize: isMobile ? "22px" : "30px",
                        fontWeight: 800,
                        letterSpacing: "-0.8px",
                        lineHeight: 1,
                        marginBottom: "6px",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        color: theme.colors.textSoft,
                        fontSize: isMobile ? "10px" : "12px",
                        letterSpacing: "1.4px",
                        textTransform: "uppercase",
                        fontWeight: 600,
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </Container>
      </section>

      <section
        style={{
          padding: isMobile ? "60px 0" : "90px 0",
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
              Problems we solve
            </div>
            <h2
              style={{
                margin: "0 0 32px",
                fontSize: isMobile ? "28px" : "clamp(30px, 4vw, 42px)",
                color: theme.colors.text,
                letterSpacing: "-0.8px",
                fontFamily:
                  '"Playfair Display", Georgia, "Times New Roman", serif',
              }}
            >
              The real friction in your growth — and how we remove it.
            </h2>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
              gap: "16px",
            }}
          >
            {page.painPoints.map((p, i) => (
              <Reveal key={p.pain} delay={0.05 * i}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 180, damping: 18 }}
                  style={{
                    padding: "22px",
                    borderRadius: "22px",
                    border: `1px solid ${theme.colors.line}`,
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))",
                  }}
                >
                  <div
                    style={{
                      color: "rgba(220,140,140,0.88)",
                      fontSize: "11px",
                      letterSpacing: "1.6px",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      marginBottom: "8px",
                    }}
                  >
                    The friction
                  </div>
                  <div
                    style={{
                      color: theme.colors.text,
                      fontSize: "16px",
                      fontWeight: 700,
                      lineHeight: 1.4,
                      marginBottom: "14px",
                    }}
                  >
                    {p.pain}
                  </div>
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
                    What we change
                  </div>
                  <div
                    style={{
                      color: theme.colors.textSoft,
                      fontSize: "14.5px",
                      lineHeight: 1.75,
                    }}
                  >
                    {p.fix}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section
        style={{
          padding: isMobile ? "60px 0" : "90px 0",
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
              Services included
            </div>
            <h2
              style={{
                margin: "0 0 28px",
                fontSize: isMobile ? "26px" : "clamp(28px, 3.6vw, 36px)",
                color: theme.colors.text,
                letterSpacing: "-0.6px",
                fontFamily:
                  '"Playfair Display", Georgia, "Times New Roman", serif',
              }}
            >
              Everything you need for {page.industry.toLowerCase()} growth — in one team.
            </h2>
          </Reveal>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {page.services.map((s) => (
              <div
                key={s}
                style={{
                  padding: "12px 18px",
                  borderRadius: "999px",
                  border: `1px solid ${theme.colors.line}`,
                  background: "rgba(255,255,255,0.035)",
                  color: theme.colors.text,
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                {s}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {caseStudy && (
        <section
          style={{
            padding: isMobile ? "60px 0" : "90px 0",
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
                  gap: isMobile ? "24px" : "36px",
                  alignItems: "center",
                  padding: isMobile ? "28px" : "40px",
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
                      marginBottom: "12px",
                    }}
                  >
                    Proof — Recent Case Study
                  </div>
                  <h3
                    style={{
                      margin: "0 0 14px",
                      color: theme.colors.text,
                      fontSize: isMobile ? "24px" : "30px",
                      lineHeight: 1.15,
                      letterSpacing: "-0.6px",
                      fontWeight: 800,
                      fontFamily:
                        '"Playfair Display", Georgia, "Times New Roman", serif',
                    }}
                  >
                    {caseStudy.title}
                  </h3>
                  <p
                    style={{
                      margin: "0 0 18px",
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
                    Read the full case study →
                  </span>
                </div>
                <div
                  style={{
                    position: "relative",
                    borderRadius: "22px",
                    overflow: "hidden",
                    height: isMobile ? "220px" : "300px",
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
                        "linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.55))",
                    }}
                  />
                </div>
              </motion.div>
            </Link>
          </Container>
        </section>
      )}

      {recommendedPlan && (
        <section
          style={{
            padding: isMobile ? "60px 0" : "90px 0",
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
                Recommended Plan
              </div>
              <h2
                style={{
                  margin: "0 0 24px",
                  fontSize: isMobile ? "26px" : "clamp(28px, 3.6vw, 36px)",
                  color: theme.colors.text,
                  letterSpacing: "-0.6px",
                  fontFamily:
                    '"Playfair Display", Georgia, "Times New Roman", serif',
                }}
              >
                The right starting plan for {page.industry.toLowerCase()}.
              </h2>
            </Reveal>

            <div
              style={{
                padding: isMobile ? "28px" : "36px",
                borderRadius: "26px",
                border: "1px solid rgba(214,176,96,0.4)",
                background:
                  "linear-gradient(180deg, rgba(214,176,96,0.09), rgba(255,255,255,0.02))",
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "28px",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    color: theme.colors.goldSoft,
                    fontSize: "11px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    marginBottom: "8px",
                  }}
                >
                  {recommendedPlan.name} · {recommendedPlan.monthly}
                  {" "}
                  {recommendedPlan.monthlyNote}
                </div>
                <h3
                  style={{
                    margin: "0 0 12px",
                    fontSize: isMobile ? "22px" : "26px",
                    color: theme.colors.text,
                    lineHeight: 1.3,
                    fontWeight: 700,
                    fontFamily:
                      '"Playfair Display", Georgia, "Times New Roman", serif',
                  }}
                >
                  {recommendedPlan.tagline}
                </h3>
                <p
                  style={{
                    margin: 0,
                    color: theme.colors.textSoft,
                    fontSize: "14.5px",
                    lineHeight: 1.85,
                  }}
                >
                  <span style={{ color: "rgba(243,239,231,0.55)" }}>
                    Best for:{" "}
                  </span>
                  {recommendedPlan.bestFor}
                </p>
                <button
                  onClick={() => {
                    trackCtaClick(
                      recommendedPlan.cta,
                      `industry-${page.slug}-plan`
                    );
                    openContactModal(
                      `industry-${page.slug}-${recommendedPlan.id}`
                    );
                  }}
                  style={{
                    marginTop: "22px",
                    padding: "14px 22px",
                    borderRadius: "999px",
                    border: "none",
                    background: "linear-gradient(135deg, #D6B060, #E7C98A)",
                    color: "#18140F",
                    fontWeight: 800,
                    fontSize: "14px",
                    cursor: "pointer",
                    boxShadow: "0 10px 24px rgba(214,176,96,0.28)",
                  }}
                >
                  {recommendedPlan.cta}
                </button>
              </div>

              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "grid",
                  gap: "10px",
                }}
              >
                {recommendedPlan.highlights.map((h) => (
                  <li
                    key={h}
                    style={{
                      display: "flex",
                      gap: "10px",
                      color: theme.colors.text,
                      fontSize: "14.5px",
                      lineHeight: 1.75,
                    }}
                  >
                    <span style={{ color: theme.colors.gold, fontWeight: 800 }}>
                      ✓
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <Reveal delay={0.15}>
              <div
                style={{
                  marginTop: "22px",
                  textAlign: "center",
                  color: theme.colors.textSoft,
                  fontSize: "13.5px",
                }}
              >
                Not sure? <Link to="/packages" style={{ color: theme.colors.goldSoft, fontWeight: 700 }}>
                  See all pricing plans →
                </Link>
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      <section
        style={{ padding: isMobile ? "60px 0 90px" : "80px 0 120px" }}
      >
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
              Also offered in Delhi
            </h2>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "16px",
            }}
          >
            {otherPages.map((p, i) => (
              <Reveal key={p.slug} delay={0.05 * i}>
                <Link
                  to={`/industries/${p.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 180, damping: 18 }}
                    style={{
                      padding: "24px",
                      borderRadius: "22px",
                      border: `1px solid ${theme.colors.line}`,
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.015))",
                    }}
                  >
                    <div
                      style={{
                        color: theme.colors.goldSoft,
                        fontSize: "11px",
                        letterSpacing: "1.6px",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        marginBottom: "8px",
                      }}
                    >
                      {p.industry}
                    </div>
                    <div
                      style={{
                        color: theme.colors.text,
                        fontSize: "18px",
                        lineHeight: 1.3,
                        fontWeight: 700,
                        marginBottom: "6px",
                      }}
                    >
                      {p.hero.title}
                    </div>
                    <div
                      style={{
                        color: theme.colors.goldSoft,
                        fontSize: "12.5px",
                        letterSpacing: "1.4px",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        marginTop: "12px",
                      }}
                    >
                      Explore →
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

export default IndustryPage;
