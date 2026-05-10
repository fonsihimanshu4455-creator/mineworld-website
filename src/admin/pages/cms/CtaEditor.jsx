import { PageHeader } from "../Dashboard";
import TextEditor from "../../components/TextEditor";
import RichTextEditor from "../../components/RichTextEditor";
import RepeatingListEditor from "../../components/RepeatingListEditor";
import EditorSection from "../../components/EditorSection";

const PILL_FIELDS = [{ name: "label", type: "text", label: "Pill label" }];

export default function CtaEditor() {
  return (
    <div>
      <PageHeader
        eyebrow="CMS · CTA"
        title="Closing CTA Section"
        subtitle="The big closing call-to-action card on the home page (and a similar block at the top of the footer)."
      />

      <EditorSection title="Headline & copy">
        <TextEditor
          slotKey="cta.eyebrow"
          label="Eyebrow"
          fallback="Start with Mineworld"
        />
        <RichTextEditor
          slotKey="cta.headline_rich"
          label="Headline (rich)"
          fallback="If your brand still looks ordinary — *that's the problem.*"
        />
        <TextEditor
          slotKey="cta.subhead"
          label="Sub-paragraph"
          multiline
          fallback="Sharper content, better editing, stronger brand perception — in one team."
        />
      </EditorSection>

      <EditorSection title="Buttons">
        <TextEditor
          slotKey="cta.primary_label"
          label="Primary CTA label"
          fallback="Start a Project"
        />
        <TextEditor
          slotKey="cta.primary_link"
          label="Primary CTA link (URL or '#section')"
          fallback="contact-modal"
        />
        <TextEditor
          slotKey="cta.secondary_label"
          label="Secondary CTA label"
          fallback="Book a Call"
        />
        <TextEditor
          slotKey="cta.secondary_link"
          label="Secondary CTA link"
          fallback="contact-modal"
        />
      </EditorSection>

      <EditorSection title="Feature pills" hint="Optional — small badges shown under the CTA">
        <RepeatingListEditor
          slotKey="cta.feature_pills"
          label="Pills"
          itemFields={PILL_FIELDS}
          category="misc"
        />
      </EditorSection>
    </div>
  );
}
