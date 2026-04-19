import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSiteContent } from "../../context/useSiteContent";
import { openContactModal } from "../../utils/contactActions";

const DISMISS_KEY = "mw_appointment_dismissed_v1";

export default function FloatingAppointment() {
  const { content } = useSiteContent();
  const cfg = content.appointment || {};
  const enabled = cfg.enabled !== false;
  const delayMs = Number.isFinite(cfg.delaySeconds)
    ? cfg.delaySeconds * 1000
    : 3500;
  const label = cfg.label || "Book Appointment";
  const caption = cfg.caption || "Free 15-min call";

  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem(DISMISS_KEY) === "1";
  });

  useEffect(() => {
    if (!enabled || dismissed) return;
    const timer = setTimeout(() => setVisible(true), delayMs);
    return () => clearTimeout(timer);
  }, [enabled, delayMs, dismissed]);

  const handleOpen = () => {
    openContactModal();
  };

  const handleDismiss = (e) => {
    e.stopPropagation();
    setVisible(false);
    window.sessionStorage.setItem(DISMISS_KEY, "1");
    setDismissed(true);
  };

  if (!enabled || dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: "110%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "110%", opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 26,
            delay: 0.05,
          }}
          style={{
            position: "fixed",
            right: "0",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1250,
            pointerEvents: "none",
          }}
          className="mw-appointment-wrap"
        >
          <motion.button
            type="button"
            onClick={handleOpen}
            whileHover={{ x: -6, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            aria-label={label}
            style={{
              pointerEvents: "auto",
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "14px 22px 14px 18px",
              borderTopLeftRadius: "999px",
              borderBottomLeftRadius: "999px",
              border: "1px solid rgba(214,176,96,0.5)",
              borderRight: "none",
              background:
                "linear-gradient(135deg, rgba(214,176,96,0.96), rgba(231,201,138,0.88))",
              color: "#18140F",
              fontFamily: "inherit",
              fontWeight: 800,
              fontSize: "14px",
              letterSpacing: "0.2px",
              cursor: "pointer",
              boxShadow:
                "0 12px 34px rgba(214,176,96,0.35), 0 0 0 1px rgba(255,255,255,0.12) inset",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "rgba(27,20,15,0.18)",
                display: "grid",
                placeItems: "center",
                fontSize: "14px",
                lineHeight: 1,
                flexShrink: 0,
              }}
            >
              ✦
            </span>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                lineHeight: 1.1,
              }}
            >
              <span style={{ fontSize: "14px" }}>{label}</span>
              {caption && (
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    opacity: 0.72,
                    marginTop: "2px",
                    letterSpacing: "0.3px",
                  }}
                >
                  {caption}
                </span>
              )}
            </span>
          </motion.button>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss"
            style={{
              pointerEvents: "auto",
              position: "absolute",
              top: "-8px",
              left: "-8px",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.22)",
              background: "rgba(20,26,40,0.96)",
              color: "rgba(255,255,255,0.75)",
              fontSize: "12px",
              lineHeight: 1,
              cursor: "pointer",
              display: "grid",
              placeItems: "center",
              boxShadow: "0 6px 16px rgba(0,0,0,0.35)",
            }}
          >
            ×
          </button>
        </motion.div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .mw-appointment-wrap {
            top: auto !important;
            transform: none !important;
            bottom: 90px !important;
          }
        }
      `}</style>
    </AnimatePresence>
  );
}
