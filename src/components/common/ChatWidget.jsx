import { useEffect, useRef, useState } from "react";
import { useSiteSettings } from "../../admin/hooks";
import { siteConfig as defaultSiteConfig } from "../../data/siteConfig";
import { trackEvent } from "../../utils/analytics";
import useIsMobile from "../../utils/useIsMobile";

const MAX_TURNS = 18;

function ChatWidget() {
  const settings = useSiteSettings(defaultSiteConfig);
  const isMobile = useIsMobile(900);
  const [open, setOpen] = useState(false);
  const [showPing, setShowPing] = useState(true);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [aiAvailable, setAiAvailable] = useState(true);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const enabled = settings.chat?.enabled !== false;
  const aiMode = settings.chat?.aiMode !== false;
  const greeting = settings.chat?.greeting || "Hey! 👋 How can we help?";
  const quickReplies = Array.isArray(settings.chat?.quickReplies)
    ? settings.chat.quickReplies.filter(Boolean)
    : [];
  const whatsappNumber =
    (settings.contact?.whatsappNumber || "919758850933").replace(/\D/g, "");
  const brandShortName = settings.brand?.shortName || "Mineworld";

  const buttonBottom = isMobile ? 100 : 22;
  const panelBottom = isMobile ? 172 : 96;

  useEffect(() => {
    if (!enabled) return;
    const timer = setTimeout(() => setShowPing(false), 6000);
    return () => clearTimeout(timer);
  }, [enabled]);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, sending]);

  useEffect(() => {
    if (open && !isMobile) {
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [open, isMobile]);

  if (!enabled) return null;

  const openWhatsApp = (text) => {
    const message = encodeURIComponent(
      text || `Hi ${brandShortName}, I have a question.`
    );
    window.open(
      `https://wa.me/${whatsappNumber}?text=${message}`,
      "_blank",
      "noopener"
    );
  };

  const sendToAi = async (history) => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history }),
    });
    if (!res.ok) {
      let payload = null;
      try {
        payload = await res.json();
      } catch {
        // ignore
      }
      const err = new Error(payload?.error || `HTTP ${res.status}`);
      err.fallback = payload?.fallback;
      err.status = res.status;
      throw err;
    }
    return res.json();
  };

  const sendMessage = async (text) => {
    if (!text.trim() || sending) return;
    const userMsg = { role: "user", content: text.trim() };
    const next = [...messages, userMsg].slice(-MAX_TURNS);
    setMessages(next);
    setDraft("");
    setSending(true);
    trackEvent("chat_message_sent", { length: text.length });

    try {
      const data = await sendToAi(next);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "(no reply)" },
      ]);
    } catch (error) {
      const status = error.status || 0;
      if (status === 503 || error.fallback === "whatsapp") {
        setAiAvailable(false);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Hmm — chat is offline right now. Tap any quick reply below to continue on WhatsApp.",
            offline: true,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Couldn't reach the assistant. Mind continuing on WhatsApp? Tap a quick reply below.",
            offline: true,
          },
        ]);
      }
    } finally {
      setSending(false);
    }
  };

  const handleQuickReply = (reply) => {
    trackEvent("chat_quick_reply", { text: reply });
    if (!aiAvailable || !aiMode) {
      openWhatsApp(`Hi ${brandShortName}, ${reply.toLowerCase()}`);
      return;
    }
    sendMessage(reply);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(draft);
  };

  const handleToggle = () => {
    setOpen((p) => !p);
    setShowPing(false);
    if (!open) trackEvent("chat_open", {});
  };

  const showQuickReplies =
    quickReplies.length > 0 && messages.length === 0 && !sending;
  const showFallbackReplies =
    quickReplies.length > 0 && (!aiAvailable || !aiMode) && messages.length > 0;
  const inputDisabled = sending || !aiAvailable || !aiMode;

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
            width: isMobile ? "auto" : "360px",
            height: isMobile ? "auto" : "520px",
            maxHeight: isMobile ? "70vh" : "70vh",
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
              padding: "14px 16px",
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
                  {brandShortName} Assistant
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
                  {!aiMode
                    ? "Continues on WhatsApp"
                    : aiAvailable
                    ? "Online — answers in seconds"
                    : "Offline — try WhatsApp"}
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
            ref={scrollRef}
            style={{
              padding: "16px",
              overflowY: "auto",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Bubble role="assistant">{greeting}</Bubble>

            {messages.map((m, idx) => (
              <Bubble key={idx} role={m.role} offline={m.offline}>
                {m.content}
              </Bubble>
            ))}

            {sending && (
              <div
                style={{
                  alignSelf: "flex-start",
                  padding: "10px 14px",
                  borderRadius: "16px 16px 16px 4px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  gap: "4px",
                  alignItems: "center",
                }}
                aria-label="Assistant typing"
              >
                <Dot delay={0} />
                <Dot delay={0.15} />
                <Dot delay={0.3} />
              </div>
            )}

            {(showQuickReplies || showFallbackReplies) && (
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
                      padding: "8px 12px",
                      borderRadius: "999px",
                      border: "1px solid rgba(214,176,96,0.34)",
                      background: "rgba(214,176,96,0.08)",
                      color: "#F7D58A",
                      fontSize: "12.5px",
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              gap: "8px",
              padding: "10px 12px",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(0,0,0,0.20)",
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={
                !aiMode
                  ? "Tap a quick reply to chat on WhatsApp"
                  : aiAvailable
                  ? "Type your question…"
                  : "Use a quick reply above to continue on WhatsApp"
              }
              maxLength={1500}
              disabled={inputDisabled}
              style={{
                flex: 1,
                padding: "10px 14px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.04)",
                color: "#F5F1E8",
                fontSize: "13.5px",
                outline: "none",
                fontFamily: "inherit",
              }}
            />
            <button
              type="submit"
              disabled={!draft.trim() || inputDisabled}
              aria-label="Send"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "none",
                background:
                  draft.trim() && !inputDisabled
                    ? "linear-gradient(135deg, #D6B060, #E7C98A)"
                    : "rgba(255,255,255,0.08)",
                color: "#18140F",
                cursor:
                  draft.trim() && !inputDisabled ? "pointer" : "not-allowed",
                display: "grid",
                placeItems: "center",
                transition: "background 0.2s ease",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
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
        @keyframes mw-typing {
          0%, 80%, 100% { opacity: 0.3; transform: translateY(0); }
          40% { opacity: 1; transform: translateY(-3px); }
        }
      `}</style>
    </>
  );
}

function Bubble({ role, children, offline }) {
  const isUser = role === "user";
  return (
    <div
      style={{
        alignSelf: isUser ? "flex-end" : "flex-start",
        padding: "10px 14px",
        borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
        background: isUser
          ? "linear-gradient(135deg, #D6B060, #E7C98A)"
          : offline
          ? "rgba(239,68,68,0.10)"
          : "rgba(255,255,255,0.06)",
        color: isUser ? "#18140F" : "#F5F1E8",
        fontSize: "13.5px",
        lineHeight: 1.5,
        maxWidth: "85%",
        border: isUser
          ? "none"
          : offline
          ? "1px solid rgba(239,68,68,0.32)"
          : "1px solid rgba(255,255,255,0.08)",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        fontWeight: isUser ? 600 : 500,
      }}
    >
      {children}
    </div>
  );
}

function Dot({ delay }) {
  return (
    <span
      style={{
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        background: "#E7C98A",
        animation: `mw-typing 1.2s ${delay}s ease-in-out infinite`,
      }}
    />
  );
}

export default ChatWidget;
