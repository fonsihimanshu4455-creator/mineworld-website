import { useEffect, useState } from "react";
import { contentStore } from "../contentStore";
import {
  siteConfig as defaultConfig,
  sectionVisibilityMeta,
} from "../../data/siteConfig";
import Field from "../components/Field";
import { PageHeader } from "./Dashboard";

const sectionLabelByKey = sectionVisibilityMeta.reduce((acc, m) => {
  acc[m.key] = m.label;
  return acc;
}, {});

function getSavedSettings() {
  return contentStore.get("settings") || {};
}

function mergedSettings() {
  const saved = getSavedSettings();
  return {
    brand: { ...defaultConfig.brand, ...(saved.brand || {}) },
    contact: { ...defaultConfig.contact, ...(saved.contact || {}) },
    social: { ...defaultConfig.social, ...(saved.social || {}) },
    logo: {
      src: "",
      width: 40,
      scale: 1.7,
      position: "center",
      ...(saved.logo || {}),
    },
    stores: {
      appStore: "",
      playStore: "",
      ...(saved.stores || {}),
    },
    sectionVisibility: {
      ...(defaultConfig.sectionVisibility || {}),
      ...(saved.sectionVisibility || {}),
    },
    sectionOrder: (() => {
      const fallback = defaultConfig.sectionOrder || [];
      const saved_order = Array.isArray(saved.sectionOrder)
        ? saved.sectionOrder
        : [];
      const valid = saved_order.filter((k) => fallback.includes(k));
      const missing = fallback.filter((k) => !valid.includes(k));
      return valid.length ? [...valid, ...missing] : fallback;
    })(),
    navbar: {
      ...(defaultConfig.navbar || {}),
      ...(saved.navbar || {}),
    },
    seo: {
      ...(defaultConfig.seo || {}),
      ...(saved.seo || {}),
    },
    chat: {
      ...(defaultConfig.chat || {}),
      ...(saved.chat || {}),
    },
  };
}

function SectionOrderList({ order, visibility, onReorder, onToggle }) {
  const [dragKey, setDragKey] = useState(null);

  const move = (idx, dir) => {
    const next = [...order];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    const [item] = next.splice(idx, 1);
    next.splice(target, 0, item);
    onReorder(next);
  };

  const onDragStart = (key) => (e) => {
    setDragKey(key);
    e.dataTransfer.effectAllowed = "move";
  };
  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };
  const onDrop = (overKey) => (e) => {
    e.preventDefault();
    if (!dragKey || dragKey === overKey) {
      setDragKey(null);
      return;
    }
    const next = [...order];
    const from = next.indexOf(dragKey);
    const to = next.indexOf(overKey);
    if (from < 0 || to < 0) return;
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onReorder(next);
    setDragKey(null);
  };

  return (
    <div style={{ display: "grid", gap: "6px" }}>
      {order.map((key, idx) => {
        const label = sectionLabelByKey[key] || key;
        const visible = visibility[key] !== false;
        const isDragging = dragKey === key;
        return (
          <div
            key={key}
            draggable
            onDragStart={onDragStart(key)}
            onDragOver={onDragOver}
            onDrop={onDrop(key)}
            onDragEnd={() => setDragKey(null)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 12px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: isDragging
                ? "rgba(214,176,96,0.12)"
                : visible
                ? "rgba(255,255,255,0.025)"
                : "rgba(255,120,120,0.04)",
              opacity: isDragging ? 0.6 : 1,
              transition: "background 0.2s ease",
            }}
          >
            <span
              aria-hidden="true"
              title="Drag to reorder"
              style={{
                cursor: "grab",
                color: "#E7C98A",
                fontWeight: 800,
                fontSize: "16px",
                userSelect: "none",
                padding: "2px 4px",
              }}
            >
              ⋮⋮
            </span>
            <span
              style={{
                color: visible ? "#F5F1E8" : "rgba(243,239,231,0.45)",
                fontSize: "13.5px",
                fontWeight: 700,
                flex: 1,
                textDecoration: visible ? "none" : "line-through",
              }}
            >
              {idx + 1}. {label}
            </span>
            <button
              type="button"
              onClick={() => move(idx, -1)}
              disabled={idx === 0}
              aria-label={`Move ${label} up`}
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.04)",
                color: idx === 0 ? "rgba(243,239,231,0.25)" : "#F5F1E8",
                cursor: idx === 0 ? "not-allowed" : "pointer",
                fontSize: "13px",
                fontWeight: 700,
              }}
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => move(idx, 1)}
              disabled={idx === order.length - 1}
              aria-label={`Move ${label} down`}
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.04)",
                color:
                  idx === order.length - 1
                    ? "rgba(243,239,231,0.25)"
                    : "#F5F1E8",
                cursor:
                  idx === order.length - 1 ? "not-allowed" : "pointer",
                fontSize: "13px",
                fontWeight: 700,
              }}
            >
              ↓
            </button>
            <label
              style={{
                display: "inline-flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <span
                role="switch"
                aria-checked={visible}
                style={{
                  position: "relative",
                  width: "36px",
                  height: "20px",
                  borderRadius: "999px",
                  background: visible
                    ? "linear-gradient(135deg, #D6B060, #E7C98A)"
                    : "rgba(255,255,255,0.18)",
                  flexShrink: 0,
                  transition: "background 0.2s ease",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "2px",
                    left: visible ? "18px" : "2px",
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    background: "#fff",
                    transition: "left 0.2s ease",
                  }}
                />
              </span>
              <input
                type="checkbox"
                checked={visible}
                onChange={(e) => onToggle(key, e.target.checked)}
                style={{ display: "none" }}
              />
            </label>
          </div>
        );
      })}
    </div>
  );
}

