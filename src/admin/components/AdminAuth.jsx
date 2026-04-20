import { useEffect, useState } from "react";

const AUTH_KEY = "mineworld:admin:auth";
const DEFAULT_PASSWORD = "mineworld2025";

function getStoredPassword() {
  return import.meta.env.VITE_ADMIN_PASSWORD || DEFAULT_PASSWORD;
}

export function useAdminAuth() {
  const [authed, setAuthed] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem(AUTH_KEY) === "1";
  });

  const login = (password) => {
    if (password === getStoredPassword()) {
      window.sessionStorage.setItem(AUTH_KEY, "1");
      setAuthed(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    window.sessionStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  };

  return { authed, login, logout };
}

export default function AdminAuth({ onSuccess }) {
  const { login } = useAdminAuth();
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    document.title = "Admin · Mineworld Production";
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (login(pw)) {
      setErr("");
      onSuccess?.();
      return;
    }
    setErr("Incorrect password.");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background:
          "radial-gradient(circle at 20% 10%, rgba(214,176,96,0.14), transparent 24%), linear-gradient(180deg, #0b0f1a, #141c2f)",
      }}
    >
      <form
        onSubmit={submit}
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "36px 30px",
          borderRadius: "24px",
          border: "1px solid rgba(214,176,96,0.32)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))",
          boxShadow: "0 28px 72px rgba(0,0,0,0.45)",
        }}
      >
        <div
          style={{
            color: "#E7C98A",
            fontSize: "12px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontWeight: 700,
            marginBottom: "12px",
          }}
        >
          Mineworld · Admin
        </div>
        <h1
          style={{
            margin: "0 0 20px",
            fontSize: "30px",
            color: "#F5F1E8",
            letterSpacing: "-0.6px",
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 800,
          }}
        >
          Sign in to continue.
        </h1>

        <label style={{ display: "block", marginBottom: "16px" }}>
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
            Password
          </div>
          <input
            autoFocus
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Enter admin password"
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.04)",
              color: "#fff",
              fontSize: "15px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </label>

        {err ? (
          <div
            style={{
              color: "#ff9e9e",
              fontSize: "13px",
              marginBottom: "14px",
            }}
          >
            {err}
          </div>
        ) : null}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px 18px",
            borderRadius: "999px",
            border: "none",
            background: "linear-gradient(135deg, #D6B060, #E7C98A)",
            color: "#18140F",
            fontWeight: 800,
            fontSize: "14px",
            cursor: "pointer",
            boxShadow: "0 10px 24px rgba(214,176,96,0.28)",
            letterSpacing: "0.3px",
          }}
        >
          Unlock Admin
        </button>

        <div
          style={{
            marginTop: "18px",
            color: "rgba(243,239,231,0.4)",
            fontSize: "11.5px",
            lineHeight: 1.7,
          }}
        >
          Default password: <code>mineworld2025</code> (change via{" "}
          <code>VITE_ADMIN_PASSWORD</code> in .env)
        </div>

        <div
          style={{
            marginTop: "28px",
            paddingTop: "20px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            color: "#E7C98A",
            fontSize: "20px",
            fontStyle: "italic",
            fontFamily: '"Brush Script MT", "Segoe Script", cursive',
            letterSpacing: "0.4px",
            textAlign: "right",
          }}
        >
          Himanshu Bhardwaj
          <div
            style={{
              color: "rgba(243,239,231,0.55)",
              fontSize: "10.5px",
              letterSpacing: "1.6px",
              textTransform: "uppercase",
              fontStyle: "normal",
              fontFamily: "Inter, sans-serif",
              marginTop: "3px",
              fontWeight: 700,
            }}
          >
            Founder · Mineworld Production
          </div>
        </div>
      </form>
    </div>
  );
}
