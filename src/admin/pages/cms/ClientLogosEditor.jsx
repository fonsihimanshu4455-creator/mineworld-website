import { PageHeader } from "../Dashboard";
import RepeatingListEditor from "../../components/RepeatingListEditor";

const LOGO_FIELDS = [
  { name: "logo_image", type: "image", label: "Logo image" },
  { name: "name", type: "text", label: "Brand name" },
  { name: "link", type: "url", label: "Website (optional)" },
];

export default function ClientLogosEditor() {
  return (
    <div>
      <PageHeader
        eyebrow="CMS · Client Logos"
        title="Client Logos"
        subtitle="Logos shown on the client wall marquee. Drag to reorder, hide individual ones, or add new logos with the inline uploader. Transparent PNG or SVG recommended."
      />
      <RepeatingListEditor
        slotKey="logo_wall.client_logos"
        label="Client logos"
        itemFields={LOGO_FIELDS}
        category="logo-wall"
        folder="mineworld/logos"
      />
    </div>
  );
}
