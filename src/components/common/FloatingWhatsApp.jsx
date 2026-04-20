import { motion } from "framer-motion";
import { theme } from "../../styles/theme";
import { siteConfig as defaultSiteConfig } from "../../data/siteConfig";
import { trackWhatsAppClick } from "../../utils/contactActions";
import { useSiteSettings } from "../../admin/hooks";

function FloatingWhatsApp() {
  const settings = useSiteSettings(defaultSiteConfig);
  const whatsappNumber =
    settings?.contact?.whatsappNumber || "919758850933";

  const message = encodeURIComponent(
    "Hi Mineworld Production, I want to discuss a project."
  );

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackWhatsAppClick("floating")}
      aria-label="Chat with Mineworld on WhatsApp"
      initial={{ opacity: 0, scale: 0.9, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{
        position: "fixed",
        right: "18px",
        bottom: "18px",
        zIndex: 1300,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        textDecoration: "none",
      }}
    >
      <div
        style={{
          background: "rgba(18, 24, 38, 0.92)",
          color: theme.colors.text,
          border: `1px solid ${theme.colors.line}`,
          borderRadius: "999px",
          padding: "10px 14px",
          fontSize: "13px",
          fontWeight: 700,
          boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        Chat on WhatsApp
      </div>

      <div
        style={{
          width: "54px",
          height: "54px",
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          background: "#25D366",
          boxShadow: "0 14px 30px rgba(37, 211, 102, 0.35)",
          border: "2px solid rgba(255,255,255,0.16)",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="28"
          height="28"
          fill="white"
          aria-hidden="true"
        >
          <path d="M19.11 17.34c-.27-.13-1.58-.78-1.82-.87-.24-.09-.42-.13-.6.13-.18.27-.69.87-.85 1.05-.16.18-.31.2-.58.07-.27-.13-1.12-.41-2.13-1.3-.79-.7-1.32-1.56-1.48-1.82-.16-.27-.02-.41.12-.54.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.33-.02-.47-.07-.13-.6-1.45-.82-1.98-.22-.53-.44-.46-.6-.47h-.51c-.18 0-.47.07-.71.33-.24.27-.93.91-.93 2.22s.96 2.58 1.09 2.76c.13.18 1.88 2.87 4.56 4.03.64.27 1.14.43 1.53.55.64.2 1.22.17 1.68.1.51-.08 1.58-.64 1.8-1.25.22-.62.22-1.14.16-1.25-.07-.11-.24-.18-.51-.31z" />
          <path d="M16.01 3.2c-7.07 0-12.8 5.72-12.8 12.78 0 2.26.59 4.46 1.71 6.39L3 29l6.84-1.79a12.8 12.8 0 0 0 6.17 1.57h.01c7.06 0 12.79-5.73 12.79-12.79 0-3.43-1.34-6.65-3.77-9.07A12.7 12.7 0 0 0 16.01 3.2zm0 23.42h-.01a10.65 10.65 0 0 1-5.43-1.49l-.39-.23-4.06 1.06 1.08-3.96-.25-.41a10.6 10.6 0 0 1-1.63-5.61c0-5.88 4.79-10.67 10.69-10.67 2.85 0 5.52 1.11 7.54 3.12a10.58 10.58 0 0 1 3.13 7.54c0 5.89-4.79 10.68-10.67 10.68z" />
        </svg>
      </div>
    </motion.a>
  );
}

export default FloatingWhatsApp;