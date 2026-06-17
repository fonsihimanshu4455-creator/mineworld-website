import { PageHeader } from "../Dashboard";
import AssetUploader from "../../components/AssetUploader";
import TextEditor from "../../components/TextEditor";
import RepeatingListEditor from "../../components/RepeatingListEditor";
import EditorSection from "../../components/EditorSection";
import ToggleEditor from "../../components/ToggleEditor";

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
        subtitle="Logo + size, top CTA card, tagline, contact details, nav links, services list, social links, copyright."
      />

      <EditorSection title="Logo" hint="Replace the footer logo and adjust its size">
        <AssetUploader
          slotKey="footer.logo"
          accept="image"
          category="brand"
          folder="mineworld/brand"
          tags={["logo", "footer"]}
        />
        <TextEditor
          slotKey="footer.logo_size"
          label="Logo size in px (e.g. 44)"
          fallback="44"
        />
        <TextEditor
          slotKey="footer.logo_alt"
          label="Logo alt text"
          fallback="Mineworld Production logo"
        />
      </EditorSection>

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
        <TextEditor
          slotKey="footer.instagram_url"
          label="Instagram URL"
          fallback="https://instagram.com/mineworldproduction"
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

      <EditorSection
        title="What to show / hide on the website"
        hint="Toggle individual footer elements ON / OFF. Off = element stays here in admin for editing, but doesn't render on the public site. Default for all = ON."
      >
        <ToggleEditor
          slotKey="footer.show_cta_card"
          label="Top CTA card"
          hint="The big 'If your brand still looks ordinary…' card above the columns."
        />
        <ToggleEditor
          slotKey="footer.show_brand_description"
          label="Brand description paragraph"
          hint="The 'Mineworld Production is Delhi's premium…' paragraph."
        />
        <ToggleEditor
          slotKey="footer.show_signature"
          label="Signature script block"
          hint="The script-font 'Mineworld Production' signature near the brand description."
        />
        <ToggleEditor
          slotKey="footer.show_address"
          label="Address row"
          hint="The address line in the Contact column."
        />
        <ToggleEditor
          slotKey="footer.show_email"
          label="Email row"
          hint="The email link in the Contact column."
        />
        <ToggleEditor
          slotKey="footer.show_phone"
          label="Phone row"
          hint="The clickable phone number in the Contact column."
        />
        <ToggleEditor
          slotKey="footer.show_instagram"
          label="Instagram row"
          hint="The Instagram link in the Contact column."
        />
        <ToggleEditor
          slotKey="footer.show_whatsapp"
          label="WhatsApp row"
          hint="The WhatsApp link in the Contact column."
        />
        <ToggleEditor
          slotKey="footer.show_nav_column"
          label="Navigation column"
          hint="The whole 'Navigation' column (Home / Services / Portfolio / Contact)."
        />
        <ToggleEditor
          slotKey="footer.show_services_column"
          label="Services column"
          hint="The whole 'Services' column with the service strings list."
        />
        <ToggleEditor
          slotKey="footer.show_social_column"
          label="Work With Us column"
          hint="The right-most column (contact rows + 'Start a Project' button)."
        />
        <ToggleEditor
          slotKey="footer.show_newsletter"
          label="Newsletter signup strip"
          hint="The 'Stay in the loop' band above the copyright line."
        />
        <ToggleEditor
          slotKey="footer.show_copyright"
          label="Copyright line"
          hint="The '© 2026 Mineworld Production…' line at the very bottom."
        />
      </EditorSection>
    </div>
  );
}
