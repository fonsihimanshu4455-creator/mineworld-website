import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionTag from "../common/SectionTag";
import { theme } from "../../styles/theme";
import { useIsMobile } from "../../hooks/useIsMobile";

function BrandStatement() {
  const isMobile = useIsMobile();

  return (
    <section
      style={{
        position: "relative",
        padding: isMobile ? "70px 0" : "110px 0",
        background: theme.colors.bg,
        borderBottom: `1px solid ${theme.colors.line}`,
      }}
    >
      <Container>
        <Reveal>
          <SectionTag>Why Mineworld</SectionTag>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            style={{
              maxWidth: "1100px",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(34px, 5vw, 72px)",
                lineHeight: 1.06,
                fontWeight: 800,
                letterSpacing: "-1.5px",
                color: theme.colors.text,
              }}
            >
              Most agencies just make posts.
              <br />
              We make your business grow.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div
            style={{
              marginTop: "26px",
              maxWidth: "760px",
            }}
          >
            <p
              style={{
                margin: 0,
                color: theme.colors.textSoft,
                fontSize: isMobile ? "15px" : "18px",
                lineHeight: 1.9,
              }}
            >
              Ads that bring real leads. Videos people actually watch. Shoots that
              make you look premium. All from one team — so you’re not chasing three
              different vendors.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default BrandStatement;