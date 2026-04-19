import { useSiteContent } from "../../../context/useSiteContent";
import { generateId } from "../../../data/defaultContent";
import ArrayEditor from "../ui/ArrayEditor";
import MediaUpload from "../ui/MediaUpload";
import { NumberField, Row, SectionCard, TextArea, TextField } from "../ui/Fields";

export default function ReviewsEditor() {
  const { content, updateContent } = useSiteContent();
  const r = content.reviews || {};
  const set = (patch) => updateContent({ reviews: patch });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <SectionCard
        title="Reviews heading"
        subtitle="Shown above the right-to-left scrolling review cards."
      >
        <TextField
          label="Section tag"
          value={r.sectionTag}
          onChange={(v) => set({ sectionTag: v })}
        />
        <TextField
          label="Section title"
          value={r.sectionTitle}
          onChange={(v) => set({ sectionTitle: v })}
        />
        <TextArea
          label="Section subtitle"
          value={r.sectionSubtitle}
          onChange={(v) => set({ sectionSubtitle: v })}
          rows={2}
        />
        <TextField
          label='"See all Google Reviews" link URL (optional)'
          value={r.googleUrl}
          onChange={(v) => set({ googleUrl: v })}
          placeholder="https://g.page/your-business/review"
        />
      </SectionCard>

      <SectionCard
        title="Customer reviews"
        subtitle="Add, hide, reorder or delete reviews. Every review shows name, role, star rating, and text. Cards scroll automatically."
        actions={
          <div
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "11.5px",
              textAlign: "right",
            }}
          >
            {(r.items || []).filter((i) => i.visible !== false).length} visible
          </div>
        }
      >
        <ArrayEditor
          label="Reviews"
          items={r.items}
          onChange={(arr) => set({ items: arr })}
          newItem={() => ({
            id: generateId("r"),
            visible: true,
            name: "New Customer",
            role: "Business / Role",
            rating: 5,
            text: "Write the review text here.",
            avatar: "",
          })}
          itemLabel={(it) => it.name || "Untitled review"}
          addLabel="+ Add review"
          renderItem={(item, update) => (
            <>
              <Row>
                <TextField
                  label="Customer name"
                  value={item.name}
                  onChange={(v) => update({ ...item, name: v })}
                />
                <TextField
                  label="Role / business"
                  value={item.role}
                  onChange={(v) => update({ ...item, role: v })}
                />
              </Row>
              <Row cols="repeat(auto-fit, minmax(140px, 1fr))">
                <NumberField
                  label="Star rating"
                  value={item.rating}
                  onChange={(v) => update({ ...item, rating: Math.max(0, Math.min(5, Number(v) || 0)) })}
                  min={0}
                  max={5}
                  step={1}
                  unit="/ 5"
                />
              </Row>
              <TextArea
                label="Review text"
                value={item.text}
                onChange={(v) => update({ ...item, text: v })}
                rows={3}
              />
              <MediaUpload
                label="Customer photo (optional)"
                kind="image"
                value={item.avatar}
                onChange={(v) => update({ ...item, avatar: v })}
                hint="Small square photo. If blank, the customer's initials are shown instead."
              />
            </>
          )}
        />
      </SectionCard>
    </div>
  );
}
