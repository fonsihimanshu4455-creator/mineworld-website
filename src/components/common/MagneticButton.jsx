import { motion } from "framer-motion";
import { theme } from "../../styles/theme";

function MagneticButton({ children, secondary = false, style = {} }) {
  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      style={{
        padding: "14px 26px",
        borderRadius: "999px",
        border: secondary ? `1px solid rgba(231,201,139,0.16)` : "none",
        background: secondary
          ? "rgba(255,255,255,0.02)"
          : "linear-gradient(135deg, #C9A25D, #E7C98B)",
        color: secondary ? theme.colors.text : "#18140F",
        fontWeight: 700,
        letterSpacing: "0.3px",
        cursor: "pointer",
        boxShadow: secondary ? "none" : "0 10px 28px rgba(201,162,93,0.22)",
        ...style,
      }}
    >
      {children}
    </motion.button>
  );
}

export default MagneticButton;