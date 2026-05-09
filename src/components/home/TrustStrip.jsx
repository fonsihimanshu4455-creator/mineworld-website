import Container from "../common/Container";
import Reveal from "../common/Reveal";
import useIsMobile from "../../utils/useIsMobile";
import { useCollection, useSiteSettings } from "../../admin/hooks";
import { pressLogos as defaultPressLogos } from "../../data/pressLogos";
import { siteConfig as defaultSiteConfig } from "../../data/siteConfig";
import { useSiteList } from "../../hooks/useSiteList";

function mapAdminPress(item) {
  const logoUrl =
    item?.logo?.cloudinary_url ||
    (typeof item?.logo === "string" ? item.logo : null);
  return {
    name: item.name || "",
    logo: logoUrl,
    url: item.link || null,
  };
}

function PressWordmark({ name, style, logo, url }) {
  const isSerif = style === "serif";
  const inner = logo ? (
    <img
      src={logo}
      alt={`${name} logo`}
      loading="lazy"
      decoding="async"
      style={{
        height: "26px",
        width: "auto",
        maxWidth: "160px",
        objectFit: "contain",
        opacity: 0.85,
      }}
    />
  ) : (
    <span
      className="mw-press-wordmark"
      style={{
        color: "var(--text-secondary)",
        fontSize: "16px",
        fontWeight: isSerif ? 600 : 500,
        letterSpacing: isSerif ? "-0.2px" : "0.4px",
        textTransform: isSerif ? "none" : "uppercase",
        fontFamily: isSerif
          ? '"Playfair Display", Georgia, "Times New Roman", serif'
          : '"Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
        whiteSpace: "nowrap",
        transition: "color 0.3s ease",
      }}
    >
      {name}
    </span>
  );

  const wrapStyle = {
    display: "inline-flex",
    alignItems: "center",
    transition: "transform 0.3s ease",
    textDecoration: "none",
    cursor: url ? "pointer" : "default",
  };

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        style={wrapStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-1px)";
          const span = e.currentTarget.querySelector(".mw-press-wordmark");
          if (span) span.style.color = "var(--accent-navy)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          const span = e.currentTarget.querySelector(".mw-press-wordmark");
          if (span) span.style.color = "var(--text-secondary)";
        }}
      >
        {inner}
      </a>
    );
  }
  return <div style={wrapStyle}>{inner}</div>;
}

function AppStoreBadge({ href }) {
  const isLive = href && href !== "#";
  return (
    <a
      href={isLive ? href : "#"}
      onClick={(e) => {
        if (!isLive) e.preventDefault();
      }}
      target={isLive ? "_blank" : undefined}
      rel={isLive ? "noreferrer" : undefined}
      aria-label="Download on the App Store"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 18px",
        borderRadius: "14px",
        background: "#000",
        border: "1px solid rgba(255,255,255,0.18)",
        textDecoration: "none",
        boxShadow: "0 12px 28px rgba(0,0,0,0.32)",
        transition: "transform 0.2s ease, border-color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.borderColor = "rgba(188,153,102,0.45)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width="26"
        height="26"
        fill="#FFFFFF"
        aria-hidden="true"
      >
        <path d="M17.564 12.612c-.022-2.397 1.957-3.55 2.046-3.605-1.114-1.628-2.846-1.851-3.46-1.876-1.471-.149-2.872.866-3.62.866-.747 0-1.901-.844-3.124-.821-1.607.024-3.087.933-3.911 2.371-1.667 2.89-.426 7.16 1.197 9.502.795 1.146 1.74 2.43 2.978 2.385 1.196-.048 1.65-.775 3.097-.775 1.448 0 1.857.775 3.122.751 1.288-.024 2.105-1.165 2.893-2.314.91-1.327 1.286-2.609 1.308-2.674-.029-.013-2.508-.961-2.526-3.81zM15.224 4.99c.66-.802 1.108-1.916 .985-3.024-.952.039-2.108.633-2.79 1.435-.612.711-1.149 1.846-1.005 2.94 1.063.082 2.149-.541 2.81-1.351z" />
      </svg>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
        <span
          style={{
            color: "rgba(255,255,255,0.78)",
            fontSize: "10px",
            letterSpacing: "0.6px",
            fontWeight: 600,
          }}
        >
          Download on the
        </span>
        <span
          style={{
            color: "#FFFFFF",
            fontSize: "18px",
            fontWeight: 700,
            letterSpacing: "-0.3px",
            marginTop: "2px",
          }}
        >
          App Store
        </span>
      </div>
    </a>
  );
}

