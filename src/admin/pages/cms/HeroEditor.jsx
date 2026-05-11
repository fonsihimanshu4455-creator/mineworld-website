import { PageHeader } from "../Dashboard";
import AssetUploader from "../../components/AssetUploader";
import TextEditor from "../../components/TextEditor";
import RichTextEditor from "../../components/RichTextEditor";
import ColorPicker from "../../components/ColorPicker";
import EditorSection from "../../components/EditorSection";

export default function HeroEditor() {
  return (
    <div>
      <PageHeader
        eyebrow="CMS · Hero"
        title="Hero Section"
        subtitle="The first impression. Background video, headline (with rich gold-italic emphasis), sub-headline, colours, and the two CTAs."
      />

      <EditorSection
        title="Hero video"
        hint="The video that loops behind the headline. The poster image (shown for the first split-second while the video loads) is auto-generated from frame 1 of this video, so you only need to upload ONE file here."
      >
        <AssetUploader
          slotKey="hero.video"
          accept="video"
          category="hero"
          folder="mineworld/hero"
          tags={["hero"]}
        />
      </EditorSection>

      <EditorSection title="Headline & Copy">
        <TextEditor
          slotKey="hero.eyebrow"
          label="Eyebrow"
          fallback="Delhi · Websites · Apps · Video · Meta Ads · Growth"
        />
        <RichTextEditor
          slotKey="hero.headline_rich"
          label="Headline (rich)"
          fallback="Websites. Apps.\nAds that *earn revenue*."
          hint="Use *asterisks* for the gold italic span. \\n forces a line break."
        />
        <TextEditor
          slotKey="hero.headline"
          label="Plain headline (used only if rich is empty)"
          multiline
          fallback=""
        />
        <TextEditor
          slotKey="hero.subhead"
          label="Sub-headline"
          multiline
          fallback="Mineworld Production is Delhi's full-stack creative + growth studio — premium websites, native-feel mobile apps, retention-first video, Meta ad campaigns, and social media systems built for real leads and revenue, not vanity reach."
        />
      </EditorSection>

      <EditorSection title="Colours">
        <ColorPicker
          slotKey="hero.headline_color"
          label="Headline color"
          fallback="#1A1A1A"
        />
        <ColorPicker
          slotKey="hero.subhead_color"
          label="Sub-headline color"
          fallback="#4A4A4A"
        />
      </EditorSection>

      <EditorSection title="Call-to-Action Buttons">
        <TextEditor
          slotKey="hero.cta_primary_label"
          label="Primary CTA label"
          fallback="Start a Project"
        />
        <TextEditor
          slotKey="hero.cta_primary_link"
          label="Primary CTA link (URL or 'contact-modal')"
          fallback="contact-modal"
        />
        <TextEditor
          slotKey="hero.cta_secondary_label"
          label="Secondary CTA label"
          fallback="View Work"
        />
        <TextEditor
          slotKey="hero.cta_secondary_link"
          label="Secondary CTA link"
          fallback="#portfolio"
        />
      </EditorSection>
    </div>
  );
}
