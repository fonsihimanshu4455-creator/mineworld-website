// Firestore reads/writes for the new CMS collections (`assets` and
// `site_content`). Kept separate from the existing `contentStore.js` so
// the legacy `content` collection is untouched.

import {
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
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
    uploaded_by: currentUid(),
    created_at: payload.created_at || now,
    updated_at: now,
  };
  await setDoc(ref, body, { merge: true });
  return { id: docId, ...body };
}

export async function setSiteContent(slotKey, value) {
  ensureFirestore();
  const ref = doc(db, SITE_CONTENT_COLLECTION, slotKey);
  const slotDef = SLOT_DEFINITIONS.find((s) => s.key === slotKey);
  const slotType = value.slot_type || slotDef?.type || "text";

  const body = {
    slot_key: slotKey,
    slot_type: slotType,
    asset_id: value.asset_id ?? null,
    cloudinary_url: value.cloudinary_url ?? null,
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

// Seed `site_content` with empty docs for every slot in SLOT_DEFINITIONS
// so admins can edit any slot without first having to create it. Uses
// merge: true so re-running is idempotent and never overwrites existing
// values.
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
      cloudinary_url: null,
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
