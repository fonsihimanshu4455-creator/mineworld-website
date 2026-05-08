import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { openContactModal } from "../../utils/contactActions";
import { useSiteSettings } from "../../admin/hooks";
import { siteConfig as defaultSiteConfig } from "../../data/siteConfig";
import defaultLogo from "../../assets/mineworld-logo.png";

const baseNavItems = [
  { label: "Home", target: "home" },
  { label: "Services", target: "services" },
  { label: "Portfolio", target: "portfolio" },
  { label: "Packages", path: "/packages" },
];

const trailingNavItem = { label: "Contact", target: "footer" };

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
  const settings = useSiteSettings(defaultSiteConfig);
  const navItems = useMemo(() => {
    const extras = [];
    if (settings.navbar?.showAbout) {
      extras.push({ label: "About", path: "/about" });
    }
    if (settings.navbar?.showProcess) {
      extras.push({ label: "Process", path: "/process" });
    }
    if (settings.navbar?.showInsights) {
      extras.push({ label: "Insights", path: "/insights" });
    }
    if (settings.navbar?.showReviews) {
      extras.push({ label: "Reviews", path: "/reviews" });
    }
    if (settings.navbar?.showFaq) {
      extras.push({ label: "FAQ", path: "/faq" });
    }
    return [...baseNavItems, ...extras, trailingNavItem];
  }, [
    settings.navbar?.showAbout,
    settings.navbar?.showProcess,
    settings.navbar?.showInsights,
    settings.navbar?.showReviews,
    settings.navbar?.showFaq,
  ]);
  const logoSrc = settings.logo?.src || defaultLogo;
  const logoWidth = Number(settings.logo?.width) || 40;
  const logoScale = Number(settings.logo?.scale) || 1.7;
  const logoPosition = settings.logo?.position || "center";
  const brandName = settings.brand?.shortName || "Mineworld";

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
    [navItems]
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
          "linear-gradient(180deg, rgba(250,247,242,0.98) 0%, rgba(250,247,242,0.92) 58%, rgba(250,247,242,0.55) 82%, rgba(250,247,242,0) 100%)",
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
          border: scrolled
            ? "1px solid rgba(26,26,26,0.08)"
            : "1px solid rgba(26,26,26,0.05)",
          background: scrolled
            ? "rgba(255,255,255,0.92)"
            : "rgba(255,255,255,0.78)",
          boxShadow: scrolled
            ? "0 18px 42px rgba(15,42,68,0.10)"
            : "0 10px 28px rgba(15,42,68,0.06)",
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
                placeItems:
                  logoPosition === "left"
                    ? "center start"
                    : logoPosition === "right"
                    ? "center end"
                    : logoPosition === "top"
                    ? "start center"
                    : logoPosition === "bottom"
                    ? "end center"
                    : "center",
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.08), 0 10px 28px rgba(255,255,255,0.08)",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <img
                src={logoSrc}
                alt={`${brandName} Logo`}
                style={{
                  width: isMobile ? `${Math.round(logoWidth * 0.85)}px` : `${logoWidth}px`,
                  height: "auto",
                  objectFit: "contain",
                  transform: `scale(${logoScale})`,
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
                  color: "var(--text-primary)",
                  fontSize: isMobile ? "21px" : "27px",
                  fontWeight: 650,
                  letterSpacing: "-0.3px",
                  fontFamily:
                    '"Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
                }}
              >
                {brandName}
              </div>
              <div
                style={{
                  color: "#BC9966",
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
                  gap: "4px",
                  flexWrap: "wrap",
                  justifyContent: "flex-end",
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
                          ? "rgba(184,149,106,0.12)"
                          : "transparent",
                        border: "none",
                        color: isActive
                          ? "var(--accent-gold)"
                          : "var(--text-primary)",
                        fontSize: "14.5px",
                        fontWeight: isActive ? 800 : 600,
                        letterSpacing: "0.1px",
                        cursor: "pointer",
                        padding: "9px 12px",
                        borderRadius: "999px",
                        transition:
                          "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        fontFamily:
                          '"Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
                        boxShadow: isActive
                          ? "inset 0 0 0 1px rgba(184,149,106,0.20)"
                          : "none",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.color = "var(--accent-gold)";
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.color = "var(--text-primary)";
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
                            "linear-gradient(90deg, rgba(188,153,102,0.15), rgba(188,153,102,0.98), rgba(188,153,102,0.15))",
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
                  background: "var(--accent-navy)",
                  color: "#FFFFFF",
                  fontSize: "15px",
                  fontWeight: 700,
                  letterSpacing: "0.1px",
                  cursor: "pointer",
                  boxShadow: "0 14px 30px rgba(15,42,68,0.18)",
                  fontFamily:
                    '"Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--accent-gold)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--accent-navy)";
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
                border: "1px solid rgba(26,26,26,0.10)",
                background: "rgba(255,255,255,0.5)",
                color: "var(--text-primary)",
                fontSize: "24px",
                cursor: "pointer",
                flexShrink: 0,
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--accent-gold)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-primary)";
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
                  borderTop: "1px solid rgba(26,26,26,0.08)",
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
                          ? "rgba(184,149,106,0.12)"
                          : "transparent",
                        border: isActive
                          ? "1px solid rgba(184,149,106,0.25)"
                          : "1px solid transparent",
                        color: isActive
                          ? "var(--accent-gold)"
                          : "var(--text-primary)",
                        textAlign: "left",
                        fontSize: "18px",
                        fontWeight: isActive ? 800 : 600,
                        padding: "12px 14px",
                        borderRadius: "16px",
                        cursor: "pointer",
                        transition:
                          "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
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
                    background: "var(--accent-navy)",
                    color: "#FFFFFF",
                    fontSize: "15px",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
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