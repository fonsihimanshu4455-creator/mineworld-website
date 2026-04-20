import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "../components/common/Container";
import Reveal from "../components/common/Reveal";
import { theme } from "../styles/theme";
import { insights } from "../data/insights";
import { trackEvent } from "../utils/analytics";
import useIsMobile from "../utils/useIsMobile";

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function Card({ item }) {
  return (
    <Link to={`/insights/${item.slug}`} style={{ textDecoration: "none" }}>
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        style={{
          padding: "26px 24px",
          borderRadius: "24px",
          border: `1px solid ${theme.colors.line}`,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.015))",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "14px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              padding: "5px 10px",
              borderRadius: "999px",
              background: "rgba(214,176,96,0.12)",
              color: theme.colors.goldSoft,
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "1.4px",
              textTransform: "uppercase",
            }}
          >
            {item.category}
          </span>
          <span
            style={{
              color: "rgba(243,239,231,0.5)",
              fontSize: "12px",
            }}
          >
            {item.readTime}
          </span>
        </div>

        <h3
          style={{
            margin: "0 0 10px",
            color: theme.colors.text,
            fontSize: "20px",
            lineHeight: 1.25,
            letterSpacing: "-0.4px",
            fontWeight: 700,
            fontFamily:
              '"Playfair Display", Georgia, "Times New Roman", serif',
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
            flex: 1,
          }}
        >
          {item.excerpt}
        </p>

        <div
          style={{
            marginTop: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "12px",
            color: "rgba(243,239,231,0.55)",
          }}
        >
          <span>{formatDate(item.date)}</span>
          <span
            style={{
              color: theme.colors.goldSoft,
              letterSpacing: "1.4px",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            Read →
          </span>
        </div>
      </motion.article>
    </Link>
  );
}

function Insights() {
  const isMobile = useIsMobile(768);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    document.title = "Insights | Mineworld Production";
    trackEvent("insights_list_view", {});
  }, []);

  const categories = useMemo(() => {
    const set = new Set(insights.map((i) => i.category));
    return ["All", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return insights;
    return insights.filter((i) => i.category === activeCategory);
  }, [activeCategory]);

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
              Insights
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1
              style={{
                margin: 0,
                fontSize: isMobile ? "40px" : "clamp(44px, 5.8vw, 68px)",
                lineHeight: 1.04,
                letterSpacing: "-1.6px",
                color: theme.colors.text,
                fontWeight: 800,
                maxWidth: "820px",
                fontFamily:
                  '"Playfair Display", Georgia, "Times New Roman", serif',
              }}
            >
              Frameworks, not fluff.
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p
              style={{
                marginTop: "18px",
                color: theme.colors.textSoft,
                fontSize: isMobile ? "16px" : "18px",
                lineHeight: 1.9,
                maxWidth: "720px",
              }}
            >
              Short reads on retention editing, Meta ads, and content systems —
              drawn directly from what&rsquo;s working for Delhi brands.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div
              style={{
                marginTop: "26px",
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              {categories.map((cat) => {
                const active = cat === activeCategory;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={active}
                    style={{
                      padding: "9px 14px",
                      borderRadius: "999px",
                      border: active
                        ? "1px solid rgba(214,176,96,0.85)"
                        : `1px solid ${theme.colors.line}`,
                      background: active
                        ? "rgba(214,176,96,0.14)"
                        : "rgba(255,255,255,0.03)",
                      color: active
                        ? theme.colors.goldSoft
                        : theme.colors.text,
                      fontSize: "13px",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.22s ease",
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </Container>
      </section>

      <section style={{ padding: isMobile ? "48px 0 90px" : "72px 0 120px" }}>
        <Container>
          {filtered.length === 0 ? (
            <div
              style={{
                padding: "48px 20px",
                textAlign: "center",
                color: theme.colors.textSoft,
              }}
            >
              No articles in this category yet.
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "18px",
              }}
            >
              {filtered.map((item, i) => (
                <Reveal key={item.slug} delay={0.04 * i}>
                  <Card item={item} />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>
    </article>
  );
}

export default Insights;
