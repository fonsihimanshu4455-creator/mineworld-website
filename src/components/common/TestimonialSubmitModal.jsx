import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { theme } from "../../styles/theme";
import { contentStore } from "../../admin/contentStore";
import { trackEvent } from "../../utils/analytics";
import useIsMobile from "../../utils/useIsMobile";

const MAX_IMAGE_BYTES = 500 * 1024;
const MAX_VIDEO_BYTES = 900 * 1024;

function randomId() {
  return (
    Date.now().toString(36) + Math.random().toString(36).slice(2, 9)
  );
}

function StarPicker({ value, onChange }) {
  return (
    <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(value === n ? 0 : n)}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "24px",
            color: n <= value ? "#E7C98A" : "rgba(255,255,255,0.22)",
            lineHeight: 1,
            padding: "2px",
          }}
        >
          ★
        </button>
      ))}
      <span
        style={{
          color: "rgba(243,239,231,0.5)",
          fontSize: "12px",
          marginLeft: "8px",
        }}
      >
        {value ? `${value}/5` : "tap a star"}
      </span>
    </div>
  );
}

function TestimonialSubmitModal({ open, onClose }) {
  const [form, setForm] = useState({
    name: "",
    quote: "",
    role: "",
    location: "",
    rating: 0,
    media: "",
    mediaType: "",
  });
  const [mediaError, setMediaError] = useState("");
  const [formError, setFormError] = useState("");
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef(null);
  const isMobile = useIsMobile(640);

  useEffect(() => {
    if (!open) {
      setForm({
        name: "",
        quote: "",
        role: "",
        location: "",
        rating: 0,
        media: "",
        mediaType: "",
      });
      setMediaError("");
      setFormError("");
      setSending(false);
      setSubmitted(false);
    }
  }, [open]);

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

  const handleFile = (file) => {
    if (!file) return;
    const isVideo = file.type.startsWith("video/");
    const limit = isVideo ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;
    if (file.size > limit) {
      setMediaError(
        `File is ${(file.size / 1024).toFixed(0)}KB. Max ${
          isVideo ? "900KB for video" : "500KB for images"
        }. Try a smaller file or skip this — it's optional.`
      );
      return;
    }
    setMediaError("");
    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        media: reader.result || "",
        mediaType: isVideo ? "video" : "image",
      }));
    };
    reader.onerror = () => setMediaError("Could not read the file.");
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!form.name.trim() || !form.quote.trim()) {
      setFormError("Please fill in your name and the review.");
      return;
    }
    if (!form.rating || form.rating < 1 || form.rating > 5) {
      setFormError("Please pick a star rating (1 to 5).");
      return;
    }
    setSending(true);
    try {
      const existing = contentStore.get("userSubmissions");
      const list = Array.isArray(existing) ? existing : [];
      const item = {
        id: randomId(),
        status: "pending",
        submittedAt: new Date().toISOString(),
        name: form.name.trim().slice(0, 80),
        quote: form.quote.trim().slice(0, 600),
        role: form.role.trim().slice(0, 80),
        location: form.location.trim().slice(0, 80),
        rating: Number(form.rating) || 0,
        media: form.media || "",
        mediaType: form.mediaType || "",
      };
      contentStore.set("userSubmissions", [item, ...list]);
      trackEvent("testimonial_submit", { hasMedia: Boolean(item.media) });
      setSubmitted(true);
    } catch (err) {
      setFormError(err?.message || "Something went wrong. Try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2100,
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
              maxWidth: submitted ? "520px" : "580px",
              maxHeight: "92vh",
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: isMobile ? "20px" : "24px",
              background:
                "linear-gradient(135deg, rgba(18,28,44,0.98) 0%, rgba(13,21,36,0.98) 100%)",
              border: `1px solid ${theme.colors.lineStrong}`,
              boxShadow: "0 28px 90px rgba(0,0,0,0.5)",
              padding: isMobile ? "24px 20px" : "30px 28px",
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

            {submitted ? (
              <div style={{ textAlign: "center", padding: "24px 8px" }}>
                <div
                  style={{
                    width: "68px",
                    height: "68px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, rgba(214,176,96,0.95), rgba(231,201,139,0.85))",
                    display: "grid",
                    placeItems: "center",
                    margin: "0 auto 18px",
                    color: "#18140F",
                    fontSize: "30px",
                    fontWeight: 900,
                    boxShadow: "0 14px 34px rgba(214,176,96,0.28)",
                  }}
                >
                  ✓
                </div>
                <div
                  style={{
                    color: theme.colors.goldSoft,
                    fontSize: "11px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    marginBottom: "10px",
                  }}
                >
                  Received, thank you
                </div>
                <h3
                  style={{
                    margin: "0 0 12px",
                    color: theme.colors.text,
                    fontSize: "24px",
                    lineHeight: 1.25,
                    fontWeight: 800,
                    letterSpacing: "-0.4px",
                    fontFamily:
                      '"Playfair Display", Georgia, "Times New Roman", serif',
                  }}
                >
                  Your review will be live within 24 hours.
                </h3>
                <p
                  style={{
                    margin: "0 0 24px",
                    color: theme.colors.textSoft,
                    fontSize: "14.5px",
                    lineHeight: 1.85,
                  }}
                >
                  We review each submission before publishing so the wall stays
                  authentic. If anything needs clarification, we'll reach out
                  over WhatsApp.
                </p>
                <button
                  onClick={onClose}
                  style={{
                    padding: "12px 22px",
                    borderRadius: "999px",
                    border: "none",
                    background: "linear-gradient(135deg, #D6B060, #E7C98A)",
                    color: "#18140F",
                    fontWeight: 800,
                    fontSize: "14px",
                    cursor: "pointer",
                    boxShadow: "0 10px 24px rgba(214,176,96,0.28)",
                  }}
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "grid", gap: "14px" }}>
                <div>
                  <div
                    style={{
                      color: theme.colors.goldSoft,
                      fontSize: "11px",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      marginBottom: "10px",
                    }}
                  >
                    Share your experience
                  </div>
                  <h3
                    style={{
                      margin: "0 0 6px",
                      color: theme.colors.text,
                      fontSize: "24px",
                      lineHeight: 1.2,
                      fontWeight: 800,
                      letterSpacing: "-0.4px",
                      fontFamily:
                        '"Playfair Display", Georgia, "Times New Roman", serif',
                    }}
                  >
                    Add your review.
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      color: theme.colors.textSoft,
                      fontSize: "13.5px",
                      lineHeight: 1.7,
                    }}
                  >
                    Only Name and Review are required. Everything else is
                    optional.
                  </p>
                </div>

                <Input
                  label="Your Name *"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  placeholder="e.g. Priya Malhotra"
                  maxLength={80}
                />

                <TextArea
                  label="Your Review *"
                  value={form.quote}
                  onChange={(v) => setForm({ ...form, quote: v })}
                  placeholder="Share your experience — what stood out, what you got, how it felt."
                  maxLength={600}
                  rows={4}
                />

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: "12px",
                  }}
                >
                  <Input
                    label="Role (optional)"
                    value={form.role}
                    onChange={(v) => setForm({ ...form, role: v })}
                    placeholder="e.g. Clinic Owner"
                    maxLength={80}
                  />
                  <Input
                    label="Location (optional)"
                    value={form.location}
                    onChange={(v) => setForm({ ...form, location: v })}
                    placeholder="e.g. South Delhi"
                    maxLength={80}
                  />
                </div>

                <div>
                  <Label>Rating *</Label>
                  <StarPicker
                    value={form.rating}
                    onChange={(v) => setForm({ ...form, rating: v })}
                  />
                </div>

                <div>
                  <Label>Photo or Video (optional)</Label>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "rgba(243,239,231,0.55)",
                      marginBottom: "8px",
                      lineHeight: 1.6,
                    }}
                  >
                    Max 500KB for photo, 900KB for video. Skip if you don't
                    want to attach anything.
                  </div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => handleFile(e.target.files?.[0])}
                    style={{ display: "none" }}
                  />
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: "1px solid rgba(214,176,96,0.45)",
                        background: "rgba(214,176,96,0.12)",
                        color: "#E7C98A",
                        fontWeight: 700,
                        fontSize: "13px",
                        cursor: "pointer",
                      }}
                    >
                      {form.media ? "Replace file" : "Choose file"}
                    </button>
                    {form.media ? (
                      <button
                        type="button"
                        onClick={() =>
                          setForm({ ...form, media: "", mediaType: "" })
                        }
                        style={{
                          padding: "10px 12px",
                          borderRadius: "10px",
                          border: `1px solid ${theme.colors.line}`,
                          background: "rgba(255,255,255,0.03)",
                          color: theme.colors.text,
                          fontWeight: 700,
                          fontSize: "13px",
                          cursor: "pointer",
                        }}
                      >
                        Clear
                      </button>
                    ) : null}
                  </div>
                  {mediaError ? (
                    <div
                      style={{
                        color: "#ff9e9e",
                        fontSize: "12px",
                        marginTop: "8px",
                        lineHeight: 1.5,
                      }}
                    >
                      {mediaError}
                    </div>
                  ) : null}
                  {form.media ? (
                    <div
                      style={{
                        marginTop: "10px",
                        padding: "8px",
                        borderRadius: "12px",
                        border: "1px solid rgba(255,255,255,0.08)",
                        background: "rgba(0,0,0,0.25)",
                        maxWidth: "240px",
                      }}
                    >
                      {form.mediaType === "video" ? (
                        <video
                          src={form.media}
                          controls
                          muted
                          style={{
                            maxWidth: "100%",
                            maxHeight: "160px",
                            borderRadius: "8px",
                            display: "block",
                          }}
                        />
                      ) : (
                        <img
                          src={form.media}
                          alt="preview"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "160px",
                            borderRadius: "8px",
                            display: "block",
                          }}
                        />
                      )}
                    </div>
                  ) : null}
                </div>

                {formError ? (
                  <div
                    style={{
                      color: "#ff9e9e",
                      fontSize: "13px",
                      lineHeight: 1.55,
                    }}
                  >
                    {formError}
                  </div>
                ) : null}

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "6px",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    type="submit"
                    disabled={sending}
                    style={{
                      padding: "13px 22px",
                      borderRadius: "999px",
                      border: "none",
                      background: sending
                        ? "rgba(214,176,96,0.5)"
                        : "linear-gradient(135deg, #D6B060, #E7C98A)",
                      color: "#18140F",
                      fontWeight: 800,
                      fontSize: "14px",
                      cursor: sending ? "not-allowed" : "pointer",
                      boxShadow: "0 10px 24px rgba(214,176,96,0.28)",
                    }}
                  >
                    {sending ? "Submitting…" : "Submit for review"}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    style={{
                      padding: "13px 18px",
                      borderRadius: "999px",
                      border: `1px solid ${theme.colors.line}`,
                      background: "rgba(255,255,255,0.03)",
                      color: theme.colors.text,
                      fontWeight: 700,
                      fontSize: "13.5px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>

                <div
                  style={{
                    color: "rgba(243,239,231,0.45)",
                    fontSize: "11.5px",
                    lineHeight: 1.65,
                    marginTop: "4px",
                  }}
                >
                  Reviews appear within 24 hours after a quick authenticity check.
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Label({ children }) {
  return (
    <div
      style={{
        fontSize: "11.5px",
        letterSpacing: "1.4px",
        textTransform: "uppercase",
        color: "#E7C98A",
        fontWeight: 700,
        marginBottom: "8px",
      }}
    >
      {children}
    </div>
  );
}

function Input({ label, value, onChange, placeholder, maxLength }) {
  return (
    <label style={{ display: "block" }}>
      <Label>{label}</Label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        style={inputStyle}
      />
    </label>
  );
}

function TextArea({ label, value, onChange, placeholder, maxLength, rows }) {
  return (
    <label style={{ display: "block" }}>
      <Label>{label}</Label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        style={{
          ...inputStyle,
          resize: "vertical",
          fontFamily: "inherit",
        }}
      />
    </label>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  color: "#fff",
  fontSize: "14.5px",
  outline: "none",
  boxSizing: "border-box",
};

export default TestimonialSubmitModal;
