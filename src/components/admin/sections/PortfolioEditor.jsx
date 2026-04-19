import { useSiteContent } from "../../../context/useSiteContent";
import MediaUpload from "../ui/MediaUpload";
import { SectionCard, TextArea, TextField, Toggle } from "../ui/Fields";

export default function PortfolioEditor() {
  const { content, updateContent } = useSiteContent();
  const overrides = content.portfolioOverrides || {};

  const updateOverride = (id, patch) =>
    updateContent({
      portfolioOverrides: {
        [id]: { ...overrides[id], ...patch },
      },
    });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <SectionCard
        title="Portfolio items"
        subtitle="4 portfolio slots. Override title, description, video or poster for any slot. Leave a field empty to keep the bundled default. Toggle visibility to hide a slot from the homepage."
      >
        {[1, 2, 3, 4].map((id) => {
          const o = overrides[id] || {};
          return (
            <div
              key={id}
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "18px",
                padding: "18px",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    color: "#E7C98A",
                    fontSize: "12px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                >
                  Portfolio slot #{id}
                </div>
              </div>

              <Toggle
                label="Visible on homepage"
                value={o.visible !== false}
                onChange={(v) => updateOverride(id, { visible: v })}
              />

              <TextField
                label="Override title"
                value={o.title || ""}
                onChange={(v) => updateOverride(id, { title: v })}
                placeholder="Leave empty to use default title"
              />

              <TextArea
                label="Override description"
                value={o.description || ""}
                onChange={(v) => updateOverride(id, { description: v })}
                rows={3}
                placeholder="Leave empty to use default description"
              />

              <MediaUpload
                label="Override video"
                kind="video"
                value={o.videoUrl || ""}
                onChange={(v) => updateOverride(id, { videoUrl: v })}
                hint="Paste a hosted .mp4 URL (strongly recommended for files above 4 MB)."
              />

              <MediaUpload
                label="Override poster image"
                kind="image"
                value={o.posterUrl || ""}
                onChange={(v) => updateOverride(id, { posterUrl: v })}
              />
            </div>
          );
        })}
      </SectionCard>
    </div>
  );
}
