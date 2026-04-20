import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "../components/common/Container";
import MagneticButton from "../components/common/MagneticButton";
import Reveal from "../components/common/Reveal";
import { theme } from "../styles/theme";
import { openContactModal } from "../utils/contactActions";
import { findCaseStudy, caseStudies } from "../data/caseStudies";
import useIsMobile from "../utils/useIsMobile";
import { trackEvent } from "../utils/analytics";

function MetricCard({ metric }) {
  return (
    <div
      style={{
        padding: "22px",
        borderRadius: "22px",
        border: `1px solid ${theme.colors.line}`,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
      }}
    >
      <div
        style={{
          color: theme.colors.goldSoft,
          fontSize: "11px",
          letterSpacing: "2px",
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: "12px",
        }}
      >
        {metric.label}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            color: "rgba(243,239,231,0.5)",
            fontSize: "14px",
            textDecoration: "line-through",
          }}
        >
          {metric.before}
        </span>
        <span style={{ color: theme.colors.goldSoft, fontSize: "14px" }}>→</span>
        <span
          style={{
            color: theme.colors.text,
            fontSize: "24px",
            fontWeight: 800,
            letterSpacing: "-0.5px",
          }}
        >
          {metric.after}
        </span>
      </div>
    </div>
  );
}

function CaseStudyDetail() {
  const { slug } = useParams();
  const study = findCaseStudy(slug);
  const isMobile = useIsMobile(768);

  useEffect(() => {
    if (!study) return;
    document.title = `${study.title} | Mineworld Production Case Study`;
    trackEvent("case_study_view", {
      slug: study.slug,
      industry: study.industry,
    });
  }, [study]);

  if (!study) {
    return (
      <section
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "140px 24px",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "540px" }}>
          <div
            style={{
              color: theme.colors.goldSoft,
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontSize: "12px",
              marginBottom: "14px",
              fontWeight: 700,
            }}
          >
            Case Study Not Found
          </div>
          <h1
            style={{
              margin: "0 0 16px",
              fontSize: "clamp(32px, 5vw, 48px)",
              color: theme.colors.text,
            }}
          >
            The case study you're looking for doesn't exist.
          </h1>
          <Link to="/" style={{ textDecoration: "none" }}>
            <MagneticButton>Back to Home</MagneticButton>
          </Link>
        </div>
      </section>
    );
  }

  const otherStudies = caseStudies.filter((c) => c.slug !== study.slug);

  return (
    <article
      style={{
        background: `
          radial-gradient(circle at 14% 10%, rgba(214,176,96,0.12), transparent 22%),
          linear-gradient(180deg, #111827 0%, #141c2f 50%, #111827 100%)
        `,
      }}
    >
      <section
        style={{
          position: "relative",
          padding: isMobile ? "132px 0 60px" : "160px 0 80px",
          borderBottom: `1px solid ${theme.colors.line}`,
        }}
      >
        <Container>
          <Reveal>
            <Link
              to="/#results"
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
                marginBottom: "32px",
              }}
            >
              ← Back to Case Studies
            </Link>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1.1fr 0.9fr",
              gap: isMobile ? "32px" : "56px",
              alignItems: "center",
            }}
          >
            <div>
              <Reveal delay={0.05}>
                <div
                  style={{
                    color: theme.colors.goldSoft,
                    fontSize: "12px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    marginBottom: "18px",
                  }}
                >
                  {study.eyebrow}
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1
                  style={{
                    margin: 0,
                    fontSize: isMobile ? "38px" : "clamp(40px, 5.5vw, 68px)",
                    lineHeight: 1.02,
                    letterSpacing: "-1.5px",
                    color: theme.colors.text,
                    fontWeight: 800,
                    fontFamily:
                      '"Playfair Display", Georgia, "Times New Roman", serif',
                  }}
                >
                  {study.title}
                </h1>
              </Reveal>

              <Reveal delay={0.18}>
                <p
                  style={{
                    marginTop: "20px",
                    color: theme.colors.textSoft,
                    fontSize: isMobile ? "15px" : "17px",
                    lineHeight: 1.9,
                    maxWidth: "620px",
                  }}
                >
                  {study.summary}
                </p>
              </Reveal>

              <Reveal delay={0.22}>
                <div
                  style={{
                    marginTop: "28px",
                    display: "grid",
                    gridTemplateColumns: isMobile
                      ? "1fr 1fr"
                      : "repeat(3, auto)",
                    gap: "18px 28px",
                    maxWidth: "560px",
                  }}
                >
                  {[
                    { label: "Industry", value: study.industry },
                    { label: "Location", value: study.location },
                    { label: "Timeline", value: study.timeline },
                  ].map((m) => (
                    <div key={m.label}>
                      <div
                        style={{
                          color: "rgba(243,239,231,0.55)",
                          fontSize: "11px",
                          letterSpacing: "1.6px",
                          textTransform: "uppercase",
                          marginBottom: "6px",
                          fontWeight: 700,
                        }}
                      >
                        {m.label}
                      </div>
                      <div
                        style={{
                          color: theme.colors.text,
                          fontSize: "15px",
                          fontWeight: 600,
                        }}
                      >
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <motion.div
                animate={{ y: isMobile ? 0 : [0, -8, 0] }}
                transition={{
                  duration: 5.5,
                  repeat: isMobile ? 0 : Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  position: "relative",
                  width: "100%",
                  height: isMobile ? "320px" : "480px",
                  borderRadius: "28px",
                  overflow: "hidden",
                  border: `1px solid ${theme.colors.lineStrong}`,
                  boxShadow: theme.shadow.deep,
                }}
              >
                {study.heroMedia.type === "video" ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  >
                    <source src={study.heroMedia.src} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={study.heroMedia.src}
                    alt={study.heroMedia.alt}
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
                      "linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.45))",
                  }}
                />
              </motion.div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section
        style={{
          padding: isMobile ? "60px 0" : "80px 0",
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
              Outcome
            </div>
            <h2
              style={{
                margin: "0 0 32px",
                fontSize: isMobile ? "30px" : "clamp(30px, 4vw, 44px)",
                color: theme.colors.text,
                letterSpacing: "-0.8px",
                fontFamily:
                  '"Playfair Display", Georgia, "Times New Roman", serif',
              }}
            >
              Before vs After — the actual movement.
            </h2>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
            }}
          >
            {study.metrics.map((metric, i) => (
              <Reveal key={metric.label} delay={0.05 * i}>
                <MetricCard metric={metric} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section
        style={{
          padding: isMobile ? "60px 0" : "80px 0",
          borderBottom: `1px solid ${theme.colors.line}`,
        }}
      >
        <Container>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? "32px" : "48px",
            }}
          >
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
                The Challenge
              </div>
              <h3
                style={{
                  margin: "0 0 16px",
                  fontSize: "26px",
                  color: theme.colors.text,
                  letterSpacing: "-0.6px",
                  fontFamily:
                    '"Playfair Display", Georgia, "Times New Roman", serif',
                }}
              >
                Where they were stuck.
              </h3>
              <p
                style={{
                  margin: 0,
                  color: theme.colors.textSoft,
                  fontSize: "15px",
                  lineHeight: 1.9,
                }}
              >
                {study.challenge}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
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
                Our Approach
              </div>
              <h3
                style={{
                  margin: "0 0 16px",
                  fontSize: "26px",
                  color: theme.colors.text,
                  letterSpacing: "-0.6px",
                  fontFamily:
                    '"Playfair Display", Georgia, "Times New Roman", serif',
                }}
              >
                What we changed.
              </h3>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                  display: "grid",
                  gap: "12px",
                }}
              >
                {study.approach.map((point) => (
                  <li
                    key={point}
                    style={{
                      display: "flex",
                      gap: "12px",
                      color: theme.colors.textSoft,
                      fontSize: "15px",
                      lineHeight: 1.85,
                    }}
                  >
                    <span style={{ color: theme.colors.goldSoft }}>▸</span>
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <section
        style={{
          padding: isMobile ? "60px 0" : "80px 0",
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
              Execution
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
              How the system was built.
            </h2>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
              gap: "16px",
            }}
          >
            {study.execution.map((step, i) => (
              <Reveal key={step} delay={0.06 * i}>
                <div
                  style={{
                    padding: "22px",
                    borderRadius: "20px",
                    border: `1px solid ${theme.colors.line}`,
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.015))",
                    display: "flex",
                    gap: "16px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "rgba(214,176,96,0.14)",
                      color: theme.colors.gold,
                      display: "grid",
                      placeItems: "center",
                      fontWeight: 800,
                      fontSize: "14px",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p
                    style={{
                      margin: 0,
                      color: theme.colors.textSoft,
                      fontSize: "15px",
                      lineHeight: 1.8,
                    }}
                  >
                    {step}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {study.gallery?.length > 0 && (
        <section
          style={{
            padding: isMobile ? "60px 0" : "80px 0",
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
                Creative Samples
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
                What the work looked like.
              </h2>
            </Reveal>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "18px",
              }}
            >
              {study.gallery.map((item, i) => (
                <Reveal key={i} delay={0.06 * i}>
                  <div
                    style={{
                      position: "relative",
                      borderRadius: "22px",
                      overflow: "hidden",
                      height: isMobile ? "280px" : "340px",
                      border: `1px solid ${theme.colors.line}`,
                      background: theme.colors.bgCard,
                    }}
                  >
                    {item.type === "video" ? (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      >
                        <source src={item.src} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        src={item.src}
                        alt={item.alt}
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

      {study.testimonial && (
        <section
          style={{
            padding: isMobile ? "60px 0" : "100px 0",
            borderBottom: `1px solid ${theme.colors.line}`,
          }}
        >
          <Container>
            <Reveal>
              <div
                style={{
                  maxWidth: "880px",
                  margin: "0 auto",
                  textAlign: "center",
                  padding: isMobile ? "36px 24px" : "56px 40px",
                  borderRadius: "28px",
                  border: `1px solid ${theme.colors.lineStrong}`,
                  background:
                    "linear-gradient(180deg, rgba(214,176,96,0.06), rgba(255,255,255,0.02))",
                }}
              >
                <div
                  style={{
                    color: theme.colors.gold,
                    fontSize: "48px",
                    lineHeight: 1,
                    marginBottom: "12px",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  &ldquo;
                </div>
                <p
                  style={{
                    margin: "0 0 24px",
                    color: theme.colors.text,
                    fontSize: isMobile ? "18px" : "22px",
                    lineHeight: 1.65,
                    fontStyle: "italic",
                    fontFamily:
                      '"Playfair Display", Georgia, "Times New Roman", serif',
                  }}
                >
                  {study.testimonial.quote}
                </p>
                <div
                  style={{
                    color: theme.colors.goldSoft,
                    fontSize: "13px",
                    letterSpacing: "1.6px",
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                >
                  {study.testimonial.author} · {study.testimonial.role}
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      <section
        style={{
          padding: isMobile ? "60px 0" : "90px 0",
        }}
      >
        <Container>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1.4fr 1fr",
              gap: "36px",
              alignItems: "center",
              padding: isMobile ? "30px" : "48px",
              borderRadius: "28px",
              border: `1px solid ${theme.colors.lineStrong}`,
              background:
                "linear-gradient(180deg, rgba(214,176,96,0.08), rgba(255,255,255,0.02))",
            }}
          >
            <div>
              <h3
                style={{
                  margin: "0 0 12px",
                  fontSize: isMobile ? "26px" : "34px",
                  color: theme.colors.text,
                  letterSpacing: "-0.6px",
                  fontFamily:
                    '"Playfair Display", Georgia, "Times New Roman", serif',
                }}
              >
                Want results like this for your brand?
              </h3>
              <p
                style={{
                  margin: 0,
                  color: theme.colors.textSoft,
                  fontSize: "15px",
                  lineHeight: 1.85,
                }}
              >
                {study.nextSteps} Talk to us about building a similar system.
              </p>
            </div>
            <div
              style={{
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
                justifyContent: isMobile ? "flex-start" : "flex-end",
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
            </div>
          </div>
        </Container>
      </section>

      {otherStudies.length > 0 && (
        <section
          style={{
            padding: isMobile ? "60px 0 90px" : "80px 0 120px",
            borderTop: `1px solid ${theme.colors.line}`,
          }}
        >
          <Container>
            <Reveal>
              <h2
                style={{
                  margin: "0 0 28px",
                  fontSize: isMobile ? "24px" : "30px",
                  color: theme.colors.text,
                  letterSpacing: "-0.5px",
                  fontFamily:
                    '"Playfair Display", Georgia, "Times New Roman", serif',
                }}
              >
                More case studies
              </h2>
            </Reveal>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
                gap: "18px",
              }}
            >
              {otherStudies.map((item, i) => (
                <Reveal key={item.slug} delay={0.06 * i}>
                  <Link
                    to={`/case-studies/${item.slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ type: "spring", stiffness: 180, damping: 18 }}
                      style={{
                        borderRadius: "22px",
                        overflow: "hidden",
                        border: `1px solid ${theme.colors.line}`,
                        background: theme.colors.bgCard,
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          height: "200px",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={item.heroMedia.src}
                          alt={item.heroMedia.alt}
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
                      <div style={{ padding: "24px" }}>
                        <div
                          style={{
                            color: theme.colors.goldSoft,
                            fontSize: "11px",
                            letterSpacing: "2px",
                            textTransform: "uppercase",
                            marginBottom: "10px",
                            fontWeight: 700,
                          }}
                        >
                          {item.eyebrow}
                        </div>
                        <h3
                          style={{
                            margin: "0 0 10px",
                            color: theme.colors.text,
                            fontSize: "20px",
                            lineHeight: 1.25,
                            fontWeight: 700,
                          }}
                        >
                          {item.title}
                        </h3>
                        <p
                          style={{
                            margin: 0,
                            color: theme.colors.textSoft,
                            fontSize: "14px",
                            lineHeight: 1.75,
                          }}
                        >
                          {item.summary}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}

export default CaseStudyDetail;
