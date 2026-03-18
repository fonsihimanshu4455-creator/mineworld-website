import { motion, AnimatePresence } from "framer-motion";
import { theme } from "../../styles/theme";

const thankYouText = "Thank you";

function SuccessScreen({ show, onClose }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 4000,
            background:
              "radial-gradient(circle at 20% 20%, rgba(214,176,96,0.10), transparent 22%), radial-gradient(circle at 80% 70%, rgba(87,120,210,0.12), transparent 24%), linear-gradient(135deg, #0b1120 0%, #111827 45%, #0f172a 100%)",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          {/* Ambient motion background */}
          <motion.div
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -20, 20, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              background: "rgba(214,176,96,0.16)",
              filter: "blur(90px)",
              top: "10%",
              left: "8%",
              pointerEvents: "none",
            }}
          />

          <motion.div
            animate={{
              x: [0, -26, 18, 0],
              y: [0, 24, -18, 0],
              scale: [1, 1.06, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              width: "360px",
              height: "360px",
              borderRadius: "50%",
              background: "rgba(87,120,210,0.18)",
              filter: "blur(100px)",
              bottom: "8%",
              right: "8%",
              pointerEvents: "none",
            }}
          />

          <motion.div
            animate={{ x: ["-10%", "110%"] }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              top: "28%",
              width: "28%",
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
              filter: "blur(2px)",
              pointerEvents: "none",
            }}
          />

          <motion.div
            animate={{ x: ["110%", "-10%"] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              top: "68%",
              width: "24%",
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, rgba(214,176,96,0.18), transparent)",
              filter: "blur(2px)",
              pointerEvents: "none",
            }}
          />

          {/* Main content */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              textAlign: "center",
              maxWidth: "900px",
              width: "100%",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{
                padding: "40px 24px",
                borderRadius: "30px",
                border: `1px solid ${theme.colors.lineStrong}`,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                boxShadow:
                  "0 28px 90px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              <motion.div
                animate={{ opacity: [0.75, 1, 0.75] }}
                transition={{ duration: 2.6, repeat: Infinity }}
                style={{
                  color: theme.colors.goldSoft,
                  fontSize: "12px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                Inquiry Received
              </motion.div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "2px",
                  minHeight: "82px",
                }}
              >
                {thankYouText.split("").map((char, index) => (
                  <motion.span
                    key={`${char}-${index}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.12,
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                    style={{
                      fontSize: "clamp(42px, 8vw, 86px)",
                      lineHeight: 1,
                      color: "#ffffff",
                      fontFamily:
                        "'Brush Script MT', 'Segoe Script', 'Lucida Handwriting', cursive",
                      textShadow: "0 6px 24px rgba(0,0,0,0.24)",
                      whiteSpace: char === " " ? "pre" : "normal",
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.35 }}
                style={{
                  margin: "18px auto 0",
                  maxWidth: "620px",
                  color: "rgba(255,255,255,0.72)",
                  fontSize: "16px",
                  lineHeight: 1.85,
                }}
              >
                Your inquiry has been received successfully. We’ll review it and
                move forward from here.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.45, duration: 0.3 }}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                style={{
                  marginTop: "28px",
                  padding: "13px 22px",
                  borderRadius: "999px",
                  border: "none",
                  background: theme.colors.goldSoft,
                  color: "#1B1B1B",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 16px 34px rgba(214,176,96,0.24)",
                }}
              >
                Continue
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 0.95, x: 0 }}
              transition={{ delay: 1.7, duration: 0.35 }}
              style={{
                position: "fixed",
                right: "28px",
                bottom: "22px",
                color: theme.colors.goldSoft,
                fontSize: "clamp(18px, 2vw, 24px)",
                fontFamily:
                  "'Brush Script MT', 'Segoe Script', 'Lucida Handwriting', cursive",
                letterSpacing: "0.5px",
                textShadow: "0 4px 16px rgba(0,0,0,0.28)",
              }}
            >
              — Mineworld Production
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SuccessScreen;