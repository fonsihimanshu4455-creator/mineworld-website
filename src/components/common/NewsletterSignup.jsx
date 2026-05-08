import { useState } from "react";
import { useSiteSettings } from "../../admin/hooks";
import { siteConfig as defaultSiteConfig } from "../../data/siteConfig";
import { trackEvent } from "../../utils/analytics";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function NewsletterSignup({
  variant = "footer",
  title,
  subtitle,
}) {
  const settings = useSiteSettings(defaultSiteConfig);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const newsletter = settings.newsletter || {};
  const enabled = newsletter.enabled !== false;
  const heading = title || newsletter.title || "Get the studio newsletter";
  const sub =
    subtitle ||
    newsletter.subtitle ||
    "One email a month — what's working in content, ads, and growth. No spam.";
  const successMsg =
    newsletter.successMessage || "Thanks! Check your inbox to confirm.";
  const ctaLabel = newsletter.ctaLabel || "Subscribe";

  if (!enabled) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!isValidEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }
    setStatus("loading");
    try {
      const webhook = settings.integrations?.sheetWebhook;
      if (webhook) {
        await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({
            type: "newsletter",
            email,
            source: variant,
            timestamp: new Date().toISOString(),
          }),
        });
      }
      trackEvent("newsletter_signup", { source: variant });
      setStatus("success");
      setEmail("");
    } catch {
      setError("Could not subscribe. Try again or email us directly.");
      setStatus("idle");
    }
  };

  const isInline = variant === "inline";

  return (
    <div
      style={{
        padding: isInline ? "28px 22px" : "0",
        borderRadius: isInline ? "20px" : "0",
        border: isInline ? "1px solid rgba(214,176,96,0.28)" : "none",
        background: isInline
          ? "linear-gradient(180deg, rgba(214,176,96,0.10), rgba(255,255,255,0.02))"
          : "transparent",
        maxWidth: isInline ? "640px" : "100%",
        margin: isInline ? "0 auto" : "0",
      }}
    >
      <div
        style={{
          color: "#E7C98A",
          fontSize: "11px",
          letterSpacing: "2px",
          textTransform: "uppercase",
          fontWeight: 800,
          marginBottom: "8px",
        }}
      >
        Newsletter
      </div>
      <h3
        style={{
          margin: "0 0 8px",
          fontSize: isInline ? "24px" : "18px",
          fontWeight: 800,
          color: "#F5F1E8",
          fontFamily: '"Playfair Display", Georgia, serif',
          letterSpacing: "-0.4px",
          lineHeight: 1.2,
        }}
      >
        {heading}
      </h3>
      <p
        style={{
          margin: "0 0 14px",
          color: "rgba(243,239,231,0.65)",
          fontSize: "13px",
          lineHeight: 1.55,
        }}
      >
        {sub}
      </p>

      {status === "success" ? (
        <div
          role="status"
          style={{
            padding: "12px 14px",
            borderRadius: "12px",
            background: "rgba(52,211,153,0.10)",
            border: "1px solid rgba(52,211,153,0.32)",
            color: "#86E69C",
            fontSize: "13px",
            fontWeight: 700,
          }}
        >
          ✓ {successMsg}
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@yourbrand.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            required
            style={{
              flex: "1 1 220px",
              minWidth: "0",
              padding: "11px 14px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.04)",
              color: "#F5F1E8",
              fontSize: "13.5px",
              outline: "none",
              fontFamily: "inherit",
            }}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            style={{
              padding: "11px 20px",
              borderRadius: "999px",
              border: "none",
              background:
                status === "loading"
                  ? "rgba(214,176,96,0.5)"
                  : "linear-gradient(135deg, #D6B060, #E7C98A)",
              color: "#18140F",
              fontWeight: 800,
              fontSize: "13px",
              cursor: status === "loading" ? "not-allowed" : "pointer",
              fontFamily: "inherit",
              letterSpacing: "0.2px",
              flexShrink: 0,
            }}
          >
            {status === "loading" ? "Subscribing…" : ctaLabel}
          </button>
        </form>
      )}

      {error ? (
        <div
          style={{
            marginTop: "8px",
            color: "#ff9e9e",
            fontSize: "12px",
          }}
        >
          {error}
        </div>
      ) : null}
    </div>
  );
}
