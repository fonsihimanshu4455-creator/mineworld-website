import { PageHeader } from "../Dashboard";
import AssetUploader from "../../components/AssetUploader";
import TextEditor from "../../components/TextEditor";
import ColorPicker from "../../components/ColorPicker";
import EditorSection from "../../components/EditorSection";

export default function HeroEditor() {
  return (
    <div>
      <PageHeader
        eyebrow="CMS · Hero"
        title="Hero Section"
        subtitle="The first impression. Background video, headline, sub-headline, colours, and the two CTAs. Public site updates live as you save."
      />

      <EditorSection title="Background Video" hint="Loops behind the headline">
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
          fallback="PRODUCTION HOUSE • DELHI"
        />
        <TextEditor
          slotKey="hero.headline"
          label="Headline"
          multiline
          fallback="Mineworld — A premium production house."
        />
        <TextEditor
          slotKey="hero.subhead"
          label="Sub-headline"
          multiline
          fallback="Editing-first. Premium standards. Building Mineworld with founder-led discipline and a sharp focus on perception."
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
          slotKey="hero.cta_secondary_label"
          label="Secondary CTA label"
          fallback="View Our Work"
        />
      </EditorSection>
    </div>
  );
}
