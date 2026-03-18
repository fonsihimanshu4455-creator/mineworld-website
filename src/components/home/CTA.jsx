import { motion } from "framer-motion";
import Container from "../common/Container";
import MagneticButton from "../common/MagneticButton";
import Reveal from "../common/Reveal";
import { theme } from "../../styles/theme";
import { openContactModal } from "../../utils/contactActions";

function CTA() {
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth <= 768 : false;

  return (
    <section
      id="contact"
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
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            style={{
              position: "relative",
              borderRadius: isMobile ? "26px" : "34px",
              padding: isMobile ? "28px 22px" : "42px 40px",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.025))",
              border: "1px solid rgba(214,176,96,0.30)",
              boxShadow: theme.shadow.deep,
              overflow: "hidden",
              textAlign: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-45px",
                right: "-35px",
                width: isMobile ? "130px" : "220px",
                height: isMobile ? "130px" : "220px",
                borderRadius: "50%",
                background: "rgba(214,176,96,0.12)",
                filter: "blur(90px)",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                color: theme.colors.goldSoft,
                fontSize: isMobile ? "11px" : "12px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Start with Mineworld
            </div>

            <h2
              style={{
                margin: "0 auto 18px",
                maxWidth: "980px",
                fontSize: isMobile ? "40px" : "clamp(44px, 5vw, 76px)",
                lineHeight: isMobile ? 1.02 : 0.98,
                fontWeight: 800,
                color: theme.colors.text,
              }}
            >
              If your brand still looks ordinary,
              <br />
              that’s the problem.
            </h2>

            <p
              style={{
                margin: "0 auto",
                maxWidth: "840px",
                color: theme.colors.textSoft,
                fontSize: isMobile ? "16px" : "18px",
                lineHeight: 1.9,
              }}
            >
              Mineworld is built for brands, creators, clinics, and businesses
              that want stronger content, sharper editing, better digital
              presence, and more premium brand perception across platforms.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "14px",
                flexWrap: "wrap",
                marginTop: "30px",
              }}
            >
              <button
                onClick={openContactModal}
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
                onClick={openContactModal}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                <MagneticButton secondary>Book a Strategy Call</MagneticButton>
              </button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "12px",
                flexWrap: "wrap",
                marginTop: "24px",
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
          </motion.div>
        </Reveal>
      </Container>
    </section>
  );
}

export default CTA;