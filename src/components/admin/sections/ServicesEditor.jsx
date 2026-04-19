import { useSiteContent } from "../../../context/useSiteContent";
import { generateId } from "../../../data/defaultContent";
import ArrayEditor from "../ui/ArrayEditor";
import MediaUpload from "../ui/MediaUpload";
import { Row, SectionCard, TextArea, TextField, Toggle } from "../ui/Fields";

function slugify(str) {
  return (str || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ServicesEditor() {
  const { content, updateContent } = useSiteContent();
  const s = content.services || {};
  const items = s.items || [];
  const set = (patch) => updateContent({ services: patch });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <SectionCard
        title="Services section heading"
        subtitle="Top of the services block on the homepage."
      >
        <TextField
          label="Section tag"
          value={s.sectionTag}
          onChange={(v) => set({ sectionTag: v })}
        />
        <TextField
          label="Section title"
          value={s.sectionTitle}
          onChange={(v) => set({ sectionTitle: v })}
        />
        <TextArea
          label="Section subtitle"
          value={s.sectionSubtitle}
          onChange={(v) => set({ sectionSubtitle: v })}
          rows={3}
        />
      </SectionCard>

      <SectionCard
        title="Services"
        subtitle="Each service has its own detail page at /services/slug. Sub-services appear on the detail page. Only one service should be marked Featured — that one renders as the big card."
        actions={
          <div
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "11.5px",
              textAlign: "right",
            }}
          >
            {items.filter((i) => i.visible !== false).length} visible / {items.length} total
          </div>
        }
      >
        <ArrayEditor
          label="Services list"
          items={items}
          onChange={(arr) => set({ items: arr })}
          newItem={() => ({
            id: generateId("svc"),
            slug: "new-service-" + Date.now().toString(36).slice(-4),
            visible: true,
            featured: false,
            title: "New Service",
            subtitle: "Short tagline",
            shortDescription: "One-line description shown on the homepage card.",
            longDescription:
              "Longer description shown on the dedicated service page.",
            heroImage: "",
            featuredNote: "",
            quickItems: [
              { id: generateId("q"), visible: true, label: "Capability A" },
              { id: generateId("q"), visible: true, label: "Capability B" },
            ],
            subServices: [
              {
                id: generateId("ss"),
                visible: true,
                title: "First Sub-service",
                description: "Describe what this sub-service includes.",
              },
            ],
          })}
          itemLabel={(it) => it.title || "Untitled service"}
          addLabel="+ Add service"
          renderItem={(item, update) => (
            <ServiceCardEditor item={item} update={update} />
          )}
        />
      </SectionCard>
    </div>
  );
}

function ServiceCardEditor({ item, update }) {
  const updateSlug = (raw) => update({ ...item, slug: slugify(raw) || item.slug });

  return (
    <>
      <Row>
        <TextField
          label="Service title"
          value={item.title}
          onChange={(v) => update({ ...item, title: v })}
        />
        <TextField
          label="Subtitle"
          value={item.subtitle}
          onChange={(v) => update({ ...item, subtitle: v })}
        />
      </Row>

      <Row>
        <TextField
          label="URL slug (used in /services/...)"
          value={item.slug}
          onChange={updateSlug}
        />
        <Toggle
          label="Featured (renders as the big card on homepage)"
          value={Boolean(item.featured)}
          onChange={(v) => update({ ...item, featured: v })}
          hint="Only one service should be Featured at a time."
        />
      </Row>

      <TextArea
        label="Short description (homepage card)"
        value={item.shortDescription}
        onChange={(v) => update({ ...item, shortDescription: v })}
        rows={3}
      />

      <TextArea
        label="Long description (dedicated service page)"
        value={item.longDescription}
        onChange={(v) => update({ ...item, longDescription: v })}
        rows={5}
      />

      <TextArea
        label="Featured note (shown in a gold pill block on the service page)"
        value={item.featuredNote}
        onChange={(v) => update({ ...item, featuredNote: v })}
        rows={3}
      />

      <MediaUpload
        label="Hero image (optional — shown on the service page top)"
        kind="image"
        value={item.heroImage}
        onChange={(v) => update({ ...item, heroImage: v })}
      />

      <ArrayEditor
        label="Quick items (small chips on homepage card)"
        items={item.quickItems || []}
        onChange={(qi) => update({ ...item, quickItems: qi })}
        newItem={() => ({
          id: generateId("q"),
          visible: true,
          label: "New capability",
        })}
        itemLabel={(it) => it.label || "Untitled"}
        renderItem={(qi, set) => (
          <TextField
            label="Label"
            value={qi.label || ""}
            onChange={(v) => set({ ...qi, label: v })}
          />
        )}
        addLabel="+ Add quick item"
      />

      <ArrayEditor
        label="Sub-services (rendered on /services/... detail page)"
        items={item.subServices || []}
        onChange={(ss) => update({ ...item, subServices: ss })}
        newItem={() => ({
          id: generateId("ss"),
          visible: true,
          title: "New sub-service",
          description: "Short description of what's included.",
        })}
        itemLabel={(it) => it.title || "Untitled sub-service"}
        renderItem={(sub, set) => (
          <>
            <TextField
              label="Sub-service title"
              value={sub.title || ""}
              onChange={(v) => set({ ...sub, title: v })}
            />
            <TextArea
              label="Description"
              value={sub.description || ""}
              onChange={(v) => set({ ...sub, description: v })}
              rows={3}
            />
          </>
        )}
        addLabel="+ Add sub-service"
      />
    </>
  );
}
