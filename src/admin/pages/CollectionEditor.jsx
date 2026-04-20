import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { contentStore } from "../contentStore";
import { schemas } from "../schemas";
import Field from "../components/Field";
import { PageHeader } from "./Dashboard";

import { portfolioItems as defaultPortfolio } from "../../data/portfolioItems";
import { serviceCategories as defaultServices } from "../../data/serviceCategories";
import { teamRoles as defaultTeam } from "../../data/teamRoles";
import { testimonials as defaultTestimonials } from "../../data/testimonials";
import { caseStudies as defaultCaseStudies } from "../../data/caseStudies";
import { pricingPlans as defaultPricing } from "../../data/pricingPlans";
import { faqItems as defaultFaqs } from "../../data/faqItems";
import { insights as defaultInsights } from "../../data/insights";
import { clientBrands as defaultBrands } from "../../data/clientBrands";

const defaultsMap = {
  portfolioItems: defaultPortfolio,
  serviceCategories: defaultServices,
  teamRoles: defaultTeam,
  testimonials: defaultTestimonials,
  caseStudies: defaultCaseStudies,
  pricingPlans: defaultPricing,
  faqItems: defaultFaqs,
  insights: defaultInsights,
  clientBrands: defaultBrands,
};

function getCollection(key) {
  const override = contentStore.get(key);
  if (Array.isArray(override)) return override;
  // normalise defaults: strip any non-serialisable keys (like bundled imports) not needed for admin form
  return (defaultsMap[key] || []).map((item) => ({ ...item }));
}

