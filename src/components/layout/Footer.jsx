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
import { useSiteToggle } from "../../hooks/useSiteToggle";

function Footer() {
  const isMobile = useIsMobile(768);
  const settings = useSiteSettings(defaultSiteConfig);
  // Per-element visibility toggles. Default = on. Admin can flip any
  // of these off from /admin/cms/footer → "What to show / hide".
  const showAddress = useSiteToggle("footer.show_address", true);
  const showEmail = useSiteToggle("footer.show_email", true);
  const showPhone = useSiteToggle("footer.show_phone", true);
  const showInstagram = useSiteToggle("footer.show_instagram", true);
  const showWhatsApp = useSiteToggle("footer.show_whatsapp", true);
  const showNavColumn = useSiteToggle("footer.show_nav_column", true);
  const showServicesColumn = useSiteToggle("footer.show_services_column", true);
  const showSocialColumn = useSiteToggle("footer.show_social_column", true);
  const showCopyright = useSiteToggle("footer.show_copyright", true);
  const showCtaCard = useSiteToggle("footer.show_cta_card", true);
  const showNewsletter = useSiteToggle("footer.show_newsletter", true);
  const showSignature = useSiteToggle("footer.show_signature", true);
  const showBrandDescription = useSiteToggle("footer.show_brand_description", true);
  const showWebsiteLink = useSiteToggle("footer.show_website", true);
  // Optional explicit URLs (were hardcoded fallbacks before — now CMS-driven).
  const cmsInstagramUrl = useSiteContent("footer.instagram_url", null);
  const cmsMapsUrl = useSiteContent("footer.maps_url", null);
  const cmsWebsiteUrl = useSiteContent("footer.website_url", null);
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
  const instagramHref =
    cmsInstagramUrl || settings.social?.instagram || "https://instagram.com/";
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
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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
      <div
        style={{
          position: "absolute",
          right: "-8%",
          top: "6%",
          width: isMobile ? "180px" : "300px",
          height: isMobile ? "180px" : "300px",
          borderRadius: "50%",
          background: "rgba(188,153,102,0.07)",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />

      <Container
        style={{
          paddingTop: isMobile ? "74px" : "96px",
          paddingBottom: isMobile ? "28px" : "34px",
        }}
      >
        {showCtaCard && (
        <Reveal>
          <div
            style={{
              border: `1px solid ${"rgba(184, 149, 106, 0.20)"}`,
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

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                justifyContent: "center",
                marginTop: "22px",
              }}
            >
              {[
                "Editing-First Execution",
                "Premium Brand Presence",
                "Studio + Digital Integration",
              ].map((item) => (
                <div
                  key={item}
                  className="cta-feature-pill"
                  style={{
                    padding: "10px 20px",
                    borderRadius: "999px",
                    border: "1px solid rgba(184, 149, 106, 0.3)",
                    background: "rgba(255, 255, 255, 0.08)",
                    color: "var(--bg-cream-soft)",
                    fontSize: isMobile ? "13px" : "14px",
                    fontWeight: 500,
                    lineHeight: 1.3,
                    transition: "all 0.3s ease",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.05fr 0.7fr 0.8fr 1fr",
            gap: isMobile ? "34px" : "40px",
            alignItems: "start",
            paddingBottom: isMobile ? "28px" : "34px",
            borderBottom: `1px solid ${"rgba(184, 149, 106, 0.20)"}`,
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

              {showBrandDescription && (
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
              )}

              {showSignature && (
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

                  <div
                    style={{
                      width: isMobile ? "180px" : "220px",
                      height: "1px",
                      background:
                        "linear-gradient(90deg, rgba(188,153,102,0.72), rgba(188,153,102,0.12), transparent)",
                    }}
                  />
                </div>
              )}
            </div>
          </Reveal>

          {showNavColumn && (
          <Reveal delay={0.12}>
            <div>
              <div
                style={{
                  color: "var(--accent-gold)",
                  fontSize: "12px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: "18px",
                  fontWeight: 700,
                }}
              >
                Navigation
              </div>

              <div style={{ display: "grid", gap: "8px" }}>
                {navItems.map((item) => (
                  <button
                    key={item.target}
                    onClick={() => scrollToSection(item.target)}
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: 0,
                      textAlign: "left",
                      cursor: "pointer",
                      color: "var(--bg-cream-soft)",
                      fontSize: "15px",
                      lineHeight: 1.85,
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
          )}

          {showServicesColumn && (
          <Reveal delay={0.16}>
            <div>
              <div
                style={{
                  color: "var(--accent-gold)",
                  fontSize: "12px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: "18px",
                  fontWeight: 700,
                }}
              >
                Services
              </div>

              <div style={{ display: "grid", gap: "8px" }}>
                {services.map((item) => (
                  <div
                    key={item}
                    style={{
                      color: "var(--bg-cream-soft)",
                      fontSize: "15px",
                      lineHeight: 1.85,
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          )}

          {showSocialColumn && (
          <Reveal delay={0.2}>
            <div>
              <div
                style={{
                  color: "var(--accent-gold)",
                  fontSize: "12px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: "18px",
                  fontWeight: 700,
                }}
              >
                Work With Us
              </div>

              <div style={{ display: "grid", gap: "14px" }}>
                {showAddress && (
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <div style={iconWrap}>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
                      </svg>
                    </div>
                    <a
                      href={cmsMapsUrl || "https://maps.google.com/?q=Mayur+Vihar+Phase+1+Delhi+110091"}
                      target="_blank"
                      rel="noreferrer"
                      style={linkStyle}
                    >
                      {address}
                    </a>
                  </div>
                )}

                {showEmail && (
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <div style={iconWrap}>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 3.2-8 5-8-5V6l8 5 8-5v1.2z" />
                      </svg>
                    </div>
                    <a href={`mailto:${email}`} style={linkStyle}>{email}</a>
                  </div>
                )}

                {showPhone && (
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <div style={iconWrap}>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1-.24c1.12.37 2.33.57 3.59.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.85 21 3 13.15 3 3a1 1 0 0 1 1-1h3.49a1 1 0 0 1 1 1c0 1.26.2 2.47.57 3.59a1 1 0 0 1-.24 1l-2.2 2.2z" />
                      </svg>
                    </div>
                    <a href={telHref} style={linkStyle}>{phoneDisplay}</a>
                  </div>
                )}

                {showInstagram && (
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <div style={iconWrap}>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm8.37 1.72H7.88A4.16 4.16 0 0 0 3.72 7.88v8.24a4.16 4.16 0 0 0 4.16 4.16h8.24a4.16 4.16 0 0 0 4.16-4.16V7.88a4.16 4.16 0 0 0-4.16-4.16zM17.5 6.3a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.7A3.3 3.3 0 1 0 12 15.3 3.3 3.3 0 0 0 12 8.7z" />
                      </svg>
                    </div>
                    <a href={instagramHref} target="_blank" rel="noreferrer" style={linkStyle}>Instagram</a>
                  </div>
                )}

                {showWebsiteLink && (
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <div style={iconWrap}>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14 3v2h3.59L7 15.59 8.41 17 19 6.41V10h2V3z" />
                        <path d="M5 5h6V3H3v8h2z" />
                        <path d="M19 19H5V9H3v12h18V7h-2z" />
                      </svg>
                    </div>
                    <a
                      href={cmsWebsiteUrl || "https://www.mineworldproduction.com"}
                      target="_blank"
                      rel="noreferrer"
                      style={linkStyle}
                    >
                      {(cmsWebsiteUrl || "www.mineworldproduction.com")
                        .replace(/^https?:\/\//, "")
                        .replace(/\/$/, "")}
                    </a>
                  </div>
                )}

                {showWhatsApp && (
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <div style={iconWrap}>
                      <svg viewBox="0 0 32 32" fill="currentColor">
                        <path d="M19.11 17.34c-.27-.13-1.58-.78-1.82-.87-.24-.09-.42-.13-.6.13-.18.27-.69.87-.85 1.05-.16.18-.31.2-.58.07-.27-.13-1.12-.41-2.13-1.3-.79-.7-1.32-1.56-1.48-1.82-.16-.27-.02-.41.12-.54.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.33-.02-.47-.07-.13-.6-1.45-.82-1.98-.22-.53-.44-.46-.6-.47h-.51c-.18 0-.47.07-.71.33-.24.27-.93.91-.93 2.22s.96 2.58 1.09 2.76c.13.18 1.88 2.87 4.56 4.03.64.27 1.14.43 1.53.55.64.2 1.22.17 1.68.1.51-.08 1.58-.64 1.8-1.25.22-.62.22-1.14.16-1.25-.07-.11-.24-.18-.51-.31z" />
                        <path d="M16.01 3.2c-7.07 0-12.8 5.72-12.8 12.78 0 2.26.59 4.46 1.71 6.39L3 29l6.84-1.79a12.8 12.8 0 0 0 6.17 1.57h.01c7.06 0 12.79-5.73 12.79-12.79 0-3.43-1.34-6.65-3.77-9.07A12.7 12.7 0 0 0 16.01 3.2zm0 23.42h-.01a10.65 10.65 0 0 1-5.43-1.49l-.39-.23-4.06 1.06 1.08-3.96-.25-.41a10.6 10.6 0 0 1-1.63-5.61c0-5.88 4.79-10.67 10.69-10.67 2.85 0 5.52 1.11 7.54 3.12a10.58 10.58 0 0 1 3.13 7.54c0 5.89-4.79 10.68-10.67 10.68z" />
                      </svg>
                    </div>
                    <a href={whatsappHref} target="_blank" rel="noreferrer" style={linkStyle}>WhatsApp</a>
                  </div>
                )}
              </div>

              <div style={{ marginTop: "22px" }}>
                <button
                  onClick={openContactModal}
                  style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}
                >
                  <MagneticButton secondary onDark>Start a Project</MagneticButton>
                </button>
              </div>
            </div>
          </Reveal>
          )}
        </div>

        {showNewsletter && (
          <div
            style={{
              paddingTop: isMobile ? "24px" : "32px",
              paddingBottom: isMobile ? "20px" : "28px",
              borderTop: "1px solid rgba(184, 149, 106, 0.20)",
              marginBottom: isMobile ? "16px" : "20px",
            }}
          >
            <NewsletterSignup variant="footer" />
          </div>
        )}

        <div
          style={{
            paddingTop: isMobile ? "20px" : "24px",
            marginTop: isMobile ? "20px" : "20px",
            borderTop: "1px dashed rgba(184, 149, 106, 0.25)",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            gap: isMobile ? "10px" : "18px",
          }}
        >
          {showCopyright && (
            <div
              style={{
                color: "rgba(245, 239, 230, 0.5)",
                fontSize: "13px",
                lineHeight: 1.7,
              }}
            >
              {copyrightLine}
            </div>
          )}

          <div
            style={{
              color: "var(--bg-cream-soft)",
              fontSize: "13px",
              lineHeight: 1.7,
              textAlign: isMobile ? "left" : "right",
              maxWidth: isMobile ? "100%" : "620px",
            }}
          >
            Mineworld Production is a premium creative and growth studio in
            Delhi offering website development, iOS & Android app development,
            video editing, Meta ads, social media management, podcast
            production, and graphic design for brands, creators, clinics, and
            businesses.
          </div>
        </div>
      </Container>
      <style>{`
        #footer a {
          transition: color 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
        }
        #footer a:hover {
          color: var(--accent-gold) !important;
          opacity: 1;
        }
        #footer .cta-feature-pill:hover {
          background: rgba(184, 149, 106, 0.15);
          border-color: var(--accent-gold);
          color: #FFFFFF;
        }
      `}</style>
    </footer>
  );
}

export default Footer;
