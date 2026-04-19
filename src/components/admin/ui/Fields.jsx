import { adminTheme } from "./adminTheme";

export function TextField({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <label style={{ display: "block" }}>
      <div style={adminTheme.label}>{label}</div>
      <input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={adminTheme.input}
      />
    </label>
  );
}

export function TextArea({ label, value, onChange, rows = 4, placeholder }) {
  return (
    <label style={{ display: "block" }}>
      <div style={adminTheme.label}>{label}</div>
      <textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        style={adminTheme.textarea}
      />
    </label>
  );
}

export function NumberField({ label, value, onChange, min, max, step = 1, unit }) {
  return (
    <label style={{ display: "block" }}>
      <div style={adminTheme.label}>
        {label} {unit && <span style={{ color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>({unit})</span>}
      </div>
      <input
        type="number"
        value={value ?? ""}
        onChange={(e) => {
          const v = e.target.value;
          onChange(v === "" ? "" : Number(v));
        }}
        min={min}
        max={max}
        step={step}
        style={adminTheme.input}
      />
    </label>
  );
}

export function Toggle({ label, value, onChange, hint }) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        padding: "10px 12px",
        borderRadius: "12px",
        border: `1px solid ${adminTheme.colors.border}`,
        background: "rgba(255,255,255,0.025)",
        cursor: "pointer",
      }}
    >
      <input
        type="checkbox"
        checked={Boolean(value)}
        onChange={(e) => onChange(e.target.checked)}
        style={{ marginTop: "3px", accentColor: adminTheme.colors.gold }}
      />
      <div>
        <div
          style={{
            color: adminTheme.colors.text,
            fontSize: "13px",
            fontWeight: 700,
          }}
        >
          {label}
        </div>
        {hint && (
          <div
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "12px",
              lineHeight: 1.5,
              marginTop: "4px",
            }}
          >
            {hint}
          </div>
        )}
      </div>
    </label>
  );
}

export function Select({ label, value, onChange, options, hint }) {
  return (
    <label style={{ display: "block" }}>
      <div style={adminTheme.label}>{label}</div>
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        style={{ ...adminTheme.input, appearance: "none" }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {hint && (
        <div
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "12px",
            marginTop: "6px",
            lineHeight: 1.5,
          }}
        >
          {hint}
        </div>
      )}
    </label>
  );
}

export function Row({ children, cols = "repeat(auto-fit, minmax(220px, 1fr))" }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: cols,
        gap: "14px",
      }}
    >
      {children}
    </div>
  );
}

export function SectionCard({ title, subtitle, children, actions }) {
  return (
    <div
      style={{
        ...adminTheme.card,
        padding: "20px",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.015) 100%)",
      }}
    >
      {(title || subtitle || actions) && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          <div>
            {title && (
              <h3
                style={{
                  margin: 0,
                  color: adminTheme.colors.text,
                  fontSize: "18px",
                  fontWeight: 800,
                  letterSpacing: "-0.3px",
                }}
              >
                {title}
              </h3>
            )}
            {subtitle && (
              <p
                style={{
                  margin: "6px 0 0",
                  color: adminTheme.colors.textSoft,
                  fontSize: "13px",
                  lineHeight: 1.6,
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
          {actions && <div style={{ flexShrink: 0 }}>{actions}</div>}
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {children}
      </div>
    </div>
  );
}
