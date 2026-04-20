import { motion } from "framer-motion";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";
import SectionTag from "../common/SectionTag";
import { theme } from "../../styles/theme";
import useIsMobile from "../../utils/useIsMobile";

const teamBlocks = [
  {
    id: 1,
    eyebrow: "Featured capability",
    title: "Lead Editor",
    role: "Motion + Retention Specialist",
    description:
      "Builds sharp, fast-paced edits designed for retention, rhythm, premium finish, and stronger content perception across reels, ads, podcasts, and branded formats.",
    tags: ["Reels", "Pacing", "Retention"],
    large: true,
    footer:
      "This role represents the editing standard Mineworld is built on: precision, speed, premium finish, and platform-aware visual control.",
  },
  {
    id: 2,
    eyebrow: "Content system architect",
    title: "Growth Strategist",
    role: "Ads + Social Direction",
    description:
      "Connects content, campaigns, page management, and platform behavior so visuals don’t just look good — they support reach, inquiries, and brand growth.",
    tags: ["Strategy", "Ads", "Content"],
  },
  {
    id: 3,
    eyebrow: "Shoot flow controller",
    title: "Studio Producer",
    role: "Shoot + Setup Execution",
    description:
      "Handles indoor production standards, setup quality, podcast shoot flow, and content environments built for authority and polished delivery.",
    tags: ["Studio", "Podcast", "Production"],
  },
  {
    id: 4,
    eyebrow: "Visual consistency layer",
    title: "Creative Support",
    role: "Design + Asset Support",
    description:
      "Supports every content system with thumbnails, social assets, campaign creatives, layout cleanup, and presentation consistency across platforms.",
    tags: ["Design", "Assets", "Support"],
  },
];

function TeamSection() {
  const featured = teamBlocks[0];
  const supportBlocks = teamBlocks.slice(1);

  const isMobile = useIsMobile(768);

  return (
    <section
      id="team"
      style={{
        position: "relative",
        padding: isMobile ? "80px 0" : "120px 0",
        background: theme.colors.bg,
        borderBottom: `1px solid ${theme.colors.line}`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: "-8%",
          top: "14%",
          width: isMobile ? "220px" : "360px",
          height: isMobile ? "220px" : "360px",
          borderRadius: "50%",
          background: "rgba(214,176,96,0.07)",
          filter: "blur(140px)",
          pointerEvents: "none",
        }}
      />

      <Container>
        <Reveal>
          <SectionTag>Team</SectionTag>
        </Reveal>

        <Reveal delay={0.08}>
          <SectionHeading
            title="Mineworld is designed as a specialist machine."
            subtitle="Not a random team. Not a vague agency structure. Every role exists to sharpen quality, speed, perception, and execution across editing, content, shoots, and digital growth."
          />
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.15fr 0.85fr",
            gap: "26px",
            alignItems: "stretch",
          }}
        >
          {/* FEATURED */}
          <Reveal delay={0.12}>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              style={{
                minHeight: isMobile ? "auto" : "520px",
                borderRadius: isMobile ? "24px" : "30px",
                padding: isMobile ? "24px" : "34px",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025))",
                border: "1px solid rgba(214,176,96,0.34)",
                boxShadow: theme.shadow.deep,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-42px",
                  right: "-32px",
                  width: isMobile ? "150px" : "220px",
                  height: isMobile ? "150px" : "220px",
                  borderRadius: "50%",
                  background: "rgba(214,176,96,0.10)",
                  filter: "blur(90px)",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  color: theme.colors.goldSoft,
                  fontSize: "12px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                {featured.eyebrow}
              </div>

              <h3
                style={{
                  margin: "0 0 8px",
                  fontSize: isMobile ? "42px" : "clamp(38px, 4vw, 62px)",
                  lineHeight: 1,
                  fontWeight: 800,
                  color: theme.colors.text,
                }}
              >
                {featured.title}
              </h3>

              <div
                style={{
                  color: theme.colors.goldSoft,
                  fontSize: isMobile ? "18px" : "24px",
                  fontWeight: 700,
                  lineHeight: 1.3,
                  marginBottom: "18px",
                }}
              >
                {featured.role}
              </div>

              <p
                style={{
                  margin: 0,
                  color: theme.colors.textSoft,
                  fontSize: isMobile ? "16px" : "17px",
                  lineHeight: 1.9,
                  maxWidth: "90%",
                }}
              >
                {featured.description}
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                  marginTop: "22px",
                }}
              >
                {featured.tags.map((tag) => (
                  <div
                    key={tag}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "999px",
                      border: `1px solid ${theme.colors.line}`,
                      background: theme.colors.bgCard,
                      color: theme.colors.text,
                      fontSize: "13px",
                    }}
                  >
                    {tag}
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: "28px",
                  paddingTop: "22px",
                  borderTop: `1px solid ${theme.colors.line}`,
                  color: theme.colors.textSoft,
                  fontSize: "14px",
                  lineHeight: 1.85,
                  maxWidth: "92%",
                }}
              >
                {featured.footer}
              </div>
            </motion.div>
          </Reveal>

          {/* RIGHT STACK */}
          <div
            style={{
              display: "grid",
              gridTemplateRows: isMobile ? "auto" : "repeat(3, 1fr)",
              gap: "22px",
            }}
          >
            {supportBlocks.map((block, index) => (
              <Reveal key={block.id} delay={0.16 + index * 0.06}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 180, damping: 18 }}
                  style={{
                    minHeight: isMobile ? "auto" : "155px",
                    borderRadius: isMobile ? "22px" : "24px",
                    padding: isMobile ? "22px" : "24px",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025))",
                    border: `1px solid ${theme.colors.line}`,
                    boxShadow: theme.shadow.soft,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      color: theme.colors.goldSoft,
                      fontSize: "11px",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      marginBottom: "10px",
                    }}
                  >
                    {block.eyebrow}
                  </div>

                  <h3
                    style={{
                      margin: "0 0 6px",
                      fontSize: isMobile ? "28px" : "34px",
                      lineHeight: 1.05,
                      fontWeight: 800,
                      color: theme.colors.text,
                    }}
                  >
                    {block.title}
                  </h3>

                  <div
                    style={{
                      color: theme.colors.goldSoft,
                      fontSize: "15px",
                      fontWeight: 700,
                      marginBottom: "10px",
                    }}
                  >
                    {block.role}
                  </div>

                  <p
                    style={{
                      margin: 0,
                      color: theme.colors.textSoft,
                      fontSize: "14px",
                      lineHeight: 1.8,
                    }}
                  >
                    {block.description}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                      marginTop: "16px",
                    }}
                  >
                    {block.tags.map((tag) => (
                      <div
                        key={tag}
                        style={{
                          padding: "7px 10px",
                          borderRadius: "999px",
                          border: `1px solid ${theme.colors.line}`,
                          background: theme.colors.bgCard,
                          color: theme.colors.text,
                          fontSize: "11px",
                        }}
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default TeamSection;