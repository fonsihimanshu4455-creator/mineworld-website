import { PageHeader } from "../Dashboard";
import RepeatingListEditor from "../../components/RepeatingListEditor";
import CurrentSiteContentPreview from "../../components/CurrentSiteContentPreview";
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
        title="Featured In / Press Logos"
        subtitle="Publications and press mentions surfaced in the trust strip. Transparent PNG or SVG recommended."
      />
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
    </div>
  );
}
