// ColorPicker — native color input + synced hex field + brand presets.
// Saves to a site_content color slot.

import { useEffect, useState } from "react";
import { clearSlot, saveSlot, useSaveStatus, useSlotDoc } from "../cmsStore";

const cardStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(184, 149, 106, 0.20)",
  borderRadius: 14,
  padding: 18,
  color: "#F5F1E8",
};

const buttonStyle = (variant = "primary", disabled = false) => ({
  padding: "9px 16px",
  borderRadius: 999,
  border: variant === "ghost" ? "1px solid rgba(184, 149, 106, 0.5)" : "none",
  background:
    variant === "ghost"
      ? "transparent"
      : "linear-gradient(135deg, #BC9966, #D9B987)",
  color: variant === "ghost" ? "#F5F1E8" : "#1F2D4D",
  fontSize: 12.5,
  fontWeight: 700,
  cursor: disabled ? "not-allowed" : "pointer",
  opacity: disabled ? 0.5 : 1,
});

const PRESETS = [
  { label: "Navy", value: "#0F2A44" },
  { label: "Navy soft", value: "#1F2D4D" },
  { label: "Gold", value: "#B8956A" },
  { label: "Gold light", value: "#D4B896" },
  { label: "Gold deep", value: "#8B6E48" },
  { label: "Cream soft", value: "#F5EFE6" },
  { label: "Cream deep", value: "#EDE4D3" },
  { label: "Text", value: "#1A1A1A" },
  { label: "Text soft", value: "#4A4A4A" },
];

const HEX_RE = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

function ColorPicker({ slotKey, label, fallback = "#1A1A1A" }) {
  const slotDoc = useSlotDoc(slotKey);
  const [value, setValue] = useState(fallback);
  const [hex, setHex] = useState(fallback);
  const [dirty, setDirty] = useState(false);
  const [status, run] = useSaveStatus();

  useEffect(() => {
    if (slotDoc.loading) return;
    const next = slotDoc.data?.color_value ?? fallback;
    setValue(next);
    setHex(next);
    setDirty(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slotDoc.loading, slotDoc.data?.color_value, slotKey]);

  const handleChange = (next) => {
    setValue(next);
    setHex(next);
    setDirty(true);
  };

  const handleHex = (next) => {
    setHex(next);
    if (HEX_RE.test(next)) {
      setValue(next.length === 4
        ? "#" + next.slice(1).split("").map((c) => c + c).join("")
        : next);
      setDirty(true);
    }
  };

  const handleSave = () =>
    run(() =>
      saveSlot(slotKey, {
        slot_type: "color",
        color_value: value,
        asset_id: null,
        cloudinary_id: null,
        cloudinary_url: null,
        asset_type: null,
        text_value: null,
        json_value: null,
      })
    ).then(() => setDirty(false));

  const handleReset = () => {
    if (!confirm("Reset to default? Current colour will be cleared.")) return;
    run(() => clearSlot(slotKey)).then(() => {
      setValue(fallback);
      setHex(fallback);
      setDirty(false);
    });
  };

  const validHex = HEX_RE.test(hex);

  return (
    <div style={cardStyle}>
      <div style={{ marginBottom: 10 }}>
        <div
          style={{
            color: "var(--accent-gold)",
            fontSize: 11,
            letterSpacing: "1.6px",
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          Colour
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>
          {label || slotKey}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 12,
            background: validHex ? value : "transparent",
            border: "1px solid rgba(184, 149, 106, 0.35)",
            flexShrink: 0,
          }}
          aria-hidden="true"
        />
        <input
          type="color"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          style={{
            width: 56,
            height: 40,
            border: "1px solid rgba(184, 149, 106, 0.35)",
            borderRadius: 10,
            background: "transparent",
            cursor: "pointer",
            padding: 2,
          }}
        />
        <input
          type="text"
          value={hex}
          onChange={(e) => handleHex(e.target.value)}
          style={{
            width: 130,
            padding: "10px 12px",
            borderRadius: 8,
            border: validHex
              ? "1px solid rgba(184, 149, 106, 0.25)"
              : "1px solid #ff9e9e",
            background: "rgba(255,255,255,0.05)",
            color: "#FFFFFF",
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 13,
            outline: "none",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          marginTop: 14,
        }}
      >
        {PRESETS.map((p) => (
          <button
            key={p.value}
            type="button"
            onClick={() => handleChange(p.value)}
            title={`${p.label} ${p.value}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 8px",
              borderRadius: 999,
              border:
                value.toUpperCase() === p.value.toUpperCase()
                  ? "1px solid var(--accent-gold)"
                  : "1px solid rgba(184, 149, 106, 0.18)",
              background: "rgba(0,0,0,0.18)",
              color: "#F5F1E8",
              cursor: "pointer",
              fontSize: 11.5,
            }}
          >
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: p.value,
                border: "1px solid rgba(255,255,255,0.18)",
              }}
              aria-hidden="true"
            />
            {p.label}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginTop: 14,
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
                : "rgba(245,241,232,0.55)",
          }}
        >
          {status.message || (dirty ? "Unsaved" : "Saved")}
        </span>
        <div style={{ display: "flex", gap: 8 }}>
          <button type="button" onClick={handleReset} style={buttonStyle("ghost")}>
            Reset
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!dirty || !validHex}
            style={buttonStyle("primary", !dirty || !validHex)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ColorPicker;
