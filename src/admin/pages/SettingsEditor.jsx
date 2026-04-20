import { useEffect, useState } from "react";
import { contentStore } from "../contentStore";
import { siteConfig as defaultConfig } from "../../data/siteConfig";
import Field from "../components/Field";
import { PageHeader } from "./Dashboard";

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
  };
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
