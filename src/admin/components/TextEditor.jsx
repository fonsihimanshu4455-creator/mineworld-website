// TextEditor — single-line input or textarea for site_content text slots.
// Supports a character counter, debounced auto-save, and a "reset to
// default" action that deletes the slot doc (fallback then kicks in).

import { useEffect, useRef, useState } from "react";
import { getAssetSpec } from "../../lib/asset-specs";
import {
  clearSlot,
  saveSlot,
  useSaveStatus,
  useSlotDoc,
} from "../cmsStore";

const cardStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(184, 149, 106, 0.20)",
  borderRadius: "14px",
  padding: "18px",
  color: "#F5F1E8",
};

const inputBase = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 8,
  border: "1px solid rgba(184, 149, 106, 0.25)",
  background: "rgba(255,255,255,0.05)",
  color: "#FFFFFF",
  fontSize: 14,
  outline: "none",
  fontFamily: "inherit",
  boxSizing: "border-box",
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

function TextEditor({
  slotKey,
  specKey,
  multiline = false,
  label,
  placeholder,
  fallback = "",
  autoSave = false,
}) {
  const spec = getAssetSpec(specKey || slotKey);
  const maxLength = spec?.maxLength;
  const slotDoc = useSlotDoc(slotKey);
  const [value, setValue] = useState("");
  const [dirty, setDirty] = useState(false);
  const [status, run] = useSaveStatus();
  const debounceRef = useRef(null);

  // Reset when slot loads / changes externally
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

  const handleChange = (next) => {
    setValue(next);
    setDirty(true);
    if (!autoSave) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
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
      setDirty(false);
    }, 500);
  };

  const handleReset = () => {
    if (!confirm("Reset this slot to the default? The current value will be cleared.")) return;
    run(() => clearSlot(slotKey)).then(() => {
      setValue("");
      setDirty(false);
    });
  };

  const overLimit = !!maxLength && value.length > maxLength;
  const Field = multiline ? "textarea" : "input";

  return (
    <div style={cardStyle}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 10,
        }}
      >
        <div>
          <div
            style={{
              color: "var(--accent-gold)",
              fontSize: 11,
              letterSpacing: "1.6px",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            Text slot
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>
            {label || slotKey}
          </div>
        </div>
        {maxLength && (
          <span
            style={{
              fontSize: 11.5,
              color: overLimit ? "#ff9e9e" : "rgba(245,241,232,0.65)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {value.length} / {maxLength}
          </span>
        )}
      </div>

      <Field
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder || (fallback ? `Fallback: ${fallback}` : "")}
        rows={multiline ? 4 : undefined}
        style={{
          ...inputBase,
          minHeight: multiline ? 110 : "auto",
          resize: multiline ? "vertical" : "none",
          borderColor: overLimit
            ? "#ff9e9e"
            : "rgba(184, 149, 106, 0.25)",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
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
                : "rgba(245,241,232,0.55)",
          }}
        >
          {status.message ||
            (dirty
              ? "Unsaved"
              : slotDoc.data?.text_value
              ? "Saved"
              : fallback
              ? "Using fallback"
              : "Empty")}
        </span>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="button"
            onClick={handleReset}
            style={buttonStyle("ghost")}
          >
            Reset
          </button>
          {!autoSave && (
            <button
              type="button"
              onClick={persist}
              disabled={!dirty || overLimit}
              style={buttonStyle("primary", !dirty || overLimit)}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TextEditor;
