import { useSiteContent } from "../../../context/useSiteContent";
import { generateId } from "../../../data/defaultContent";
import ArrayEditor from "../ui/ArrayEditor";
import { SectionCard, TextArea, TextField } from "../ui/Fields";

export default function FAQEditor() {
  const { content, updateContent } = useSiteContent();
  const f = content.faq || {};
  const set = (patch) => updateContent({ faq: patch });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <SectionCard
        title="FAQ heading"
        subtitle="Shown above the expandable questions."
      >
        <TextField
          label="Section tag"
          value={f.sectionTag}
          onChange={(v) => set({ sectionTag: v })}
        />
        <TextField
          label="Section title"
          value={f.sectionTitle}
          onChange={(v) => set({ sectionTitle: v })}
        />
        <TextArea
          label="Section subtitle"
          value={f.sectionSubtitle}
          onChange={(v) => set({ sectionSubtitle: v })}
          rows={2}
        />
      </SectionCard>

      <SectionCard
        title="Questions & answers"
        subtitle="Add, hide, reorder or delete FAQs. Keep answers short and clear — 2–3 sentences is ideal."
        actions={
          <div
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "11.5px",
              textAlign: "right",
            }}
          >
            {(f.items || []).filter((i) => i.visible !== false).length} visible
          </div>
        }
      >
        <ArrayEditor
          label="FAQs"
          items={f.items}
          onChange={(arr) => set({ items: arr })}
          newItem={() => ({
            id: generateId("f"),
            visible: true,
            question: "New question?",
            answer: "Write a short, clear answer.",
          })}
          itemLabel={(it) => it.question || "Untitled question"}
          addLabel="+ Add question"
          renderItem={(item, update) => (
            <>
              <TextField
                label="Question"
                value={item.question}
                onChange={(v) => update({ ...item, question: v })}
              />
              <TextArea
                label="Answer"
                value={item.answer}
                onChange={(v) => update({ ...item, answer: v })}
                rows={4}
              />
            </>
          )}
        />
      </SectionCard>
    </div>
  );
}
