import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
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
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        style={{
          padding: "20px 20px 18px",
          borderRadius: "20px",
          border: `1px solid ${theme.colors.line}`,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.015))",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          minHeight: "180px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "10px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              padding: "4px 9px",
              borderRadius: "999px",
              background: "rgba(214,176,96,0.12)",
              color: theme.colors.goldSoft,
              fontSize: "10.5px",
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
              fontSize: "11.5px",
            }}
          >
            {item.readTime}
          </span>
        </div>

        <h3
          style={{
            margin: "0 0 8px",
            color: theme.colors.text,
            fontSize: "16px",
            lineHeight: 1.3,
            letterSpacing: "-0.3px",
            fontWeight: 700,
            fontFamily:
              '"Playfair Display", Georgia, "Times New Roman", serif',
          }}
        >
          {item.title}
        </h3>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "11.5px",
            color: "rgba(243,239,231,0.55)",
            paddingTop: "10px",
          }}
        >
          <span>{formatDate(item.date)}</span>
          <span
            style={{
              color: theme.colors.goldSoft,
              letterSpacing: "1.2px",
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
        padding: isMobile ? "60px 0" : "80px 0",
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
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div>
            <SectionTag>Insights</SectionTag>
            <h2
              style={{
                margin: 0,
                color: theme.colors.text,
                fontSize: isMobile ? "26px" : "clamp(28px, 3.4vw, 36px)",
                lineHeight: 1.1,
                letterSpacing: "-0.5px",
                fontWeight: 800,
                fontFamily:
                  '"Playfair Display", Georgia, "Times New Roman", serif',
              }}
            >
              Frameworks, not fluff.
            </h2>
          </div>

          <Link
            to="/insights"
            style={{
              color: theme.colors.goldSoft,
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "1.4px",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            View all articles →
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "14px",
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
