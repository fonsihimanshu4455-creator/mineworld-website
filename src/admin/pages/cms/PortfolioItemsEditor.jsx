import { PageHeader } from "../Dashboard";
import RepeatingListEditor from "../../components/RepeatingListEditor";
import CurrentSiteContentPreview from "../../components/CurrentSiteContentPreview";
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
        subtitle="Project cards on the home and portfolio page. 16:9 thumbnails recommended; reorder with the drag handle."
      />
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
    </div>
  );
}
