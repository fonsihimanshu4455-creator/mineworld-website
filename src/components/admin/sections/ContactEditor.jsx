import { useSiteContent } from "../../../context/useSiteContent";
import { Row, SectionCard, TextArea, TextField } from "../ui/Fields";

export default function ContactEditor() {
  const { content, updateContent } = useSiteContent();
  const c = content.contact || {};
  const s = content.social || {};
  const setContact = (patch) => updateContent({ contact: patch });
  const setSocial = (patch) => updateContent({ social: patch });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <SectionCard
        title="Contact details"
        subtitle="These are used everywhere: footer, WhatsApp button, contact links, service pages."
      >
        <Row>
          <TextField
            label="Primary phone"
            value={c.phonePrimary}
            onChange={(v) => setContact({ phonePrimary: v })}
            placeholder="+91 9758850933"
          />
          <TextField
            label="WhatsApp number (digits only with country code)"
            value={c.whatsappNumber}
            onChange={(v) =>
              setContact({ whatsappNumber: v.replace(/\D/g, "") })
            }
            placeholder="919758850933"
          />
        </Row>
        <TextField
          label="Email address"
          value={c.email}
          onChange={(v) => setContact({ email: v })}
          type="email"
        />
        <TextArea
          label="Office address"
          value={c.address}
          onChange={(v) => setContact({ address: v })}
          rows={2}
        />
        <TextField
          label="Google Maps URL"
          value={c.addressMapUrl}
          onChange={(v) => setContact({ addressMapUrl: v })}
        />
      </SectionCard>

      <SectionCard
        title="Social & public links"
        subtitle="Instagram + public website URLs used in the footer and service pages."
      >
        <TextField
          label="Instagram URL"
          value={s.instagram}
          onChange={(v) => setSocial({ instagram: v })}
        />
        <TextField
          label="Public website URL"
          value={s.websiteUrl}
          onChange={(v) => setSocial({ websiteUrl: v })}
        />
      </SectionCard>
    </div>
  );
}
