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
          border: `1px solid ${
            item.flagship ? "rgba(214,176,96,0.34)" : theme.colors.line
          }`,
          background: theme.colors.bgCard,
          boxShadow: item.flagship
            ? "0 18px 44px rgba(214,176,96,0.12), 0 12px 28px rgba(0,0,0,0.28)"
            : theme.shadow.soft,
          height: "100%",
          minHeight: isMobile ? "320px" : isLarge ? "460px" : "360px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            position: "relative",
            flex: 1,
            minHeight: isMobile ? "220px" : isLarge ? "320px" : "240px",
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

          {item.flagship && (
            <div
              style={{
                position: "absolute",
                top: "16px",
                left: "16px",
                padding: "6px 12px",
                borderRadius: "999px",
                background:
                  "linear-gradient(135deg, rgba(214,176,96,0.95), rgba(231,201,138,0.95))",
                color: "#18140F",
                fontSize: "10.5px",
                fontWeight: 800,
                letterSpacing: "1.6px",
                textTransform: "uppercase",
                boxShadow: "0 8px 18px rgba(214,176,96,0.32)",
              }}
            >
              Flagship
            </div>
          )}

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
  const flagshipServices = serviceCategories.filter((s) => s.flagship);
  const supportingServices = serviceCategories.filter((s) => !s.flagship);

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
            title="Websites, apps & ads — plus everything that grows them."
            subtitle="Three flagship offerings up top — websites, apps, and Meta ads — supported by a full creative studio underneath. Tap any card to see what's included, our approach, deliverables, and the pricing plan that fits."
          />
        </Reveal>

        {flagshipServices.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fit, minmax(300px, 1fr))",
              gap: isMobile ? "18px" : "24px",
              alignItems: "stretch",
              marginBottom: isMobile ? "32px" : "44px",
            }}
          >
            {flagshipServices.map((item, i) => (
              <Reveal key={item.slug} delay={0.05 * i}>
                <CategoryCard item={item} isMobile={isMobile} size="large" />
              </Reveal>
            ))}
          </div>
        )}

        {supportingServices.length > 0 && (
          <>
            <Reveal>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  marginBottom: isMobile ? "16px" : "22px",
                  marginTop: isMobile ? "8px" : "0",
                }}
              >
                <div
                  style={{
                    color: theme.colors.goldSoft,
                    fontSize: "11px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    fontWeight: 800,
                    whiteSpace: "nowrap",
                  }}
                >
                  Also from the studio
                </div>
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background:
                      "linear-gradient(90deg, rgba(214,176,96,0.32), transparent)",
                  }}
                />
              </div>
            </Reveal>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : "repeat(auto-fit, minmax(260px, 1fr))",
                gap: isMobile ? "18px" : "22px",
                alignItems: "stretch",
              }}
            >
              {supportingServices.map((item, i) => (
                <Reveal key={item.slug} delay={0.05 * i}>
                  <CategoryCard item={item} isMobile={isMobile} />
                </Reveal>
              ))}
            </div>
          </>
        )}

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
              to="/packages"
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
