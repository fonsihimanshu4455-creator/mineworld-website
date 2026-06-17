// ServicesEditor — left column is the live list of services with
// quick visibility toggle + delete; right column is the edit form
// for the currently-selected service. Matches the user's reference
// screenshot.

import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "../Dashboard";
import TextEditor from "../../components/TextEditor";
import EditorSection from "../../components/EditorSection";
import CurrentSiteContentPreview from "../../components/CurrentSiteContentPreview";
import SplitEditorLayout from "../../components/SplitEditorLayout";
import { saveSlot, useSaveStatus, useSlotDoc } from "../../cmsStore";
import { serviceCategories } from "../../../data/serviceCategories";

const SLOT_KEY = "services.items";

function newId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `svc-${Math.random().toString(36).slice(2, 10)}-${Date.now()}`;
}

function emptyService(i = 0) {
  return {
    id: newId(),
    visible: true,
    name: "",
    slug: "",
    short: "",
    tagline: "",
    color: "gold",
    icon: "",
    cover: null,
    sort_index: i,
  };
}

function deriveLabel(s) {
  return s?.name || s?.title || "(untitled)";
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "var(--admin-radius-sm, 10px)",
  border: "1px solid var(--admin-border-strong, rgba(31,45,77,0.16))",
  background: "var(--admin-surface, #FFFFFF)",
  color: "var(--admin-text, #1A1A1A)",
  fontSize: 14,
  outline: "none",
  fontFamily: "inherit",
  boxSizing: "border-box",
};

const labelStyle = {
  display: "block",
  fontSize: 11.5,
  fontWeight: 800,
  color: "var(--admin-accent-deep, #8B6E48)",
  letterSpacing: "1.2px",
  textTransform: "uppercase",
  marginBottom: 6,
};

function ToggleSwitch({ on, onClick, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onClick}
      style={{
        width: 44,
        height: 24,
        borderRadius: 999,
        border: "none",
        padding: 3,
        cursor: "pointer",
        background: on
          ? "linear-gradient(135deg, var(--admin-accent, #B8956A), var(--admin-accent-soft, #C49A5A))"
          : "var(--admin-border, #E8DED1)",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: on ? "flex-end" : "flex-start",
      }}
    >
      <span
        style={{
          display: "block",
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#FFFFFF",
          boxShadow: "0 1px 3px rgba(0,0,0,0.24)",
        }}
      />
    </button>
  );
}

