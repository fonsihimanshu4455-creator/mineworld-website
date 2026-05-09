import { motion } from "framer-motion";

function MagneticButton({
  children,
  secondary = false,
  onDark = false,
  style = {},
}) {
  let background;
  let color;
  let border = "none";
  let boxShadow = "0 10px 28px rgba(184,149,106,0.22)";

  if (secondary) {
    background = "transparent";
    boxShadow = "none";
    if (onDark) {
      border = "1.5px solid rgba(184, 149, 106, 0.5)";
      color = "var(--bg-cream-soft)";
    } else {
      border = "1.5px solid rgba(184, 149, 106, 0.5)";
      color = "var(--accent-navy)";
    }
  } else {
    background = "var(--accent-gold)";
    color = "#1F2D4D";
  }

  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      style={{
        padding: "14px 28px",
        borderRadius: "999px",
        border,
        background,
        color,
        fontWeight: 500,
        letterSpacing: "0.2px",
        cursor: "pointer",
        boxShadow,
        transition:
          "background 0.3s ease, color 0.3s ease, border-color 0.3s ease",
        ...style,
      }}
    >
      {children}
    </motion.button>
  );
}

export default MagneticButton;
