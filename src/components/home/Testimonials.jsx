import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";
import SectionTag from "../common/SectionTag";
import { theme } from "../../styles/theme";
import { testimonials } from "../../data/testimonials";
import useIsMobile from "../../utils/useIsMobile";

function getInitials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function VideoTestimonial({ item, isMobile }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        borderRadius: "24px",
        overflow: "hidden",
        border: `1px solid ${theme.colors.lineStrong}`,
        background: theme.colors.bgCard,
        aspectRatio: isMobile ? "9 / 12" : "9 / 11",
      }}
    >
      {isPlaying ? (
        <video
          autoPlay
          controls
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src={item.videoSrc} type="video/mp4" />
        </video>
      ) : (
        <>
          <img
            src={item.poster}
            alt={`${item.author} video testimonial`}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.78)",
            }}
          />
          <button
            onClick={() => setIsPlaying(true)}
            aria-label={`Play ${item.author} testimonial video`}
            style={{
              position: "absolute",
              inset: 0,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "84px",
                height: "84px",
                borderRadius: "50%",
                background: "rgba(214,176,96,0.92)",
                display: "grid",
                placeItems: "center",
                boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
              }}
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderTop: "12px solid transparent",
                  borderBottom: "12px solid transparent",
                  borderLeft: "20px solid #18140F",
                  marginLeft: "5px",
                }}
              />
            </div>
          </button>
          <div
            style={{
              position: "absolute",
              left: "18px",
              right: "18px",
              bottom: "18px",
              color: theme.colors.text,
            }}
          >
            <div
              style={{
                fontSize: "13px",
                letterSpacing: "1.4px",
                textTransform: "uppercase",
                color: theme.colors.goldSoft,
                fontWeight: 700,
                marginBottom: "6px",
              }}
            >
              {item.result}
            </div>
            <div style={{ fontWeight: 700, fontSize: "16px" }}>
              {item.author}
            </div>
            <div style={{ fontSize: "13px", color: theme.colors.textSoft }}>
              {item.role}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function TextTestimonial({ item, isMobile }) {
  const accent =
    item.accent === "blue"
      ? "rgba(88,110,180,0.18)"
      : "rgba(214,176,96,0.18)";
  const accentBorder =
    item.accent === "blue"
      ? "rgba(88,110,180,0.38)"
      : "rgba(214,176,96,0.38)";

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      style={{
        position: "relative",
        padding: isMobile ? "28px 24px" : "34px 30px",
        borderRadius: "26px",
        border: `1px solid ${theme.colors.line}`,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-60px",
          right: "-60px",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background: accent,
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          padding: "8px 14px",
          borderRadius: "999px",
          border: `1px solid ${accentBorder}`,
          background: "rgba(255,255,255,0.02)",
          color: theme.colors.goldSoft,
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "1.4px",
          textTransform: "uppercase",
          alignSelf: "flex-start",
          marginBottom: "18px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: theme.colors.gold,
          }}
        />
        {item.result}
      </div>

      <p
        style={{
          margin: "0 0 22px",
          color: theme.colors.text,
          fontSize: isMobile ? "16px" : "17px",
          lineHeight: 1.7,
          fontStyle: "italic",
          fontFamily:
            '"Playfair Display", Georgia, "Times New Roman", serif',
          position: "relative",
          zIndex: 2,
          flex: 1,
        }}
      >
        &ldquo;{item.quote}&rdquo;
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, rgba(214,176,96,0.35), rgba(214,176,96,0.10))",
            border: `1px solid ${accentBorder}`,
            display: "grid",
            placeItems: "center",
            color: theme.colors.text,
            fontWeight: 800,
            fontSize: "14px",
            letterSpacing: "0.6px",
            flexShrink: 0,
          }}
        >
          {getInitials(item.author)}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              color: theme.colors.text,
              fontSize: "15px",
              fontWeight: 700,
            }}
          >
            {item.author}
          </div>
          <div
            style={{
              color: theme.colors.textSoft,
              fontSize: "12.5px",
              letterSpacing: "0.2px",
            }}
          >
            {item.role} · {item.location}
          </div>
        </div>
      </div>

      {item.caseStudy && (
        <Link
          to={`/case-studies/${item.caseStudy}`}
          style={{
            marginTop: "18px",
            color: theme.colors.goldSoft,
            fontSize: "12.5px",
            fontWeight: 700,
            letterSpacing: "1.4px",
            textTransform: "uppercase",
            textDecoration: "none",
            position: "relative",
            zIndex: 2,
          }}
        >
          Read the full case study →
        </Link>
      )}
    </motion.div>
  );
}

