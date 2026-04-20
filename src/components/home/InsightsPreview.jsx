import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";
import SectionTag from "../common/SectionTag";
import { theme } from "../../styles/theme";
import { insights } from "../../data/insights";
import useIsMobile from "../../utils/useIsMobile";

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

function InsightCard({ item }) {
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
            gap: "12px",
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
              letterSpacing: "0.3px",
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
            marginTop: "18px",
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

function InsightsPreview() {
  const isMobile = useIsMobile(768);
  const latest = insights.slice(0, 3);

  return (
    <section
      id="insights"
      style={{
        position: "relative",
        padding: isMobile ? "82px 0" : "122px 0",
        background: theme.colors.bg,
        borderBottom: `1px solid ${theme.colors.line}`,
        overflow: "hidden",
      }}
    >
      <Container>
        <div
          style={{
            display: "flex",
            alignItems: isMobile ? "flex-start" : "flex-end",
            justifyContent: "space-between",
            flexDirection: isMobile ? "column" : "row",
            gap: "20px",
            marginBottom: "36px",
          }}
        >
          <div>
            <Reveal>
              <SectionTag>Insights</SectionTag>
            </Reveal>
            <Reveal delay={0.08}>
              <SectionHeading
                title="Frameworks, not fluff."
                subtitle="Short reads on retention editing, Meta ads, and content systems — drawn directly from what's working for Delhi brands in 2025."
              />
            </Reveal>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fit, minmax(260px, 1fr))",
            gap: isMobile ? "16px" : "20px",
          }}
        >
          {latest.map((item, i) => (
            <Reveal key={item.slug} delay={0.05 * i}>
              <InsightCard item={item} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default InsightsPreview;
