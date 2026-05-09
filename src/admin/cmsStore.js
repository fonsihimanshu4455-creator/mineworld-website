// Admin-side hooks for the new CMS collections. Mirrors the public
// `useSiteContent` / `useSiteAsset` reads but adds a save callback so
// editors can `const [value, save, status] = useSlot(slotKey)`.
//
// Read path uses `onSnapshot` for live mirroring with the running site
// (admin sees their own write reflected immediately).

import { useCallback, useEffect, useRef, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
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

function ensureFirestore() {
  if (!firebaseEnabled || !db) {
    throw new Error("Firebase is not configured.");
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
  return payload;
}

export async function clearSlot(slotKey) {
  ensureFirestore();
  const ref = doc(db, SITE_CONTENT_COLLECTION, slotKey);
  await deleteDoc(ref);
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
