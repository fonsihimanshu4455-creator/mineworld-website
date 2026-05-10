// SectionGridDashboard — completely redesigned admin home (May 2026 v2).
// User feedback: "bilkul alag layout / theme / format chaiye, sab kuchh
// bada bada". Dropped the dark navy theme for a premium light-cream
// surface, doubled the card size, doubled the typography, and gave each
// section a pronounced 16:10 hero thumbnail with a big "Edit →" pill.
//
// Sidebar stays dark for brand recognition; this main content area
// becomes a light, magazine-feel editing surface. Editor sub-pages
// keep their existing dark cards which now visually pop against the
// new light background.

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection as fsCollection,
  onSnapshot,
} from "firebase/firestore";
import { db, firebaseEnabled } from "../firebase";
import { SITE_CONTENT_COLLECTION } from "../../lib/cms-schema";
import { getStaticAsset } from "../../lib/staticAssetManifest";

// Section catalog — order = top-to-bottom on the public homepage.
const SECTIONS = [
  {
    group: "Top of homepage",
    items: [
      { route: "/admin/cms/navbar", name: "Top navigation", desc: "Logo, menu items, and the right-side button.", thumbSlot: "navbar.logo" },
      { route: "/admin/cms/hero", name: "Top banner (with video)", desc: "Background video, headline, sub-headline, and the two main buttons.", thumbSlot: "hero.video" },
      { route: "/admin/cms/client-logos", name: "Client logo strip", desc: "Logos of brands you've worked with — scrolls across the screen.", thumbListSlot: "logo_wall.client_logos", thumbListKey: "logo_image" },
    ],
  },
  {
    group: "What you do — middle of homepage",
    items: [
      { route: "/admin/cms/manifesto", name: "Big quote strip", desc: "The cream studio mantra block with gold-italic emphasis." },
      { route: "/admin/cms/capabilities", name: "Build / Create / Grow", desc: "Three pillars + the tools-we-ship-with row." },
      { route: "/admin/cms/services", name: "Services tiles", desc: "The 9 service cards (Website, App, Meta Ads, etc.).", thumbListSlot: "services.items", thumbListKey: "cover_image" },
      { route: "/admin/cms/process", name: "How we work — 5 steps", desc: "The Day 0 → Week 2 timeline." },
    ],
  },
  {
    group: "Your work & people",
    items: [
      { route: "/admin/cms/portfolio-items", name: "Project cards", desc: "Selected work — the case-study tiles on the home page.", thumbListSlot: "portfolio.items", thumbListKey: "thumbnail" },
      { route: "/admin/cms/editing-showcase", name: "Before / After slider", desc: "The retention-edit comparison + optional vertical reels strip." },
      { route: "/admin/cms/reels", name: "Vertical reels", desc: "9:16 reel videos shown above the editing showcase.", thumbListSlot: "reel.videos", thumbListKey: "thumbnail" },
      { route: "/admin/cms/founder", name: "Founder section", desc: "Portrait, name, title, bio, capability bullets, and the founder note.", thumbSlot: "founder.photo" },
      { route: "/admin/cms/team-members", name: "Team", desc: "Team member cards.", thumbListSlot: "team.members", thumbListKey: "avatar" },
    ],
  },
  {
    group: "Trust & social proof",
    items: [
      { route: "/admin/cms/reviews", name: "Customer reviews", desc: "Approve public-submitted reviews + curate the list.", thumbListSlot: "testimonials.items", thumbListKey: "avatar" },
      { route: "/admin/cms/press", name: "As featured in", desc: "Press logos in the trust strip.", thumbListSlot: "trust.featured_in_logos", thumbListKey: "logo" },
      { route: "/admin/cms/apps", name: "Apps we ship", desc: "App icons + store links.", thumbListSlot: "apps.list", thumbListKey: "icon" },
    ],
  },
  {
    group: "Bottom of homepage",
    items: [
      { route: "/admin/cms/cta", name: "Bottom call-to-action", desc: "The closing card before the footer." },
      { route: "/admin/cms/footer", name: "Footer", desc: "Logo, contact details, social links, copyright.", thumbSlot: "footer.logo" },
    ],
  },
  {
    group: "Files & utilities",
    items: [
      { route: "/admin/cms/assets", name: "Asset library", desc: "Every photo and video uploaded. Filter, replace, delete.", emoji: "🖼" },
      { route: "/admin/legacy-dashboard", name: "Backup / Restore", desc: "Export your content as JSON, import a backup, reset everything.", emoji: "💾" },
      { route: "/admin/migrate", name: "Initial setup", desc: "Run once to seed the Firestore slot keys.", emoji: "🌱" },
    ],
  },
];

function cldThumb(url, type) {
  if (!url) return null;
  const transform =
    type === "video"
      ? "so_0,f_jpg,q_auto,w_960"
      : "f_auto,q_auto,w_960";
  return url.replace("/upload/", `/upload/${transform}/`);
}

