// useSiteContent — read a single CMS slot from Firestore (`site_content`
// collection) with a fallback for the empty/error case.
//
// Behaviour:
//   - Subscribes to the slot doc with onSnapshot for live admin updates.
//   - Returns the fallback while the doc is loading, missing, or on
//     permission errors. The site never breaks if Firestore is offline.
//   - For asset slots we use the denormalized `cloudinary_url` written
//     onto the same doc — no second read.
//   - localStorage cache (`mineworld:cms:v1`) gives a synchronous hit on
//     reload so there's no flicker between fallback and real value.

import { useEffect, useRef, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db, firebaseEnabled } from "../admin/firebase";

const CACHE_KEY = "mineworld:cms:v1";

function readCache() {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeCache(next) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(next));
  } catch {
    // quota exceeded — ignore, Firestore is the source of truth
  }
}

function resolveFromDoc(data, fallback) {
  if (!data) return fallback;
  switch (data.slot_type) {
    case "asset":
      return data.cloudinary_url || fallback;
    case "text":
      return data.text_value ?? fallback;
    case "color":
      return data.color_value ?? fallback;
    case "json":
      return data.json_value ?? fallback;
    default:
      return fallback;
  }
}

export function useSiteContent(slotKey, fallback) {
  const fallbackRef = useRef(fallback);
  fallbackRef.current = fallback;

  const [value, setValue] = useState(() => {
    const cached = readCache()[slotKey];
    if (cached === undefined) return fallback;
    return resolveFromDoc(cached, fallback);
  });

  useEffect(() => {
    if (!firebaseEnabled || !db || !slotKey) {
      setValue(fallbackRef.current);
      return;
    }

    const ref = doc(db, "site_content", slotKey);
    const unsub = onSnapshot(
      ref,
      (snap) => {
        if (!snap.exists()) {
          setValue(fallbackRef.current);
          const cache = readCache();
          if (cache[slotKey] !== undefined) {
            delete cache[slotKey];
            writeCache(cache);
          }
          return;
        }
        const data = snap.data();
        setValue(resolveFromDoc(data, fallbackRef.current));
        const cache = readCache();
        cache[slotKey] = data;
        writeCache(cache);
      },
      () => {
        // permission / network error — keep fallback rendering
        setValue(fallbackRef.current);
      }
    );

    return () => unsub();
  }, [slotKey]);

  return value;
}
