import { PageHeader } from "../Dashboard";
import TextEditor from "../../components/TextEditor";
import RichTextEditor from "../../components/RichTextEditor";
import RepeatingListEditor from "../../components/RepeatingListEditor";
import EditorSection from "../../components/EditorSection";

const PAIR_FIELDS = [
  { name: "eyebrow", type: "text", label: "Pair eyebrow (Brand Reel / Podcast / Meta Ad)" },
  { name: "title", type: "text", label: "Pair title" },
  { name: "description", type: "multiline", label: "Pair description" },
  { name: "before_image", type: "image", label: "Before image", specKey: "editing.pairs.before_image" },
  { name: "after_image", type: "image", label: "After image", specKey: "editing.pairs.after_image" },
];

const REEL_FIELDS = [
  { name: "thumbnail", type: "image", label: "Thumbnail (9:16)", specKey: "reel.videos.thumbnail" },
  { name: "video_file", type: "video", label: "Video (9:16)", specKey: "reel.videos.video" },
  { name: "title", type: "text", label: "Title" },
  { name: "duration", type: "text", label: "Duration (mm:ss)" },
];

export default function EditingShowcaseEditor() {
  return (
    <div>
      <PageHeader
        eyebrow="CMS · Editing Showcase"
        title="Editing Showcase"
        subtitle="The before/after slider section + the optional vertical reels strip above it."
      />

      <EditorSection title="Section copy">
        <TextEditor
          slotKey="editing.eyebrow"
          label="Eyebrow"
          fallback="Editing Showcase"
        />
        <RichTextEditor
          slotKey="editing.headline_rich"
          label="Headline (rich)"
          fallback="Drag to see what retention-first editing *actually changes.*"
        />
        <TextEditor
          slotKey="editing.subhead"
          label="Sub-paragraph"
          multiline
          fallback="Same raw footage, different structure — that's where most of the growth comes from."
        />
        <TextEditor
          slotKey="editing.before_label"
          label='"Before" label'
          fallback="Before"
        />
        <TextEditor
          slotKey="editing.after_label"
          label='"After" label'
          fallback="After"
        />
      </EditorSection>

      <EditorSection title="Before / After pairs" hint="Drag to reorder">
        <RepeatingListEditor
          slotKey="editing.pairs"
          label="Before / after pairs"
          itemFields={PAIR_FIELDS}
          category="editing-showcase"
          folder="mineworld/editing"
        />
      </EditorSection>

      <EditorSection title="Vertical reels strip" hint="Optional 9:16 grid above the slider">
        <RepeatingListEditor
          slotKey="reel.videos"
          label="Reels"
          itemFields={REEL_FIELDS}
          category="reel-showcase"
          folder="mineworld/reels"
        />
      </EditorSection>
    </div>
  );
}
