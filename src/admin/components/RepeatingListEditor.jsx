// RepeatingListEditor — manages an ordered, editable list stored in a
// site_content slot's `json_value.items[]`. Each item has its own
// fields (text / url / image / video / color / multiline). Items can
// be reordered (drag handle, @dnd-kit/sortable), hidden (visible flag),
// added, and deleted.
//
// Asset fields (image/video) upload to Cloudinary and write to the
// `assets` collection, but do NOT use the AssetUploader component
// because the asset URL belongs to a row in this list, not to a
// dedicated slot. We embed a slimmer inline uploader.

import { useEffect, useMemo, useState } from "react";
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  cloudinaryEnabled,
  uploadFromUrl,
  uploadToCloudinary,
} from "../../lib/cloudinary";
import { saveAsset, saveSlot, useSaveStatus, useSlotDoc } from "../cmsStore";

const cardStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(184, 149, 106, 0.20)",
  borderRadius: 14,
  padding: 18,
  color: "#F5F1E8",
};

const rowStyle = (open, dragging) => ({
  background: open
    ? "rgba(0,0,0,0.28)"
    : dragging
    ? "rgba(184, 149, 106, 0.12)"
    : "rgba(0,0,0,0.18)",
  border: "1px solid rgba(184, 149, 106, 0.16)",
  borderRadius: 12,
  marginBottom: 8,
  transition: "background 0.18s ease",
});

const buttonStyle = (variant = "primary", disabled = false) => ({
  padding: "8px 14px",
  borderRadius: 999,
  border: variant === "ghost" ? "1px solid rgba(184, 149, 106, 0.5)" : "none",
  background:
    variant === "ghost"
      ? "transparent"
      : variant === "danger"
      ? "rgba(255,120,120,0.12)"
      : "linear-gradient(135deg, #BC9966, #D9B987)",
  color:
    variant === "ghost"
      ? "#F5F1E8"
      : variant === "danger"
      ? "#ff9e9e"
      : "#1F2D4D",
  fontSize: 12,
  fontWeight: 700,
  cursor: disabled ? "not-allowed" : "pointer",
  opacity: disabled ? 0.5 : 1,
});

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

const labelStyle = {
  display: "block",
  fontSize: 11.5,
  fontWeight: 700,
  color: "var(--bg-cream-soft)",
  letterSpacing: "0.4px",
  textTransform: "uppercase",
  marginBottom: 4,
};

function newId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `id-${Math.random().toString(36).slice(2, 10)}-${Date.now()}`;
}

function defaultItem(itemFields) {
  const item = { id: newId(), visible: true };
  itemFields.forEach((f) => {
    if (f.type === "color") item[f.name] = f.default || "#1A1A1A";
    else if (f.type === "image" || f.type === "video") item[f.name] = null;
    else if (f.type === "tags" || f.type === "pairs" || f.type === "media-list")
      item[f.name] = [];
    else item[f.name] = f.default ?? "";
  });
  return item;
}

function summaryText(item, itemFields) {
  const titleField = itemFields.find(
    (f) => f.name === "title" || f.name === "name" || f.type === "text"
  );
  const value = titleField ? item[titleField.name] : "";
  return value || "(untitled)";
}

// -------------------- inline uploader --------------------

