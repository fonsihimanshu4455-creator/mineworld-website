import { motion } from "framer-motion";
import { whatsappLink } from "../../data/siteConfig";

function FloatingWhatsApp() {
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth <= 768 : false;

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: 0.35 }}
      whileHover={{ y: -4, scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      aria-label="Chat on WhatsApp"
      style={{
        position: "fixed",
        right: isMobile ? "16px" : "24px",
        bottom: isMobile ? "18px" : "24px",
        zIndex: 1200,
        display: "flex",
        alignItems: "center",
        gap: "12px",
        textDecoration: "none",
      }}
    >
      {!isMobile && (
        <div
          style={{
            padding: "12px 16px",
            borderRadius: "999px",
            background: "rgba(10,16,28,0.84)",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: 1,
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 14px 30px rgba(0,0,0,0.28)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            whiteSpace: "nowrap",
          }}
        >
          Chat on WhatsApp
        </div>
      )}

      <div
        style={{
          position: "relative",
          width: isMobile ? "58px" : "64px",
          height: isMobile ? "58px" : "64px",
          borderRadius: "50%",
          background:
            "linear-gradient(180deg, #25D366 0%, #1ebe5b 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow:
            "0 16px 34px rgba(37, 211, 102, 0.35), 0 0 0 8px rgba(37, 211, 102, 0.08)",
          border: "1px solid rgba(255,255,255,0.20)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "-20%",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.14)",
            filter: "blur(20px)",
            pointerEvents: "none",
          }}
        />

        <svg
          viewBox="0 0 32 32"
          width={isMobile ? "28" : "30"}
          height={isMobile ? "28" : "30"}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "relative", zIndex: 1 }}
        >
          <path
            d="M27.1 4.9C24.2 2 20.3 0.4 16.2 0.4C7.7 0.4 0.8 7.3 0.8 15.8C0.8 18.5 1.5 21.2 2.9 23.5L0.4 31.6L8.8 29.2C11 30.4 13.5 31.1 16.1 31.1H16.2C24.7 31.1 31.6 24.2 31.6 15.7C31.6 11.6 30 7.8 27.1 4.9Z"
            fill="white"
          />
          <path
            d="M24.4 20.2C24 19.9 22 18.9 21.6 18.8C21.2 18.6 20.9 18.6 20.6 19C20.3 19.4 19.5 20.3 19.3 20.5C19.1 20.7 18.8 20.8 18.4 20.6C18 20.4 16.7 20 15.2 18.7C14 17.6 13.2 16.2 13 15.8C12.8 15.4 13 15.2 13.2 15C13.4 14.8 13.6 14.5 13.8 14.3C14 14.1 14.1 13.9 14.3 13.6C14.4 13.3 14.4 13.1 14.3 12.8C14.2 12.6 13.3 10.6 12.9 9.7C12.5 8.8 12.1 8.9 11.8 8.9C11.5 8.9 11.2 8.9 10.9 8.9C10.6 8.9 10.1 9 9.7 9.4C9.3 9.8 8.2 10.8 8.2 12.9C8.2 15 9.8 17 10 17.3C10.2 17.6 13.1 22.1 17.6 24C18.7 24.5 19.5 24.8 20.2 25C21.3 25.3 22.3 25.2 23.1 25.1C24 25 25.8 24 26.2 23C26.6 22 26.6 21.1 26.5 20.9C26.4 20.6 25 20.5 24.4 20.2Z"
            fill="#25D366"
          />
        </svg>
      </div>
    </motion.a>
  );
}

export default FloatingWhatsApp;