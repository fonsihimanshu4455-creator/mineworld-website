import { motion } from "framer-motion";
import Container from "../common/Container";
import MagneticButton from "../common/MagneticButton";
import Reveal from "../common/Reveal";
import { theme } from "../../styles/theme";
import { openContactModal } from "../../utils/contactActions";
import useIsMobile from "../../utils/useIsMobile";

function CTA() {
  const isMobile = useIsMobile(768);

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        padding: isMobile ? "56px 0" : "72px 0",
        background: theme.colors.bgSoft,
        borderBottom: `1px solid ${theme.colors.line}`,
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: isMobile ? "260px" : "420px",
          height: isMobile ? "260px" : "420px",
          borderRadius: "50%",
          background: "rgba(214,176,96,0.10)",
          filter: "blur(140px)",
          pointerEvents: "none",
        }}
      />

      <Container>
        <Reveal>
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            style={{
              position: "relative",
              borderRadius: isMobile ? "22px" : "26px",
              padding: isMobile ? "26px 22px" : "30px 36px",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
              border: "1px solid rgba(214,176,96,0.30)",
              boxShadow: theme.shadow.deep,
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1.3fr 1fr",
              gap: isMobile ? "20px" : "32px",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <div>
              <div
                style={{
                  color: theme.colors.goldSoft,
                  fontSize: "11px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  marginBottom: "10px",
                }}
              >
                Start with Mineworld
              </div>
              <h2
                style={{
                  margin: "0 0 8px",
                  fontSize: isMobile ? "26px" : "clamp(28px, 3.4vw, 36px)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.6px",
                  fontWeight: 800,
                  color: theme.colors.text,
                  fontFamily:
                    '"Playfair Display", Georgia, "Times New Roman", serif',
                }}
              >
                If your brand still looks ordinary — that&rsquo;s the problem.
              </h2>
              <p
                style={{
                  margin: 0,
                  color: theme.colors.textSoft,
                  fontSize: "14.5px",
                  lineHeight: 1.8,
                  maxWidth: "520px",
                }}
              >
                Sharper content, better editing, stronger brand perception — in
                one team.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                justifyContent: isMobile ? "flex-start" : "flex-end",
              }}
            >
              <button
                onClick={() => openContactModal("cta-start")}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                <MagneticButton>Start a Project</MagneticButton>
              </button>
              <button
                onClick={() => openContactModal("cta-strategy-call")}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                <MagneticButton secondary>Book a Call</MagneticButton>
              </button>
            </div>
          </motion.div>
        </Reveal>
      </Container>
    </section>
  );
}

export default CTA;