function ToggleRow({ label, checked, onChange, hint }) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        padding: "12px 14px",
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.08)",
        background: checked
          ? "rgba(214,176,96,0.08)"
          : "rgba(255,255,255,0.02)",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <span
          style={{
            color: "#F5F1E8",
            fontSize: "14px",
            fontWeight: 700,
          }}
        >
          {label}
        </span>
        {hint ? (
          <span
            style={{
              color: "rgba(243,239,231,0.55)",
              fontSize: "11.5px",
            }}
          >
            {hint}
          </span>
        ) : null}
      </div>
      <span
        role="switch"
        aria-checked={checked}
        style={{
          position: "relative",
          width: "42px",
          height: "24px",
          borderRadius: "999px",
          background: checked
            ? "linear-gradient(135deg, #D6B060, #E7C98A)"
            : "rgba(255,255,255,0.18)",
          flexShrink: 0,
          transition: "background 0.2s ease",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "2px",
            left: checked ? "20px" : "2px",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "#fff",
            transition: "left 0.2s ease",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          }}
        />
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ display: "none" }}
      />
    </label>
  );
}

function Section({ title, children }) {
  return (
    <section
      style={{
        marginBottom: "24px",
        padding: "22px 24px",
        borderRadius: "18px",
        border: "1px solid rgba(255,255,255,0.08)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
      }}
    >
      <h2
        style={{
          margin: "0 0 18px",
          fontSize: "18px",
          color: "#F5F1E8",
          fontWeight: 800,
          letterSpacing: "-0.2px",
        }}
      >
        {title}
      </h2>
      <div style={{ display: "grid", gap: "14px" }}>{children}</div>
    </section>
  );
}

