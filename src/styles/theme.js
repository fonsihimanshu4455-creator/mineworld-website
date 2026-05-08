// Spec palette — cream-dominant. New components should prefer these.
// Legacy `bg`, `bgSoft`, `bgCard` keys are kept so the existing dark
// section components (Hero/Services/etc.) keep rendering until each is
// individually migrated. They map to the new dark grounding navy.
export const theme = {
  colors: {
    // Spec-aligned (cream-dominant)
    bgPrimary: "#FAF7F2",
    bgSecondary: "#FFFFFF",
    bgCreamSoft: "#F5EFE6",
    bgCreamDeep: "#EDE4D3",

    textPrimary: "#1A1A1A",
    textSecondary: "#4A4A4A",
    textMuted: "#6B6B6B",

    accentNavy: "#0F2A44",
    accentGold: "#B8956A",
    accentGoldLight: "#D4B896",

    borderSubtle: "rgba(26, 26, 26, 0.08)",
    borderCream: "rgba(184, 149, 106, 0.2)",

    // Legacy aliases — still consumed by existing dark sections.
    // Migrate these per-section as we flip components to the new palette.
    bg: "#0F2A44",
    bgSoft: "#13345A",
    bgCard: "#1A4070",
    bgElevated: "#2A5793",

    bgCream: "#F5EFE6",

    line: "rgba(255,255,255,0.12)",
    lineStrong: "rgba(184,149,106,0.34)",

    text: "#F5F1E8",
    textSoft: "#CFC6B8",
    textNavy: "#1A1A1A",
    textNavySoft: "#4A4A4A",

    gold: "#B8956A",
    goldSoft: "#D4B896",
    goldDeep: "#8B6E48",
    goldDim: "rgba(184,149,106,0.22)",

    glow: "rgba(184,149,106,0.18)",
    glass: "rgba(15,42,68,0.62)",
  },

  spacing: {
    section: "120px",
    sectionMobile: "80px",
    container: "90%",
    maxWidth: "1400px",
  },

  radius: {
    sm: "10px",
    md: "18px",
    lg: "28px",
    xl: "36px",
  },

  shadow: {
    soft: "0 14px 32px rgba(15,25,55,0.10)",
    deep: "0 28px 80px rgba(15,25,55,0.18)",
  },
};
