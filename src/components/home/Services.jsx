import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";
import SectionTag from "../common/SectionTag";
import { theme } from "../../styles/theme";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useSiteContent } from "../../context/useSiteContent";

function Services() {
  const isMobile = useIsMobile();
  const { content } = useSiteContent();
  const s = content.services || {};
  const allItems = (s.items || []).filter((it) => it.visible !== false);
  const featured = allItems.find((it) => it.featured) || allItems[0];
  const others = allItems.filter((it) => it !== featured);

  if (!featured) return null;

  return (
    <section
      id="services"
      style={{
        position: "relative",
        padding: isMobile ? "82px 0" : "122px 0",
        background: `
          radial-gradient(circle at 12% 80%, rgba(214,176,96,0.08), transparent 26%),
          linear-gradient(180deg, rgba(19,29,48,0.98) 0%, rgba(16,24,39,1) 100%)
        `,
        borderBottom: `1px solid ${theme.colors.line}`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "-8%",
          bottom: "-10%",
          width: isMobile ? "220px" : "340px",
          height: isMobile ? "220px" : "340px",
          borderRadius: "50%",
          background: "rgba(214,176,96,0.08)",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "-6%",
          top: "10%",
          width: isMobile ? "180px" : "260px",
          height: isMobile ? "180px" : "260px",
          borderRadius: "50%",
          background: "rgba(88,110,180,0.08)",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />

      <Container>
        <Reveal>
          <SectionTag>{s.sectionTag || "Services"}</SectionTag>
        </Reveal>

        <Reveal delay={0.08}>
          <SectionHeading
            title={s.sectionTitle}
            subtitle={s.sectionSubtitle}
          />
        </Reveal>

        <Reveal delay={0.12}>
          <ServiceCard
            service={featured}
            variant="featured"
            isMobile={isMobile}
          />
        </Reveal>

        {others.length > 0 && (
          <div
            style={{
              marginTop: isMobile ? "22px" : "26px",
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : others.length === 1
                  ? "1fr"
                  : others.length === 2
                    ? "repeat(2, minmax(0, 1fr))"
                    : "repeat(auto-fit, minmax(260px, 1fr))",
              gap: isMobile ? "18px" : "22px",
            }}
          >
            {others.map((service, idx) => (
              <Reveal key={service.id || service.slug} delay={0.16 + idx * 0.06}>
                <ServiceCard
                  service={service}
                  variant="support"
                  isMobile={isMobile}
                />
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

function ServiceCard({ service, variant, isMobile }) {
  const quickItems = (service.quickItems || [])
    .filter((q) => (typeof q === "object" ? q.visible !== false : true))
    .map((q) => (typeof q === "object" ? q.label : q));

  const isFeatured = variant === "featured";

  return (
    <motion.div
      whileHover={{ y: isFeatured ? -4 : -6 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="mw-card-hover mw-shine"
      style={{
        position: "relative",
        minHeight: isFeatured ? (isMobile ? "auto" : "420px") : "auto",
        borderRadius: isMobile ? "24px" : isFeatured ? "30px" : "24px",
        padding: isMobile
          ? isFeatured
            ? "26px 22px"
            : "22px 20px"
          : isFeatured
            ? "36px"
            : "26px",
        background: isFeatured
          ? "linear-gradient(180deg, rgba(255,255,255,0.065), rgba(255,255,255,0.025))"
          : "linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.02))",
        border: isFeatured
          ? "1px solid rgba(214,176,96,0.38)"
          : `1px solid ${theme.colors.line}`,
        boxShadow: isFeatured ? theme.shadow.deep : theme.shadow.soft,
        overflow: "hidden",
      }}
    >
      {isFeatured && (
        <div
          style={{
            position: "absolute",
            top: "-40px",
            right: "-40px",
            width: isMobile ? "160px" : "220px",
            height: isMobile ? "160px" : "220px",
            borderRadius: "50%",
            background: "rgba(214,176,96,0.18)",
            filter: "blur(90px)",
            pointerEvents: "none",
          }}
        />
      )}

      <div style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            color: theme.colors.goldSoft,
            fontSize: isFeatured ? "12px" : "11px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: isFeatured ? "16px" : "14px",
            fontWeight: 700,
          }}
        >
          {service.subtitle}
        </div>

        <h3
          style={{
            margin: "0 0 14px",
            fontSize: isMobile
              ? isFeatured
                ? "clamp(26px, 7vw, 36px)"
                : "clamp(20px, 6vw, 26px)"
              : isFeatured
                ? "clamp(34px, 4vw, 54px)"
                : "clamp(24px, 2.4vw, 30px)",
            lineHeight: 1.08,
            fontWeight: 800,
            color: theme.colors.text,
            letterSpacing: isFeatured ? "-1px" : "-0.5px",
            wordBreak: "break-word",
            fontFamily:
              '"Playfair Display", Georgia, "Times New Roman", serif',
          }}
        >
          {service.title}
        </h3>

        <p
          style={{
            margin: 0,
            color: theme.colors.textSoft,
            fontSize: isFeatured ? (isMobile ? "15px" : "17px") : "15px",
            lineHeight: 1.85,
          }}
        >
          {service.shortDescription}
        </p>

        {quickItems.length > 0 && (
          <div
            style={{
              display: isFeatured ? "grid" : "flex",
              gridTemplateColumns: isFeatured
                ? isMobile
                  ? "1fr"
                  : "repeat(2, minmax(0, 1fr))"
                : undefined,
              flexWrap: isFeatured ? undefined : "wrap",
              gap: isFeatured ? "12px" : "8px",
              marginTop: "22px",
            }}
          >
            {quickItems.map((item, idx) => (
              <div
                key={idx}
                className="mw-tag-hover"
                style={{
                  padding: isFeatured ? "12px 14px" : "8px 12px",
                  borderRadius: isFeatured ? "16px" : "999px",
                  border: `1px solid ${theme.colors.line}`,
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                  color: theme.colors.text,
                  fontSize: isFeatured ? "13.5px" : "12px",
                  fontWeight: 500,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        )}

        <Link
          to={`/services/${service.slug}`}
          aria-label={`Learn more about ${service.title}`}
          className="mw-link"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "24px",
            padding: "10px 16px 10px 0",
            color: theme.colors.goldSoft,
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.4px",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          Explore service
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </motion.div>
  );
}

export default Services;
