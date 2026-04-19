import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { openContactModal } from "../../utils/contactActions";
import { useSiteContent } from "../../context/useSiteContent";
import logoImg from "../../assets/mineworld-logo.png";

const navItems = [
  { label: "Home", target: "home" },
  { label: "Services", target: "services" },
  { label: "Work", target: "portfolio" },
  { label: "About", target: "about", route: "/about" },
  { label: "Contact", target: "footer" },
];

function scrollToSectionById(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const navbarOffset = 110;
  const top =
    el.getBoundingClientRect().top + window.pageYOffset - navbarOffset;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navigate = useNavigate();
  const location = useLocation();
  const { content } = useSiteContent();
  const branding = content.branding || {};
  const logoSrc = branding.logoUrl || logoImg;
  const logoCircle = branding.logoCircleSize || 56;
  const logoSize = branding.logoSize || 40;
  const logoScale = branding.logoScale || 1.7;
  const showName = branding.showName !== false;
  const showSubtitle = branding.showSubtitle !== false;
  const subtitle = branding.subtitle ?? "Production";
  const navAlign = branding.navAlign || "space-between";

  const isHome = location.pathname === "/";

  const handleNav = (item) => {
    if (item.route) {
      navigate(item.route);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (!isHome) {
      navigate("/");
      setTimeout(() => scrollToSectionById(item.target), 80);
    } else {
      scrollToSectionById(item.target);
    }
  };

  const scrollToSection = (id) => {
    if (!isHome) {
      navigate("/");
      setTimeout(() => scrollToSectionById(id), 80);
    } else {
      scrollToSectionById(id);
    }
  };

  const sectionIds = useMemo(() => navItems.map((item) => item.target), []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    let lastY = window.scrollY;
    let lastDir = 0;

    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 16);

      // Smart header: hide when scrolling down past 240px, show when scrolling up
      const delta = y - lastY;
      if (Math.abs(delta) > 4) {
        const dir = delta > 0 ? 1 : -1;
        if (dir !== lastDir) {
          lastDir = dir;
          if (y > 240 && dir === 1) {
            setHidden(true);
          } else if (dir === -1 || y <= 240) {
            setHidden(false);
          }
        }
        lastY = y;
      }

      const scrollPosition = y + 160;
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
        window.innerHeight + y >=
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
  }, [sectionIds]);

  // If menu is open we never hide the nav (user is interacting)
  const effectiveHidden = hidden && !menuOpen;

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1200,
        padding: isMobile ? "10px 14px 0" : "12px 22px 0",
        transform: effectiveHidden ? "translateY(-120%)" : "translateY(0)",
        transition: "transform 0.38s cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "transform",
        background:
          "linear-gradient(180deg, rgba(17,24,39,0.98) 0%, rgba(17,24,39,0.96) 58%, rgba(17,24,39,0.72) 82%, rgba(17,24,39,0) 100%)",
      }}
    >
      <motion.nav
        aria-label="Primary"
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
            justifyContent: navAlign,
            gap: "16px",
          }}
        >
          <button
            onClick={() => scrollToSection("home")}
            aria-label="Go to top — Mineworld Production home"
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
                width: isMobile
                  ? Math.max(38, logoCircle - 10) + "px"
                  : logoCircle + "px",
                height: isMobile
                  ? Math.max(38, logoCircle - 10) + "px"
                  : logoCircle + "px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.98), rgba(235,235,235,0.93))",
                display: "grid",
                placeItems: "center",
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.08), 0 10px 28px rgba(255,255,255,0.08)",
                overflow: "hidden",
                flexShrink: 0,
                transition: "width 0.28s ease, height 0.28s ease",
              }}
            >
              <img
                src={logoSrc}
                alt={content.brand?.name || "Logo"}
                style={{
                  width: (isMobile ? Math.max(26, logoSize - 6) : logoSize) + "px",
                  height: "auto",
                  objectFit: "contain",
                  transform: `scale(${logoScale})`,
                  transition: "transform 0.28s ease",
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            {showName && (
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
                  {content.brand?.shortName || "Mineworld"}
                </div>
                {showSubtitle && subtitle && (
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
                    {subtitle}
                  </div>
                )}
              </div>
            )}
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
                  const isActive = item.route
                    ? location.pathname === item.route
                    : isHome && activeSection === item.target;

                  return (
                    <motion.button
                      key={item.target}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleNav(item)}
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
            <motion.button
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              whileTap={{ scale: 0.92 }}
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.10)",
                background: menuOpen
                  ? "rgba(214,176,96,0.14)"
                  : "rgba(255,255,255,0.03)",
                color: menuOpen ? "#F7D58A" : "#F5F0E8",
                fontSize: "22px",
                cursor: "pointer",
                flexShrink: 0,
                display: "grid",
                placeItems: "center",
                transition: "background 0.3s ease, color 0.3s ease",
              }}
            >
              <motion.span
                animate={{ rotate: menuOpen ? 90 : 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "inline-block", lineHeight: 1 }}
              >
                {menuOpen ? "✕" : "☰"}
              </motion.span>
            </motion.button>
          )}
        </div>

        <AnimatePresence>
          {isMobile && menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -6 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -6 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{
                overflow: "hidden",
              }}
            >
              <motion.div
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{
                  show: {
                    transition: { staggerChildren: 0.05, delayChildren: 0.06 },
                  },
                  hidden: { transition: { staggerChildren: 0.02 } },
                }}
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
                  const isActive = item.route
                    ? location.pathname === item.route
                    : isHome && activeSection === item.target;

                  return (
                    <motion.button
                      key={item.target}
                      variants={{
                        hidden: { opacity: 0, x: -12 },
                        show: { opacity: 1, x: 0 },
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        handleNav(item);
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
                    </motion.button>
                  );
                })}

                <motion.button
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    show: { opacity: 1, x: 0 },
                  }}
                  whileTap={{ scale: 0.98 }}
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
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}