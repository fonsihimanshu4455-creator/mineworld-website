// Markdown-lite for headlines + ad-copy. Supports two emphasis markers
// because Hero/Manifesto/Capabilities/CTA all use the same gold-italic
// span on a few words within a longer headline:
//
//   *word*    → gold italic span
//   _word_    → underline span
//   **word**  → bold span
//   \n        → line break (rendered as <br/>)
//
// Stored as a plain string in `site_content.text_value` to keep the
// schema simple and the editor a one-line input. Public components
// render via <RichText value={...} /> below.
//
// The parser is intentionally tiny — it splits on a single regex and
// emits an array of segments {type:'text'|'gold-italic'|'underline'|'bold'|'br', value}.
// Escape with backslash if you need a literal asterisk: \*

import React from "react";

const TOKEN_RE = /(\\.|\*\*[^*\n]+\*\*|\*[^*\n]+\*|_[^_\n]+_|\n)/g;

export function parseRichText(input) {
  if (!input || typeof input !== "string") return [];
  const tokens = input.split(TOKEN_RE).filter((t) => t !== undefined && t !== "");
  return tokens.map((t) => {
    if (t === "\n") return { type: "br" };
    if (t.startsWith("\\")) return { type: "text", value: t.slice(1) };
    if (t.startsWith("**") && t.endsWith("**")) {
      return { type: "bold", value: t.slice(2, -2) };
    }
    if (t.startsWith("*") && t.endsWith("*")) {
      return { type: "gold-italic", value: t.slice(1, -1) };
    }
    if (t.startsWith("_") && t.endsWith("_")) {
      return { type: "underline", value: t.slice(1, -1) };
    }
    return { type: "text", value: t };
  });
}

const SERIF_FONT =
  '"Playfair Display", Georgia, "Times New Roman", serif';

export default function RichText({
  value,
  fallback = "",
  goldColor = "var(--accent-gold)",
}) {
  const source = value || fallback;
  const segments = parseRichText(source);
  return segments.map((seg, i) => {
    switch (seg.type) {
      case "br":
        return <br key={i} />;
      case "gold-italic":
        return (
          <span
            key={i}
            style={{
              color: goldColor,
              fontStyle: "italic",
              fontFamily: SERIF_FONT,
            }}
          >
            {seg.value}
          </span>
        );
      case "underline":
        return (
          <span key={i} style={{ textDecoration: "underline" }}>
            {seg.value}
          </span>
        );
      case "bold":
        return (
          <strong key={i} style={{ fontWeight: 800 }}>
            {seg.value}
          </strong>
        );
      default:
        return <React.Fragment key={i}>{seg.value}</React.Fragment>;
    }
  });
}
