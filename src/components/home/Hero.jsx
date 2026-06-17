import { motion } from "framer-motion";
import Container from "../common/Container";
import MagneticButton from "../common/MagneticButton";
import Reveal from "../common/Reveal";
import CursorRunaway from "../common/CursorRunaway";
import RotatingCircleText from "../common/RotatingCircleText";
import { theme } from "../../styles/theme";
import { openContactModal, scrollToSection } from "../../utils/contactActions";
import useIsMobile from "../../utils/useIsMobile";
import LazyVideo from "../common/LazyVideo";
import {
  useMountStagger,
  useFadeIn,
  useRevealOnScroll,
} from "../../utils/gsapHooks";
import { useSiteAsset, useSiteContent } from "../../hooks/useSiteContent";
import { useSiteToggle } from "../../hooks/useSiteToggle";
import RichText from "../../lib/richText.jsx";
import {
  getMobileVideoUrl,
  getOptimizedVideoUrl,
  getVideoPosterUrl,
} from "../../lib/cloudinary";

import heroVideo from "../../assets/hero-video.mp4";
import heroPoster from "../../assets/hero.png";

const DEFAULT_EYEBROW = "Delhi · Websites · Apps · Video · Meta Ads · Growth";
const DEFAULT_SUBHEAD =
  "Mineworld Production is Delhi's full-stack creative + growth studio — premium websites, native-feel mobile apps, retention-first video, Meta ad campaigns, and social media systems built for real leads and revenue, not vanity reach. One team, one standard, one outcome: a brand that looks impossible to ignore.";

