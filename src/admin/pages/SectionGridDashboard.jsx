// SectionGridDashboard — the new simple admin home. Replaces the
// schema-driven counts grid with a plain-English card per section,
// each showing the section's current main asset as a thumbnail. Click
// the card → goes to that section's editor.
//
// User feedback (May 2026): "admin panel ko simple kro... bilkul new
// layout / theme / format". This is that redesign — no slot keys, no
// technical jargon, just "Top banner", "Customer reviews", etc., with
// a visual preview of what's currently live.

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection as fsCollection,
  onSnapshot,
} from "firebase/firestore";
import { db, firebaseEnabled } from "../firebase";
import { SITE_CONTENT_COLLECTION } from "../../lib/cms-schema";
import { getStaticAsset } from "../../lib/staticAssetManifest";

// Section catalog. Order = top-to-bottom on the public homepage.
const SECTIONS = [
  {
    group: "Homepage — top to bottom",
    items: [
      { route: "/admin/cms/navbar", name: "Top navigation", desc: "Logo, menu items, and the right-side button.", thumbSlot: "navbar.logo", accent: "#1F2D4D" },
      { route: "/admin/cms/hero", name: "Top banner (with video)", desc: "Background video, headline, sub-headline, and the two main buttons.", thumbSlot: "hero.video", accent: "#0F2A44" },
      { route: "/admin/cms/client-logos", name: "Client logo strip", desc: "Logos of brands you've worked with — scrolls across the screen.", thumbListSlot: "logo_wall.client_logos", thumbListKey: "logo_image", accent: "#3a5377" },
      { route: "/admin/cms/manifesto", name: "Big quote strip", desc: "The cream-coloured studio mantra block with gold-italic emphasis.", accent: "#EBE3D1" },
      { route: "/admin/cms/capabilities", name: "What we do — Build / Create / Grow", desc: "Three pillars + the tools-we-ship-with row.", accent: "#F5EFE6" },
      { route: "/admin/cms/services", name: "Services tiles", desc: "The 9 service cards (Website, App, Meta Ads, etc.).", thumbListSlot: "services.items", thumbListKey: "cover_image", accent: "#B8956A" },
      { route: "/admin/cms/process", name: "How we work — 5 steps", desc: "The Day 0 → Week 2 timeline.", accent: "#D4B896" },
      { route: "/admin/cms/portfolio-items", name: "Project cards", desc: "Selected work — the case-study tiles on the home page.", thumbListSlot: "portfolio.items", thumbListKey: "thumbnail", accent: "#0F2A44" },
      { route: "/admin/cms/editing-showcase", name: "Before / After slider", desc: "The retention-edit comparison + optional vertical reels strip.", accent: "#1F2D4D" },
      { route: "/admin/cms/reels", name: "Vertical reels", desc: "9:16 reel videos — shown above the editing showcase.", thumbListSlot: "reel.videos", thumbListKey: "thumbnail", accent: "#1F2D4D" },
      { route: "/admin/cms/founder", name: "Founder section", desc: "Portrait, name, title, bio, capability bullets, and the founder note.", thumbSlot: "founder.photo", accent: "#8B6E48" },
      { route: "/admin/cms/team-members", name: "Team", desc: "Team member cards.", thumbListSlot: "team.members", thumbListKey: "avatar", accent: "#3a5377" },
      { route: "/admin/cms/reviews", name: "Customer reviews", desc: "Approve public-submitted reviews + curate the list.", thumbListSlot: "testimonials.items", thumbListKey: "avatar", accent: "#B8956A" },
      { route: "/admin/cms/press", name: "As featured in", desc: "Press logos in the trust strip.", thumbListSlot: "trust.featured_in_logos", thumbListKey: "logo", accent: "#0F2A44" },
      { route: "/admin/cms/apps", name: "Apps we ship", desc: "App icons + store links.", thumbListSlot: "apps.list", thumbListKey: "icon", accent: "#1F2D4D" },
      { route: "/admin/cms/cta", name: "Bottom call-to-action", desc: "The closing card before the footer.", accent: "#EDE4D3" },
      { route: "/admin/cms/footer", name: "Footer", desc: "Logo, contact details, social links, copyright.", thumbSlot: "footer.logo", accent: "#0F2A44" },
    ],
  },
  {
    group: "Asset library & backups",
    items: [
      { route: "/admin/cms/assets", name: "Asset library", desc: "Every photo and video uploaded. Filter, replace, delete.", accent: "#B8956A", emoji: "🖼" },
      { route: "/admin/migrate", name: "Migrate / seed slots", desc: "Initialise Firestore for first-run.", accent: "#3a5377", emoji: "🌱" },
    ],
  },
];

