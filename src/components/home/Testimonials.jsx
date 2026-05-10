import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "../common/Container";
import Reveal from "../common/Reveal";
import SectionHeading from "../common/SectionHeading";
import SectionTag from "../common/SectionTag";
import TestimonialSubmitModal from "../common/TestimonialSubmitModal";
import TestimonialDetailModal from "../common/TestimonialDetailModal";
import { theme } from "../../styles/theme";
import { testimonials as defaultTestimonials } from "../../data/testimonials";
import { useCollection } from "../../admin/hooks";
import { useSiteList } from "../../hooks/useSiteList";
import { useSiteContent } from "../../hooks/useSiteContent";
import useIsMobile from "../../utils/useIsMobile";
import { useCountUp } from "../../utils/gsapHooks";

function StatBlock({ stat, isMobile }) {
  const ref = useCountUp({
    target: stat.target,
    format: stat.format,
    duration: stat.duration || 1.6,
  });
  return (
    <div
      style={{
        padding: isMobile ? "16px" : "22px",
        borderRadius: "18px",
        border: "1px solid var(--border-cream)",
        background: "var(--bg-cream-soft)",
        textAlign: "center",
      }}
    >
      <div
        ref={ref}
        style={{
          color: "var(--accent-gold)",
          fontSize: isMobile ? "22px" : "28px",
          fontWeight: 800,
          letterSpacing: "-0.8px",
          lineHeight: 1,
          marginBottom: "6px",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {stat.value}
      </div>
      <div
        style={{
          color: "var(--text-muted)",
          fontSize: isMobile ? "10.5px" : "11.5px",
          letterSpacing: "1.4px",
          textTransform: "uppercase",
          fontWeight: 600,
        }}
      >
        {stat.label}
      </div>
    </div>
  );
}

function getInitials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function StarRow({ rating }) {
  if (!rating) return null;
  return (
    <div
      style={{
        display: "flex",
        gap: "2px",
        marginBottom: "10px",
      }}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          style={{
            color: n <= rating ? "#D9B987" : "rgba(255,255,255,0.22)",
            fontSize: "15px",
            lineHeight: 1,
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function TestimonialCard({ item, onOpen, isMobile }) {
  const accent =
    item.accent === "blue"
      ? "rgba(88,110,180,0.18)"
      : "rgba(188,153,102,0.18)";
  const accentBorder =
    item.accent === "blue"
      ? "rgba(88,110,180,0.38)"
      : "rgba(188,153,102,0.38)";

  const author = item.author || item.name;
  const meta = [item.role, item.location].filter(Boolean).join(" · ");

  return (
    <motion.button
      onClick={() => onOpen(item)}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      style={{
        position: "relative",
        textAlign: "left",
        padding: isMobile ? "20px 20px 18px" : "24px 24px 22px",
        borderRadius: "16px",
        border: "1px solid var(--border-cream)",
        background: "var(--bg-cream-soft)",
        width: isMobile ? "240px" : "300px",
        minHeight: "200px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        overflow: "hidden",
        color: "var(--text-primary)",
        fontFamily: "inherit",
        boxShadow: "0 14px 32px rgba(15,42,68,0.06)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          background: accent,
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "8px",
          left: "16px",
          fontSize: "44px",
          color: "var(--accent-gold)",
          opacity: 0.5,
          fontFamily:
            '"Playfair Display", Georgia, "Times New Roman", serif',
          fontWeight: 800,
          lineHeight: 1,
          pointerEvents: "none",
        }}
      >
        &ldquo;
      </span>

      {item.result ? (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "5px 10px",
            borderRadius: "999px",
            border: `1px solid ${accentBorder}`,
            background: "rgba(255,255,255,0.6)",
            color: "var(--accent-gold)",
            fontSize: "10.5px",
            fontWeight: 700,
            letterSpacing: "1.4px",
            textTransform: "uppercase",
            alignSelf: "flex-start",
            marginBottom: "12px",
            position: "relative",
            zIndex: 2,
            marginLeft: "20px",
          }}
        >
          <span
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "var(--accent-gold)",
            }}
          />
          {item.result}
        </div>
      ) : null}

      <StarRow rating={item.rating} />

      <p
        style={{
          margin: "0 0 12px",
          color: "var(--text-secondary)",
          fontSize: "14px",
          lineHeight: 1.65,
          fontStyle: "italic",
          fontFamily:
            '"Playfair Display", Georgia, "Times New Roman", serif',
          position: "relative",
          zIndex: 2,
          flex: 1,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
        }}
      >
        {item.quote}
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
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
              "linear-gradient(135deg, rgba(184,149,106,0.18), rgba(184,149,106,0.06))",
            border: "2px solid var(--accent-gold)",
            display: "grid",
            placeItems: "center",
            color: "var(--accent-navy)",
            fontWeight: 800,
            fontSize: "13px",
            flexShrink: 0,
          }}
        >
          {getInitials(author || "M")}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              color: "var(--accent-navy)",
              fontSize: "15px",
              fontWeight: 600,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {author}
          </div>
          {meta ? (
            <div
              style={{
                color: "var(--text-muted)",
                fontSize: "12px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {meta}
            </div>
          ) : null}
        </div>
      </div>
    </motion.button>
  );
}

function Testimonials() {
  const isMobile = useIsMobile(768);
  const legacyCurated = useCollection("testimonials", defaultTestimonials);
  const cmsItems = useSiteList("testimonials.items", null);
  const curated = cmsItems ? cmsItems : legacyCurated;
  const submissions = useCollection("userSubmissions", []);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [detailItem, setDetailItem] = useState(null);
  const eyebrow = useSiteContent("testimonials.eyebrow", "Reviews");
  const headline = useSiteContent("testimonials.headline", null);
  const subhead = useSiteContent("testimonials.subhead", null);
  const allowSubmissions =
    useSiteContent("testimonials.allow_public_submissions", "true") !== "false";

  const combined = useMemo(() => {
    const approved = submissions
      .filter((s) => s?.status === "approved")
      .map((s) => ({
        id: s.id,
        type: s.mediaType === "video" ? "video" : "text",
        author: s.name,
        role: s.role,
        location: s.location,
        quote: s.quote,
        rating: s.rating,
        media: s.media,
        mediaType: s.mediaType,
        accent: "gold",
      }));
    return [...curated, ...approved];
  }, [curated, submissions]);

  const marqueeList = useMemo(
    () => [...combined, ...combined],
    [combined]
  );

  const duration = Math.max(combined.length * 6, 24);

  return (
    <section
      id="testimonials"
      style={{
        position: "relative",
        padding: isMobile ? "72px 0" : "100px 0",
        background: "var(--bg-secondary)",
        borderBottom: "1px solid var(--border-subtle)",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
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
            gap: "16px",
            flexDirection: isMobile ? "column" : "row",
            marginBottom: "28px",
          }}
        >
          <div>
            <Reveal>
              <SectionTag>{eyebrow}</SectionTag>
            </Reveal>
            <Reveal delay={0.08}>
              <SectionHeading
                title={headline || "What clients say — in their own words."}
                subtitle={
                  subhead ||
                  "Tap any card to read the full review. Want to share your own? Add it in under a minute."
                }
              />
            </Reveal>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {allowSubmissions && (
              <button
                onClick={() => setSubmitOpen(true)}
                style={{
                  padding: "12px 18px",
                  borderRadius: "999px",
                  border: "none",
                  background: "linear-gradient(135deg, #BC9966, #D9B987)",
                  color: "#18140F",
                  fontWeight: 800,
                  fontSize: "13.5px",
                  cursor: "pointer",
                  boxShadow: "0 10px 24px rgba(188,153,102,0.28)",
                }}
              >
                + Add your review
              </button>
            )}
            <Link
              to="/reviews"
              style={{
                padding: "12px 18px",
                borderRadius: "999px",
                border: "1px solid var(--accent-gold)",
                background: "transparent",
                color: "var(--accent-gold)",
                fontWeight: 700,
                fontSize: "13.5px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                transition: "all 0.3s ease",
              }}
            >
              View all reviews →
            </Link>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            overflow: "hidden",
            maskImage:
              "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
            paddingTop: "8px",
            paddingBottom: "8px",
          }}
        >
          <div
            className="mw-testimonial-marquee"
            style={{
              display: "flex",
              width: "max-content",
              gap: isMobile ? "14px" : "18px",
              animation: `mw-test-marquee ${duration}s linear infinite`,
              willChange: "transform",
            }}
          >
            {marqueeList.map((item, i) => (
              <TestimonialCard
                key={`${item.id || item.author || "t"}-${i}`}
                item={item}
                onOpen={setDetailItem}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>

        <Reveal delay={0.2}>
          <div
            style={{
              marginTop: "36px",
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
              gap: "14px",
            }}
          >
            {[
              {
                value: "50+",
                target: 50,
                format: (n) => `${n}+`,
                label: "Projects Delivered",
              },
              {
                value: "2.5M+",
                target: 2500000,
                format: (n) =>
                  n >= 1_000_000
                    ? `${(n / 1_000_000).toFixed(1)}M+`
                    : n >= 1_000
                    ? `${Math.round(n / 1_000)}K+`
                    : `${n}+`,
                label: "Views Driven",
              },
              {
                value: "₹12L+",
                target: 1200000,
                format: (n) =>
                  n >= 100000
                    ? `₹${Math.round(n / 100000)}L+`
                    : n >= 1000
                    ? `₹${Math.round(n / 1000)}K+`
                    : `₹${n}+`,
                label: "Client Revenue",
              },
              {
                value: "4.9/5",
                target: 49,
                format: (n) => `${(n / 10).toFixed(1)}/5`,
                label: "Avg Rating",
              },
            ].map((stat) => (
              <StatBlock key={stat.label} stat={stat} isMobile={isMobile} />
            ))}
          </div>
        </Reveal>
      </Container>

      <style>{`
        @keyframes mw-test-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .mw-testimonial-marquee:hover {
          animation-play-state: paused;
        }
        .mw-testimonial-marquee:focus-within {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .mw-testimonial-marquee {
            animation: none !important;
          }
        }
      `}</style>

      <TestimonialSubmitModal
        open={submitOpen}
        onClose={() => setSubmitOpen(false)}
      />
      <TestimonialDetailModal
        open={Boolean(detailItem)}
        item={detailItem}
        onClose={() => setDetailItem(null)}
      />
    </section>
  );
}

export default Testimonials;
