import { PageHeader } from "../Dashboard";
import AssetUploader from "../../components/AssetUploader";
import TextEditor from "../../components/TextEditor";
import RichTextEditor from "../../components/RichTextEditor";
import RepeatingListEditor from "../../components/RepeatingListEditor";
import EditorSection from "../../components/EditorSection";

const BULLET_FIELDS = [{ name: "text", type: "text", label: "Bullet text" }];

export default function FounderEditor() {
  return (
    <div>
      <PageHeader
        eyebrow="CMS · Founder"
        title="Founder Section"
        subtitle="Portrait, identity, the second-column heading + paragraph, capability bullets, and the Founder Note italic quote."
      />

      <EditorSection title="Portrait" hint="4:5 vertical recommended">
        <AssetUploader
          slotKey="founder.photo"
          accept="image"
          category="founder"
          folder="mineworld/founder"
          tags={["founder"]}
        />
      </EditorSection>

      <EditorSection title="Identity (overlay on portrait)">
        <TextEditor
          slotKey="founder.name"
          label="Name"
          fallback="Himanshu Bhardwaj"
        />
        <TextEditor
          slotKey="founder.title"
          label="Title"
          fallback="Founder & Creative Director"
        />
        <TextEditor
          slotKey="founder.bio"
          label="Short bio (overlaid on portrait)"
          multiline
          fallback="Building Mineworld with an editing-first mindset, premium standards, and a sharp focus on how brands are perceived."
        />
      </EditorSection>

      <EditorSection title="Section heading">
        <TextEditor
          slotKey="founder.eyebrow"
          label="Eyebrow"
          fallback="Founder"
        />
        <TextEditor
          slotKey="founder.section_heading"
          label="Section heading"
          fallback="A premium brand needs a visible standard behind it."
        />
      </EditorSection>

      <EditorSection title="Right-column copy">
        <RichTextEditor
          slotKey="founder.column_heading_rich"
          label="Column heading (rich)"
          fallback="Mineworld is not being built to look *nice.*\nIt is being built to feel *unforgettable.*"
        />
        <TextEditor
          slotKey="founder.main_paragraph"
          label="Main paragraph"
          multiline
          fallback="The vision behind Mineworld is simple: create a production and digital brand that feels sharper, more cinematic, more premium, and more strategically aware than the usual market standard."
        />
      </EditorSection>

      <EditorSection title="Capability bullets" hint="Drag to reorder · 6 by default">
        <RepeatingListEditor
          slotKey="founder.bullets"
          label="Bullets"
          itemFields={BULLET_FIELDS}
          category="misc"
        />
      </EditorSection>

      <EditorSection title="Founder Note (italic quote box)">
        <TextEditor
          slotKey="founder.note_eyebrow"
          label="Note eyebrow"
          fallback="Founder Note"
        />
        <TextEditor
          slotKey="founder.note_text"
          label="Note text"
          multiline
          fallback="Mineworld is being built for clients and brands who want to look stronger, sharper, and harder to ignore."
        />
      </EditorSection>

      <EditorSection title="Buttons">
        <TextEditor
          slotKey="founder.cta_primary_label"
          label="Primary CTA label"
          fallback="Explore Founder Profile"
        />
        <TextEditor
          slotKey="founder.cta_secondary_label"
          label="Secondary CTA label"
          fallback="Build with Mineworld"
        />
      </EditorSection>
    </div>
  );
}
