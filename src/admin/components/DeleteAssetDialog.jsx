// DeleteAssetDialog — modal that runs a safe-delete flow:
//   1. Looks up every site_content slot that references this asset.
//   2. If in use, lists the slots and lets the admin decide.
//   3. On confirm: detaches the asset from referencing slots, deletes
//      from Cloudinary (best-effort), removes the asset doc.

import { useEffect, useState } from "react";
import { deleteAsset } from "../../lib/cloudinary";
import {
  deleteAssetDoc,
  detachAssetFromSlots,
  findSlotsUsingAsset,
} from "../cmsStore";

export default function DeleteAssetDialog({ asset, onClose, onDeleted }) {
  const [slots, setSlots] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    if (!asset) return;
    const docId = asset.docId || asset.id;
    if (!docId) {
      setSlots([]);
      return;
    }
    findSlotsUsingAsset(docId)
      .then((s) => {
        if (!cancelled) setSlots(s);
      })
      .catch(() => {
        if (!cancelled) setSlots([]);
      });
    return () => {
      cancelled = true;
    };
  }, [asset]);

  const handleConfirm = async () => {
    setBusy(true);
    setError("");
    try {
      const docId = asset.docId || asset.id;
      // 1. Detach from slots first (so site fallbacks engage immediately)
      if (slots && slots.length > 0) {
        await detachAssetFromSlots(docId);
      }
      // 2. Cloudinary delete (best-effort — log but don't block on failure)
      try {
        if (asset.cloudinary_id) {
          await deleteAsset(
            asset.cloudinary_id,
            asset.asset_type === "video" ? "video" : "image"
          );
        }
      } catch (e) {
        console.warn("[DeleteAsset] Cloudinary delete failed:", e?.message);
      }
      // 3. Delete the Firestore asset doc
      await deleteAssetDoc(docId);
      if (typeof onDeleted === "function") onDeleted();
      onClose();
    } catch (err) {
      setError(err?.message || "Delete failed");
    } finally {
      setBusy(false);
    }
  };

  if (!asset) return null;

  const inUse = slots && slots.length > 0;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 130,
        background: "rgba(6,10,18,0.84)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "grid",
        placeItems: "center",
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        style={{
          width: "min(540px, 100%)",
          padding: 24,
          borderRadius: 16,
          background: "linear-gradient(180deg, #1a2236, #0f172a)",
          border: "1px solid rgba(255,120,120,0.25)",
          color: "#F5F1E8",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: inUse ? "#ff9e9e" : "#D9B987",
            letterSpacing: 1.6,
            textTransform: "uppercase",
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          {inUse ? "⚠️ Asset is in use" : "Confirm delete"}
        </div>
        <h2
          style={{
            margin: "0 0 12px",
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: "-0.3px",
            fontFamily: '"Playfair Display", Georgia, serif',
          }}
        >
          Delete this asset?
        </h2>
        <p
          style={{
            margin: "0 0 14px",
            color: "rgba(245,241,232,0.78)",
            lineHeight: 1.6,
            fontSize: 14,
          }}
        >
          This removes the file from Cloudinary and the asset record from
          Firestore. This cannot be undone.
        </p>

        {slots === null && (
          <div
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              background: "rgba(255,255,255,0.04)",
              fontSize: 13,
              color: "rgba(245,241,232,0.6)",
            }}
          >
            Checking usage…
          </div>
        )}

        {inUse && (
          <div
            style={{
              padding: "12px 14px",
              borderRadius: 10,
              background: "rgba(255,120,120,0.06)",
              border: "1px solid rgba(255,120,120,0.25)",
              marginBottom: 14,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                marginBottom: 6,
                color: "#ff9e9e",
              }}
            >
              Used in {slots.length}{" "}
              {slots.length === 1 ? "slot" : "slots"}:
            </div>
            <ul
              style={{
                margin: 0,
                paddingLeft: 20,
                fontSize: 13,
                color: "rgba(245,241,232,0.85)",
                lineHeight: 1.6,
                maxHeight: 160,
                overflowY: "auto",
              }}
            >
              {slots.map((s) => (
                <li key={s.id}>
                  <code
                    style={{
                      fontFamily:
                        "ui-monospace, SFMono-Regular, Menlo, monospace",
                      fontSize: 12.5,
                    }}
                  >
                    {s.id}
                  </code>
                </li>
              ))}
            </ul>
            <div
              style={{
                marginTop: 10,
                fontSize: 12,
                color: "rgba(245,241,232,0.65)",
              }}
            >
              Deleting will detach these references — the slots will fall
              back to the bundled defaults.
            </div>
          </div>
        )}

        {error && (
          <div
            style={{
              marginBottom: 12,
              padding: "10px 12px",
              borderRadius: 10,
              background: "rgba(255,120,120,0.08)",
              color: "#ff9e9e",
              fontSize: 13,
            }}
          >
            {error}
          </div>
        )}

        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "flex-end",
            marginTop: 8,
          }}
        >
          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            style={{
              padding: "10px 18px",
              borderRadius: 999,
              border: "1px solid rgba(184, 149, 106, 0.5)",
              background: "transparent",
              color: "#F5F1E8",
              fontWeight: 700,
              fontSize: 13,
              cursor: busy ? "not-allowed" : "pointer",
              opacity: busy ? 0.5 : 1,
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={busy || slots === null}
            style={{
              padding: "10px 20px",
              borderRadius: 999,
              border: "none",
              background: inUse
                ? "linear-gradient(135deg, #ff7878, #c54a4a)"
                : "linear-gradient(135deg, #BC9966, #D9B987)",
              color: inUse ? "#fff" : "#1F2D4D",
              fontWeight: 800,
              fontSize: 13,
              cursor: busy ? "not-allowed" : "pointer",
              opacity: busy || slots === null ? 0.6 : 1,
            }}
          >
            {busy ? "Deleting…" : inUse ? "Delete anyway" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