function InlineMediaField({ field, value, onChange, category, folder }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [urlInput, setUrlInput] = useState("");

  const handleFile = async (file) => {
    if (!file) return;
    if (!cloudinaryEnabled) {
      setError("Cloudinary not configured.");
      return;
    }
    setUploading(true);
    setError("");
    try {
      const resourceType = field.type === "video" ? "video" : "image";
      const result = await uploadToCloudinary(file, {
        folder,
        resourceType,
      });
      const assetDoc = await saveAsset({
        cloudinary_id: result.public_id,
        cloudinary_url: result.secure_url,
        asset_type: resourceType,
        original_name: result.original_filename || "",
        width: result.width || null,
        height: result.height || null,
        size_bytes: result.bytes || null,
        duration_seconds: result.duration || null,
        format: result.format || "",
        category,
      });
      onChange({
        asset_id: assetDoc.id,
        cloudinary_id: result.public_id,
        cloudinary_url: result.secure_url,
        asset_type: resourceType,
      });
    } catch (err) {
      setError(err?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleUrl = async () => {
    if (!urlInput.trim() || !cloudinaryEnabled) return;
    setUploading(true);
    setError("");
    try {
      const resourceType = field.type === "video" ? "video" : "image";
      const result = await uploadFromUrl(urlInput.trim(), {
        folder,
        resourceType,
      });
      const assetDoc = await saveAsset({
        cloudinary_id: result.public_id,
        cloudinary_url: result.secure_url,
        asset_type: resourceType,
        original_name: result.original_filename || "",
        width: result.width || null,
        height: result.height || null,
        size_bytes: result.bytes || null,
        duration_seconds: result.duration || null,
        format: result.format || "",
        category,
      });
      onChange({
        asset_id: assetDoc.id,
        cloudinary_id: result.public_id,
        cloudinary_url: result.secure_url,
        asset_type: resourceType,
      });
      setUrlInput("");
    } catch (err) {
      setError(err?.message || "URL upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label style={labelStyle}>{field.label || field.name}</label>
      {value?.cloudinary_url ? (
        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          {field.type === "video" ? (
            <video
              src={value.cloudinary_url}
              controls
              muted
              style={{
                maxWidth: 180,
                maxHeight: 110,
                borderRadius: 8,
                background: "#000",
              }}
            />
          ) : (
            <img
              src={value.cloudinary_url}
              alt=""
              style={{
                maxWidth: 120,
                maxHeight: 90,
                borderRadius: 8,
                background: "rgba(0,0,0,0.32)",
                objectFit: "contain",
              }}
            />
          )}
          <button
            type="button"
            onClick={() => onChange(null)}
            style={buttonStyle("danger")}
          >
            Remove
          </button>
        </div>
      ) : null}
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="file"
          accept={field.type === "video" ? "video/*" : "image/*"}
          onChange={(e) => handleFile(e.target.files?.[0])}
          disabled={uploading}
          style={{ ...inputStyle, padding: "8px" }}
        />
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
        <input
          type="url"
          placeholder="…or paste URL"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          style={{ ...inputStyle, flex: 1 }}
        />
        <button
          type="button"
          onClick={handleUrl}
          disabled={!urlInput.trim() || uploading}
          style={buttonStyle("ghost", !urlInput.trim() || uploading)}
        >
          Upload URL
        </button>
      </div>
      {uploading && (
        <div style={{ marginTop: 6, fontSize: 12, color: "#D9B987" }}>
          Uploading…
        </div>
      )}
      {error && (
        <div style={{ marginTop: 6, fontSize: 12, color: "#ff9e9e" }}>
          {error}
        </div>
      )}
    </div>
  );
}

// -------------------- tags / pairs / media-list / select --------------------

function TagsField({ field, value, onChange }) {
  const list = Array.isArray(value) ? value : [];
  const update = (next) => onChange(next);
  return (
    <div>
      <label style={labelStyle}>{field.label || field.name}</label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
        {list.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 10px",
              borderRadius: 999,
              background: "rgba(184,149,106,0.14)",
              border: "1px solid rgba(184,149,106,0.32)",
              color: "#F5F1E8",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {tag}
            <button
              type="button"
              onClick={() => update(list.filter((_, j) => j !== i))}
              aria-label={`Remove ${tag}`}
              style={{
                background: "transparent",
                border: "none",
                color: "#F5F1E8",
                cursor: "pointer",
                fontSize: 14,
                lineHeight: 1,
                padding: 0,
              }}
            >
              ×
            </button>
          </span>
        ))}
        {list.length === 0 && (
          <span style={{ fontSize: 12, color: "rgba(245,241,232,0.5)" }}>
            No tags yet — type below and press Enter or comma.
          </span>
        )}
      </div>
      <input
        type="text"
        placeholder={field.placeholder || "Type a tag, press Enter or comma"}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            const v = e.currentTarget.value.trim().replace(/,$/, "");
            if (v) {
              update([...list, v]);
              e.currentTarget.value = "";
            }
          }
        }}
        onBlur={(e) => {
          const v = e.currentTarget.value.trim();
          if (v) {
            update([...list, v]);
            e.currentTarget.value = "";
          }
        }}
        style={inputStyle}
      />
    </div>
  );
}

