import { motion } from "framer-motion";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";
import SectionTag from "../common/SectionTag";
import { theme } from "../../styles/theme";

const teamMembers = [
  {
    id: 1,
    name: "Lead Editor",
    role: "Motion + Retention Specialist",
    description:
      "Builds sharp, fast-paced edits designed for retention, rhythm, and premium content perception.",
    tags: ["Reels", "Pacing", "Retention"],
  },
  {
    id: 2,
    name: "Growth Strategist",
    role: "Content System Architect",
    description:
      "Connects content, campaigns, and platform behavior so visuals don’t just look good — they perform.",
    tags: ["Strategy", "Ads", "Content"],
  },
  {
    id: 3,
    name: "Studio Producer",
    role: "Shoot Flow Controller",
    description:
      "Handles indoor production standards, setup quality, and content environments built for authority.",
    tags: ["Studio", "Podcast", "Production"],
  },
  {
    id: 4,
    name: "Creative Support",
    role: "Visual Consistency Layer",
    description:
      "Supports every content system with thumbnails, social assets, campaign creatives, and visual cleanup.",
    tags: ["Design", "Assets", "Support"],
  },
];

function TeamSection() {
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth <= 768 : false;

  return (
    <section
      style={{
        position: "relative",
        padding: isMobile ? "80px 0" : "120px 0",
        background: theme.colors.bgSoft,
        borderBottom: `1px solid ${theme.colors.line}`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: "-8%",
          top: "10%",
          width: isMobile ? "220px" : "320px",
          height: isMobile ? "220px" : "320px",
          borderRadius: "50%",
          background: "rgba(214,176,96,0.08)",
          filter: "blur(130px)",
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
            subtitle="Not a random team. Not a vague agency structure. Every role exists to sharpen quality, speed, perception, and execution."
          />
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.2fr 0.8fr",
            gap: "26px",
            alignItems: "stretch",
          }}
        >
          {/* FEATURED LEFT */}
          <Reveal delay={0.12}>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              style={{
                position: "relative",
                minHeight: isMobile ? "auto" : "420px",
                borderRadius: isMobile ? "24px" : "30px",
                padding: isMobile ? "24px" : "34px",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025))",
                border: "1px solid rgba(214,176,96,0.35)",
                boxShadow: theme.shadow.deep,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-30px",
                  right: "-30px",
                  width: isMobile ? "160px" : "220px",
                  height: isMobile ? "160px" : "220px",
                  borderRadius: "50%",
                  background: "rgba(214,176,96,0.18)",
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
                Featured capability
              </div>

              <h3
                style={{
                  margin: "0 0 14px",
                  fontSize: isMobile ? "38px" : "clamp(34px, 4vw, 56px)",
                  lineHeight: 1,
                  fontWeight: 800,
                  color: theme.colors.text,
                }}
              >
                {teamMembers[0].name}
              </h3>

              <div
                style={{
                  fontSize: isMobile ? "17px" : "18px",
                  color: theme.colors.goldSoft,
                  marginBottom: "18px",
                  fontWeight: 600,
                }}
              >
                {teamMembers[0].role}
              </div>

              <p
                style={{
                  margin: 0,
                  maxWidth: "700px",
                  color: theme.colors.textSoft,
                  fontSize: isMobile ? "16px" : "17px",
                  lineHeight: 1.9,
                }}
              >
                {teamMembers[0].description}
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                  marginTop: "28px",
                }}
              >
                {teamMembers[0].tags.map((tag) => (
                  <div
                    key={tag}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "999px",
                      border: `1px solid ${theme.colors.line}`,
                      background: theme.colors.bgCard,
                      fontSize: "13px",
                      color: theme.colors.text,
                    }}
                  >
                    {tag}
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: "30px",
                  paddingTop: "20px",
                  borderTop: `1px solid ${theme.colors.line}`,
                  color: theme.colors.textSoft,
                  fontSize: "14px",
                  lineHeight: 1.8,
                  maxWidth: "700px",
                }}
              >
                This role represents the editing standard Mineworld is built on:
                precision, speed, premium finish, and platform-aware visual
                control.
              </div>
            </motion.div>
          </Reveal>

          {/* RIGHT STACK */}
          <div
            style={{
              display: "grid",
              gridTemplateRows: isMobile ? "auto" : "repeat(3, 1fr)",
              gap: "26px",
            }}
          >
            {teamMembers.slice(1).map((member, index) => (
              <Reveal key={member.id} delay={0.16 + index * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 180, damping: 18 }}
                  style={{
                    minHeight: isMobile ? "auto" : "122px",
                    borderRadius: isMobile ? "22px" : "24px",
                    padding: isMobile ? "22px" : "24px",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025))",
                    border: `1px solid ${theme.colors.line}`,
                    boxShadow: theme.shadow.soft,
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
                    {member.role}
                  </div>

                  <h3
                    style={{
                      margin: "0 0 10px",
                      fontSize: isMobile ? "24px" : "26px",
                      lineHeight: 1.05,
                      fontWeight: 800,
                      color: theme.colors.text,
                    }}
                  >
                    {member.name}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      color: theme.colors.textSoft,
                      fontSize: "14px",
                      lineHeight: 1.75,
                    }}
                  >
                    {member.description}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                      marginTop: "16px",
                    }}
                  >
                    {member.tags.map((tag) => (
                      <div
                        key={tag}
                        style={{
                          padding: "7px 10px",
                          borderRadius: "999px",
                          border: `1px solid ${theme.colors.line}`,
                          background: theme.colors.bgCard,
                          fontSize: "11px",
                          color: theme.colors.text,
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