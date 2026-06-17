// ToggleEditor — admin switch that writes "on"/"off" to a CMS text
// slot. Used to show/hide individual elements on the public site.
// Pairs with the `useSiteToggle` hook on the read side.

import { useEffect, useState } from "react";
import { saveSlot, useSaveStatus, useSlotDoc } from "../cmsStore";

function ToggleEditor({ slotKey, label, hint, defaultOn = true }) {
  const slotDoc = useSlotDoc(slotKey);
  const [value, setValue] = useState(defaultOn ? "on" : "off");
  const [status, run] = useSaveStatus();

  useEffect(() => {
    if (slotDoc.loading) return;
    const stored = slotDoc.data?.text_value;
    if (typeof stored === "string" && stored.trim() !== "") {
      setValue(stored.trim().toLowerCase() === "off" ? "off" : "on");
    } else {
      setValue(defaultOn ? "on" : "off");
    }
  }, [slotDoc.loading, slotDoc.data?.text_value, defaultOn]);

  const isOn = value !== "off";

  const handleToggle = () => {
    const next = isOn ? "off" : "on";
    setValue(next);
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
    );
  };

  return (
    <div
      style={{
        background: "var(--admin-surface, #FFFFFF)",
        border: "1px solid var(--admin-border, #E8DED1)",
        borderRadius: "var(--admin-radius-md, 16px)",
        padding: "16px 20px",
        color: "var(--admin-text, #1A1A1A)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 14,
        boxShadow: "var(--admin-shadow-sm, 0 2px 8px rgba(31,45,77,0.05))",
      }}
    >
      <div style={{ minWidth: 0, flex: 1 }}>
        <div
          style={{
            fontSize: 15,
            fontWeight: 800,
            marginBottom: 2,
            color: "var(--admin-text, #1A1A1A)",
          }}
        >
          {label || slotKey}
        </div>
        {hint && (
          <div
            style={{
              fontSize: 12.5,
              color: "var(--admin-text-secondary, #4A4A4A)",
              lineHeight: 1.55,
            }}
          >
            {hint}
          </div>
        )}
        {status.message && (
          <div
            style={{
              marginTop: 4,
              fontSize: 11,
              color:
                status.kind === "ok"
                  ? "#86E69C"
                  : status.kind === "error"
                  ? "#ff9e9e"
                  : "#D9B987",
            }}
          >
            {status.message}
          </div>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={isOn}
        aria-label={`${isOn ? "Hide" : "Show"} ${label || slotKey}`}
        onClick={handleToggle}
        style={{
          width: 56,
          height: 30,
          borderRadius: 999,
          border: "none",
          padding: 3,
          cursor: "pointer",
          background: isOn
            ? "linear-gradient(135deg, #BC9966, #D9B987)"
            : "rgba(255,255,255,0.16)",
          transition: "background 0.18s ease",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: isOn ? "flex-end" : "flex-start",
        }}
      >
        <span
          style={{
            display: "block",
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 1px 4px rgba(0,0,0,0.32)",
            transition: "all 0.18s ease",
          }}
        />
      </button>
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "1.4px",
          textTransform: "uppercase",
          color: isOn
            ? "var(--admin-success, #1F8A4C)"
            : "var(--admin-text-muted, #6B5B47)",
          width: 32,
          textAlign: "right",
        }}
      >
        {isOn ? "On" : "Off"}
      </span>
    </div>
  );
}

export default ToggleEditor;