export default function ServicesEditor() {
  const slotDoc = useSlotDoc(SLOT_KEY);
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [dirty, setDirty] = useState(false);
  const [status, run] = useSaveStatus();

  useEffect(() => {
    if (slotDoc.loading) return;
    const stored = slotDoc.data?.json_value?.items;
    const list = Array.isArray(stored) ? stored : [];
    const normalised = list.map((it, i) => ({
      id: it.id || newId(),
      visible: it.visible !== false,
      sort_index: i,
      ...it,
    }));
    setItems(normalised);
    setDirty(false);
    if (normalised.length > 0 && !selectedId) {
      setSelectedId(normalised[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slotDoc.loading, slotDoc.data]);

  const selected = useMemo(
    () => items.find((i) => i.id === selectedId) || null,
    [items, selectedId]
  );

  const persist = (next) =>
    run(() =>
      saveSlot(SLOT_KEY, {
        slot_type: "json",
        json_value: { items: next },
        asset_id: null,
        cloudinary_id: null,
        cloudinary_url: null,
        asset_type: null,
        text_value: null,
        color_value: null,
      })
    ).then(() => setDirty(false));

  const updateItem = (id, patch) => {
    const next = items.map((it) => (it.id === id ? { ...it, ...patch } : it));
    setItems(next);
    setDirty(true);
    persist(next);
  };

  const addItem = () => {
    const next = [...items, emptyService(items.length)];
    setItems(next);
    setSelectedId(next[next.length - 1].id);
    setDirty(true);
    persist(next);
  };

  const removeItem = (id) => {
    if (!confirm("Remove this service? You can also just toggle it off to hide it from the website.")) return;
    const next = items.filter((it) => it.id !== id);
    setItems(next);
    if (selectedId === id) {
      setSelectedId(next[0]?.id || null);
    }
    setDirty(true);
    persist(next);
  };

  const moveItem = (id, delta) => {
    const idx = items.findIndex((it) => it.id === id);
    if (idx === -1) return;
    const target = idx + delta;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[idx], next[target]] = [next[target], next[idx]];
    setItems(next);
    setDirty(true);
    persist(next);
  };

  return (
    <div>
      <PageHeader
        eyebrow="CMS · Services"
        title="Services"
        subtitle="Pick a service on the left to edit it on the right. Toggle a service off to hide it from the public site without losing the content."
        action={
          <button
            type="button"
            onClick={addItem}
            style={{
              padding: "10px 18px",
              borderRadius: 999,
              border: "none",
              background:
                "linear-gradient(135deg, var(--admin-accent, #B8956A), var(--admin-accent-soft, #C49A5A))",
              color: "#FFFFFF",
              fontSize: 13,
              fontWeight: 800,
              cursor: "pointer",
              letterSpacing: "0.2px",
            }}
          >
            + Add New Service
          </button>
        }
      />

      <CurrentSiteContentPreview
        slotKey={SLOT_KEY}
        legacyItems={serviceCategories}
        describeItem={(s) => `${s.name || s.title || "Untitled"}${s.short ? ` — ${s.short}` : ""}`}
      />

      <SplitEditorLayout
        left={
          <EditorSection
            title="All services"
            hint={`${items.length} item${items.length === 1 ? "" : "s"} · Tap any row to edit`}
          >
            {items.length === 0 ? (
              <div
                style={{
                  padding: 22,
                  borderRadius: 12,
                  background: "var(--admin-bg-soft, #F5EFE6)",
                  color: "var(--admin-text-muted, #6B5B47)",
                  fontSize: 13,
                  textAlign: "center",
                  lineHeight: 1.7,
                }}
              >
                No services yet. Click <strong>+ Add New Service</strong> above,
                or use <strong>"Edit existing"</strong> at the top to import the
                bundled defaults.
              </div>
            ) : (
              <div style={{ display: "grid", gap: 8 }}>
                {items.map((it, i) => {
                  const isSelected = it.id === selectedId;
                  return (
                    <div
                      key={it.id}
                      onClick={() => setSelectedId(it.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "12px 14px",
                        borderRadius: 12,
                        border: isSelected
                          ? "1px solid var(--admin-accent, #B8956A)"
                          : "1px solid var(--admin-border, #E8DED1)",
                        background: isSelected
                          ? "linear-gradient(180deg, rgba(184,149,106,0.10), rgba(184,149,106,0.04))"
                          : "var(--admin-surface, #FFFFFF)",
                        cursor: "pointer",
                        transition: "all 0.18s ease",
                      }}
                    >
                      <div
                        aria-hidden="true"
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 8,
                          background: "var(--admin-bg-soft, #F5EFE6)",
                          color: "var(--admin-accent-deep, #8B6E48)",
                          display: "grid",
                          placeItems: "center",
                          fontSize: 16,
                          fontWeight: 800,
                          flexShrink: 0,
                        }}
                      >
                        {it.icon || "✦"}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontWeight: 700,
                            color: "var(--admin-text, #1A1A1A)",
                            fontSize: 14,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {deriveLabel(it)}
                        </div>
                        {it.short && (
                          <div
                            style={{
                              fontSize: 12,
                              color: "var(--admin-text-muted, #6B5B47)",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {it.short}
                          </div>
                        )}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ToggleSwitch
                          on={it.visible !== false}
                          onClick={() => updateItem(it.id, { visible: it.visible === false })}
                          label="Visibility"
                        />
                        <button
                          type="button"
                          onClick={() => moveItem(it.id, -1)}
                          disabled={i === 0}
                          title="Move up"
                          style={{
                            padding: "6px 8px",
                            borderRadius: 8,
                            border: "1px solid var(--admin-border, #E8DED1)",
                            background: "transparent",
                            cursor: i === 0 ? "not-allowed" : "pointer",
                            opacity: i === 0 ? 0.4 : 1,
                            color: "var(--admin-text, #1A1A1A)",
                            fontSize: 11,
                          }}
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          onClick={() => moveItem(it.id, +1)}
                          disabled={i === items.length - 1}
                          title="Move down"
                          style={{
                            padding: "6px 8px",
                            borderRadius: 8,
                            border: "1px solid var(--admin-border, #E8DED1)",
                            background: "transparent",
                            cursor: i === items.length - 1 ? "not-allowed" : "pointer",
                            opacity: i === items.length - 1 ? 0.4 : 1,
                            color: "var(--admin-text, #1A1A1A)",
                            fontSize: 11,
                          }}
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          onClick={() => removeItem(it.id)}
                          title="Delete"
                          style={{
                            padding: "6px 8px",
                            borderRadius: 8,
                            border: "1px solid rgba(196,69,69,0.24)",
                            background: "rgba(196,69,69,0.06)",
                            color: "var(--admin-error, #C44545)",
                            cursor: "pointer",
                            fontSize: 11,
                          }}
                        >
                          🗑
                        </button>
                      </div>
                    </div>
                  );
                })}
                <div
                  style={{
                    marginTop: 4,
                    fontSize: 11.5,
                    color:
                      status.kind === "error"
                        ? "var(--admin-error, #C44545)"
                        : status.kind === "saving"
                        ? "var(--admin-warn, #B8810B)"
                        : "var(--admin-text-muted, #6B5B47)",
                  }}
                >
                  {status.message || (dirty ? "Saving…" : "All changes saved")}
                </div>
              </div>
            )}
          </EditorSection>
        }
        right={
          selected ? (
            <EditorSection
              title={`Edit · ${deriveLabel(selected)}`}
              hint="Save happens automatically as you change fields."
            >
              <div>
                <label style={labelStyle}>Service name</label>
                <input
                  type="text"
                  value={selected.name || ""}
                  onChange={(e) =>
                    updateItem(selected.id, { name: e.target.value })
                  }
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Slug (URL)</label>
                <input
                  type="text"
                  value={selected.slug || ""}
                  onChange={(e) =>
                    updateItem(selected.id, { slug: e.target.value })
                  }
                  placeholder="website-development"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Short tagline</label>
                <input
                  type="text"
                  value={selected.short || ""}
                  onChange={(e) =>
                    updateItem(selected.id, { short: e.target.value })
                  }
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Tagline (longer)</label>
                <textarea
                  value={selected.tagline || ""}
                  rows={3}
                  onChange={(e) =>
                    updateItem(selected.id, { tagline: e.target.value })
                  }
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>
              <div>
                <label style={labelStyle}>Icon (emoji or 1-char)</label>
                <input
                  type="text"
                  value={selected.icon || ""}
                  onChange={(e) =>
                    updateItem(selected.id, { icon: e.target.value })
                  }
                  placeholder="🌐"
                  maxLength={2}
                  style={{ ...inputStyle, width: 80, fontSize: 18, textAlign: "center" }}
                />
              </div>
              <div>
                <label style={labelStyle}>Accent (gold | navy | blue)</label>
                <select
                  value={selected.color || "gold"}
                  onChange={(e) =>
                    updateItem(selected.id, { color: e.target.value })
                  }
                  style={inputStyle}
                >
                  <option value="gold">Gold</option>
                  <option value="navy">Navy</option>
                  <option value="blue">Blue</option>
                </select>
              </div>
              <TextEditor
                slotKey={`services.item_${selected.id}.detailed_description`}
                label="Detailed description (saved as its own slot)"
                multiline
                fallback=""
              />
            </EditorSection>
          ) : (
            <EditorSection title="Select a service to edit">
              <div
                style={{
                  padding: 32,
                  textAlign: "center",
                  color: "var(--admin-text-muted, #6B5B47)",
                  fontSize: 13,
                  lineHeight: 1.7,
                }}
              >
                Click any service on the left to edit it here.
              </div>
            </EditorSection>
          )
        }
      />
    </div>
  );
}
