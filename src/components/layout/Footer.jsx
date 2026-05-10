import { motion } from "framer-motion";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import MagneticButton from "../common/MagneticButton";
import NewsletterSignup from "../common/NewsletterSignup";
import { openContactModal } from "../../utils/contactActions";
import useIsMobile from "../../utils/useIsMobile";
import { useSiteSettings } from "../../admin/hooks";
import { siteConfig as defaultSiteConfig } from "../../data/siteConfig";
import defaultLogo from "../../assets/mineworld-logo.png";
import { useSiteAsset, useSiteContent } from "../../hooks/useSiteContent";

function Footer() {
  const isMobile = useIsMobile(768);
  const settings = useSiteSettings(defaultSiteConfig);
  const cmsFooterLogo = useSiteAsset("footer.logo", null);
  const cmsFooterLogoUrl =
    typeof cmsFooterLogo === "object" && cmsFooterLogo?.url
      ? cmsFooterLogo.url
      : null;
  const cmsFooterLogoSize = useSiteContent("footer.logo_size", null);
  const cmsFooterLogoAlt = useSiteContent("footer.logo_alt", null);
  const logoSrc = cmsFooterLogoUrl || settings.logo?.src || defaultLogo;
  const parsedFooterSize = Number(cmsFooterLogoSize);
  const footerLogoWidth =
    Number.isFinite(parsedFooterSize) && parsedFooterSize > 0
      ? parsedFooterSize
      : null;
  const logoScale = Number(settings.logo?.scale) || 1.45;

  // CMS overlay — admin-set values take precedence over legacy settings.
  const cmsEmail = useSiteContent("footer.email", null);
  const cmsPhone = useSiteContent("footer.phone", null);
  const cmsAddress = useSiteContent("footer.address", null);
  const ctaEyebrow = useSiteContent("footer.cta_eyebrow", "Start with Mineworld");
  const ctaHeadline = useSiteContent(
    "footer.cta_headline",
    "If your brand still looks ordinary, that's the problem."
  );
  const brandDescription = useSiteContent(
    "footer.brand_description",
    "Mineworld Production is Delhi's premium full-stack creative and growth studio — websites, mobile apps, video editing, Meta ads, social media management, podcast production, and graphic design for brands, creators, clinics, and businesses."
  );
  const signatureText = useSiteContent(
    "footer.signature_text",
    "Mineworld Production"
  );
  const copyrightLine = useSiteContent(
    "footer.copyright",
    "©️ 2026 Mineworld Production. All rights reserved."
  );

  const phoneDigits = (
    cmsPhone || settings.contact?.whatsappNumber || "919758850933"
  ).replace(/\D/g, "");
  const phoneDisplay = phoneDigits.length > 10
    ? `+${phoneDigits.slice(0, phoneDigits.length - 10)} ${phoneDigits.slice(-10)}`
    : `+${phoneDigits}`;
  const email =
    cmsEmail || settings.contact?.email || "mineworldproduction4455@gmail.com";
  const address =
    cmsAddress ||
    settings.contact?.address ||
    "Mayur Vihar Phase 1, Delhi, 110091";
  const instagramHref = settings.social?.instagram || "https://instagram.com/";
  const whatsappHref = `https://wa.me/${phoneDigits}`;
  const telHref = `tel:+${phoneDigits}`;

  const navItems = [
    { label: "Home", target: "home" },
    { label: "Services", target: "services" },
    { label: "Portfolio", target: "portfolio" },
    { label: "Contact", target: "footer" },
  ];

  const services = [
    "Website Development in Delhi",
    "iOS & Android App Development",
    "Meta Ads & Digital Growth",
    "Social Media Management in Delhi",
    "Video Editing Services",
    "Podcast & Content Shoots",
    "Graphic Design Support",
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const iconWrap = {
    width: "18px",
    height: "18px",
    flexShrink: 0,
    color: "var(--accent-gold)",
    marginTop: "2px",
  };

  const linkStyle = {
    color: "var(--bg-cream-soft)",
    textDecoration: "none",
    lineHeight: 1.9,
    fontSize: "15px",
  };

  return (
    <footer
      id="footer"
      style={{
        position: "relative",
        background: `
          radial-gradient(circle at 14% 18%, rgba(184, 149, 106, 0.08), transparent 32%),
          radial-gradient(circle at 86% 78%, rgba(184, 149, 106, 0.05), transparent 36%),
          var(--accent-navy)
        `,
        borderTop: "1px solid rgba(184, 149, 106, 0.20)",
        overflow: "hidden",
      }}
    >
      <Container
        style={{
          paddingTop: isMobile ? "74px" : "96px",
          paddingBottom: isMobile ? "28px" : "34px",
        }}
      >
        <Reveal>
          <div
            style={{
              border: "1px solid rgba(184, 149, 106, 0.20)",
              borderRadius: isMobile ? "24px" : "30px",
              padding: isMobile ? "28px 20px" : "36px 34px",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.02))",
              boxShadow: "0 14px 32px rgba(0,0,0,0.20)",
              marginBottom: isMobile ? "42px" : "54px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                color: "var(--accent-gold)",
                fontSize: isMobile ? "11px" : "12px",
                letterSpacing: "2.4px",
                textTransform: "uppercase",
                marginBottom: "14px",
                fontWeight: 700,
              }}
            >
              {ctaEyebrow}
            </div>
            <h2
              style={{
                margin: 0,
                color: "var(--bg-cream-soft)",
                fontSize: isMobile ? "38px" : "clamp(40px, 5vw, 72px)",
                lineHeight: isMobile ? 1.02 : 0.98,
                fontWeight: 800,
                letterSpacing: "-1.8px",
                fontFamily:
                  '"Playfair Display", Georgia, "Times New Roman", serif',
              }}
            >
              {ctaHeadline}
            </h2>
            <p
              style={{
                margin: "20px auto 0",
                maxWidth: "860px",
                color: "rgba(245, 239, 230, 0.7)",
                fontSize: isMobile ? "15px" : "17px",
                lineHeight: 1.9,
              }}
            >
              Mineworld is built for brands, creators, clinics, and businesses
              that want stronger content, sharper editing, better digital
              presence, and more premium brand perception across platforms.
            </p>
            <div
              style={{
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
                justifyContent: "center",
                marginTop: "26px",
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
                <MagneticButton onDark>Start a Project</MagneticButton>
              </button>
              <a href={telHref} style={{ textDecoration: "none" }}>
                <MagneticButton secondary onDark>Book a Strategy Call</MagneticButton>
              </a>
            </div>
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.05fr 0.7fr 0.8fr 1fr",
            gap: isMobile ? "34px" : "40px",
            alignItems: "start",
            paddingBottom: isMobile ? "28px" : "34px",
            borderBottom: "1px solid rgba(184, 149, 106, 0.20)",
          }}
        >
          <Reveal delay={0.08}>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  marginBottom: "18px",
                }}
              >
                <div
                  style={{
                    width: isMobile ? "52px" : "58px",
                    height: isMobile ? "52px" : "58px",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.98), rgba(235,235,235,0.93))",
                    display: "grid",
                    placeItems: "center",
                    overflow: "hidden",
                    boxShadow:
                      "0 0 0 1px rgba(255,255,255,0.08), 0 10px 28px rgba(255,255,255,0.08)",
                  }}
                >
                  <img
                    src={logoSrc}
                    alt={cmsFooterLogoAlt || "Mineworld Production logo"}
                    style={{
                      width: footerLogoWidth
                        ? `${footerLogoWidth}px`
                        : isMobile
                        ? "36px"
                        : "44px",
                      height: "auto",
                      objectFit: "contain",
                      transform: `scale(${logoScale})`,
                    }}
                  />
                </div>
                <div>
                  <div
                    style={{
                      color: "var(--bg-cream-soft)",
                      fontSize: isMobile ? "21px" : "27px",
                      fontWeight: 650,
                      lineHeight: 1,
                    }}
                  >
                    Mineworld
                  </div>
                  <div
                    style={{
                      color: "var(--accent-gold)",
                      fontSize: isMobile ? "10px" : "12px",
                      fontWeight: 700,
                      letterSpacing: "2.4px",
                      textTransform: "uppercase",
                      marginTop: "6px",
                    }}
                  >
                    Production
                  </div>
                </div>
              </div>
              <p
                style={{
                  margin: 0,
                  maxWidth: "390px",
                  color: "rgba(245, 239, 230, 0.7)",
                  fontSize: "15px",
                  lineHeight: 1.95,
                }}
              >
                {brandDescription}
              </p>
              <div
                style={{
                  marginTop: "22px",
                  display: "inline-flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <div
                  style={{
                    color: "rgba(188,153,102,0.96)",
                    fontSize: isMobile ? "28px" : "34px",
                    lineHeight: 1,
                    fontStyle: "italic",
                    fontWeight: 500,
                    fontFamily:
                      '"Brush Script MT", "Lucida Handwriting", "Segoe Script", cursive',
                  }}
                >
                  {signatureText}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div>
              <div style={{ color: "var(--accent-gold)", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "18px", fontWeight: 700 }}>Navigation</div>
              <div style={{ display: "grid", gap: "8px" }}>
                {navItems.map((item) => (
                  <button
                    key={item.target}
                    onClick={() => scrollToSection(item.target)}
                    style={{ background: "transparent", border: "none", padding: 0, textAlign: "left", cursor: "pointer", color: "var(--bg-cream-soft)", fontSize: "15px", lineHeight: 1.85 }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div>
              <div style={{ color: "var(--accent-gold)", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "18px", fontWeight: 700 }}>Services</div>
              <div style={{ display: "grid", gap: "8px" }}>
                {services.map((item) => (
                  <div key={item} style={{ color: "var(--bg-cream-soft)", fontSize: "15px", lineHeight: 1.85 }}>{item}</div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div>
              <div style={{ color: "var(--accent-gold)", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "18px", fontWeight: 700 }}>Work With Us</div>
              <div style={{ display: "grid", gap: "14px" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <div style={iconWrap}>✉</div>
                  <a href={`mailto:${email}`} style={linkStyle}>{email}</a>
                </div>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <div style={iconWrap}>☎</div>
                  <a href={telHref} style={linkStyle}>{phoneDisplay}</a>
                </div>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <div style={iconWrap}>📍</div>
                  <a href="https://maps.google.com/?q=Mayur+Vihar+Phase+1+Delhi+110091" target="_blank" rel="noreferrer" style={linkStyle}>{address}</a>
                </div>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <div style={iconWrap}>◎</div>
                  <a href={instagramHref} target="_blank" rel="noreferrer" style={linkStyle}>Instagram</a>
                </div>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <div style={iconWrap}>💬</div>
                  <a href={whatsappHref} target="_blank" rel="noreferrer" style={linkStyle}>WhatsApp</a>
                </div>
              </div>
              <div style={{ marginTop: "22px" }}>
                <button onClick={openContactModal} style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}>
                  <MagneticButton secondary onDark>Start a Project</MagneticButton>
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        <div style={{ paddingTop: isMobile ? "24px" : "32px", paddingBottom: isMobile ? "20px" : "28px", borderTop: "1px solid rgba(184, 149, 106, 0.20)", marginBottom: isMobile ? "16px" : "20px" }}>
          <NewsletterSignup variant="footer" />
        </div>

        <div style={{ paddingTop: isMobile ? "20px" : "24px", marginTop: isMobile ? "20px" : "20px", borderTop: "1px dashed rgba(184, 149, 106, 0.25)", display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? "10px" : "18px" }}>
          <div style={{ color: "rgba(245, 239, 230, 0.5)", fontSize: "13px", lineHeight: 1.7 }}>{copyrightLine}</div>
          <div style={{ color: "var(--bg-cream-soft)", fontSize: "13px", lineHeight: 1.7, textAlign: isMobile ? "left" : "right", maxWidth: isMobile ? "100%" : "620px" }}>
            Mineworld Production is a premium creative and growth studio in Delhi offering website development, iOS & Android app development, video editing, Meta ads, social media management, podcast production, and graphic design for brands, creators, clinics, and businesses.
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
