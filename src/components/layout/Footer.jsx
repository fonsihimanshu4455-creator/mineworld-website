import Container from "../common/Container";
import Reveal from "../common/Reveal";
import MagneticButton from "../common/MagneticButton";
import { theme } from "../../styles/theme";
import { openContactModal } from "../../utils/contactActions";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useSiteContent } from "../../context/SiteContent";
import logoImg from "../../assets/mineworld-logo.png";

function Footer() {
  const isMobile = useIsMobile();
  const { content } = useSiteContent();
  const c = content.contact;
  const f = content.footer;
  const phoneTel = "tel:" + c.phonePrimary.replace(/\s+/g, "");
  const waLink = "https://wa.me/" + c.whatsappNumber.replace(/\D/g, "");

  const navItems = [
    { label: "Home", target: "home" },
    { label: "Services", target: "services" },
    { label: "Portfolio", target: "portfolio" },
    { label: "Contact", target: "footer" },
  ];

  const services = (f.services || [])
    .filter((s) => (typeof s === "object" ? s.visible !== false : true))
    .map((s) => (typeof s === "object" ? s.label : s));

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
    color: theme.colors.goldSoft,
    marginTop: "2px",
  };

  const linkStyle = {
    color: theme.colors.text,
    textDecoration: "none",
    lineHeight: 1.9,
    fontSize: "15px",
    transition: "color 0.25s ease",
  };

  return (
    <footer
      id="footer"
      style={{
        position: "relative",
        background: `
          radial-gradient(circle at 14% 18%, rgba(214,176,96,0.08), transparent 22%),
          linear-gradient(180deg, rgba(15,21,35,1) 0%, rgba(11,16,28,1) 100%)
        `,
        borderTop: `1px solid ${theme.colors.line}`,
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
          background: "rgba(214,176,96,0.07)",
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
        <Reveal>
          <div
            style={{
              border: `1px solid ${theme.colors.line}`,
              borderRadius: isMobile ? "24px" : "30px",
              padding: isMobile ? "28px 20px" : "36px 34px",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.02))",
              boxShadow: theme.shadow.soft,
              marginBottom: isMobile ? "42px" : "54px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                color: theme.colors.goldSoft,
                fontSize: isMobile ? "11px" : "12px",
                letterSpacing: "2.4px",
                textTransform: "uppercase",
                marginBottom: "14px",
                fontWeight: 700,
              }}
            >
              Start with Mineworld
            </div>

            <h2
              style={{
                margin: 0,
                color: theme.colors.text,
                fontSize: isMobile
                  ? "clamp(28px, 8vw, 38px)"
                  : "clamp(40px, 5vw, 72px)",
                lineHeight: isMobile ? 1.06 : 0.98,
                fontWeight: 800,
                letterSpacing: isMobile ? "-1px" : "-1.8px",
                fontFamily:
                  '"Playfair Display", Georgia, "Times New Roman", serif',
                wordBreak: "break-word",
              }}
            >
              {content.cta.headlineLineOne}
              <br />
              {content.cta.headlineLineTwo}
            </h2>

            <p
              style={{
                margin: "20px auto 0",
                maxWidth: "860px",
                color: theme.colors.textSoft,
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
                <MagneticButton>Start a Project</MagneticButton>
              </button>

              <a href={phoneTel} style={{ textDecoration: "none" }}>
                <MagneticButton secondary>Book a Strategy Call</MagneticButton>
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
                  style={{
                    padding: "10px 14px",
                    borderRadius: "999px",
                    border: `1px solid ${theme.colors.line}`,
                    background: "rgba(58,78,115,0.48)",
                    color: theme.colors.text,
                    fontSize: isMobile ? "12px" : "13px",
                    lineHeight: 1.3,
                  }}
                >
                  {item}
                </div>
              ))}
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
            borderBottom: `1px solid ${theme.colors.line}`,
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
                    src={logoImg}
                    alt="Mineworld Production logo"
                    style={{
                      width: isMobile ? "36px" : "44px",
                      height: "auto",
                      objectFit: "contain",
                      transform: "scale(1.45)",
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>

                <div>
                  <div
                    style={{
                      color: theme.colors.text,
                      fontSize: isMobile ? "21px" : "27px",
                      fontWeight: 650,
                      lineHeight: 1,
                    }}
                  >
                    Mineworld
                  </div>
                  <div
                    style={{
                      color: theme.colors.goldSoft,
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
                  color: theme.colors.textSoft,
                  fontSize: "15px",
                  lineHeight: 1.95,
                }}
              >
                {f.description}
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
                    color: "rgba(214,176,96,0.96)",
                    fontSize: isMobile ? "28px" : "34px",
                    lineHeight: 1,
                    fontStyle: "italic",
                    fontWeight: 500,
                    fontFamily:
                      '"Brush Script MT", "Lucida Handwriting", "Segoe Script", cursive',
                  }}
                >
                  Mineworld Production
                </div>

                <div
                  style={{
                    width: isMobile ? "180px" : "220px",
                    height: "1px",
                    background:
                      "linear-gradient(90deg, rgba(214,176,96,0.72), rgba(214,176,96,0.12), transparent)",
                  }}
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div>
              <div
                style={{
                  color: theme.colors.goldSoft,
                  fontSize: "12px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: "18px",
                  fontWeight: 700,
                }}
              >
                Navigation
              </div>

              <div
                style={{
                  display: "grid",
                  gap: "8px",
                }}
              >
                {navItems.map((item) => (
                  <button
                    key={item.target}
                    onClick={() => scrollToSection(item.target)}
                    className="mw-link"
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: 0,
                      textAlign: "left",
                      cursor: "pointer",
                      color: theme.colors.text,
                      fontSize: "15px",
                      lineHeight: 1.85,
                      width: "fit-content",
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div>
              <div
                style={{
                  color: theme.colors.goldSoft,
                  fontSize: "12px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: "18px",
                  fontWeight: 700,
                }}
              >
                Services
              </div>

              <div
                style={{
                  display: "grid",
                  gap: "8px",
                }}
              >
                {services.map((item) => (
                  <div
                    key={item}
                    style={{
                      color: theme.colors.text,
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

          <Reveal delay={0.2}>
            <div>
              <div
                style={{
                  color: theme.colors.goldSoft,
                  fontSize: "12px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: "18px",
                  fontWeight: 700,
                }}
              >
                Work With Us
              </div>

              <div
                style={{
                  display: "grid",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={iconWrap}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
                    </svg>
                  </div>
                  <a
                    href={c.addressMapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mw-link"
                    style={linkStyle}
                  >
                    {c.address}
                  </a>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={iconWrap}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 3.2-8 5-8-5V6l8 5 8-5v1.2z" />
                    </svg>
                  </div>
                  <a
                    href={"mailto:" + c.email}
                    className="mw-link"
                    style={linkStyle}
                  >
                    {c.email}
                  </a>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={iconWrap}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1-.24c1.12.37 2.33.57 3.59.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.85 21 3 13.15 3 3a1 1 0 0 1 1-1h3.49a1 1 0 0 1 1 1c0 1.26.2 2.47.57 3.59a1 1 0 0 1-.24 1l-2.2 2.2z" />
                    </svg>
                  </div>
                  <div style={linkStyle}>
                    <a
                      href={phoneTel}
                      className="mw-link"
                      style={{ ...linkStyle, display: "inline" }}
                    >
                      {c.phonePrimary}
                    </a>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={iconWrap}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm8.37 1.72H7.88A4.16 4.16 0 0 0 3.72 7.88v8.24a4.16 4.16 0 0 0 4.16 4.16h8.24a4.16 4.16 0 0 0 4.16-4.16V7.88a4.16 4.16 0 0 0-4.16-4.16zM17.5 6.3a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.7A3.3 3.3 0 1 0 12 15.3 3.3 3.3 0 0 0 12 8.7z" />
                    </svg>
                  </div>
                  <a
                    href={content.social.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="mw-link"
                    style={linkStyle}
                  >
                    Instagram
                  </a>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={iconWrap}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14 3v2h3.59L7 15.59 8.41 17 19 6.41V10h2V3z" />
                      <path d="M5 5h6V3H3v8h2z" />
                      <path d="M19 19H5V9H3v12h18V7h-2z" />
                    </svg>
                  </div>
                  <a
                    href={content.social.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mw-link"
                    style={linkStyle}
                  >
                    {content.social.websiteUrl.replace(/^https?:\/\//, "")}
                  </a>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={iconWrap}>
                    <svg viewBox="0 0 32 32" fill="currentColor">
                      <path d="M19.11 17.34c-.27-.13-1.58-.78-1.82-.87-.24-.09-.42-.13-.6.13-.18.27-.69.87-.85 1.05-.16.18-.31.2-.58.07-.27-.13-1.12-.41-2.13-1.3-.79-.7-1.32-1.56-1.48-1.82-.16-.27-.02-.41.12-.54.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.33-.02-.47-.07-.13-.6-1.45-.82-1.98-.22-.53-.44-.46-.6-.47h-.51c-.18 0-.47.07-.71.33-.24.27-.93.91-.93 2.22s.96 2.58 1.09 2.76c.13.18 1.88 2.87 4.56 4.03.64.27 1.14.43 1.53.55.64.2 1.22.17 1.68.1.51-.08 1.58-.64 1.8-1.25.22-.62.22-1.14.16-1.25-.07-.11-.24-.18-.51-.31z" />
                      <path d="M16.01 3.2c-7.07 0-12.8 5.72-12.8 12.78 0 2.26.59 4.46 1.71 6.39L3 29l6.84-1.79a12.8 12.8 0 0 0 6.17 1.57h.01c7.06 0 12.79-5.73 12.79-12.79 0-3.43-1.34-6.65-3.77-9.07A12.7 12.7 0 0 0 16.01 3.2zm0 23.42h-.01a10.65 10.65 0 0 1-5.43-1.49l-.39-.23-4.06 1.06 1.08-3.96-.25-.41a10.6 10.6 0 0 1-1.63-5.61c0-5.88 4.79-10.67 10.69-10.67 2.85 0 5.52 1.11 7.54 3.12a10.58 10.58 0 0 1 3.13 7.54c0 5.89-4.79 10.68-10.67 10.68z" />
                    </svg>
                  </div>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mw-link"
                    style={linkStyle}
                  >
                    WhatsApp
                  </a>
                </div>
              </div>

              <div style={{ marginTop: "22px" }}>
                <button
                  onClick={openContactModal}
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  <MagneticButton secondary>Start a Project</MagneticButton>
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        <div
          style={{
            paddingTop: isMobile ? "20px" : "24px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            gap: isMobile ? "10px" : "18px",
          }}
        >
          <div
            style={{
              color: theme.colors.textSoft,
              fontSize: "13px",
              lineHeight: 1.7,
            }}
          >
            {f.legal}
            {" · "}
            <a
              href="#admin"
              style={{
                color: "rgba(255,255,255,0.32)",
                textDecoration: "none",
                fontSize: "12px",
                letterSpacing: "0.4px",
              }}
              aria-label="Open Mineworld admin panel"
            >
              Admin
            </a>
          </div>

          <div
            style={{
              color: theme.colors.text,
              fontSize: "13px",
              lineHeight: 1.7,
              textAlign: isMobile ? "left" : "right",
              maxWidth: isMobile ? "100%" : "620px",
            }}
          >
            Mineworld Production is a video editing and digital growth agency in
            Delhi offering podcast production, social media management, graphic
            design support, and Meta ads services for brands, creators, clinics,
            and businesses.
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;