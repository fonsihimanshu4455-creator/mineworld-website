import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAdminAuth } from "./AdminAuth";
import { schemas, collectionOrder } from "../schemas";

const sidebarLinks = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/settings", label: "Settings" },
  { to: "/admin/submissions", label: "Submissions" },
  ...collectionOrder.map((key) => ({
    to: `/admin/collections/${key}`,
    label: schemas[key].label,
  })),
];

function AdminLayout() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

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
        <div
          style={{
            padding: "6px 8px 18px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            marginBottom: "14px",
          }}
        >
          <div
            style={{
              color: "#E7C98A",
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

        <nav style={{ flex: 1, overflowY: "auto" }}>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "4px" }}>
            {sidebarLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  style={({ isActive }) => ({
                    display: "block",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    color: isActive ? "#18140F" : "#F5F1E8",
                    background: isActive
                      ? "linear-gradient(135deg, #D6B060, #E7C98A)"
                      : "transparent",
                    fontSize: "13.5px",
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
              padding: "9px 12px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.03)",
              color: "#F5F1E8",
              fontSize: "12.5px",
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
              padding: "9px 12px",
              borderRadius: "10px",
              border: "1px solid rgba(255,120,120,0.25)",
              background: "rgba(255,120,120,0.06)",
              color: "#ff9e9e",
              fontSize: "12.5px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Log out
          </button>

          <div
            style={{
              marginTop: "16px",
              color: "#E7C98A",
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
