import { theme } from "../../styles/theme";

function Container({ children, style = {} }) {
  return (
    <div
      style={{
        width: theme.spacing.container,
        maxWidth: theme.spacing.maxWidth,
        margin: "0 auto",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default Container;