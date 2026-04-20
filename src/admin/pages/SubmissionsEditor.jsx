import { useEffect, useState } from "react";
import { contentStore } from "../contentStore";
import { PageHeader } from "./Dashboard";

function getSubmissions() {
  const list = contentStore.get("userSubmissions");
  return Array.isArray(list) ? list : [];
}

function formatWhen(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return iso;
  }
}

function SubmissionsEditor() {
  const [items, setItems] = useState(getSubmissions);
  const [filter, setFilter] = useState("pending");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    document.title = "Submissions · Mineworld Admin";
    const sync = () => setItems(getSubmissions());
    window.addEventListener("mw-content-change", sync);
    return () => window.removeEventListener("mw-content-change", sync);
  }, []);

  const persist = (next) => {
    contentStore.set("userSubmissions", next);
    setItems(next);
    setMsg("Saved.");
    setTimeout(() => setMsg(""), 1600);
  };

  const setStatus = (id, status) => {
    const next = items.map((it) => (it.id === id ? { ...it, status } : it));
    persist(next);
  };

  const remove = (id) => {
    if (!window.confirm("Delete this submission permanently?")) return;
    persist(items.filter((it) => it.id !== id));
  };

  const filtered = items.filter((it) => {
    if (filter === "all") return true;
    return (it.status || "pending") === filter;
  });

  const counts = {
    pending: items.filter((i) => (i.status || "pending") === "pending").length,
    approved: items.filter((i) => i.status === "approved").length,
    rejected: items.filter((i) => i.status === "rejected").length,
  };

  return (
    <div>
      <PageHeader
        eyebrow="Submissions"
        title="Client reviews awaiting moderation."
        subtitle="Review each submission, then Approve (appears on the site) or Reject (stays hidden). You can also edit before approving."
      />

      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        {[
          { key: "pending", label: `Pending (${counts.pending})` },
          { key: "approved", label: `Approved (${counts.approved})` },
          { key: "rejected", label: `Rejected (${counts.rejected})` },
          { key: "all", label: `All (${items.length})` },
        ].map((tab) => {
          const active = filter === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              style={{
                padding: "8px 14px",
                borderRadius: "999px",
                border: active
                  ? "1px solid rgba(214,176,96,0.85)"
                  : "1px solid rgba(255,255,255,0.1)",
                background: active
                  ? "rgba(214,176,96,0.14)"
                  : "rgba(255,255,255,0.03)",
                color: active ? "#E7C98A" : "#F5F1E8",
                fontSize: "12.5px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {msg ? (
        <div
          style={{
            marginBottom: "12px",
            padding: "8px 14px",
            borderRadius: "10px",
            background: "rgba(214,176,96,0.12)",
            color: "#E7C98A",
            fontSize: "13px",
            fontWeight: 600,
            display: "inline-block",
          }}
        >
          {msg}
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <div
          style={{
            padding: "40px 20px",
            textAlign: "center",
            color: "#CFC6B8",
            borderRadius: "18px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          No submissions in this view.
        </div>
      ) : (
        <div style={{ display: "grid", gap: "14px" }}>
          {filtered.map((it) => {
            const status = it.status || "pending";
            const statusColor =
              status === "approved"
                ? "#7fe0a2"
                : status === "rejected"
                ? "#ff9e9e"
                : "#E7C98A";
            return (
              <div
                key={it.id}
                style={{
                  padding: "22px",
                  borderRadius: "18px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.015))",
                  display: "grid",
                  gridTemplateColumns: it.media ? "220px 1fr" : "1fr",
                  gap: "18px",
                  alignItems: "start",
                }}
              >
                {it.media ? (
                  <div
                    style={{
                      borderRadius: "12px",
                      overflow: "hidden",
                      border: "1px solid rgba(255,255,255,0.08)",
                      background: "rgba(0,0,0,0.3)",
                      maxHeight: "260px",
                    }}
                  >
                    {it.mediaType === "video" ? (
                      <video
                        src={it.media}
                        controls
                        muted
                        style={{
                          width: "100%",
                          height: "100%",
                          maxHeight: "260px",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    ) : (
                      <img
                        src={it.media}
                        alt="submission"
                        style={{
                          width: "100%",
                          height: "100%",
                          maxHeight: "260px",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    )}
                  </div>
                ) : null}

                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "8px",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "999px",
                        background: "rgba(255,255,255,0.05)",
                        border: `1px solid ${statusColor}55`,
                        color: statusColor,
                        fontSize: "10.5px",
                        letterSpacing: "1.6px",
                        textTransform: "uppercase",
                        fontWeight: 800,
                      }}
                    >
                      {status}
                    </span>
                    {it.rating ? (
                      <span style={{ color: "#E7C98A", fontSize: "13px" }}>
                        {"★".repeat(it.rating)}
                        <span style={{ color: "rgba(255,255,255,0.2)" }}>
                          {"★".repeat(5 - it.rating)}
                        </span>
                      </span>
                    ) : null}
                    <span
                      style={{
                        color: "rgba(243,239,231,0.5)",
                        fontSize: "12px",
                      }}
                    >
                      {formatWhen(it.submittedAt)}
                    </span>
                  </div>

                  <div
                    style={{
                      color: "#F5F1E8",
                      fontSize: "16px",
                      fontWeight: 700,
                      marginBottom: "4px",
                    }}
                  >
                    {it.name}
                  </div>
                  <div
                    style={{
                      color: "#CFC6B8",
                      fontSize: "12.5px",
                      marginBottom: "10px",
                    }}
                  >
                    {[it.role, it.location].filter(Boolean).join(" · ")}
                  </div>
                  <p
                    style={{
                      margin: "0 0 14px",
                      color: "#F5F1E8",
                      fontSize: "14.5px",
                      lineHeight: 1.75,
                      fontStyle: "italic",
                    }}
                  >
                    &ldquo;{it.quote}&rdquo;
                  </p>

                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {status !== "approved" ? (
                      <button
                        onClick={() => setStatus(it.id, "approved")}
                        style={actionBtn("approve")}
                      >
                        Approve
                      </button>
                    ) : null}
                    {status !== "rejected" ? (
                      <button
                        onClick={() => setStatus(it.id, "rejected")}
                        style={actionBtn("reject")}
                      >
                        Reject
                      </button>
                    ) : null}
                    {status !== "pending" ? (
                      <button
                        onClick={() => setStatus(it.id, "pending")}
                        style={actionBtn("neutral")}
                      >
                        Move to pending
                      </button>
                    ) : null}
                    <button
                      onClick={() => remove(it.id)}
                      style={actionBtn("delete")}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function actionBtn(kind) {
  const base = {
    padding: "8px 14px",
    borderRadius: "10px",
    fontWeight: 700,
    fontSize: "12.5px",
    cursor: "pointer",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.03)",
    color: "#F5F1E8",
  };
  if (kind === "approve") {
    return {
      ...base,
      border: "1px solid rgba(127,224,162,0.45)",
      background: "rgba(127,224,162,0.12)",
      color: "#7fe0a2",
    };
  }
  if (kind === "reject") {
    return {
      ...base,
      border: "1px solid rgba(255,158,158,0.4)",
      background: "rgba(255,158,158,0.08)",
      color: "#ff9e9e",
    };
  }
  if (kind === "delete") {
    return {
      ...base,
      border: "1px solid rgba(255,120,120,0.3)",
      background: "rgba(255,120,120,0.06)",
      color: "#ff9e9e",
    };
  }
  return base;
}

export default SubmissionsEditor;
