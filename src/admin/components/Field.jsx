import MediaInput from "./MediaInput";

const baseInput = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  color: "#fff",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
};

function setAtPath(obj, path, value) {
  const clone = structuredClone(obj || {});
  let node = clone;
  for (let i = 0; i < path.length - 1; i++) {
    const k = path[i];
    if (node[k] == null || typeof node[k] !== "object") node[k] = {};
    node = node[k];
  }
  node[path[path.length - 1]] = value;
  return clone;
}

function getAtPath(obj, path) {
  let node = obj;
  for (const k of path) {
    if (node == null) return undefined;
    node = node[k];
  }
  return node;
}

function Label({ children }) {
  return (
    <div
      style={{
        fontSize: "11.5px",
        letterSpacing: "1.4px",
        textTransform: "uppercase",
        color: "#E7C98A",
        fontWeight: 700,
        marginBottom: "8px",
      }}
    >
      {children}
    </div>
  );
}

export default function Field({ field, value, onChange, item, setItem }) {
  const v = value ?? "";

  switch (field.type) {
    case "text":
    case "slug":
      return (
        <label style={{ display: "block" }}>
          <Label>{field.label}</Label>
          <input
            type="text"
            value={v}
            onChange={(e) => onChange(e.target.value)}
            style={baseInput}
          />
        </label>
      );

    case "number":
      return (
        <label style={{ display: "block" }}>
          <Label>{field.label}</Label>
          <input
            type="number"
            value={v}
            onChange={(e) => onChange(Number(e.target.value))}
            style={baseInput}
          />
        </label>
      );

    case "textarea":
      return (
        <label style={{ display: "block" }}>
          <Label>{field.label}</Label>
          <textarea
            value={v}
            onChange={(e) => onChange(e.target.value)}
            rows={4}
            style={{ ...baseInput, resize: "vertical", fontFamily: "inherit" }}
          />
        </label>
      );

    case "select":
      return (
        <label style={{ display: "block" }}>
          <Label>{field.label}</Label>
          <select
            value={v}
            onChange={(e) => onChange(e.target.value)}
            style={baseInput}
          >
            <option value="">—</option>
            {field.options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
      );

    case "boolean":
      return (
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
            style={{ width: "18px", height: "18px", cursor: "pointer" }}
          />
          <span style={{ color: "#E7C98A", fontSize: "13px", fontWeight: 600 }}>
            {field.label}
          </span>
        </label>
      );

    case "media-src":
      return (
        <div>
          <Label>{field.label}</Label>
          <MediaInput value={v} onChange={onChange} />
        </div>
      );

    case "string-list": {
      const str = Array.isArray(value) ? value.join("\n") : v || "";
      return (
        <label style={{ display: "block" }}>
          <Label>{field.label}</Label>
          <textarea
            value={str}
            onChange={(e) =>
              onChange(
                e.target.value
                  .split("\n")
                  .map((s) => s.trim())
                  .filter(Boolean)
              )
            }
            rows={5}
            style={{ ...baseInput, resize: "vertical", fontFamily: "inherit" }}
          />
        </label>
      );
    }

    case "media": {
      const obj = value || {};
      return (
        <div
          style={{
            padding: "14px",
            borderRadius: "14px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.02)",
            display: "grid",
            gap: "12px",
          }}
        >
          <Label>{field.label}</Label>
          {field.subFields.map((sf) => (
            <Field
              key={sf.key}
              field={sf}
              value={obj[sf.key]}
              onChange={(nv) => onChange({ ...(obj || {}), [sf.key]: nv })}
            />
          ))}
        </div>
      );
    }

    case "objects-list": {
      const list = Array.isArray(value) ? value : [];
      const updateAt = (idx, next) => {
        const copy = list.slice();
        copy[idx] = next;
        onChange(copy);
      };
      const removeAt = (idx) => {
        const copy = list.slice();
        copy.splice(idx, 1);
        onChange(copy);
      };
      const blank = Object.fromEntries(
        field.subFields.map((sf) => [sf.key, sf.type === "boolean" ? false : ""])
      );
      return (
        <div>
          <Label>{field.label}</Label>
          <div style={{ display: "grid", gap: "10px" }}>
            {list.map((row, idx) => (
              <div
                key={idx}
                style={{
                  padding: "12px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.02)",
                  display: "grid",
                  gap: "10px",
                  position: "relative",
                }}
              >
                {field.subFields.map((sf) => (
                  <Field
                    key={sf.key}
                    field={sf}
                    value={row?.[sf.key]}
                    onChange={(nv) =>
                      updateAt(idx, { ...(row || {}), [sf.key]: nv })
                    }
                  />
                ))}
                <button
                  type="button"
                  onClick={() => removeAt(idx)}
                  style={{
                    justifySelf: "start",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,120,120,0.35)",
                    background: "rgba(255,120,120,0.10)",
                    color: "#ff9e9e",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => onChange([...(list || []), { ...blank }])}
              style={{
                padding: "10px 14px",
                borderRadius: "10px",
                border: "1px solid rgba(214,176,96,0.45)",
                background: "rgba(214,176,96,0.12)",
                color: "#E7C98A",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                justifySelf: "start",
              }}
            >
              + Add entry
            </button>
          </div>
        </div>
      );
    }

    default:
      return (
        <label style={{ display: "block" }}>
          <Label>{field.label}</Label>
          <input
            type="text"
            value={v}
            onChange={(e) => onChange(e.target.value)}
            style={baseInput}
          />
        </label>
      );
  }
}

export { setAtPath, getAtPath };
