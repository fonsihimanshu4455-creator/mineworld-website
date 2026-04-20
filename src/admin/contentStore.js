const STORAGE_KEY = "mineworld:content:v1";
const LOGO_KEY = "mineworld:logo:v1";

function safeParse(raw) {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function readAll() {
  if (typeof window === "undefined") return {};
  return safeParse(window.localStorage.getItem(STORAGE_KEY)) || {};
}

function writeAll(next) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("mw-content-change"));
}

export const contentStore = {
  get(key) {
    const all = readAll();
    return all[key];
  },
  set(key, value) {
    const all = readAll();
    all[key] = value;
    writeAll(all);
  },
  remove(key) {
    const all = readAll();
    delete all[key];
    writeAll(all);
  },
  clearAll() {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("mw-content-change"));
  },
  exportJSON() {
    return JSON.stringify(readAll(), null, 2);
  },
  importJSON(raw) {
    const parsed = safeParse(raw);
    if (!parsed || typeof parsed !== "object") {
      throw new Error("Invalid JSON");
    }
    writeAll(parsed);
    return parsed;
  },
  snapshot() {
    return readAll();
  },
};

export const logoStore = {
  get() {
    if (typeof window === "undefined") return null;
    return safeParse(window.localStorage.getItem(LOGO_KEY));
  },
  set(next) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(LOGO_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent("mw-content-change"));
  },
  clear() {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(LOGO_KEY);
    window.dispatchEvent(new CustomEvent("mw-content-change"));
  },
};