function CollectionEditor() {
  const { key } = useParams();
  const schema = schemas[key];
  const [items, setItems] = useState(() => getCollection(key));
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [savedMsg, setSavedMsg] = useState("");

  useEffect(() => {
    setItems(getCollection(key));
    setSelectedIndex(0);
    if (schema) document.title = `${schema.label} · Mineworld Admin`;
  }, [key, schema]);

  const selected = items[selectedIndex];

  const updateSelected = (field, value) => {
    setItems((prev) => {
      const copy = prev.slice();
      copy[selectedIndex] = { ...(copy[selectedIndex] || {}), [field]: value };
      return copy;
    });
  };

  const addNew = () => {
    const blank = {};
    schema.fields.forEach((f) => {
      if (f.type === "boolean") blank[f.key] = false;
      else if (f.type === "string-list" || f.type === "objects-list")
        blank[f.key] = [];
      else if (f.type === "media") blank[f.key] = {};
      else blank[f.key] = "";
    });
    blank.__hidden = false;
    setItems((prev) => [...prev, blank]);
    setSelectedIndex(items.length);
  };

  const duplicate = (idx) => {
    setItems((prev) => {
      const copy = prev.slice();
      const clone = structuredClone(copy[idx]);
      if (clone[schema.idKey]) {
        clone[schema.idKey] = `${clone[schema.idKey]}-copy`;
      }
      copy.splice(idx + 1, 0, clone);
      return copy;
    });
    setSelectedIndex(idx + 1);
  };

  const move = (idx, dir) => {
    setItems((prev) => {
      const copy = prev.slice();
      const target = idx + dir;
      if (target < 0 || target >= copy.length) return prev;
      [copy[idx], copy[target]] = [copy[target], copy[idx]];
      return copy;
    });
    const next = idx + dir;
    if (next >= 0 && next < items.length) setSelectedIndex(next);
  };

  const toggleHidden = (idx) => {
    setItems((prev) => {
      const copy = prev.slice();
      copy[idx] = { ...copy[idx], __hidden: !copy[idx].__hidden };
      return copy;
    });
  };

  const remove = (idx) => {
    if (!window.confirm("Delete this item? This cannot be undone from here (export a backup first if unsure).")) return;
    setItems((prev) => {
      const copy = prev.slice();
      copy.splice(idx, 1);
      return copy;
    });
    setSelectedIndex((s) => Math.max(0, Math.min(s, items.length - 2)));
  };

  const save = () => {
    contentStore.set(key, items);
    setSavedMsg("Saved. Live on the site now.");
    setTimeout(() => setSavedMsg(""), 2500);
  };

  const resetToDefaults = () => {
    if (!window.confirm(`Reset ${schema.label} to defaults?`)) return;
    contentStore.remove(key);
    setItems(getCollection(key));
    setSelectedIndex(0);
    setSavedMsg("Reset to defaults.");
    setTimeout(() => setSavedMsg(""), 2500);
  };

  if (!schema) {
    return (
      <div>
        <PageHeader eyebrow="Unknown" title="Collection not found." />
        <Link to="/admin" style={{ color: "#E7C98A" }}>← Back to dashboard</Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow={schema.label}
        title={`Manage ${schema.label.toLowerCase()}.`}
        subtitle={`Add, edit, reorder, hide, or delete ${schema.singular.toLowerCase()}s. Changes save to your browser and reflect on the site for this browser.`}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(260px, 300px) 1fr",
          gap: "20px",
          alignItems: "start",
        }}
      >
        <aside
          style={{
            position: "sticky",
            top: "20px",
            padding: "14px",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.08)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
            maxHeight: "calc(100vh - 80px)",
            overflowY: "auto",
          }}
        >
          <button
            onClick={addNew}
            style={{
              width: "100%",
              padding: "11px 14px",
              borderRadius: "10px",
              border: "1px solid rgba(214,176,96,0.45)",
              background: "rgba(214,176,96,0.14)",
              color: "#E7C98A",
              fontWeight: 800,
              fontSize: "13px",
              cursor: "pointer",
              marginBottom: "10px",
            }}
          >
            + Add {schema.singular}
          </button>

          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "6px" }}>
            {items.map((item, idx) => {
              const active = idx === selectedIndex;
              const title =
                item?.[schema.titleKey] ||
                item?.[schema.idKey] ||
                `${schema.singular} ${idx + 1}`;
              const hidden = item?.__hidden;
              return (
                <li key={idx}>
                  <button
                    onClick={() => setSelectedIndex(idx)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "10px 12px",
                      borderRadius: "10px",
                      border: active
                        ? "1px solid rgba(214,176,96,0.55)"
                        : "1px solid rgba(255,255,255,0.06)",
                      background: active
                        ? "rgba(214,176,96,0.12)"
                        : "rgba(255,255,255,0.02)",
                      color: active ? "#E7C98A" : "#F5F1E8",
                      fontSize: "13px",
                      fontWeight: active ? 700 : 600,
                      cursor: "pointer",
                      opacity: hidden ? 0.45 : 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {title}
                    </span>
                    {hidden ? (
                      <span
                        style={{
                          fontSize: "9.5px",
                          padding: "2px 6px",
                          borderRadius: "6px",
                          background: "rgba(255,120,120,0.14)",
                          color: "#ff9e9e",
                          letterSpacing: "1.2px",
                          textTransform: "uppercase",
                          fontWeight: 700,
                        }}
                      >
                        Hidden
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <section>
          {selected ? (
            <>
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                  marginBottom: "18px",
                }}
              >
                <button onClick={() => move(selectedIndex, -1)} style={actionBtn}>
                  ↑ Move up
                </button>
                <button onClick={() => move(selectedIndex, 1)} style={actionBtn}>
                  ↓ Move down
                </button>
                <button onClick={() => duplicate(selectedIndex)} style={actionBtn}>
                  Duplicate
                </button>
                <button
                  onClick={() => toggleHidden(selectedIndex)}
                  style={{
                    ...actionBtn,
                    color: selected.__hidden ? "#E7C98A" : "#F5F1E8",
                  }}
                >
                  {selected.__hidden ? "Unhide" : "Hide"}
                </button>
                <button
                  onClick={() => remove(selectedIndex)}
                  style={{
                    ...actionBtn,
                    borderColor: "rgba(255,120,120,0.28)",
                    color: "#ff9e9e",
                    background: "rgba(255,120,120,0.06)",
                  }}
                >
                  Delete
                </button>
              </div>

              <div
                style={{
                  padding: "22px 24px",
                  borderRadius: "18px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.015))",
                  display: "grid",
                  gap: "16px",
                }}
              >
                {schema.fields.map((f) => (
                  <Field
                    key={f.key}
                    field={f}
                    value={selected[f.key]}
                    onChange={(v) => updateSelected(f.key, v)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div
              style={{
                padding: "40px 20px",
                textAlign: "center",
                color: "#CFC6B8",
                borderRadius: "18px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              No items yet. Click <strong>+ Add {schema.singular}</strong> to
              create one.
            </div>
          )}
        </section>
      </div>

      <div
        style={{
          position: "sticky",
          bottom: "20px",
          marginTop: "24px",
          display: "flex",
          gap: "10px",
          padding: "14px 18px",
          borderRadius: "16px",
          background:
            "linear-gradient(180deg, rgba(17,24,39,0.92), rgba(11,15,26,0.98))",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
          backdropFilter: "blur(10px)",
          alignItems: "center",
        }}
      >
        <button
          onClick={save}
          style={{
            padding: "12px 20px",
            borderRadius: "999px",
            border: "none",
            background: "linear-gradient(135deg, #D6B060, #E7C98A)",
            color: "#18140F",
            fontWeight: 800,
            fontSize: "13.5px",
            cursor: "pointer",
          }}
        >
          Save {schema.label}
        </button>
        <button
          onClick={resetToDefaults}
          style={{
            padding: "12px 18px",
            borderRadius: "999px",
            border: "1px solid rgba(255,120,120,0.28)",
            background: "rgba(255,120,120,0.06)",
            color: "#ff9e9e",
            fontWeight: 700,
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Reset to defaults
        </button>
        {savedMsg ? (
          <span style={{ color: "#E7C98A", fontSize: "13px", fontWeight: 600 }}>
            {savedMsg}
          </span>
        ) : null}
      </div>
    </div>
  );
}

const actionBtn = {
  padding: "8px 12px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.03)",
  color: "#F5F1E8",
  fontWeight: 700,
  fontSize: "12.5px",
  cursor: "pointer",
};

export default CollectionEditor;
