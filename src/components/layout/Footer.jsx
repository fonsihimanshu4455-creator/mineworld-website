import Container from "../common/Container";
import { theme } from "../../styles/theme";

function Footer() {
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth <= 768 : false;

  return (
    <footer
      style={{
        position: "relative",
        padding: isMobile ? "56px 0 28px" : "70px 0 36px",
        background: theme.colors.bgSoft,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "-6%",
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
            gridTemplateColumns: isMobile ? "1fr" : "1.2fr 0.8fr 0.8fr 1fr",
            gap: isMobile ? "26px" : "28px",
            paddingBottom: "32px",
            borderBottom: `1px solid ${theme.colors.line}`,
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontSize: isMobile ? "24px" : "26px",
                fontWeight: 800,
                letterSpacing: "1px",
                marginBottom: "14px",
                color: theme.colors.text,
              }}
            >
              MINEWORLD
            </div>

            <p
              style={{
                margin: 0,
                color: theme.colors.textSoft,
                lineHeight: 1.85,
                fontSize: "15px",
                maxWidth: isMobile ? "100%" : "360px",
              }}
            >
              Delhi’s Most Authentic New-Age Production Studio — built around
              editing-first execution, premium perception, and strong digital
              presence.
            </p>
          </div>

          {/* Navigation */}
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
                color: theme.colors.textSoft,
                fontSize: "15px",
              }}
            >
              <a href="#home">Home</a>
              <a href="#services">Services</a>
              <a href="#portfolio">Portfolio</a>
              <a href="#contact">Contact</a>
            </div>
          </div>

          {/* Focus */}
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
              Focus
            </div>

            <div
              style={{
                display: "grid",
                gap: "12px",
                color: theme.colors.textSoft,
                fontSize: "15px",
              }}
            >
              <div>Video Editing</div>
              <div>Digital Growth</div>
              <div>Studio Production</div>
              <div>Creative Support</div>
            </div>
          </div>

          {/* Contact */}
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
              Contact
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
              <div>Start a project with Mineworld</div>
              <div>Founder: Himanshu Bhardwaj</div>
              <div>Delhi, India</div>
              <div>Premium digital-first production brand</div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: isMobile ? "flex-start" : "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            flexDirection: isMobile ? "column" : "row",
            gap: "14px",
            flexWrap: "wrap",
            paddingTop: "24px",
            color: theme.colors.textSoft,
            fontSize: "14px",
            lineHeight: 1.7,
          }}
        >
          <div style={{ color: theme.colors.textSoft }}>
            © 2026 Mineworld Production. All rights reserved.
          </div>
          <div style={{ color: theme.colors.textSoft }}>
            Built to look sharper. Built to be remembered.
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;