function PlayStoreBadge({ href }) {
  const isLive = href && href !== "#";
  return (
    <a
      href={isLive ? href : "#"}
      onClick={(e) => {
        if (!isLive) e.preventDefault();
      }}
      target={isLive ? "_blank" : undefined}
      rel={isLive ? "noreferrer" : undefined}
      aria-label="Get it on Google Play"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 18px",
        borderRadius: "14px",
        background: "#000",
        border: "1px solid rgba(255,255,255,0.18)",
        textDecoration: "none",
        boxShadow: "0 12px 28px rgba(0,0,0,0.32)",
        transition: "transform 0.2s ease, border-color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.borderColor = "rgba(188,153,102,0.45)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
      }}
    >
      <svg
        viewBox="0 0 512 512"
        width="26"
        height="26"
        aria-hidden="true"
      >
        <path
          d="M325.3 234.3 104.5 33.3l1.4-.7c8-3.2 17.4-2.8 25.7 1.8l229.5 130.4-35.8 69.5z"
          fill="#32BBFF"
        />
        <path
          d="M104.5 478.7c-7.7-3.4-13.7-9.6-16.6-17.5L88 32.7c1.6-3.4 3.9-6.5 6.9-9.1l229.5 230.7-219.9 224.4z"
          fill="#FFD748"
        />
        <path
          d="M361.1 347.2 131.6 477.5c-8.4 4.7-17.9 5-25.9 1.8l219.6-224.7 35.8 92.6z"
          fill="#FF525C"
        />
        <path
          d="M442.2 290.7l-81.1 56.5-35.8-92.6 35.8-69.5 81.4 46.2c20.6 11.7 20.6 47.4-.3 59.4z"
          fill="#9CFF8C"
        />
      </svg>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
        <span
          style={{
            color: "rgba(255,255,255,0.78)",
            fontSize: "10px",
            letterSpacing: "0.6px",
            fontWeight: 600,
          }}
        >
          GET IT ON
        </span>
        <span
          style={{
            color: "#FFFFFF",
            fontSize: "18px",
            fontWeight: 700,
            letterSpacing: "-0.3px",
            marginTop: "2px",
          }}
        >
          Google Play
        </span>
      </div>
    </a>
  );
}

function TrustStrip() {
  const isMobile = useIsMobile(768);
  const legacyPress = useCollection("pressLogos", defaultPressLogos);
  const cmsPress = useSiteList("trust.featured_in_logos", null);
  const pressLogos = cmsPress ? cmsPress.map(mapAdminPress) : legacyPress;
  const settings = useSiteSettings(defaultSiteConfig);
  const appStoreHref = settings.stores?.appStore || "";
  const playStoreHref = settings.stores?.playStore || "";

  if (!pressLogos.length && !appStoreHref && !playStoreHref) return null;

  return (
    <section
      id="trust"
      style={{
        position: "relative",
        padding: isMobile ? "62px 0" : "92px 0",
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "-30%",
          transform: "translateX(-50%)",
          width: "560px",
          height: "560px",
          borderRadius: "50%",
          background: "rgba(184,149,106,0.06)",
          filter: "blur(140px)",
          pointerEvents: "none",
        }}
      />

      <Container>
        <div style={{ textAlign: "center", marginBottom: isMobile ? "32px" : "44px" }}>
          <Reveal>
            <div
              style={{
                color: "var(--accent-gold)",
                fontSize: "12px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontWeight: 500,
                marginBottom: "12px",
              }}
            >
              As Featured In
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              style={{
                margin: "0 auto",
                fontSize: isMobile ? "24px" : "clamp(26px, 3vw, 34px)",
                color: "var(--text-primary)",
                lineHeight: 1.2,
                letterSpacing: "-0.6px",
                fontFamily:
                  '"Playfair Display", Georgia, "Times New Roman", serif',
                fontWeight: 700,
                maxWidth: "720px",
              }}
            >
              Trusted by founders. Spotted by the press.
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div
            style={{
              padding: isMobile ? "20px 16px" : "16px 32px",
              borderRadius: isMobile ? "20px" : "999px",
              border: "1px solid var(--border-cream)",
              background: "var(--bg-cream-soft)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: isMobile ? "18px 28px" : "44px",
              flexWrap: "wrap",
              boxShadow: "0 8px 24px rgba(15,42,68,0.06)",
            }}
          >
            {pressLogos.map((p) => (
              <PressWordmark
                key={p.name}
                name={p.name}
                style={p.style}
                logo={p.logo}
                url={p.url}
              />
            ))}
          </div>
        </Reveal>

        <div
          style={{
            marginTop: isMobile ? "44px" : "64px",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "20px" : "32px",
            alignItems: "center",
          }}
        >
          <Reveal>
            <div>
              <div
                style={{
                  color: "var(--accent-gold)",
                  fontSize: "12px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  marginBottom: "10px",
                }}
              >
                Apps we ship
              </div>
              <h3
                style={{
                  margin: "0 0 12px",
                  fontSize: isMobile ? "26px" : "clamp(28px, 3.6vw, 38px)",
                  lineHeight: 1.18,
                  letterSpacing: "-0.6px",
                  color: "var(--text-primary)",
                  fontWeight: 700,
                  fontFamily:
                    '"Playfair Display", Georgia, "Times New Roman", serif',
                }}
              >
                Live on iOS &amp; Android — submitted &amp; approved.
              </h3>
              <p
                style={{
                  margin: 0,
                  color: "var(--text-secondary)",
                  fontSize: "15px",
                  lineHeight: 1.7,
                  maxWidth: "520px",
                }}
              >
                We don&rsquo;t hand off a half-built repo. Every app we build
                ships through review and goes live on the App Store and Google
                Play — submission, screenshots, descriptions, and post-launch
                support included.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              style={{
                display: "flex",
                gap: isMobile ? "12px" : "16px",
                flexWrap: "wrap",
                justifyContent: isMobile ? "flex-start" : "flex-end",
              }}
            >
              <AppStoreBadge href={appStoreHref} />
              <PlayStoreBadge href={playStoreHref} />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export default TrustStrip;
