import { useCallback, useEffect, useMemo, useState } from "react";
import { defaultContent, mergeContent } from "../data/defaultContent";
import { SiteContentCtx, STORAGE_KEY } from "./siteContentContext";

function loadOverrides() {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveOverrides(overrides) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  } catch {
    // localStorage may be unavailable in private mode — silently ignore
  }
}

export function SiteContentProvider({ children }) {
  const [overrides, setOverrides] = useState(() => loadOverrides());

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        setOverrides(loadOverrides());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const content = useMemo(
    () => mergeContent(defaultContent, overrides),
    [overrides]
  );

  const updateContent = useCallback((next) => {
    setOverrides((prev) => {
      const merged = mergeContent(prev, next);
      saveOverrides(merged);
      return merged;
    });
  }, []);

  const replaceOverrides = useCallback((nextOverrides) => {
    const safe =
      nextOverrides && typeof nextOverrides === "object" ? nextOverrides : {};
    saveOverrides(safe);
    setOverrides(safe);
  }, []);

  const resetContent = useCallback(() => {
    saveOverrides({});
    setOverrides({});
  }, []);

  const value = useMemo(
    () => ({
      content,
      defaults: defaultContent,
      overrides,
      updateContent,
      replaceOverrides,
      resetContent,
    }),
    [content, overrides, updateContent, replaceOverrides, resetContent]
  );

  return (
    <SiteContentCtx.Provider value={value}>{children}</SiteContentCtx.Provider>
  );
}

export { useSiteContent } from "./useSiteContent";
