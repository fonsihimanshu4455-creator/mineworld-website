import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "../components/common/Container";
import MagneticButton from "../components/common/MagneticButton";
import Reveal from "../components/common/Reveal";
import { theme } from "../styles/theme";
import { useSiteContent } from "../context/useSiteContent";
import { useIsMobile } from "../hooks/useIsMobile";
import { openContactModal } from "../utils/contactActions";
import { getServiceImage } from "../data/serviceImages";

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const { content } = useSiteContent();
  const isMobile = useIsMobile();

  const service = (content.services?.items || []).find((s) => s.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!service) {
    return (
      <section
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 20px 80px",
          textAlign: "center",
        }}
      >
        <div>
          <div
            style={{
              color: theme.colors.goldSoft,
              fontSize: "12px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "18px",
              fontWeight: 700,
            }}
          >
            404 — Not Found
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: isMobile
                ? "clamp(28px, 8vw, 40px)"
                : "clamp(40px, 5vw, 64px)",
              color: theme.colors.text,
              fontWeight: 800,
              letterSpacing: "-1px",
              marginBottom: "14px",
              wordBreak: "break-word",
            }}
          >
            We can’t find that service.
          </h1>
          <p
            style={{
              color: theme.colors.textSoft,
              fontSize: "16px",
              maxWidth: "520px",
              margin: "0 auto 24px",
              lineHeight: 1.8,
            }}
          >
            The service you’re looking for doesn’t exist, or it has been moved.
            Head back to the homepage and explore what Mineworld can build for
            your brand.
          </p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <MagneticButton>Back to Home</MagneticButton>
          </Link>
        </div>
      </section>
    );
  }

  const subServices = (service.subServices || []).filter(
    (s) => s.visible !== false
  );

  return (
    <section
      style={{
        position: "relative",
        padding: isMobile ? "110px 0 70px" : "150px 0 110px",
        background: `
          radial-gradient(circle at 18% 20%, rgba(214,176,96,0.12), transparent 28%),
          radial-gradient(circle at 82% 80%, rgba(87,120,210,0.1), transparent 30%),
          linear-gradient(180deg, ${theme.colors.bg} 0%, #131a2c 55%, ${theme.colors.bg} 100%)
        `,
        borderBottom: `1px solid ${theme.colors.line}`,
        overflow: "hidden",
      }}
    >
      <Container>
        <Reveal>
          <Link
            to="/#services"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: theme.colors.goldSoft,
              fontSize: "13px",
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: "22px",
              textDecoration: "none",
            }}
          >
            <span aria-hidden="true">←</span>
            Back to all services
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <div
            style={{
              color: theme.colors.goldSoft,
              fontSize: "12px",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: "14px",
            }}
          >
            {service.subtitle}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1
            style={{
              margin: 0,
              fontSize: isMobile
                ? "clamp(32px, 9vw, 46px)"
                : "clamp(48px, 6vw, 80px)",
              lineHeight: isMobile ? 1.04 : 0.96,
              fontWeight: 800,
              letterSpacing: isMobile ? "-1px" : "-2.4px",
              color: theme.colors.text,
              maxWidth: "920px",
              wordBreak: "break-word",
              fontFamily:
                '"Playfair Display", Georgia, "Times New Roman", serif',
            }}
          >
            {service.title}
          </h1>
        </Reveal>

        <Reveal delay={0.18}>
          <p
            style={{
              marginTop: "22px",
              marginBottom: 0,
              maxWidth: "780px",
              color: theme.colors.textSoft,
              fontSize: isMobile ? "16px" : "18px",
              lineHeight: 1.9,
            }}
          >
            {service.longDescription || service.shortDescription}
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div
            style={{
              display: "flex",
              gap: "14px",
              flexWrap: "wrap",
              marginTop: "34px",
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
            <a
              href={`https://wa.me/${content.contact.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
                `Hi Mineworld, I'd like to discuss ${service.title}`
              )}`}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              <MagneticButton secondary>Chat on WhatsApp</MagneticButton>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.28}>
          <div
            style={{
              marginTop: isMobile ? "40px" : "60px",
              borderRadius: isMobile ? "22px" : "28px",
              overflow: "hidden",
              position: "relative",
              border: `1px solid ${theme.colors.lineStrong}`,
              boxShadow: theme.shadow.deep,
              height: isMobile ? "240px" : "420px",
              background: "rgba(0,0,0,0.4)",
            }}
          >
            <img
              src={getServiceImage(service, 0)}
              alt={service.title}
              loading="eager"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: "scale(1.02)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(13,18,28,0.1) 0%, rgba(13,18,28,0.55) 70%, rgba(13,18,28,0.92) 100%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: isMobile ? "16px" : "26px",
                left: isMobile ? "16px" : "26px",
                right: isMobile ? "16px" : "26px",
                color: theme.colors.text,
              }}
            >
              <div
                style={{
                  color: theme.colors.goldSoft,
                  fontSize: "11px",
                  letterSpacing: "2.4px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  marginBottom: "6px",
                }}
              >
                What’s included
              </div>
              <div
                style={{
                  fontSize: isMobile ? "18px" : "22px",
                  fontWeight: 800,
                  letterSpacing: "-0.4px",
                  textShadow: "0 4px 20px rgba(0,0,0,0.5)",
                  maxWidth: "620px",
                  lineHeight: 1.22,
                }}
              >
                {service.featuredNote || service.subtitle}
              </div>
            </div>
          </div>
        </Reveal>

        {subServices.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            style={{
              marginTop: isMobile ? "54px" : "80px",
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fit, minmax(280px, 1fr))",
              gap: isMobile ? "14px" : "20px",
            }}
          >
            {subServices.map((sub, idx) => (
              <motion.div
                key={sub.id || idx}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="mw-card-hover mw-shine"
                style={{
                  position: "relative",
                  borderRadius: isMobile ? "22px" : "26px",
                  padding: isMobile ? "22px 20px" : "28px 26px",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                  border: `1px solid ${theme.colors.line}`,
                  boxShadow: theme.shadow.soft,
                }}
              >
                <div
                  style={{
                    color: theme.colors.goldSoft,
                    fontSize: "12px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    marginBottom: "10px",
                  }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <h3
                  style={{
                    margin: "0 0 10px",
                    color: theme.colors.text,
                    fontSize: isMobile ? "20px" : "24px",
                    lineHeight: 1.2,
                    fontWeight: 800,
                    letterSpacing: "-0.4px",
                    wordBreak: "break-word",
                  }}
                >
                  {sub.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    color: theme.colors.textSoft,
                    fontSize: "14.5px",
                    lineHeight: 1.85,
                  }}
                >
                  {sub.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {service.featuredNote && (
          <Reveal delay={0.1}>
            <div
              style={{
                marginTop: isMobile ? "40px" : "60px",
                padding: isMobile ? "22px 20px" : "28px 30px",
                borderRadius: isMobile ? "22px" : "26px",
                border: `1px solid ${theme.colors.lineStrong}`,
                background:
                  "linear-gradient(135deg, rgba(214,176,96,0.10) 0%, rgba(214,176,96,0.03) 100%)",
                color: theme.colors.text,
                fontSize: isMobile ? "15px" : "17px",
                lineHeight: 1.9,
                maxWidth: "860px",
              }}
            >
              {service.featuredNote}
            </div>
          </Reveal>
        )}

        <Reveal delay={0.1}>
          <div
            style={{
              marginTop: isMobile ? "44px" : "72px",
              paddingTop: isMobile ? "26px" : "40px",
              borderTop: `1px solid ${theme.colors.line}`,
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1.2fr 0.8fr",
              gap: "22px",
              alignItems: "center",
            }}
          >
            <h2
              style={{
                margin: 0,
                color: theme.colors.text,
                fontSize: isMobile
                  ? "clamp(24px, 6vw, 34px)"
                  : "clamp(34px, 3.5vw, 52px)",
                fontWeight: 800,
                letterSpacing: "-0.8px",
                lineHeight: 1.08,
                maxWidth: "700px",
                wordBreak: "break-word",
              }}
            >
              Ready to make your brand look sharper?
            </h2>
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                justifySelf: isMobile ? "start" : "end",
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
              <Link to="/" style={{ textDecoration: "none" }}>
                <MagneticButton secondary>Back to Home</MagneticButton>
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