function PairsField({ field, value, onChange }) {
  const list = Array.isArray(value) ? value : [];
  const update = (next) => onChange(next);
  const labelKey = field.labelKey || "label";
  const valueKey = field.valueKey || "value";
  return (
    <div>
      <label style={labelStyle}>{field.label || field.name}</label>
      <div style={{ display: "grid", gap: 6 }}>
        {list.map((pair, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr auto",
              gap: 6,
              alignItems: "center",
            }}
          >
            <input
              type="text"
              value={pair[labelKey] || ""}
              placeholder={field.labelPlaceholder || "Label"}
              onChange={(e) =>
                update(
                  list.map((p, j) =>
                    j === i ? { ...p, [labelKey]: e.target.value } : p
                  )
                )
              }
              style={inputStyle}
            />
            <input
              type="text"
              value={pair[valueKey] || ""}
              placeholder={field.valuePlaceholder || "Value"}
              onChange={(e) =>
                update(
                  list.map((p, j) =>
                    j === i ? { ...p, [valueKey]: e.target.value } : p
                  )
                )
              }
              style={inputStyle}
            />
            <button
              type="button"
              onClick={() => update(list.filter((_, j) => j !== i))}
              style={buttonStyle("danger")}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => update([...list, { [labelKey]: "", [valueKey]: "" }])}
        style={{ ...buttonStyle("ghost"), marginTop: 8 }}
      >
        + Add row
      </button>
    </div>
  );
}

