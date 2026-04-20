import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "../components/common/Container";
import MagneticButton from "../components/common/MagneticButton";
import Reveal from "../components/common/Reveal";
import { theme } from "../styles/theme";
import { findTeamRole, teamRoles } from "../data/teamRoles";
import { findServiceCategory } from "../data/serviceCategories";
import { openContactModal, trackCtaClick } from "../utils/contactActions";
import { trackEvent } from "../utils/analytics";
import useIsMobile from "../utils/useIsMobile";

function TeamRoleDetail() {
  const { slug } = useParams();
  const member = findTeamRole(slug);
  const isMobile = useIsMobile(768);

  useEffect(() => {
    if (!member) return;
    document.title = `${member.name} · ${member.role} | Mineworld Team`;
    trackEvent("team_role_view", { slug: member.slug });
  }, [member]);

  if (!member) {
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
            Role not found.
          </h1>
          <Link to="/#team" style={{ textDecoration: "none" }}>
            <MagneticButton>Back to Team</MagneticButton>
          </Link>
        </div>
      </section>
    );
  }

  const service = member.relatedServiceSlug
    ? findServiceCategory(member.relatedServiceSlug)
    : null;
  const others = teamRoles.filter((r) => r.slug !== member.slug);

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
          padding: isMobile ? "124px 0 50px" : "150px 0 70px",
          borderBottom: `1px solid ${theme.colors.line}`,
        }}
      >
        <Container>
          <Link
            to="/#team"
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
            ← All Team
          </Link>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "0.9fr 1.1fr",
              gap: isMobile ? "28px" : "48px",
              alignItems: "center",
            }}
          >
            <Reveal>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4 / 5",
                  borderRadius: isMobile ? "24px" : "30px",
                  overflow: "hidden",
                  border: `1px solid ${theme.colors.lineStrong}`,
                  boxShadow: theme.shadow.deep,
                  background: theme.colors.bgCard,
                }}
              >
                <img
                  src={member.photo}
                  alt={member.photoAlt}
                  loading="eager"
                  style={{
                    position: "absolute",
                    inset: 0,
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
                      "linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.35))",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </Reveal>

            <div>
              <Reveal delay={0.08}>
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
                  {member.role}
                </div>
              </Reveal>
              <Reveal delay={0.12}>
                <h1
                  style={{
                    margin: 0,
                    fontSize: isMobile ? "38px" : "clamp(42px, 5.4vw, 64px)",
                    lineHeight: 1.02,
                    letterSpacing: "-1.5px",
                    color: theme.colors.text,
                    fontWeight: 800,
                    fontFamily:
                      '"Playfair Display", Georgia, "Times New Roman", serif',
                  }}
                >
                  {member.name}
                </h1>
              </Reveal>
              <Reveal delay={0.18}>
                <p
                  style={{
                    marginTop: "18px",
                    color: theme.colors.text,
                    fontSize: isMobile ? "17px" : "19px",
                    lineHeight: 1.5,
                    fontWeight: 500,
                    maxWidth: "560px",
                  }}
                >
                  {member.short}
                </p>
              </Reveal>
              <Reveal delay={0.22}>
                <p
                  style={{
                    marginTop: "12px",
                    color: theme.colors.textSoft,
                    fontSize: isMobile ? "15px" : "16px",
                    lineHeight: 1.9,
                    maxWidth: "560px",
                  }}
                >
                  {member.intro}
                </p>
              </Reveal>

              <Reveal delay={0.28}>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginTop: "22px",
                  }}
                >
                  {member.tags.map((t) => (
                    <span
                      key={t}
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
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.32}>
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
                        `team-${member.slug}`
                      );
                      openContactModal(`team-${member.slug}`);
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
                  {service && (
                    <Link
                      to={`/services/${service.slug}`}
                      style={{ textDecoration: "none" }}
                    >
                      <MagneticButton secondary>
                        View {service.name}
                      </MagneticButton>
                    </Link>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

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
                  What they own
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
                  {member.owns.map((o) => (
                    <li
                      key={o}
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
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
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
                  Works on
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  {member.worksOn.map((w) => (
                    <span
                      key={w}
                      style={{
                        padding: "11px 16px",
                        borderRadius: "999px",
                        border: `1px solid ${theme.colors.line}`,
                        background: "rgba(255,255,255,0.035)",
                        color: theme.colors.text,
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      {w}
                    </span>
                  ))}
                </div>

                {member.footer && (
                  <p
                    style={{
                      marginTop: "22px",
                      paddingTop: "18px",
                      borderTop: `1px solid ${theme.colors.line}`,
                      color: theme.colors.textSoft,
                      fontSize: "14px",
                      lineHeight: 1.85,
                    }}
                  >
                    {member.footer}
                  </p>
                )}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {service && (
        <section
          style={{
            padding: isMobile ? "56px 0" : "80px 0",
            borderBottom: `1px solid ${theme.colors.line}`,
          }}
        >
          <Container>
            <Link
              to={`/services/${service.slug}`}
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
                    Service led
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
                    {service.name}
                  </h3>
                  <p
                    style={{
                      margin: "0 0 14px",
                      color: theme.colors.textSoft,
                      fontSize: "15px",
                      lineHeight: 1.85,
                    }}
                  >
                    {service.tagline}
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
                    Explore {service.name.toLowerCase()} →
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
                    src={
                      service.cover.type === "video"
                        ? service.cover.poster
                        : service.cover.src
                    }
                    alt={service.cover.alt}
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
              Meet the rest of the team
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
            {others.map((m, i) => (
              <Reveal key={m.slug} delay={0.04 * i}>
                <Link
                  to={`/team/${m.slug}`}
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
                      height: isMobile ? "200px" : "240px",
                    }}
                  >
                    <img
                      src={m.photo}
                      alt={m.photoAlt}
                      loading="lazy"
                      style={{
                        position: "absolute",
                        inset: 0,
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
                        {m.role}
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
                        {m.name}
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

export default TeamRoleDetail;
