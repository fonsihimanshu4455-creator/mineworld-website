import { motion } from "framer-motion";
import { theme } from "../../styles/theme";

function MagneticButton({ children, secondary = false, style = {}, as = "button", ...rest }) {
  const Comp = motion[as] || motion.button;

  return (
    <Comp
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className={`mw-premium-btn ${secondary ? "is-secondary" : "is-primary"}`}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "14px 26px",
        borderRadius: "999px",
        border: secondary ? `1px solid rgba(231,201,139,0.28)` : "none",
        background: secondary
          ? "rgba(255,255,255,0.04)"
          : "linear-gradient(135deg, #C9A25D, #E7C98B)",
        color: secondary ? theme.colors.text : "#18140F",
        fontWeight: 800,
        letterSpacing: "0.3px",
        cursor: "pointer",
        boxShadow: secondary
          ? "0 4px 14px rgba(0,0,0,0.15)"
          : "0 10px 28px rgba(201,162,93,0.28)",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        fontFamily: "inherit",
        ...style,
      }}
      {...rest}
    >
      <span style={{ position: "relative", zIndex: 2 }}>{children}</span>
    </Comp>
  );
}

export default MagneticButton;