import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { theme } from "../../styles/theme";

function StarRow({ rating }) {
  if (!rating) return null;
  return (
    <div style={{ display: "flex", gap: "2px", marginBottom: "10px" }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          style={{
            color: n <= rating ? "#E7C98A" : "rgba(255,255,255,0.22)",
            fontSize: "18px",
            lineHeight: 1,
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function TestimonialDetailModal({ open, item, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && item ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2050,
            background: "rgba(6,10,18,0.78)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "620px",
              maxHeight: "92vh",
              overflowY: "auto",
              borderRadius: "24px",
              background:
                "linear-gradient(135deg, rgba(18,28,44,0.98) 0%, rgba(13,21,36,0.98) 100%)",
              border: `1px solid ${theme.colors.lineStrong}`,
              boxShadow: "0 28px 90px rgba(0,0,0,0.5)",
              padding: "30px 28px",
              position: "relative",
            }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                border: `1px solid ${theme.colors.line}`,
                background: "rgba(255,255,255,0.04)",
                color: theme.colors.text,
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              ×
            </button>

            {item.result ? (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 12px",
                  borderRadius: "999px",
                  background: "rgba(214,176,96,0.14)",
                  border: "1px solid rgba(214,176,96,0.3)",
                  color: theme.colors.goldSoft,
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "1.4px",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                {item.result}
              </div>
            ) : null}

            <StarRow rating={item.rating} />

            {item.media ? (
              <div
                style={{
                  marginBottom: "18px",
                  borderRadius: "14px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(0,0,0,0.3)",
                }}
              >
                {item.mediaType === "video" ? (
                  <video
                    src={item.media}
                    controls
                    autoPlay
                    playsInline
                    style={{
                      width: "100%",
                      maxHeight: "360px",
                      display: "block",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <img
                    src={item.media}
                    alt={`${item.author || item.name} testimonial`}
                    style={{
                      width: "100%",
                      maxHeight: "360px",
                      display: "block",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>
            ) : null}

            <p
              style={{
                margin: "0 0 20px",
                color: theme.colors.text,
                fontSize: "18px",
                lineHeight: 1.6,
                fontStyle: "italic",
                fontFamily:
                  '"Playfair Display", Georgia, "Times New Roman", serif',
              }}
            >
              &ldquo;{item.quote}&rdquo;
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                paddingTop: "16px",
                borderTop: `1px solid ${theme.colors.line}`,
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, rgba(214,176,96,0.35), rgba(214,176,96,0.1))",
                  border: "1px solid rgba(214,176,96,0.3)",
                  display: "grid",
                  placeItems: "center",
                  color: theme.colors.text,
                  fontWeight: 800,
                  fontSize: "14px",
                  flexShrink: 0,
                }}
              >
                {(item.author || item.name || "M")
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div>
                <div
                  style={{
                    color: theme.colors.text,
                    fontSize: "15px",
                    fontWeight: 700,
                  }}
                >
                  {item.author || item.name}
                </div>
                <div
                  style={{
                    color: theme.colors.textSoft,
                    fontSize: "12.5px",
                  }}
                >
                  {[item.role, item.location].filter(Boolean).join(" · ")}
                  {item.industry && (item.role || item.location) ? " · " : ""}
                  {item.industry}
                </div>
              </div>
            </div>

            {item.caseStudy ? (
              <Link
                to={`/case-studies/${item.caseStudy}`}
                onClick={onClose}
                style={{
                  display: "inline-block",
                  marginTop: "18px",
                  color: theme.colors.goldSoft,
                  fontSize: "12.5px",
                  fontWeight: 700,
                  letterSpacing: "1.4px",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                Read the full case study →
              </Link>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default TestimonialDetailModal;