function SettingsEditor() {
  const [settings, setSettings] = useState(mergedSettings);
  const [savedMsg, setSavedMsg] = useState("");

  useEffect(() => {
    document.title = "Settings · Mineworld Admin";
  }, []);

  const updatePath = (path, value) => {
    setSettings((prev) => {
      const clone = structuredClone(prev);
      let node = clone;
      for (let i = 0; i < path.length - 1; i++) {
        node[path[i]] = node[path[i]] || {};
        node = node[path[i]];
      }
      node[path[path.length - 1]] = value;
      return clone;
    });
  };

  const handleSave = () => {
    contentStore.set("settings", settings);
    setSavedMsg("Saved. Live on the site now.");
    setTimeout(() => setSavedMsg(""), 2500);
  };

  const handleReset = () => {
    if (!window.confirm("Reset Settings to defaults?")) return;
    contentStore.remove("settings");
    setSettings(mergedSettings());
    setSavedMsg("Reset to defaults.");
    setTimeout(() => setSavedMsg(""), 2500);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Settings"
        title="Brand, contact & logo."
        subtitle="These values appear across the whole site — navbar, footer, WhatsApp button, schema markup."
      />

      <Section title="Brand">
        <Field
          field={{ key: "name", label: "Brand name", type: "text" }}
          value={settings.brand.name}
          onChange={(v) => updatePath(["brand", "name"], v)}
        />
        <Field
          field={{ key: "shortName", label: "Short name", type: "text" }}
          value={settings.brand.shortName}
          onChange={(v) => updatePath(["brand", "shortName"], v)}
        />
        <Field
          field={{ key: "website", label: "Website URL", type: "text" }}
          value={settings.brand.website}
          onChange={(v) => updatePath(["brand", "website"], v)}
        />
      </Section>

      <Section title="Contact">
        <Field
          field={{
            key: "whatsappNumber",
            label: "WhatsApp number (with country code, no +)",
            type: "text",
          }}
          value={settings.contact.whatsappNumber}
          onChange={(v) => updatePath(["contact", "whatsappNumber"], v)}
        />
        <Field
          field={{ key: "email", label: "Email", type: "text" }}
          value={settings.contact.email}
          onChange={(v) => updatePath(["contact", "email"], v)}
        />
        <Field
          field={{ key: "address", label: "Address", type: "textarea" }}
          value={settings.contact.address}
          onChange={(v) => updatePath(["contact", "address"], v)}
        />
      </Section>

      <Section title="Social Links">
        <Field
          field={{ key: "instagram", label: "Instagram URL", type: "text" }}
          value={settings.social.instagram}
          onChange={(v) => updatePath(["social", "instagram"], v)}
        />
        <Field
          field={{ key: "facebook", label: "Facebook URL", type: "text" }}
          value={settings.social.facebook}
          onChange={(v) => updatePath(["social", "facebook"], v)}
        />
        <Field
          field={{ key: "youtube", label: "YouTube URL", type: "text" }}
          value={settings.social.youtube}
          onChange={(v) => updatePath(["social", "youtube"], v)}
        />
        <Field
          field={{ key: "linkedin", label: "LinkedIn URL", type: "text" }}
          value={settings.social.linkedin}
          onChange={(v) => updatePath(["social", "linkedin"], v)}
        />
      </Section>

      <Section title="App Store Links">
        <Field
          field={{
            key: "appStore",
            label: "Apple App Store URL",
            type: "text",
          }}
          value={settings.stores.appStore}
          onChange={(v) => updatePath(["stores", "appStore"], v)}
        />
        <Field
          field={{
            key: "playStore",
            label: "Google Play Store URL",
            type: "text",
          }}
          value={settings.stores.playStore}
          onChange={(v) => updatePath(["stores", "playStore"], v)}
        />
        <div
          style={{
            color: "#9aa3b8",
            fontSize: "12px",
            lineHeight: 1.6,
          }}
        >
          Leave blank if you don&apos;t have an app yet — the badges will
          render unclickable. Once you paste real URLs the badges become live
          download links.
        </div>
      </Section>

      <Section title="Logo">
        <Field
          field={{ key: "src", label: "Logo image (upload or URL)", type: "media-src" }}
          value={settings.logo.src}
          onChange={(v) => updatePath(["logo", "src"], v)}
        />
        <Field
          field={{ key: "width", label: "Base width (px)", type: "number" }}
          value={settings.logo.width}
          onChange={(v) => updatePath(["logo", "width"], v)}
        />
        <Field
          field={{
            key: "scale",
            label: "Scale multiplier (e.g. 1.0 – 2.2)",
            type: "number",
          }}
          value={settings.logo.scale}
          onChange={(v) => updatePath(["logo", "scale"], v)}
        />
        <Field
          field={{
            key: "position",
            label: "Logo alignment inside circle",
            type: "select",
            options: ["center", "left", "right", "top", "bottom"],
          }}
          value={settings.logo.position}
          onChange={(v) => updatePath(["logo", "position"], v)}
        />

        <div
          style={{
            marginTop: "6px",
            padding: "14px",
            borderRadius: "14px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(0,0,0,0.25)",
          }}
        >
          <div
            style={{
              fontSize: "11.5px",
              letterSpacing: "1.4px",
              textTransform: "uppercase",
              color: "#E7C98A",
              fontWeight: 700,
              marginBottom: "10px",
            }}
          >
            Preview
          </div>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 30% 30%, #fff, #ebebeb)",
              display: "grid",
              placeItems:
                settings.logo.position === "left"
                  ? "center start"
                  : settings.logo.position === "right"
                  ? "center end"
                  : settings.logo.position === "top"
                  ? "start center"
                  : settings.logo.position === "bottom"
                  ? "end center"
                  : "center",
              overflow: "hidden",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.12)",
            }}
          >
            {settings.logo.src ? (
              <img
                src={settings.logo.src}
                alt="Logo preview"
                style={{
                  width: `${settings.logo.width}px`,
                  height: "auto",
                  transform: `scale(${settings.logo.scale || 1})`,
                }}
              />
            ) : (
              <span style={{ color: "#888", fontSize: "11px" }}>No logo</span>
            )}
          </div>
        </div>
      </Section>

      <Section title="Home Page Sections — Order, Show / Hide">
        <div
          style={{
            color: "rgba(243,239,231,0.65)",
            fontSize: "12.5px",
            lineHeight: 1.6,
            marginBottom: "4px",
          }}
        >
          Drag rows by the ⋮⋮ handle (or use the ↑/↓ buttons on mobile) to
          reorder sections on the home page. Toggle the switch to show / hide
          a section. Hero stays pinned at the top.
        </div>
        <SectionOrderList
          order={settings.sectionOrder || []}
          visibility={settings.sectionVisibility || {}}
          onReorder={(next) => setSettings((p) => ({ ...p, sectionOrder: next }))}
          onToggle={(key, v) => updatePath(["sectionVisibility", key], v)}
        />
        <button
          type="button"
          onClick={() =>
            setSettings((p) => ({
              ...p,
              sectionOrder: defaultConfig.sectionOrder || [],
            }))
          }
          style={{
            marginTop: "10px",
            alignSelf: "flex-start",
            padding: "8px 14px",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
            color: "#F5F1E8",
            fontSize: "12px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Reset order to default
        </button>
      </Section>

      <Section title="Navbar — Extra Pages">
        <div
          style={{
            color: "rgba(243,239,231,0.65)",
            fontSize: "12.5px",
            lineHeight: 1.6,
            marginBottom: "4px",
          }}
        >
          Add extra page links to the top navbar. Default items (Home, Services,
          Portfolio, Packages, Contact) always show. Tip: when you hide a
          section from the home page above, expose it here so visitors can still
          find it.
        </div>
        <ToggleRow
          label="Show 'About' in navbar"
          hint="Links to /about — Founder + Team page"
          checked={Boolean(settings.navbar?.showAbout)}
          onChange={(v) => updatePath(["navbar", "showAbout"], v)}
        />
        <ToggleRow
          label="Show 'Process' in navbar"
          hint="Links to /process — your delivery workflow page"
          checked={Boolean(settings.navbar?.showProcess)}
          onChange={(v) => updatePath(["navbar", "showProcess"], v)}
        />
        <ToggleRow
          label="Show 'Insights' in navbar"
          hint="Links to /insights — your blog / articles page"
          checked={Boolean(settings.navbar?.showInsights)}
          onChange={(v) => updatePath(["navbar", "showInsights"], v)}
        />
        <ToggleRow
          label="Show 'Reviews' in navbar"
          hint="Links to /reviews — full client reviews page"
          checked={Boolean(settings.navbar?.showReviews)}
          onChange={(v) => updatePath(["navbar", "showReviews"], v)}
        />
        <ToggleRow
          label="Show 'FAQ' in navbar"
          hint="Links to /faq — questions & answers page"
          checked={Boolean(settings.navbar?.showFaq)}
          onChange={(v) => updatePath(["navbar", "showFaq"], v)}
        />
      </Section>

      <Section title="SEO & Social Sharing">
        <div
          style={{
            color: "rgba(243,239,231,0.65)",
            fontSize: "12.5px",
            lineHeight: 1.6,
            marginBottom: "4px",
          }}
        >
          The Open Graph image shows up when someone shares your site on
          WhatsApp, LinkedIn, Twitter, Slack, etc. Recommended:{" "}
          <strong>1200×630 JPG/PNG</strong>, under 1 MB.
        </div>
        <Field
          field={{
            key: "defaultOgImage",
            label: "Default share preview image (1200×630)",
            type: "media-src",
          }}
          value={settings.seo?.defaultOgImage}
          onChange={(v) => updatePath(["seo", "defaultOgImage"], v)}
        />
        <Field
          field={{
            key: "defaultDescription",
            label: "Default site description (used as fallback)",
            type: "textarea",
          }}
          value={settings.seo?.defaultDescription}
          onChange={(v) => updatePath(["seo", "defaultDescription"], v)}
        />
      </Section>

      <Section title="Chat Widget">
        <div
          style={{
            color: "rgba(243,239,231,0.65)",
            fontSize: "12.5px",
            lineHeight: 1.6,
            marginBottom: "4px",
          }}
        >
          A floating chat button (bottom-right) that opens a panel with quick
          replies. Each reply jumps the visitor to WhatsApp with a pre-filled
          message.
        </div>
        <ToggleRow
          label="Enable chat widget"
          hint="Show the chat bubble across the site"
          checked={settings.chat?.enabled !== false}
          onChange={(v) => updatePath(["chat", "enabled"], v)}
        />
        <Field
          field={{
            key: "greeting",
            label: "Welcome message",
            type: "text",
          }}
          value={settings.chat?.greeting}
          onChange={(v) => updatePath(["chat", "greeting"], v)}
        />
        <Field
          field={{
            key: "quickReplies",
            label: "Quick reply options (one per line)",
            type: "string-list",
          }}
          value={settings.chat?.quickReplies || []}
          onChange={(v) => updatePath(["chat", "quickReplies"], v)}
        />
      </Section>

      <div
        style={{
          position: "sticky",
          bottom: "10px",
          display: "flex",
          gap: "10px",
          padding: "12px 16px",
          borderRadius: "16px",
          background:
            "linear-gradient(180deg, rgba(17,24,39,0.95), rgba(11,15,26,0.98))",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
          backdropFilter: "blur(10px)",
          alignItems: "center",
          flexWrap: "wrap",
          zIndex: 40,
        }}
      >
        <button
          onClick={handleSave}
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
          Save Settings
        </button>
        <button
          onClick={handleReset}
          style={{
            padding: "12px 18px",
            borderRadius: "999px",
            border: "1px solid rgba(255,120,120,0.26)",
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

export default SettingsEditor;
