import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "./AdminAuth";
import { schemas, collectionOrder } from "../schemas";
import useIsMobile from "../../utils/useIsMobile";

const sidebarGroups = [
  {
    id: "dashboard",
    label: "🏠  Home",
    defaultOpen: true,
    links: [
      { to: "/admin", label: "All sections", end: true, icon: "🗂" },
      { to: "/admin/preview", label: "Live preview", icon: "👁" },
      { to: "/admin/submissions", label: "Form submissions", icon: "✉" },
    ],
  },
  {
    id: "cms-content",
    label: "✏️  Edit website sections",
    defaultOpen: true,
    links: [
      { to: "/admin/cms/navbar", label: "Top navigation", icon: "🧭" },
      { to: "/admin/cms/hero", label: "Top banner (with video)", icon: "🎬" },
      { to: "/admin/cms/client-logos", label: "Client logo strip", icon: "🏢" },
      { to: "/admin/cms/manifesto", label: "Big quote strip", icon: "💬" },
      { to: "/admin/cms/capabilities", label: "What we do", icon: "⚡" },
      { to: "/admin/cms/services", label: "Services tiles", icon: "🛠" },
      { to: "/admin/cms/process", label: "How we work", icon: "🛤" },
      { to: "/admin/cms/portfolio-items", label: "Project cards", icon: "📂" },
      { to: "/admin/cms/editing-showcase", label: "Before / After", icon: "🎞" },
      { to: "/admin/cms/reels", label: "Vertical reels", icon: "📱" },
      { to: "/admin/cms/founder", label: "Founder section", icon: "👤" },
      { to: "/admin/cms/team-members", label: "Team", icon: "👥" },
      { to: "/admin/cms/reviews", label: "Customer reviews", icon: "⭐" },
      { to: "/admin/cms/press", label: "As featured in", icon: "📰" },
      { to: "/admin/cms/apps", label: "Apps we ship", icon: "📲" },
      { to: "/admin/cms/cta", label: "Bottom call-to-action", icon: "📣" },
      { to: "/admin/cms/footer", label: "Footer", icon: "🦶" },
    ],
  },
  {
    id: "cms-assets",
    label: "📦  Media & backups",
    defaultOpen: true,
    links: [
      { to: "/admin/cms/assets", label: "All photos & videos", icon: "🖼" },
      { to: "/admin/legacy-dashboard", label: "Backup / Restore", icon: "💾" },
      { to: "/admin/migrate", label: "Initial setup", icon: "🌱" },
    ],
  },
  {
    id: "legacy",
    label: "Legacy",
    defaultOpen: false,
    links: [
      { to: "/admin/settings", label: "Settings" },
      ...collectionOrder.map((key) => ({
        to: `/admin/collections/${key}`,
        label: schemas[key].label,
      })),
    ],
  },
];

