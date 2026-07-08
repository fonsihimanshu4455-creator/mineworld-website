// AboutSections — impersonal About-page content that doesn't lean on
// any specific founder / team member. Three sections:
//   1) Mission — big pull-quote of what the studio is built for
//   2) Pillars — three how-we-work cards
//   3) Impact — key numbers band
// Each section is CMS-editable and has its own show/hide toggle.

import Container from "../common/Container";
import Reveal from "../common/Reveal";
import { theme } from "../../styles/theme";
import { useSiteContent } from "../../hooks/useSiteContent";
import { useSiteToggle } from "../../hooks/useSiteToggle";
import useIsMobile from "../../utils/useIsMobile";

const SERIF = '"Playfair Display", Georgia, "Times New Roman", serif';

export function MissionSection() {
  const isMobile = useIsMobile(768);
  const visible = useSiteToggle("about.show_mission", true);
  const eyebrow = useSiteContent("about.mission_eyebrow", "Mission");
  const headline = useSiteContent(
    "about.mission_headline",
    "We build for perception, not for reach."
  );
  const body = useSiteContent(
    "about.mission_body",
    "Every reel, ad, and pixel that leaves the studio is calibrated to a single question — does it make the right person stop scrolling and start trusting? If yes, ship it. If not, cut it. That standard is the whole point of Mineworld."
  );
  if (!visible) return null;

  return (
    <section
      style={{
        padding: isMobile ? "72px 0" : "112px 0",
        borderBottom: `1px solid ${theme.colors.line}`,
      }}
    >
      <Container>
        <div style={{ maxWidth: 880, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <div
              style={{
                color: theme.colors.goldSoft,
                fontSize: 12,
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontWeight: 800,
                marginBottom: 20,
              }}
            >
              {eyebrow}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              style={{
                margin: "0 0 24px",
                fontSize: isMobile ? "34px" : "clamp(38px, 4.6vw, 56px)",
                lineHeight: 1.1,
                letterSpacing: "-1.2px",
                color: theme.colors.text,
                fontFamily: SERIF,
                fontWeight: 800,
              }}
            >
              {headline}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p
              style={{
                margin: 0,
                fontSize: isMobile ? "16px" : "19px",
                lineHeight: 1.85,
                color: theme.colors.textSoft,
              }}
            >
              {body}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

const DEFAULT_PILLARS = [
  {
    title: "Editing-first thinking",
    body: "Retention over reach. Structure over volume. Every second in every cut earns its place — first frame to loop trigger.",
    icon: "◐",
  },
  {
    title: "Growth as the metric",
    body: "We measure what actually moved — qualified leads, revenue, retention — not vanity likes. If the number doesn't matter to your business, we don't chase it.",
    icon: "↗",
  },
  {
    title: "Premium standard",
    body: "Nothing leaves the studio unless it feels like something the brand can be proud of, everywhere it lands — feed, ad, landing page, portfolio.",
    icon: "◆",
  },
];

export function PillarsSection() {
  const isMobile = useIsMobile(768);
  const visible = useSiteToggle("about.show_pillars", true);
  const eyebrow = useSiteContent("about.pillars_eyebrow", "How we work");
  const headline = useSiteContent(
    "about.pillars_headline",
    "Three standards. Every project. No shortcuts."
  );
  const subhead = useSiteContent(
    "about.pillars_subhead",
    "We hold every deliverable to the same three questions — before it ships."
  );
  if (!visible) return null;

  return (
    <section
      style={{
        padding: isMobile ? "72px 0" : "108px 0",
        background:
          "linear-gradient(180deg, var(--bg-cream-soft) 0%, var(--bg-primary) 100%)",
        borderBottom: `1px solid ${theme.colors.line}`,
      }}
    >
      <Container>
        <div style={{ maxWidth: 720, marginBottom: isMobile ? 36 : 56 }}>
          <Reveal>
            <div
              style={{
                color: theme.colors.goldSoft,
                fontSize: 12,
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontWeight: 800,
                marginBottom: 16,
              }}
            >
              {eyebrow}
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              style={{
                margin: "0 0 18px",
                fontSize: isMobile ? "28px" : "clamp(30px, 3.6vw, 42px)",
                lineHeight: 1.15,
                letterSpacing: "-0.6px",
                color: theme.colors.text,
                fontFamily: SERIF,
                fontWeight: 800,
              }}
            >
              {headline}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p
              style={{
                margin: 0,
                fontSize: isMobile ? "15px" : "17px",
                lineHeight: 1.85,
                color: theme.colors.textSoft,
                maxWidth: 600,
              }}
            >
              {subhead}
            </p>
          </Reveal>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fit, minmax(280px, 1fr))",
            gap: isMobile ? 16 : 22,
          }}
        >
          {DEFAULT_PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={0.08 * i}>
              <div
                style={{
                  padding: isMobile ? "26px 24px" : "34px 30px",
                  borderRadius: 22,
                  border: `1px solid ${theme.colors.line}`,
                  background: "var(--bg-secondary)",
                  boxShadow: "0 14px 32px rgba(15,42,68,0.06)",
                  height: "100%",
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background:
                      "linear-gradient(135deg, rgba(188,153,102,0.20), rgba(188,153,102,0.06))",
                    color: theme.colors.gold,
                    fontSize: 24,
                    display: "grid",
                    placeItems: "center",
                    marginBottom: 20,
                    fontWeight: 800,
                  }}
                >
                  {p.icon}
                </div>
                <h3
                  style={{
                    margin: "0 0 12px",
                    fontSize: isMobile ? "20px" : "22px",
                    color: theme.colors.text,
                    fontFamily: SERIF,
                    fontWeight: 800,
                    letterSpacing: "-0.4px",
                    lineHeight: 1.2,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    color: theme.colors.textSoft,
                    fontSize: isMobile ? "14.5px" : "15.5px",
                    lineHeight: 1.85,
                  }}
                >
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

const DEFAULT_STATS = [
  { label: "Reels shipped / month", value: "80+" },
  { label: "Views on a single reel", value: "2.5M+" },
  { label: "Website Lighthouse performance", value: "96 / 100" },
  { label: "Cost per qualified lead (best)", value: "₹135" },
];

export function ImpactSection() {
  const isMobile = useIsMobile(768);
  const visible = useSiteToggle("about.show_impact", true);
  const eyebrow = useSiteContent("about.impact_eyebrow", "Proof");
  const headline = useSiteContent(
    "about.impact_headline",
    "Numbers behind the standard."
  );
  const subhead = useSiteContent(
    "about.impact_subhead",
    "Selected outcomes from live client work — everything measured, everything moves the P&L."
  );
  if (!visible) return null;

  return (
    <section
      className="navy-band"
      style={{
        padding: isMobile ? "78px 0" : "118px 0",
      }}
    >
      <Container>
        <div className="navy-band-inner" style={{ maxWidth: 780 }}>
          <Reveal>
            <span className="eyebrow-label">{eyebrow}</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              style={{
                margin: "12px 0 16px",
                fontFamily: SERIF,
                fontWeight: 800,
                fontSize: isMobile ? "30px" : "clamp(34px, 4vw, 46px)",
                letterSpacing: "-0.8px",
                lineHeight: 1.1,
              }}
            >
              {headline}
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p
              style={{
                margin: 0,
                fontSize: isMobile ? "15px" : "17px",
                lineHeight: 1.85,
                color: "rgba(245,239,230,0.78)",
                maxWidth: 620,
              }}
            >
              {subhead}
            </p>
          </Reveal>
          <span
            className="underline-pill"
            aria-hidden="true"
            style={{ marginTop: 20 }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr 1fr"
              : "repeat(auto-fit, minmax(220px, 1fr))",
            gap: isMobile ? 12 : 16,
            marginTop: 40,
            position: "relative",
            zIndex: 1,
          }}
        >
          {DEFAULT_STATS.map((s, i) => (
            <Reveal key={s.label} delay={0.06 * i}>
              <div
                style={{
                  padding: isMobile ? "20px 18px" : "28px 24px",
                  borderRadius: 20,
                  border: "1px solid rgba(184,149,106,0.34)",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                <div
                  style={{
                    color: "var(--accent-gold)",
                    fontSize: 11,
                    letterSpacing: "1.6px",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    marginBottom: 10,
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    color: "#FFFFFF",
                    fontFamily: SERIF,
                    fontWeight: 700,
                    fontSize: isMobile ? "28px" : "36px",
                    letterSpacing: "-0.6px",
                    lineHeight: 1.1,
                  }}
                >
                  {s.value}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
