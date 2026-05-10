// ReviewsEditor — moderate testimonial submissions and curate the
// `testimonials.items` slot.
//
// Pending tab reads from contentStore.userSubmissions (the legacy
// localStorage queue used by TestimonialSubmitModal). Approving a
// submission appends it as an item into testimonials.items and removes
// it from the pending queue.
//
// Curated tab is a thin wrapper around RepeatingListEditor for the
// testimonials.items slot so the admin can also manage the canonical
// list directly.

import { useEffect, useState } from "react";
import { PageHeader } from "../Dashboard";
import { contentStore } from "../../contentStore";
import { saveSlot, useSlotDoc } from "../../cmsStore";
import RepeatingListEditor from "../../components/RepeatingListEditor";
import TextEditor from "../../components/TextEditor";
import EditorSection from "../../components/EditorSection";
import CurrentSiteContentPreview from "../../components/CurrentSiteContentPreview";
import { testimonials as defaultTestimonials } from "../../../data/testimonials";

const ITEM_FIELDS = [
  { name: "quote", type: "multiline", label: "Quote" },
  { name: "author", type: "text", label: "Author name" },
  { name: "role", type: "text", label: "Author role" },
  { name: "location", type: "text", label: "Location" },
  { name: "industry", type: "text", label: "Industry" },
  { name: "result", type: "text", label: "Result line (optional)" },
  { name: "rating", type: "text", label: "Rating (1–5)" },
  { name: "avatar", type: "image", label: "Avatar" },
  { name: "accent", type: "text", label: "Accent (gold | blue)" },
];

function newId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID)
    return crypto.randomUUID();
  return `id-${Math.random().toString(36).slice(2, 10)}-${Date.now()}`;
}