const COLLAPSE_KEY = "mineworld:admin:sidebar:v1";
function readCollapseState() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(COLLAPSE_KEY) || "{}");
  } catch {
    return {};
  }
}
function writeCollapseState(state) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(COLLAPSE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

function AdminLayout() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile(900);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(() => readCollapseState());

  const toggleGroup = (id) => {
    setCollapsed((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      writeCollapseState(next);
      return next;
    });
  };

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobile) setDrawerOpen(false);
  }, [isMobile]);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const handleLogout = async () => {
    await logout();
    navigate("/admin");
  };

  const SidebarBody = (
    <>
      <div
        style={{
          padding: "6px 8px 18px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          marginBottom: "14px",
        }}
      >
        <div
          style={{
            color: "#D9B987",
            fontSize: "10.5px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          Mineworld · Admin
        </div>
        <div
          style={{
            color: "#F5F1E8",
            fontSize: "20px",
            fontWeight: 800,
            marginTop: "2px",
            fontFamily: '"Playfair Display", Georgia, serif',
            letterSpacing: "-0.3px",
          }}
        >
          Control Room
        </div>
      </div>

      <nav style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
        {sidebarGroups.map((group) => {
          const isOpen =
            collapsed[group.id] === undefined
              ? group.defaultOpen
              : !collapsed[group.id];
          return (
            <div key={group.id} style={{ marginBottom: 14 }}>
              <button
                type="button"
                onClick={() => toggleGroup(group.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "none",
                  background: "transparent",
                  color: "#D9B987",
                  fontSize: 10.5,
                  letterSpacing: 1.6,
                  textTransform: "uppercase",
                  fontWeight: 700,
                  cursor: "pointer",
                  marginBottom: 4,
                }}
              >
                <span>{group.label}</span>
                <span
                  aria-hidden="true"
                  style={{
                    transition: "transform 0.18s ease",
                    transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
                    fontSize: 10,
                    opacity: 0.7,
                  }}
                >
                  ▼
                </span>
              </button>
              {isOpen && (
                <ul
                  style={{
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    display: "grid",
                    gap: 3,
                  }}
                >
                  {group.links.map((link) => (
                    <li key={link.to}>
                      <NavLink
                        to={link.to}
                        end={link.end}
                        style={({ isActive }) => ({
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "12px 14px",
                          minHeight: 44,
                          borderRadius: 10,
                          color: isActive ? "#18140F" : "#F5F1E8",
                          background: isActive
                            ? "linear-gradient(135deg, #BC9966, #D9B987)"
                            : "transparent",
                          fontSize: isMobile ? "15px" : "14px",
                          fontWeight: isActive ? 800 : 600,
                          textDecoration: "none",
                          transition: "all 0.2s ease",
                          letterSpacing: "0.1px",
                          borderLeft: isActive
                            ? "3px solid var(--admin-accent-deep, #8B6E48)"
                            : "3px solid transparent",
                        })}
                      >
                        {link.icon ? (
                          <span
                            aria-hidden="true"
                            style={{
                              fontSize: 16,
                              width: 22,
                              textAlign: "center",
                              flexShrink: 0,
                            }}
                          >
                            {link.icon}
                          </span>
                        ) : null}
                        <span
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {link.label}
                        </span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </nav>

      <div
        style={{
          paddingTop: "14px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          marginTop: "12px",
        }}
      >
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "block",
            padding: "14px 16px",
            borderRadius: "12px",
            border: "1px solid rgba(184, 149, 106, 0.45)",
            background: "rgba(184, 149, 106, 0.08)",
            color: "#D9B987",
            fontSize: "14px",
            textDecoration: "none",
            fontWeight: 800,
            textAlign: "center",
            marginBottom: "10px",
            letterSpacing: "0.4px",
          }}
        >
          View live site ↗
        </a>
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: "12px",
            border: "1px solid rgba(255,120,120,0.25)",
            background: "rgba(255,120,120,0.06)",
            color: "#ff9e9e",
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: "0.3px",
          }}
        >
          Log out
        </button>

        <div
          style={{
            marginTop: "16px",
            color: "#D9B987",
            fontSize: "18px",
            fontStyle: "italic",
            fontFamily: '"Brush Script MT", "Segoe Script", cursive',
            letterSpacing: "0.4px",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          Himanshu Bhardwaj
        </div>
        <div
          style={{
            color: "rgba(243,239,231,0.45)",
            fontSize: "9.5px",
            letterSpacing: "1.6px",
            textTransform: "uppercase",
            fontWeight: 700,
            textAlign: "center",
            marginTop: "2px",
          }}
        >
          Mineworld Production
        </div>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <div
        className="admin-shell"
        style={{
          minHeight: "100vh",
          background: "#0b0f1a",
          color: "#F5F1E8",
        }}
      >
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            background:
              "linear-gradient(180deg, rgba(17,24,39,0.98), rgba(11,15,26,0.98))",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.04)",
              color: "#F5F1E8",
              fontSize: "20px",
              cursor: "pointer",
              display: "grid",
              placeItems: "center",
            }}
          >
            ☰
          </button>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                color: "#D9B987",
                fontSize: "10px",
                letterSpacing: "1.8px",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              Mineworld · Admin
            </div>
            <div
              style={{
                color: "#F5F1E8",
                fontSize: "15px",
                fontWeight: 800,
                fontFamily: '"Playfair Display", Georgia, serif',
                letterSpacing: "-0.2px",
              }}
            >
              Control Room
            </div>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            aria-label="View site"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.04)",
              color: "#F5F1E8",
              textDecoration: "none",
              display: "grid",
              placeItems: "center",
              fontSize: "16px",
            }}
          >
            ↗
          </a>
        </header>

        {drawerOpen ? (
          <div
            onClick={() => setDrawerOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 80,
              background: "rgba(6,10,18,0.72)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <aside
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "min(320px, 86%)",
                height: "100%",
                padding: "22px 18px",
                background:
                  "linear-gradient(180deg, rgba(17,24,39,1), rgba(11,15,26,1))",
                borderRight: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
              }}
            >
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
                style={{
                  alignSelf: "flex-end",
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.04)",
                  color: "#F5F1E8",
                  fontSize: "18px",
                  cursor: "pointer",
                  marginBottom: "10px",
                }}
              >
                ×
              </button>
              {SidebarBody}
            </aside>
          </div>
        ) : null}

        <main
          style={{
            padding: "24px 18px 96px",
            width: "100%",
            minHeight: "100vh",
            background: "var(--admin-bg, #F8F5EF)",
            color: "var(--admin-text, #1A1A1A)",
          }}
        >
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <div
      className="admin-shell"
      style={{
        minHeight: "100vh",
        background: "#0b0f1a",
        color: "#F5F1E8",
        display: "grid",
        gridTemplateColumns: "var(--admin-sidebar-width, 280px) 1fr",
      }}
    >
      <aside
        style={{
          position: "sticky",
          top: 0,
          alignSelf: "start",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          padding: "24px 18px",
          background:
            "linear-gradient(180deg, rgba(17,24,39,1), rgba(11,15,26,1))",
          borderRight: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {SidebarBody}
      </aside>

      <main
        style={{
          padding: "var(--admin-space-lg, 40px)",
          paddingBottom: 96,
          maxWidth: "var(--admin-content-max, 1200px)",
          width: "100%",
          minHeight: "100vh",
          background: "var(--admin-bg, #F8F5EF)",
          color: "var(--admin-text, #1A1A1A)",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
