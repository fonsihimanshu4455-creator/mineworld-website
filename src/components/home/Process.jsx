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
        border: "1px solid var(--border-subtle)",
        background: "var(--bg-secondary)",
        boxShadow: "0 14px 32px rgba(15,42,68,0.06)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {!isLast && !isMobile && (
        <div
          aria-hidden="true"
          className="chain-line-horizontal"
          style={{
            top: "42px",
            right: "-32px",
            width: "32px",
            opacity: 0.5,
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
              "linear-gradient(135deg, rgba(188,153,102,0.92), rgba(231,201,139,0.85))",
            color: "#18140F",
            display: "grid",
            placeItems: "center",
            fontWeight: 800,
            fontSize: "14px",
            letterSpacing: "0.4px",
            flexShrink: 0,
            boxShadow: "0 10px 22px rgba(188,153,102,0.28)",
          }}
        >
          {step.number}
        </div>
        <div>
          <div
            style={{
              color: "var(--accent-navy)",
              fontSize: "11px",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            {step.eyebrow}
          </div>
          <div
            style={{
              color: "var(--text-primary)",
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
          color: "var(--text-secondary)",
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
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <div
          style={{
            color: "var(--accent-navy)",
            fontSize: "11px",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            fontWeight: 600,
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
                color: "var(--text-primary)",
                fontSize: "13px",
                lineHeight: 1.6,
              }}
            >
              <span style={{ color: "var(--accent-gold)" }}>·</span>
              {d}
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          marginTop: "14px",
          color: "var(--accent-navy)",
          fontSize: "12px",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          fontWeight: 600,
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
        background: "var(--bg-cream-soft)",
        borderBottom: "1px solid var(--border-subtle)",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(15, 42, 68, 0.10) 1.2px, transparent 1.2px)",
          backgroundSize: "16px 16px",
          opacity: 0.6,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
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
