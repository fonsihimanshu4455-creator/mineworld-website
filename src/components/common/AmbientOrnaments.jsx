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
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 20 H40 M20 0 V40 M0 0 L40 40 M40 0 L0 40"
              stroke="rgba(188,153,102,0.12)"
              strokeWidth="0.6"
              fill="none"
            />
            <circle cx="20" cy="20" r="1.5" fill="rgba(188,153,102,0.18)" />
            <circle cx="0" cy="0" r="1" fill="rgba(217,185,135,0.16)" />
            <circle cx="40" cy="0" r="1" fill="rgba(217,185,135,0.16)" />
            <circle cx="0" cy="40" r="1" fill="rgba(217,185,135,0.16)" />
            <circle cx="40" cy="40" r="1" fill="rgba(217,185,135,0.16)" />
          </pattern>

          <symbol id="mw-chain-link" viewBox="0 0 64 28">
            <ellipse
              cx="20"
              cy="14"
              rx="14"
              ry="9"
              stroke="currentColor"
              strokeWidth="1.6"
              fill="none"
            />
            <ellipse
              cx="44"
              cy="14"
              rx="14"
              ry="9"
              stroke="currentColor"
              strokeWidth="1.6"
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
                fill="rgba(188,153,102,0.18)"
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
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <svg
          width="100%"
          height="100%"
          style={{ position: "absolute", inset: 0, opacity: 0.55 }}
        >
          <rect width="100%" height="100%" fill="url(#mw-jaali)" />
        </svg>

        <div
          className="mw-orn mw-orn-chain-1"
          style={{
            position: "absolute",
            top: "8%",
            left: "-6%",
            width: "260px",
            color: "rgba(188,153,102,0.22)",
            transform: "rotate(-22deg)",
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
          className="mw-orn mw-orn-chain-2"
          style={{
            position: "absolute",
            top: "62%",
            right: "-8%",
            width: "320px",
            color: "rgba(217,185,135,0.18)",
            transform: "rotate(28deg)",
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
          className="mw-orn mw-orn-film"
          style={{
            position: "absolute",
            top: "30%",
            left: "5%",
            width: "180px",
            transform: "rotate(-8deg)",
            opacity: 0.5,
          }}
        >
          <svg viewBox="0 0 200 24" width="100%" height="22">
            <use href="#mw-film-strip" />
          </svg>
        </div>

        <div
          className="mw-orn mw-orn-glow-1"
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(188,153,102,0.18), transparent 60%)",
            filter: "blur(40px)",
          }}
        />

        <div
          className="mw-orn mw-orn-glow-2"
          style={{
            position: "absolute",
            bottom: "-12%",
            left: "-6%",
            width: "480px",
            height: "480px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.06), transparent 60%)",
            filter: "blur(40px)",
          }}
        />

        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className={`mw-particle mw-particle-${i % 4}`}
            style={{
              position: "absolute",
              left: `${(i * 7.5 + (i % 3) * 11) % 100}%`,
              top: `${(i * 13 + (i % 5) * 17) % 100}%`,
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              background:
                i % 3 === 0
                  ? "rgba(255,255,255,0.45)"
                  : "rgba(217,185,135,0.55)",
              boxShadow:
                i % 3 === 0
                  ? "0 0 8px rgba(255,255,255,0.5)"
                  : "0 0 10px rgba(217,185,135,0.5)",
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
          zIndex: 0,
          opacity: 0.05,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.4' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.7 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </>
  );
}

export default AmbientOrnaments;
