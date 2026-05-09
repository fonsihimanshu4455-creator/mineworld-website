import { PageHeader } from "../Dashboard";
import TextEditor from "../../components/TextEditor";
import RepeatingListEditor from "../../components/RepeatingListEditor";
import EditorSection from "../../components/EditorSection";
import CurrentSiteContentPreview from "../../components/CurrentSiteContentPreview";
import { processSteps } from "../../../data/processSteps";

const STEP_FIELDS = [
  { name: "number", type: "text", label: "Step number (01, 02, …)" },
  { name: "eyebrow", type: "text", label: "Eyebrow (Day 0, Week 1, …)" },
  { name: "title", type: "text", label: "Step title" },
  { name: "duration", type: "text", label: "Duration label" },
  { name: "description", type: "multiline", label: "Description" },
  { name: "deliverables", type: "multiline", label: "Deliverables (one per line)" },
];

export default function ProcessEditor() {
  return (
    <div>
      <PageHeader
        eyebrow="CMS · Process"
        title="Process / How We Work"
        subtitle="The 5-step process timeline. Section copy + each step."
      />

      <EditorSection title="Section copy">
        <TextEditor
          slotKey="process.eyebrow"
          label="Eyebrow"
          fallback="Process"
        />
        <TextEditor
          slotKey="process.headline"
          label="Headline"
          fallback="From first call to performing campaign — in 14 working days."
        />
        <TextEditor
          slotKey="process.subhead"
          label="Sub-paragraph"
          multiline
          fallback="A repeatable system, not a vibe. Every step has an owner, a deadline, and a specific deliverable."
        />
      </EditorSection>

      <EditorSection title="Steps" hint="Drag to reorder">
        <CurrentSiteContentPreview
          slotKey="process.steps"
          legacyItems={processSteps}
          describeItem={(s) => `${s.number} — ${s.title}`}
        />
        <RepeatingListEditor
          slotKey="process.steps"
          label="Process steps"
          itemFields={STEP_FIELDS}
          category="misc"
        />
      </EditorSection>
    </div>
  );
}
