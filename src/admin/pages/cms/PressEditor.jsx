import { PageHeader } from "../Dashboard";
import TextEditor from "../../components/TextEditor";
import RepeatingListEditor from "../../components/RepeatingListEditor";
import CurrentSiteContentPreview from "../../components/CurrentSiteContentPreview";
import EditorSection from "../../components/EditorSection";
import { pressLogos } from "../../../data/pressLogos";

const PRESS_FIELDS = [
  { name: "logo", type: "image", label: "Publication logo" },
  { name: "name", type: "text", label: "Publication name" },
  { name: "link", type: "url", label: "Article URL (optional)" },
];

export default function PressEditor() {
  return (
    <div>
      <PageHeader
        eyebrow="CMS · Press"
        title="Trust Strip — Featured In + Apps We Ship"
        subtitle="Section copy for the press strip and the apps-we-ship block, plus the publication logos themselves."
      />

      <EditorSection title="Featured In — section copy">
        <TextEditor
          slotKey="trust.featured_eyebrow"
          label="Eyebrow"
          fallback="As Featured In"
        />
        <TextEditor
          slotKey="trust.featured_heading"
          label="Heading"
          fallback="Trusted by founders. Spotted by the press."
        />
      </EditorSection>

      <EditorSection title="Apps We Ship — section copy">
        <TextEditor
          slotKey="trust.apps_eyebrow"
          label="Eyebrow"
          fallback="Apps We Ship"
        />
        <TextEditor
          slotKey="trust.apps_heading"
          label="Heading"
          fallback="Live on iOS & Android — submitted & approved."
        />
        <TextEditor
          slotKey="trust.apps_description"
          label="Description"
          multiline
          fallback="Native-feel cross-platform builds shipped to both stores. Tap a badge to install."
        />
      </EditorSection>

      <EditorSection title="Press logos" hint="Drag to reorder · transparent PNG or SVG recommended">
        <CurrentSiteContentPreview
          slotKey="trust.featured_in_logos"
          legacyItems={pressLogos}
          describeItem={(p) => p.name || "(unnamed publication)"}
        />
        <RepeatingListEditor
          slotKey="trust.featured_in_logos"
          label="Press logos"
          itemFields={PRESS_FIELDS}
          category="press"
          folder="mineworld/press"
        />
      </EditorSection>
    </div>
  );
}
