import { PageHeader } from "../Dashboard";
import AssetUploader from "../../components/AssetUploader";
import TextEditor from "../../components/TextEditor";
import RichTextEditor from "../../components/RichTextEditor";
import ColorPicker from "../../components/ColorPicker";
import EditorSection from "../../components/EditorSection";
import ToggleEditor from "../../components/ToggleEditor";
import SplitEditorLayout from "../../components/SplitEditorLayout";
import HeroLivePreview from "../../components/HeroLivePreview";

export default function HeroEditor() {
  return (
    <div>
      <PageHeader
        eyebrow="CMS · Hero"
        title="Hero Section"
        subtitle="Edit on the left — preview updates on the right as you type. The first impression: hero video, headline, sub-headline, colours, and the two CTAs."
        action={
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            style={{
              padding: "10px 18px",
              borderRadius: 999,
              border: "1px solid var(--admin-border-strong, rgba(31,45,77,0.16))",
              background: "var(--admin-surface, #FFFFFF)",
              color: "var(--admin-text, #1A1A1A)",
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            👁 Preview Website
          </a>
        }
      />

      <SplitEditorLayout
        left={
          <>
            <EditorSection
              title="Hero video"
              hint="The video that loops behind the headline. Cloudinary auto-generates the poster from frame 1 — only ONE upload needed."
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
                label="Eyebrow (small line above the headline)"
                fallback="Delhi · Websites · Apps · Video · Meta Ads · Growth"
              />
              <RichTextEditor
                slotKey="hero.headline_rich"
                label="Headline (rich — supports gold-italic emphasis)"
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

            <EditorSection title="Call-to-Action buttons">
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

            <EditorSection
              title="Video-card overlay text"
              hint='The small gold line + the bigger white sentence that sit on TOP of the hero video, bottom-left corner. Currently reads "Websites · Apps · Ads" / "Premium digital systems engineered to convert visitors into customers".'
            >
              <TextEditor
                slotKey="hero.video_card_eyebrow"
                label="Small gold line (eyebrow) — top of the two"
                fallback="Websites · Apps · Ads"
              />
              <ColorPicker
                slotKey="hero.video_card_eyebrow_color"
                label="Colour of the small gold line"
                fallback="#D4B896"
              />
              <TextEditor
                slotKey="hero.video_card_caption"
                label='Big white sentence (the "Premium digital systems…" line)'
                multiline
                fallback="Premium digital systems\nengineered to convert visitors into customers"
              />
              <ColorPicker
                slotKey="hero.video_card_caption_color"
                label="Colour of the big white sentence"
                fallback="#FAF7F2"
              />
            </EditorSection>

            <EditorSection
              title="Visibility"
              hint="Toggle the whole Hero section off to hide it from the public site without losing any of its content."
            >
              <ToggleEditor
                slotKey="hero.show_section"
                label="Show this section on the website"
              />
            </EditorSection>
          </>
        }
        right={<HeroLivePreview />}
      />
    </div>
  );
}
