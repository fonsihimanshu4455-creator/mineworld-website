import { PageHeader } from "../Dashboard";
import RepeatingListEditor from "../../components/RepeatingListEditor";

const REEL_FIELDS = [
  { name: "thumbnail", type: "image", label: "Thumbnail (9:16)", specKey: "reel.videos.thumbnail" },
  { name: "video_file", type: "video", label: "Video (9:16)", specKey: "reel.videos.video" },
  { name: "title", type: "text", label: "Title" },
  { name: "duration", type: "text", label: "Duration (mm:ss)" },
];

export default function ReelsEditor() {
  return (
    <div>
      <PageHeader
        eyebrow="CMS · Reels"
        title="Editing Showcase Reels"
        subtitle="Vertical 9:16 reels for the editing showcase section. Both thumbnail and video should be vertical."
      />
      <RepeatingListEditor
        slotKey="reel.videos"
        label="Reels"
        itemFields={REEL_FIELDS}
        category="reel-showcase"
        folder="mineworld/reels"
      />
    </div>
  );
}
