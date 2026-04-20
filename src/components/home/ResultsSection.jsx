import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionTag from "../common/SectionTag";
import { theme } from "../../styles/theme";
import useIsMobile from "../../utils/useIsMobile";

const proofCards = [
  {
    stat: "+32",
    unit: "leads in 7 days",
    title: "Aesthetic Clinic Campaign",
    tags: ["Reels + Ads", "Lead Gen"],
    slug: "aesthetic-clinic-lead-generation",
  },
  {
    stat: "2.5M",
    unit: "views on a single reel",
    title: "Personal Brand Content",
    tags: ["Retention Editing", "Reel Strategy"],
    slug: "personal-brand-reel-2-5m-views",
  },
  {
    stat: "₹1.8L",
    unit: "tracked revenue driven",
    title: "Local Business Promotion",
    tags: ["Offer Creative", "Paid Growth"],
    slug: "local-business-revenue-driven",
  },
];

function ProofCard({ item }) {
  return (
    <Link
      to={`/case-studies/${item.slug}`}
      style={{ textDecoration: "none", display: "block", height: "100%" }}
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        style={{
          position: "relative",
          borderRadius: "22px",
          padding: "22px 22px 20px",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.065) 0%, rgba(255,255,255,0.02) 100%)",
          border: `1px solid ${theme.colors.lineStrong}`,
          boxShadow: "0 10px 26px rgba(0,0,0,0.14)",
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-40px",
            right: "-30px",
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            background: "rgba(87,120,210,0.10)",
            filter: "blur(55px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "8px",
            marginBottom: "10px",
          }}
        >
          <span
            style={{
              color: theme.colors.gold,
              fontSize: "34px",
              fontWeight: 800,
              letterSpacing: "-1px",
              lineHeight: 1,
            }}
          >
            {item.stat}
          </span>
          <span
            style={{
              color: theme.colors.textSoft,
              fontSize: "13px",
              fontWeight: 600,
              lineHeight: 1.3,
            }}
          >
            {item.unit}
          </span>
        </div>

        <div
          style={{
            color: theme.colors.goldSoft,
            fontSize: "11px",
            letterSpacing: "1.8px",
            textTransform: "uppercase",
            fontWeight: 700,
            marginBottom: "12px",
          }}
        >
          {item.title}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            marginBottom: "14px",
          }}
        >
          {item.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: "5px 10px",
                borderRadius: "999px",
                fontSize: "11.5px",
                fontWeight: 600,
                color: theme.colors.text,
                border: `1px solid ${theme.colors.line}`,
                background: "rgba(255,255,255,0.03)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <span
          style={{
            marginTop: "auto",
            color: theme.colors.goldSoft,
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "1.4px",
            textTransform: "uppercase",
          }}
        >
          Read Case Study →
        </span>
      </motion.div>
    </Link>
  );
}

export default function ResultsSection() {
  const isMobile = useIsMobile(768);

  return (
    <section
      id="results"
      style={{
        padding: isMobile ? "60px 0" : "80px 0",
        background: "#0b0f1a",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Container>
        <div
          style={{
            display: "flex",
            alignItems: isMobile ? "flex-start" : "flex-end",
            justifyContent: "space-between",
            gap: "20px",
            flexDirection: isMobile ? "column" : "row",
            marginBottom: "28px",
          }}
        >
          <Reveal>
            <div>
              <SectionTag>Proof of Outcome</SectionTag>
              <h2
                style={{
                  margin: 0,
                  color: theme.colors.text,
                  fontSize: isMobile ? "30px" : "clamp(30px, 4vw, 44px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.8px",
                  fontWeight: 800,
                  maxWidth: "620px",
                  fontFamily:
                    '"Playfair Display", Georgia, "Times New Roman", serif',
                }}
              >
                Real results.{" "}
                <span style={{ color: theme.colors.gold, fontStyle: "italic" }}>
                  Not just content.
                </span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p
              style={{
                margin: 0,
                color: theme.colors.textSoft,
                fontSize: "14px",
                lineHeight: 1.8,
                maxWidth: "360px",
              }}
            >
              Built to make brands look sharper, convert stronger, and feel
              harder to ignore.
            </p>
          </Reveal>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "14px",
            alignItems: "stretch",
          }}
        >
          {proofCards.map((item, i) => (
            <Reveal key={item.slug} delay={0.05 * i}>
              <ProofCard item={item} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
