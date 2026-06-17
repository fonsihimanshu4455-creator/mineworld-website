// ContactCard — a compact admin card that bundles ONE contact item's
// everything in a single place: label, main input, optional secondary
// input (e.g. Google Maps URL for an address), and a show/hide
// visibility toggle. Solves the problem of related fields and their
// toggles being scattered across separate sections.
//
// Saves both values via the existing CMS pipeline (text slots), and
// the toggle uses the same on/off convention as ToggleEditor.

import { useEffect, useState } from "react";
import { saveSlot, useSaveStatus, useSlotDoc } from "../cmsStore";

const cardStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(184, 149, 106, 0.20)",
  borderRadius: 14,
  padding: "16px 18px",
  color: "#F5F1E8",
  marginBottom: 12,
};

const labelStyle = {
  display: "block",
  fontSize: 12,
  fontWeight: 700,
  color: "rgba(245,241,232,0.85)",
  marginBottom: 4,
  letterSpacing: "0.3px",
};

const subLabelStyle = {
  display: "block",
  fontSize: 10.5,
  letterSpacing: "1.4px",
  textTransform: "uppercase",
  color: "rgba(217,185,135,0.75)",
  fontWeight: 700,
  marginBottom: 4,
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid rgba(184, 149, 106, 0.25)",
  background: "rgba(255,255,255,0.05)",
  color: "#FFFFFF",
  fontSize: 13,
  outline: "none",
  fontFamily: "inherit",
  boxSizing: "border-box",
};

function useTextSlot(slotKey, fallback) {
  const slotDoc = useSlotDoc(slotKey);
  const [value, setValue] = useState(fallback);
  const [dirty, setDirty] = useState(false);
  const [status, run] = useSaveStatus();

  useEffect(() => {
    if (slotDoc.loading) return;
    const stored = slotDoc.data?.text_value;
    setValue(typeof stored === "string" ? stored : fallback);
    setDirty(false);
  }, [slotDoc.loading, slotDoc.data?.text_value, fallback]);

  const save = (next) =>
    run(() =>
      saveSlot(slotKey, {
        slot_type: "text",
        text_value: next,
        asset_id: null,
        cloudinary_id: null,
        cloudinary_url: null,
        asset_type: null,
        color_value: null,
        json_value: null,
      })
    ).then(() => setDirty(false));

  return { value, setValue, dirty, setDirty, status, save };
}

function ToggleSwitch({ on, onToggle, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={`${on ? "Hide" : "Show"} ${label}`}
      onClick={onToggle}
      style={{
        width: 50,
        height: 28,
        borderRadius: 999,
        border: "none",
        padding: 3,
        cursor: "pointer",
        background: on
          ? "linear-gradient(135deg, #BC9966, #D9B987)"
          : "rgba(255,255,255,0.16)",
        transition: "background 0.18s ease",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: on ? "flex-end" : "flex-start",
      }}
    >
      <span
        style={{
          display: "block",
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.32)",
        }}
      />
    </button>
  );
}

function ContactCard({
  title,
  hint,
  icon,
  // Primary text field (e.g. the address text, the email)
  slotKey,
  label = "Value",
  placeholder = "",
  fallback = "",
  inputType = "text",
  // Optional secondary text field (e.g. Google Maps URL for an address)
  secondarySlotKey,
  secondaryLabel,
  secondaryPlaceholder = "",
  secondaryFallback = "",
  // Visibility toggle slot
  visibilitySlotKey,
  visibilityLabel = "Show on website",
}) {
  const primary = useTextSlot(slotKey, fallback);
  const secondary = useTextSlot(
    secondarySlotKey || `${slotKey}__secondary_disabled`,
    secondaryFallback
  );
  const toggle = useTextSlot(visibilitySlotKey, "on");

  const isOn = (toggle.value || "on").trim().toLowerCase() !== "off";

  const handleToggle = () => {
    const next = isOn ? "off" : "on";
    toggle.setValue(next);
    toggle.save(next);
  };

  return (
    <div style={cardStyle}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 12,
        }}
      >
        {icon && (
          <div
            aria-hidden="true"
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "rgba(184, 149, 106, 0.14)",
              color: "#D9B987",
              display: "grid",
              placeItems: "center",
              fontSize: 16,
              flexShrink: 0,
            }}
          >
            {icon}
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#FFFFFF" }}>
            {title}
          </div>
          {hint && (
            <div
              style={{
                fontSize: 11.5,
                color: "rgba(245,241,232,0.6)",
                marginTop: 2,
                lineHeight: 1.5,
              }}
            >
              {hint}
            </div>
          )}
        </div>
        {visibilitySlotKey && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: 10,
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                color: isOn ? "#86E69C" : "rgba(245,241,232,0.45)",
                fontWeight: 800,
              }}
              title={visibilityLabel}
            >
              {isOn ? "On" : "Off"}
            </span>
            <ToggleSwitch on={isOn} onToggle={handleToggle} label={title} />
          </div>
        )}
      </div>

      <div style={{ marginBottom: secondarySlotKey ? 10 : 4 }}>
        <label style={labelStyle}>{label}</label>
        <input
          type={inputType}
          value={primary.value || ""}
          placeholder={placeholder}
          onChange={(e) => {
            primary.setValue(e.target.value);
            primary.setDirty(true);
          }}
          onBlur={() => primary.dirty && primary.save(primary.value)}
          style={inputStyle}
        />
        {primary.status.message && (
          <div
            style={{
              marginTop: 4,
              fontSize: 11,
              color:
                primary.status.kind === "ok"
                  ? "#86E69C"
                  : primary.status.kind === "error"
                  ? "#ff9e9e"
                  : "#D9B987",
            }}
          >
            {primary.status.message}
          </div>
        )}
      </div>

      {secondarySlotKey && (
        <div>
          <label style={subLabelStyle}>{secondaryLabel}</label>
          <input
            type="url"
            value={secondary.value || ""}
            placeholder={secondaryPlaceholder}
            onChange={(e) => {
              secondary.setValue(e.target.value);
              secondary.setDirty(true);
            }}
            onBlur={() => secondary.dirty && secondary.save(secondary.value)}
            style={inputStyle}
          />
          {secondary.status.message && (
            <div
              style={{
                marginTop: 4,
                fontSize: 11,
                color:
                  secondary.status.kind === "ok"
                    ? "#86E69C"
                    : secondary.status.kind === "error"
                    ? "#ff9e9e"
                    : "#D9B987",
              }}
            >
              {secondary.status.message}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ContactCard;
