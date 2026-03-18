import { motion } from "framer-motion";
import { theme } from "../../styles/theme";

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

const proofCards = [
  {
    number: "01",
    stat: "+32 Leads in 7 Days",
    title: "Aesthetic Clinic Campaign",
    description:
      "Creative reels and Meta ads aligned for lead capture, not just reach.",
    tags: ["Reels + Ads", "Lead Generation", "Clinic Growth"],
  },
  {
    number: "02",
    stat: "2.5M Views Reel",
    title: "Personal Brand Content",
    description:
      "Retention-first editing structure built to hold attention and drive profile interest.",
    tags: ["Retention Editing", "Reel Strategy", "Personal Brand"],
  },
  {
    number: "03",
    stat: "₹1.8L Revenue Driven",
    title: "Local Business Promotion",
    description:
      "Offer-led creative direction and paid campaign execution focused on business outcome.",
    tags: ["Offer Creative", "Paid Growth", "Revenue Focus"],
  },
];

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

function ProofCard({ item }) {
  return (
    <motion.div
      variants={fadeUp}
      style={{
        position: "relative",
        borderRadius: "28px",
        padding: "28px 24px 24px",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.02) 100%)",
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
          fontSize: "42px",
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
          fontSize: "28px",
          lineHeight: 1.08,
          fontWeight: 700,
          marginBottom: "12px",
          maxWidth: "280px",
        }}
      >
        {item.stat}
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
            style={{
              padding: "10px 14px",
              borderRadius: "999px",
              fontSize: "13px",
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
    </motion.div>
  );
}

function SupportCard({ item }) {
  return (
    <motion.div
      variants={fadeUp}
      style={{
        borderRadius: "28px",
        padding: "28px 24px",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.015) 100%)",
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
          fontSize: "30px",
          lineHeight: 1.12,
          fontWeight: 700,
          maxWidth: "540px",
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
  return (
    <section
      id="results"
      style={{
        padding: "110px 0",
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
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "28px",
            alignItems: "end",
            marginBottom: "34px",
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
              Proof of Outcome
            </div>

            <h2
              style={{
                margin: 0,
                color: theme.colors.text,
                fontSize: "clamp(40px, 6vw, 72px)",
                lineHeight: 0.98,
                letterSpacing: "-2px",
                fontWeight: 800,
                maxWidth: "780px",
              }}
            >
              Real results.{" "}
              <span style={{ color: theme.colors.gold }}>Not just content.</span>
            </h2>
          </div>

          <p
            style={{
              margin: 0,
              color: theme.colors.textSoft,
              fontSize: "15px",
              lineHeight: 1.9,
              maxWidth: "430px",
              justifySelf: "end",
            }}
          >
            Mineworld is not being built to make content look busy. It is being
            built to make brands look sharper, convert stronger, and feel more
            difficult to ignore.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "18px",
            marginBottom: "20px",
          }}
        >
          {proofCards.map((item) => (
            <ProofCard key={item.number} item={item} />
          ))}
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "18px",
          }}
        >
          {supportCards.map((item) => (
            <SupportCard key={item.title} item={item} />
          ))}
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 980px) {
          #results .results-top-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 1024px) {
          section#results [style*="grid-template-columns: 1.1fr 0.9fr"] {
            grid-template-columns: 1fr !important;
          }

          section#results [style*="repeat(3, minmax(0, 1fr))"] {
            grid-template-columns: 1fr !important;
          }

          section#results [style*="repeat(2, minmax(0, 1fr))"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}