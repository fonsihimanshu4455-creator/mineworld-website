// RichTextEditor — markdown-lite text editor with a live preview.
// Same persistence shape as TextEditor (writes to text_value), so the
// public site can read either via useSiteContent and pass through
// <RichText> for rendering.

import { useEffect, useState } from "react";
import { clearSlot, saveSlot, useSaveStatus, useSlotDoc } from "../cmsStore";
import RichText from "../../lib/richText.jsx";

const cardStyle = {
  background: "var(--admin-surface, #FFFFFF)",
  border: "1px solid var(--admin-border-gold, rgba(184,149,106,0.20))",
  borderRadius: "var(--admin-radius-md, 16px)",
  padding: "var(--admin-space-md, 24px)",
  color: "var(--admin-text, #1A1A1A)",
  boxShadow: "var(--admin-shadow-sm, 0 2px 8px rgba(31,45,77,0.05))",
};

const inputBase = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "var(--admin-radius-sm, 10px)",
  border: "1px solid var(--admin-border-strong, rgba(31,45,77,0.16))",
  background: "var(--admin-surface, #FFFFFF)",
  color: "var(--admin-text, #1A1A1A)",
  fontSize: "var(--admin-text-base, 17px)",
  outline: "none",
  fontFamily: "inherit",
  boxSizing: "border-box",
  minHeight: 110,
  resize: "vertical",
};

const buttonStyle = (variant = "primary", disabled = false) => ({
  padding: "12px 22px",
  borderRadius: 999,
  border:
    variant === "ghost"
      ? "1px solid var(--admin-border-strong, rgba(31,45,77,0.16))"
      : "none",
  background:
    variant === "ghost"
      ? "transparent"
      : "linear-gradient(135deg, var(--admin-accent, #BC9966), var(--admin-accent-soft, #D9B987))",
  color:
    variant === "ghost"
      ? "var(--admin-text, #1A1A1A)"
      : "var(--admin-accent-dark, #1F2D4D)",
  fontSize: "var(--admin-text-sm, 15px)",
  fontWeight: 700,
  cursor: disabled ? "not-allowed" : "pointer",
  opacity: disabled ? 0.5 : 1,
});

export default function RichTextEditor({
  slotKey,
  label,
  fallback = "",
  hint,
}) {
  const slotDoc = useSlotDoc(slotKey);
  const [value, setValue] = useState("");
  const [dirty, setDirty] = useState(false);
  const [status, run] = useSaveStatus();

  useEffect(() => {
    if (slotDoc.loading) return;
    setValue(slotDoc.data?.text_value ?? "");
    setDirty(false);
  }, [slotDoc.loading, slotDoc.data?.text_value, slotKey]);

  const persist = () => {
    run(() =>
      saveSlot(slotKey, {
        slot_type: "text",
        text_value: value,
        asset_id: null,
        cloudinary_id: null,
        cloudinary_url: null,
        asset_type: null,
        color_value: null,
        json_value: null,
      })
    );
    setDirty(false);
  };

  const handleReset = () => {
    if (
      !confirm(
        "Reset this slot to the default? The current value will be cleared."
      )
    )
      return;
    run(() => clearSlot(slotKey)).then(() => {
      setValue("");
      setDirty(false);
    });
  };

  return (
    <div style={cardStyle}>
      <div style={{ marginBottom: 10 }}>
        <div
          style={{
            color: "var(--accent-gold)",
            fontSize: 11,
            letterSpacing: 1.6,
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          Rich-text slot
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>
          {label || slotKey}
        </div>
      </div>

      <textarea
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setDirty(true);
        }}
        placeholder={
          fallback
            ? `Fallback: ${fallback}`
            : "Type your headline. Wrap text in *asterisks* for gold-italic, **bold**, _underline_."
        }
        style={inputBase}
      />

      <div
        style={{
          marginTop: 12,
          padding: "14px 16px",
          borderRadius: "var(--admin-radius-sm, 10px)",
          background: "var(--admin-surface-soft, #F0EBE0)",
          border: "1px solid var(--admin-border-gold, rgba(184,149,106,0.18))",
          minHeight: 48,
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: "var(--admin-accent-deep, #8B6E48)",
            letterSpacing: 1.4,
            textTransform: "uppercase",
            fontWeight: 800,
            marginBottom: 8,
          }}
        >
          Preview
        </div>
        <div
          style={{
            fontSize: 20,
            lineHeight: 1.35,
            color: "var(--admin-text, #1A1A1A)",
          }}
        >
          <RichText value={value} fallback={fallback} />
        </div>
      </div>

      <div
        style={{
          marginTop: 10,
          fontSize: 11.5,
          color: "var(--admin-text-muted, #6B5B47)",
          lineHeight: 1.5,
        }}
      >
        {hint ||
          "*gold-italic* · **bold** · _underline_ · escape with backslash (\\*literal*)"}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 12,
        }}
      >
        <span
          style={{
            fontSize: 12,
            color:
              status.kind === "ok"
                ? "#86E69C"
                : status.kind === "error"
                ? "#ff9e9e"
                : status.kind === "saving"
                ? "#D9B987"
                : "var(--admin-text-muted, #6B5B47)",
          }}
        >
          {status.message ||
            (dirty ? "Unsaved" : value ? "Saved" : "Empty (using fallback)")}
        </span>
        <div style={{ display: "flex", gap: 8 }}>
          <button type="button" onClick={handleReset} style={buttonStyle("ghost")}>
            Reset
          </button>
          <button
            type="button"
            onClick={persist}
            disabled={!dirty}
            style={buttonStyle("primary", !dirty)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
