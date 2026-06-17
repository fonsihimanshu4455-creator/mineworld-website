// SplitEditorLayout — two-column page wrapper used by editors that
// want a "fields on the left, live preview on the right" layout
// (Hero, Services, etc). Collapses to a single column on mobile.

export default function SplitEditorLayout({ left, right, leftFlex = 1, rightFlex = 1 }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(440px, ${leftFlex}fr))`,
        gap: 24,
        alignItems: "start",
      }}
    >
      <div style={{ display: "grid", gap: 18, minWidth: 0 }}>{left}</div>
      <div
        style={{
          position: "sticky",
          top: 24,
          display: "grid",
          gap: 18,
          minWidth: 0,
          // Hint to flex grid — same as leftFlex but encoded via column flexing
          gridColumn: rightFlex === leftFlex ? "auto" : "auto",
        }}
      >
        {right}
      </div>
    </div>
  );
}
