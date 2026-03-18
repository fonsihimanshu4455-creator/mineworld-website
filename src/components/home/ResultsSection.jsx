import { motion } from "framer-motion";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";
import SectionTag from "../common/SectionTag";
import { theme } from "../../styles/theme";

const resultCards = [
  {
    id: "01",
    title: "Stronger Brand Presence",
    text: "Content systems designed to make the brand look more premium, more serious, and more trustworthy across platforms.",
  },
  {
    id: "02",
    title: "Better Attention Retention",
    text: "Editing logic focused on hook strength, pacing, rhythm, and viewer attention instead of random cuts and filler motion.",
  },
  {
    id: "03",
    title: "Sharpened Digital Perception",
    text: "Visuals, campaigns, and content direction aligned to help the brand appear clearer, stronger, and more valuable online.",
  },
];

const proofBlocks = [
  {
    eyebrow: "Retention-first execution",
    title: "Designed to hold attention, not just fill timelines.",
    text: "Mineworld’s standard is not volume for the sake of content. The output is meant to stop scroll, increase watch intent, and make the brand feel more deliberate in every frame.",
  },
  {
    eyebrow: "Premium brand perception",
    title: "Sharper visuals change how a brand is judged.",
    text: "People decide fast. Better content framing, stronger editing, and cleaner brand presentation instantly improve how serious the business feels.",
  },
  {
    eyebrow: "System thinking",
    title: "Content works better when it behaves like a system.",
    text: "Instead of isolated posts, the goal is structured output — edits, clips, campaigns, shoots, and design all working together.",
  },
  {
    eyebrow: "Execution speed",
    title: "Fast delivery means nothing without control.",
    text: "The standard is not just speed. It is speed with rhythm, consistency, and visual discipline across formats.",
  },
];

function ResultsSection() {
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth <= 768 : false;

  return (
    <section
      id="results"
      style={{
        position: "relative",
        padding: isMobile ? "80px 0" : "120px 0",
        background: theme.colors.bgSoft,
        borderBottom: `1px solid ${theme.colors.line}`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "-8%",
          top: "10%",
          width: isMobile ? "220px" : "340px",
          height: isMobile ? "220px" : "340px",
          borderRadius: "50%",
          background: "rgba(214,176,96,0.07)",
          filter: "blur(140px)",
          pointerEvents: "none",
        }}
      />

      <Container>
        <Reveal>
          <SectionTag>Results</SectionTag>
        </Reveal>

        <Reveal delay={0.08}>
          <SectionHeading
            title="The goal is not more content. The goal is stronger impact."
            subtitle="Mineworld is built around outcomes that matter — attention, perception, structure, and sharper digital execution. This section is about how the work is meant to perform, not just how it looks."
          />
        </Reveal>

        {/* TOP 3 RESULT CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: "22px",
            marginTop: "14px",
          }}
        >
          {resultCards.map((card, index) => (
            <Reveal key={card.id} delay={0.12 + index * 0.06}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 180, damping: 18 }}
                style={{
                  minHeight: isMobile ? "auto" : "220px",
                  borderRadius: isMobile ? "22px" : "26px",
                  padding: isMobile ? "22px" : "28px",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025))",
                  border: `1px solid ${theme.colors.line}`,
                  boxShadow: theme.shadow.soft,
                }}
              >
                <div
                  style={{
                    color: theme.colors.goldSoft,
                    fontSize: isMobile ? "44px" : "52px",
                    fontWeight: 800,
                    lineHeight: 1,
                    marginBottom: "18px",
                  }}
                >
                  {card.id}
                </div>

                <h3
                  style={{
                    margin: "0 0 12px",
                    fontSize: isMobile ? "26px" : "28px",
                    lineHeight: 1.08,
                    fontWeight: 800,
                    color: theme.colors.text,
                  }}
                >
                  {card.title}
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: theme.colors.textSoft,
                    fontSize: "15px",
                    lineHeight: 1.8,
                  }}
                >
                  {card.text}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* LOWER 2x2 BLOCKS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "24px",
            marginTop: "28px",
          }}
        >
          {proofBlocks.map((block, index) => (
            <Reveal key={block.title} delay={0.18 + index * 0.06}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 180, damping: 18 }}
                style={{
                  minHeight: isMobile ? "auto" : "250px",
                  borderRadius: isMobile ? "22px" : "28px",
                  padding: isMobile ? "24px" : "30px",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025))",
                  border: `1px solid ${theme.colors.line}`,
                  boxShadow: theme.shadow.soft,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    right: "-40px",
                    bottom: "-40px",
                    width: isMobile ? "120px" : "160px",
                    height: isMobile ? "120px" : "160px",
                    borderRadius: "50%",
                    background: "rgba(214,176,96,0.05)",
                    filter: "blur(70px)",
                    pointerEvents: "none",
                  }}
                />

                <div
                  style={{
                    color: theme.colors.goldSoft,
                    fontSize: "12px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    marginBottom: "14px",
                  }}
                >
                  {block.eyebrow}
                </div>

                <h3
                  style={{
                    margin: "0 0 14px",
                    fontSize: isMobile ? "28px" : "clamp(28px, 2.4vw, 42px)",
                    lineHeight: 1.08,
                    fontWeight: 800,
                    color: theme.colors.text,
                    maxWidth: "95%",
                  }}
                >
                  {block.title}
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: theme.colors.textSoft,
                    fontSize: isMobile ? "15px" : "16px",
                    lineHeight: 1.9,
                    maxWidth: "95%",
                  }}
                >
                  {block.text}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ResultsSection;