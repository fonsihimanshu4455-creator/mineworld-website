import { useEffect } from "react";
import { Link } from "react-router-dom";
import FounderSection from "../components/home/FounderSection";
import TeamSection from "../components/home/TeamSection";
import BrandStatement from "../components/home/BrandStatement";
import GrowthSection from "../components/home/GrowthSection";
import EditingShowcase from "../components/home/EditingShowcase";
import Container from "../components/common/Container";
import MagneticButton from "../components/common/MagneticButton";
import Reveal from "../components/common/Reveal";
import SectionTag from "../components/common/SectionTag";
import { theme } from "../styles/theme";
import { useIsMobile } from "../hooks/useIsMobile";
import { openContactModal } from "../utils/contactActions";

export default function AboutPage() {
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <>
      <section
        style={{
          position: "relative",
          padding: isMobile ? "120px 0 40px" : "160px 0 60px",
          background: `
            radial-gradient(circle at 18% 22%, rgba(214,176,96,0.12), transparent 32%),
            radial-gradient(circle at 82% 78%, rgba(87,120,210,0.1), transparent 32%),
            linear-gradient(180deg, ${theme.colors.bg} 0%, #131a2c 55%, ${theme.colors.bg} 100%)
          `,
          borderBottom: `1px solid ${theme.colors.line}`,
          overflow: "hidden",
        }}
      >
        <Container>
          <Reveal>
            <SectionTag>About Mineworld</SectionTag>
          </Reveal>

          <Reveal delay={0.08}>
            <h1
              style={{
                margin: "14px 0 0",
                fontSize: isMobile
                  ? "clamp(34px, 10vw, 48px)"
                  : "clamp(52px, 6vw, 86px)",
                lineHeight: isMobile ? 1.02 : 0.96,
                letterSpacing: isMobile ? "-1.4px" : "-2.6px",
                fontWeight: 800,
                color: theme.colors.text,
                maxWidth: "920px",
                wordBreak: "break-word",
                fontFamily:
                  '"Playfair Display", Georgia, "Times New Roman", serif',
              }}
            >
              One team.{" "}
              <span style={{ color: theme.colors.gold }}>Real results.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <p
              style={{
                margin: "22px 0 0",
                maxWidth: "760px",
                color: theme.colors.textSoft,
                fontSize: isMobile ? "16px" : "18px",
                lineHeight: 1.9,
              }}
            >
              We’re a small, sharp team in Delhi. We run ads, edit videos and shoot
              content — all under one roof. No middlemen, no fluff.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div
              style={{
                marginTop: "32px",
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
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
          </Reveal>
        </Container>
      </section>

      <FounderSection />
      <BrandStatement />
      <TeamSection />
      <GrowthSection />
      <EditingShowcase />
    </>
  );
}
