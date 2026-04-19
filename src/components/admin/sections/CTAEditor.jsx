import { useSiteContent } from "../../../context/useSiteContent";
import { generateId } from "../../../data/defaultContent";
import ArrayEditor from "../ui/ArrayEditor";
import { Row, SectionCard, TextArea, TextField } from "../ui/Fields";

export default function CTAEditor() {
  const { content, updateContent } = useSiteContent();
  const cta = content.cta || {};
  const set = (patch) => updateContent({ cta: patch });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <SectionCard
        title="Main CTA section"
        subtitle="The big 'Start with Mineworld' block near the bottom of the homepage."
      >
        <TextField
          label="Eyebrow"
          value={cta.eyebrow}
          onChange={(v) => set({ eyebrow: v })}
        />
        <Row>
          <TextField
            label="Headline — line 1"
            value={cta.headlineLineOne}
            onChange={(v) => set({ headlineLineOne: v })}
          />
          <TextField
            label="Headline — line 2"
            value={cta.headlineLineTwo}
            onChange={(v) => set({ headlineLineTwo: v })}
          />
        </Row>
        <TextArea
          label="Description"
          value={cta.description}
          onChange={(v) => set({ description: v })}
          rows={4}
        />
      </SectionCard>

      <SectionCard
        title="CTA chips"
        subtitle="Small chips shown under the CTA buttons. Hide/reorder/add/delete."
      >
        <ArrayEditor
          label="Chips"
          items={cta.chips}
          onChange={(arr) => set({ chips: arr })}
          newItem={() => ({ id: generateId("c"), visible: true, label: "New chip" })}
          itemLabel={(it) => it.label || "Untitled chip"}
          renderItem={(item, update) => (
            <TextField
              label="Chip label"
              value={item.label || ""}
              onChange={(v) => update({ ...item, label: v })}
            />
          )}
          addLabel="+ Add chip"
        />
      </SectionCard>
    </div>
  );
}
