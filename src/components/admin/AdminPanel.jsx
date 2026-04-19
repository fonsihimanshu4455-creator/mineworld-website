import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteContent } from "../../context/SiteContent";
import { theme } from "../../styles/theme";

const ADMIN_PASS_KEY = "mw_admin_unlocked_v1";
const ADMIN_PASSWORD = "mineworld2026"; // client-side gate; not real security

const TABS = [
  { id: "contact", label: "Contact" },
  { id: "social", label: "Social" },
  { id: "hero", label: "Hero" },
  { id: "cta", label: "CTA" },
  { id: "results", label: "Results" },
  { id: "footer", label: "Footer" },
  { id: "portfolio", label: "Portfolio" },
  { id: "advanced", label: "Import / Export" },
];

function isAdminHash() {
  if (typeof window === "undefined") return false;
  return window.location.hash === "#admin";
}

export default function AdminPanel() {
  const [open, setOpen] = useState(() => isAdminHash());
  const [unlocked, setUnlocked] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem(ADMIN_PASS_KEY) === "1";
  });
  const [activeTab, setActiveTab] = useState("contact");

  useEffect(() => {
    const onHash = () => setOpen(isAdminHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const close = () => {
    if (window.location.hash === "#admin") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 5000,
            background: "rgba(4, 8, 18, 0.86)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            display: "flex",
            alignItems: "stretch",
            justifyContent: "center",
            padding: "10px",
            overflowY: "auto",
          }}
        >
          {!unlocked ? (
            <PasswordGate
              onUnlock={() => {
                window.sessionStorage.setItem(ADMIN_PASS_KEY, "1");
                setUnlocked(true);
              }}
              onClose={close}
            />
          ) : (
            <AdminEditor
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onClose={close}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PasswordGate({ onUnlock, onClose }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (value === ADMIN_PASSWORD) {
      onUnlock();
    } else {
      setError("Incorrect password.");
    }
  };

  return (
    <motion.form
      initial={{ y: 20, scale: 0.98, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      exit={{ y: 16, scale: 0.98, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onSubmit={submit}
      style={{
        margin: "auto",
        width: "100%",
        maxWidth: "420px",
        background: "linear-gradient(180deg, #1a2238 0%, #131a2c 100%)",
        border: `1px solid ${theme.colors.lineStrong}`,
        borderRadius: "24px",
        padding: "32px 26px",
        boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
      }}
    >
      <div
        style={{
          color: theme.colors.goldSoft,
          fontSize: "12px",
          letterSpacing: "2.5px",
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: "12px",
        }}
      >
        Mineworld Admin
      </div>
      <h2
        style={{
          margin: 0,
          color: theme.colors.text,
          fontSize: "26px",
          fontWeight: 800,
          letterSpacing: "-0.4px",
        }}
      >
        Unlock site editor
      </h2>
      <p style={{ color: theme.colors.textSoft, marginTop: "10px", fontSize: "14px", lineHeight: 1.7 }}>
        Enter the admin password to edit content, contact info and links. Changes are saved on this device.
      </p>

      <input
        ref={inputRef}
        type="password"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setError("");
        }}
        placeholder="Admin password"
        style={inputStyle()}
      />

      {error && (
        <div
          role="alert"
          style={{
            marginTop: "12px",
            color: "#FFB4A2",
            fontSize: "13px",
            background: "rgba(255,99,71,0.08)",
            border: "1px solid rgba(255,99,71,0.28)",
            padding: "10px 12px",
            borderRadius: "12px",
          }}
        >
          {error}
        </div>
      )}

      <div style={{ display: "flex", gap: "10px", marginTop: "18px" }}>
        <button type="submit" style={primaryBtn()}>Unlock</button>
        <button type="button" onClick={onClose} style={secondaryBtn()}>Close</button>
      </div>

      <div style={{ marginTop: "18px", fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
        Default password: <span style={{ color: theme.colors.goldSoft }}>{ADMIN_PASSWORD}</span> (change in <code>AdminPanel.jsx</code>).
      </div>
    </motion.form>
  );
}

function AdminEditor({ activeTab, setActiveTab, onClose }) {
  const { content, updateContent, replaceOverrides, resetContent, overrides } =
    useSiteContent();

  const tabContent = useMemo(() => {
    switch (activeTab) {
      case "contact":
        return (
          <Section title="Contact information">
            <Row>
              <TextField
                label="Primary phone"
                value={content.contact.phonePrimary}
                onChange={(v) =>
                  updateContent({ contact: { phonePrimary: v } })
                }
                placeholder="+91 9758850933"
              />
              <TextField
                label="WhatsApp number (digits only, with country code)"
                value={content.contact.whatsappNumber}
                onChange={(v) =>
                  updateContent({ contact: { whatsappNumber: v.replace(/\D/g, "") } })
                }
                placeholder="919758850933"
              />
            </Row>
            <TextField
              label="Email address"
              value={content.contact.email}
              onChange={(v) => updateContent({ contact: { email: v } })}
              placeholder="hello@example.com"
            />
            <TextArea
              label="Office address"
              value={content.contact.address}
              onChange={(v) => updateContent({ contact: { address: v } })}
              rows={2}
            />
            <TextField
              label="Address Google Maps URL"
              value={content.contact.addressMapUrl}
              onChange={(v) => updateContent({ contact: { addressMapUrl: v } })}
              placeholder="https://maps.google.com/..."
            />
          </Section>
        );

      case "social":
        return (
          <Section title="Social & web links">
            <TextField
              label="Instagram URL"
              value={content.social.instagram}
              onChange={(v) => updateContent({ social: { instagram: v } })}
            />
            <TextField
              label="Public website URL"
              value={content.social.websiteUrl}
              onChange={(v) => updateContent({ social: { websiteUrl: v } })}
            />
          </Section>
        );

      case "hero":
        return (
          <Section title="Hero section">
            <TextField
              label="Eyebrow (small uppercase text above headline)"
              value={content.hero.eyebrow}
              onChange={(v) => updateContent({ hero: { eyebrow: v } })}
            />
            <Row>
              <TextField
                label="Headline — line 1"
                value={content.hero.headlineLineOne}
                onChange={(v) =>
                  updateContent({ hero: { headlineLineOne: v } })
                }
              />
              <TextField
                label="Headline — line 2"
                value={content.hero.headlineLineTwo}
                onChange={(v) =>
                  updateContent({ hero: { headlineLineTwo: v } })
                }
              />
            </Row>
            <TextArea
              label="Description paragraph"
              value={content.hero.description}
              onChange={(v) => updateContent({ hero: { description: v } })}
              rows={4}
            />
            <ListEditor
              label="Service badges"
              items={content.hero.badges}
              onChange={(arr) => updateContent({ hero: { badges: arr } })}
            />
            <TextField
              label="Caption line"
              value={content.hero.captionLine}
              onChange={(v) => updateContent({ hero: { captionLine: v } })}
            />
            <Row>
              <TextField
                label="Video overlay eyebrow"
                value={content.hero.overlayEyebrow}
                onChange={(v) =>
                  updateContent({ hero: { overlayEyebrow: v } })
                }
              />
            </Row>
            <Row>
              <TextField
                label="Video overlay — line 1"
                value={content.hero.overlayLineOne}
                onChange={(v) =>
                  updateContent({ hero: { overlayLineOne: v } })
                }
              />
              <TextField
                label="Video overlay — line 2"
                value={content.hero.overlayLineTwo}
                onChange={(v) =>
                  updateContent({ hero: { overlayLineTwo: v } })
                }
              />
            </Row>
            <TextField
              label="Hero video URL (overrides bundled video — paste a hosted .mp4 link or leave empty)"
              value={content.hero.videoUrl}
              onChange={(v) => updateContent({ hero: { videoUrl: v } })}
              placeholder="https://cdn.example.com/hero.mp4"
            />
            <TextField
              label="Hero poster image URL (mobile thumbnail)"
              value={content.hero.posterUrl}
              onChange={(v) => updateContent({ hero: { posterUrl: v } })}
              placeholder="https://cdn.example.com/poster.png"
            />
          </Section>
        );

      case "cta":
        return (
          <Section title="Call-to-action section">
            <TextField
              label="Eyebrow"
              value={content.cta.eyebrow}
              onChange={(v) => updateContent({ cta: { eyebrow: v } })}
            />
            <Row>
              <TextField
                label="Headline — line 1"
                value={content.cta.headlineLineOne}
                onChange={(v) =>
                  updateContent({ cta: { headlineLineOne: v } })
                }
              />
              <TextField
                label="Headline — line 2"
                value={content.cta.headlineLineTwo}
                onChange={(v) =>
                  updateContent({ cta: { headlineLineTwo: v } })
                }
              />
            </Row>
            <TextArea
              label="Description"
              value={content.cta.description}
              onChange={(v) => updateContent({ cta: { description: v } })}
              rows={4}
            />
            <ListEditor
              label="Chip labels"
              items={content.cta.chips}
              onChange={(arr) => updateContent({ cta: { chips: arr } })}
            />
          </Section>
        );

      case "results":
        return (
          <Section title="Results / proof">
            <TextField
              label="Eyebrow"
              value={content.results.eyebrow}
              onChange={(v) => updateContent({ results: { eyebrow: v } })}
            />
            <Row>
              <TextField
                label="Headline prefix"
                value={content.results.headlinePrefix}
                onChange={(v) =>
                  updateContent({ results: { headlinePrefix: v } })
                }
              />
              <TextField
                label="Headline highlight (gold)"
                value={content.results.headlineHighlight}
                onChange={(v) =>
                  updateContent({ results: { headlineHighlight: v } })
                }
              />
            </Row>
            <TextArea
              label="Description"
              value={content.results.description}
              onChange={(v) => updateContent({ results: { description: v } })}
              rows={3}
            />

            <div style={{ marginTop: "18px" }}>
              {content.results.proofCards.map((card, idx) => (
                <ProofCardEditor
                  key={idx}
                  card={card}
                  onChange={(next) => {
                    const proofCards = [...content.results.proofCards];
                    proofCards[idx] = next;
                    updateContent({ results: { proofCards } });
                  }}
                />
              ))}
            </div>
          </Section>
        );

      case "footer":
        return (
          <Section title="Footer">
            <TextArea
              label="Footer description"
              value={content.footer.description}
              onChange={(v) =>
                updateContent({ footer: { description: v } })
              }
              rows={3}
            />
            <ListEditor
              label="Services list"
              items={content.footer.services}
              onChange={(arr) =>
                updateContent({ footer: { services: arr } })
              }
            />
            <TextField
              label="Legal / copyright line"
              value={content.footer.legal}
              onChange={(v) => updateContent({ footer: { legal: v } })}
            />
          </Section>
        );

      case "portfolio":
        return (
          <Section title="Portfolio overrides">
            <p
              style={{
                color: theme.colors.textSoft,
                fontSize: "13px",
                lineHeight: 1.7,
                marginBottom: "12px",
              }}
            >
              Override portfolio item titles, descriptions, or video URLs. Leave a field empty to keep the original. Video URL must point to a hosted <code>.mp4</code>.
            </p>
            {[1, 2, 3, 4].map((id) => {
              const o = content.portfolioOverrides?.[id] || {};
              return (
                <div
                  key={id}
                  style={{
                    border: `1px solid ${theme.colors.line}`,
                    borderRadius: "16px",
                    padding: "16px",
                    marginBottom: "12px",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  <div
                    style={{
                      color: theme.colors.goldSoft,
                      fontSize: "11px",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      marginBottom: "10px",
                      fontWeight: 700,
                    }}
                  >
                    Portfolio Item #{id}
                  </div>
                  <TextField
                    label="Override title"
                    value={o.title || ""}
                    onChange={(v) =>
                      updateContent({
                        portfolioOverrides: { [id]: { ...o, title: v } },
                      })
                    }
                  />
                  <TextArea
                    label="Override description"
                    value={o.description || ""}
                    onChange={(v) =>
                      updateContent({
                        portfolioOverrides: { [id]: { ...o, description: v } },
                      })
                    }
                    rows={3}
                  />
                  <TextField
                    label="Override video URL (hosted .mp4)"
                    value={o.videoUrl || ""}
                    onChange={(v) =>
                      updateContent({
                        portfolioOverrides: { [id]: { ...o, videoUrl: v } },
                      })
                    }
                    placeholder="https://cdn.example.com/video.mp4"
                  />
                </div>
              );
            })}
          </Section>
        );

      case "advanced":
        return (
          <Section title="Import / export / reset">
            <p style={{ color: theme.colors.textSoft, fontSize: "14px", lineHeight: 1.7 }}>
              Changes are saved in your browser only. To publish them for everyone, export the JSON and send it to your developer to commit into <code>defaultContent.js</code>.
            </p>
            <ImportExport
              overrides={overrides}
              replaceOverrides={replaceOverrides}
              resetContent={resetContent}
            />
          </Section>
        );

      default:
        return null;
    }
  }, [activeTab, content, overrides, updateContent, replaceOverrides, resetContent]);

  return (
    <motion.div
      initial={{ y: 24, scale: 0.98, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      exit={{ y: 16, scale: 0.98, opacity: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      style={{
        margin: "auto",
        width: "100%",
        maxWidth: "1100px",
        background: "linear-gradient(180deg, #131a2c 0%, #0f1626 100%)",
        border: `1px solid ${theme.colors.lineStrong}`,
        borderRadius: "24px",
        boxShadow: "0 30px 90px rgba(0,0,0,0.6)",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr)",
        overflow: "hidden",
        maxHeight: "min(96vh, 1000px)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 18px",
          borderBottom: `1px solid ${theme.colors.line}`,
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#7CFFB2",
              boxShadow: "0 0 10px rgba(124,255,178,0.7)",
            }}
          />
          <div>
            <div
              style={{
                color: theme.colors.text,
                fontWeight: 800,
                fontSize: "16px",
                lineHeight: 1.1,
              }}
            >
              Mineworld Admin
            </div>
            <div
              style={{
                color: theme.colors.textSoft,
                fontSize: "12px",
              }}
            >
              Edit content, links and contact info
            </div>
          </div>
        </div>
        <button onClick={onClose} aria-label="Close admin" style={iconBtn()}>×</button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr)",
          gap: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "8px",
            padding: "12px 12px 0",
            overflowX: "auto",
            borderBottom: `1px solid ${theme.colors.line}`,
            scrollbarWidth: "thin",
          }}
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                background:
                  activeTab === t.id
                    ? "rgba(214,176,96,0.16)"
                    : "transparent",
                border:
                  activeTab === t.id
                    ? "1px solid rgba(214,176,96,0.34)"
                    : "1px solid transparent",
                color: activeTab === t.id ? "#F7D58A" : theme.colors.text,
                fontWeight: 700,
                padding: "10px 14px",
                borderRadius: "12px 12px 0 0",
                cursor: "pointer",
                whiteSpace: "nowrap",
                fontSize: "13px",
                transition: "all 0.2s ease",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div
          style={{
            padding: "20px",
            overflowY: "auto",
            maxHeight: "calc(min(96vh, 1000px) - 130px)",
          }}
        >
          {tabContent}
        </div>
      </div>
    </motion.div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <div
        style={{
          color: theme.colors.goldSoft,
          fontSize: "11px",
          letterSpacing: "2.5px",
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: "10px",
        }}
      >
        Section
      </div>
      <h3
        style={{
          margin: "0 0 18px",
          color: theme.colors.text,
          fontSize: "22px",
          fontWeight: 800,
        }}
      >
        {title}
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {children}
      </div>
    </div>
  );
}

function Row({ children }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "14px",
      }}
    >
      {children}
    </div>
  );
}

function TextField({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <label style={{ display: "block" }}>
      <div style={labelStyle()}>{label}</div>
      <input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={inputStyle()}
      />
    </label>
  );
}

function TextArea({ label, value, onChange, rows = 3, placeholder }) {
  return (
    <label style={{ display: "block" }}>
      <div style={labelStyle()}>{label}</div>
      <textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        style={{ ...inputStyle(), resize: "vertical", minHeight: "80px" }}
      />
    </label>
  );
}

function ListEditor({ label, items, onChange }) {
  const list = Array.isArray(items) ? items : [];
  const update = (idx, val) => {
    const next = [...list];
    next[idx] = val;
    onChange(next);
  };
  const remove = (idx) => onChange(list.filter((_, i) => i !== idx));
  const add = () => onChange([...list, ""]);

  return (
    <div>
      <div style={labelStyle()}>{label}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {list.map((item, idx) => (
          <div key={idx} style={{ display: "flex", gap: "8px" }}>
            <input
              value={item}
              onChange={(e) => update(idx, e.target.value)}
              style={{ ...inputStyle(), marginBottom: 0 }}
            />
            <button
              type="button"
              onClick={() => remove(idx)}
              aria-label={`Remove item ${idx + 1}`}
              style={iconBtn()}
            >
              ×
            </button>
          </div>
        ))}
        <button type="button" onClick={add} style={ghostBtn()}>
          + Add item
        </button>
      </div>
    </div>
  );
}

function ProofCardEditor({ card, onChange }) {
  return (
    <div
      style={{
        border: `1px solid ${theme.colors.line}`,
        borderRadius: "16px",
        padding: "16px",
        marginBottom: "12px",
        background: "rgba(255,255,255,0.02)",
      }}
    >
      <div
        style={{
          color: theme.colors.goldSoft,
          fontSize: "11px",
          letterSpacing: "2px",
          textTransform: "uppercase",
          marginBottom: "10px",
          fontWeight: 700,
        }}
      >
        Proof card {card.number}
      </div>
      <Row>
        <TextField
          label="Number label"
          value={card.number}
          onChange={(v) => onChange({ ...card, number: v })}
        />
        <TextField
          label="Counter (animates up — e.g. +32, 2.5M, ₹1.8L)"
          value={card.counter}
          onChange={(v) => onChange({ ...card, counter: v })}
        />
        <TextField
          label="Stat suffix"
          value={card.statSuffix}
          onChange={(v) => onChange({ ...card, statSuffix: v })}
        />
      </Row>
      <TextField
        label="Card title"
        value={card.title}
        onChange={(v) => onChange({ ...card, title: v })}
      />
      <TextArea
        label="Description"
        value={card.description}
        onChange={(v) => onChange({ ...card, description: v })}
        rows={2}
      />
      <ListEditor
        label="Tags"
        items={card.tags}
        onChange={(arr) => onChange({ ...card, tags: arr })}
      />
    </div>
  );
}

function ImportExport({ overrides, replaceOverrides, resetContent }) {
  const fileRef = useRef(null);
  const [msg, setMsg] = useState("");

  const exportJson = () => {
    const data = JSON.stringify(overrides, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mineworld-content-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setMsg("Downloaded.");
  };

  const importJson = async (file) => {
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new Error("Invalid file");
      }
      replaceOverrides(parsed);
      setMsg("Imported successfully.");
    } catch {
      setMsg("Could not import — make sure it’s a valid Mineworld JSON.");
    }
  };

  const reset = () => {
    if (window.confirm("Reset all content to defaults? This cannot be undone.")) {
      resetContent();
      setMsg("Reset to defaults.");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button type="button" onClick={exportJson} style={primaryBtn()}>
          Export JSON
        </button>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          style={secondaryBtn()}
        >
          Import JSON
        </button>
        <button type="button" onClick={reset} style={dangerBtn()}>
          Reset to defaults
        </button>
        <input
          type="file"
          ref={fileRef}
          accept="application/json"
          style={{ display: "none" }}
          onChange={(e) => importJson(e.target.files?.[0])}
        />
      </div>
      {msg && (
        <div
          style={{
            marginTop: "12px",
            color: theme.colors.goldSoft,
            fontSize: "13px",
          }}
        >
          {msg}
        </div>
      )}

      <pre
        style={{
          marginTop: "18px",
          padding: "14px",
          background: "rgba(0,0,0,0.35)",
          border: `1px solid ${theme.colors.line}`,
          borderRadius: "14px",
          color: theme.colors.text,
          fontSize: "12px",
          lineHeight: 1.55,
          overflow: "auto",
          maxHeight: "260px",
        }}
      >
        {JSON.stringify(overrides, null, 2) || "{}"}
      </pre>
    </div>
  );
}

/* ---------- styles ---------- */

function inputStyle() {
  return {
    width: "100%",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.04)",
    color: "#FFFFFF",
    padding: "12px 14px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    fontFamily: "inherit",
  };
}

function labelStyle() {
  return {
    marginBottom: "6px",
    color: "#EAE6DD",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.2px",
  };
}

function primaryBtn() {
  return {
    border: "none",
    borderRadius: "999px",
    padding: "12px 20px",
    background: "linear-gradient(135deg, #C9A25D, #E7C98B)",
    color: "#1B1B1B",
    fontSize: "13px",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 12px 26px rgba(214,176,96,0.22)",
  };
}

function secondaryBtn() {
  return {
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: "999px",
    padding: "12px 18px",
    background: "rgba(255,255,255,0.04)",
    color: "#FFFFFF",
    fontSize: "13px",
    fontWeight: 700,
    cursor: "pointer",
  };
}

function ghostBtn() {
  return {
    border: "1px dashed rgba(214,176,96,0.45)",
    borderRadius: "12px",
    padding: "10px 14px",
    background: "transparent",
    color: theme.colors.goldSoft,
    fontSize: "13px",
    fontWeight: 700,
    cursor: "pointer",
    width: "fit-content",
  };
}

function dangerBtn() {
  return {
    border: "1px solid rgba(255,99,71,0.42)",
    borderRadius: "999px",
    padding: "12px 18px",
    background: "rgba(255,99,71,0.08)",
    color: "#FFB4A2",
    fontSize: "13px",
    fontWeight: 700,
    cursor: "pointer",
  };
}

function iconBtn() {
  return {
    width: "38px",
    height: "38px",
    borderRadius: "12px",
    border: `1px solid ${theme.colors.line}`,
    background: "rgba(255,255,255,0.04)",
    color: theme.colors.text,
    fontSize: "18px",
    cursor: "pointer",
    flexShrink: 0,
    display: "grid",
    placeItems: "center",
  };
}
