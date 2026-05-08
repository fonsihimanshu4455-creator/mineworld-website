// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import { theme } from "../../styles/theme";
import useIsMobile from "../../utils/useIsMobile";

function ManifestoBand() {
  const isMobile = useIsMobile(768);

  return (
    <section
      style={{
        position: "relative",
        padding: isMobile ? "88px 0 96px" : "140px 0 160px",
        background:
          "linear-gradient(180deg, #F4EFE6 0%, #EBE3D1 100%)",
        color: theme.colors.textNavy,
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 12% 12%, rgba(188,153,102,0.16), transparent 28%),
            radial-gradient(circle at 88% 80%, rgba(27,39,71,0.10), transparent 32%)
          `,
          pointerEvents: "none",
        }}
      />

      <svg
        aria-hidden="true"
        width="0"
        height="0"
        style={{ position: "absolute" }}
      >
        <defs>
          <pattern
            id="mw-band-jaali"
            x="0"
            y="0"
            width="42"
            height="42"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 21 H42 M21 0 V42 M0 0 L42 42 M42 0 L0 42"
              stroke="rgba(27,39,71,0.10)"
              strokeWidth="0.6"
              fill="none"
            />
            <circle cx="21" cy="21" r="1.6" fill="rgba(188,153,102,0.30)" />
          </pattern>
        </defs>
      </svg>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.55,
          pointerEvents: "none",
        }}
      >
        <svg width="100%" height="100%">
          <rect width="100%" height="100%" fill="url(#mw-band-jaali)" />
        </svg>
      </div>

      <Container style={{ position: "relative", zIndex: 1 }}>
        <Reveal>
          <div
            style={{
              color: theme.colors.goldDeep,
              fontSize: "11px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontWeight: 800,
              marginBottom: "18px",
              textAlign: isMobile ? "left" : "center",
            }}
          >
            Mineworld · The Studio Mantra
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h2
            style={{
              margin: "0 auto",
              maxWidth: "1080px",
              fontSize: isMobile ? "34px" : "clamp(40px, 5.4vw, 68px)",
              lineHeight: isMobile ? 1.18 : 1.1,
              letterSpacing: "-1.4px",
              color: theme.colors.textNavy,
              fontWeight: 800,
              fontFamily:
                '"Playfair Display", Georgia, "Times New Roman", serif',
              textAlign: isMobile ? "left" : "center",
            }}
          >
            We don't make{" "}
            <span style={{ color: theme.colors.goldDeep, fontStyle: "italic" }}>
              content.
            </span>{" "}
            We engineer{" "}
            <span style={{ color: theme.colors.goldDeep, fontStyle: "italic" }}>
              attention,
            </span>{" "}
            <span style={{ color: theme.colors.goldDeep, fontStyle: "italic" }}>
              authority,
            </span>{" "}
            and{" "}
            <span style={{ color: theme.colors.goldDeep, fontStyle: "italic" }}>
              revenue.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p
            style={{
              margin: isMobile ? "22px 0 0" : "32px auto 0",
              maxWidth: "780px",
              color: theme.colors.textNavySoft,
              fontSize: isMobile ? "15px" : "17px",
              lineHeight: 1.85,
              textAlign: isMobile ? "left" : "center",
            }}
          >
            Every reel, ad, and pixel that leaves this studio is calibrated to a
            single question — <em>does it make the right person stop scrolling
            and start trusting?</em> If yes, ship it. If not, cut it.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div
            style={{
              marginTop: isMobile ? "28px" : "44px",
              display: "flex",
              gap: "18px",
              flexWrap: "wrap",
              justifyContent: isMobile ? "flex-start" : "center",
              alignItems: "center",
            }}
          >
            {[
              "Cinematic Edit",
              "Performance Ad",
              "Brand System",
              "Studio Shoot",
            ].map((tag, i) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.06, duration: 0.6 }}
                style={{
                  padding: "10px 18px",
                  borderRadius: "999px",
                  border: "1px solid rgba(27,39,71,0.18)",
                  background: "rgba(255,255,255,0.6)",
                  color: theme.colors.textNavy,
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.3px",
                  backdropFilter: "blur(6px)",
                  WebkitBackdropFilter: "blur(6px)",
                }}
              >
                {tag}
              </motion.div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default ManifestoBand;