function MediaListField({ field, value, onChange, category, folder }) {
  const list = Array.isArray(value) ? value : [];
  const update = (next) => onChange(next);
  const childField = {
    ...field,
    type: field.mediaType || "image",
    label: undefined,
  };
  return (
    <div>
      <label style={labelStyle}>{field.label || field.name}</label>
      <div style={{ display: "grid", gap: 12 }}>
        {list.map((entry, i) => (
          <div
            key={i}
            style={{
              border: "1px solid rgba(184,149,106,0.18)",
              borderRadius: 12,
              padding: 12,
              background: "rgba(0,0,0,0.18)",
              display: "grid",
              gap: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: 12, color: "#D9B987", fontWeight: 700 }}>
                {field.itemLabel ? `${field.itemLabel} ${i + 1}` : `Item ${i + 1}`}
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  type="button"
                  disabled={i === 0}
                  onClick={() => {
                    const next = [...list];
                    [next[i - 1], next[i]] = [next[i], next[i - 1]];
                    update(next);
                  }}
                  style={buttonStyle("ghost", i === 0)}
                >
                  ↑
                </button>
                <button
                  type="button"
                  disabled={i === list.length - 1}
                  onClick={() => {
                    const next = [...list];
                    [next[i + 1], next[i]] = [next[i], next[i + 1]];
                    update(next);
                  }}
                  style={buttonStyle("ghost", i === list.length - 1)}
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => update(list.filter((_, j) => j !== i))}
                  style={buttonStyle("danger")}
                >
                  ×
                </button>
              </div>
            </div>
            <InlineMediaField
              field={{
                ...childField,
                type: entry?.asset_type === "video" ? "video" : childField.type,
              }}
              value={entry}
              onChange={(next) =>
                update(
                  list.map((p, j) => (j === i ? { ...(p || {}), ...(next || {}) } : p))
                )
              }
              category={category}
              folder={folder}
            />
            <input
              type="text"
              value={entry?.alt || ""}
              placeholder="Alt text (described to screen readers)"
              onChange={(e) =>
                update(
                  list.map((p, j) =>
                    j === i ? { ...(p || {}), alt: e.target.value } : p
                  )
                )
              }
              style={inputStyle}
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => update([...list, { asset_type: field.mediaType || "image" }])}
        style={{ ...buttonStyle("ghost"), marginTop: 10 }}
      >
        + Add {field.itemLabel || "media"}
      </button>
    </div>
  );
}

function SelectField({ field, value, onChange }) {
  const opts = Array.isArray(field.options) ? field.options : [];
  return (
    <div>
      <label style={labelStyle}>{field.label || field.name}</label>
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        style={{ ...inputStyle, appearance: "auto" }}
      >
        <option value="">— None —</option>
        {opts.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// -------------------- single item row --------------------

function renderField(field, item, updateField, category, folder) {
  if (field.type === "image" || field.type === "video") {
    return (
      <InlineMediaField
        field={field}
        value={item[field.name]}
        onChange={(next) => updateField(field.name, next)}
        category={category}
        folder={folder}
      />
    );
  }
  if (field.type === "media-list") {
    return (
      <MediaListField
        field={field}
        value={item[field.name]}
        onChange={(next) => updateField(field.name, next)}
        category={category}
        folder={folder}
      />
    );
  }
  if (field.type === "tags") {
    return (
      <TagsField
        field={field}
        value={item[field.name]}
        onChange={(next) => updateField(field.name, next)}
      />
    );
  }
  if (field.type === "pairs") {
    return (
      <PairsField
        field={field}
        value={item[field.name]}
        onChange={(next) => updateField(field.name, next)}
      />
    );
  }
  if (field.type === "select") {
    return (
      <SelectField
        field={field}
        value={item[field.name]}
        onChange={(next) => updateField(field.name, next)}
      />
    );
  }
  if (field.type === "multiline") {
    return (
      <div>
        <label style={labelStyle}>{field.label || field.name}</label>
        <textarea
          value={item[field.name] || ""}
          rows={field.rows || 3}
          onChange={(e) => updateField(field.name, e.target.value)}
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>
    );
  }
  if (field.type === "color") {
    return (
      <div>
        <label style={labelStyle}>{field.label || field.name}</label>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            type="color"
            value={item[field.name] || "#000000"}
            onChange={(e) => updateField(field.name, e.target.value)}
            style={{
              width: 56,
              height: 36,
              border: "1px solid rgba(184, 149, 106, 0.3)",
              borderRadius: 8,
              background: "transparent",
            }}
          />
          <input
            type="text"
            value={item[field.name] || ""}
            onChange={(e) => updateField(field.name, e.target.value)}
            style={{ ...inputStyle, width: 130 }}
          />
        </div>
      </div>
    );
  }
  return (
    <div>
      <label style={labelStyle}>{field.label || field.name}</label>
      <input
        type={field.type === "url" ? "url" : "text"}
        value={item[field.name] || ""}
        onChange={(e) => updateField(field.name, e.target.value)}
        placeholder={field.placeholder || ""}
        style={inputStyle}
      />
    </div>
  );
}

function ItemRow({
  item,
  itemFields,
  groups,
  summarise,
  expanded,
  onToggleExpand,
  onChange,
  onRemove,
  category,
  folder,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...rowStyle(expanded, isDragging),
  };

  const updateField = (name, next) => onChange({ ...item, [name]: next });

  const visible = item.visible !== false;

  return (
    <div ref={setNodeRef} style={style}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 12px",
        }}
      >
        <button
          type="button"
          aria-label="Drag handle"
          {...attributes}
          {...listeners}
          style={{
            ...buttonStyle("ghost"),
            padding: "6px 8px",
            cursor: "grab",
            touchAction: "none",
          }}
        >
          ⋮⋮
        </button>
        <button
          type="button"
          onClick={onToggleExpand}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            color: "#F5F1E8",
            textAlign: "left",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            padding: "6px 4px",
          }}
        >
          {(summarise && summarise(item)) || summaryText(item, itemFields)}
        </button>
        <button
          type="button"
          onClick={() => updateField("visible", !visible)}
          title={visible ? "Hide on site" : "Show on site"}
          aria-label={visible ? "Hide item" : "Show item"}
          style={{
            ...buttonStyle("ghost"),
            color: visible ? "#F5F1E8" : "rgba(245,241,232,0.4)",
          }}
        >
          {visible ? "👁 Visible" : "⊘ Hidden"}
        </button>
        <button
          type="button"
          onClick={onRemove}
          style={buttonStyle("danger")}
        >
          Delete
        </button>
      </div>

      {expanded && (
        <div style={{ padding: "0 14px 14px" }}>
          <ItemBody
            item={item}
            itemFields={itemFields}
            groups={groups}
            updateField={updateField}
            category={category}
            folder={folder}
          />
        </div>
      )}
    </div>
  );
}

