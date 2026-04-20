import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "../components/common/Container";
import MagneticButton from "../components/common/MagneticButton";
import { theme } from "../styles/theme";
import { findInsight, insights } from "../data/insights";
import { openContactModal } from "../utils/contactActions";
import useIsMobile from "../utils/useIsMobile";

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function InsightDetail() {
  const { slug } = useParams();
  const article = findInsight(slug);
  const isMobile = useIsMobile(768);

  useEffect(() => {
    if (!article) return;
    document.title = `${article.title} | Mineworld Insights`;
  }, [article]);

  if (!article) {
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
            Article not found.
          </h1>
          <Link to="/" style={{ textDecoration: "none" }}>
            <MagneticButton>Back to Home</MagneticButton>
          </Link>
        </div>
      </section>
    );
  }

  const others = insights.filter((i) => i.slug !== article.slug).slice(0, 2);

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
          padding: isMobile ? "132px 0 60px" : "160px 0 60px",
          borderBottom: `1px solid ${theme.colors.line}`,
        }}
      >
        <Container>
          <Link
            to="/#insights"
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
              marginBottom: "28px",
            }}
          >
            ← All Insights
          </Link>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              marginBottom: "20px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                padding: "6px 12px",
                borderRadius: "999px",
                background: "rgba(214,176,96,0.12)",
                color: theme.colors.goldSoft,
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "1.6px",
                textTransform: "uppercase",
              }}
            >
              {article.category}
            </span>
            <span
              style={{
                color: "rgba(243,239,231,0.55)",
                fontSize: "13px",
              }}
            >
              {article.readTime} · {formatDate(article.date)} ·{" "}
              {article.author}
            </span>
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: isMobile ? "34px" : "clamp(38px, 5vw, 60px)",
              lineHeight: 1.05,
              letterSpacing: "-1.5px",
              color: theme.colors.text,
              fontWeight: 800,
              maxWidth: "880px",
              fontFamily:
                '"Playfair Display", Georgia, "Times New Roman", serif',
            }}
          >
            {article.title}
          </h1>

          <p
            style={{
              marginTop: "18px",
              color: theme.colors.textSoft,
              fontSize: isMobile ? "16px" : "18px",
              lineHeight: 1.85,
              maxWidth: "760px",
            }}
          >
            {article.excerpt}
          </p>
        </Container>
      </section>

      <section
        style={{
          padding: isMobile ? "48px 0" : "72px 0",
          borderBottom: `1px solid ${theme.colors.line}`,
        }}
      >
        <Container>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            {article.content.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2
                    key={i}
                    style={{
                      margin: "32px 0 12px",
                      fontSize: isMobile ? "22px" : "28px",
                      color: theme.colors.text,
                      letterSpacing: "-0.5px",
                      fontFamily:
                        '"Playfair Display", Georgia, "Times New Roman", serif',
                      fontWeight: 700,
                    }}
                  >
                    {block.text}
                  </h2>
                );
              }
              return (
                <p
                  key={i}
                  style={{
                    margin: "0 0 16px",
                    color: theme.colors.textSoft,
                    fontSize: "16px",
                    lineHeight: 1.9,
                  }}
                >
                  {block.text}
                </p>
              );
            })}

            <div
              style={{
                marginTop: "48px",
                padding: "28px",
                borderRadius: "22px",
                border: `1px solid ${theme.colors.lineStrong}`,
                background:
                  "linear-gradient(180deg, rgba(214,176,96,0.08), rgba(255,255,255,0.02))",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  color: theme.colors.text,
                  fontSize: "18px",
                  fontWeight: 700,
                  marginBottom: "10px",
                  fontFamily:
                    '"Playfair Display", Georgia, "Times New Roman", serif',
                }}
              >
                Want us to apply this to your brand?
              </div>
              <p
                style={{
                  margin: "0 0 18px",
                  color: theme.colors.textSoft,
                  fontSize: "14.5px",
                  lineHeight: 1.75,
                }}
              >
                Book a free 20-minute strategy call. We'll give you at least one
                actionable fix before you decide anything.
              </p>
              <button
                onClick={() => openContactModal(`insight-${article.slug}`)}
                style={{
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
                Book a Strategy Call
              </button>
            </div>
          </div>
        </Container>
      </section>

      {others.length > 0 && (
        <section
          style={{ padding: isMobile ? "60px 0 90px" : "80px 0 120px" }}
        >
          <Container>
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
              More insights
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
                gap: "16px",
              }}
            >
              {others.map((item) => (
                <Link
                  key={item.slug}
                  to={`/insights/${item.slug}`}
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
                        marginBottom: "10px",
                      }}
                    >
                      {item.category} · {item.readTime}
                    </div>
                    <div
                      style={{
                        color: theme.colors.text,
                        fontSize: "18px",
                        fontWeight: 700,
                        lineHeight: 1.3,
                        marginBottom: "8px",
                        fontFamily:
                          '"Playfair Display", Georgia, "Times New Roman", serif',
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        color: theme.colors.textSoft,
                        fontSize: "14px",
                        lineHeight: 1.75,
                      }}
                    >
                      {item.excerpt}
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}

export default InsightDetail;
