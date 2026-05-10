import { PageHeader } from "../Dashboard";
import RepeatingListEditor from "../../components/RepeatingListEditor";

const APP_FIELDS = [
  { name: "icon", type: "image", label: "App icon (square)" },
  { name: "name", type: "text", label: "App name" },
  { name: "description", type: "multiline", label: "Description" },
  { name: "app_store_url", type: "url", label: "App Store URL" },
  { name: "play_store_url", type: "url", label: "Play Store URL" },
];

export default function AppsEditor() {
  return (
    <div>
      <PageHeader
        eyebrow="CMS · Apps"
        title="Apps We Ship"
        subtitle="Featured apps from your portfolio. Square icons (1024×1024) preferred — they're rendered with rounded corners on site."
      />
      <RepeatingListEditor
        slotKey="apps.list"
        label="Apps"
        itemFields={APP_FIELDS}
        category="apps"
        folder="mineworld/apps"
      />
    </div>
  );
}
