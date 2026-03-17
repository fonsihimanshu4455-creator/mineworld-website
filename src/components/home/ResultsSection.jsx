import { motion } from "framer-motion";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";
import SectionTag from "../common/SectionTag";
import { theme } from "../../styles/theme";

const resultCards = [
  {
    id: 1,
    label: "Retention-first execution",
    title: "Designed to hold attention, not just fill timelines.",
    description:
      "Every edit, cut, pace, and visual layer is built to improve how long people stay, watch, and remember.",
  },
  {
    id: 2,
    label: "Premium brand perception",
    title: "Sharper visuals change how a brand is judged.",
    description:
      "Mineworld focuses on making brands feel more polished, more credible, and more premium from the first impression onward.",
  },
  {
    id: 3,
    label: "System thinking",
    title: "Content works better when it behaves like a system.",
    description:
      "Instead of isolated posts, the goal is structured output — edits, clips, campaigns, shoots, and design all working together.",
  },
  {
    id: 4,
    label: "Execution speed",
    title: "Fast delivery means nothing without control.",
    description:
      "The standard is not just speed. It is speed with rhythm, consistency, and visual discipline across formats.",
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
        background: theme.colors.bg,
        borderBottom: `1px solid ${theme.colors.line}`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "-8%",
          top: "8%",
          width: isMobile ? "220px" : "320px",
          height: isMobile ? "220px" : "320px",
          borderRadius: "50%",
          background: "rgba(214,176,96,0.08)",
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

        {/* TOP IMPACT STRIP */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: "22px",
            marginBottom: "28px",
          }}
        >
          {[
            {
              stat: "01",
              text: "Visual systems built for brand authority",
            },
            {
              stat: "02",
              text: "Editing logic focused on retention and rhythm",
            },
            {
              stat: "03",
              text: "Content designed to look sharper and perform better",
            },
          ].map((item, index) => (
            <Reveal key={item.stat} delay={0.12 + index * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 180, damping: 18 }}
                style={{
                  minHeight: isMobile ? "auto" : "170px",
                  borderRadius: isMobile ? "22px" : "26px",
                  padding: isMobile ? "22px" : "26px",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025))",
                  border: `1px solid ${theme.colors.line}`,
                  boxShadow: theme.shadow.soft,
                }}
              >
                <div
                  style={{
                    fontSize: isMobile ? "36px" : "42px",
                    lineHeight: 1,
                    fontWeight: 800,
                    color: theme.colors.goldSoft,
                    marginBottom: "16px",
                  }}
                >
                  {item.stat}
                </div>

                <div
                  style={{
                    color: theme.colors.text,
                    fontSize: isMobile ? "15px" : "16px",
                    lineHeight: 1.75,
                    maxWidth: "90%",
                  }}
                >
                  {item.text}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* BOTTOM GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "24px",
          }}
        >
          {resultCards.map((card, index) => (
            <Reveal key={card.id} delay={0.18 + index * 0.06}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 180, damping: 18 }}
                style={{
                  minHeight: isMobile ? "auto" : "250px",
                  borderRadius: isMobile ? "22px" : "28px",
                  padding: isMobile ? "24px" : "30px",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025))",
                  border:
                    index === 0
                      ? "1px solid rgba(214,176,96,0.32)"
                      : `1px solid ${theme.colors.line}`,
                  boxShadow: theme.shadow.soft,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {index === 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-35px",
                      right: "-35px",
                      width: isMobile ? "130px" : "180px",
                      height: isMobile ? "130px" : "180px",
                      borderRadius: "50%",
                      background: "rgba(214,176,96,0.16)",
                      filter: "blur(80px)",
                      pointerEvents: "none",
                    }}
                  />
                )}

                <div
                  style={{
                    color: theme.colors.goldSoft,
                    fontSize: "12px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    marginBottom: "16px",
                  }}
                >
                  {card.label}
                </div>

                <h3
                  style={{
                    margin: "0 0 14px",
                    fontSize: isMobile ? "28px" : "clamp(24px, 3vw, 34px)",
                    lineHeight: 1.1,
                    fontWeight: 800,
                    maxWidth: "95%",
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
                    lineHeight: 1.85,
                    maxWidth: "95%",
                  }}
                >
                  {card.description}
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