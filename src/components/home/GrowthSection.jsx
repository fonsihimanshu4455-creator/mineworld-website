import Container from "../common/Container";
import Reveal from "../common/Reveal";
import { theme } from "../../styles/theme";
import useIsMobile from "../../utils/useIsMobile";

function GrowthSection() {
  const isMobile = useIsMobile(768);

  return (
    <section
      style={{
        position: "relative",
        padding: isMobile ? "70px 0" : "90px 0",
        background: theme.colors.bg,
        borderBottom: `1px solid ${theme.colors.line}`,
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
                color: theme.colors.goldSoft,
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
                color: theme.colors.text,
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
                color: theme.colors.textSoft,
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
                "Content Strategy",
                "Video Editing",
                "Meta Ads",
                "Lead Generation",
                "Page Management",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    padding: "11px 16px",
                    borderRadius: "999px",
                    border: `1px solid ${theme.colors.line}`,
                    background: theme.colors.bgCard,
                    color: theme.colors.text,
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
                color: theme.colors.goldSoft,
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
                color: theme.colors.textSoft,
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