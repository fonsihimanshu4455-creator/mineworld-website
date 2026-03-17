import { theme } from "../../styles/theme";

function SectionTag({ children, style = {} }) {
  return (
    <div
      style={{
        fontSize: "12px",
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: theme.colors.gold,
        marginBottom: "18px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default SectionTag;