import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, firebaseEnabled } from "../firebase";

const LEGACY_AUTH_KEY = "mineworld:admin:auth";
const LEGACY_PASSWORD =
  import.meta.env.VITE_ADMIN_PASSWORD || "mineworld2025";

export function useAdminAuth() {
  const [user, setUser] = useState(() => auth?.currentUser || null);
  const [legacyAuthed, setLegacyAuthed] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem(LEGACY_AUTH_KEY) === "1";
  });
  const [ready, setReady] = useState(!firebaseEnabled);

  useEffect(() => {
    if (!firebaseEnabled) {
      setReady(true);
      return;
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setReady(true);
    });
    return () => unsub();
  }, []);

  const login = async (emailOrPassword, maybePassword) => {
    if (firebaseEnabled) {
      const email = emailOrPassword;
      const password = maybePassword;
      if (!email || !password) {
        throw new Error("Email and password required.");
      }
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    }
    // Legacy password-only login (for envs without Firebase configured)
    if (emailOrPassword === LEGACY_PASSWORD) {
      window.sessionStorage.setItem(LEGACY_AUTH_KEY, "1");
      setLegacyAuthed(true);
      return true;
    }
    return false;
  };

  const logout = async () => {
    if (firebaseEnabled) {
      await signOut(auth);
    } else {
      window.sessionStorage.removeItem(LEGACY_AUTH_KEY);
      setLegacyAuthed(false);
    }
  };

  const authed = firebaseEnabled ? Boolean(user) : legacyAuthed;

  return { authed, user, login, logout, ready };
}

export default function AdminAuth() {
  const { login, ready } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Admin · Mineworld Production";
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      if (firebaseEnabled) {
        await login(email, pw);
      } else {
        const ok = await login(pw);
        if (!ok) throw new Error("Incorrect password.");
      }
    } catch (error) {
      const code = error?.code || "";
      if (code === "auth/invalid-credential" || code === "auth/wrong-password") {
        setErr("Invalid email or password.");
      } else if (code === "auth/user-not-found") {
        setErr("No admin with that email.");
      } else if (code === "auth/too-many-requests") {
        setErr("Too many attempts. Try again in a minute.");
      } else {
        setErr(error?.message || "Login failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!ready) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          color: "#E7C98A",
          background: "#0b0f1a",
          fontSize: "14px",
        }}
      >
        Loading…
      </div>
    );
  }

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
          maxWidth: "440px",
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
            margin: "0 0 8px",
            fontSize: "30px",
            color: "#F5F1E8",
            letterSpacing: "-0.6px",
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 800,
          }}
        >
          Sign in to continue.
        </h1>
        <p
          style={{
            margin: "0 0 22px",
            color: "#CFC6B8",
            fontSize: "13.5px",
            lineHeight: 1.7,
          }}
        >
          {firebaseEnabled
            ? "Use the email + password you created in Firebase Authentication."
            : "Firebase is not configured — using legacy password mode."}
        </p>

        {firebaseEnabled ? (
          <label style={{ display: "block", marginBottom: "14px" }}>
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
              Email
            </div>
            <input
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@yourdomain.com"
              style={inputStyle}
            />
          </label>
        ) : null}

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
            autoFocus={!firebaseEnabled}
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Enter password"
            style={inputStyle}
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
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px 18px",
            borderRadius: "999px",
            border: "none",
            background: loading
              ? "rgba(214,176,96,0.5)"
              : "linear-gradient(135deg, #D6B060, #E7C98A)",
            color: "#18140F",
            fontWeight: 800,
            fontSize: "14px",
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 10px 24px rgba(214,176,96,0.28)",
            letterSpacing: "0.3px",
          }}
        >
          {loading ? "Signing in…" : "Unlock Admin"}
        </button>

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

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  color: "#fff",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};
