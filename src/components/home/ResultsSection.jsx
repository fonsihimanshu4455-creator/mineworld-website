import { motion } from "framer-motion";
import { theme } from "../../styles/theme";
import AnimatedCounter from "../common/AnimatedCounter";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useSiteContent } from "../../context/SiteContent";

const sectionWrap = {
  width: "min(1180px, calc(100% - 32px))",
  margin: "0 auto",
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const supportCards = [
  {
    eyebrow: "Retention-first execution",
    title: "Attention is the first conversion layer.",
    text:
      "Before leads come clicks. Before clicks come stronger visuals, clearer hooks, and sharper content behavior.",
  },
  {
    eyebrow: "System thinking",
    title: "Content performs better when it works like a system.",
    text:
      "Editing, ad creatives, page consistency, shoots, and design support should work together — not as isolated services.",
  },
];

function ProofCard({ item, isMobile }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="mw-card-hover mw-shine"
      style={{
        position: "relative",
        borderRadius: isMobile ? "22px" : "28px",
        padding: isMobile ? "22px 18px 18px" : "28px 24px 24px",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
        border: `1px solid ${theme.colors.lineStrong}`,
        boxShadow: "0 14px 34px rgba(0,0,0,0.16)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-60px",
          right: "-40px",
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          background: "rgba(87,120,210,0.10)",
          filter: "blur(55px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          color: theme.colors.gold,
          fontSize: isMobile ? "34px" : "42px",
          fontWeight: 800,
          lineHeight: 1,
          marginBottom: "18px",
          letterSpacing: "-1px",
        }}
      >
        {item.number}
      </div>

      <div
        style={{
          color: theme.colors.text,
          fontSize: isMobile ? "24px" : "28px",
          lineHeight: 1.1,
          fontWeight: 700,
          marginBottom: "12px",
          maxWidth: "100%",
          wordBreak: "break-word",
        }}
      >
        <AnimatedCounter
          value={item.counter}
          style={{
            background:
              "linear-gradient(90deg, #F7D58A 0%, #D6B060 55%, #F7D58A 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        />
        {item.statSuffix}
      </div>

      <div
        style={{
          color: theme.colors.goldSoft,
          fontSize: "12px",
          letterSpacing: "2px",
          textTransform: "uppercase",
          marginBottom: "10px",
          fontWeight: 700,
        }}
      >
        {item.title}
      </div>

      <p
        style={{
          color: theme.colors.textSoft,
          fontSize: "15px",
          lineHeight: 1.8,
          margin: "0 0 18px",
          maxWidth: "320px",
        }}
      >
        {item.description}
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="mw-tag-hover"
            style={{
              padding: "10px 14px",
              borderRadius: "999px",
              fontSize: "13px",
              fontWeight: 600,
              color: theme.colors.text,
              border: `1px solid ${theme.colors.line}`,
              background: "rgba(255,255,255,0.03)",
              cursor: "default",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function SupportCard({ item, isMobile }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="mw-card-hover"
      style={{
        borderRadius: isMobile ? "22px" : "28px",
        padding: isMobile ? "22px 20px" : "28px 24px",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
        border: `1px solid ${theme.colors.line}`,
      }}
    >
      <div
        style={{
          color: theme.colors.goldSoft,
          fontSize: "12px",
          letterSpacing: "2px",
          textTransform: "uppercase",
          marginBottom: "12px",
          fontWeight: 700,
        }}
      >
        {item.eyebrow}
      </div>

      <h3
        style={{
          margin: "0 0 12px",
          color: theme.colors.text,
          fontSize: isMobile ? "22px" : "30px",
          lineHeight: 1.15,
          fontWeight: 700,
          maxWidth: "540px",
          wordBreak: "break-word",
        }}
      >
        {item.title}
      </h3>

      <p
        style={{
          margin: 0,
          color: theme.colors.textSoft,
          fontSize: "15px",
          lineHeight: 1.85,
          maxWidth: "620px",
        }}
      >
        {item.text}
      </p>
    </motion.div>
  );
}

export default function ResultsSection() {
  const isMobile = useIsMobile();
  const isTablet = useIsMobile(1024);
  const { content } = useSiteContent();
  const r = content.results;
  const proofCards = (r.proofCards || []).filter((p) => p.visible !== false);

  return (
    <section
      id="results"
      style={{
        padding: isMobile ? "70px 0" : "110px 0",
        background: `
          radial-gradient(circle at 80% 10%, rgba(87,120,210,0.08), transparent 40%),
          linear-gradient(180deg, ${theme.colors.bg} 0%, #0b0f1a 60%, ${theme.colors.bg} 100%)
        `,
        borderTop: `1px solid ${theme.colors.line}`,
      }}
    >
      <motion.div
        style={sectionWrap}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        variants={{
          visible: { transition: { staggerChildren: 0.12 } },
        }}
      >
        <motion.div
          variants={fadeUp}
          style={{
            display: "grid",
            gridTemplateColumns: isTablet ? "1fr" : "1.1fr 0.9fr",
            gap: isMobile ? "18px" : "28px",
            alignItems: "end",
            marginBottom: isMobile ? "26px" : "34px",
          }}
        >
          <div>
            <div
              style={{
                color: theme.colors.goldSoft,
                fontSize: "12px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "14px",
                fontWeight: 700,
              }}
            >
              {r.eyebrow}
            </div>

            <h2
              style={{
                margin: 0,
                color: theme.colors.text,
                fontSize: isMobile
                  ? "clamp(32px, 9vw, 44px)"
                  : "clamp(40px, 6vw, 72px)",
                lineHeight: isMobile ? 1.02 : 0.98,
                letterSpacing: isMobile ? "-1px" : "-2px",
                fontWeight: 800,
                maxWidth: "780px",
                wordBreak: "break-word",
              }}
            >
              {r.headlinePrefix}{" "}
              <span style={{ color: theme.colors.gold }}>{r.headlineHighlight}</span>
            </h2>
          </div>

          <p
            style={{
              margin: 0,
              color: theme.colors.textSoft,
              fontSize: "15px",
              lineHeight: 1.9,
              maxWidth: "430px",
              justifySelf: isTablet ? "start" : "end",
            }}
          >
            {r.description}
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : isTablet
                ? "repeat(2, minmax(0, 1fr))"
                : "repeat(3, minmax(0, 1fr))",
            gap: isMobile ? "14px" : "18px",
            marginBottom: isMobile ? "14px" : "20px",
          }}
        >
          {proofCards.map((item) => (
            <ProofCard key={item.id || item.number} item={item} isMobile={isMobile} />
          ))}
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(2, minmax(0, 1fr))",
            gap: isMobile ? "14px" : "18px",
          }}
        >
          {supportCards.map((item) => (
            <SupportCard key={item.title} item={item} isMobile={isMobile} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}