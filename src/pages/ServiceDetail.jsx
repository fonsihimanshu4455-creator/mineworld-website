import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "../components/common/Container";
import MagneticButton from "../components/common/MagneticButton";
import Reveal from "../components/common/Reveal";
import LazyVideo from "../components/common/LazyVideo";
import { theme } from "../styles/theme";
import { openContactModal, trackCtaClick } from "../utils/contactActions";
import { trackEvent } from "../utils/analytics";
import {
  findServiceCategory,
  serviceCategories,
} from "../data/serviceCategories";
import { findCaseStudy } from "../data/caseStudies";
import { pricingPlans } from "../data/pricingPlans";
import useIsMobile from "../utils/useIsMobile";

function ServiceDetail() {
  const { slug } = useParams();
  const service = findServiceCategory(slug);
  const isMobile = useIsMobile(768);

  useEffect(() => {
    if (!service) return;
    document.title = `${service.name} | Mineworld Production Services`;
    trackEvent("service_view", { slug: service.slug });
  }, [service]);

  if (!service) {
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
            Service not found.
          </h1>
          <Link to="/#services" style={{ textDecoration: "none" }}>
            <MagneticButton>Back to Services</MagneticButton>
          </Link>
        </div>
      </section>
    );
  }

  const relatedCaseStudy = service.caseStudySlug
    ? findCaseStudy(service.caseStudySlug)
    : null;
  const recommendedPlan = pricingPlans.find(
    (p) => p.id === service.recommendedPlan
  );
  const otherServices = serviceCategories.filter(
    (s) => s.slug !== service.slug
  );

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
          padding: isMobile ? "124px 0 0" : "150px 0 0",
          borderBottom: `1px solid ${theme.colors.line}`,
        }}
      >
        <Container>
          <Link
            to="/#services"
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
            ← All Services
          </Link>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1.05fr 0.95fr",
              gap: isMobile ? "30px" : "48px",
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
                  {service.short}
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <h1
                  style={{
                    margin: 0,
                    fontSize: isMobile ? "38px" : "clamp(42px, 5.5vw, 68px)",
                    lineHeight: 1.02,
                    letterSpacing: "-1.6px",
                    color: theme.colors.text,
                    fontWeight: 800,
                    fontFamily:
                      '"Playfair Display", Georgia, "Times New Roman", serif',
                  }}
                >
                  {service.name}
                </h1>
              </Reveal>
              <Reveal delay={0.14}>
                <p
                  style={{
                    marginTop: "18px",
                    color: theme.colors.text,
                    fontSize: isMobile ? "17px" : "20px",
                    lineHeight: 1.5,
                    fontWeight: 500,
                    maxWidth: "580px",
                  }}
                >
                  {service.tagline}
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p
                  style={{
                    marginTop: "14px",
                    color: theme.colors.textSoft,
                    fontSize: isMobile ? "15px" : "16px",
                    lineHeight: 1.9,
                    maxWidth: "560px",
                  }}
                >
                  {service.longIntro}
                </p>
              </Reveal>
              <Reveal delay={0.26}>
                <div
                  style={{
                    display: "flex",
                    gap: "14px",
                    marginTop: "28px",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    onClick={() => {
                      trackCtaClick("Start a Project", `service-${service.slug}-hero`);
                      openContactModal(`service-${service.slug}`);
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
                  {relatedCaseStudy && (
                    <Link
                      to={`/case-studies/${relatedCaseStudy.slug}`}
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
                {service.cover.type === "video" ? (
                  <LazyVideo
                    src={service.cover.src}
                    poster={service.cover.poster}
                    ariaLabel={service.cover.alt}
                    style={{ position: "absolute", inset: 0 }}
                  />
                ) : (
                  <img
                    src={service.cover.src}
                    alt={service.cover.alt}
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
                      "linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.35))",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </Reveal>
          </div>

          <div style={{ height: isMobile ? "60px" : "80px" }} />
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
              What's included
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
              Everything under {service.name.toLowerCase()}.
            </h2>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr 1fr"
                : "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "12px",
            }}
          >
            {service.included.map((i) => (
              <div
                key={i}
                style={{
                  padding: "16px 18px",
                  borderRadius: "16px",
                  border: `1px solid ${theme.colors.line}`,
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.015))",
                  color: theme.colors.text,
                  fontSize: isMobile ? "13px" : "14.5px",
                  fontWeight: 600,
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  lineHeight: 1.4,
                }}
              >
                <span
                  aria-hidden="true"
                  style={{ color: theme.colors.gold, fontWeight: 800 }}
                >
                  ✓
                </span>
                {i}
              </div>
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
              How we approach it
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
              The principles behind every piece of work.
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
            {service.approach.map((a, i) => (
              <Reveal key={a.title} delay={0.05 * i}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 180, damping: 18 }}
                  style={{
                    padding: "26px 22px",
                    borderRadius: "22px",
                    border: `1px solid ${theme.colors.line}`,
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      background: "rgba(214,176,96,0.14)",
                      color: theme.colors.gold,
                      display: "grid",
                      placeItems: "center",
                      fontSize: "13px",
                      fontWeight: 800,
                      marginBottom: "16px",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3
                    style={{
                      margin: "0 0 10px",
                      color: theme.colors.text,
                      fontSize: "18px",
                      lineHeight: 1.3,
                      fontWeight: 700,
                    }}
                  >
                    {a.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      color: theme.colors.textSoft,
                      fontSize: "14.5px",
                      lineHeight: 1.85,
                    }}
                  >
                    {a.text}
                  </p>
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "0.9fr 1.1fr",
              gap: isMobile ? "28px" : "48px",
              alignItems: "start",
            }}
          >
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
                  Deliverables
                </div>
                <h2
                  style={{
                    margin: "0 0 18px",
                    fontSize: isMobile ? "26px" : "clamp(26px, 3.4vw, 36px)",
                    color: theme.colors.text,
                    letterSpacing: "-0.6px",
                    fontFamily:
                      '"Playfair Display", Georgia, "Times New Roman", serif',
                  }}
                >
                  What lands on your drive, every cycle.
                </h2>
                <p
                  style={{
                    margin: 0,
                    color: theme.colors.textSoft,
                    fontSize: "15px",
                    lineHeight: 1.85,
                  }}
                >
                  Clear handoffs — no black box. Every engagement includes
                  organized asset folders and structured feedback loops.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "grid",
                  gap: "12px",
                }}
              >
                {service.deliverables.map((d) => (
                  <li
                    key={d}
                    style={{
                      padding: "16px 18px",
                      borderRadius: "16px",
                      border: `1px solid ${theme.colors.line}`,
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.015))",
                      color: theme.colors.text,
                      fontSize: "14.5px",
                      fontWeight: 600,
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{ color: theme.colors.goldSoft }}
                    >
                      ▸
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {relatedCaseStudy && (
        <section
          style={{
            padding: isMobile ? "60px 0" : "90px 0",
            borderBottom: `1px solid ${theme.colors.line}`,
          }}
        >
          <Container>
            <Link
              to={`/case-studies/${relatedCaseStudy.slug}`}
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
                    Proof
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
                    {relatedCaseStudy.title}
                  </h3>
                  <p
                    style={{
                      margin: "0 0 14px",
                      color: theme.colors.textSoft,
                      fontSize: "15px",
                      lineHeight: 1.85,
                    }}
                  >
                    {relatedCaseStudy.summary}
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
                    src={relatedCaseStudy.heroMedia.src}
                    alt={relatedCaseStudy.heroMedia.alt}
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
                  fontSize: isMobile ? "24px" : "clamp(26px, 3.2vw, 34px)",
                  color: theme.colors.text,
                  letterSpacing: "-0.6px",
                  fontFamily:
                    '"Playfair Display", Georgia, "Times New Roman", serif',
                }}
              >
                The right plan to start {service.name.toLowerCase()}.
              </h2>
            </Reveal>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "28px",
                padding: isMobile ? "28px" : "36px",
                borderRadius: "26px",
                border: "1px solid rgba(214,176,96,0.4)",
                background:
                  "linear-gradient(180deg, rgba(214,176,96,0.08), rgba(255,255,255,0.02))",
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
                  {recommendedPlan.name} · {recommendedPlan.monthly}{" "}
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
                      `service-${service.slug}-plan`
                    );
                    openContactModal(
                      `service-${service.slug}-${recommendedPlan.id}`
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
                      fontSize: "14px",
                      lineHeight: 1.75,
                    }}
                  >
                    <span
                      style={{ color: theme.colors.gold, fontWeight: 800 }}
                    >
                      ✓
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{
                marginTop: "18px",
                textAlign: "center",
                color: theme.colors.textSoft,
                fontSize: "13.5px",
              }}
            >
              Not sure?{" "}
              <Link
                to="/#pricing"
                style={{ color: theme.colors.goldSoft, fontWeight: 700 }}
              >
                See all plans →
              </Link>
            </div>
          </Container>
        </section>
      )}

      <section style={{ padding: isMobile ? "60px 0 90px" : "80px 0 120px" }}>
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
              Other services
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
            {otherServices.map((s, i) => (
              <Reveal key={s.slug} delay={0.04 * i}>
                <Link
                  to={`/services/${s.slug}`}
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
                        s.cover.type === "video" ? s.cover.poster : s.cover.src
                      }
                      alt={s.cover.alt}
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
                          "linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.82))",
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
                        {s.short}
                      </div>
                      <div
                        style={{
                          color: theme.colors.text,
                          fontSize: isMobile ? "15px" : "17px",
                          fontWeight: 800,
                          lineHeight: 1.2,
                          fontFamily:
                            '"Playfair Display", Georgia, "Times New Roman", serif',
                        }}
                      >
                        {s.name}
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

export default ServiceDetail;
