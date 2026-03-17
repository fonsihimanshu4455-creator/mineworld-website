import { motion } from "framer-motion";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import MagneticButton from "../common/MagneticButton";
import SectionTag from "../common/SectionTag";
import { theme } from "../../styles/theme";

function CTA() {
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth <= 768 : false;

  return (
    <section
      id="contact"
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
          inset: 0,
          background:
            "radial-gradient(circle at 20% 30%, rgba(214,176,96,0.10), transparent 25%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.04), transparent 20%)",
          pointerEvents: "none",
        }}
      />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            position: "relative",
            borderRadius: isMobile ? "24px" : "34px",
            padding: isMobile ? "24px" : "48px",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025))",
            border: "1px solid rgba(214,176,96,0.28)",
            boxShadow: theme.shadow.deep,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-40px",
              right: "-20px",
              width: isMobile ? "160px" : "240px",
              height: isMobile ? "160px" : "240px",
              borderRadius: "50%",
              background: "rgba(214,176,96,0.14)",
              filter: "blur(100px)",
              pointerEvents: "none",
            }}
          />

          <Reveal>
            <SectionTag>Start With Mineworld</SectionTag>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              style={{
                margin: "0 0 18px",
                fontSize: isMobile ? "52px" : "clamp(38px, 5vw, 72px)",
                lineHeight: 1.02,
                fontWeight: 800,
                maxWidth: "980px",
                color: theme.colors.text,
              }}
            >
              If your brand still looks ordinary,
              <br />
              that’s the problem.
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p
              style={{
                margin: 0,
                maxWidth: "760px",
                color: theme.colors.textSoft,
                fontSize: isMobile ? "16px" : "18px",
                lineHeight: 1.9,
              }}
            >
              Mineworld is built for brands, creators, and businesses that want
              to look sharper, feel more premium, and hold stronger attention
              across digital platforms. The goal is not more noise. The goal is
              a version people remember.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div
              style={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
                marginTop: "30px",
              }}
            >
              <MagneticButton>Start a Project</MagneticButton>
              <MagneticButton secondary>Book a Strategy Call</MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginTop: "28px",
              }}
            >
              {[
                "Editing-First Execution",
                "Premium Brand Presence",
                "Studio + Digital Integration",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    padding: "10px 14px",
                    borderRadius: "999px",
                    border: `1px solid ${theme.colors.line}`,
                    background: theme.colors.bgCard,
                    color: theme.colors.text,
                    fontSize: "13px",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </Reveal>
        </motion.div>
      </Container>
    </section>
  );
}

export default CTA;