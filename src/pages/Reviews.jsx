import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "../components/common/Container";
import Reveal from "../components/common/Reveal";
import TestimonialSubmitModal from "../components/common/TestimonialSubmitModal";
import TestimonialDetailModal from "../components/common/TestimonialDetailModal";
import { theme } from "../styles/theme";
import { testimonials as defaultTestimonials } from "../data/testimonials";
import { useCollection } from "../admin/hooks";
import { trackEvent } from "../utils/analytics";
import useIsMobile from "../utils/useIsMobile";

function getInitials(name) {
  return (name || "M")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function StarRow({ rating, small }) {
  if (!rating) return null;
  return (
    <div style={{ display: "flex", gap: "2px", marginBottom: "10px" }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          style={{
            color: n <= rating ? "#E7C98A" : "rgba(255,255,255,0.22)",
            fontSize: small ? "14px" : "16px",
            lineHeight: 1,
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ item, onOpen }) {
  const author = item.author || item.name;
  const meta = [item.role, item.location].filter(Boolean).join(" · ");

  return (
    <motion.button
      onClick={() => onOpen(item)}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      style={{
        textAlign: "left",
        padding: "22px 22px 20px",
        borderRadius: "22px",
        border: `1px solid ${theme.colors.line}`,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))",
        display: "flex",
        flexDirection: "column",
        minHeight: "220px",
        color: theme.colors.text,
        fontFamily: "inherit",
        cursor: "pointer",
      }}
    >
      <StarRow rating={item.rating} small />

      <p
        style={{
          margin: "0 0 16px",
          color: theme.colors.text,
          fontSize: "14.5px",
          lineHeight: 1.65,
          fontStyle: "italic",
          fontFamily:
            '"Playfair Display", Georgia, "Times New Roman", serif',
          flex: 1,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 6,
          WebkitBoxOrient: "vertical",
        }}
      >
        &ldquo;{item.quote}&rdquo;
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, rgba(214,176,96,0.35), rgba(214,176,96,0.1))",
            border: "1px solid rgba(214,176,96,0.3)",
            display: "grid",
            placeItems: "center",
            color: theme.colors.text,
            fontWeight: 800,
            fontSize: "12.5px",
            flexShrink: 0,
          }}
        >
          {getInitials(author)}
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

function Reviews() {
  const isMobile = useIsMobile(768);
  const curated = useCollection("testimonials", defaultTestimonials);
  const submissions = useCollection("userSubmissions", []);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [detailItem, setDetailItem] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    document.title = "Reviews | Mineworld Production";
    trackEvent("reviews_page_view", {});
  }, []);

  const all = useMemo(() => {
    const approved = submissions
      .filter((s) => s?.status === "approved")
      .map((s) => ({
        id: s.id,
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

  const withRatingCount = all.filter((a) => a.rating && a.rating >= 4).length;
  const avgRating = useMemo(() => {
    const rated = all.filter((a) => a.rating);
    if (!rated.length) return "4.9";
    const sum = rated.reduce((acc, a) => acc + Number(a.rating || 0), 0);
    return (sum / rated.length).toFixed(1);
  }, [all]);

  const filtered = useMemo(() => {
    if (filter === "With Media") return all.filter((a) => a.media);
    if (filter === "5 Stars") return all.filter((a) => (a.rating || 0) === 5);
    return all;
  }, [all, filter]);

  return (
    <article
      style={{
        background: `
          radial-gradient(circle at 14% 10%, rgba(214,176,96,0.1), transparent 22%),
          linear-gradient(180deg, #111827 0%, #141c2f 50%, #111827 100%)
        `,
      }}
    >
      <section
        style={{
          padding: isMobile ? "124px 0 40px" : "150px 0 60px",
          borderBottom: `1px solid ${theme.colors.line}`,
        }}
      >
        <Container>
          <Reveal>
            <Link
              to="/#testimonials"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: theme.colors.goldSoft,
                fontSize: "13px",
                letterSpacing: "1.4px",
                textTransform: "uppercase",
                textDecoration: "none",
                fontWeight: 700,
                marginBottom: "24px",
              }}
            >
              ← Back
            </Link>
          </Reveal>

          <Reveal delay={0.06}>
            <div
              style={{
                color: theme.colors.goldSoft,
                fontSize: "12px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: "14px",
              }}
            >
              Reviews · {all.length} Total
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1
              style={{
                margin: 0,
                fontSize: isMobile ? "40px" : "clamp(44px, 5.6vw, 64px)",
                lineHeight: 1.04,
                letterSpacing: "-1.5px",
                color: theme.colors.text,
                fontWeight: 800,
                fontFamily:
                  '"Playfair Display", Georgia, "Times New Roman", serif',
              }}
            >
              What people say about{" "}
              <span style={{ color: theme.colors.gold, fontStyle: "italic" }}>
                Mineworld.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p
              style={{
                marginTop: "18px",
                color: theme.colors.textSoft,
                fontSize: isMobile ? "15px" : "17px",
                lineHeight: 1.9,
                maxWidth: "720px",
              }}
            >
              Real clients, real words. Tap any card to read the full review.
              Want to share your own?
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginTop: "22px",
              }}
            >
              <button
                onClick={() => setSubmitOpen(true)}
                style={{
                  padding: "12px 20px",
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
            </div>
          </Reveal>

          <Reveal delay={0.28}>
            <div
              style={{
                marginTop: "28px",
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "repeat(3, 1fr)"
                  : "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "12px",
                maxWidth: "680px",
              }}
            >
              {[
                { value: all.length, label: "Total Reviews" },
                { value: avgRating, label: "Avg Rating" },
                { value: withRatingCount, label: "4★+ Reviews" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    padding: isMobile ? "12px 10px" : "18px",
                    borderRadius: "16px",
                    border: `1px solid ${theme.colors.line}`,
                    background: "rgba(255,255,255,0.03)",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      color: theme.colors.gold,
                      fontSize: isMobile ? "20px" : "26px",
                      fontWeight: 800,
                      letterSpacing: "-0.6px",
                      lineHeight: 1,
                      marginBottom: "4px",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      color: theme.colors.textSoft,
                      fontSize: "10.5px",
                      letterSpacing: "1.3px",
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

      <section style={{ padding: isMobile ? "40px 0 80px" : "60px 0 120px" }}>
        <Container>
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              marginBottom: "22px",
            }}
          >
            {["All", "5 Stars", "With Media"].map((tab) => {
              const active = filter === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  aria-pressed={active}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "999px",
                    border: active
                      ? "1px solid rgba(214,176,96,0.85)"
                      : `1px solid ${theme.colors.line}`,
                    background: active
                      ? "rgba(214,176,96,0.14)"
                      : "rgba(255,255,255,0.03)",
                    color: active ? theme.colors.goldSoft : theme.colors.text,
                    fontSize: "12.5px",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.22s ease",
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {filtered.length === 0 ? (
            <div
              style={{
                padding: "48px 20px",
                textAlign: "center",
                color: theme.colors.textSoft,
                borderRadius: "20px",
                border: `1px solid ${theme.colors.line}`,
                background: "rgba(255,255,255,0.02)",
              }}
            >
              No reviews in this filter yet.
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "16px",
              }}
            >
              {filtered.map((item, i) => (
                <Reveal key={item.id || `${item.author}-${i}`} delay={0.04 * i}>
                  <ReviewCard item={item} onOpen={setDetailItem} />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>

      <TestimonialSubmitModal
        open={submitOpen}
        onClose={() => setSubmitOpen(false)}
      />
      <TestimonialDetailModal
        open={Boolean(detailItem)}
        item={detailItem}
        onClose={() => setDetailItem(null)}
      />
    </article>
  );
}

export default Reviews;
