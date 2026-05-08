import { motion } from "framer-motion";
import Container from "../common/Container";
import MagneticButton from "../common/MagneticButton";
import Reveal from "../common/Reveal";
import CursorRunaway from "../common/CursorRunaway";
import { openContactModal } from "../../utils/contactActions";
import useIsMobile from "../../utils/useIsMobile";

function CTA() {
  const isMobile = useIsMobile(768);

  return (
    <section
      id="contact"
      className="geo-tile-bg"
      style={{
        position: "relative",
        padding: isMobile ? "84px 0" : "120px 0",
        backgroundColor: "var(--bg-cream-deep)",
        borderBottom: "1px solid var(--border-subtle)",
        overflow: "hidden",
      }}
    >
      <div
        className="dot-grid dot-grid-md"
        style={{ top: "60px", left: "40px" }}
        aria-hidden="true"
      />
      <div
        className="dot-grid dot-grid-gold dot-grid-md"
        style={{ bottom: "60px", right: "60px" }}
        aria-hidden="true"
      />

      <CursorRunaway />

      <Container>
        <Reveal>
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            style={{
              position: "relative",
              borderRadius: isMobile ? "22px" : "26px",
              padding: isMobile ? "30px 24px" : "44px 44px",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-cream)",
              boxShadow: "0 24px 60px rgba(15,42,68,0.10)",
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1.3fr 1fr",
              gap: isMobile ? "22px" : "36px",
              alignItems: "center",
              overflow: "hidden",
              zIndex: 2,
            }}
          >
            <div>
              <div
                style={{
                  color: "var(--accent-gold)",
                  fontSize: "11px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  fontWeight: 800,
                  marginBottom: "12px",
                }}
              >
                Start with Mineworld
              </div>
              <h2
                style={{
                  margin: "0 0 12px",
                  fontSize: isMobile ? "28px" : "clamp(30px, 3.4vw, 40px)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.6px",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  fontFamily:
                    '"Playfair Display", Georgia, "Times New Roman", serif',
                }}
              >
                If your brand still looks ordinary — that&rsquo;s the problem.
              </h2>
              <p
                style={{
                  margin: 0,
                  color: "var(--text-secondary)",
                  fontSize: "15.5px",
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
