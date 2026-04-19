import { adminTheme } from "./adminTheme";
import { generateId } from "../../../data/defaultContent";

/**
 * Generic editor for an array of items.
 * - Supports visibility toggle, delete, move up/down, add
 * - `renderItem(item, update)` renders the editable body
 * - `newItem()` returns the default shape for a new entry
 * - `itemLabel(item, idx)` returns a short label shown in card header
 */
export default function ArrayEditor({
  label,
  items,
  onChange,
  renderItem,
  newItem,
  itemLabel,
  addLabel = "+ Add item",
  emptyMessage = "No items yet. Add your first.",
  minItems = 0,
  maxItems,
}) {
  const list = Array.isArray(items) ? items : [];

  const update = (idx, next) => {
    const out = [...list];
    out[idx] = next;
    onChange(out);
  };

  const remove = (idx) => {
    if (list.length <= minItems) return;
    onChange(list.filter((_, i) => i !== idx));
  };

  const toggleVisible = (idx) => {
    const current = list[idx];
    update(idx, { ...current, visible: current?.visible === false });
  };

  const move = (idx, dir) => {
    const target = idx + dir;
    if (target < 0 || target >= list.length) return;
    const out = [...list];
    [out[idx], out[target]] = [out[target], out[idx]];
    onChange(out);
  };

  const add = () => {
    if (maxItems && list.length >= maxItems) return;
    const base = newItem ? newItem() : { id: generateId(), visible: true, label: "" };
    onChange([...list, base]);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <div style={{ ...adminTheme.label, marginBottom: 0 }}>
          {label}
          <span
            style={{
              marginLeft: "8px",
              color: "rgba(255,255,255,0.45)",
              fontSize: "11px",
              fontWeight: 600,
            }}
          >
            ({list.length})
          </span>
        </div>
        <button
          type="button"
          onClick={add}
          disabled={maxItems && list.length >= maxItems}
          style={adminTheme.btnGhost}
        >
          {addLabel}
        </button>
      </div>

      {list.length === 0 && (
        <div
          style={{
            padding: "14px",
            border: "1px dashed rgba(255,255,255,0.14)",
            borderRadius: "12px",
            color: "rgba(255,255,255,0.5)",
            fontSize: "13px",
            textAlign: "center",
          }}
        >
          {emptyMessage}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {list.map((item, idx) => {
          const isHidden = item?.visible === false;
          return (
            <div
              key={item?.id || idx}
              style={{
                ...adminTheme.card,
                opacity: isHidden ? 0.58 : 1,
                transition: "opacity 0.2s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    minWidth: 0,
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      ...adminTheme.chip,
                      color: isHidden ? adminTheme.colors.textSoft : adminTheme.colors.gold,
                      background: isHidden
                        ? "rgba(255,255,255,0.04)"
                        : "rgba(214,176,96,0.12)",
                      border: `1px solid ${
                        isHidden
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(214,176,96,0.3)"
                      }`,
                    }}
                  >
                    #{String(idx + 1).padStart(2, "0")}
                  </div>
                  <div
                    style={{
                      color: adminTheme.colors.text,
                      fontSize: "13px",
                      fontWeight: 700,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {itemLabel ? itemLabel(item, idx) : item?.label || item?.title || `Item ${idx + 1}`}
                  </div>
                  {isHidden && (
                    <div
                      style={{
                        ...adminTheme.chip,
                        color: "#FFB4A2",
                        background: "rgba(255,99,71,0.08)",
                        border: "1px solid rgba(255,99,71,0.28)",
                      }}
                    >
                      Hidden
                    </div>
                  )}
                </div>

                <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                  <button
                    type="button"
                    onClick={() => move(idx, -1)}
                    disabled={idx === 0}
                    aria-label="Move up"
                    style={{
                      ...adminTheme.iconBtn,
                      opacity: idx === 0 ? 0.4 : 1,
                    }}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => move(idx, 1)}
                    disabled={idx === list.length - 1}
                    aria-label="Move down"
                    style={{
                      ...adminTheme.iconBtn,
                      opacity: idx === list.length - 1 ? 0.4 : 1,
                    }}
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleVisible(idx)}
                    aria-label={isHidden ? "Show item" : "Hide item"}
                    style={adminTheme.iconBtn}
                    title={isHidden ? "Show on site" : "Hide from site"}
                  >
                    {isHidden ? "🚫" : "👁"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm("Delete this item?")) remove(idx);
                    }}
                    aria-label="Delete item"
                    style={{
                      ...adminTheme.iconBtn,
                      color: "#FFB4A2",
                      borderColor: "rgba(255,99,71,0.32)",
                    }}
                    disabled={list.length <= minItems}
                  >
                    ×
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {renderItem(item, (next) => update(idx, next))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
