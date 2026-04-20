import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";
import SectionTag from "../common/SectionTag";
import { theme } from "../../styles/theme";
import { faqItems } from "../../data/faqItems";
import { openContactModal } from "../../utils/contactActions";
import useIsMobile from "../../utils/useIsMobile";

function FAQItem({ item, index, openIndex, setOpenIndex }) {
  const open = openIndex === index;
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div
      style={{
        borderRadius: "20px",
        border: `1px solid ${open ? "rgba(214,176,96,0.4)" : theme.colors.line}`,
        background: open
          ? "linear-gradient(180deg, rgba(214,176,96,0.06), rgba(255,255,255,0.02))"
          : "rgba(255,255,255,0.025)",
        overflow: "hidden",
        transition: "border-color 0.25s ease, background 0.25s ease",
      }}
    >
      <button
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpenIndex(open ? -1 : index)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "18px",
          padding: "20px 22px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          color: theme.colors.text,
          fontSize: "16px",
          fontWeight: 700,
          lineHeight: 1.45,
          fontFamily: '"Inter", "Segoe UI", Arial, sans-serif',
        }}
      >
        <span>{item.q}</span>
        <span
          style={{
            flexShrink: 0,
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: `1px solid ${theme.colors.line}`,
            display: "grid",
            placeItems: "center",
            color: theme.colors.goldSoft,
            fontSize: "16px",
            fontWeight: 800,
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
          }}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                padding: "0 22px 22px",
                color: theme.colors.textSoft,
                fontSize: "15px",
                lineHeight: 1.85,
              }}
            >
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQ() {
  const isMobile = useIsMobile(768);
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      style={{
        position: "relative",
        padding: isMobile ? "82px 0" : "122px 0",
        background: theme.colors.bg,
        borderBottom: `1px solid ${theme.colors.line}`,
        overflow: "hidden",
      }}
    >
      <Container>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "0.8fr 1.2fr",
            gap: isMobile ? "32px" : "60px",
            alignItems: "start",
          }}
        >
          <div>
            <Reveal>
              <SectionTag>FAQ</SectionTag>
            </Reveal>
            <Reveal delay={0.08}>
              <SectionHeading
                title="The stuff most people ask before signing up."
                subtitle="Short, direct answers. If something isn't covered, just ask us on WhatsApp."
              />
            </Reveal>

            {!isMobile && (
              <Reveal delay={0.2}>
                <button
                  onClick={() => openContactModal("faq")}
                  style={{
                    marginTop: "12px",
                    padding: "12px 22px",
                    borderRadius: "999px",
                    border: "none",
                    background: "linear-gradient(135deg, #D6B060, #E7C98A)",
                    color: "#18140F",
                    fontWeight: 800,
                    fontSize: "14px",
                    cursor: "pointer",
                    boxShadow: "0 10px 24px rgba(214,176,96,0.28)",
                  }}
                >
                  Ask your own question
                </button>
              </Reveal>
            )}
          </div>

          <div style={{ display: "grid", gap: "12px" }}>
            {faqItems.map((item, i) => (
              <Reveal key={item.q} delay={0.04 * i}>
                <FAQItem
                  item={item}
                  index={i}
                  openIndex={openIndex}
                  setOpenIndex={setOpenIndex}
                />
              </Reveal>
            ))}

            {isMobile && (
              <Reveal delay={0.2}>
                <button
                  onClick={() => openContactModal("faq")}
                  style={{
                    marginTop: "8px",
                    padding: "14px 22px",
                    borderRadius: "999px",
                    border: "none",
                    background: "linear-gradient(135deg, #D6B060, #E7C98A)",
                    color: "#18140F",
                    fontWeight: 800,
                    fontSize: "14px",
                    cursor: "pointer",
                    boxShadow: "0 10px 24px rgba(214,176,96,0.28)",
                  }}
                >
                  Ask your own question
                </button>
              </Reveal>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default FAQ;
