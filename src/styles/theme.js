// All component-facing colors are now sourced from CSS variables in
// index.css (--bg-primary, --accent-gold, etc.). This file keeps only
// the tokens that components still read via `theme.colors.*` for the
// (legacy) dark sections that haven't been fully ported, plus the
// spacing/radius/shadow groups that are still consumed.
//
// The grep run when PR-3 was authored showed these `theme.colors.*`
// keys in active use: bg, bgCard, gold, goldDeep, goldSoft, line,
// lineStrong, text, textNavy, textNavySoft, textSoft. Everything else
// has been removed.

export const theme = {
  colors: {
    bg: "#0F2A44",
    bgCard: "#FFFFFF",

    line: "rgba(26,26,26,0.08)",
    lineStrong: "rgba(184,149,106,0.34)",

    text: "#1A1A1A",
    textSoft: "#4A4A4A",
    textNavy: "#1A1A1A",
    textNavySoft: "#4A4A4A",

    gold: "#B8956A",
    goldSoft: "#D4B896",
    goldDeep: "#8B6E48",
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
