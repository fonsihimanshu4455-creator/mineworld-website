import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionTag from "../common/SectionTag";
import { theme } from "../../styles/theme";
import { clientBrands as defaultBrands } from "../../data/clientBrands";
import { useCollection } from "../../admin/hooks";
import useIsMobile from "../../utils/useIsMobile";

function LogoChip({ brand }) {
  const hasLogo = Boolean(brand.logo);

  if (hasLogo) {
    return (
      <div
        title={brand.name}
        style={{
          flexShrink: 0,
          padding: "14px 22px",
          marginRight: "18px",
          borderRadius: "18px",
          border: `1px solid ${theme.colors.line}`,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.015))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "180px",
          height: "96px",
        }}
      >
        <img
          src={brand.logo}
          alt={`${brand.name} logo`}
          loading="lazy"
          style={{
            maxHeight: "56px",
            maxWidth: "160px",
            objectFit: "contain",
            filter: "brightness(0.95)",
          }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        flexShrink: 0,
        padding: "16px 24px",
        marginRight: "18px",
        borderRadius: "18px",
        border: `1px solid ${theme.colors.line}`,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.015))",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "4px",
        minWidth: "200px",
        height: "96px",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          color: theme.colors.text,
          fontSize: "17px",
          fontWeight: 700,
          letterSpacing: "-0.2px",
          fontFamily:
            '"Playfair Display", Georgia, "Times New Roman", serif',
        }}
      >
        {brand.name}
      </span>
      <span
        style={{
          color: theme.colors.goldSoft,
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "1.6px",
          textTransform: "uppercase",
        }}
      >
        {brand.industry}
      </span>
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
