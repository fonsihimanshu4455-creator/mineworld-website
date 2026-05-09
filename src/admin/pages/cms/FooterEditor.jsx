import { PageHeader } from "../Dashboard";
import TextEditor from "../../components/TextEditor";
import RepeatingListEditor from "../../components/RepeatingListEditor";
import EditorSection from "../../components/EditorSection";

const SOCIAL_FIELDS = [
  { name: "platform", type: "text", label: "Platform" },
  { name: "url", type: "url", label: "URL" },
  { name: "icon_name", type: "text", label: "Icon name (optional)" },
];

const NAV_LINK_FIELDS = [
  { name: "label", type: "text", label: "Label" },
  { name: "target", type: "text", label: "Target (anchor or route)" },
];

const SERVICE_LINK_FIELDS = [
  { name: "label", type: "text", label: "Service label" },
];

const PILL_FIELDS = [{ name: "label", type: "text", label: "Pill label" }];

export default function FooterEditor() {
  return (
    <div>
      <PageHeader
        eyebrow="CMS · Footer"
        title="Footer"
        subtitle="Top CTA card + tagline, contact details, nav links, services list, social links, copyright."
      />

      <EditorSection title="Top CTA card (above the columns)">
        <TextEditor
          slotKey="footer.cta_eyebrow"
          label="Eyebrow"
          fallback="Start with Mineworld"
        />
        <TextEditor
          slotKey="footer.cta_headline"
          label="Headline"
          multiline
          fallback="If your brand still looks ordinary, that's the problem."
        />
        <RepeatingListEditor
          slotKey="footer.cta_feature_pills"
          label="Feature pills"
          itemFields={PILL_FIELDS}
          category="misc"
        />
      </EditorSection>

      <EditorSection title="Brand description">
        <TextEditor
          slotKey="footer.brand_description"
          label="Brand description"
          multiline
          fallback="Mineworld Production is Delhi's premium full-stack creative and growth studio."
        />
        <TextEditor
          slotKey="footer.signature_text"
          label="Signature script text"
          fallback="Mineworld Production"
        />
        <TextEditor
          slotKey="footer.tagline"
          label="Short tagline (legacy)"
          multiline
          fallback="Mineworld Production — Editing-first. Premium standards."
        />
      </EditorSection>

      <EditorSection title="Contact">
        <TextEditor
          slotKey="footer.address"
          label="Address"
          fallback="Mayur Vihar Phase 1, Delhi 110091"
        />
        <TextEditor
          slotKey="footer.email"
          label="Email"
          fallback="mineworldproduction4455@gmail.com"
        />
        <TextEditor
          slotKey="footer.phone"
          label="Phone"
          fallback="+91 9758850933"
        />
      </EditorSection>

      <EditorSection title="Navigation column" hint="Drag to reorder">
        <RepeatingListEditor
          slotKey="footer.nav_links"
          label="Nav links"
          itemFields={NAV_LINK_FIELDS}
          category="misc"
        />
      </EditorSection>

      <EditorSection title="Services column" hint="Drag to reorder">
        <RepeatingListEditor
          slotKey="footer.services_links"
          label="Service strings"
          itemFields={SERVICE_LINK_FIELDS}
          category="misc"
        />
      </EditorSection>

      <EditorSection title="Social Links" hint="Drag to reorder">
        <RepeatingListEditor
          slotKey="footer.social_links"
          label="Social links"
          itemFields={SOCIAL_FIELDS}
          category="misc"
          folder="mineworld/social"
        />
      </EditorSection>

      <EditorSection title="Copyright">
        <TextEditor
          slotKey="footer.copyright"
          label="Copyright line"
          fallback="©️ 2026 Mineworld Production. All rights reserved."
        />
      </EditorSection>
    </div>
  );
}
