import { PageHeader } from "../Dashboard";
import AssetUploader from "../../components/AssetUploader";
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
        subtitle="Logo (image / size / position), nav labels, right-side CTA. Public site falls back to bundled defaults when slots are empty."
      />

      <EditorSection title="Logo" hint="Replace the brand mark and tune its size + position">
        <AssetUploader
          slotKey="navbar.logo"
          accept="image"
          category="brand"
          folder="mineworld/brand"
          tags={["logo", "navbar"]}
        />
        <TextEditor
          slotKey="navbar.logo_size"
          label="Logo size in px (e.g. 40)"
          fallback="40"
        />
        <TextEditor
          slotKey="navbar.logo_position"
          label="Logo position (left | center)"
          fallback="left"
        />
        <TextEditor
          slotKey="navbar.logo_alt"
          label="Logo alt text"
          fallback="Mineworld Production logo"
        />
      </EditorSection>

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
