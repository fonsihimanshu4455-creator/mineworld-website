import { PageHeader } from "../Dashboard";
import TextEditor from "../../components/TextEditor";
import RichTextEditor from "../../components/RichTextEditor";
import RepeatingListEditor from "../../components/RepeatingListEditor";
import EditorSection from "../../components/EditorSection";
import CurrentSiteContentPreview from "../../components/CurrentSiteContentPreview";
import { capabilityPillars } from "../../../data/capabilityPillars";

const PILLAR_FIELDS = [
  { name: "label", type: "text", label: "Pillar label (Build / Create / Grow)" },
  { name: "title", type: "text", label: "Pillar title" },
  { name: "description", type: "multiline", label: "Description" },
  {
    name: "bullets",
    type: "multiline",
    label: "Bullets (one per line)",
  },
  {
    name: "accent",
    type: "text",
    label: "Accent (gold | blue)",
  },
];

export default function CapabilitiesEditor() {
  return (
    <div>
      <PageHeader
        eyebrow="CMS · Capabilities"
        title="Capabilities Band (Build · Create · Grow)"
        subtitle="The 3-pillar section between the manifesto and trust strip. Section copy + the three pillars themselves."
      />

      <EditorSection title="Section copy">
        <TextEditor
          slotKey="capabilities.eyebrow"
          label="Eyebrow"
          fallback="Build · Create · Grow"
        />
        <RichTextEditor
          slotKey="capabilities.headline_rich"
          label="Headline (rich)"
          fallback="One studio. *Every layer of your brand.*"
        />
        <TextEditor
          slotKey="capabilities.subhead"
          label="Sub-paragraph"
          multiline
          fallback="Most agencies do one thing. We engineer the full stack — what people see, what they click, and what makes them buy."
        />
        <TextEditor
          slotKey="capabilities.tools_label"
          label="Tools-row label"
          fallback="Tools we ship with"
        />
      </EditorSection>

      <EditorSection title="Pillars" hint="Drag to reorder">
        <CurrentSiteContentPreview
          slotKey="capabilities.pillars"
          legacyItems={capabilityPillars}
          describeItem={(p) => `${p.label} — ${p.title}`}
        />
        <RepeatingListEditor
          slotKey="capabilities.pillars"
          label="Capability pillars"
          itemFields={PILLAR_FIELDS}
          category="misc"
        />
      </EditorSection>
    </div>
  );
}
