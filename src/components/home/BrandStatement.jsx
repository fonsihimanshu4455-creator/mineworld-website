import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionTag from "../common/SectionTag";

function BrandStatement() {
  return (
    <section
      style={{
        position: "relative",
        padding: "110px 0",
        background: "var(--accent-navy)",
        borderBottom: "1px solid rgba(184,149,106,0.20)",
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
                color: "#FFFFFF",
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
                color: "rgba(245,239,230,0.85)",
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