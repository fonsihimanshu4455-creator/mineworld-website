// Shared inline-style dictionary for the admin panel.
// Kept terse + consistent so editor components look unified.

export const adminTheme = {
  colors: {
    surface: "#0e1626",
    surfaceRaised: "#131d31",
    surfaceSoft: "rgba(255,255,255,0.03)",
    surfaceCard: "rgba(255,255,255,0.04)",
    border: "rgba(255,255,255,0.10)",
    borderStrong: "rgba(214,176,96,0.34)",
    text: "#F5F1E8",
    textSoft: "rgba(245,241,232,0.72)",
    gold: "#D6B060",
    goldSoft: "#E7C98A",
    danger: "#FFB4A2",
    ok: "#7CFFB2",
  },

  label: {
    marginBottom: "6px",
    color: "#EAE6DD",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.2px",
    display: "block",
  },

  input: {
    width: "100%",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.04)",
    color: "#FFFFFF",
    padding: "12px 14px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    fontFamily: "inherit",
  },

  textarea: {
    width: "100%",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.04)",
    color: "#FFFFFF",
    padding: "12px 14px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    minHeight: "90px",
    resize: "vertical",
    fontFamily: "inherit",
    lineHeight: 1.6,
  },

  btnPrimary: {
    border: "none",
    borderRadius: "999px",
    padding: "11px 18px",
    background: "linear-gradient(135deg, #C9A25D, #E7C98B)",
    color: "#1B1B1B",
    fontSize: "13px",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 10px 24px rgba(214,176,96,0.22)",
  },

  btnSecondary: {
    border: "1px solid rgba(255,255,255,0.16)",
    borderRadius: "999px",
    padding: "11px 16px",
    background: "rgba(255,255,255,0.04)",
    color: "#FFFFFF",
    fontSize: "13px",
    fontWeight: 700,
    cursor: "pointer",
  },

  btnGhost: {
    border: "1px dashed rgba(214,176,96,0.48)",
    borderRadius: "12px",
    padding: "10px 14px",
    background: "transparent",
    color: "#E7C98A",
    fontSize: "13px",
    fontWeight: 700,
    cursor: "pointer",
  },

  btnDanger: {
    border: "1px solid rgba(255,99,71,0.4)",
    borderRadius: "999px",
    padding: "11px 14px",
    background: "rgba(255,99,71,0.1)",
    color: "#FFB4A2",
    fontSize: "13px",
    fontWeight: 700,
    cursor: "pointer",
  },

  iconBtn: {
    width: "34px",
    height: "34px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.04)",
    color: "#F5F1E8",
    fontSize: "15px",
    cursor: "pointer",
    flexShrink: 0,
    display: "grid",
    placeItems: "center",
    transition: "background 0.2s ease, transform 0.15s ease",
  },

  card: {
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "18px",
    padding: "16px",
    background: "rgba(255,255,255,0.025)",
  },

  chip: {
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "10.5px",
    fontWeight: 700,
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
};
