import { useEffect, useState } from "react";
import Container from "../common/Container";
import MagneticButton from "../common/MagneticButton";
import { theme } from "../../styles/theme";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth <= 768 : false;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          padding: isMobile ? "14px 0" : "18px 0",
          transition: "all 0.3s ease",
        }}
      >
        <Container>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
              padding: scrolled ? (isMobile ? "12px 14px" : "14px 18px") : "6px 0",
              borderRadius: scrolled ? "24px" : "0px",
              background: scrolled ? "rgba(22,32,51,0.68)" : "transparent",
              backdropFilter: scrolled ? "blur(18px) saturate(135%)" : "none",
              WebkitBackdropFilter: scrolled
                ? "blur(18px) saturate(135%)"
                : "none",
              border: scrolled ? `1px solid ${theme.colors.lineStrong}` : "none",
              boxShadow: scrolled ? theme.shadow.soft : "none",
              transition: "all 0.3s ease",
            }}
          >
            <a
              href="#home"
              onClick={closeMenu}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                color: theme.colors.text,
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "999px",
                  background: theme.colors.goldSoft,
                  boxShadow: `0 0 18px ${theme.colors.glow}`,
                }}
              />
              <div
                style={{
                  fontSize: isMobile ? "18px" : "22px",
                  fontWeight: 800,
                  letterSpacing: "1px",
                  lineHeight: 1,
                }}
              >
                MINEWORLD
              </div>
            </a>

            {!isMobile ? (
              <nav
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "28px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "22px",
                  }}
                >
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      style={{
                        position: "relative",
                        color: theme.colors.textSoft,
                        fontSize: "14px",
                        fontWeight: 500,
                        letterSpacing: "0.2px",
                        textDecoration: "none",
                        paddingBottom: "6px",
                        transition: "color 0.25s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = theme.colors.text;
                        const underline =
                          e.currentTarget.querySelector(".nav-underline");
                        if (underline) {
                          underline.style.transform = "scaleX(1)";
                          underline.style.opacity = "1";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = theme.colors.textSoft;
                        const underline =
                          e.currentTarget.querySelector(".nav-underline");
                        if (underline) {
                          underline.style.transform = "scaleX(0)";
                          underline.style.opacity = "0";
                        }
                      }}
                    >
                      {link.label}
                      <span
                        className="nav-underline"
                        style={{
                          position: "absolute",
                          left: 0,
                          bottom: 0,
                          width: "100%",
                          height: "1px",
                          background: theme.colors.goldSoft,
                          transform: "scaleX(0)",
                          transformOrigin: "left",
                          opacity: 0,
                          transition: "all 0.25s ease",
                        }}
                      />
                    </a>
                  ))}
                </div>

                <MagneticButton style={{ padding: "12px 20px" }}>
                  Start a Project
                </MagneticButton>
              </nav>
            ) : (
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label="Toggle menu"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "16px",
                  border: `1px solid ${theme.colors.lineStrong}`,
                  background: "rgba(34,49,77,0.72)",
                  backdropFilter: "blur(16px) saturate(130%)",
                  WebkitBackdropFilter: "blur(16px) saturate(130%)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  padding: 0,
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "14px",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "2px",
                      borderRadius: "999px",
                      background: theme.colors.text,
                      transition: "all 0.25s ease",
                      transform: menuOpen
                        ? "translateY(6px) rotate(45deg)"
                        : "none",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "6px",
                      left: 0,
                      width: "100%",
                      height: "2px",
                      borderRadius: "999px",
                      background: theme.colors.text,
                      opacity: menuOpen ? 0 : 1,
                      transition: "all 0.25s ease",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: "2px",
                      borderRadius: "999px",
                      background: theme.colors.text,
                      transition: "all 0.25s ease",
                      transform: menuOpen
                        ? "translateY(-6px) rotate(-45deg)"
                        : "none",
                    }}
                  />
                </div>
              </button>
            )}
          </div>
        </Container>
      </header>

      {/* MOBILE MENU */}
      {isMobile && menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            background: "rgba(10,16,28,0.72)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "84px 16px 20px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "560px",
              borderRadius: "28px",
              background: "rgba(22,32,51,0.94)",
              border: `1px solid ${theme.colors.lineStrong}`,
              boxShadow: theme.shadow.deep,
              padding: "24px",
            }}
          >
            <div
              style={{
                color: theme.colors.goldSoft,
                fontSize: "12px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "18px",
              }}
            >
              Navigation
            </div>

            <div
              style={{
                display: "grid",
                gap: "12px",
              }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  style={{
                    padding: "16px 18px",
                    borderRadius: "18px",
                    border: `1px solid ${theme.colors.line}`,
                    background: theme.colors.bgCard,
                    color: theme.colors.text,
                    fontSize: "16px",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div
              style={{
                marginTop: "18px",
                display: "grid",
                gap: "12px",
              }}
            >
              <a
                href="#contact"
                onClick={closeMenu}
                style={{
                  display: "block",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    padding: "16px 18px",
                    borderRadius: "18px",
                    background: theme.colors.goldSoft,
                    color: "#1B1B1B",
                    fontSize: "16px",
                    fontWeight: 700,
                    textAlign: "center",
                  }}
                >
                  Start a Project
                </div>
              </a>

              <a
                href="#portfolio"
                onClick={closeMenu}
                style={{
                  display: "block",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    padding: "16px 18px",
                    borderRadius: "18px",
                    border: `1px solid ${theme.colors.line}`,
                    background: "transparent",
                    color: theme.colors.text,
                    fontSize: "16px",
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  View Work
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;