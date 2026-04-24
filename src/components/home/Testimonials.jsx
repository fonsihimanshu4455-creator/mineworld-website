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
        border: `1px solid ${theme.colors.line}`,
        background: "rgba(255,255,255,0.025)",
        textAlign: "center",
      }}
    >
      <div
        ref={ref}
        style={{
          color: theme.colors.gold,
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
          color: theme.colors.textSoft,
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
            color: n <= rating ? "#E7C98A" : "rgba(255,255,255,0.22)",
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
      : "rgba(214,176,96,0.18)";
  const accentBorder =
    item.accent === "blue"
      ? "rgba(88,110,180,0.38)"
      : "rgba(214,176,96,0.38)";

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
        padding: isMobile ? "22px 20px" : "26px 24px",
        borderRadius: "22px",
        border: `1px solid ${theme.colors.line}`,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
        width: isMobile ? "280px" : "320px",
        minHeight: "260px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        overflow: "hidden",
        color: theme.colors.text,
        fontFamily: "inherit",
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

      {item.result ? (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "5px 10px",
            borderRadius: "999px",
            border: `1px solid ${accentBorder}`,
            background: "rgba(255,255,255,0.02)",
            color: theme.colors.goldSoft,
            fontSize: "10.5px",
            fontWeight: 700,
            letterSpacing: "1.4px",
            textTransform: "uppercase",
            alignSelf: "flex-start",
            marginBottom: "12px",
            position: "relative",
            zIndex: 2,
          }}
        >
          <span
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: theme.colors.gold,
            }}
          />
          {item.result}
        </div>
      ) : null}

      <StarRow rating={item.rating} />

      <p
        style={{
          margin: "0 0 16px",
          color: theme.colors.text,
          fontSize: "14.5px",
          lineHeight: 1.65,
          fontStyle: "italic",
          fontFamily:
            '"Playfair Display", Georgia, "Times New Roman", serif',
          position: "relative",
          zIndex: 2,
          flex: 1,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 5,
          WebkitBoxOrient: "vertical",
        }}
      >
        &ldquo;{item.quote}&rdquo;
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
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, rgba(214,176,96,0.35), rgba(214,176,96,0.10))",
            border: `1px solid ${accentBorder}`,
            display: "grid",
            placeItems: "center",
            color: theme.colors.text,
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
              color: theme.colors.text,
              fontSize: "14px",
              fontWeight: 700,
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
                color: theme.colors.textSoft,
                fontSize: "11.5px",
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
  const curated = useCollection("testimonials", defaultTestimonials);
  const submissions = useCollection("userSubmissions", []);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [detailItem, setDetailItem] = useState(null);

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
        background: `
          radial-gradient(circle at 80% 20%, rgba(214,176,96,0.08), transparent 26%),
          linear-gradient(180deg, rgba(13,20,34,1) 0%, rgba(16,24,39,1) 100%)
        `,
        borderBottom: `1px solid ${theme.colors.line}`,
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
              <SectionTag>Reviews</SectionTag>
            </Reveal>
            <Reveal delay={0.08}>
              <SectionHeading
                title="What clients say — in their own words."
                subtitle="Tap any card to read the full review. Want to share your own? Add it in under a minute."
              />
            </Reveal>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              onClick={() => setSubmitOpen(true)}
              style={{
                padding: "12px 18px",
                borderRadius: "999px",
                border: "none",
                background: "linear-gradient(135deg, #D6B060, #E7C98A)",
                color: "#18140F",
                fontWeight: 800,
                fontSize: "13.5px",
                cursor: "pointer",
                boxShadow: "0 10px 24px rgba(214,176,96,0.28)",
              }}
            >
              + Add your review
            </button>
            <Link
              to="/reviews"
              style={{
                padding: "12px 18px",
                borderRadius: "999px",
                border: `1px solid ${theme.colors.line}`,
                background: "rgba(255,255,255,0.03)",
                color: theme.colors.text,
                fontWeight: 700,
                fontSize: "13.5px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
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
