// Admin-side hooks for the new CMS collections. Mirrors the public
// `useSiteContent` / `useSiteAsset` reads but adds a save callback so
// editors can `const [value, save, status] = useSlot(slotKey)`.
//
// Read path uses `onSnapshot` for live mirroring with the running site
// (admin sees their own write reflected immediately).

import { useCallback, useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit as fsLimit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { auth, db, firebaseEnabled } from "./firebase";
import {
  ASSETS_COLLECTION,
  SITE_CONTENT_COLLECTION,
  SLOT_DEFINITIONS,
  encodeAssetDocId,
} from "../lib/cms-schema";

export const ACTIVITY_LOG_COLLECTION = "activity_log";

function ensureFirestore() {
  if (!firebaseEnabled || !db) {
    throw new Error("Firebase is not configured.");
  }
}

// Map a slot key like "footer.phone" → "Footer", "portfolio.items" →
// "Portfolio". Falls back to the first segment, title-cased.
export function deriveSectionLabel(slotKey) {
  if (!slotKey) return "Unknown";
  const head = String(slotKey).split(".")[0];
  const map = {
    hero: "Hero",
    navbar: "Navbar",
    footer: "Footer",
    services: "Services",
    portfolio: "Portfolio",
    team: "Team",
    founder: "Founder",
    manifesto: "Manifesto",
    capabilities: "Capabilities",
    process: "Process",
    cta: "Closing CTA",
    editing: "Editing Showcase",
    reel: "Reels",
    reviews: "Reviews",
    logo_wall: "Client Logos",
    press: "Press / Featured In",
    apps: "Apps We Ship",
    trust: "Press / Trust",
    contact: "Contact Info",
    case_studies: "Case Studies",
  };
  return (
    map[head] || head.charAt(0).toUpperCase() + head.slice(1).replace(/_/g, " ")
  );
}

function shortPreview(value) {
  if (value == null) return null;
  if (typeof value === "string") {
    const t = value.trim();
    return t.length > 80 ? t.slice(0, 77) + "…" : t;
  }
  if (typeof value === "object" && value.cloudinary_url) {
    return value.cloudinary_url;
  }
  try {
    const json = JSON.stringify(value);
    return json.length > 80 ? json.slice(0, 77) + "…" : json;
  } catch {
    return String(value).slice(0, 80);
  }
}

// Best-effort: write an entry to activity_log. Failure (offline,
// permission, etc.) is swallowed so the underlying save is not blocked.
export async function logActivity({
  action,
  collection_name,
  doc_id,
  summary,
  preview,
}) {
  if (!firebaseEnabled || !db) return;
  try {
    const actor = auth?.currentUser;
    await addDoc(collection(db, ACTIVITY_LOG_COLLECTION), {
      action: action || "update",
      collection_name: collection_name || null,
      doc_id: doc_id || null,
      section_label: deriveSectionLabel(doc_id),
      summary: summary || null,
      preview: preview ?? null,
      actor_uid: actor?.uid || null,
      actor_email: actor?.email || null,
      actor_name: actor?.displayName || null,
      created_at: serverTimestamp(),
    });
  } catch {
    // best-effort; do not block the underlying write
  }
}

function currentUid() {
  return auth?.currentUser?.uid || null;
}

// Read a single site_content slot with live updates. Returns
// { data, loading, error } where `data` is the raw doc body (not the
// resolved primitive — editors care about the structure).
export function useSlotDoc(slotKey) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!firebaseEnabled || !db || !slotKey) {
      setState({ data: null, loading: false, error: null });
      return;
    }
    const ref = doc(db, SITE_CONTENT_COLLECTION, slotKey);
    const unsub = onSnapshot(
      ref,
      (snap) => {
        setState({
          data: snap.exists() ? snap.data() : null,
          loading: false,
          error: null,
        });
      },
      (err) => setState({ data: null, loading: false, error: err })
    );
    return () => unsub();
  }, [slotKey]);

  return state;
}

