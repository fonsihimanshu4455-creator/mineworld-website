import { motion } from "framer-motion";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";
import SectionTag from "../common/SectionTag";
import { theme } from "../../styles/theme";
import { pricingPlans } from "../../data/pricingPlans";
import { openContactModal, trackCtaClick } from "../../utils/contactActions";
import useIsMobile from "../../utils/useIsMobile";

function PlanCard({ plan, isMobile }) {
  const featured = plan.featured;
  const borderColor = featured
    ? "rgba(214,176,96,0.58)"
    : theme.colors.line;
  const bg = featured
    ? "linear-gradient(180deg, rgba(214,176,96,0.12), rgba(255,255,255,0.02))"
    : "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))";

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      style={{
        position: "relative",
        padding: isMobile ? "28px 22px" : "32px 26px",
        borderRadius: "26px",
        border: `1px solid ${borderColor}`,
        background: bg,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxShadow: featured ? theme.shadow.deep : theme.shadow.soft,
      }}
    >
      {featured && (
        <div
          style={{
            position: "absolute",
            top: "-14px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "6px 14px",
            borderRadius: "999px",
            background: "linear-gradient(135deg, #D6B060, #E7C98A)",
            color: "#18140F",
            fontSize: "11px",
            fontWeight: 800,
            letterSpacing: "1.6px",
            textTransform: "uppercase",
            boxShadow: "0 10px 22px rgba(214,176,96,0.28)",
          }}
        >
          Most Popular
        </div>
      )}

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
        {plan.name}
      </div>

      <h3
        style={{
          margin: "0 0 12px",
          color: theme.colors.text,
          fontSize: "22px",
          lineHeight: 1.3,
          fontWeight: 700,
          fontFamily:
            '"Playfair Display", Georgia, "Times New Roman", serif',
        }}
      >
        {plan.tagline}
      </h3>

      <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "4px" }}>
        <span
          style={{
            color: theme.colors.text,
            fontSize: "34px",
            fontWeight: 800,
            letterSpacing: "-0.8px",
            lineHeight: 1,
          }}
        >
          {plan.monthly}
        </span>
        <span
          style={{
            color: theme.colors.textSoft,
            fontSize: "13px",
            fontWeight: 600,
          }}
        >
          {plan.monthlyNote}
        </span>
      </div>

      <div
        style={{
          marginTop: "14px",
          marginBottom: "22px",
          paddingTop: "14px",
          borderTop: `1px solid ${theme.colors.line}`,
          color: theme.colors.textSoft,
          fontSize: "13px",
          lineHeight: 1.7,
        }}
      >
        <span style={{ color: "rgba(243,239,231,0.55)" }}>Best for: </span>
        {plan.bestFor}
      </div>

      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "grid",
          gap: "10px",
          flex: 1,
        }}
      >
        {plan.highlights.map((h) => (
          <li
            key={h}
            style={{
              display: "flex",
              gap: "10px",
              color: theme.colors.text,
              fontSize: "14px",
              lineHeight: 1.65,
            }}
          >
            <span
              style={{
                color: theme.colors.gold,
                flexShrink: 0,
                fontWeight: 800,
              }}
            >
              ✓
            </span>
            {h}
          </li>
        ))}
      </ul>

      <button
        onClick={() => {
          trackCtaClick(plan.cta, `pricing-${plan.id}`);
          openContactModal(`pricing-${plan.id}`);
        }}
        style={{
          marginTop: "26px",
          padding: "14px 20px",
          borderRadius: "999px",
          border: featured ? "none" : `1px solid ${theme.colors.line}`,
          background: featured
            ? "linear-gradient(135deg, #D6B060, #E7C98A)"
            : "rgba(255,255,255,0.04)",
          color: featured ? "#18140F" : theme.colors.text,
          fontWeight: 800,
          fontSize: "14px",
          letterSpacing: "0.2px",
          cursor: "pointer",
          boxShadow: featured ? "0 10px 24px rgba(214,176,96,0.28)" : "none",
          transition: "all 0.22s ease",
        }}
      >
        {plan.cta}
      </button>
    </motion.div>
  );
}

function Pricing() {
  const isMobile = useIsMobile(768);

  return (
    <section
      id="pricing"
      style={{
        position: "relative",
        padding: isMobile ? "82px 0" : "122px 0",
        background: `
          radial-gradient(circle at 18% 80%, rgba(214,176,96,0.06), transparent 24%),
          linear-gradient(180deg, rgba(16,24,39,1) 0%, rgba(13,20,34,1) 100%)
        `,
        borderBottom: `1px solid ${theme.colors.line}`,
        overflow: "hidden",
      }}
    >
      <Container>
        <Reveal>
          <SectionTag>Pricing</SectionTag>
        </Reveal>
        <Reveal delay={0.08}>
          <SectionHeading
            title="Transparent pricing. No DM-for-rate games."
            subtitle="Monthly retainers built around content systems — not hourly rates. Pick a plan that matches your business stage. Every plan can be customised if you need a different mix."
          />
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fit, minmax(240px, 1fr))",
            gap: isMobile ? "18px" : "22px",
            alignItems: "stretch",
          }}
        >
          {pricingPlans.map((plan, i) => (
            <Reveal key={plan.id} delay={0.05 * i}>
              <PlanCard plan={plan} isMobile={isMobile} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div
            style={{
              marginTop: "48px",
              textAlign: "center",
              color: theme.colors.textSoft,
              fontSize: "14px",
              lineHeight: 1.8,
            }}
          >
            All plans include a free 20-minute strategy call before you commit.
            <br />
            3-month minimum on monthly retainers. GST extra.
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default Pricing;
