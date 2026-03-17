import { theme } from "../../styles/theme";

function SectionHeading({ title, subtitle, align = "left" }) {
  return (
    <div style={{ marginBottom: "48px", textAlign: align }}>
      <h2
        style={{
          fontSize: "clamp(32px, 5vw, 58px)",
          lineHeight: 1.05,
          margin: "0 0 16px",
          color: theme.colors.text,
        }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          style={{
            margin: 0,
            color: theme.colors.textSoft,
            maxWidth: "720px",
            marginLeft: align === "center" ? "auto" : 0,
            marginRight: align === "center" ? "auto" : 0,
            lineHeight: 1.7,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;