// Save (or partially patch) a site_content slot. `body` is merged so
// callers only need to send the fields they own.
export async function saveSlot(slotKey, body) {
  ensureFirestore();
  const ref = doc(db, SITE_CONTENT_COLLECTION, slotKey);
  const payload = {
    slot_key: slotKey,
    ...body,
    updated_by: currentUid(),
    updated_at: serverTimestamp(),
  };
  await setDoc(ref, payload, { merge: true });
  // Activity log — best-effort, never blocks the save.
  let preview = null;
  if (body?.slot_type === "text") preview = shortPreview(body.text_value);
  else if (body?.slot_type === "color") preview = body.color_value;
  else if (body?.slot_type === "asset") preview = body.cloudinary_url;
  else if (body?.slot_type === "json") preview = shortPreview(body.json_value);
  logActivity({
    action: "update",
    collection_name: SITE_CONTENT_COLLECTION,
    doc_id: slotKey,
    summary: `Updated ${slotKey}`,
    preview,
  });
  return payload;
}

export async function clearSlot(slotKey) {
  ensureFirestore();
  const ref = doc(db, SITE_CONTENT_COLLECTION, slotKey);
  await deleteDoc(ref);
  logActivity({
    action: "delete",
    collection_name: SITE_CONTENT_COLLECTION,
    doc_id: slotKey,
    summary: `Reset ${slotKey} to default`,
    preview: null,
  });
}

// Legacy helper kept for the migration page (PR-CMS-1). Writes a typed
// slot value with the asset/text/color/json discriminator.
export async function setSiteContent(slotKey, value) {
  ensureFirestore();
  const ref = doc(db, SITE_CONTENT_COLLECTION, slotKey);
  const slotDef = SLOT_DEFINITIONS.find((s) => s.key === slotKey);
  const slotType = value.slot_type || slotDef?.type || "text";
  const body = {
    slot_key: slotKey,
    slot_type: slotType,
    asset_id: value.asset_id ?? null,
    cloudinary_id: value.cloudinary_id ?? null,
    cloudinary_url: value.cloudinary_url ?? null,
    asset_type: value.asset_type ?? null,
    text_value: slotType === "text" ? value.text_value ?? null : null,
    color_value: slotType === "color" ? value.color_value ?? null : null,
    json_value: slotType === "json" ? value.json_value ?? null : null,
    updated_by: currentUid(),
    updated_at: serverTimestamp(),
  };
  await setDoc(ref, body, { merge: true });
  return body;
}

