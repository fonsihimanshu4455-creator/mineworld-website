import { useEffect, useRef, useState } from "react";

const HOVER_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]';
const TEXT_SELECTOR = 'input[type="text"], input[type="email"], textarea';

function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const [variant, setVariant] = useState("default");
  const [enabled] = useState(
    () =>
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(pointer: fine)").matches
  );

  useEffect(() => {
    if (!enabled) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(animate);
    };

    const onPointerOver = (e) => {
      const t = e.target;
      if (!t || !t.closest) return;
      if (t.closest(TEXT_SELECTOR)) {
        setVariant("text");
      } else if (t.closest(HOVER_SELECTOR)) {
        setVariant("hover");
      } else {
        setVariant("default");
      }
    };

    const onMouseDown = () => setVariant((v) => (v === "hover" ? "click" : v));
    const onMouseUp = () =>
      setVariant((v) => (v === "click" ? "hover" : v));
    const onMouseLeave = () => {
      if (ringRef.current) ringRef.current.style.opacity = "0";
      if (dotRef.current) dotRef.current.style.opacity = "0";
    };
    const onMouseEnter = () => {
      if (ringRef.current) ringRef.current.style.opacity = "1";
      if (dotRef.current) dotRef.current.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("pointerover", onPointerOver);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  const ringSize =
    variant === "hover" ? 56 : variant === "click" ? 38 : variant === "text" ? 24 : 36;
  const ringBorder =
    variant === "hover"
      ? "2px solid rgba(217, 185, 135, 0.95)"
      : variant === "text"
      ? "2px solid rgba(217, 185, 135, 0.95)"
      : "1.5px solid rgba(217, 185, 135, 0.55)";
  const ringBg =
    variant === "hover"
      ? "rgba(188, 153, 102, 0.10)"
      : variant === "click"
      ? "rgba(188, 153, 102, 0.28)"
      : "transparent";
  const dotSize = variant === "text" ? 2 : variant === "hover" ? 6 : 4;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          borderRadius: variant === "text" ? "3px" : "50%",
          border: ringBorder,
          background: ringBg,
          pointerEvents: "none",
          zIndex: 99999,
          transition:
            "width 0.22s ease, height 0.22s ease, border 0.22s ease, background 0.22s ease, border-radius 0.22s ease, opacity 0.2s ease",
          willChange: "transform, width, height",
          mixBlendMode: "normal",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          borderRadius: "50%",
          background: "#BC9966",
          boxShadow: "0 0 12px rgba(188,153,102,0.85)",
          pointerEvents: "none",
          zIndex: 100000,
          transition: "width 0.18s ease, height 0.18s ease, opacity 0.2s ease",
          willChange: "transform",
        }}
      />
    </>
  );
}

export default CustomCursor;
