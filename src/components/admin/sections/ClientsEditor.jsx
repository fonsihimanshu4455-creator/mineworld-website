import { useSiteContent } from "../../../context/useSiteContent";
import { generateId } from "../../../data/defaultContent";
import ArrayEditor from "../ui/ArrayEditor";
import MediaUpload from "../ui/MediaUpload";
import { SectionCard, TextField } from "../ui/Fields";

export default function ClientsEditor() {
  const { content, updateContent } = useSiteContent();
  const c = content.clients || {};
  const set = (patch) => updateContent({ clients: patch });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <SectionCard
        title="Clients section heading"
        subtitle="Tiny section above the auto-scrolling client logos."
      >
        <TextField
          label="Section tag"
          value={c.sectionTag}
          onChange={(v) => set({ sectionTag: v })}
        />
        <TextField
          label="Section title (right-side line)"
          value={c.sectionTitle}
          onChange={(v) => set({ sectionTitle: v })}
        />
      </SectionCard>

      <SectionCard
        title="Client logos"
        subtitle="Upload a logo image or paste a URL. Leave blank to show the client name as a text tile. Logos scroll right-to-left and pause on tap/hover."
        actions={
          <div
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "11.5px",
              textAlign: "right",
            }}
          >
            {(c.items || []).filter((i) => i.visible !== false).length} visible
          </div>
        }
      >
        <ArrayEditor
          label="Clients"
          items={c.items}
          onChange={(arr) => set({ items: arr })}
          newItem={() => ({
            id: generateId("cl"),
            visible: true,
            name: "New Client",
            logo: "",
          })}
          itemLabel={(it) => it.name || "Untitled client"}
          addLabel="+ Add client"
          renderItem={(item, update) => (
            <>
              <TextField
                label="Client name"
                value={item.name}
                onChange={(v) => update({ ...item, name: v })}
              />
              <MediaUpload
                label="Logo image"
                kind="image"
                value={item.logo}
                onChange={(v) => update({ ...item, logo: v })}
                hint="Transparent PNG or SVG data URL works best. Leave empty to render just the client name."
              />
            </>
          )}
        />
      </SectionCard>
    </div>
  );
}
