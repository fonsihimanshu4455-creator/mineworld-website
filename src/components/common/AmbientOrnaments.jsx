function AmbientOrnaments() {
  return (
    <>
      <svg
        aria-hidden="true"
        width="0"
        height="0"
        style={{ position: "absolute", overflow: "hidden" }}
      >
        <defs>
          <pattern
            id="mw-jaali"
            x="0"
            y="0"
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 28 H56 M28 0 V56 M0 0 L56 56 M56 0 L0 56"
              stroke="rgba(217,185,135,0.30)"
              strokeWidth="0.8"
              fill="none"
            />
            <circle cx="28" cy="28" r="2.2" fill="rgba(217,185,135,0.55)" />
            <circle cx="0" cy="0" r="1.6" fill="rgba(217,185,135,0.45)" />
            <circle cx="56" cy="0" r="1.6" fill="rgba(217,185,135,0.45)" />
            <circle cx="0" cy="56" r="1.6" fill="rgba(217,185,135,0.45)" />
            <circle cx="56" cy="56" r="1.6" fill="rgba(217,185,135,0.45)" />
            <circle
              cx="28"
              cy="28"
              r="6"
              fill="none"
              stroke="rgba(217,185,135,0.20)"
              strokeWidth="0.6"
            />
          </pattern>

          <symbol id="mw-chain-link" viewBox="0 0 64 28">
            <ellipse
              cx="20"
              cy="14"
              rx="14"
              ry="9"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <ellipse
              cx="44"
              cy="14"
              rx="14"
              ry="9"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </symbol>

          <symbol id="mw-film-strip" viewBox="0 0 200 24">
            <rect x="0" y="0" width="200" height="24" fill="none" />
            {Array.from({ length: 10 }).map((_, i) => (
              <rect
                key={i}
                x={i * 20 + 4}
                y="6"
                width="12"
                height="12"
                rx="1.5"
                fill="currentColor"
              />
            ))}
          </symbol>
        </defs>
      </svg>

      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 70,
          mixBlendMode: "soft-light",
          background: `
            radial-gradient(ellipse at 20% 15%, rgba(255,210,150,0.55), transparent 35%),
            radial-gradient(ellipse at 78% 75%, rgba(255,200,140,0.45), transparent 38%),
            radial-gradient(ellipse at 50% 50%, rgba(255,180,120,0.18), transparent 70%)
          `,
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 71,
          mixBlendMode: "overlay",
          opacity: 0.85,
          overflow: "hidden",
        }}
      >
        <svg
          width="100%"
          height="100%"
          style={{ position: "absolute", inset: 0 }}
        >
          <rect width="100%" height="100%" fill="url(#mw-jaali)" />
        </svg>
      </div>

      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 72,
          mixBlendMode: "screen",
          overflow: "hidden",
        }}
      >
        <div
          className="mw-orn mw-orn-chain-1"
          style={{
            position: "absolute",
            top: "6%",
            left: "-6%",
            width: "320px",
            color: "rgba(217,185,135,0.55)",
            transform: "rotate(-22deg)",
          }}
        >
          <svg viewBox="0 0 380 28" width="100%" height="44">
            <use href="#mw-chain-link" x="0" />
            <use href="#mw-chain-link" x="48" />
            <use href="#mw-chain-link" x="96" />
            <use href="#mw-chain-link" x="144" />
            <use href="#mw-chain-link" x="192" />
            <use href="#mw-chain-link" x="240" />
            <use href="#mw-chain-link" x="288" />
          </svg>
        </div>

        <div
          className="mw-orn mw-orn-chain-2"
          style={{
            position: "absolute",
            top: "44%",
            right: "-8%",
            width: "360px",
            color: "rgba(217,185,135,0.45)",
            transform: "rotate(28deg)",
          }}
        >
          <svg viewBox="0 0 420 28" width="100%" height="46">
            <use href="#mw-chain-link" x="0" />
            <use href="#mw-chain-link" x="48" />
            <use href="#mw-chain-link" x="96" />
            <use href="#mw-chain-link" x="144" />
            <use href="#mw-chain-link" x="192" />
            <use href="#mw-chain-link" x="240" />
            <use href="#mw-chain-link" x="288" />
            <use href="#mw-chain-link" x="336" />
          </svg>
        </div>

        <div
          className="mw-orn mw-orn-chain-3"
          style={{
            position: "absolute",
            top: "76%",
            left: "12%",
            width: "260px",
            color: "rgba(255,255,255,0.35)",
            transform: "rotate(-12deg)",
          }}
        >
          <svg viewBox="0 0 320 28" width="100%" height="40">
            <use href="#mw-chain-link" x="0" />
            <use href="#mw-chain-link" x="48" />
            <use href="#mw-chain-link" x="96" />
            <use href="#mw-chain-link" x="144" />
            <use href="#mw-chain-link" x="192" />
            <use href="#mw-chain-link" x="240" />
          </svg>
        </div>

        <div
          className="mw-orn mw-orn-film"
          style={{
            position: "absolute",
            top: "26%",
            left: "5%",
            width: "200px",
            transform: "rotate(-8deg)",
            color: "rgba(217,185,135,0.55)",
          }}
        >
          <svg viewBox="0 0 200 24" width="100%" height="24">
            <use href="#mw-film-strip" />
          </svg>
        </div>

        <div
          className="mw-orn mw-orn-film mw-orn-film-2"
          style={{
            position: "absolute",
            bottom: "12%",
            right: "6%",
            width: "240px",
            transform: "rotate(14deg)",
            color: "rgba(255,255,255,0.40)",
          }}
        >
          <svg viewBox="0 0 200 24" width="100%" height="26">
            <use href="#mw-film-strip" />
          </svg>
        </div>

        <div
          className="mw-orn mw-orn-glow-1"
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: "560px",
            height: "560px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,200,130,0.45), transparent 60%)",
            filter: "blur(40px)",
          }}
        />

        <div
          className="mw-orn mw-orn-glow-2"
          style={{
            position: "absolute",
            bottom: "-12%",
            left: "-6%",
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.20), transparent 60%)",
            filter: "blur(40px)",
          }}
        />

        {Array.from({ length: 22 }).map((_, i) => (
          <span
            key={i}
            className={`mw-particle mw-particle-${i % 4}`}
            style={{
              position: "absolute",
              left: `${(i * 7.5 + (i % 3) * 11) % 100}%`,
              top: `${(i * 13 + (i % 5) * 17) % 100}%`,
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background:
                i % 3 === 0
                  ? "rgba(255,255,255,0.85)"
                  : "rgba(255,210,140,0.95)",
              boxShadow:
                i % 3 === 0
                  ? "0 0 12px rgba(255,255,255,0.9)"
                  : "0 0 14px rgba(255,210,140,0.95)",
              animationDelay: `${(i * 0.4) % 7}s`,
            }}
          />
        ))}
      </div>

      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 73,
          opacity: 0.06,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.4' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.7 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </>
  );
}

export default AmbientOrnaments;
