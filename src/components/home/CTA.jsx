import { motion } from "framer-motion";
import Container from "../common/Container";
import MagneticButton from "../common/MagneticButton";
import Reveal from "../common/Reveal";
import CursorRunaway from "../common/CursorRunaway";
import { openContactModal } from "../../utils/contactActions";
import useIsMobile from "../../utils/useIsMobile";
import { useSiteContent } from "../../hooks/useSiteContent";
import { useSiteList } from "../../hooks/useSiteList";
import RichText from "../../lib/richText.jsx";

function CTA() {
  const isMobile = useIsMobile(768);
  const eyebrow = useSiteContent("cta.eyebrow", "Start with Mineworld");
  const headlineRich = useSiteContent("cta.headline_rich", null);
  const subhead = useSiteContent(
    "cta.subhead",
    "Sharper content, better editing, stronger brand perception — in one team."
  );
  const primaryLabel = useSiteContent("cta.primary_label", "Start a Project");
  const secondaryLabel = useSiteContent("cta.secondary_label", "Book a Call");
  const pills = useSiteList("cta.feature_pills", null);

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
                {eyebrow}
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
                {headlineRich ? (
                  <RichText value={headlineRich} />
                ) : (
                  <>If your brand still looks ordinary — that&rsquo;s the problem.</>
                )}
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
                {subhead}
              </p>
              {pills && pills.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    marginTop: 14,
                  }}
                >
                  {pills.map((p, i) => (
                    <span
                      key={i}
                      style={{
                        padding: "6px 12px",
                        borderRadius: 999,
                        border: "1px solid rgba(184, 149, 106, 0.35)",
                        background: "rgba(255,255,255,0.5)",
                        fontSize: 12,
                        fontWeight: 700,
                        color: "var(--text-primary)",
                      }}
                    >
                      {p.label || p}
                    </span>
                  ))}
                </div>
              )}
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
                <MagneticButton>{primaryLabel}</MagneticButton>
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
                <MagneticButton secondary>{secondaryLabel}</MagneticButton>
              </button>
            </div>
          </motion.div>
        </Reveal>
      </Container>
    </section>
  );
}

export default CTA;