function Testimonials() {
  const isMobile = useIsMobile(768);
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleCount = isMobile ? 1 : 3;
  const maxIndex = Math.max(0, testimonials.length - visibleCount);

  const next = () => setActiveIndex((i) => Math.min(i + 1, maxIndex));
  const prev = () => setActiveIndex((i) => Math.max(i - 1, 0));

  const visible = testimonials.slice(activeIndex, activeIndex + visibleCount);

  return (
    <section
      id="testimonials"
      style={{
        position: "relative",
        padding: isMobile ? "82px 0" : "122px 0",
        background: `
          radial-gradient(circle at 80% 20%, rgba(214,176,96,0.08), transparent 26%),
          linear-gradient(180deg, rgba(13,20,34,1) 0%, rgba(16,24,39,1) 100%)
        `,
        borderBottom: `1px solid ${theme.colors.line}`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "-6%",
          top: "10%",
          width: isMobile ? "180px" : "280px",
          height: isMobile ? "180px" : "280px",
          borderRadius: "50%",
          background: "rgba(88,110,180,0.08)",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />

      <Container>
        <div
          style={{
            display: "flex",
            alignItems: isMobile ? "flex-start" : "flex-end",
            justifyContent: "space-between",
            gap: "20px",
            flexDirection: isMobile ? "column" : "row",
            marginBottom: "40px",
          }}
        >
          <div>
            <Reveal>
              <SectionTag>Testimonials</SectionTag>
            </Reveal>
            <Reveal delay={0.08}>
              <SectionHeading
                title="What clients actually say — in their own words."
                subtitle="Not edited praise. Real reactions from Delhi brands, clinics, creators, and businesses who worked with Mineworld on content, ads, and growth systems."
              />
            </Reveal>
          </div>

          {!isMobile && testimonials.length > visibleCount && (
            <div style={{ display: "flex", gap: "10px", paddingBottom: "14px" }}>
              <button
                onClick={prev}
                disabled={activeIndex === 0}
                aria-label="Previous testimonial"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  border: `1px solid ${theme.colors.line}`,
                  background: "rgba(255,255,255,0.03)",
                  color: theme.colors.text,
                  cursor: activeIndex === 0 ? "not-allowed" : "pointer",
                  opacity: activeIndex === 0 ? 0.4 : 1,
                  fontSize: "18px",
                  transition: "all 0.25s ease",
                }}
              >
                ←
              </button>
              <button
                onClick={next}
                disabled={activeIndex >= maxIndex}
                aria-label="Next testimonial"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  border: `1px solid ${theme.colors.line}`,
                  background: "rgba(255,255,255,0.03)",
                  color: theme.colors.text,
                  cursor: activeIndex >= maxIndex ? "not-allowed" : "pointer",
                  opacity: activeIndex >= maxIndex ? 0.4 : 1,
                  fontSize: "18px",
                  transition: "all 0.25s ease",
                }}
              >
                →
              </button>
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : `repeat(${visibleCount}, minmax(0, 1fr))`,
              gap: isMobile ? "18px" : "22px",
              alignItems: "stretch",
            }}
          >
            {visible.map((item) =>
              item.type === "video" ? (
                <VideoTestimonial key={item.id} item={item} isMobile={isMobile} />
              ) : (
                <TextTestimonial key={item.id} item={item} isMobile={isMobile} />
              )
            )}
          </motion.div>
        </AnimatePresence>

        {isMobile && testimonials.length > 1 && (
          <div
            style={{
              marginTop: "24px",
              display: "flex",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                style={{
                  width: i === activeIndex ? "22px" : "8px",
                  height: "8px",
                  borderRadius: "999px",
                  border: "none",
                  background:
                    i === activeIndex
                      ? theme.colors.gold
                      : "rgba(255,255,255,0.18)",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
              />
            ))}
          </div>
        )}

        <Reveal delay={0.2}>
          <div
            style={{
              marginTop: "48px",
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
              gap: "16px",
            }}
          >
            {[
              { value: "50+", label: "Projects Delivered" },
              { value: "2.5M+", label: "Views Driven" },
              { value: "₹12L+", label: "Client Revenue Influenced" },
              { value: "4.9/5", label: "Avg Client Rating" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  padding: isMobile ? "18px" : "24px",
                  borderRadius: "20px",
                  border: `1px solid ${theme.colors.line}`,
                  background: "rgba(255,255,255,0.025)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    color: theme.colors.gold,
                    fontSize: isMobile ? "26px" : "34px",
                    fontWeight: 800,
                    letterSpacing: "-0.8px",
                    lineHeight: 1,
                    marginBottom: "6px",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    color: theme.colors.textSoft,
                    fontSize: isMobile ? "11px" : "12px",
                    letterSpacing: "1.4px",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default Testimonials;
