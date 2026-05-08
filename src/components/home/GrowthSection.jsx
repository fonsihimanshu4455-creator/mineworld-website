import Container from "../common/Container";
import Reveal from "../common/Reveal";
import useIsMobile from "../../utils/useIsMobile";

function GrowthSection() {
  const isMobile = useIsMobile(768);

  return (
    <section
      style={{
        position: "relative",
        padding: isMobile ? "70px 0" : "90px 0",
        background: "var(--accent-navy)",
        borderBottom: "1px solid rgba(184,149,106,0.20)",
        overflow: "hidden",
      }}
    >
      <Container>
        <Reveal>
          <div
            style={{
              textAlign: "center",
              maxWidth: "920px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                color: "var(--accent-gold)",
                fontSize: "12px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              What Actually Brings You Clients
            </div>

            <h2
              style={{
                margin: "0 0 18px",
                fontSize: isMobile ? "38px" : "58px",
                lineHeight: 1.04,
                fontWeight: 800,
                color: "#FFFFFF",
              }}
            >
              Most agencies focus on content.
              <br />
              We focus on results.
            </h2>

            <p
              style={{
                margin: "0 auto",
                maxWidth: "760px",
                color: "rgba(245,239,230,0.85)",
                fontSize: isMobile ? "16px" : "18px",
                lineHeight: 1.9,
              }}
            >
              Good-looking content means nothing if it doesn’t create
              visibility, leads, and growth. Mineworld combines content,
              editing, social media management, and ads into one practical
              growth system.
            </p>

            <div
              style={{
                marginTop: "28px",
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "14px",
              }}
            >
              {[
                "Websites",
                "Mobile Apps",
                "Meta Ads",
                "Lead Generation",
                "Content & Social",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    padding: "11px 16px",
                    borderRadius: "999px",
                    border: "1px solid rgba(184,149,106,0.20)",
                    background: "rgba(255,255,255,0.05)",
                    color: "#FFFFFF",
                    fontSize: "14px",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "26px",
                color: "var(--accent-gold)",
                fontSize: isMobile ? "16px" : "18px",
                fontWeight: 700,
                lineHeight: 1.6,
              }}
            >
              Content + Editing + Ads = Growth System
            </div>

            <div
              style={{
                marginTop: "18px",
                color: "rgba(245,239,230,0.85)",
                fontSize: isMobile ? "14px" : "15px",
                lineHeight: 1.7,
              }}
            >
              If your content isn’t generating leads, it’s just decoration.
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default GrowthSection;