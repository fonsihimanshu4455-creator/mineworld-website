import { useEffect, useState } from "react";
import { useSiteSettings } from "../../admin/hooks";
import { siteConfig as defaultSiteConfig } from "../../data/siteConfig";
import { trackEvent } from "../../utils/analytics";
import useIsMobile from "../../utils/useIsMobile";

function ChatWidget() {
  const settings = useSiteSettings(defaultSiteConfig);
  const isMobile = useIsMobile(900);
  const [open, setOpen] = useState(false);
  const [showPing, setShowPing] = useState(true);

  const enabled = settings.chat?.enabled !== false;
  const greeting =
    settings.chat?.greeting || "Hey! 👋 How can we help?";
  const quickReplies = Array.isArray(settings.chat?.quickReplies)
    ? settings.chat.quickReplies.filter(Boolean)
    : [];
  const whatsappNumber =
    (settings.contact?.whatsappNumber || "919758850933").replace(/\D/g, "");
  const brandShortName = settings.brand?.shortName || "Mineworld";

  useEffect(() => {
    if (!enabled) return;
    const timer = setTimeout(() => setShowPing(false), 6000);
    return () => clearTimeout(timer);
  }, [enabled]);

  if (!enabled) return null;

  const handleQuickReply = (text) => {
    trackEvent("chat_quick_reply", { text });
    const message = encodeURIComponent(
      `Hi ${brandShortName}, ${text.toLowerCase().startsWith("i") ? text : `I'm interested — ${text}`}`
    );
    window.open(
      `https://wa.me/${whatsappNumber}?text=${message}`,
      "_blank",
      "noopener"
    );
  };

  const handleToggle = () => {
    setOpen((p) => !p);
    setShowPing(false);
    if (!open) trackEvent("chat_open", {});
  };

  const buttonBottom = isMobile ? 100 : 22;
  const panelBottom = isMobile ? 172 : 96;

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-label="Chat with Mineworld"
          style={{
            position: "fixed",
            right: isMobile ? "10px" : "18px",
            left: isMobile ? "10px" : "auto",
            bottom: `${panelBottom}px`,
            width: isMobile ? "auto" : "340px",
            maxHeight: "70vh",
            zIndex: 1305,
            display: "flex",
            flexDirection: "column",
            borderRadius: "20px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
            background:
              "linear-gradient(180deg, rgba(20,28,46,0.98), rgba(13,19,32,0.98))",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
          }}
        >
          <div
            style={{
              padding: "16px 18px",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
              background:
                "linear-gradient(135deg, rgba(214,176,96,0.18), rgba(214,176,96,0.04))",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #D6B060, #E7C98A)",
                  color: "#18140F",
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 800,
                  fontSize: "14px",
                  letterSpacing: "0.4px",
                }}
              >
                {(brandShortName || "M").charAt(0).toUpperCase()}
              </div>
              <div>
                <div
                  style={{
                    color: "#F5F1E8",
                    fontSize: "14px",
                    fontWeight: 800,
                    lineHeight: 1.1,
                  }}
                >
                  {brandShortName}
                </div>
                <div
                  style={{
                    color: "#86E69C",
                    fontSize: "11px",
                    marginTop: "3px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    fontWeight: 700,
                  }}
                >
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: "#34d399",
                    }}
                  />
                  Online — replies in minutes
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.04)",
                color: "#F5F1E8",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>

          <div
            style={{
              padding: "18px",
              overflowY: "auto",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <div
              style={{
                alignSelf: "flex-start",
                padding: "12px 14px",
                borderRadius: "16px 16px 16px 4px",
                background: "rgba(255,255,255,0.06)",
                color: "#F5F1E8",
                fontSize: "13.5px",
                lineHeight: 1.5,
                maxWidth: "85%",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {greeting}
            </div>

            {quickReplies.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginTop: "4px",
                }}
              >
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleQuickReply(reply)}
                    style={{
                      padding: "9px 14px",
                      borderRadius: "999px",
                      border: "1px solid rgba(214,176,96,0.34)",
                      background: "rgba(214,176,96,0.08)",
                      color: "#F7D58A",
                      fontSize: "12.5px",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.18s ease",
                      fontFamily: "inherit",
                    }}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div
            style={{
              padding: "12px 14px",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              fontSize: "11px",
              color: "rgba(243,239,231,0.5)",
              textAlign: "center",
              letterSpacing: "0.3px",
            }}
          >
            Tap a reply — we'll continue on WhatsApp
          </div>
        </div>
      )}

      <button
        onClick={handleToggle}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        style={{
          position: "fixed",
          right: isMobile ? "14px" : "18px",
          bottom: `${buttonBottom}px`,
          zIndex: 1304,
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          border: "none",
          background:
            "linear-gradient(135deg, rgba(214,176,96,1), rgba(214,176,96,0.85))",
          color: "#18140F",
          boxShadow: "0 18px 40px rgba(214,176,96,0.32)",
          cursor: "pointer",
          display: "grid",
          placeItems: "center",
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {open ? (
          <span style={{ fontSize: "22px", fontWeight: 700 }}>×</span>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        )}

        {showPing && !open && (
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "0px",
              right: "0px",
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              background: "#ef4444",
              border: "2px solid #0b0f1a",
              boxShadow: "0 0 0 0 rgba(239,68,68,0.6)",
              animation: "mw-ping 1.6s ease-out infinite",
            }}
          />
        )}
      </button>

      <style>{`
        @keyframes mw-ping {
          0% { box-shadow: 0 0 0 0 rgba(239,68,68,0.6); }
          70% { box-shadow: 0 0 0 12px rgba(239,68,68,0); }
          100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); }
        }
      `}</style>
    </>
  );
}

export default ChatWidget;
