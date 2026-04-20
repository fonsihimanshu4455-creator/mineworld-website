import {
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db, firebaseEnabled } from "./firebase";

const CACHE_KEY = "mineworld:content:v1";
const CHANGE_EVENT = "mw-content-change";

let cache = {};
let listenersInitialised = false;
let unsubscribers = [];
let pendingKeys = new Set();

function loadLocalCache() {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLocalCache() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // localStorage quota exceeded — ignore (Firestore still has the source of truth)
  }
}

function emit() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

cache = loadLocalCache();

function coerce(value) {
  if (value && typeof value === "object" && "items" in value && Array.isArray(value.items)) {
    return value.items;
  }
  if (value && typeof value === "object" && "value" in value) {
    return value.value;
  }
  return value;
}

function wrap(value) {
  if (Array.isArray(value)) return { items: value };
  if (value && typeof value === "object") return value;
  return { value };
}

async function hydrateFromFirestore() {
  if (!firebaseEnabled) return;
  try {
    const snap = await getDocs(collection(db, "content"));
    const next = { ...cache };
    snap.forEach((d) => {
      next[d.id] = coerce(d.data());
    });
    cache = next;
    saveLocalCache();
    emit();

    const unsub = onSnapshot(collection(db, "content"), (s) => {
      const updated = { ...cache };
      s.docChanges().forEach((change) => {
        const id = change.doc.id;
        if (pendingKeys.has(id)) return;
        if (change.type === "removed") {
          delete updated[id];
        } else {
          updated[id] = coerce(change.doc.data());
        }
      });
      cache = updated;
      saveLocalCache();
      emit();
    });
    unsubscribers.push(unsub);
  } catch (err) {
    console.warn("[contentStore] Firestore hydrate failed:", err?.message || err);
  }
}

function ensureListeners() {
  if (listenersInitialised) return;
  listenersInitialised = true;
  hydrateFromFirestore();
}

if (typeof window !== "undefined") {
  ensureListeners();
}

async function writeRemote(key, value) {
  if (!firebaseEnabled) return;
  pendingKeys.add(key);
  try {
    await setDoc(doc(db, "content", key), wrap(value));
  } finally {
    setTimeout(() => pendingKeys.delete(key), 1500);
  }
}

async function removeRemote(key) {
  if (!firebaseEnabled) return;
  pendingKeys.add(key);
  try {
    await deleteDoc(doc(db, "content", key));
  } finally {
    setTimeout(() => pendingKeys.delete(key), 1500);
  }
}

export const contentStore = {
  get(key) {
    return cache[key];
  },
  set(key, value) {
    cache = { ...cache, [key]: value };
    saveLocalCache();
    emit();
    writeRemote(key, value).catch((err) => {
      console.warn("[contentStore] Firestore write failed:", err?.message || err);
    });
  },
  remove(key) {
    const next = { ...cache };
    delete next[key];
    cache = next;
    saveLocalCache();
    emit();
    removeRemote(key).catch((err) => {
      console.warn("[contentStore] Firestore delete failed:", err?.message || err);
    });
  },
  async clearAll() {
    if (firebaseEnabled) {
      try {
        const snap = await getDocs(collection(db, "content"));
        await Promise.all(
          snap.docs.map((d) => deleteDoc(doc(db, "content", d.id)))
        );
      } catch (err) {
        console.warn("[contentStore] clearAll Firestore error:", err?.message || err);
      }
    }
    cache = {};
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(CACHE_KEY);
    }
    emit();
  },
  exportJSON() {
    return JSON.stringify(cache, null, 2);
  },
  async importJSON(raw) {
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      throw new Error("Invalid JSON");
    }
    if (!parsed || typeof parsed !== "object") {
      throw new Error("Invalid JSON shape");
    }
    cache = parsed;
    saveLocalCache();
    emit();
    if (firebaseEnabled) {
      await Promise.all(
        Object.entries(parsed).map(([key, value]) =>
          setDoc(doc(db, "content", key), wrap(value))
        )
      );
    }
    return parsed;
  },
  snapshot() {
    return cache;
  },
  async refresh() {
    if (!firebaseEnabled) return;
    try {
      const snap = await getDocs(collection(db, "content"));
      const next = { ...cache };
      snap.forEach((d) => {
        next[d.id] = coerce(d.data());
      });
      cache = next;
      saveLocalCache();
      emit();
    } catch (err) {
      console.warn("[contentStore] refresh error:", err?.message || err);
    }
  },
  async getRemote(key) {
    if (!firebaseEnabled) return cache[key];
    try {
      const ref = doc(db, "content", key);
      const s = await getDoc(ref);
      if (!s.exists()) return undefined;
      return coerce(s.data());
    } catch {
      return cache[key];
    }
  },
};

export const logoStore = {
  get() {
    return (cache.settings && cache.settings.logo) || null;
  },
  set() {
    // Logo is now part of settings — use contentStore.set('settings', next)
  },
  clear() {
    // Handled via settings reset
  },
};
