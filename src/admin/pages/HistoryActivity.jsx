// HistoryActivity — admin page that lists every CMS write made via
// the admin panel. Powered by the activity_log Firestore collection
// (written by saveSlot / clearSlot / saveAsset / deleteAssetDoc in
// cmsStore.js).
//
// Layout follows the user's reference: left side is a recent-changes
// table, right side is a summary panel (action totals + per-section
// breakdown + top contributors).

import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "./Dashboard";
import EditorSection from "../components/EditorSection";
import { listActivity } from "../cmsStore";

const SECTIONS = [
  "All sections",
  "Hero",
  "Navbar",
  "Footer",
  "Services",
  "Portfolio",
  "Editing Showcase",
  "Capabilities",
  "Team",
  "Founder",
  "Reviews",
  "Client Logos",
  "Press / Featured In",
  "Apps We Ship",
  "Closing CTA",
  "Manifesto",
  "Process",
  "Contact Info",
  "Reels",
];

const DATE_RANGES = [
  { label: "All time", days: null },
  { label: "Today", days: 1 },
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 90 days", days: 90 },
];

function ActionPill({ action }) {
  const palette = {
    update: { bg: "rgba(184,149,106,0.16)", color: "#8B6E48", label: "Updated" },
    upload: { bg: "rgba(143,93,179,0.16)", color: "#6B3FA0", label: "Uploaded" },
    create: { bg: "rgba(31,138,76,0.16)", color: "#1F8A4C", label: "Added" },
    delete: { bg: "rgba(196,69,69,0.14)", color: "#C44545", label: "Deleted" },
    visibility: { bg: "rgba(20,120,180,0.14)", color: "#1478B4", label: "Visibility" },
  };
  const p = palette[action] || palette.update;
  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 10px",
        borderRadius: 999,
        background: p.bg,
        color: p.color,
        fontSize: 11,
        fontWeight: 800,
        letterSpacing: "0.4px",
        textTransform: "uppercase",
      }}
    >
      {p.label}
    </span>
  );
}

