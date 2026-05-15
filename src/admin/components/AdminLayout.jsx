import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "./AdminAuth";
import useIsMobile from "../../utils/useIsMobile";

const sidebarGroups = [
  {
    id: "dashboard",
    label: "Dashboard",
    defaultOpen: true,
    links: [
      { to: "/admin", label: "Dashboard", end: true },
      { to: "/admin/preview", label: "Live Preview" },
      { to: "/admin/submissions", label: "Submissions" },
    ],
  },
  {
    id: "cms-content",
    label: "CMS · Content",
    defaultOpen: true,
    links: [
      { to: "/admin/cms/hero", label: "Hero" },
      { to: "/admin/cms/manifesto", label: "Manifesto" },
      { to: "/admin/cms/capabilities", label: "Capabilities" },
      { to: "/admin/cms/services", label: "Services" },
      { to: "/admin/cms/process", label: "Process" },
      { to: "/admin/cms/portfolio-items", label: "Portfolio Items" },
      { to: "/admin/cms/editing-showcase", label: "Editing Showcase" },
      { to: "/admin/cms/reels", label: "Reels (alt)" },
      { to: "/admin/cms/team-members", label: "Team Members" },
      { to: "/admin/cms/founder", label: "Founder" },
      { to: "/admin/cms/reviews", label: "Reviews" },
      { to: "/admin/cms/client-logos", label: "Client Logos" },
      { to: "/admin/cms/press", label: "Press / Apps Strip" },
      { to: "/admin/cms/apps", label: "Apps We Ship" },
      { to: "/admin/cms/cta", label: "Closing CTA" },
      { to: "/admin/cms/navbar", label: "Navbar" },
      { to: "/admin/cms/footer", label: "Footer" },
    ],
  },
  {
    id: "cms-assets",
    label: "CMS · Assets",
    defaultOpen: true,
    links: [
      { to: "/admin/cms/assets", label: "Asset Library" },
      { to: "/admin/migrate", label: "Migrate (Phase 1)" },
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
                          display: "block",
                          padding: "9px 14px",
                          borderRadius: 9,
                          color: isActive ? "#18140F" : "#F5F1E8",
                          background: isActive
                            ? "linear-gradient(135deg, #BC9966, #D9B987)"
                            : "transparent",
                          fontSize: isMobile ? "14.5px" : "13px",
                          fontWeight: isActive ? 800 : 600,
                          textDecoration: "none",
                          transition: "all 0.2s ease",
                          letterSpacing: "0.1px",
                        })}
                      >
                        {link.label}
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
            padding: "10px 12px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.03)",
            color: "#F5F1E8",
            fontSize: "13px",
            textDecoration: "none",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "8px",
          }}
        >
          View Site ↗
        </a>
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: "10px",
            border: "1px solid rgba(255,120,120,0.25)",
            background: "rgba(255,120,120,0.06)",
            color: "#ff9e9e",
            fontSize: "13px",
            fontWeight: 700,
            cursor: "pointer",
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
            padding: "22px 16px 80px",
            width: "100%",
          }}
        >
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b0f1a",
        color: "#F5F1E8",
        display: "grid",
        gridTemplateColumns: "minmax(240px, 260px) 1fr",
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
          padding: "36px 40px 80px",
          maxWidth: "1100px",
          width: "100%",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
