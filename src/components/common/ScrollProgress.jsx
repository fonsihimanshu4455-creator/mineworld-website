import { motion, useScroll, useSpring } from "framer-motion";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.35,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        transformOrigin: "0% 50%",
        scaleX,
        background:
          "linear-gradient(90deg, rgba(214,176,96,0.25) 0%, rgba(214,176,96,1) 40%, rgba(247,213,138,1) 60%, rgba(214,176,96,0.25) 100%)",
        boxShadow: "0 0 18px rgba(214,176,96,0.55), 0 0 2px rgba(214,176,96,0.9)",
        zIndex: 2500,
        pointerEvents: "none",
      }}
    />
  );
}

export default ScrollProgress;
