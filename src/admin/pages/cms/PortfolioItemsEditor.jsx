import { PageHeader } from "../Dashboard";
import TextEditor from "../../components/TextEditor";
import RepeatingListEditor from "../../components/RepeatingListEditor";
import CurrentSiteContentPreview from "../../components/CurrentSiteContentPreview";
import EditorSection from "../../components/EditorSection";
import { portfolioItems } from "../../../data/portfolioItems";

const ITEM_FIELDS = [
  { name: "thumbnail", type: "image", label: "Thumbnail (16:9)" },
  { name: "title", type: "text", label: "Title" },
  { name: "description", type: "multiline", label: "Description" },
  { name: "link", type: "url", label: "Link (case study URL)" },
  { name: "category", type: "text", label: "Category" },
  { name: "tags", type: "text", label: "Tags (comma-separated)" },
];

export default function PortfolioItemsEditor() {
  return (
    <div>
      <PageHeader
        eyebrow="CMS · Portfolio"
        title="Portfolio Items"
        subtitle="Section heading + the project cards on the home / portfolio page. 16:9 thumbnails recommended."
      />

      <EditorSection title="Section copy">
        <TextEditor
          slotKey="portfolio.eyebrow"
          label="Eyebrow"
          fallback="Portfolio"
        />
        <TextEditor
          slotKey="portfolio.headline"
          label="Headline"
          fallback="Selected work — tap a card to see the breakdown."
        />
        <TextEditor
          slotKey="portfolio.subhead"
          label="Sub-paragraph"
          multiline
          fallback="Every piece here was built for a real business outcome — not a showreel."
        />
      </EditorSection>

      <EditorSection title="Items" hint="Drag to reorder">
        <CurrentSiteContentPreview
          slotKey="portfolio.items"
          legacyItems={portfolioItems}
          describeItem={(i) => `${i.title} — ${i.category || "Project"}`}
        />
        <RepeatingListEditor
          slotKey="portfolio.items"
          label="Portfolio items"
          itemFields={ITEM_FIELDS}
          category="portfolio"
          folder="mineworld/portfolio"
        />
      </EditorSection>
    </div>
  );
}
