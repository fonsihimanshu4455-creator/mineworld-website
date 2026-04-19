import { useSiteContent } from "../../../context/useSiteContent";
import { NumberField, Row, SectionCard, TextField, Toggle } from "../ui/Fields";

export default function AppointmentEditor() {
  const { content, updateContent } = useSiteContent();
  const a = content.appointment || {};
  const set = (patch) => updateContent({ appointment: patch });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <SectionCard
        title="Floating 'Book Appointment' pill"
        subtitle="Slides in from the right after a short delay on every page. Opens the contact form when clicked. Visitors can dismiss it with the × button."
      >
        <Toggle
          label="Show the floating pill"
          value={a.enabled !== false}
          onChange={(v) => set({ enabled: v })}
          hint="Uncheck to hide the pill on the whole site."
        />

        <Row cols="repeat(auto-fit, minmax(200px, 1fr))">
          <TextField
            label="Main label"
            value={a.label}
            onChange={(v) => set({ label: v })}
            placeholder="Book Appointment"
          />
          <TextField
            label="Caption (small line under label)"
            value={a.caption}
            onChange={(v) => set({ caption: v })}
            placeholder="Free 15-min call"
          />
          <NumberField
            label="Delay before showing"
            value={a.delaySeconds}
            onChange={(v) => set({ delaySeconds: Number(v) || 0 })}
            min={0}
            max={60}
            step={0.5}
            unit="seconds"
          />
        </Row>
      </SectionCard>
    </div>
  );
}
