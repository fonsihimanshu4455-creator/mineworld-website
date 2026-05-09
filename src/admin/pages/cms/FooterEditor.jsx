import { PageHeader } from "../Dashboard";
import TextEditor from "../../components/TextEditor";
import RepeatingListEditor from "../../components/RepeatingListEditor";
import EditorSection from "../../components/EditorSection";

const SOCIAL_FIELDS = [
  { name: "platform", type: "text", label: "Platform" },
  { name: "url", type: "url", label: "URL" },
  { name: "icon_name", type: "text", label: "Icon name (optional)" },
];

export default function FooterEditor() {
  return (
    <div>
      <PageHeader
        eyebrow="CMS · Footer"
        title="Footer"
        subtitle="Tagline, contact details, and social links shown in the footer of every page."
      />

      <EditorSection title="Tagline & Contact">
        <TextEditor
          slotKey="footer.tagline"
          label="Tagline"
          multiline
          fallback="Mineworld Production — Editing-first. Premium standards."
        />
        <TextEditor
          slotKey="footer.address"
          label="Address"
          fallback="Mayur Vihar Phase 1, Delhi 110091"
        />
        <TextEditor
          slotKey="footer.email"
          label="Email"
          fallback="mineworldproduction4455@gmail.com"
        />
        <TextEditor
          slotKey="footer.phone"
          label="Phone"
          fallback="+91 9758850933"
        />
      </EditorSection>

      <EditorSection title="Social Links" hint="Drag to reorder">
        <RepeatingListEditor
          slotKey="footer.social_links"
          label="Social links"
          itemFields={SOCIAL_FIELDS}
          category="misc"
          folder="mineworld/social"
        />
      </EditorSection>
    </div>
  );
}