export async function listAssets() {
  ensureFirestore();
  const snap = await getDocs(collection(db, ASSETS_COLLECTION));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function listSiteContent() {
  ensureFirestore();
  const snap = await getDocs(collection(db, SITE_CONTENT_COLLECTION));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Idempotent batch seed for every slot in SLOT_DEFINITIONS.
export async function seedSlotKeys() {
  ensureFirestore();
  const batch = writeBatch(db);
  const now = serverTimestamp();
  SLOT_DEFINITIONS.forEach((slot) => {
    const ref = doc(db, SITE_CONTENT_COLLECTION, slot.key);
    const body = {
      slot_key: slot.key,
      slot_type: slot.type,
      asset_id: null,
      cloudinary_id: null,
      cloudinary_url: null,
      asset_type: null,
      text_value:
        slot.type === "text" && slot.default !== undefined
          ? slot.default
          : null,
      color_value:
        slot.type === "color" && slot.default !== undefined
          ? slot.default
          : null,
      json_value:
        slot.type === "json" && slot.default !== undefined
          ? slot.default
          : null,
      updated_by: currentUid(),
      updated_at: now,
    };
    batch.set(ref, body, { merge: true });
  });
  await batch.commit();
  return SLOT_DEFINITIONS.length;
}

// Asset CRUD ---------------------------------------------------------

export async function saveAsset(payload) {
  ensureFirestore();
  const docId = encodeAssetDocId(payload.cloudinary_id);
  const ref = doc(db, ASSETS_COLLECTION, docId);
  const now = serverTimestamp();
  const body = {
    cloudinary_id: payload.cloudinary_id,
    cloudinary_url: payload.cloudinary_url,
    asset_type: payload.asset_type,
    original_name: payload.original_name || "",
    width: payload.width ?? null,
    height: payload.height ?? null,
    size_bytes: payload.size_bytes ?? null,
    duration_seconds: payload.duration_seconds ?? null,
    format: payload.format || "",
    category: payload.category || "misc",
    tags: Array.isArray(payload.tags) ? payload.tags : [],
    is_hidden: payload.is_hidden ?? false,
    uploaded_by: currentUid(),
    created_at: payload.created_at || now,
    updated_at: now,
  };
  await setDoc(ref, body, { merge: true });
  logActivity({
    action: "upload",
    collection_name: ASSETS_COLLECTION,
    doc_id: docId,
    summary: `Uploaded ${payload.asset_type || "asset"}: ${payload.original_name || payload.cloudinary_id}`,
    preview: payload.cloudinary_url || null,
  });
  return { id: docId, ...body };
}

export async function getAssetById(docId) {
  ensureFirestore();
  const snap = await getDoc(doc(db, ASSETS_COLLECTION, docId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function deleteAssetDoc(docId) {
  ensureFirestore();
  await deleteDoc(doc(db, ASSETS_COLLECTION, docId));
  logActivity({
    action: "delete",
    collection_name: ASSETS_COLLECTION,
    doc_id: docId,
    summary: `Deleted asset ${docId}`,
    preview: null,
  });
}

// Query the activity log. Default: 200 most-recent entries. Use
// `sectionLabel` to filter by section, `since` for a date floor.
export async function listActivity({
  limit = 200,
  sectionLabel = null,
  since = null,
} = {}) {
  ensureFirestore();
  const constraints = [orderBy("created_at", "desc"), fsLimit(limit)];
  if (sectionLabel) {
    constraints.unshift(where("section_label", "==", sectionLabel));
  }
  if (since instanceof Date) {
    constraints.unshift(where("created_at", ">=", since));
  }
  const q = query(collection(db, ACTIVITY_LOG_COLLECTION), ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Find every site_content slot referencing a given asset. Used for
// safe-delete confirmation dialogs.
export async function findSlotsUsingAsset(assetDocId) {
  ensureFirestore();
  const q = query(
    collection(db, SITE_CONTENT_COLLECTION),
    where("asset_id", "==", assetDocId)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Clear all references to an asset from any site_content slot that
// uses it (top-level slots only — list items are scrubbed by the list
// editor itself). Called as part of safe-delete.
export async function detachAssetFromSlots(assetDocId) {
  ensureFirestore();
  const slots = await findSlotsUsingAsset(assetDocId);
  await Promise.all(
    slots.map((slot) =>
      saveSlot(slot.id, {
        asset_id: null,
        cloudinary_id: null,
        cloudinary_url: null,
        asset_type: null,
      })
    )
  );
  return slots.length;
}

// Convenience: build save handler with status tracking. Editors use
// this to drive their save button label / spinner.
export function useSaveStatus() {
  const [status, setStatus] = useState({ kind: "idle", message: "" });
  const timerRef = useRef(null);

  const run = useCallback(async (fn) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setStatus({ kind: "saving", message: "Saving…" });
    try {
      await fn();
      setStatus({ kind: "ok", message: "Saved" });
      timerRef.current = setTimeout(
        () => setStatus({ kind: "idle", message: "" }),
        2000
      );
    } catch (err) {
      setStatus({
        kind: "error",
        message: err?.message || "Save failed",
      });
    }
  }, []);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    []
  );

  return [status, run];
}
