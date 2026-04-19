import { useState } from "react";
import Container from "../common/Container";
import { theme } from "../../styles/theme";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useSiteContent } from "../../context/useSiteContent";

function ClientLogo({ item, onLock }) {
  const initials = (item.name || "·")
    .split(/\s+/)
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      onClick={onLock}
      role="button"
      tabIndex={0}
      aria-label={item.name}
      style={{
        flexShrink: 0,
        width: "160px",
        height: "80px",
        borderRadius: "14px",
        border: `1px solid ${theme.colors.line}`,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
        display: "grid",
        placeItems: "center",
        padding: "12px 18px",
        cursor: "pointer",
        transition: "border-color 0.3s ease, transform 0.3s ease",
      }}
      className="mw-client-logo"
    >
      {item.logo ? (
        <img
          src={item.logo}
          alt={item.name}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            filter: "grayscale(1) brightness(1.2)",
            opacity: 0.75,
            transition: "filter 0.35s ease, opacity 0.35s ease",
          }}
          className="mw-client-img"
        />
      ) : (
        <div
          style={{
            color: theme.colors.goldSoft,
            fontWeight: 800,
            fontSize: "16px",
            letterSpacing: "1.2px",
            textAlign: "center",
          }}
        >
          {item.name || initials}
        </div>
      )}
    </div>
  );
}

export default function ClientsMarquee() {
  const isMobile = useIsMobile();
  const { content } = useSiteContent();
  const c = content.clients || {};
  const items = (c.items || []).filter((i) => i.visible !== false);
  const [locked, setLocked] = useState(false);

  if (!items.length) return null;

  const loop = [...items, ...items];
  const duration = Math.max(22, items.length * 3.5);

  return (
    <section
      id="clients"
      style={{
        position: "relative",
        padding: isMobile ? "42px 0" : "60px 0",
        background: theme.colors.bg,
        borderTop: `1px solid ${theme.colors.line}`,
        borderBottom: `1px solid ${theme.colors.line}`,
        overflow: "hidden",
      }}
    >
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "14px",
            marginBottom: isMobile ? "22px" : "28px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              color: theme.colors.goldSoft,
              fontSize: "11px",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            {c.sectionTag || "Our Clients"}
          </div>
          {c.sectionTitle && (
            <div
              style={{
                color: theme.colors.textSoft,
                fontSize: isMobile ? "14px" : "15px",
                fontWeight: 500,
              }}
            >
              {c.sectionTitle}
            </div>
          )}
        </div>
      </Container>

      <div
        style={{
          position: "relative",
          maskImage:
            "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
        }}
        onClick={() => setLocked((v) => !v)}
        className={`mw-clients-wrap${locked ? " is-locked" : ""}`}
      >
        <div
          className="mw-clients-track"
          style={{
            display: "flex",
            gap: "14px",
            width: "max-content",
            animation: `mw-clients-marquee ${duration}s linear infinite`,
          }}
        >
          {loop.map((item, idx) => (
            <ClientLogo
              key={`${item.id || idx}-${idx}`}
              item={item}
              onLock={() => setLocked(true)}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes mw-clients-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .mw-clients-wrap:hover .mw-clients-track,
        .mw-clients-wrap.is-locked .mw-clients-track {
          animation-play-state: paused;
        }
        .mw-client-logo:hover .mw-client-img {
          filter: grayscale(0) brightness(1) !important;
          opacity: 1 !important;
        }
        .mw-client-logo:hover {
          border-color: rgba(214,176,96,0.45) !important;
          transform: translateY(-2px);
        }
        @media (prefers-reduced-motion: reduce) {
          .mw-clients-track { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