function formatRelative(ts) {
  if (!ts) return "—";
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  const diff = Date.now() - date.getTime();
  const minute = 60_000;
  const hour = 60 * minute;
  const day = 24 * hour;
  if (diff < minute) return "just now";
  if (diff < hour) return `${Math.floor(diff / minute)} min ago`;
  if (diff < day) return `${Math.floor(diff / hour)} hr ago`;
  if (diff < 7 * day) return `${Math.floor(diff / day)} day${Math.floor(diff / day) === 1 ? "" : "s"} ago`;
  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function SummaryStat({ icon, value, label, tint }) {
  return (
    <div
      style={{
        background: "var(--admin-surface, #FFFFFF)",
        border: "1px solid var(--admin-border, #E8DED1)",
        borderRadius: "var(--admin-radius-md, 16px)",
        padding: "18px 20px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        boxShadow: "var(--admin-shadow-sm, 0 2px 8px rgba(31,45,77,0.05))",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          width: 46,
          height: 46,
          borderRadius: 12,
          background: tint || "rgba(184,149,106,0.16)",
          color: "var(--admin-accent-deep, #8B6E48)",
          display: "grid",
          placeItems: "center",
          fontSize: 22,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: "var(--admin-text, #1A1A1A)",
            lineHeight: 1.1,
            fontFamily: 'var(--admin-font-serif, "Playfair Display", Georgia, serif)',
          }}
        >
          {value}
        </div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "1.6px",
            textTransform: "uppercase",
            color: "var(--admin-text-muted, #6B5B47)",
            marginTop: 2,
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

export default function HistoryActivity() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [section, setSection] = useState("All sections");
  const [range, setRange] = useState(DATE_RANGES[0]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setErr("");
    const since =
      range.days != null
        ? new Date(Date.now() - range.days * 24 * 60 * 60 * 1000)
        : null;
    listActivity({
      limit: 300,
      sectionLabel: section === "All sections" ? null : section,
      since,
    })
      .then((rows) => {
        if (!cancelled) setEntries(rows);
      })
      .catch((e) => {
        if (!cancelled) setErr(e?.message || "Failed to load activity.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [section, range]);

  const totals = useMemo(() => {
    const t = { update: 0, upload: 0, create: 0, delete: 0 };
    entries.forEach((e) => {
      const k = (e.action || "update").toLowerCase();
      if (k in t) t[k] += 1;
    });
    return t;
  }, [entries]);

  const bySection = useMemo(() => {
    const m = new Map();
    entries.forEach((e) => {
      const key = e.section_label || "Unknown";
      m.set(key, (m.get(key) || 0) + 1);
    });
    return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [entries]);

  const contributors = useMemo(() => {
    const m = new Map();
    entries.forEach((e) => {
      const key = e.actor_email || e.actor_uid || "Unknown";
      if (!m.has(key)) {
        m.set(key, { email: key, name: e.actor_name || null, count: 0 });
      }
      m.get(key).count += 1;
    });
    return [...m.values()].sort((a, b) => b.count - a.count).slice(0, 5);
  }, [entries]);

  return (
    <div>
      <PageHeader
        eyebrow="Activity"
        title="History · Activity"
        subtitle="Every CMS edit made from this admin panel. Filter by section or date range. Recent activity appears at the top."
      />

      {/* ─── Activity Summary cards ─── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 12,
          marginBottom: 24,
        }}
      >
        <SummaryStat
          icon="✏️"
          value={totals.update}
          label="Updates"
          tint="rgba(184,149,106,0.14)"
        />
        <SummaryStat
          icon="📤"
          value={totals.upload}
          label="Uploads"
          tint="rgba(143,93,179,0.14)"
        />
        <SummaryStat
          icon="➕"
          value={totals.create}
          label="Added"
          tint="rgba(31,138,76,0.14)"
        />
        <SummaryStat
          icon="🗑️"
          value={totals.delete}
          label="Deleted"
          tint="rgba(196,69,69,0.14)"
        />
      </div>

      {/* ─── Filters ─── */}
      <EditorSection
        title="Recent changes"
        hint={
          loading
            ? "Loading…"
            : `${entries.length} entr${entries.length === 1 ? "y" : "ies"} found`
        }
        action={
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              style={{
                padding: "9px 12px",
                borderRadius: 999,
                border: "1px solid var(--admin-border, #E8DED1)",
                background: "var(--admin-surface, #FFFFFF)",
                color: "var(--admin-text, #1A1A1A)",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {SECTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <select
              value={range.label}
              onChange={(e) =>
                setRange(
                  DATE_RANGES.find((r) => r.label === e.target.value) ||
                    DATE_RANGES[0]
                )
              }
              style={{
                padding: "9px 12px",
                borderRadius: 999,
                border: "1px solid var(--admin-border, #E8DED1)",
                background: "var(--admin-surface, #FFFFFF)",
                color: "var(--admin-text, #1A1A1A)",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {DATE_RANGES.map((r) => (
                <option key={r.label} value={r.label}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
        }
      >
        {err && (
          <div
            style={{
              padding: "12px 14px",
              borderRadius: 10,
              background: "rgba(196,69,69,0.08)",
              border: "1px solid rgba(196,69,69,0.24)",
              color: "var(--admin-error, #C44545)",
              fontSize: 13,
              lineHeight: 1.6,
            }}
          >
            {err}
          </div>
        )}

        {!loading && !err && entries.length === 0 && (
          <div
            style={{
              padding: "28px 20px",
              borderRadius: 12,
              background: "var(--admin-bg-soft, #F5EFE6)",
              color: "var(--admin-text-muted, #6B5B47)",
              fontSize: 13,
              textAlign: "center",
              lineHeight: 1.7,
            }}
          >
            No activity yet for this filter. Edit anything in the admin panel
            and it'll show up here within seconds.
          </div>
        )}

        {entries.length > 0 && (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 13,
                color: "var(--admin-text, #1A1A1A)",
                minWidth: 720,
              }}
            >
              <thead>
                <tr style={{ textAlign: "left" }}>
                  {["Action", "Section", "Change details", "By", "Time"].map(
                    (h) => (
                      <th
                        key={h}
                        style={{
                          padding: "10px 12px",
                          fontSize: 10.5,
                          letterSpacing: "1.4px",
                          textTransform: "uppercase",
                          fontWeight: 800,
                          color: "var(--admin-accent-deep, #8B6E48)",
                          borderBottom: "1px solid var(--admin-border, #E8DED1)",
                          background: "var(--admin-bg-soft, #F5EFE6)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {entries.map((e) => (
                  <tr
                    key={e.id}
                    style={{
                      borderBottom: "1px solid var(--admin-border, #E8DED1)",
                    }}
                  >
                    <td style={{ padding: "12px" }}>
                      <ActionPill action={e.action} />
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {e.section_label || "—"}
                    </td>
                    <td style={{ padding: "12px" }}>
                      <div style={{ fontWeight: 600 }}>
                        {e.summary || e.doc_id}
                      </div>
                      {e.preview && (
                        <div
                          style={{
                            fontSize: 12,
                            color: "var(--admin-text-muted, #6B5B47)",
                            marginTop: 2,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: 380,
                          }}
                          title={e.preview}
                        >
                          {e.preview}
                        </div>
                      )}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        fontSize: 12,
                        color: "var(--admin-text-secondary, #4A4A4A)",
                      }}
                    >
                      {e.actor_name || e.actor_email || "Admin"}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        fontSize: 12,
                        color: "var(--admin-text-muted, #6B5B47)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {formatRelative(e.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </EditorSection>

      {/* ─── Changes by section + top contributors ─── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
          marginTop: 24,
        }}
      >
        <EditorSection title="Changes by section" hint="Most-edited sections in this window">
          {bySection.length === 0 ? (
            <div style={{ color: "var(--admin-text-muted, #6B5B47)", fontSize: 13 }}>
              No data yet.
            </div>
          ) : (
            <div style={{ display: "grid", gap: 8 }}>
              {bySection.map(([label, count]) => {
                const max = bySection[0][1] || 1;
                const pct = Math.round((count / max) * 100);
                return (
                  <div key={label}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 13,
                        marginBottom: 4,
                      }}
                    >
                      <span style={{ fontWeight: 700 }}>{label}</span>
                      <span
                        style={{
                          color: "var(--admin-text-muted, #6B5B47)",
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {count}
                      </span>
                    </div>
                    <div
                      style={{
                        height: 8,
                        borderRadius: 999,
                        background: "var(--admin-bg-soft, #F5EFE6)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${pct}%`,
                          height: "100%",
                          background:
                            "linear-gradient(135deg, var(--admin-accent, #B8956A), var(--admin-accent-soft, #C49A5A))",
                          transition: "width 0.3s ease",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </EditorSection>

        <EditorSection title="Top contributors" hint="Who edited what">
          {contributors.length === 0 ? (
            <div style={{ color: "var(--admin-text-muted, #6B5B47)", fontSize: 13 }}>
              No data yet.
            </div>
          ) : (
            <div style={{ display: "grid", gap: 10 }}>
              {contributors.map((c) => (
                <div
                  key={c.email}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 12px",
                    background: "var(--admin-bg-soft, #F5EFE6)",
                    border: "1px solid var(--admin-border, #E8DED1)",
                    borderRadius: 12,
                  }}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, var(--admin-accent, #B8956A), var(--admin-accent-soft, #C49A5A))",
                      color: "#FFFFFF",
                      display: "grid",
                      placeItems: "center",
                      fontWeight: 800,
                      fontSize: 14,
                      flexShrink: 0,
                    }}
                  >
                    {(c.name || c.email).slice(0, 1).toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: 700,
                        color: "var(--admin-text, #1A1A1A)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {c.name || c.email}
                    </div>
                    {c.name && (
                      <div
                        style={{
                          fontSize: 11,
                          color: "var(--admin-text-muted, #6B5B47)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {c.email}
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      fontWeight: 800,
                      color: "var(--admin-accent-deep, #8B6E48)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {c.count}{" "}
                    <span style={{ fontWeight: 600, fontSize: 11 }}>
                      change{c.count === 1 ? "" : "s"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </EditorSection>
      </div>
    </div>
  );
}
