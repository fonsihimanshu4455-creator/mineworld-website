import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionTag from "../common/SectionTag";
import SectionHeading from "../common/SectionHeading";
import MagneticButton from "../common/MagneticButton";
import { theme } from "../../styles/theme";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useSiteContent } from "../../context/useSiteContent";
import { openContactModal } from "../../utils/contactActions";

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div
      style={{
        borderRadius: "18px",
        border: `1px solid ${isOpen ? "rgba(214,176,96,0.35)" : theme.colors.line}`,
        background: isOpen
          ? "linear-gradient(180deg, rgba(214,176,96,0.08), rgba(214,176,96,0.02))"
          : "rgba(255,255,255,0.03)",
        overflow: "hidden",
        transition: "border-color 0.25s ease, background 0.25s ease",
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "14px",
          background: "transparent",
          border: "none",
          color: theme.colors.text,
          textAlign: "left",
          padding: "18px 20px",
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        <span
          style={{
            fontSize: "16px",
            fontWeight: 700,
            lineHeight: 1.4,
          }}
        >
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
          style={{
            flexShrink: 0,
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: `1px solid ${isOpen ? "rgba(214,176,96,0.55)" : theme.colors.line}`,
            color: isOpen ? "#F7D58A" : theme.colors.text,
            display: "grid",
            placeItems: "center",
            fontSize: "18px",
            lineHeight: 1,
            fontWeight: 400,
            transition: "all 0.25s ease",
          }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                padding: "0 20px 20px",
                color: theme.colors.textSoft,
                fontSize: "15px",
                lineHeight: 1.8,
              }}
            >
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const isMobile = useIsMobile();
  const { content } = useSiteContent();
  const faq = content.faq || {};
  const items = (faq.items || []).filter((i) => i.visible !== false);
  const [openId, setOpenId] = useState(items[0]?.id || null);

  if (!items.length) return null;

  return (
    <section
      id="faq"
      style={{
        position: "relative",
        padding: isMobile ? "70px 0" : "100px 0",
        background: theme.colors.bg,
        borderBottom: `1px solid ${theme.colors.line}`,
      }}
    >
      <Container>
        <Reveal>
          <SectionTag>{faq.sectionTag || "FAQ"}</SectionTag>
        </Reveal>

        <Reveal delay={0.08}>
          <SectionHeading
            title={faq.sectionTitle}
            subtitle={faq.sectionSubtitle}
          />
        </Reveal>

        <div
          style={{
            marginTop: isMobile ? "22px" : "32px",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.4fr 0.8fr",
            gap: isMobile ? "20px" : "40px",
            alignItems: "start",
          }}
        >
          <Reveal delay={0.1}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {items.map((item) => (
                <FAQItem
                  key={item.id}
                  item={item}
                  isOpen={openId === item.id}
                  onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                />
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div
              style={{
                padding: isMobile ? "24px 22px" : "28px 26px",
                borderRadius: "22px",
                border: `1px solid ${theme.colors.lineStrong}`,
                background:
                  "linear-gradient(135deg, rgba(214,176,96,0.1) 0%, rgba(214,176,96,0.02) 100%)",
                position: "sticky",
                top: "120px",
              }}
            >
              <div
                style={{
                  color: theme.colors.goldSoft,
                  fontSize: "11px",
                  letterSpacing: "2.2px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  marginBottom: "12px",
                }}
              >
                Still unsure?
              </div>
              <h3
                style={{
                  margin: "0 0 10px",
                  fontSize: isMobile ? "22px" : "26px",
                  lineHeight: 1.2,
                  fontWeight: 800,
                  color: theme.colors.text,
                  letterSpacing: "-0.3px",
                }}
              >
                Ask us anything.
              </h3>
              <p
                style={{
                  margin: "0 0 18px",
                  color: theme.colors.textSoft,
                  fontSize: "14px",
                  lineHeight: 1.75,
                }}
              >
                Message us on WhatsApp and we'll reply within a few hours — usually faster.
              </p>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button
                  onClick={openContactModal}
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  <MagneticButton>Send a Message</MagneticButton>
                </button>
                <a
                  href={`https://wa.me/${content.contact.whatsappNumber.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <MagneticButton secondary>WhatsApp</MagneticButton>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
