import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteContent } from "../../context/useSiteContent";
import { adminTheme } from "./ui/adminTheme";
import BrandingEditor from "./sections/BrandingEditor";
import ContactEditor from "./sections/ContactEditor";
import HeroEditor from "./sections/HeroEditor";
import CTAEditor from "./sections/CTAEditor";
import ResultsEditor from "./sections/ResultsEditor";
import ServicesEditor from "./sections/ServicesEditor";
import PortfolioEditor from "./sections/PortfolioEditor";
import FooterEditor from "./sections/FooterEditor";
import DataEditor from "./sections/DataEditor";

const ADMIN_PASS_KEY = "mw_admin_unlocked_v1";
const ADMIN_PASSWORD = "mineworld2026"; // client-side gate; not real security

const SECTIONS = [
  { id: "branding", label: "Branding & Logo", icon: "🅼", component: BrandingEditor },
  { id: "contact", label: "Contact", icon: "☏", component: ContactEditor },
  { id: "hero", label: "Hero Section", icon: "★", component: HeroEditor },
  { id: "services", label: "Services & Pages", icon: "⚙", component: ServicesEditor },
  { id: "portfolio", label: "Portfolio", icon: "▶", component: PortfolioEditor },
  { id: "results", label: "Results / Proof", icon: "📈", component: ResultsEditor },
  { id: "cta", label: "Call to Action", icon: "✦", component: CTAEditor },
  { id: "footer", label: "Footer", icon: "⌘", component: FooterEditor },
  { id: "data", label: "Import / Export", icon: "⇅", component: DataEditor },
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
  const [activeId, setActiveId] = useState("branding");
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
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
          transition={{ duration: 0.24 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 5000,
            background: "rgba(4, 8, 18, 0.88)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
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
            <AdminShell
              activeId={activeId}
              setActiveId={setActiveId}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
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
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
        padding: "20px",
      }}
    >
      <motion.form
        initial={{ y: 24, scale: 0.96, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 16, scale: 0.98, opacity: 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        onSubmit={submit}
        style={{
          width: "100%",
          maxWidth: "440px",
          background:
            "linear-gradient(180deg, #1a2238 0%, #0f1626 100%)",
          border: `1px solid ${adminTheme.colors.borderStrong}`,
          borderRadius: "24px",
          padding: "34px 28px",
          boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "18px",
            background:
              "linear-gradient(135deg, rgba(214,176,96,0.9), rgba(231,201,138,0.6))",
            display: "grid",
            placeItems: "center",
            fontSize: "22px",
            fontWeight: 900,
            color: "#1B1B1B",
            marginBottom: "18px",
            boxShadow: "0 14px 34px rgba(214,176,96,0.25)",
          }}
        >
          M
        </div>

        <div
          style={{
            color: adminTheme.colors.goldSoft,
            fontSize: "11px",
            letterSpacing: "2.8px",
            textTransform: "uppercase",
            fontWeight: 700,
            marginBottom: "8px",
          }}
        >
          Mineworld Admin
        </div>
        <h2
          style={{
            margin: 0,
            color: adminTheme.colors.text,
            fontSize: "28px",
            fontWeight: 800,
            letterSpacing: "-0.5px",
          }}
        >
          Unlock the site editor
        </h2>
        <p
          style={{
            color: adminTheme.colors.textSoft,
            marginTop: "10px",
            fontSize: "14px",
            lineHeight: 1.7,
          }}
        >
          Enter the admin password to edit content, media, contact info, services,
          and the portfolio. Changes are saved to this browser.
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
          style={{ ...adminTheme.input, marginTop: "18px" }}
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
          <button type="submit" style={adminTheme.btnPrimary}>
            Unlock
          </button>
          <button type="button" onClick={onClose} style={adminTheme.btnSecondary}>
            Close
          </button>
        </div>

        <div
          style={{
            marginTop: "20px",
            padding: "10px 12px",
            border: `1px dashed ${adminTheme.colors.border}`,
            borderRadius: "12px",
            fontSize: "12px",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.6,
          }}
        >
          Default password:{" "}
          <span style={{ color: adminTheme.colors.goldSoft, fontWeight: 700 }}>
            {ADMIN_PASSWORD}
          </span>
          <br />
          Change it in <code>src/components/admin/AdminPanel.jsx</code> before launch.
        </div>
      </motion.form>
    </div>
  );
}

function AdminShell({ activeId, setActiveId, sidebarOpen, setSidebarOpen, onClose }) {
  const { overrides, resetContent } = useSiteContent();
  const hasOverrides =
    overrides && typeof overrides === "object" && Object.keys(overrides).length > 0;

  const ActiveComponent = useMemo(() => {
    const found = SECTIONS.find((s) => s.id === activeId);
    return found?.component || (() => null);
  }, [activeId]);

  const activeLabel = SECTIONS.find((s) => s.id === activeId)?.label || "";

  return (
    <motion.div
      initial={{ y: 24, scale: 0.985, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      exit={{ y: 16, scale: 0.99, opacity: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "absolute",
        inset: "16px",
        background: "linear-gradient(180deg, #131a2c 0%, #0b101c 100%)",
        border: `1px solid ${adminTheme.colors.borderStrong}`,
        borderRadius: "22px",
        boxShadow: "0 30px 90px rgba(0,0,0,0.62)",
        overflow: "hidden",
        display: "grid",
        gridTemplateRows: "auto 1fr",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 18px",
          borderBottom: `1px solid ${adminTheme.colors.border}`,
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
          <button
            type="button"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label="Toggle navigation"
            style={{
              ...adminTheme.iconBtn,
              display: "grid",
              placeItems: "center",
            }}
            className="mw-admin-menu-btn"
          >
            ☰
          </button>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg, rgba(214,176,96,1), rgba(231,201,138,0.7))",
              display: "grid",
              placeItems: "center",
              color: "#1B1B1B",
              fontSize: "15px",
              fontWeight: 900,
              flexShrink: 0,
            }}
          >
            M
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                color: adminTheme.colors.text,
                fontWeight: 800,
                fontSize: "15px",
                lineHeight: 1.1,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Mineworld Admin
            </div>
            <div
              style={{
                color: adminTheme.colors.textSoft,
                fontSize: "11.5px",
                marginTop: "2px",
              }}
            >
              {activeLabel}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {hasOverrides && (
            <div
              style={{
                ...adminTheme.chip,
                color: adminTheme.colors.ok,
                background: "rgba(124,255,178,0.08)",
                border: "1px solid rgba(124,255,178,0.3)",
              }}
              className="mw-admin-saved-chip"
            >
              Saved
            </div>
          )}
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  "Reset ALL content to defaults? This wipes every change you've made in the admin."
                )
              ) {
                resetContent();
              }
            }}
            style={{
              ...adminTheme.btnSecondary,
              padding: "9px 12px",
              fontSize: "12px",
            }}
          >
            Reset
          </button>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
            style={{
              ...adminTheme.btnPrimary,
              padding: "9px 16px",
              fontSize: "12px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            View site →
          </a>
        </div>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "240px minmax(0, 1fr)",
          minHeight: 0,
        }}
        className="mw-admin-body"
      >
        <aside
          style={{
            borderRight: `1px solid ${adminTheme.colors.border}`,
            background: "rgba(0,0,0,0.22)",
            padding: "14px 10px",
            overflowY: "auto",
          }}
          className={sidebarOpen ? "mw-admin-sidebar open" : "mw-admin-sidebar"}
        >
          <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {SECTIONS.map((s) => {
              const active = s.id === activeId;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setActiveId(s.id);
                    setSidebarOpen(false);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 12px",
                    borderRadius: "12px",
                    border: "1px solid transparent",
                    background: active
                      ? "linear-gradient(135deg, rgba(214,176,96,0.18), rgba(214,176,96,0.06))"
                      : "transparent",
                    color: active ? "#F7D58A" : adminTheme.colors.text,
                    fontSize: "13.5px",
                    fontWeight: active ? 800 : 600,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s ease",
                    borderColor: active
                      ? "rgba(214,176,96,0.32)"
                      : "transparent",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "22px",
                      display: "grid",
                      placeItems: "center",
                      color: active ? "#F7D58A" : adminTheme.colors.goldSoft,
                      fontSize: "14px",
                    }}
                  >
                    {s.icon}
                  </span>
                  {s.label}
                </button>
              );
            })}
          </nav>

          <div
            style={{
              marginTop: "20px",
              padding: "12px",
              border: `1px solid ${adminTheme.colors.border}`,
              borderRadius: "12px",
              background: "rgba(255,255,255,0.02)",
              fontSize: "11.5px",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.55,
            }}
          >
            Changes are saved automatically in this browser.
            <br />
            <br />
            To publish them for all visitors, go to{" "}
            <strong style={{ color: adminTheme.colors.goldSoft }}>
              Import / Export
            </strong>{" "}
            and download the JSON for your developer.
          </div>
        </aside>

        <main
          style={{
            overflowY: "auto",
            padding: "24px 24px 40px",
            background:
              "radial-gradient(circle at 10% 0%, rgba(214,176,96,0.04), transparent 35%), rgba(0,0,0,0.18)",
          }}
          className="mw-admin-main"
        >
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            style={{ maxWidth: "880px", margin: "0 auto" }}
          >
            <ActiveComponent />
          </motion.div>
        </main>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .mw-admin-body {
            grid-template-columns: minmax(0, 1fr) !important;
          }
          .mw-admin-sidebar {
            position: absolute;
            inset: 68px 0 0 0;
            width: 280px;
            z-index: 4;
            transform: translateX(-110%);
            transition: transform 0.28s ease;
            background: #0b101c !important;
          }
          .mw-admin-sidebar.open {
            transform: translateX(0);
          }
        }
        @media (min-width: 821px) {
          .mw-admin-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 560px) {
          .mw-admin-saved-chip {
            display: none !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
