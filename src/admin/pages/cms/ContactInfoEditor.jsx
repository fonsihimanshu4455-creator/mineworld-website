// ContactInfoEditor — every contact-related detail in ONE place.
// Each row is a ContactCard with the main field + optional secondary
// (e.g. Google Maps URL for an address) + visibility toggle, all
// inside the same card. No more hunting across separate sections.
//
// Below the primary rows: "Additional [type]" repeating lists so
// admins can add unlimited extra phones / emails / instagrams /
// addresses. Each row in these lists has its own show/hide.
//
// Slot keys reuse the existing footer.* namespace so any admin edits
// you've already made stay live — this page just surfaces them in a
// nicer layout.

import { PageHeader } from "../Dashboard";
import EditorSection from "../../components/EditorSection";
import ContactCard from "../../components/ContactCard";
import RepeatingListEditor from "../../components/RepeatingListEditor";

const ADDITIONAL_PHONE_FIELDS = [
  {
    name: "label",
    type: "text",
    label: "Label (e.g. Sales, Support, Bookings)",
    placeholder: "Sales",
  },
  {
    name: "phone",
    type: "text",
    label: "Phone number (with country code, e.g. +91 9758850933)",
    placeholder: "+91 9876543210",
  },
];

const ADDITIONAL_EMAIL_FIELDS = [
  {
    name: "label",
    type: "text",
    label: "Label (e.g. Sales, Careers, Press)",
    placeholder: "Sales",
  },
  {
    name: "email",
    type: "text",
    label: "Email address",
    placeholder: "sales@mineworldproduction.com",
  },
];

const ADDITIONAL_INSTAGRAM_FIELDS = [
  {
    name: "label",
    type: "text",
    label: "Label (e.g. Portfolio, Founder, Editing reel)",
    placeholder: "Portfolio",
  },
  {
    name: "url",
    type: "url",
    label: "Instagram profile URL",
    placeholder: "https://instagram.com/mineworld_portfolio",
  },
];

const ADDITIONAL_ADDRESS_FIELDS = [
  {
    name: "label",
    type: "text",
    label: "Label (e.g. Studio, Branch, Meeting spot)",
    placeholder: "Studio",
  },
  {
    name: "address",
    type: "multiline",
    label: "Address text",
    placeholder: "Full address",
  },
  {
    name: "maps_url",
    type: "url",
    label: "Google Maps URL (optional)",
    placeholder: "https://maps.google.com/?q=…",
  },
];

export default function ContactInfoEditor() {
  return (
    <div>
      <PageHeader
        eyebrow="CMS · Contact Info"
        title="Contact Info"
        subtitle="All your contact details + show/hide toggles in one place. Below the primary rows you can add unlimited extra phones / emails / Instagram accounts / addresses — each with its own label and toggle."
      />

      {/* ─── Primary contact details ─── */}
      <EditorSection title="Primary contact details">
        <ContactCard
          title="Address"
          hint="Shown in the Footer · Contact column. Click on the website opens Google Maps using the URL you set below."
          icon="📍"
          slotKey="footer.address"
          label="Address text"
          placeholder="Mayur Vihar Phase 1, Delhi 110091"
          fallback="Mayur Vihar Phase 1, Delhi 110091"
          secondarySlotKey="footer.maps_url"
          secondaryLabel="Google Maps URL (where the address click goes)"
          secondaryPlaceholder="https://maps.google.com/?q=Mayur+Vihar+Phase+1+Delhi+110091"
          secondaryFallback="https://maps.google.com/?q=Mayur+Vihar+Phase+1+Delhi+110091"
          visibilitySlotKey="footer.show_address"
        />

        <ContactCard
          title="Email"
          hint="Shown in the Footer · Contact column. Click on the website opens the visitor's mail app."
          icon="✉️"
          slotKey="footer.email"
          label="Email address"
          placeholder="mineworldproduction4455@gmail.com"
          fallback="mineworldproduction4455@gmail.com"
          inputType="email"
          visibilitySlotKey="footer.show_email"
        />

        <ContactCard
          title="Phone"
          hint="Shown in the Footer · Contact column. Also drives the WhatsApp number below — change here and WhatsApp updates automatically."
          icon="📞"
          slotKey="footer.phone"
          label="Phone number (with country code, e.g. +91 9758850933)"
          placeholder="+91 9758850933"
          fallback="+91 9758850933"
          visibilitySlotKey="footer.show_phone"
        />

        <ContactCard
          title="WhatsApp"
          hint="Auto-uses the phone number above. The toggle hides the WhatsApp row in the footer."
          icon="💬"
          slotKey="footer.whatsapp_label"
          label="Display label (the link text — leave default if unsure)"
          placeholder="WhatsApp"
          fallback="WhatsApp"
          visibilitySlotKey="footer.show_whatsapp"
        />

        <ContactCard
          title="Instagram"
          hint="Shown in the Footer · Contact column."
          icon="📷"
          slotKey="footer.instagram_url"
          label="Instagram profile URL"
          placeholder="https://instagram.com/mineworldproduction"
          fallback="https://instagram.com/mineworldproduction"
          inputType="url"
          visibilitySlotKey="footer.show_instagram"
        />

        <ContactCard
          title="Website link"
          hint="The 'www.mineworldproduction.com' link in the footer. Most sites don't show this because it's redundant — toggle off to hide."
          icon="🔗"
          slotKey="footer.website_url"
          label="Website URL"
          placeholder="https://www.mineworldproduction.com"
          fallback="https://www.mineworldproduction.com"
          inputType="url"
          visibilitySlotKey="footer.show_website"
        />
      </EditorSection>

      {/* ─── Additional entries — unlimited per type ─── */}
      <EditorSection
        title="Additional phone numbers"
        hint="Add extra numbers — Sales / Support / Bookings / regional lines. Each row has its own show/hide (eye icon on the right). Drag to reorder."
      >
        <RepeatingListEditor
          slotKey="footer.additional_phones"
          label="Additional phones"
          itemFields={ADDITIONAL_PHONE_FIELDS}
          category="contact"
        />
      </EditorSection>

      <EditorSection
        title="Additional email addresses"
        hint="Add extra emails — Sales / Careers / Press / Support."
      >
        <RepeatingListEditor
          slotKey="footer.additional_emails"
          label="Additional emails"
          itemFields={ADDITIONAL_EMAIL_FIELDS}
          category="contact"
        />
      </EditorSection>

      <EditorSection
        title="Additional Instagram accounts"
        hint="Add extra Instagram profiles — Portfolio / Founder / Editing reel accounts."
      >
        <RepeatingListEditor
          slotKey="footer.additional_instagrams"
          label="Additional Instagram"
          itemFields={ADDITIONAL_INSTAGRAM_FIELDS}
          category="contact"
        />
      </EditorSection>

      <EditorSection
        title="Additional addresses"
        hint="Add extra locations — Studio / Branch / Meeting spot."
      >
        <RepeatingListEditor
          slotKey="footer.additional_addresses"
          label="Additional addresses"
          itemFields={ADDITIONAL_ADDRESS_FIELDS}
          category="contact"
        />
      </EditorSection>
    </div>
  );
}
