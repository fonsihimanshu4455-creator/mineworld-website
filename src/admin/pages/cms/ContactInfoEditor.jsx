// ContactInfoEditor — every contact-related detail in ONE place.
// Each row is a ContactCard with the main field + optional secondary
// (e.g. Google Maps URL for an address) + visibility toggle, all
// inside the same card. No more hunting across separate sections.
//
// Slot keys reuse the existing footer.* namespace so any admin edits
// you've already made stay live — this page just surfaces them in a
// nicer layout.

import { PageHeader } from "../Dashboard";
import EditorSection from "../../components/EditorSection";
import ContactCard from "../../components/ContactCard";

export default function ContactInfoEditor() {
  return (
    <div>
      <PageHeader
        eyebrow="CMS · Contact Info"
        title="Contact Info"
        subtitle="All your contact details + their show/hide toggles in one place. Click off the input to save. Toggle off any item to hide it from the website without losing the data."
      />

      <EditorSection title="Contact details">
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
    </div>
  );
}
