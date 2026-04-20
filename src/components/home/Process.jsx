import { motion } from "framer-motion";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";
import SectionTag from "../common/SectionTag";
import { theme } from "../../styles/theme";
import { processSteps } from "../../data/processSteps";
import useIsMobile from "../../utils/useIsMobile";

function StepCard({ step, isMobile, isLast }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      style={{
        position: "relative",
        padding: isMobile ? "24px 22px" : "28px 26px",
        borderRadius: "24px",
        border: `1px solid ${theme.colors.line}`,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {!isLast && !isMobile && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "42px",
            right: "-24px",
            width: "24px",
            height: "1px",
            background:
              "linear-gradient(90deg, rgba(214,176,96,0.5), transparent)",
            pointerEvents: "none",
          }}
        />
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, rgba(214,176,96,0.92), rgba(231,201,139,0.85))",
            color: "#18140F",
            display: "grid",
            placeItems: "center",
            fontWeight: 800,
            fontSize: "14px",
            letterSpacing: "0.4px",
            flexShrink: 0,
            boxShadow: "0 10px 22px rgba(214,176,96,0.28)",
          }}
        >
          {step.number}
        </div>
        <div>
          <div
            style={{
              color: theme.colors.goldSoft,
              fontSize: "11px",
              letterSpacing: "1.6px",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            {step.eyebrow}
          </div>
          <div
            style={{
              color: theme.colors.text,
              fontSize: "18px",
              fontWeight: 800,
              lineHeight: 1.2,
              marginTop: "2px",
            }}
          >
            {step.title}
          </div>
        </div>
      </div>

      <p
        style={{
          margin: 0,
          color: theme.colors.textSoft,
          fontSize: "14px",
          lineHeight: 1.8,
          flex: 1,
        }}
      >
        {step.description}
      </p>

      <div
        style={{
          marginTop: "18px",
          paddingTop: "16px",
          borderTop: `1px solid ${theme.colors.line}`,
        }}
      >
        <div
          style={{
            color: "rgba(243,239,231,0.5)",
            fontSize: "11px",
            letterSpacing: "1.4px",
            textTransform: "uppercase",
            fontWeight: 700,
            marginBottom: "8px",
          }}
        >
          Deliverables
        </div>
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "grid",
            gap: "6px",
          }}
        >
          {step.deliverables.map((d) => (
            <li
              key={d}
              style={{
                display: "flex",
                gap: "8px",
                color: theme.colors.text,
                fontSize: "13px",
                lineHeight: 1.6,
              }}
            >
              <span style={{ color: theme.colors.gold }}>·</span>
              {d}
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          marginTop: "14px",
          color: theme.colors.goldSoft,
          fontSize: "12px",
          letterSpacing: "1.4px",
          textTransform: "uppercase",
          fontWeight: 700,
        }}
      >
        {step.duration}
      </div>
    </motion.div>
  );
}

function Process() {
  const isMobile = useIsMobile(768);

  return (
    <section
      id="process"
      style={{
        position: "relative",
        padding: isMobile ? "82px 0" : "122px 0",
        background: `
          radial-gradient(circle at 22% 12%, rgba(88,110,180,0.08), transparent 22%),
          linear-gradient(180deg, rgba(13,20,34,1) 0%, rgba(17,24,39,1) 100%)
        `,
        borderBottom: `1px solid ${theme.colors.line}`,
        overflow: "hidden",
      }}
    >
      <Container>
        <Reveal>
          <SectionTag>Our Process</SectionTag>
        </Reveal>
        <Reveal delay={0.08}>
          <SectionHeading
            title="How we turn your content into a growth system."
            subtitle="No black box. Every project moves through the same 5 stages — from clarity call to live campaigns to monthly iteration. You always know what's next."
          />
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fit, minmax(230px, 1fr))",
            gap: isMobile ? "16px" : "22px",
            alignItems: "stretch",
          }}
        >
          {processSteps.map((step, i) => (
            <Reveal key={step.number} delay={0.05 * i}>
              <StepCard
                step={step}
                isMobile={isMobile}
                isLast={i === processSteps.length - 1}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Process;
