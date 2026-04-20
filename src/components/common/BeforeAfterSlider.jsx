import { useCallback, useEffect, useRef, useState } from "react";
import { theme } from "../../styles/theme";

function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "Raw Footage",
  afterLabel = "Mineworld Edit",
  aspectRatio = "16 / 10",
  initialPosition = 52,
}) {
  const containerRef = useRef(null);
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [loaded, setLoaded] = useState({ before: false, after: false });

  const clamp = (val) => Math.max(0, Math.min(100, val));

  const updateFromClientX = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(clamp(pct));
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const onMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      updateFromClientX(clientX);
    };
    const onUp = () => setIsDragging(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [isDragging, updateFromClientX]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => clamp(p - 3));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => clamp(p + 3));
    }
  };

  const ready = loaded.before && loaded.after;

  return (
    <div
      ref={containerRef}
      onMouseDown={(e) => {
        setIsDragging(true);
        updateFromClientX(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        updateFromClientX(e.touches[0].clientX);
      }}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio,
        borderRadius: "22px",
        overflow: "hidden",
        border: `1px solid ${theme.colors.lineStrong}`,
        background: theme.colors.bgCard,
        boxShadow: theme.shadow.deep,
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
        touchAction: "none",
      }}
    >
      {!ready && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            background:
              "linear-gradient(135deg, rgba(20,30,48,0.9), rgba(10,16,28,0.9))",
            color: theme.colors.textSoft,
            fontSize: "13px",
            letterSpacing: "1.4px",
            textTransform: "uppercase",
            zIndex: 6,
          }}
        >
          Loading…
        </div>
      )}

      <img
        src={afterSrc}
        alt={afterLabel}
        loading="lazy"
        onLoad={() => setLoaded((l) => ({ ...l, after: true }))}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
        }}
      />

      <img
        src={beforeSrc}
        alt={beforeLabel}
        loading="lazy"
        onLoad={() => setLoaded((l) => ({ ...l, before: true }))}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
          clipPath: `inset(0 ${100 - position}% 0 0)`,
          WebkitClipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "14px",
          top: "14px",
          padding: "6px 12px",
          borderRadius: "999px",
          background: "rgba(0,0,0,0.58)",
          color: theme.colors.text,
          fontSize: "11px",
          letterSpacing: "1.4px",
          textTransform: "uppercase",
          fontWeight: 700,
          border: "1px solid rgba(255,255,255,0.08)",
          pointerEvents: "none",
          zIndex: 3,
        }}
      >
        {beforeLabel}
      </div>

      <div
        style={{
          position: "absolute",
          right: "14px",
          top: "14px",
          padding: "6px 12px",
          borderRadius: "999px",
          background: "rgba(214,176,96,0.92)",
          color: "#18140F",
          fontSize: "11px",
          letterSpacing: "1.4px",
          textTransform: "uppercase",
          fontWeight: 800,
          boxShadow: "0 6px 16px rgba(214,176,96,0.28)",
          pointerEvents: "none",
          zIndex: 3,
        }}
      >
        {afterLabel}
      </div>

      <div
        role="slider"
        tabIndex={0}
        aria-label="Before after comparison"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        onKeyDown={onKeyDown}
        onMouseDown={(e) => {
          e.stopPropagation();
          setIsDragging(true);
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
          setIsDragging(true);
        }}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${position}%`,
          transform: "translateX(-50%)",
          width: "46px",
          display: "grid",
          placeItems: "center",
          cursor: "ew-resize",
          outline: "none",
          zIndex: 5,
        }}
      >
        <div
          style={{
            width: "2px",
            height: "100%",
            background:
              "linear-gradient(180deg, rgba(214,176,96,0.35), rgba(214,176,96,0.95), rgba(214,176,96,0.35))",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, rgba(214,176,96,1), rgba(214,176,96,0.8))",
            boxShadow: "0 10px 28px rgba(0,0,0,0.35)",
            border: "2px solid rgba(255,255,255,0.22)",
            display: "grid",
            placeItems: "center",
            color: "#18140F",
            fontWeight: 800,
            fontSize: "18px",
          }}
        >
          ⇆
        </div>
      </div>
    </div>
  );
}

export default BeforeAfterSlider;
