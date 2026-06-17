#!/usr/bin/env node
// CMS audit / snapshot script.
//
// WHY THIS EXISTS:
// Admin-edited content lives in Firestore. Code only provides
// fallbacks. If a code change renames a slot key, removes a CMS hook,
// or deploys from a branch that uses a different Firestore collection,
// admin edits LOOK like they're gone — even though they're still in
// Firestore under the old key. This script dumps every doc in every
// CMS collection so Claude (and you) know exactly what admin has set
// before touching component code.
//
// HOW TO USE:
//   npm run cms:audit
//
// Reads from .env.local (Vite env vars). Writes cms-snapshot.json at
// the repo root.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");

// Load .env.local (Vite uses VITE_ prefixed vars).
function loadDotEnv(path) {
  try {
    const txt = readFileSync(path, "utf8");
    txt.split(/\r?\n/).forEach((line) => {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (!m) return;
      const [, k, v] = m;
      if (!process.env[k]) {
        process.env[k] = v.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
      }
    });
  } catch {
    // file missing — caller will fail with a clear message
  }
}
loadDotEnv(resolve(REPO_ROOT, ".env.local"));
loadDotEnv(resolve(REPO_ROOT, ".env"));

const REQUIRED = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_PROJECT_ID",
];
const missing = REQUIRED.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(
    `\n❌ Missing env vars: ${missing.join(", ")}\n   Create .env.local with the Firebase web-app config (see .env.example).\n`
  );
  process.exit(1);
}

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Collections we know about across the codebase's evolution.
// 'content'      — legacy collection used by src/admin/contentStore.js
//                  (older branches, including this one)
// 'site_content' — newer collection used by src/admin/cmsStore.js
//                  + src/hooks/useSiteContent.js (modern CMS path)
// 'assets'       — Cloudinary asset records (modern)
const COLLECTIONS = ["content", "site_content", "assets"];

function describe(value) {
  if (value == null) return "(null)";
  if (typeof value === "string")
    return value.length > 80 ? `"${value.slice(0, 77)}…" (${value.length} chars)` : `"${value}"`;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return `array(${value.length})`;
  if (typeof value === "object") {
    if (value.cloudinary_url) return `asset → ${value.cloudinary_url}`;
    if (value.items && Array.isArray(value.items))
      return `list(${value.items.length} items)`;
    return `object{ ${Object.keys(value).slice(0, 6).join(", ")} }`;
  }
  return String(value);
}

async function dumpCollection(name) {
  try {
    const snap = await getDocs(collection(db, name));
    const docs = [];
    snap.forEach((d) => {
      docs.push({ id: d.id, data: d.data() });
    });
    return { name, doc_count: docs.length, docs };
  } catch (err) {
    return {
      name,
      doc_count: 0,
      docs: [],
      error: err?.message || String(err),
    };
  }
}

(async () => {
  const generated_at = new Date().toISOString();
  console.log(`\n📸 CMS snapshot — ${generated_at}`);
  console.log(`   project: ${firebaseConfig.projectId}\n`);

  const results = [];
  for (const name of COLLECTIONS) {
    process.stdout.write(`   reading ${name} … `);
    const out = await dumpCollection(name);
    results.push(out);
    if (out.error) {
      console.log(`❌  ${out.error}`);
    } else {
      console.log(`${out.doc_count} doc${out.doc_count === 1 ? "" : "s"}`);
    }
  }

  // Build a flat key map for Claude — slot_key → short description.
  const slot_map = {};
  for (const col of results) {
    for (const d of col.docs) {
      const key = `${col.name}/${d.id}`;
      let summary;
      const data = d.data || {};
      if (data.slot_type === "text") summary = describe(data.text_value);
      else if (data.slot_type === "asset")
        summary = data.cloudinary_url ? `asset → ${data.cloudinary_url}` : "(empty asset)";
      else if (data.slot_type === "color") summary = `color: ${data.color_value || "(none)"}`;
      else if (data.slot_type === "json") summary = describe(data.json_value);
      else summary = describe(data);
      slot_map[key] = summary;
    }
  }

  const snapshot = {
    generated_at,
    project_id: firebaseConfig.projectId,
    collections: results.map((r) => ({
      name: r.name,
      doc_count: r.doc_count,
      error: r.error || null,
    })),
    slot_map,
    full_dump: results,
  };

  const outPath = resolve(REPO_ROOT, "cms-snapshot.json");
  writeFileSync(outPath, JSON.stringify(snapshot, null, 2));
  console.log(`\n✅ Wrote ${outPath}`);
  console.log(`   ${Object.keys(slot_map).length} total admin-edited slots across all collections.\n`);
  process.exit(0);
})().catch((err) => {
  console.error("Audit failed:", err);
  process.exit(1);
});
