import Container from "../common/Container";
import { theme } from "../../styles/theme";
import logo from "../../assets/mineworld-logo.png";
import { siteConfig } from "../../data/siteConfig";
import { openContactModal, scrollToSection } from "../../utils/contactActions";

function Footer() {
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth <= 768 : false;

  return (
    <footer
      style={{
        position: "relative",
        padding: isMobile ? "60px 0 28px" : "80px 0 34px",
        background: theme.colors.bg,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "-8%",
          bottom: "-20%",
          width: isMobile ? "180px" : "280px",
          height: isMobile ? "180px" : "280px",
          borderRadius: "50%",
          background: "rgba(214,176,96,0.08)",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />

      <Container>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.15fr 0.8fr 0.8fr 1fr",
            gap: isMobile ? "28px" : "26px",
            paddingBottom: "30px",
            borderBottom: `1px solid ${theme.colors.line}`,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: isMobile ? "60px" : "74px",
                  height: isMobile ? "60px" : "74px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: "16%",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.14)",
                    filter: "blur(16px)",
                    pointerEvents: "none",
                  }}
                />
                <img
                  src={logo}
                  alt="Mineworld Production Logo"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    position: "relative",
                    zIndex: 1,
                    filter:
                      "drop-shadow(0 0 8px rgba(255,255,255,0.18)) drop-shadow(0 0 18px rgba(255,255,255,0.08))",
                  }}
                />
              </div>

              <div style={{ lineHeight: 1 }}>
                <div
                  style={{
                    fontSize: isMobile ? "20px" : "24px",
                    fontWeight: 800,
                    letterSpacing: "1px",
                    color: theme.colors.text,
                  }}
                >
                  MINEWORLD
                </div>
                <div
                  style={{
                    marginTop: "7px",
                    fontSize: isMobile ? "11px" : "12px",
                    letterSpacing: "2.4px",
                    textTransform: "uppercase",
                    color: theme.colors.goldSoft,
                    fontWeight: 700,
                  }}
                >
                  Production
                </div>
              </div>
            </div>

            <p
              style={{
                margin: 0,
                color: theme.colors.textSoft,
                lineHeight: 1.9,
                fontSize: "15px",
                maxWidth: isMobile ? "100%" : "360px",
              }}
            >
              Mineworld Production is a premium content, editing, and digital
              growth studio built for brands that want stronger presence,
              sharper execution, and better perception across platforms.
            </p>
          </div>

          <div>
            <div
              style={{
                color: theme.colors.goldSoft,
                fontSize: "12px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Services
            </div>

            <div
              style={{
                display: "grid",
                gap: "12px",
                color: theme.colors.textSoft,
                fontSize: "15px",
                lineHeight: 1.7,
              }}
            >
              <div>Video Editing</div>
              <div>Podcast Shoots</div>
              <div>Graphic Design Support</div>
              <div>Social Media Management</div>
              <div>Meta Ads & Digital Growth</div>
            </div>
          </div>

          <div>
            <div
              style={{
                color: theme.colors.goldSoft,
                fontSize: "12px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Navigation
            </div>

            <div
              style={{
                display: "grid",
                gap: "12px",
                fontSize: "15px",
                lineHeight: 1.7,
              }}
            >
              <button onClick={() => scrollToSection("home")} style={linkButtonStyle}>
                Home
              </button>
              <button onClick={() => scrollToSection("services")} style={linkButtonStyle}>
                Services
              </button>
              <button onClick={() => scrollToSection("portfolio")} style={linkButtonStyle}>
                Portfolio
              </button>
              <button onClick={() => scrollToSection("contact")} style={linkButtonStyle}>
                Contact
              </button>
            </div>
          </div>

          <div>
            <div
              style={{
                color: theme.colors.goldSoft,
                fontSize: "12px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Work With Us
            </div>

            <div
              style={{
                display: "grid",
                gap: "12px",
                color: theme.colors.textSoft,
                fontSize: "15px",
                lineHeight: 1.8,
              }}
            >
              <div>{siteConfig.contact.address}</div>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                style={{
                  color: theme.colors.textSoft,
                  textDecoration: "none",
                }}
              >
                {siteConfig.contact.email}
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: theme.colors.textSoft,
                  textDecoration: "none",
                }}
              >
                Instagram
              </a>
            </div>

            <button
              onClick={openContactModal}
              style={{
                display: "inline-block",
                marginTop: "18px",
                padding: "12px 16px",
                borderRadius: "999px",
                border: `1px solid ${theme.colors.lineStrong}`,
                color: theme.colors.text,
                textDecoration: "none",
                background: "rgba(255,255,255,0.03)",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Start a Project
            </button>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: isMobile ? "flex-start" : "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            flexDirection: isMobile ? "column" : "row",
            gap: "12px",
            flexWrap: "wrap",
            paddingTop: "22px",
            color: theme.colors.textSoft,
            fontSize: "14px",
            lineHeight: 1.7,
          }}
        >
          <div>© 2026 Mineworld Production. All rights reserved.</div>
          <div>Built to look sharper. Built to be remembered.</div>
        </div>
      </Container>
    </footer>
  );
}

const linkButtonStyle = {
  background: "transparent",
  border: "none",
  padding: 0,
  textAlign: "left",
  color: theme.colors.textSoft,
  cursor: "pointer",
  fontSize: "15px",
};

export default Footer;