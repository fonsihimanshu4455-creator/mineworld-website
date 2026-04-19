import { useSiteContent } from "../../../context/useSiteContent";
import { generateId } from "../../../data/defaultContent";
import ArrayEditor from "../ui/ArrayEditor";
import { SectionCard, TextArea, TextField } from "../ui/Fields";

export default function FooterEditor() {
  const { content, updateContent } = useSiteContent();
  const f = content.footer || {};
  const set = (patch) => updateContent({ footer: patch });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <SectionCard
        title="Footer description & legal line"
        subtitle="Shown in the bottom footer panel."
      >
        <TextArea
          label="Footer description"
          value={f.description}
          onChange={(v) => set({ description: v })}
          rows={3}
        />
        <TextField
          label="Legal / copyright line"
          value={f.legal}
          onChange={(v) => set({ legal: v })}
        />
      </SectionCard>

      <SectionCard
        title="Footer services list"
        subtitle="Short list of service names shown in the Services column of the footer. Hide/add/delete/reorder."
      >
        <ArrayEditor
          label="Services"
          items={f.services}
          onChange={(arr) => set({ services: arr })}
          newItem={() => ({ id: generateId("fs"), visible: true, label: "New service" })}
          itemLabel={(it) => it.label || "Untitled service"}
          renderItem={(item, update) => (
            <TextField
              label="Service label"
              value={item.label || ""}
              onChange={(v) => update({ ...item, label: v })}
            />
          )}
          addLabel="+ Add service"
        />
      </SectionCard>
    </div>
  );
}
