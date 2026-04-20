import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionTag from "../common/SectionTag";
import { theme } from "../../styles/theme";
import { clientBrands as defaultBrands } from "../../data/clientBrands";
import { useCollection } from "../../admin/hooks";
import useIsMobile from "../../utils/useIsMobile";

function LogoChip({ brand }) {
  const hasLogo = Boolean(brand.logo);

  return (
    <div
      title={brand.name}
      style={{
        flexShrink: 0,
        padding: "18px 24px 16px",
        marginRight: "18px",
        borderRadius: "20px",
        border: `1px solid ${theme.colors.line}`,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        minWidth: "220px",
        height: "140px",
      }}
    >
      {hasLogo ? (
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            minHeight: 0,
          }}
        >
          <img
            src={brand.logo}
            alt={`${brand.name} logo`}
            loading="lazy"
            style={{
              maxHeight: "72px",
              maxWidth: "180px",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              filter: "brightness(0.98)",
              display: "block",
            }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      ) : (
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: theme.colors.goldSoft,
            fontSize: "28px",
            fontWeight: 800,
            letterSpacing: "-0.8px",
            fontFamily:
              '"Playfair Display", Georgia, "Times New Roman", serif',
            opacity: 0.8,
          }}
        >
          {(brand.name || "").slice(0, 2).toUpperCase()}
        </div>
      )}

      <div
        style={{
          textAlign: "center",
          borderTop: `1px solid ${theme.colors.line}`,
          paddingTop: "8px",
          width: "100%",
        }}
      >
        <div
          style={{
            color: theme.colors.text,
            fontSize: "14px",
            fontWeight: 700,
            letterSpacing: "-0.1px",
            lineHeight: 1.15,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {brand.name}
        </div>
        {brand.industry ? (
          <div
            style={{
              color: theme.colors.goldSoft,
              fontSize: "9.5px",
              fontWeight: 700,
              letterSpacing: "1.4px",
              textTransform: "uppercase",
              marginTop: "2px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {brand.industry}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ClientLogoWall() {
  const isMobile = useIsMobile(768);
  const brands = useCollection("clientBrands", defaultBrands);
  const doubled = [...brands, ...brands];

  if (brands.length === 0) return null;

  return (
    <section
      id="clients"
      style={{
        position: "relative",
        padding: isMobile ? "56px 0" : "72px 0",
        background: "rgba(13,20,34,1)",
        borderBottom: `1px solid ${theme.colors.line}`,
        overflow: "hidden",
      }}
    >
      <Container>
        <Reveal>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "28px",
            }}
          >
            <SectionTag style={{ marginBottom: 0 }}>Trusted By</SectionTag>
            <div
              style={{
                color: theme.colors.textSoft,
                fontSize: "13px",
                letterSpacing: "0.3px",
              }}
            >
              Brands, clinics, creators, and businesses across Delhi NCR
            </div>
          </div>
        </Reveal>
      </Container>

      <div
        style={{
          position: "relative",
          overflow: "hidden",
          maskImage:
            "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
        }}
      >
        <div
          className="mw-logo-marquee"
          style={{
            display: "flex",
            width: "max-content",
            animation: "mw-marquee 36s linear infinite",
          }}
        >
          {doubled.map((brand, i) => (
            <LogoChip key={`${brand.name}-${i}`} brand={brand} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes mw-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .mw-logo-marquee:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .mw-logo-marquee {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

export default ClientLogoWall;
