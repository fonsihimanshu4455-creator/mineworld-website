import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";
import SectionTag from "../common/SectionTag";
import { theme } from "../../styles/theme";
import { teamRoles } from "../../data/teamRoles";
import useIsMobile from "../../utils/useIsMobile";

function TeamCard({ member, isMobile }) {
  return (
    <Link
      to={`/team/${member.slug}`}
      aria-label={`${member.name} — view role details`}
      style={{
        textDecoration: "none",
        display: "block",
        height: "100%",
      }}
    >
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        style={{
          position: "relative",
          borderRadius: isMobile ? "22px" : "24px",
          overflow: "hidden",
          border: `1px solid ${theme.colors.line}`,
          background: theme.colors.bgCard,
          boxShadow: theme.shadow.soft,
          height: "100%",
          minHeight: isMobile ? "340px" : "380px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            position: "relative",
            flex: 1,
            minHeight: isMobile ? "240px" : "280px",
            overflow: "hidden",
          }}
        >
          <img
            src={member.photo}
            alt={member.photoAlt}
            loading="lazy"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "grayscale(20%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.22) 40%, rgba(0,0,0,0.82) 100%)",
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "14px",
              right: "14px",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "rgba(214,176,96,0.92)",
              display: "grid",
              placeItems: "center",
              color: "#18140F",
              fontSize: "14px",
              fontWeight: 800,
              boxShadow: "0 8px 20px rgba(214,176,96,0.3)",
            }}
          >
            →
          </div>
        </div>

        <div
          style={{
            padding: isMobile ? "18px 20px 20px" : "20px 22px 22px",
            borderTop: `1px solid ${theme.colors.line}`,
            background:
              "linear-gradient(180deg, rgba(17,24,39,0.86), rgba(17,24,39,1))",
          }}
        >
          <div
            style={{
              color: theme.colors.goldSoft,
              fontSize: "10.5px",
              letterSpacing: "1.8px",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: "6px",
            }}
          >
            {member.role}
          </div>
          <h3
            style={{
              margin: 0,
              color: theme.colors.text,
              fontSize: isMobile ? "20px" : "22px",
              lineHeight: 1.18,
              fontWeight: 800,
              letterSpacing: "-0.4px",
              fontFamily:
                '"Playfair Display", Georgia, "Times New Roman", serif',
            }}
          >
            {member.name}
          </h3>
        </div>
      </motion.article>
    </Link>
  );
}

function TeamSection() {
  const isMobile = useIsMobile(768);

  return (
    <section
      id="team"
      style={{
        position: "relative",
        padding: isMobile ? "72px 0" : "108px 0",
        background: theme.colors.bg,
        borderBottom: `1px solid ${theme.colors.line}`,
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
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
            title="A specialist for every layer of the work."
            subtitle="Tap any role to see what they own, how they contribute, and the service they lead."
          />
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fit, minmax(240px, 1fr))",
            gap: isMobile ? "18px" : "22px",
            alignItems: "stretch",
          }}
        >
          {teamRoles.map((member, i) => (
            <Reveal key={member.slug} delay={0.05 * i}>
              <TeamCard member={member} isMobile={isMobile} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default TeamSection;
