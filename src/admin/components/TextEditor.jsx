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
  background: "var(--admin-surface, #FFFFFF)",
  border: "1px solid var(--admin-border, #E8DED1)",
  borderRadius: "var(--admin-radius-md, 16px)",
  padding: "var(--admin-space-md, 24px)",
  color: "var(--admin-text, #151515)",
  boxShadow: "var(--admin-shadow-sm, 0 2px 8px rgba(31,45,77,0.05))",
};

const inputBase = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "var(--admin-radius-sm, 10px)",
  border: "1px solid var(--admin-border-strong, rgba(31,45,77,0.16))",
  background: "var(--admin-surface, #FFFFFF)",
  color: "var(--admin-text, #151515)",
  fontSize: "var(--admin-text-sm, 15px)",
  outline: "none",
  fontFamily: "inherit",
  boxSizing: "border-box",
};

const buttonStyle = (variant = "primary", disabled = false) => ({
  padding: "10px 18px",
  borderRadius: 999,
  border:
    variant === "ghost"
      ? "1px solid var(--admin-border-strong, rgba(31,45,77,0.16))"
      : "none",
  background:
    variant === "ghost"
      ? "transparent"
      : "linear-gradient(135deg, var(--admin-accent, #B8956A), var(--admin-accent-soft, #C49A5A))",
  color:
    variant === "ghost"
      ? "var(--admin-text, #151515)"
      : "var(--admin-accent-dark, #0F2A44)",
  fontSize: "var(--admin-text-sm, 15px)",
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
              color: "var(--admin-accent-deep, #8B6E48)",
              fontSize: 11,
              letterSpacing: "1.6px",
              textTransform: "uppercase",
              fontWeight: 800,
            }}
          >
            Text
          </div>
          <div
            style={{
              fontSize: "var(--admin-text-sm, 15px)",
              fontWeight: 700,
              marginTop: 4,
              color: "var(--admin-text, #151515)",
            }}
          >
            {label || slotKey}
          </div>
        </div>
        {maxLength && (
          <span
            style={{
              fontSize: 11.5,
              color: overLimit
                ? "var(--admin-error, #C44545)"
                : "var(--admin-text-muted, #6B5B47)",
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
            ? "var(--admin-error, #C44545)"
            : "var(--admin-border-strong, rgba(31,45,77,0.16))",
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
                ? "var(--admin-success, #1F8A4C)"
                : status.kind === "error"
                ? "var(--admin-error, #C44545)"
                : status.kind === "saving"
                ? "var(--admin-warn, #B8810B)"
                : "var(--admin-text-muted, #6B5B47)",
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