function PendingCard({ submission, onApprove, onReject }) {
  const author = submission.author || submission.name || "Anonymous";
  return (
    <div
      style={{
        padding: 14,
        borderRadius: 12,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(184, 149, 106, 0.18)",
        display: "grid",
        gap: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <strong style={{ fontSize: 14, color: "#F5F1E8" }}>{author}</strong>
        {submission.role ? (
          <span style={{ color: "rgba(245,241,232,0.6)", fontSize: 12 }}>
            {submission.role}
            {submission.location ? ` · ${submission.location}` : ""}
          </span>
        ) : null}
        {submission.rating ? (
          <span style={{ color: "#D9B987", fontSize: 14 }}>
            {"★".repeat(submission.rating)}
            {"☆".repeat(Math.max(0, 5 - submission.rating))}
          </span>
        ) : null}
        {submission.submittedAt ? (
          <span
            style={{
              marginLeft: "auto",
              color: "rgba(245,241,232,0.45)",
              fontSize: 11,
            }}
          >
            {new Date(submission.submittedAt).toLocaleDateString()}
          </span>
        ) : null}
      </div>
      <p
        style={{
          margin: 0,
          fontSize: 13.5,
          lineHeight: 1.6,
          color: "rgba(245,241,232,0.85)",
          fontStyle: "italic",
          fontFamily: '"Playfair Display", Georgia, serif',
        }}
      >
        “{submission.quote || submission.message || "(no quote)"}”
      </p>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button
          type="button"
          onClick={onReject}
          style={{
            padding: "8px 14px",
            borderRadius: 999,
            border: "1px solid rgba(255,120,120,0.35)",
            background: "rgba(255,120,120,0.08)",
            color: "#ff9e9e",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Reject
        </button>
        <button
          type="button"
          onClick={onApprove}
          style={{
            padding: "8px 14px",
            borderRadius: 999,
            border: "none",
            background: "linear-gradient(135deg, #BC9966, #D9B987)",
            color: "#1F2D4D",
            fontSize: 12,
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          Approve & publish
        </button>
      </div>
    </div>
  );
}

export default function ReviewsEditor() {
  const [pending, setPending] = useState([]);
  const slotDoc = useSlotDoc("testimonials.items");

  useEffect(() => {
    const update = () => {
      const list = contentStore.get("userSubmissions");
      setPending(Array.isArray(list) ? list : []);
    };
    update();
    if (typeof window === "undefined") return;
    window.addEventListener("mw-content-change", update);
    return () => window.removeEventListener("mw-content-change", update);
  }, []);

  const handleApprove = async (submission) => {
    const existing = Array.isArray(slotDoc.data?.json_value?.items)
      ? slotDoc.data.json_value.items
      : [];
    const next = [
      ...existing,
      {
        id: newId(),
        visible: true,
        quote: submission.quote || submission.message || "",
        author: submission.author || submission.name || "",
        role: submission.role || "",
        location: submission.location || "",
        industry: submission.industry || "",
        result: submission.result || "",
        rating: submission.rating || 5,
        avatar: null,
        accent: "gold",
      },
    ];
    await saveSlot("testimonials.items", {
      slot_type: "json",
      json_value: { items: next },
      asset_id: null,
      cloudinary_id: null,
      cloudinary_url: null,
      asset_type: null,
      text_value: null,
      color_value: null,
    });
    const list = contentStore.get("userSubmissions");
    const remaining = Array.isArray(list)
      ? list.filter((s) => s !== submission)
      : [];
    await contentStore.set("userSubmissions", remaining);
  };

  const handleReject = async (submission) => {
    if (!confirm("Reject and delete this submission? This cannot be undone."))
      return;
    const list = contentStore.get("userSubmissions");
    const remaining = Array.isArray(list)
      ? list.filter((s) => s !== submission)
      : [];
    await contentStore.set("userSubmissions", remaining);
  };

  return (
    <div>
      <PageHeader
        eyebrow="CMS · Reviews"
        title="Reviews & Testimonials"
        subtitle="Moderate public submissions and curate the testimonials shown on /reviews + the home Testimonials section."
      />

      <EditorSection
        title="Section copy"
        hint="Used by the Testimonials section heading"
      >
        <TextEditor
          slotKey="testimonials.eyebrow"
          label="Eyebrow"
          fallback="Reviews"
        />
        <TextEditor
          slotKey="testimonials.headline"
          label="Headline"
          fallback="What founders, creators, and operators are saying."
        />
        <TextEditor
          slotKey="testimonials.subhead"
          label="Sub-paragraph"
          multiline
          fallback="Real outcomes — leads booked, reels gone viral, ad rupees turned into revenue."
        />
        <TextEditor
          slotKey="testimonials.allow_public_submissions"
          label="Allow public submissions ('true' / 'false')"
          fallback="true"
        />
      </EditorSection>

      <EditorSection
        title={`Pending submissions (${pending.length})`}
        hint="From the public /reviews → submit modal"
      >
        {pending.length === 0 ? (
          <div
            style={{
              padding: 18,
              borderRadius: 12,
              border: "1px dashed rgba(184, 149, 106, 0.3)",
              color: "rgba(245,241,232,0.6)",
              fontSize: 13,
              textAlign: "center",
            }}
          >
            No pending submissions.
          </div>
        ) : (
          pending.map((s, i) => (
            <PendingCard
              key={s.id || i}
              submission={s}
              onApprove={() => handleApprove(s)}
              onReject={() => handleReject(s)}
            />
          ))
        )}
      </EditorSection>

      <EditorSection title="Curated testimonials" hint="Drag to reorder · Hide individual items">
        <CurrentSiteContentPreview
          slotKey="testimonials.items"
          legacyItems={defaultTestimonials}
          describeItem={(t) => `${t.author || t.name} — ${t.role || ""}`}
        />
        <RepeatingListEditor
          slotKey="testimonials.items"
          label="Testimonials"
          itemFields={ITEM_FIELDS}
          category="misc"
          folder="mineworld/testimonials"
        />
      </EditorSection>
    </div>
  );
}
