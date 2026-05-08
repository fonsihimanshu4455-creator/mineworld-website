import { useEffect, useRef } from "react";

export default function CursorRunaway() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) return;

    const elements = containerRef.current?.querySelectorAll(".runaway-shape");
    if (!elements || elements.length === 0) return;

    const repelDistance = 160;
    const maxMove = 90;

    const handleMouseMove = (e) => {
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elX = rect.left + rect.width / 2;
        const elY = rect.top + rect.height / 2;
        const distX = e.clientX - elX;
        const distY = e.clientY - elY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        if (distance < repelDistance) {
          const force = (repelDistance - distance) / repelDistance;
          const angle = Math.atan2(distY, distX);
          const moveX = -Math.cos(angle) * force * maxMove;
          const moveY = -Math.sin(angle) * force * maxMove;
          el.style.transform = `translate(${moveX}px, ${moveY}px) scale(${
            1 + force * 0.25
          }) rotate(${force * 15}deg)`;
          el.style.transition =
            "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)";
        } else {
          el.style.transform = "translate(0, 0) scale(1) rotate(0deg)";
          el.style.transition =
            "transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="cursor-runaway-container" aria-hidden="true">
      <div className="runaway-shape shape-circle" style={{ top: "12%", left: "6%" }} />
      <div className="runaway-shape shape-square" style={{ top: "25%", left: "88%" }} />
      <div className="runaway-shape shape-ring" style={{ top: "55%", left: "4%" }} />
      <div className="runaway-shape shape-plus" style={{ top: "70%", left: "92%" }}>
        +
      </div>
      <div className="runaway-shape shape-circle-sm" style={{ top: "40%", left: "50%" }} />
      <div className="runaway-shape shape-square-sm" style={{ top: "85%", left: "20%" }} />
      <div className="runaway-shape shape-ring-sm" style={{ top: "15%", left: "70%" }} />
      <div className="runaway-shape shape-dot" style={{ top: "65%", left: "35%" }} />
      <div className="runaway-shape shape-triangle" style={{ top: "35%", left: "15%" }} />
      <div className="runaway-shape shape-circle" style={{ top: "78%", left: "78%" }} />
      <div className="runaway-shape shape-square" style={{ top: "50%", left: "95%" }} />
      <div className="runaway-shape shape-ring" style={{ top: "90%", left: "60%" }} />
    </div>
  );
}
