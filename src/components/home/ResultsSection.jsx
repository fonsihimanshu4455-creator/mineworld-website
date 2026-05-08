import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionTag from "../common/SectionTag";
import useIsMobile from "../../utils/useIsMobile";
import { useCountUp } from "../../utils/gsapHooks";

const proofCards = [
  {
    stat: "+32",
    target: 32,
    format: (n) => `+${n}`,
    unit: "leads in 7 days",
    title: "Aesthetic Clinic Campaign",
    tags: ["Reels + Ads", "Lead Gen"],
    slug: "aesthetic-clinic-lead-generation",
  },
  {
    stat: "2.5M",
    target: 2500000,
    format: (n) =>
      n >= 1_000_000
        ? `${(n / 1_000_000).toFixed(1)}M`
        : n >= 1_000
        ? `${(n / 1_000).toFixed(0)}K`
        : `${n}`,
    unit: "views on a single reel",
    title: "Personal Brand Content",
    tags: ["Retention Editing", "Reel Strategy"],
    slug: "personal-brand-reel-2-5m-views",
  },
  {
    stat: "₹1.8L",
    target: 180000,
    format: (n) =>
      n >= 100000
        ? `₹${(n / 100000).toFixed(1)}L`
        : n >= 1000
        ? `₹${(n / 1000).toFixed(0)}K`
        : `₹${n}`,
    unit: "tracked revenue driven",
    title: "Local Business Promotion",
    tags: ["Offer Creative", "Paid Growth"],
    slug: "local-business-revenue-driven",
  },
];

function ProofCard({ item, isMobile }) {
  const statRef = useCountUp({
    target: item.target,
    duration: 1.8,
    format: item.format,
  });

  return (
    <Link
      to={`/case-studies/${item.slug}`}
      style={{ textDecoration: "none", display: "block", height: "100%" }}
    >
      <motion.div
        whileHover={{ y: -6 }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 18,
        }}
        style={{
          position: "relative",
          borderRadius: "22px",
          padding: "26px 24px 22px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(184,149,106,0.30)",
          boxShadow: "0 14px 30px rgba(0,0,0,0.20)",
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          transition:
            "border-color 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--accent-gold)";
          e.currentTarget.style.boxShadow =
            "0 20px 40px rgba(184,149,106,0.18)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(184,149,106,0.30)";
          e.currentTarget.style.boxShadow =
            "0 14px 30px rgba(0,0,0,0.20)";
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-40px",
            right: "-30px",
            width: "160px",
            height: "160px",
            borderRadius: "50%",
            background: "rgba(184,149,106,0.16)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "10px",
            marginBottom: "14px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <span
            ref={statRef}
            style={{
              color: "var(--accent-gold)",
              fontSize: isMobile ? "44px" : "56px",
              fontWeight: 600,
              letterSpacing: "-1.4px",
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
              fontFamily:
                '"Playfair Display", Georgia, "Times New Roman", serif',
            }}
          >
            {item.stat}
          </span>
          <span
            style={{
              color: "var(--bg-cream-soft)",
              fontSize: "13px",
              fontWeight: 500,
              lineHeight: 1.3,
              opacity: 0.85,
            }}
          >
            {item.unit}
          </span>
        </div>

        <div
          style={{
            color: "var(--accent-gold)",
            fontSize: "11px",
            letterSpacing: "1.8px",
            textTransform: "uppercase",
            fontWeight: 700,
            marginBottom: "12px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {item.title}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            marginBottom: "16px",
            position: "relative",
            zIndex: 1,
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
                color: "var(--bg-cream-soft)",
                border: "1px solid rgba(184,149,106,0.3)",
                background: "rgba(255,255,255,0.04)",
                opacity: 0.85,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <span
          style={{
            marginTop: "auto",
            color: "var(--accent-gold)",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "1.4px",
            textTransform: "uppercase",
            position: "relative",
            zIndex: 1,
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
        position: "relative",
        padding: isMobile ? "76px 0 88px" : "104px 0 120px",
        background: `
          radial-gradient(circle at 20% 30%, rgba(184, 149, 106, 0.08), transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(184, 149, 106, 0.05), transparent 50%),
          var(--accent-navy)
        `,
        borderTop: "1px solid rgba(184, 149, 106, 0.20)",
        borderBottom: "1px solid rgba(184, 149, 106, 0.20)",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(184, 149, 106, 0.12) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.85,
        }}
      />

      <Container style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: isMobile ? "flex-start" : "flex-end",
            justifyContent: "space-between",
            gap: "20px",
            flexDirection: isMobile ? "column" : "row",
            marginBottom: "36px",
          }}
        >
          <Reveal>
            <div>
              <SectionTag>Proof of Outcome</SectionTag>
              <h2
                style={{
                  margin: "0 0 12px",
                  color: "var(--bg-cream-soft)",
                  fontSize: isMobile ? "32px" : "clamp(32px, 4vw, 48px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.8px",
                  fontWeight: 700,
                  maxWidth: "640px",
                  fontFamily:
                    '"Playfair Display", Georgia, "Times New Roman", serif',
                }}
              >
                Real results.{" "}
                <span
                  style={{
                    color: "var(--accent-gold)",
                    fontStyle: "italic",
                  }}
                >
                  Not just content.
                </span>
              </h2>
              <span
                aria-hidden="true"
                style={{
                  display: "block",
                  width: "60px",
                  height: "3px",
                  background: "var(--accent-gold)",
                  borderRadius: "999px",
                }}
              />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p
              style={{
                margin: 0,
                color: "var(--bg-cream-soft)",
                fontSize: "14.5px",
                lineHeight: 1.8,
                maxWidth: "360px",
                opacity: 0.78,
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
              : "repeat(auto-fit, minmax(260px, 1fr))",
            gap: isMobile ? "14px" : "18px",
            alignItems: "stretch",
            position: "relative",
          }}
        >
          {proofCards.map((item, i) => (
            <div
              key={item.slug}
              style={{ position: "relative", height: "100%" }}
            >
              <Reveal delay={0.05 * i}>
                <ProofCard item={item} isMobile={isMobile} />
              </Reveal>
              {!isMobile && i < proofCards.length - 1 && (
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "-10px",
                    transform: "translateY(-50%)",
                    width: "1px",
                    height: "60px",
                    backgroundImage:
                      "linear-gradient(to bottom, var(--accent-gold) 50%, transparent 50%)",
                    backgroundSize: "1px 8px",
                    backgroundRepeat: "repeat-y",
                    opacity: 0.4,
                    pointerEvents: "none",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
