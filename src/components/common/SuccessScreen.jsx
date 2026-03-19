import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { theme } from "../../styles/theme";

const thankYouText = "Thank you";

function SuccessScreen({ show, onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!show) {
      setIsClosing(false);
      return;
    }

    setIsClosing(false);

    const autoTimer = setTimeout(() => {
      triggerClose();
    }, 5600);

    return () => clearTimeout(autoTimer);
  }, [show]);

  const triggerClose = () => {
    if (isClosing) return;

    setIsClosing(true);

    setTimeout(() => {
      setIsClosing(false);
      onClose?.();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isClosing ? 1 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 4000,
            background:
              "radial-gradient(circle at 18% 20%, rgba(214,176,96,0.12), transparent 22%), radial-gradient(circle at 80% 72%, rgba(87,120,210,0.14), transparent 26%), linear-gradient(135deg, #09101d 0%, #101827 42%, #0d1424 100%)",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <motion.div
            animate={{
              x: [0, 28, -18, 0],
              y: [0, -18, 18, 0],
              scale: [1, 1.08, 1],
              opacity: isClosing ? 0.18 : 1,
            }}
            transition={{
              duration: isClosing ? 1.2 : 9,
              repeat: isClosing ? 0 : Infinity,
              ease: isClosing ? [0.4, 0, 0.2, 1] : "easeInOut",
            }}
            style={{
              position: "absolute",
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              background: "rgba(214,176,96,0.18)",
              filter: "blur(96px)",
              top: "8%",
              left: "6%",
              pointerEvents: "none",
            }}
          />

          <motion.div
            animate={{
              x: [0, -26, 18, 0],
              y: [0, 24, -18, 0],
              scale: [1, 1.06, 1],
              opacity: isClosing ? 0.18 : 1,
            }}
            transition={{
              duration: isClosing ? 1.2 : 10,
              repeat: isClosing ? 0 : Infinity,
              ease: isClosing ? [0.4, 0, 0.2, 1] : "easeInOut",
            }}
            style={{
              position: "absolute",
              width: "360px",
              height: "360px",
              borderRadius: "50%",
              background: "rgba(87,120,210,0.18)",
              filter: "blur(108px)",
              bottom: "8%",
              right: "8%",
              pointerEvents: "none",
            }}
          />

          <motion.div
            animate={{
              x: isClosing ? "50%" : ["-10%", "110%"],
              opacity: isClosing ? 0.1 : 1,
            }}
            transition={{
              duration: isClosing ? 1 : 5.5,
              repeat: isClosing ? 0 : Infinity,
              ease: isClosing ? "easeOut" : "linear",
            }}
            style={{
              position: "absolute",
              top: "28%",
              width: "30%",
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
              filter: "blur(2px)",
              pointerEvents: "none",
            }}
          />

          <motion.div
            animate={{
              x: isClosing ? "50%" : ["110%", "-10%"],
              opacity: isClosing ? 0.1 : 1,
            }}
            transition={{
              duration: isClosing ? 1 : 7,
              repeat: isClosing ? 0 : Infinity,
              ease: isClosing ? "easeOut" : "linear",
            }}
            style={{
              position: "absolute",
              top: "68%",
              width: "26%",
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, rgba(214,176,96,0.18), transparent)",
              filter: "blur(2px)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 2,
              textAlign: "center",
              maxWidth: "940px",
              width: "100%",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={
                isClosing
                  ? {
                      opacity: 0.08,
                      scale: 0.28,
                      width: "180px",
                      minHeight: "58px",
                      borderRadius: "999px",
                      filter: "blur(10px)",
                    }
                  : {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      width: "100%",
                      minHeight: "auto",
                      borderRadius: "32px",
                      filter: "blur(0px)",
                    }
              }
              transition={{
                duration: isClosing ? 1.25 : 0.45,
                ease: isClosing ? [0.22, 1, 0.36, 1] : [0.22, 1, 0.36, 1],
              }}
              style={{
                position: "relative",
                margin: "0 auto",
                padding: "44px 24px",
                border: `1px solid ${theme.colors.lineStrong}`,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.02))",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow:
                  "0 32px 100px rgba(0,0,0,0.46), inset 0 1px 0 rgba(255,255,255,0.05)",
                overflow: "hidden",
                transformOrigin: "center center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-70px",
                  right: "-30px",
                  width: "180px",
                  height: "180px",
                  borderRadius: "50%",
                  background: "rgba(214,176,96,0.12)",
                  filter: "blur(70px)",
                  pointerEvents: "none",
                  opacity: isClosing ? 0 : 1,
                  transition: "opacity 0.5s ease",
                }}
              />

              <motion.div
                animate={{
                  opacity: isClosing ? 0 : [0.76, 1, 0.76],
                }}
                transition={{
                  duration: isClosing ? 0.45 : 2.6,
                  repeat: isClosing ? 0 : Infinity,
                }}
                style={{
                  color: theme.colors.goldSoft,
                  fontSize: "12px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                  fontWeight: 700,
                }}
              >
                Inquiry Received Successfully
              </motion.div>

              <motion.div
                animate={{
                  opacity: isClosing ? 0 : 1,
                  scale: isClosing ? 0.86 : 1,
                }}
                transition={{ duration: isClosing ? 0.42 : 0.22 }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "2px",
                  minHeight: "92px",
                }}
              >
                {thankYouText.split("").map((char, index) => (
                  <motion.span
                    key={`${char}-${index}`}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{
                      opacity: isClosing ? 0 : 1,
                      y: isClosing ? 12 : 0,
                    }}
                    transition={{
                      delay: isClosing ? 0 : index * 0.12,
                      duration: isClosing ? 0.35 : 0.32,
                      ease: "easeOut",
                    }}
                    style={{
                      fontSize: "clamp(46px, 8vw, 92px)",
                      lineHeight: 1,
                      color: "#ffffff",
                      fontFamily:
                        "'Brush Script MT', 'Segoe Script', 'Lucida Handwriting', cursive",
                      textShadow: "0 8px 28px rgba(0,0,0,0.28)",
                      whiteSpace: char === " " ? "pre" : "normal",
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scaleX: 0.8 }}
                animate={{
                  opacity: isClosing ? 0 : 1,
                  scaleX: isClosing ? 0.2 : 1,
                }}
                transition={{
                  delay: isClosing ? 0 : 1.05,
                  duration: isClosing ? 0.4 : 0.3,
                }}
                style={{
                  width: "min(240px, 60%)",
                  height: "1px",
                  margin: "18px auto 0",
                  background:
                    "linear-gradient(90deg, transparent, rgba(214,176,96,0.9), transparent)",
                }}
              />

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: isClosing ? 0 : 1,
                  y: isClosing ? 14 : 0,
                }}
                transition={{
                  delay: isClosing ? 0 : 1.18,
                  duration: isClosing ? 0.4 : 0.28,
                }}
                style={{
                  margin: "20px auto 0",
                  maxWidth: "650px",
                  color: "rgba(255,255,255,0.74)",
                  fontSize: "16px",
                  lineHeight: 1.9,
                }}
              >
                Your inquiry has reached Mineworld Production successfully.
                We’ll review the details and move the conversation forward with
                clarity and intent.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: isClosing ? 0 : 1,
                  y: isClosing ? 16 : 0,
                  scale: isClosing ? 0.84 : 1,
                }}
                transition={{
                  delay: isClosing ? 0 : 1.5,
                  duration: isClosing ? 0.42 : 0.24,
                }}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={triggerClose}
                style={{
                  marginTop: "30px",
                  padding: "14px 24px",
                  borderRadius: "999px",
                  border: "none",
                  background:
                    "linear-gradient(180deg, rgba(214,176,96,1), rgba(214,176,96,0.92))",
                  color: "#1B1B1B",
                  fontSize: "15px",
                  fontWeight: 800,
                  cursor: "pointer",
                  boxShadow: "0 18px 36px rgba(214,176,96,0.26)",
                }}
              >
                Continue
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{
                opacity: isClosing ? 0 : 0.95,
                x: isClosing ? 16 : 0,
              }}
              transition={{
                delay: isClosing ? 0 : 1.72,
                duration: isClosing ? 0.4 : 0.28,
              }}
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

          <motion.div
            animate={{ opacity: isClosing ? 0 : 1 }}
            transition={{
              duration: isClosing ? 0.6 : 0.2,
              delay: isClosing ? 1.05 : 0,
            }}
            style={{
              position: "absolute",
              inset: 0,
              background: "transparent",
              pointerEvents: "none",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SuccessScreen;