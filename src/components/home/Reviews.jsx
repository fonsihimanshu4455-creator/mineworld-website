import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionTag from "../common/SectionTag";
import SectionHeading from "../common/SectionHeading";
import { theme } from "../../styles/theme";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useSiteContent } from "../../context/useSiteContent";

function Stars({ value = 5 }) {
  const n = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <div
      aria-label={`${n} out of 5 stars`}
      style={{
        display: "inline-flex",
        gap: "2px",
        color: "#F7D58A",
        fontSize: "14px",
        lineHeight: 1,
      }}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ opacity: i < n ? 1 : 0.22 }}>
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ item }) {
  const initials = (item.name || "M")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      style={{
        flexShrink: 0,
        width: "320px",
        padding: "20px 22px",
        borderRadius: "20px",
        border: `1px solid ${theme.colors.line}`,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.02))",
        boxShadow: theme.shadow.soft,
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        minHeight: "200px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {item.avatar ? (
          <img
            src={item.avatar}
            alt={item.name}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
        ) : (
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, rgba(214,176,96,0.8), rgba(231,201,138,0.5))",
              color: "#1B1B1B",
              fontWeight: 800,
              fontSize: "14px",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
          >
            {initials}
          </div>
        )}
        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              color: theme.colors.text,
              fontWeight: 800,
              fontSize: "14px",
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item.name}
          </div>
          {item.role && (
            <div
              style={{
                color: theme.colors.textSoft,
                fontSize: "12px",
                marginTop: "3px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item.role}
            </div>
          )}
        </div>
        <div
          aria-hidden="true"
          style={{
            color: theme.colors.goldSoft,
            fontSize: "24px",
            lineHeight: 1,
            opacity: 0.35,
          }}
        >
          “
        </div>
      </div>

      <Stars value={item.rating} />

      <p
        style={{
          margin: 0,
          color: theme.colors.text,
          fontSize: "14px",
          lineHeight: 1.65,
          display: "-webkit-box",
          WebkitLineClamp: 5,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {item.text}
      </p>
    </div>
  );
}

export default function Reviews() {
  const isMobile = useIsMobile();
  const { content } = useSiteContent();
  const r = content.reviews || {};
  const items = (r.items || []).filter((i) => i.visible !== false);

  if (!items.length) return null;

  // Duplicate the list so the marquee can loop seamlessly
  const loop = [...items, ...items];
  // Slower on more items to keep perceived speed consistent
  const duration = Math.max(18, items.length * 5);

  return (
    <section
      id="reviews"
      style={{
        position: "relative",
        padding: isMobile ? "70px 0" : "100px 0",
        background: `
          radial-gradient(circle at 85% 20%, rgba(87,120,210,0.08), transparent 28%),
          linear-gradient(180deg, ${theme.colors.bg} 0%, #121a2d 50%, ${theme.colors.bg} 100%)
        `,
        borderTop: `1px solid ${theme.colors.line}`,
        borderBottom: `1px solid ${theme.colors.line}`,
        overflow: "hidden",
      }}
    >
      <Container>
        <Reveal>
          <SectionTag>{r.sectionTag || "Reviews"}</SectionTag>
        </Reveal>
        <Reveal delay={0.08}>
          <SectionHeading
            title={r.sectionTitle}
            subtitle={r.sectionSubtitle}
          />
        </Reveal>
      </Container>

      <div
        style={{
          position: "relative",
          marginTop: isMobile ? "28px" : "40px",
          maskImage:
            "linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%)",
        }}
        className="mw-review-track-wrap"
      >
        <div
          className="mw-review-track"
          style={{
            display: "flex",
            gap: "16px",
            width: "max-content",
            animation: `mw-review-marquee ${duration}s linear infinite`,
          }}
        >
          {loop.map((item, idx) => (
            <ReviewCard key={`${item.id || idx}-${idx}`} item={item} />
          ))}
        </div>
      </div>

      {r.googleUrl && (
        <Container>
          <div
            style={{
              marginTop: isMobile ? "24px" : "32px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <a
              href={r.googleUrl}
              target="_blank"
              rel="noreferrer"
              className="mw-link"
              style={{
                color: theme.colors.goldSoft,
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              See all Google Reviews <span aria-hidden="true">→</span>
            </a>
          </div>
        </Container>
      )}

      <style>{`
        @keyframes mw-review-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .mw-review-track-wrap:hover .mw-review-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .mw-review-track {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
