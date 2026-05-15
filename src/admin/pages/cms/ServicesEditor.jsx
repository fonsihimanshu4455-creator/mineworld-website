import { PageHeader } from "../Dashboard";
import TextEditor from "../../components/TextEditor";
import RepeatingListEditor from "../../components/RepeatingListEditor";
import EditorSection from "../../components/EditorSection";
import CurrentSiteContentPreview from "../../components/CurrentSiteContentPreview";
import { serviceCategories } from "../../../data/serviceCategories";

const SERVICE_FIELDS = [
  { name: "cover_image", type: "image", label: "Cover image", specKey: "services.items.cover_image" },
  { name: "name", type: "text", label: "Service name" },
  { name: "short", type: "text", label: "Short tagline" },
  { name: "tagline", type: "multiline", label: "Tagline (longer)" },
  { name: "slug", type: "text", label: "Slug (URL)" },
  { name: "color", type: "text", label: "Accent (gold | navy | blue)" },
];

export default function ServicesEditor() {
  return (
    <div>
      <PageHeader
        eyebrow="CMS · Services"
        title="Services Section"
        subtitle="Top-level service tiles on the home page. Deeper per-service detail (long intro, included list, approach, deliverables) still lives in the legacy /admin/collections/serviceCategories editor — saving items here only overrides the home tile presentation."
      />

      <EditorSection title="Section copy">
        <TextEditor
          slotKey="services.eyebrow"
          label="Eyebrow"
          fallback="Services"
        />
        <TextEditor
          slotKey="services.headline"
          label="Headline"
          fallback="What we ship under one roof."
        />
        <TextEditor
          slotKey="services.subhead"
          label="Sub-paragraph"
          multiline
          fallback="Premium websites and apps, retention-first content, paid-creative engineered for revenue, and a social system that keeps your brand in the conversation."
        />
      </EditorSection>

      <EditorSection title="Service tiles" hint="Drag to reorder">
        <CurrentSiteContentPreview
          slotKey="services.items"
          legacyItems={serviceCategories}
          describeItem={(s) => `${s.name} — ${s.short || ""}`}
        />
        <RepeatingListEditor
          slotKey="services.items"
          label="Service tiles"
          itemFields={SERVICE_FIELDS}
          category="misc"
          folder="mineworld/services"
        />
      </EditorSection>
    </div>
  );
}