function pickListItemThumb(slotData, key) {
  const items = slotData?.json_value?.items;
  if (!Array.isArray(items)) return null;
  for (const item of items) {
    if (item?.visible === false) continue;
    const v = item?.[key];
    if (typeof v === "string" && v) return v;
    if (v && typeof v === "object" && v.cloudinary_url) return v.cloudinary_url;
    if (v && typeof v === "object" && v.url) return v.url;
    if (v && typeof v === "object" && v.src) return v.src;
  }
  return null;
}

function SectionCard({ entry, snapshot }) {
  let thumbUrl = null;
  let thumbType = "image";
  let isStatic = false;
  let isLive = false;

  if (entry.thumbSlot) {
    const slotData = snapshot[entry.thumbSlot];
    if (slotData?.cloudinary_url) {
      thumbUrl = slotData.cloudinary_url;
      thumbType = slotData.asset_type || "image";
      isLive = true;
    } else {
      const fallback = getStaticAsset(entry.thumbSlot);
      if (fallback) {
        thumbUrl = fallback.url;
        thumbType = fallback.type || "image";
        isStatic = true;
      }
    }
  } else if (entry.thumbListSlot) {
    const slotData = snapshot[entry.thumbListSlot];
    thumbUrl = pickListItemThumb(slotData, entry.thumbListKey);
    if (thumbUrl) isLive = true;
  }

  const renderableThumb = thumbUrl
    ? thumbType === "video"
      ? cldThumb(thumbUrl, "video")
      : thumbUrl.includes("/upload/")
      ? cldThumb(thumbUrl, "image")
      : thumbUrl
    : null;

  return (
    <Link
      to={entry.route}
      style={{
        display: "block",
        textDecoration: "none",
        borderRadius: 22,
        overflow: "hidden",
        border: "1px solid rgba(184, 149, 106, 0.2)",
        background: "#FFFFFF",
        boxShadow: "0 6px 18px rgba(31, 45, 77, 0.06)",
        transition:
          "transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(184, 149, 106, 0.55)";
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow =
          "0 22px 44px rgba(31, 45, 77, 0.14)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(184, 149, 106, 0.2)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 6px 18px rgba(31, 45, 77, 0.06)";
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 10",
          background: renderableThumb
            ? "#F4EFE6"
            : "linear-gradient(135deg, #F5EFE6 0%, #EBE3D1 100%)",
          overflow: "hidden",
          borderBottom: "1px solid rgba(184, 149, 106, 0.18)",
        }}
      >
        {renderableThumb ? (
          <img
            src={renderableThumb}
            alt=""
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "grid",
              placeItems: "center",
              fontSize: 64,
              color: "rgba(184, 149, 106, 0.55)",
            }}
          >
            {entry.emoji || "✎"}
          </div>
        )}
        <span
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            padding: "5px 12px",
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 0.6,
            textTransform: "uppercase",
            background: isLive
              ? "rgba(46, 160, 79, 0.95)"
              : isStatic
              ? "rgba(184, 149, 106, 0.95)"
              : "rgba(31, 45, 77, 0.85)",
            color: "#FFFFFF",
            boxShadow: "0 4px 10px rgba(0,0,0,0.18)",
          }}
        >
          {isLive ? "✓ Live" : isStatic ? "Default" : "Empty"}
        </span>
      </div>

      <div style={{ padding: "24px 26px 26px" }}>
        <h3
          style={{
            margin: "0 0 8px",
            fontSize: 22,
            color: "#1A1A1A",
            letterSpacing: "-0.4px",
            lineHeight: 1.2,
            fontWeight: 800,
            fontFamily:
              '"Playfair Display", Georgia, "Times New Roman", serif',
          }}
        >
          {entry.name}
        </h3>
        <p
          style={{
            margin: "0 0 18px",
            color: "#6B5B47",
            fontSize: 14.5,
            lineHeight: 1.6,
            minHeight: 47,
          }}
        >
          {entry.desc}
        </p>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 18px",
            borderRadius: 999,
            background: "linear-gradient(135deg, #BC9966, #D9B987)",
            color: "#1F2D4D",
            fontSize: 13.5,
            fontWeight: 800,
            letterSpacing: 0.3,
          }}
        >
          Edit this section <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}