function Hero() {
  const isMobile = useIsMobile(768);
  const visible = useSiteToggle("hero.show_section", true);

  const heroVideoAsset = useSiteAsset("hero.video", null);
  const heroPublicId =
    typeof heroVideoAsset === "object" && heroVideoAsset
      ? heroVideoAsset.publicId
      : null;
  const desktopVideoSrc = heroPublicId
    ? getOptimizedVideoUrl(heroPublicId, { maxWidth: 1920 })
    : heroVideoAsset?.url || heroVideo;
  const mobileVideoSrc = heroPublicId
    ? getMobileVideoUrl(heroPublicId)
    : heroVideoAsset?.url || heroVideo;
  const videoPoster = heroPublicId
    ? getVideoPosterUrl(heroPublicId, { width: 1280 })
    : heroPoster;
  // Source list is a fallback chain. If the optimised Cloudinary URL
  // 404s or the network blocks it, LazyVideo walks down the chain
  // until something plays. Bundled mp4 is the ultimate safety net —
  // it's shipped with the bundle, so it can never fail to load.
  const videoSources = [
    mobileVideoSrc && {
      src: mobileVideoSrc,
      type: "video/mp4",
      media: "(max-width: 768px)",
    },
    desktopVideoSrc && { src: desktopVideoSrc, type: "video/mp4" },
    // Final fallback: the bundled video always works, regardless of
    // Cloudinary state. Only adds it if it isn't already in the chain.
    heroVideo &&
      heroVideo !== desktopVideoSrc &&
      heroVideo !== mobileVideoSrc && {
        src: heroVideo,
        type: "video/mp4",
      },
  ].filter(Boolean);
  const heroEyebrow = useSiteContent("hero.eyebrow", DEFAULT_EYEBROW);
  const heroHeadlineRich = useSiteContent("hero.headline_rich", null);
  const heroHeadlineOverride = useSiteContent("hero.headline", null);
  const heroHeadlineColor = useSiteContent("hero.headline_color", null);
  const heroSubhead = useSiteContent("hero.subhead", DEFAULT_SUBHEAD);
  const heroSubheadColor = useSiteContent("hero.subhead_color", null);
  const ctaPrimaryLabel = useSiteContent(
    "hero.cta_primary_label",
    "Start a Project"
  );
  const ctaSecondaryLabel = useSiteContent(
    "hero.cta_secondary_label",
    "View Work"
  );
  // Overlay text on top of the hero video card (bottom-left). Two
  // pieces: a small gold eyebrow + a larger white caption. Both are
  // editable from /admin/cms/hero so the colour + copy can be tuned
  // without touching the codebase.
  const videoCardEyebrow = useSiteContent(
    "hero.video_card_eyebrow",
    "Websites · Apps · Ads"
  );
  const videoCardEyebrowColor = useSiteContent(
    "hero.video_card_eyebrow_color",
    null
  );
  const videoCardCaption = useSiteContent(
    "hero.video_card_caption",
    "Premium digital systems\nengineered to convert visitors into customers"
  );
  const videoCardCaptionColor = useSiteContent(
    "hero.video_card_caption_color",
    null
  );
  const headlineRef = useMountStagger({
    delay: 0.2,
    duration: 0.95,
    stagger: 0.08,
    y: "1.05em",
  });
  const eyebrowRef = useFadeIn({ delay: 0.05, duration: 0.7, y: 10 });
  const subRef = useFadeIn({ delay: 0.85, duration: 0.8, y: 12 });
  const ctaRef = useFadeIn({ delay: 1.05, duration: 0.7, y: 14 });
  const chipsRef = useRevealOnScroll({ stagger: 0.06, y: 12, duration: 0.6 });
  const signatureRef = useFadeIn({ delay: 1.35, duration: 0.9, y: 8 });

  if (!visible) return null;

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: `
          radial-gradient(ellipse at 12% 18%, rgba(184,149,106,0.10), transparent 28%),
          radial-gradient(ellipse at 88% 78%, rgba(15,42,68,0.06), transparent 30%),
          linear-gradient(180deg, #FFFFFF 0%, #FAF7F2 100%)
        `,
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div
        className="dot-grid dot-grid-md"
        style={{ top: "100px", left: "40px" }}
        aria-hidden="true"
      />
      <div
        className="dot-grid dot-grid-gold dot-grid-sm"
        style={{ bottom: "60px", right: "40px" }}
        aria-hidden="true"
      />

      <CursorRunaway />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "120px",
          right: "48px",
          zIndex: 0,
          display: "block",
        }}
        className="hide-tablet"
      >
        <RotatingCircleText size={130} />
      </div>

      <Container
        style={{
          position: "relative",
          zIndex: 2,
          paddingTop: isMobile ? "108px" : "118px",
          paddingBottom: isMobile ? "60px" : "80px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.05fr 0.95fr",
            alignItems: "center",
            gap: isMobile ? "36px" : "56px",
          }}
        >
          <div style={{ textAlign: isMobile ? "center" : "left" }}>
            <div
              ref={eyebrowRef}
              style={{
                fontSize: isMobile ? "11px" : "12px",
                letterSpacing: isMobile ? "2px" : "3px",
                textTransform: "uppercase",
                color: "var(--accent-gold)",
                fontWeight: 800,
                marginBottom: "24px",
              }}
            >
              {heroEyebrow}
            </div>

            <h1
              ref={headlineRef}
              style={{
                margin: 0,
                fontSize: isMobile ? "44px" : "clamp(48px, 6vw, 82px)",
                lineHeight: isMobile ? 0.98 : 0.94,
                fontWeight: 800,
                letterSpacing: isMobile ? "-1.5px" : "-2.2px",
                maxWidth: isMobile ? "100%" : "820px",
                color: heroHeadlineColor || "var(--text-primary)",
              }}
            >
              {heroHeadlineRich ? (
                <span style={{ display: "inline-block", overflow: "hidden" }}>
                  <span data-anim style={{ display: "inline-block" }}>
                    <RichText value={heroHeadlineRich} />
                  </span>
                </span>
              ) : heroHeadlineOverride ? (
                <span style={{ display: "inline-block", overflow: "hidden" }}>
                  <span data-anim style={{ display: "inline-block" }}>
                    {heroHeadlineOverride}
                  </span>
                </span>
              ) : (
                <>
                  <span style={{ display: "inline-block", overflow: "hidden" }}>
                    <span data-anim style={{ display: "inline-block" }}>
                      Websites. Apps.
                    </span>
                  </span>
                  <br />
                  <span style={{ display: "inline-block", overflow: "hidden" }}>
                    <span data-anim style={{ display: "inline-block" }}>
                      Ads that{" "}
                      <span
                        style={{
                          color: "var(--accent-gold)",
                          fontStyle: "italic",
                          fontFamily:
                            '"Playfair Display", Georgia, "Times New Roman", serif',
                        }}
                      >
                        earn revenue
                      </span>
                      .
                    </span>
                  </span>
                </>
              )}
            </h1>

            <p
              ref={subRef}
              style={{
                marginTop: "26px",
                marginBottom: 0,
                maxWidth: isMobile ? "100%" : "720px",
                marginLeft: isMobile ? "auto" : 0,
                marginRight: isMobile ? "auto" : 0,
                color: heroSubheadColor || "var(--text-secondary)",
                fontSize: isMobile ? "16px" : "18px",
                lineHeight: 1.9,
              }}
            >
              {heroSubhead}
            </p>

            <div
              ref={ctaRef}
              style={{
                display: "flex",
                gap: "16px",
                marginTop: "34px",
                flexWrap: "wrap",
                justifyContent: isMobile ? "center" : "flex-start",
              }}
            >
              <button
                onClick={openContactModal}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                <MagneticButton>{ctaPrimaryLabel}</MagneticButton>
              </button>

              <button
                onClick={() => scrollToSection("portfolio")}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                <MagneticButton secondary>{ctaSecondaryLabel}</MagneticButton>
              </button>
            </div>

            <div
              ref={chipsRef}
              style={{
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
                marginTop: "38px",
                justifyContent: isMobile ? "center" : "flex-start",
              }}
            >
              {[
                "Websites",
                "Mobile Apps",
                "Video Editing",
                "Meta Ads",
                "Social Media",
                "Podcast Shoots",
                "Graphic Design",
              ].map((item) => (
                <div
                  key={item}
                  data-gsap-reveal
                  style={{
                    padding: "11px 16px",
                    border: "1px solid var(--border-cream)",
                    borderRadius: "999px",
                    color: "var(--text-primary)",
                    fontSize: isMobile ? "13px" : "14px",
                    background: "var(--bg-secondary)",
                    boxShadow: "0 4px 14px rgba(15,42,68,0.08)",
                    fontWeight: 600,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>

            <Reveal delay={0.5}>
              <div
                style={{
                  marginTop: "28px",
                  fontSize: isMobile ? "12px" : "13px",
                  letterSpacing: isMobile ? "1.2px" : "1.8px",
                  color: "var(--text-muted)",
                  opacity: 0.95,
                  textTransform: "uppercase",
                }}
              >
                Websites. Apps. Content. Ads. Presence.
              </div>
            </Reveal>

            <div
              ref={signatureRef}
              style={{
                marginTop: "34px",
                display: "inline-flex",
                flexDirection: "column",
                alignItems: isMobile ? "center" : "flex-start",
                gap: "6px",
              }}
            >
              <div
                style={{
                  color: "rgba(188,153,102,0.96)",
                  fontSize: isMobile ? "34px" : "44px",
                  lineHeight: 1,
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontFamily:
                    '"Brush Script MT", "Lucida Handwriting", "Segoe Script", cursive',
                  letterSpacing: "0.3px",
                  textShadow: "0 0 16px rgba(188,153,102,0.10)",
                }}
              >
                Mineworld Production
              </div>

              <div
                style={{
                  width: isMobile ? "180px" : "240px",
                  height: "1px",
                  background:
                    "linear-gradient(90deg, rgba(188,153,102,0.72), rgba(188,153,102,0.16), transparent)",
                }}
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.25 }}
            style={{
              position: "relative",
              minHeight: isMobile ? "420px" : "660px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.div
              animate={{ y: isMobile ? 0 : [0, -10, 0] }}
              transition={{
                duration: 5.5,
                repeat: isMobile ? 0 : Infinity,
                ease: "easeInOut",
              }}
              style={{
                width: "100%",
                maxWidth: isMobile ? "100%" : "540px",
                height: isMobile ? "420px" : "580px",
                borderRadius: isMobile ? "24px" : "34px",
                overflow: "hidden",
                position: "relative",
                background: "var(--accent-navy)",
                border: `1px solid ${theme.colors.lineStrong}`,
                boxShadow: `
                  0 30px 80px rgba(0,0,0,0.5),
                  inset 0 0 0.5px rgba(255,255,255,0.2)
                `,
              }}
            >
              <LazyVideo
                sources={videoSources}
                poster={videoPoster}
                ariaLabel="Mineworld Production showreel"
                rootMargin="0px"
                videoStyle={{
                  opacity: 0.95,
                  transform: isMobile ? "scale(1.05)" : "scale(1.12)",
                  filter: "contrast(1.15) brightness(1.05) saturate(1.1)",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.10), rgba(0,0,0,0.22) 35%, rgba(0,0,0,0.78))",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  left: isMobile ? "18px" : "26px",
                  right: isMobile ? "18px" : "26px",
                  bottom: isMobile ? "18px" : "26px",
                }}
              >
                <div
                  style={{
                    fontSize: isMobile ? "11px" : "13px",
                    color: videoCardEyebrowColor || theme.colors.goldSoft,
                    letterSpacing: isMobile ? "1.4px" : "2px",
                    textTransform: "uppercase",
                    marginBottom: "12px",
                  }}
                >
                  {videoCardEyebrow}
                </div>

                <div
                  style={{
                    fontSize: isMobile ? "22px" : "24px",
                    fontWeight: 800,
                    lineHeight: 1.18,
                    color: videoCardCaptionColor || theme.colors.text,
                    textShadow: "0 4px 18px rgba(0,0,0,0.22)",
                    maxWidth: isMobile ? "88%" : "100%",
                    whiteSpace: "pre-line",
                  }}
                >
                  {videoCardCaption}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
