import { useEffect, useRef, useState } from "react";

const ORBS = [
  {
    id: "gold",
    color: "rgba(255,210,140,0.95)",
    border: "rgba(255,210,140,0.95)",
    glow: "rgba(255,200,130,0.95)",
    size: 80,
    startX: 0.18,
    startY: 0.32,
    floatSpeedX: 0.05,
    floatSpeedY: 0.07,
    floatAmpX: 90,
    floatAmpY: 70,
  },
  {
    id: "amber",
    color: "rgba(217,185,135,0.95)",
    border: "rgba(217,185,135,0.95)",
    glow: "rgba(188,153,102,0.95)",
    size: 110,
    startX: 0.78,
    startY: 0.62,
    floatSpeedX: 0.04,
    floatSpeedY: 0.045,
    floatAmpX: 110,
    floatAmpY: 90,
  },
  {
    id: "cream",
    color: "rgba(255,255,255,0.85)",
    border: "rgba(255,255,255,0.95)",
    glow: "rgba(255,255,255,0.85)",
    size: 60,
    startX: 0.55,
    startY: 0.20,
    floatSpeedX: 0.06,
    floatSpeedY: 0.04,
    floatAmpX: 80,
    floatAmpY: 110,
  },
  {
    id: "warm",
    color: "rgba(255,180,110,0.85)",
    border: "rgba(255,180,110,0.85)",
    glow: "rgba(255,170,90,0.85)",
    size: 70,
    startX: 0.35,
    startY: 0.72,
    floatSpeedX: 0.055,
    floatSpeedY: 0.05,
    floatAmpX: 100,
    floatAmpY: 80,
  },
];

const EVADE_RADIUS = 220;
const EVADE_STRENGTH = 0.85;
const RECOVERY = 0.06;

function CursorEvader() {
  const orbRefs = useRef(ORBS.map(() => ({ current: null })));
  const [enabled] = useState(
    () =>
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(pointer: fine)").matches
  );

  useEffect(() => {
    if (!enabled) return;

    const W = () => window.innerWidth;
    const H = () => window.innerHeight;
    let mouseX = -9999;
    let mouseY = -9999;
    const t0 = performance.now();

    const state = ORBS.map((o) => ({
      baseX: o.startX * W(),
      baseY: o.startY * H(),
      offsetX: 0,
      offsetY: 0,
      pushX: 0,
      pushY: 0,
    }));

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const onResize = () => {
      ORBS.forEach((o, i) => {
        state[i].baseX = o.startX * W();
        state[i].baseY = o.startY * H();
      });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);

    let raf;
    const tick = (t) => {
      const elapsed = (t - t0) / 1000;

      ORBS.forEach((o, i) => {
        const s = state[i];

        s.offsetX = Math.sin(elapsed * o.floatSpeedX * 2 * Math.PI) * o.floatAmpX;
        s.offsetY = Math.cos(elapsed * o.floatSpeedY * 2 * Math.PI) * o.floatAmpY;

        const px = s.baseX + s.offsetX;
        const py = s.baseY + s.offsetY;

        const dx = px - mouseX;
        const dy = py - mouseY;
        const dist = Math.hypot(dx, dy);

        if (dist < EVADE_RADIUS && dist > 0.001) {
          const force = (1 - dist / EVADE_RADIUS) * EVADE_STRENGTH;
          const nx = dx / dist;
          const ny = dy / dist;
          s.pushX += nx * force * 24;
          s.pushY += ny * force * 24;
          const max = 200;
          const ph = Math.hypot(s.pushX, s.pushY);
          if (ph > max) {
            s.pushX = (s.pushX / ph) * max;
            s.pushY = (s.pushY / ph) * max;
          }
        }

        s.pushX *= 1 - RECOVERY;
        s.pushY *= 1 - RECOVERY;

        const finalX = px + s.pushX;
        const finalY = py + s.pushY;

        const node = orbRefs.current[i].current;
        if (node) {
          node.style.transform = `translate3d(${finalX - o.size / 2}px, ${finalY - o.size / 2}px, 0)`;
        }
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 75,
        overflow: "hidden",
        mixBlendMode: "screen",
      }}
    >
      {ORBS.map((o, i) => (
        <div
          key={o.id}
          ref={(el) => {
            orbRefs.current[i].current = el;
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${o.size}px`,
            height: `${o.size}px`,
            borderRadius: "50%",
            background: `radial-gradient(circle at 30% 30%, ${o.color}, transparent 72%)`,
            boxShadow: `0 0 80px ${o.glow}, 0 0 30px ${o.color}`,
            willChange: "transform",
            transition: "box-shadow 0.4s ease",
          }}
        />
      ))}
    </div>
  );
}

export default CursorEvader;