function cldThumb(url, type) {
  if (!url) return null;
  const transform =
    type === "video"
      ? "so_0,f_jpg,q_auto,w_640"
      : "f_auto,q_auto,w_640";
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

  if (entry.thumbSlot) {
    const slotData = snapshot[entry.thumbSlot];
    if (slotData?.cloudinary_url) {
      thumbUrl = slotData.cloudinary_url;
      thumbType = slotData.asset_type || "image";
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
        borderRadius: 18,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.012))",
        transition:
          "border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(184, 149, 106, 0.4)";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow =
          "0 16px 36px rgba(15, 42, 68, 0.22)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "16 / 9",
          background: renderableThumb
            ? "rgba(0,0,0,0.32)"
            : `linear-gradient(135deg, ${entry.accent || "#1F2D4D"}, rgba(0,0,0,0.4))`,
          overflow: "hidden",
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
              fontSize: 36,
              color: "rgba(255,255,255,0.65)",
            }}
          >
            {entry.emoji || "✎"}
          </div>
        )}
        {isStatic && (
          <span
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              padding: "3px 8px",
              borderRadius: 999,
              background: "rgba(217, 185, 135, 0.95)",
              color: "#1F2D4D",
              fontSize: 9.5,
              fontWeight: 800,
              letterSpacing: 0.4,
              textTransform: "uppercase",
            }}
            title="Built-in default — no upload yet"
          >
            📦 Default
          </span>
        )}
        {thumbUrl && !isStatic && (
          <span
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              padding: "3px 8px",
              borderRadius: 999,
              background: "rgba(134, 230, 156, 0.85)",
              color: "#0a3a16",
              fontSize: 9.5,
              fontWeight: 800,
              letterSpacing: 0.4,
              textTransform: "uppercase",
            }}
            title="Edited via admin"
          >
            ☁ Live
          </span>
        )}
      </div>

      <div style={{ padding: "14px 16px 16px" }}>
        <div
          style={{
            color: "#F5F1E8",
            fontSize: 15,
            fontWeight: 800,
            letterSpacing: "-0.2px",
            marginBottom: 4,
            fontFamily: '"Playfair Display", Georgia, serif',
          }}
        >
          {entry.name}
        </div>
        <div
          style={{
            color: "rgba(243,239,231,0.6)",
            fontSize: 12.5,
            lineHeight: 1.5,
            marginBottom: 10,
          }}
        >
          {entry.desc}
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            color: "var(--accent-gold)",
            fontSize: 12.5,
            fontWeight: 700,
            letterSpacing: 0.3,
          }}
        >
          Edit <span aria-hidden="true">→</span>
        </div>
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

  return (
    <div>
      <header style={{ marginBottom: 28 }}>
        <div
          style={{
            color: "#D9B987",
            fontSize: 11,
            letterSpacing: 2,
            textTransform: "uppercase",
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          Mineworld Admin
        </div>
        <h1
          style={{
            margin: "0 0 8px",
            fontSize: 36,
            color: "#F5F1E8",
            letterSpacing: "-0.7px",
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 800,
          }}
        >
          Edit your website.
        </h1>
        <p
          style={{
            margin: 0,
            color: "rgba(243,239,231,0.65)",
            fontSize: 14.5,
            lineHeight: 1.7,
            maxWidth: 720,
          }}
        >
          Each card below is a section of the public site, in the order it
          appears top-to-bottom. The thumbnail shows what’s live now —
          green pill means you’ve already edited it, gold pill means
          it’s using the built-in default. Click any card to change
          the section’s photos, video, text, or colours.
        </p>
      </header>

      {SECTIONS.map((group) => (
        <section key={group.group} style={{ marginBottom: 36 }}>
          <h2
            style={{
              margin: "0 0 14px",
              fontSize: 13,
              fontWeight: 700,
              color: "#D9B987",
              letterSpacing: 1.6,
              textTransform: "uppercase",
            }}
          >
            {group.group}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {group.items.map((entry) => (
              <SectionCard key={entry.route} entry={entry} snapshot={snapshot} />
            ))}
          </div>
        </section>
      ))}

      <div
        style={{
          marginTop: 36,
          padding: "14px 18px",
          borderRadius: 14,
          border: "1px dashed rgba(184, 149, 106, 0.32)",
          background: "rgba(184, 149, 106, 0.04)",
          color: "rgba(243,239,231,0.7)",
          fontSize: 13,
          lineHeight: 1.6,
        }}
      >
        <strong style={{ color: "#D9B987" }}>Where is my data stored?</strong>{" "}
        All your text, colours, and content live in Firestore (Firebase).
        Photos &amp; videos go to Cloudinary&apos;s CDN. Each save replicates
        to every visitor instantly — no rebuild required.
      </div>
    </div>
  );
}
