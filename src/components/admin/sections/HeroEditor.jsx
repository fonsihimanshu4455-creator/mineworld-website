import { useSiteContent } from "../../../context/useSiteContent";
import { generateId } from "../../../data/defaultContent";
import ArrayEditor from "../ui/ArrayEditor";
import MediaUpload from "../ui/MediaUpload";
import { Row, SectionCard, TextArea, TextField } from "../ui/Fields";

export default function HeroEditor() {
  const { content, updateContent } = useSiteContent();
  const h = content.hero || {};
  const setHero = (patch) => updateContent({ hero: patch });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <SectionCard
        title="Hero headline & copy"
        subtitle="First thing visitors read. Keep it sharp and specific."
      >
        <TextField
          label="Eyebrow (small line above headline)"
          value={h.eyebrow}
          onChange={(v) => setHero({ eyebrow: v })}
        />
        <Row>
          <TextField
            label="Headline — line 1"
            value={h.headlineLineOne}
            onChange={(v) => setHero({ headlineLineOne: v })}
          />
          <TextField
            label="Headline — line 2"
            value={h.headlineLineTwo}
            onChange={(v) => setHero({ headlineLineTwo: v })}
          />
        </Row>
        <TextArea
          label="Description paragraph"
          value={h.description}
          onChange={(v) => setHero({ description: v })}
          rows={4}
        />
      </SectionCard>

      <SectionCard
        title="Service badges"
        subtitle="Small chips under the hero description. Hide, reorder, add or delete any."
      >
        <ArrayEditor
          label="Badges"
          items={h.badges}
          onChange={(arr) => setHero({ badges: arr })}
          newItem={() => ({ id: generateId("b"), visible: true, label: "New badge" })}
          itemLabel={(it) => it.label || "Untitled badge"}
          renderItem={(item, update) => (
            <TextField
              label="Badge label"
              value={item.label || ""}
              onChange={(v) => update({ ...item, label: v })}
            />
          )}
          addLabel="+ Add badge"
        />
      </SectionCard>

      <SectionCard
        title="Hero video overlay text"
        subtitle="Shown on the video card in the hero."
      >
        <TextField
          label="Overlay eyebrow"
          value={h.overlayEyebrow}
          onChange={(v) => setHero({ overlayEyebrow: v })}
        />
        <Row>
          <TextField
            label="Overlay line 1"
            value={h.overlayLineOne}
            onChange={(v) => setHero({ overlayLineOne: v })}
          />
          <TextField
            label="Overlay line 2"
            value={h.overlayLineTwo}
            onChange={(v) => setHero({ overlayLineTwo: v })}
          />
        </Row>
        <TextField
          label="Caption line under hero"
          value={h.captionLine}
          onChange={(v) => setHero({ captionLine: v })}
        />
      </SectionCard>

      <SectionCard
        title="Hero media"
        subtitle="Upload or paste a hero video URL (mp4) and a poster image for mobile. Leave blank to use the bundled defaults."
      >
        <MediaUpload
          label="Hero video"
          kind="video"
          value={h.videoUrl}
          onChange={(v) => setHero({ videoUrl: v })}
          hint="Paste a hosted .mp4 URL (recommended for anything bigger than 4 MB) or upload a short clip."
        />
        <MediaUpload
          label="Hero poster image (mobile thumbnail)"
          kind="image"
          value={h.posterUrl}
          onChange={(v) => setHero({ posterUrl: v })}
        />
      </SectionCard>
    </div>
  );
}
