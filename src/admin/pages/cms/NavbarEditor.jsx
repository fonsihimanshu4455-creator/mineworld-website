import { PageHeader } from "../Dashboard";
import TextEditor from "../../components/TextEditor";
import RepeatingListEditor from "../../components/RepeatingListEditor";
import EditorSection from "../../components/EditorSection";

const NAV_FIELDS = [
  { name: "label", type: "text", label: "Label" },
  { name: "target", type: "text", label: "Target (anchor like '#portfolio' or route '/about')" },
];

export default function NavbarEditor() {
  return (
    <div>
      <PageHeader
        eyebrow="CMS · Navbar"
        title="Navbar"
        subtitle="Top navigation labels and the right-side CTA button. Public site falls back to the existing nav structure if no items are saved."
      />

      <EditorSection title="Right-side CTA">
        <TextEditor
          slotKey="navbar.cta_label"
          label="CTA label"
          fallback="Start a Project"
        />
        <TextEditor
          slotKey="navbar.cta_link"
          label="CTA link (anchor or route)"
          fallback="contact-modal"
        />
      </EditorSection>

      <EditorSection title="Nav items" hint="Drag to reorder · Hide individual items">
        <RepeatingListEditor
          slotKey="navbar.nav_items"
          label="Nav items"
          itemFields={NAV_FIELDS}
          category="misc"
        />
      </EditorSection>
    </div>
  );
}
