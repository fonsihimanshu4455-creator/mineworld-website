import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";
import SectionTag from "../common/SectionTag";
import LazyVideo from "../common/LazyVideo";
import { theme } from "../../styles/theme";
import { serviceCategories } from "../../data/serviceCategories";
import useIsMobile from "../../utils/useIsMobile";

function CategoryCard({ item, isMobile, size = "default" }) {
  const isLarge = size === "large";
  const accent =
    item.color === "blue"
      ? "rgba(88,110,180,0.4)"
      : "rgba(214,176,96,0.48)";

  return (
    <Link
      to={`/services/${item.slug}`}
      aria-label={`${item.name} — view details`}
      style={{
        textDecoration: "none",
        display: "block",
        height: "100%",
      }}
    >
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        style={{
          position: "relative",
          borderRadius: isMobile ? "22px" : "26px",
          overflow: "hidden",
          border: `1px solid ${theme.colors.line}`,
          background: theme.colors.bgCard,
          boxShadow: theme.shadow.soft,
          height: "100%",
          minHeight: isMobile ? "320px" : isLarge ? "440px" : "360px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            position: "relative",
            flex: 1,
            minHeight: isMobile ? "220px" : isLarge ? "300px" : "240px",
            overflow: "hidden",
          }}
        >
          {item.cover.type === "video" ? (
            <LazyVideo
              src={item.cover.src}
              poster={item.cover.poster}
              ariaLabel={item.cover.alt}
              style={{ position: "absolute", inset: 0 }}
              videoStyle={{ opacity: 0.9 }}
            />
          ) : (
            <img
              src={item.cover.src}
              alt={item.cover.alt}
              loading="lazy"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.88,
              }}
            />
          )}

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.22) 40%, rgba(0,0,0,0.78) 100%)",
              pointerEvents: "none",
            }}
          />

          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "18px",
              right: "18px",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: accent,
              display: "grid",
              placeItems: "center",
              color: "#FFFFFF",
              fontSize: "16px",
              fontWeight: 800,
              border: "1px solid rgba(255,255,255,0.16)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            →
          </div>
        </div>

        <div
          style={{
            padding: isMobile ? "20px 22px 22px" : "22px 26px 24px",
            borderTop: `1px solid ${theme.colors.line}`,
            background:
              "linear-gradient(180deg, rgba(17,24,39,0.86), rgba(17,24,39,1))",
          }}
        >
          <div
            style={{
              color: theme.colors.goldSoft,
              fontSize: "11px",
              letterSpacing: "1.8px",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: "8px",
            }}
          >
            {item.short}
          </div>
          <h3
            style={{
              margin: 0,
              color: theme.colors.text,
              fontSize: isMobile ? "22px" : isLarge ? "28px" : "24px",
              lineHeight: 1.18,
              fontWeight: 800,
              letterSpacing: "-0.6px",
              fontFamily:
                '"Playfair Display", Georgia, "Times New Roman", serif',
            }}
          >
            {item.name}
          </h3>
        </div>
      </motion.article>
    </Link>
  );
}

function Services() {
  const isMobile = useIsMobile(768);

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
        aria-hidden="true"
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
        aria-hidden="true"
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
          <SectionTag>Services</SectionTag>
        </Reveal>

        <Reveal delay={0.08}>
          <SectionHeading
            title="What we do — tap a category to see the details."
            subtitle="Each service is a standalone system, and also plugs into a larger content + growth engine. Click any card to see what's included, our approach, deliverables, and the pricing plan that fits."
          />
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fit, minmax(280px, 1fr))",
            gap: isMobile ? "18px" : "22px",
            alignItems: "stretch",
          }}
        >
          {serviceCategories.map((item, i) => (
            <Reveal key={item.slug} delay={0.05 * i}>
              <CategoryCard item={item} isMobile={isMobile} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.25}>
          <div
            style={{
              marginTop: "36px",
              textAlign: "center",
              color: theme.colors.textSoft,
              fontSize: "14px",
              lineHeight: 1.8,
            }}
          >
            Not sure which fits?{" "}
            <Link
              to="/#pricing"
              style={{
                color: theme.colors.goldSoft,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              See plans →
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default Services;
