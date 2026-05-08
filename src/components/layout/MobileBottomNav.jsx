import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollToSection } from "../../utils/contactActions";
import useIsMobile from "../../utils/useIsMobile";

const items = [
  {
    key: "home",
    label: "Home",
    target: "home",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1V9.5z" />
      </svg>
    ),
  },
  {
    key: "services",
    label: "Services",
    target: "services",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    key: "portfolio",
    label: "Work",
    target: "portfolio",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 5v4" />
      </svg>
    ),
  },
  {
    key: "contact",
    label: "Contact",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
        <path d="M3.5 6.5L12 13l8.5-6.5" />
      </svg>
    ),
  },
];

export default function MobileBottomNav() {
  const isMobile = useIsMobile(900);
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState("home");

  useEffect(() => {
    if (!isMobile) return;
    const onScroll = () => {
      if (location.pathname !== "/") {
        setActive("");
        return;
      }
      const sections = ["home", "services", "portfolio", "footer"];
      const y = window.scrollY + 200;
      let current = "home";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (y >= el.offsetTop && y < el.offsetTop + el.offsetHeight) {
          current = id;
        }
      }
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 40
      ) {
        current = "footer";
      }
      setActive(current === "footer" ? "contact" : current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile, location.pathname]);

  if (!isMobile) return null;

  const goToSection = (id) => {
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }
    scrollToSection(id);
  };

  const handleClick = (item) => {
    if (item.key === "contact") {
      goToSection("footer");
      return;
    }
    goToSection(item.target);
  };

  return (
    <>
      <div style={{ height: "82px" }} aria-hidden="true" />
      <nav
        aria-label="Mobile navigation"
        style={{
          position: "fixed",
          left: "10px",
          right: "10px",
          bottom: "10px",
          zIndex: 1100,
          padding: "8px 6px",
          borderRadius: "22px",
          background:
            "linear-gradient(180deg, rgba(20,28,46,0.97), rgba(13,19,32,0.97))",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 18px 42px rgba(0,0,0,0.45)",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2px",
        }}
      >
        {items.map((item) => {
          const isActive = active === item.key || active === item.target;
          return (
            <button
              key={item.key}
              onClick={() => handleClick(item)}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              style={{
                background: isActive ? "rgba(214,176,96,0.14)" : "transparent",
                border: "none",
                borderRadius: "16px",
                padding: "8px 4px",
                color: isActive ? "#F7D58A" : "#F3EFE7",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontFamily: "inherit",
              }}
            >
              <span style={{ display: "grid", placeItems: "center" }}>
                {item.icon}
              </span>
              <span
                style={{
                  fontSize: "10.5px",
                  letterSpacing: "0.2px",
                  fontWeight: isActive ? 800 : 600,
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
