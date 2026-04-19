import { useSiteContent } from "../../../context/useSiteContent";
import MediaUpload from "../ui/MediaUpload";
import {
  NumberField,
  Row,
  SectionCard,
  Select,
  TextField,
  Toggle,
} from "../ui/Fields";

export default function BrandingEditor() {
  const { content, updateContent } = useSiteContent();
  const b = content.brand || {};
  const br = content.branding || {};

  const setBrand = (patch) => updateContent({ brand: patch });
  const setBranding = (patch) => updateContent({ branding: patch });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <SectionCard
        title="Logo"
        subtitle="Upload a new logo (PNG or JPG), or paste a hosted URL. Control its size, circle size, and scale directly from here."
      >
        <MediaUpload
          label="Logo image"
          kind="image"
          value={br.logoUrl}
          onChange={(v) => setBranding({ logoUrl: v })}
          hint="PNG with transparent background works best. Keep under 900 KB when uploading — for larger files, paste a hosted URL."
        />

        <Row cols="repeat(auto-fit, minmax(180px, 1fr))">
          <NumberField
            label="Logo image width"
            value={br.logoSize}
            onChange={(v) => setBranding({ logoSize: v })}
            min={16}
            max={120}
            unit="px"
          />
          <NumberField
            label="Logo circle size"
            value={br.logoCircleSize}
            onChange={(v) => setBranding({ logoCircleSize: v })}
            min={32}
            max={120}
            unit="px"
          />
          <NumberField
            label="Logo inner scale"
            value={br.logoScale}
            onChange={(v) => setBranding({ logoScale: v })}
            min={0.5}
            max={3}
            step={0.1}
            unit="×"
          />
        </Row>
      </SectionCard>

      <SectionCard
        title="Brand name display"
        subtitle="Hide or show the brand name and production subtitle next to the logo."
      >
        <Row>
          <TextField
            label="Brand full name"
            value={b.name}
            onChange={(v) => setBrand({ name: v })}
          />
          <TextField
            label="Brand short name (used next to logo)"
            value={b.shortName}
            onChange={(v) => setBrand({ shortName: v })}
          />
        </Row>
        <TextField
          label="Subtitle under brand name"
          value={br.subtitle}
          onChange={(v) => setBranding({ subtitle: v })}
          placeholder="Production"
        />
        <Row cols="repeat(auto-fit, minmax(240px, 1fr))">
          <Toggle
            label="Show brand name next to logo"
            value={br.showName !== false}
            onChange={(v) => setBranding({ showName: v })}
          />
          <Toggle
            label="Show subtitle under brand name"
            value={br.showSubtitle !== false}
            onChange={(v) => setBranding({ showSubtitle: v })}
            hint={br.subtitle ? `Subtitle: "${br.subtitle}"` : ""}
          />
        </Row>
      </SectionCard>

      <SectionCard
        title="Navbar alignment"
        subtitle="Control how the logo + menu are laid out in the navbar."
      >
        <Select
          label="Alignment"
          value={br.navAlign || "space-between"}
          onChange={(v) => setBranding({ navAlign: v })}
          options={[
            { value: "space-between", label: "Default — logo left, menu right" },
            { value: "flex-start", label: "Logo + menu clustered to the left" },
            { value: "center", label: "Center everything" },
          ]}
          hint="Changes how the logo and menu sit in the navbar."
        />

        <TextField
          label="Brand website URL"
          value={b.website}
          onChange={(v) => setBrand({ website: v })}
        />
      </SectionCard>
    </div>
  );
}
