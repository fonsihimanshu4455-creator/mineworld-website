import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionTag from "../common/SectionTag";
import { theme } from "../../styles/theme";

function BrandStatement() {
  return (
    <section
      style={{
        position: "relative",
        padding: "110px 0",
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
              Most agencies deliver content.
              <br />
              Mineworld builds perception systems.
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
                fontSize: "18px",
                lineHeight: 1.9,
              }}
            >
              We combine editing intelligence, cinematic execution, and
              digital growth thinking to create a brand presence that feels
              sharper, more premium, and harder to ignore.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default BrandStatement;