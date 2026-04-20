import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";
import SectionTag from "../common/SectionTag";
import LazyVideo from "../common/LazyVideo";
import { theme } from "../../styles/theme";
import { portfolioItems as defaultPortfolio } from "../../data/portfolioItems";
import { useCollection } from "../../admin/hooks";
import useIsMobile from "../../utils/useIsMobile";

function PortfolioCard({ item, isMobile }) {
  return (
    <Link
      to={`/portfolio/${item.slug}`}
      aria-label={`${item.title} — view case details`}
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
          minHeight: isMobile ? "320px" : "380px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            position: "relative",
            flex: 1,
            minHeight: isMobile ? "220px" : "260px",
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
                opacity: 0.9,
              }}
            />
          )}

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.78) 100%)",
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
              background: "rgba(214,176,96,0.92)",
              display: "grid",
              placeItems: "center",
              color: "#18140F",
              fontSize: "15px",
              fontWeight: 800,
              boxShadow: "0 8px 20px rgba(214,176,96,0.35)",
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
            {item.category}
          </div>
          <h3
            style={{
              margin: 0,
              color: theme.colors.text,
              fontSize: isMobile ? "20px" : "22px",
              lineHeight: 1.2,
              fontWeight: 800,
              letterSpacing: "-0.5px",
              fontFamily:
                '"Playfair Display", Georgia, "Times New Roman", serif',
            }}
          >
            {item.title}
          </h3>
        </div>
      </motion.article>
    </Link>
  );
}

function Portfolio() {
  const isMobile = useIsMobile(768);
  const portfolioItems = useCollection("portfolioItems", defaultPortfolio);

  return (
    <section
      id="portfolio"
      style={{
        position: "relative",
        padding: isMobile ? "82px 0" : "122px 0",
        background: `
          radial-gradient(circle at 86% 18%, rgba(214,176,96,0.08), transparent 22%),
          linear-gradient(180deg, rgba(16,24,39,1) 0%, rgba(13,20,34,1) 100%)
        `,
        borderBottom: `1px solid ${theme.colors.line}`,
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "-8%",
          bottom: "-10%",
          width: isMobile ? "220px" : "360px",
          height: isMobile ? "220px" : "360px",
          borderRadius: "50%",
          background: "rgba(214,176,96,0.08)",
          filter: "blur(140px)",
          pointerEvents: "none",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-6%",
          top: "12%",
          width: isMobile ? "180px" : "260px",
          height: isMobile ? "180px" : "260px",
          borderRadius: "50%",
          background: "rgba(88,110,180,0.07)",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />

      <Container>
        <Reveal>
          <SectionTag>Portfolio</SectionTag>
        </Reveal>

        <Reveal delay={0.08}>
          <SectionHeading
            title="Selected work — tap a card to see the breakdown."
            subtitle="Every piece here was built for a real business outcome — not a showreel. Click any card to see the brief, our approach, deliverables, and measurable impact."
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
          {portfolioItems.map((item, i) => (
            <Reveal key={item.slug} delay={0.05 * i}>
              <PortfolioCard item={item} isMobile={isMobile} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Portfolio;
