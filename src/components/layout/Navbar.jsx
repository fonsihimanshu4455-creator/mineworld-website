import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { openContactModal } from "../../utils/contactActions";

const navItems = [
  { label: "Home", target: "home" },
  { label: "Services", target: "services" },
  { label: "Portfolio", target: "portfolio" },
  { label: "Packages", path: "/packages" },
  { label: "Contact", target: "footer" },
];

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const navbarOffset = 110;
  const top =
    el.getBoundingClientRect().top + window.pageYOffset - navbarOffset;

  window.scrollTo({
    top,
    behavior: "smooth",
  });
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const goToSection = (id) => {
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }
    scrollToSection(id);
  };

  const handleNavClick = (item) => {
    if (item.path) {
      navigate(item.path);
      return;
    }
    goToSection(item.target);
  };

  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const sectionIds = useMemo(
    () => navItems.filter((i) => i.target).map((i) => i.target),
    []
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 16);

      if (location.pathname !== "/") {
        setActiveSection("");
        return;
      }

      const scrollPosition = window.scrollY + 160;
      let currentSection = "home";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;

        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;

        if (scrollPosition >= top && scrollPosition < bottom) {
          currentSection = id;
          break;
        }
      }

      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 40
      ) {
        currentSection = "footer";
      }

      setActiveSection(currentSection);
    };

    handleResize();
    handleScroll();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionIds, location.pathname]);

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1200,
        padding: isMobile ? "10px 14px 0" : "12px 22px 0",
        background:
          "linear-gradient(180deg, rgba(17,24,39,0.98) 0%, rgba(17,24,39,0.96) 58%, rgba(17,24,39,0.72) 82%, rgba(17,24,39,0) 100%)",
      }}
    >
      <motion.nav
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: "min(1240px, 100%)",
          margin: "0 auto",
          borderRadius: isMobile ? "24px" : "28px",
          border: "1px solid rgba(255,255,255,0.10)",
          background: scrolled
            ? "linear-gradient(180deg, rgba(20,28,46,0.96), rgba(20,28,46,0.93))"
            : "linear-gradient(180deg, rgba(20,28,46,0.90), rgba(20,28,46,0.86))",
          boxShadow: scrolled
            ? "0 18px 42px rgba(0,0,0,0.28)"
            : "0 10px 28px rgba(0,0,0,0.16)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          padding: isMobile ? "14px 16px" : "15px 22px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <button
            onClick={() => goToSection("home")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: isMobile ? "12px" : "15px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <div
              style={{
                width: isMobile ? "46px" : "56px",
                height: isMobile ? "46px" : "56px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.98), rgba(235,235,235,0.93))",
                display: "grid",
                placeItems: "center",
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.08), 0 10px 28px rgba(255,255,255,0.08)",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <img
                src="/src/assets/mineworld-logo.png"
                alt="Mineworld Production Logo"
                style={{
                  width: isMobile ? "34px" : "40px",
                  height: "auto",
                  objectFit: "contain",
                  transform: "scale(1.7)",
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                lineHeight: 1,
              }}
            >
              <div
                style={{
                  color: "#F5F1E9",
                  fontSize: isMobile ? "21px" : "27px",
                  fontWeight: 650,
                  letterSpacing: "-0.3px",
                  fontFamily:
                    '"Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
                }}
              >
                Mineworld
              </div>
              <div
                style={{
                  color: "#D6B060",
                  fontSize: isMobile ? "10px" : "12px",
                  fontWeight: 700,
                  letterSpacing: isMobile ? "1.8px" : "2.4px",
                  textTransform: "uppercase",
                  marginTop: isMobile ? "5px" : "6px",
                  fontFamily:
                    '"Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
                }}
              >
                Production
              </div>
            </div>
          </button>

          {!isMobile ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {navItems.map((item) => {
                  const isActive = item.path
                    ? location.pathname === item.path
                    : activeSection === item.target;
                  const key = item.path || item.target;

                  return (
                    <motion.button
                      key={key}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleNavClick(item)}
                      style={{
                        position: "relative",
                        background: isActive
                          ? "rgba(214,176,96,0.10)"
                          : "transparent",
                        border: "none",
                        color: isActive ? "#F7D58A" : "#F3EFE7",
                        fontSize: "16px",
                        fontWeight: isActive ? 800 : 700,
                        letterSpacing: "0.1px",
                        cursor: "pointer",
                        padding: "10px 14px",
                        borderRadius: "999px",
                        transition: "all 0.28s ease",
                        fontFamily:
                          '"Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
                        boxShadow: isActive
                          ? "inset 0 0 0 1px rgba(214,176,96,0.18), 0 8px 20px rgba(214,176,96,0.08)"
                          : "none",
                      }}
                    >
                      {item.label}

                      <motion.span
                        initial={false}
                        animate={{
                          opacity: isActive ? 1 : 0,
                          scaleX: isActive ? 1 : 0.6,
                        }}
                        transition={{ duration: 0.24, ease: "easeOut" }}
                        style={{
                          position: "absolute",
                          left: "18px",
                          right: "18px",
                          bottom: "5px",
                          height: "2px",
                          borderRadius: "999px",
                          background:
                            "linear-gradient(90deg, rgba(214,176,96,0.15), rgba(214,176,96,0.98), rgba(214,176,96,0.15))",
                          transformOrigin: "center",
                        }}
                      />
                    </motion.button>
                  );
                })}
              </div>

              <motion.button
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openContactModal()}
                style={{
                  border: "none",
                  borderRadius: "999px",
                  padding: "14px 22px",
                  background:
                    "linear-gradient(180deg, rgba(214,176,96,1), rgba(214,176,96,0.90))",
                  color: "#171717",
                  fontSize: "15px",
                  fontWeight: 800,
                  letterSpacing: "0.1px",
                  cursor: "pointer",
                  boxShadow: "0 14px 30px rgba(214,176,96,0.22)",
                  fontFamily:
                    '"Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
                }}
              >
                Start a Project
              </motion.button>
            </div>
          ) : (
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.03)",
                color: "#F5F0E8",
                fontSize: "24px",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <span aria-hidden="true">{menuOpen ? "✕" : "☰"}</span>
            </button>
          )}
        </div>

        <AnimatePresence>
          {isMobile && menuOpen && (
            <motion.div
              id="mobile-nav"
              initial={{ opacity: 0, height: 0, y: -6 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -6 }}
              transition={{ duration: 0.26, ease: "easeOut" }}
              style={{
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  marginTop: "16px",
                  paddingTop: "16px",
                  borderTop: "1px solid rgba(255,255,255,0.10)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {navItems.map((item) => {
                  const isActive = item.path
                    ? location.pathname === item.path
                    : activeSection === item.target;
                  const key = item.path || item.target;

                  return (
                    <button
                      key={key}
                      onClick={() => {
                        handleNavClick(item);
                        setMenuOpen(false);
                      }}
                      style={{
                        background: isActive
                          ? "rgba(214,176,96,0.10)"
                          : "transparent",
                        border: isActive
                          ? "1px solid rgba(214,176,96,0.18)"
                          : "1px solid transparent",
                        color: isActive ? "#F7D58A" : "#F5F0E8",
                        textAlign: "left",
                        fontSize: "18px",
                        fontWeight: isActive ? 800 : 700,
                        padding: "12px 14px",
                        borderRadius: "16px",
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                        fontFamily:
                          '"Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
                      }}
                    >
                      {item.label}
                    </button>
                  );
                })}

                <button
                  onClick={() => {
                    openContactModal();
                    setMenuOpen(false);
                  }}
                  style={{
                    marginTop: "6px",
                    border: "none",
                    borderRadius: "999px",
                    padding: "14px 18px",
                    background:
                      "linear-gradient(180deg, rgba(214,176,96,1), rgba(214,176,96,0.90))",
                    color: "#171717",
                    fontSize: "15px",
                    fontWeight: 800,
                    cursor: "pointer",
                    fontFamily:
                      '"Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
                  }}
                >
                  Start a Project
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}