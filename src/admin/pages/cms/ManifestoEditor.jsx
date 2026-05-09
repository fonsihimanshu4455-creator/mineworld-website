import { PageHeader } from "../Dashboard";
import TextEditor from "../../components/TextEditor";
import RichTextEditor from "../../components/RichTextEditor";
import RepeatingListEditor from "../../components/RepeatingListEditor";
import EditorSection from "../../components/EditorSection";

const TAG_FIELDS = [{ name: "label", type: "text", label: "Tag label" }];

export default function ManifestoEditor() {
  return (
    <div>
      <PageHeader
        eyebrow="CMS · Manifesto"
        title="Manifesto Band"
        subtitle="The cream-coloured studio mantra block. Eyebrow, headline (with gold-italic emphasis), supporting paragraph, and 4 small tags."
      />

      <EditorSection title="Eyebrow & headline">
        <TextEditor
          slotKey="manifesto.eyebrow"
          label="Eyebrow"
          fallback="Mineworld · The Studio Mantra"
        />
        <RichTextEditor
          slotKey="manifesto.headline_rich"
          label="Headline (rich)"
          fallback="We don't make *content.* We engineer *attention,* *authority,* and *revenue.*"
          hint="Wrap each emphasised word in *asterisks* — they become gold italic Playfair."
        />
        <TextEditor
          slotKey="manifesto.subhead"
          label="Sub-paragraph"
          multiline
          fallback="Every reel, ad, and pixel that leaves this studio is calibrated to a single question — does it make the right person stop scrolling and start trusting? If yes, ship it. If not, cut it."
        />
      </EditorSection>

      <EditorSection title="Tags" hint="Drag to reorder">
        <RepeatingListEditor
          slotKey="manifesto.tags"
          label="Tag pills"
          itemFields={TAG_FIELDS}
          category="misc"
        />
      </EditorSection>
    </div>
  );
}