function ItemBody({ item, itemFields, groups, updateField, category, folder }) {
  const fieldByName = useMemo(() => {
    const map = {};
    itemFields.forEach((f) => {
      map[f.name] = f;
    });
    return map;
  }, [itemFields]);

  const validGroups =
    Array.isArray(groups) && groups.length > 0
      ? groups
          .map((g) => ({
            ...g,
            fields: (g.fields || []).filter((n) => fieldByName[n]),
          }))
          .filter((g) => g.fields.length > 0)
      : null;

  const [activeTab, setActiveTab] = useState(
    validGroups ? validGroups[0].label : null
  );

  if (!validGroups) {
    return (
      <div style={{ display: "grid", gap: 12 }}>
        {itemFields.map((field) => (
          <div key={field.name}>
            {renderField(field, item, updateField, category, folder)}
          </div>
        ))}
      </div>
    );
  }

  const current =
    validGroups.find((g) => g.label === activeTab) || validGroups[0];

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          marginBottom: 12,
          paddingBottom: 8,
          borderBottom: "1px solid rgba(184,149,106,0.16)",
        }}
      >
        {validGroups.map((g) => {
          const active = g.label === current.label;
          return (
            <button
              key={g.label}
              type="button"
              onClick={() => setActiveTab(g.label)}
              style={{
                padding: "7px 12px",
                borderRadius: 999,
                border: active
                  ? "1px solid #BC9966"
                  : "1px solid rgba(184,149,106,0.25)",
                background: active
                  ? "linear-gradient(135deg, rgba(188,153,102,0.22), rgba(217,185,135,0.18))"
                  : "transparent",
                color: active ? "#FFFFFF" : "rgba(245,241,232,0.78)",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.4px",
                cursor: "pointer",
              }}
            >
              {g.label}
            </button>
          );
        })}
      </div>
      <div style={{ display: "grid", gap: 16 }}>
        {typeof current.renderPreview === "function" && (
          <div
            style={{
              border: "1px solid rgba(184,149,106,0.20)",
              borderRadius: 14,
              overflow: "hidden",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 14px",
                background: "rgba(0,0,0,0.32)",
                borderBottom: "1px solid rgba(184,149,106,0.18)",
                color: "#D9B987",
                fontSize: 11,
                letterSpacing: "1.6px",
                textTransform: "uppercase",
                fontWeight: 800,
              }}
            >
              <span>Live preview · {current.label}</span>
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: "1px",
                  color: "rgba(245,241,232,0.55)",
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                this is what visitors see
              </span>
            </div>
            <div style={{ padding: 16 }}>
              {current.renderPreview(item)}
            </div>
          </div>
        )}
        <div style={{ display: "grid", gap: 12 }}>
          {current.fields.map((name) => {
            const field = fieldByName[name];
            return (
              <div key={field.name}>
                {renderField(field, item, updateField, category, folder)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// -------------------- main editor --------------------

function RepeatingListEditor({
  slotKey,
  itemFields,
  groups,
  label,
  category = "misc",
  folder,
  summarise,
}) {
  const slotDoc = useSlotDoc(slotKey);
  const [items, setItems] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [dirty, setDirty] = useState(false);
  const [status, run] = useSaveStatus();

  useEffect(() => {
    if (slotDoc.loading) return;
    const stored =
      slotDoc.data?.json_value?.items ||
      (Array.isArray(slotDoc.data?.json_value)
        ? slotDoc.data.json_value
        : []);
    // Ensure every item has an id (older docs might not)
    const normalised = stored.map((it) => ({
      id: it.id || newId(),
      visible: it.visible !== false,
      ...it,
    }));
    setItems(normalised);
    setDirty(false);
  }, [slotDoc.loading, slotDoc.data, slotKey]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const ids = useMemo(() => items.map((i) => i.id), [items]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setItems((prev) => {
      const oldIndex = prev.findIndex((i) => i.id === active.id);
      const newIndex = prev.findIndex((i) => i.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
    setDirty(true);
  };

  const handleAdd = () => {
    const next = defaultItem(itemFields);
    setItems((prev) => [...prev, next]);
    setExpandedId(next.id);
    setDirty(true);
  };

  const handleChangeItem = (next) => {
    setItems((prev) => prev.map((i) => (i.id === next.id ? next : i)));
    setDirty(true);
  };

  const handleRemoveItem = (id) => {
    if (!confirm("Remove this item? This cannot be undone.")) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
    setDirty(true);
    if (expandedId === id) setExpandedId(null);
  };

  const handleSave = () =>
    run(() =>
      saveSlot(slotKey, {
        slot_type: "json",
        json_value: { items },
        asset_id: null,
        cloudinary_id: null,
        cloudinary_url: null,
        asset_type: null,
        text_value: null,
        color_value: null,
      })
    ).then(() => setDirty(false));

  return (
    <div style={cardStyle}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
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
            Items
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>
            {label || slotKey}
          </div>
          <div
            style={{
              marginTop: 4,
              fontSize: 12,
              color: "rgba(245,241,232,0.55)",
            }}
          >
            {items.length} {items.length === 1 ? "item" : "items"} · Drag the
            handle to reorder · Hidden items don&apos;t render on the site.
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button type="button" onClick={handleAdd} style={buttonStyle("ghost")}>
            + Add
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!dirty}
            style={buttonStyle("primary", !dirty)}
          >
            Save
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <div
          style={{
            padding: 24,
            border: "1px dashed rgba(184, 149, 106, 0.3)",
            borderRadius: 12,
            textAlign: "center",
            color: "rgba(245,241,232,0.6)",
            fontSize: 13,
          }}
        >
          Empty list. Click <strong>+ Add</strong> to create the first item.
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={ids} strategy={verticalListSortingStrategy}>
            {items.map((item) => (
              <ItemRow
                key={item.id}
                item={item}
                itemFields={itemFields}
                groups={groups}
                summarise={summarise}
                expanded={expandedId === item.id}
                onToggleExpand={() =>
                  setExpandedId((cur) => (cur === item.id ? null : item.id))
                }
                onChange={handleChangeItem}
                onRemove={() => handleRemoveItem(item.id)}
                category={category}
                folder={folder}
              />
            ))}
          </SortableContext>
        </DndContext>
      )}

      <div
        style={{
          marginTop: 10,
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
          (dirty ? "Unsaved changes" : "All changes saved")}
      </div>
    </div>
  );
}

export default RepeatingListEditor;