export default function SectionGridDashboard() {
  const [snapshot, setSnapshot] = useState({});

  useEffect(() => {
    if (!firebaseEnabled || !db) return;
    const ref = fsCollection(db, SITE_CONTENT_COLLECTION);
    const unsub = onSnapshot(
      ref,
      (snap) => {
        const next = {};
        snap.forEach((d) => {
          next[d.id] = d.data();
        });
        setSnapshot(next);
      },
      () => {}
    );
    return () => unsub();
  }, []);

  const totalLive = useMemo(() => {
    let count = 0;
    SECTIONS.forEach((g) =>
      g.items.forEach((entry) => {
        if (entry.thumbSlot && snapshot[entry.thumbSlot]?.cloudinary_url) {
          count += 1;
        } else if (entry.thumbListSlot) {
          const items = snapshot[entry.thumbListSlot]?.json_value?.items;
          if (Array.isArray(items) && items.length > 0) count += 1;
        }
      })
    );
    return count;
  }, [snapshot]);

  const totalSections = useMemo(() => {
    let count = 0;
    SECTIONS.forEach((g, gi) => {
      if (gi < 5) count += g.items.length;
    });
    return count;
  }, []);

  return (
    <div
      style={{
        background:
          "radial-gradient(ellipse at 18% 12%, rgba(184,149,106,0.10), transparent 36%), radial-gradient(ellipse at 82% 88%, rgba(15,42,68,0.06), transparent 40%), #FAF7F2",
        margin: "-36px -40px -80px",
        padding: "44px 48px 96px",
        minHeight: "calc(100vh - 0px)",
        color: "#1A1A1A",
      }}
    >
      <header
        style={{
          marginBottom: 40,
          paddingBottom: 28,
          borderBottom: "1px solid rgba(184, 149, 106, 0.22)",
        }}
      >
        <div
          style={{
            color: "#8B6E48",
            fontSize: 12,
            letterSpacing: 2.4,
            textTransform: "uppercase",
            fontWeight: 800,
            marginBottom: 14,
          }}
        >
          Mineworld · Admin Control Room
        </div>
        <h1
          style={{
            margin: "0 0 14px",
            fontSize: "clamp(40px, 5.5vw, 64px)",
            color: "#1A1A1A",
            letterSpacing: "-1.6px",
            lineHeight: 1.02,
            fontFamily:
              '"Playfair Display", Georgia, "Times New Roman", serif',
            fontWeight: 800,
            maxWidth: 900,
          }}
        >
          Edit your website.{" "}
          <span style={{ color: "#B8956A", fontStyle: "italic" }}>
            One section at a time.
          </span>
        </h1>
        <p
          style={{
            margin: "0 0 22px",
            color: "#4A4A4A",
            fontSize: 17,
            lineHeight: 1.7,
            maxWidth: 820,
          }}
        >
          Each card below is a section of the public website, ordered the way
          a visitor sees them top-to-bottom. Click any card to change that
          section&rsquo;s photos, video, text, or colours. Green badge =
          you&rsquo;ve already edited it. Gold badge = still using the
          built-in default.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            alignItems: "center",
          }}
        >
          <span
            style={{
              padding: "10px 18px",
              borderRadius: 999,
              background: "rgba(46, 160, 79, 0.12)",
              color: "#1F6E2C",
              fontSize: 13.5,
              fontWeight: 800,
              border: "1px solid rgba(46, 160, 79, 0.35)",
              letterSpacing: 0.2,
            }}
          >
            ✓ {totalLive} of {totalSections} sections edited
          </span>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            style={{
              padding: "10px 18px",
              borderRadius: 999,
              background: "transparent",
              color: "#1F2D4D",
              fontSize: 13.5,
              fontWeight: 800,
              border: "1px solid rgba(31, 45, 77, 0.3)",
              textDecoration: "none",
              letterSpacing: 0.2,
            }}
          >
            View live website ↗
          </a>
        </div>
      </header>

      {SECTIONS.map((group) => (
        <section key={group.group} style={{ marginBottom: 56 }}>
          <h2
            style={{
              margin: "0 0 22px",
              fontSize: 14,
              fontWeight: 800,
              color: "#8B6E48",
              letterSpacing: 2,
              textTransform: "uppercase",
              borderLeft: "3px solid #B8956A",
              paddingLeft: 14,
            }}
          >
            {group.group}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
              gap: 22,
            }}
          >
            {group.items.map((entry) => (
              <SectionCard
                key={entry.route}
                entry={entry}
                snapshot={snapshot}
              />
            ))}
          </div>
        </section>
      ))}

      <div
        style={{
          marginTop: 64,
          padding: "28px 32px",
          borderRadius: 22,
          background: "#FFFFFF",
          border: "1px solid rgba(184, 149, 106, 0.25)",
          boxShadow: "0 8px 22px rgba(31, 45, 77, 0.05)",
        }}
      >
        <div
          style={{
            color: "#8B6E48",
            fontSize: 12,
            letterSpacing: 2,
            textTransform: "uppercase",
            fontWeight: 800,
            marginBottom: 10,
          }}
        >
          Where is my data?
        </div>
        <h3
          style={{
            margin: "0 0 12px",
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: "-0.3px",
            fontFamily:
              '"Playfair Display", Georgia, "Times New Roman", serif',
          }}
        >
          Firestore stores text &amp; settings. Cloudinary stores photos &amp;
          videos.
        </h3>
        <p
          style={{
            margin: 0,
            color: "#4A4A4A",
            fontSize: 15,
            lineHeight: 1.7,
            maxWidth: 760,
          }}
        >
          Every save replicates instantly to every visitor — no rebuild
          needed. Photos and videos go through Cloudinary&apos;s CDN with
          automatic format conversion (AVIF / WebP), so your site loads fast
          everywhere. Backups are available under{" "}
          <Link
            to="/admin/legacy-dashboard"
            style={{ color: "#B8956A", fontWeight: 800 }}
          >
            Backup / Restore
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
