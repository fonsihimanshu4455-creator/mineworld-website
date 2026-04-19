import { useSiteContent } from "../../../context/useSiteContent";
import { generateId } from "../../../data/defaultContent";
import ArrayEditor from "../ui/ArrayEditor";
import { Row, SectionCard, TextArea, TextField } from "../ui/Fields";

export default function ResultsEditor() {
  const { content, updateContent } = useSiteContent();
  const r = content.results || {};
  const set = (patch) => updateContent({ results: patch });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <SectionCard
        title="Section copy"
        subtitle="Eyebrow, headline, and description shown above the proof cards."
      >
        <TextField
          label="Eyebrow"
          value={r.eyebrow}
          onChange={(v) => set({ eyebrow: v })}
        />
        <Row>
          <TextField
            label="Headline prefix"
            value={r.headlinePrefix}
            onChange={(v) => set({ headlinePrefix: v })}
          />
          <TextField
            label="Headline highlight (gold)"
            value={r.headlineHighlight}
            onChange={(v) => set({ headlineHighlight: v })}
          />
        </Row>
        <TextArea
          label="Description"
          value={r.description}
          onChange={(v) => set({ description: v })}
          rows={3}
        />
      </SectionCard>

      <SectionCard
        title="Proof cards"
        subtitle="The animated stat cards — hide, reorder, add new, or delete."
      >
        <ArrayEditor
          label="Proof cards"
          items={r.proofCards}
          onChange={(arr) => set({ proofCards: arr })}
          newItem={() => ({
            id: generateId("p"),
            visible: true,
            number: "0" + ((r.proofCards?.length || 0) + 1),
            counter: "0",
            statSuffix: " New Stat",
            title: "New Case Study",
            description: "Short description of the outcome.",
            tags: ["Tag"],
          })}
          itemLabel={(it) => it.title || "Untitled proof card"}
          renderItem={(item, update) => (
            <>
              <Row cols="repeat(auto-fit, minmax(140px, 1fr))">
                <TextField
                  label="Number"
                  value={item.number}
                  onChange={(v) => update({ ...item, number: v })}
                />
                <TextField
                  label="Counter (animates up)"
                  value={item.counter}
                  onChange={(v) => update({ ...item, counter: v })}
                />
                <TextField
                  label="Suffix"
                  value={item.statSuffix}
                  onChange={(v) => update({ ...item, statSuffix: v })}
                />
              </Row>
              <TextField
                label="Title"
                value={item.title}
                onChange={(v) => update({ ...item, title: v })}
              />
              <TextArea
                label="Description"
                value={item.description}
                onChange={(v) => update({ ...item, description: v })}
                rows={2}
              />
              <TagListEditor
                value={item.tags || []}
                onChange={(tags) => update({ ...item, tags })}
              />
            </>
          )}
          addLabel="+ Add proof card"
        />
      </SectionCard>
    </div>
  );
}

function TagListEditor({ value, onChange }) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "6px",
        }}
      >
        <div
          style={{
            color: "#EAE6DD",
            fontSize: "12px",
            fontWeight: 700,
          }}
        >
          Tags
        </div>
        <button
          type="button"
          onClick={() => onChange([...value, "New tag"])}
          style={{
            border: "1px dashed rgba(214,176,96,0.48)",
            borderRadius: "10px",
            padding: "6px 10px",
            background: "transparent",
            color: "#E7C98A",
            fontSize: "12px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          + Add tag
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {value.map((tag, idx) => (
          <div key={idx} style={{ display: "flex", gap: "6px" }}>
            <input
              value={tag}
              onChange={(e) => {
                const next = [...value];
                next[idx] = e.target.value;
                onChange(next);
              }}
              style={{
                flex: 1,
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.04)",
                color: "#fff",
                padding: "10px 12px",
                fontSize: "13px",
                outline: "none",
              }}
            />
            <button
              type="button"
              onClick={() => onChange(value.filter((_, i) => i !== idx))}
              aria-label="Remove tag"
              style={{
                width: "32px",
                height: "40px",
                borderRadius: "10px",
                border: "1px solid rgba(255,99,71,0.32)",
                background: "rgba(255,99,71,0.06)",
                color: "#FFB4A2",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
